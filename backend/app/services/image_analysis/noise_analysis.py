import numpy as np
from PIL import Image
from scipy.ndimage import laplace

def analyze_noise_consistency(image: Image.Image) -> tuple[float, dict]:
    """
    Measures localized sensor noise variance and edge sharpness consistency.
    Real optical sensors produce consistent ISO shot/read noise across uniform areas.
    Synthetic generators or AI inpainting often exhibit hyper-smooth denoised patches
    adjacent to complex textures or unnatural blur transitions.
    Returns:
        (noise_inconsistency_score: float, details: dict)
    """
    gray = image.convert("L")
    w, h = gray.size
    
    # Resize if enormous for speedy processing
    if max(w, h) > 1024:
        ratio = 1024 / max(w, h)
        gray = gray.resize((int(w * ratio), int(h * ratio)), Image.Resampling.BILINEAR)
        
    arr = np.array(gray, dtype=np.float32)
    
    # 1. Laplacian variance for blur/sharpness distribution
    laplacian_resp = laplace(arr)
    overall_laplacian_var = float(np.var(laplacian_resp))
    
    # 2. Local noise estimation via high-pass filtering in small patches (32x32)
    patch_size = 32
    n_h = arr.shape[0] // patch_size
    n_w = arr.shape[1] // patch_size
    
    patch_noise_stds = []
    
    if n_h > 2 and n_w > 2:
        for i in range(n_h):
            for j in range(n_w):
                patch = arr[i*patch_size:(i+1)*patch_size, j*patch_size:(j+1)*patch_size]
                # High-pass filter local patch to isolate noise from underlying structure
                local_lap = laplace(patch)
                patch_std = np.std(local_lap)
                patch_noise_stds.append(patch_std)
                
        # Coefficient of variation (CV = std / mean) of noise
        mean_std = float(np.mean(patch_noise_stds))
        std_std = float(np.std(patch_noise_stds))
        noise_cv = std_std / (mean_std + 1e-5)
    else:
        noise_cv = 0.5
        mean_std = 10.0
        
    # Real photos typically have moderate noise CV (0.3 - 0.7);
    # Highly composited or synthetic images often have either extremely low CV (uniform synthetic blur)
    # or extreme CV > 1.2 (denoised face grafted onto noisy background).
    if noise_cv > 1.15:
        # High localized disparity
        score = min(1.0, (noise_cv - 1.15) / 0.8)
    elif noise_cv < 0.25:
        # Unnaturally sterile / AI rendered flat noise
        score = min(0.8, (0.25 - noise_cv) / 0.25)
    else:
        # Natural optical sensor distribution
        score = max(0.0, 0.2 - (0.7 - abs(noise_cv - 0.5)))
        
    details = {
        "noise_coefficient_of_variation": round(noise_cv, 3),
        "mean_patch_noise": round(mean_std, 2),
        "overall_sharpness_variance": round(overall_laplacian_var, 1),
        "patches_analyzed": len(patch_noise_stds),
        "interpretation": "Evaluates optical sensor noise uniformity against synthetic smoothing or inconsistent compositing."
    }
    
    return float(np.clip(score, 0.0, 1.0)), details
