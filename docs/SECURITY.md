# TruthLens Security & Threat Model

## 1. Threat Model & Mitigations

### A. Server-Side Request Forgery (SSRF)
- **Risk:** Remote URL image fetching feature exploited to probe cloud metadata endpoints (`169.254.169.254`), internal Docker services, or loopback interfaces (`127.0.0.1`).
- **Mitigation (`app/core/ssrf.py`):**
  - Protocol whitelist: Only `http` and `https` permitted.
  - DNS resolution re-check: Resolves hostname to IP before socket connection.
  - IP blacklist: Blocks RFC 1918 private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), link-local metadata ranges (`169.254.0.0/16`), and loopback (`127.0.0.0/8`, `::1`).
  - Redirect safety: Re-validates every redirect hop against the IP blacklist.
  - Streaming size enforcement: Drops connection if content exceeds 10MB during download stream.

### B. Path Traversal & Arbitrary File Storage
- **Risk:** Attackers submitting filenames like `../../etc/passwd` during upload.
- **Mitigation:**
  - Original filenames are sanitized using `uuid.uuid4().hex` prefixes and stored outside the public web root.
  - Artifact endpoints enforce `os.path.basename` extraction to prevent directory traversal.

### C. Tamper-Evident Manifest Integrity
- **Risk:** Modification of verdict or findings after report generation.
- **Mitigation:**
  - Every Trust Report includes an `HMAC-SHA256` signature computed over the canonical JSON representation of the findings using the server secret key. Any alteration invalidates the seal.

### D. Tenant Isolation
- **Risk:** Reviewers from University A accessing student medical records uploaded to University B.
- **Mitigation:**
  - Queries to `/api/v1/university/queue` filter strictly by `organization_id` matching the authenticated reviewer's JWT claims.
