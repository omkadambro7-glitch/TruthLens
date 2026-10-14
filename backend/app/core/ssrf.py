import socket
import ipaddress
import urllib.parse
from typing import Tuple, Optional
import httpx
from app.core.config import settings

# Disallowed IP networks according to RFCs (private, loopback, link-local, carrier-grade NAT, test nets, multicast, reserved)
DISALLOWED_NETWORKS = [
    ipaddress.ip_network("0.0.0.0/8"),
    ipaddress.ip_network("10.0.0.0/8"),
    ipaddress.ip_network("100.64.0.0/10"),     # CGNAT
    ipaddress.ip_network("127.0.0.0/8"),      # Loopback
    ipaddress.ip_network("169.254.0.0/16"),   # Link-local / Cloud metadata (AWS, GCP, Azure: 169.254.169.254)
    ipaddress.ip_network("172.16.0.0/12"),    # Private
    ipaddress.ip_network("192.0.0.0/24"),     # IETF Protocol Assignments
    ipaddress.ip_network("192.0.2.0/24"),     # TEST-NET-1
    ipaddress.ip_network("192.168.0.0/16"),   # Private
    ipaddress.ip_network("198.18.0.0/15"),    # Benchmarking
    ipaddress.ip_network("198.51.100.0/24"),  # TEST-NET-2
    ipaddress.ip_network("203.0.113.0/24"),   # TEST-NET-3
    ipaddress.ip_network("224.0.0.0/4"),      # Multicast
    ipaddress.ip_network("240.0.0.0/4"),      # Reserved
    ipaddress.ip_network("255.255.255.255/32"),
    # IPv6 ranges
    ipaddress.ip_network("::/128"),
    ipaddress.ip_network("::1/128"),          # IPv6 loopback
    ipaddress.ip_network("fc00::/7"),         # IPv6 unique local
    ipaddress.ip_network("fe80::/10"),        # IPv6 link-local
    ipaddress.ip_network("ff00::/8"),         # IPv6 multicast
]

def is_ip_allowed(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        for net in DISALLOWED_NETWORKS:
            if ip in net:
                return False
        return True
    except ValueError:
        return False

def validate_and_resolve_url(target_url: str) -> Tuple[bool, str, Optional[str]]:
    parsed = urllib.parse.urlparse(target_url)
    
    # 1. Protocol check
    if parsed.scheme.lower() not in ("http", "https"):
        return False, "Only HTTP and HTTPS URLs are permitted.", None
    
    hostname = parsed.hostname
    if not hostname:
        return False, "Invalid or missing hostname in URL.", None
    
    # Block standard local hostnames
    if hostname.lower() in ("localhost", "localhost.localdomain", "broadcasthost", "metadata.google.internal"):
        return False, "Access to internal destination is forbidden.", None
        
    # 2. Resolve DNS safely
    try:
        addr_info = socket.getaddrinfo(hostname, None)
        resolved_ips = set(item[4][0] for item in addr_info)
    except socket.gaierror:
        return False, f"Could not resolve hostname '{hostname}'.", None
    
    if not resolved_ips:
        return False, f"No IP address found for '{hostname}'.", None
        
    # 3. Check every resolved IP address
    for ip in resolved_ips:
        if not is_ip_allowed(ip):
            return False, f"Destination resolved to a restricted internal or private IP address ({ip}). Access blocked.", None
            
    return True, "", next(iter(resolved_ips))

async def fetch_remote_image_safely(url: str) -> Tuple[Optional[bytes], Optional[str], Optional[str]]:
    """
    Safely fetches a remote image with anti-SSRF defenses, redirect validation,
    strict timeout, and max byte size guardrails.
    Returns: (content_bytes, content_type, error_message)
    """
    current_url = url
    max_redirects = 3
    
    async with httpx.AsyncClient(timeout=settings.URL_FETCH_TIMEOUT_SECONDS, follow_redirects=False) as client:
        for _ in range(max_redirects + 1):
            is_valid, err_msg, _ = validate_and_resolve_url(current_url)
            if not is_valid:
                return None, None, err_msg
                
            try:
                # Use stream to enforce size limits before reading entire response
                async with client.stream("GET", current_url) as response:
                    # Check for redirect
                    if response.status_code in (301, 302, 303, 307, 308):
                        redirect_location = response.headers.get("location")
                        if not redirect_location:
                            return None, None, "Redirect received without Location header."
                        current_url = urllib.parse.urljoin(current_url, redirect_location)
                        continue
                        
                    if response.status_code != 200:
                        return None, None, f"Remote server returned HTTP status {response.status_code}."
                        
                    content_type = response.headers.get("content-type", "").lower()
                    if not any(t in content_type for t in ["image/jpeg", "image/png", "image/webp", "image/gif", "application/octet-stream"]):
                        return None, None, f"Invalid Content-Type '{content_type}'. Must be an image (JPEG, PNG, WebP)."
                        
                    # Stream bytes with limit
                    chunks = []
                    total_bytes = 0
                    async for chunk in response.aiter_bytes():
                        total_bytes += len(chunk)
                        if total_bytes > settings.URL_FETCH_MAX_BYTES:
                            return None, None, f"Remote image exceeded maximum allowed size of {settings.URL_FETCH_MAX_BYTES / (1024*1024)}MB."
                        chunks.append(chunk)
                        
                    return b"".join(chunks), content_type, None
            except httpx.TimeoutException:
                return None, None, "Request to remote image timed out."
            except Exception as e:
                return None, None, f"Failed to fetch remote image: {str(e)}"
                
        return None, None, "Too many redirects encountered while fetching remote image."
