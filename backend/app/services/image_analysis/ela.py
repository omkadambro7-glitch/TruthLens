import os
import io
import uuid
import numpy as np
from PIL import Image, ImageChops, ImageEnhance
from app.core.config import settings

def perform_ela(image: Image.Image, quality: int = 90, scale: int = 15) -> tuple[float, str, dict]:
    """
    Performs real Error Level Analysis (ELA).
    Saves image at a standard JPEG quality level, computes the absolute difference,
    and amplifies the difference to reveal compression inconsistencies.
    Returns:
        (ela_score: float, heatmap_filename: str, details: dict)
    """
    # Convert image to RGB if needed
    if image.mode != "RGB":
        img_rgb = image.convert("RGB")
    else:
        img_rgb = image.copy()
        
    # Resize max dimension to 1024 for consistent forensic calculation if very large
    max_dim = 1024
    w, h = img_rgb.size
    if max(w, h) > max_dim:
        ratio = max_dim / max(w, h)
        img_rgb = img_rgb.resize((int(w * ratio), int(h * ratio)), Image.Resampling.LANCZOS)
        
    # Resave in-memory at defined JPEG compression
    buffer = io.BytesIO()
    img_rgb.save(buffer, "JPEG", quality=quality)
    buffer.seek(0)
    recompressed = Image.open(buffer)
    
    # Calculate difference
    diff = ImageChops.difference(img_rgb, recompressed)
    
    # Amplify difference for human visualization
    extrema = diff.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
        
    # Scale difference for visual heatmap
    scale_factor = 255.0 / max_diff if max_diff < (255 / scale) else scale
    enhancer = ImageEnhance.Brightness(diff)
    amplified_diff = enhancer.enhance(scale_factor)
    
    # Generate heatmap color representation
    diff_np = np.array(diff).astype(np.float32)
    # Mean error per channel
    mean_error = np.mean(diff_np)
    std_error = np.std(diff_np)
    
    # Divide into 8x8 blocks to check variance between blocks
    # High variance across blocks suggests localized editing or composited AI layers
    h_blocks = img_rgb.height // 32
    w_blocks = img_rgb.width // 32
    block_variances = []
    
    if h_blocks > 1 and w_blocks > 1:
        for i in range(h_blocks):
            for j in range(w_blocks):
                block = diff_np[i*32:(i+1)*32, j*32:(j+1)*32]
                block_variances.append(np.mean(block))
        spatial_discrepancy = float(np.std(block_variances))
    else:
        spatial_discrepancy = 0.0

    # Score normalized between 0 (uniform natural compression) and 1 (strong localized discrepancy)
    ela_anomaly_score = min(1.0, max(0.0, (spatial_discrepancy - 1.5) / 6.0))
    
    # Save visual heatmap artifact
    heatmap_filename = f"ela_heatmap_{uuid.uuid4().hex[:12]}.jpg"
    heatmap_path = os.path.join(settings.ARTIFACTS_DIR, heatmap_filename)
    amplified_diff.save(heatmap_path, "JPEG", quality=85)
    
    details = {
        "mean_error": round(float(mean_error), 2),
        "error_std": round(float(std_error), 2),
        "spatial_discrepancy": round(float(spatial_discrepancy), 2),
        "compression_quality_test": quality,
        "interpretation": "High discrepancy across blocks indicates potential localized recompression or synthetic insertion."
    }
    
    return ela_anomaly_score, heatmap_filename, details
