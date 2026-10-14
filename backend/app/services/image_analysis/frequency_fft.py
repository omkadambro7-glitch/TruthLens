import numpy as np
from PIL import Image

def analyze_frequency_spectrum(image: Image.Image) -> tuple[float, dict]:
    """
    Performs 2D Fast Fourier Transform (FFT) analysis.
    Checks for high-frequency periodic grid artifacts, spectral decay irregularities,
    and unnatural radial energy distributions characteristic of synthetic generation.
    Returns:
        (spectral_anomaly_score: float, details: dict)
    """
    # Convert to grayscale
    gray = image.convert("L")
    w, h = gray.size
    
    # Crop center square up to 512x512
    dim = min(512, min(w, h))
    left = (w - dim) // 2
    top = (h - dim) // 2
    cropped = gray.crop((left, top, left + dim, top + dim))
    
    img_array = np.array(cropped, dtype=np.float32)
    
    # Apply Hanning window to reduce spectral leakage from image edges
    hanning_2d = np.outer(np.hanning(dim), np.hanning(dim))
    windowed = img_array * hanning_2d
    
    # 2D Fast Fourier Transform
    fft = np.fft.fft2(windowed)
    fft_shift = np.fft.fftshift(fft)
    magnitude_spectrum = np.log(np.abs(fft_shift) + 1e-7)
    
    # Compute azimuthal average (radial profile from DC center to Nyquist frequency)
    center = dim // 2
    y, x = np.ogrid[:dim, :dim]
    r = np.hypot(x - center, y - center).astype(int)
    
    max_radius = center
    radial_profile = []
    for radius in range(1, max_radius):
        mask = (r == radius)
        if np.any(mask):
            radial_profile.append(float(np.mean(magnitude_spectrum[mask])))
        else:
            radial_profile.append(0.0)
            
    radial_profile = np.array(radial_profile)
    
    # Natural images obey 1/f or 1/f^alpha power-law decay.
    # Synthetic models often suffer from high-frequency flattening or anomalous energy spikes.
    if len(radial_profile) > 20:
        # Check high frequency tail (last 25% of frequencies)
        high_freq_slice = radial_profile[int(len(radial_profile) * 0.75):]
        mid_freq_slice = radial_profile[int(len(radial_profile) * 0.35):int(len(radial_profile) * 0.75)]
        
        high_freq_ratio = float(np.mean(high_freq_slice) / (np.mean(mid_freq_slice) + 1e-5))
        
        # Check variance of high-frequency ring (periodic grid spikes)
        outer_mask = (r > int(center * 0.7)) & (r < center)
        high_freq_spectral_variance = float(np.var(magnitude_spectrum[outer_mask]))
    else:
        high_freq_ratio = 1.0
        high_freq_spectral_variance = 0.5
        
    # Anomaly score normalized between 0.0 (natural 1/f decay) and 1.0 (synthetic periodic peaks / flattened high freq)
    # Natural ratios typically hover between 0.40 and 0.65; AI artifacts tend to exceed 0.75 or have high angular spikes
    spectral_anomaly = min(1.0, max(0.0, (high_freq_ratio - 0.55) / 0.40))
    
    details = {
        "high_to_mid_frequency_ratio": round(high_freq_ratio, 3),
        "high_frequency_variance": round(high_freq_spectral_variance, 3),
        "radial_bins_analyzed": len(radial_profile),
        "interpretation": "Evaluates power-law spectral decay and periodic frequency spikes typical of generative upsamplers."
    }
    
    return spectral_anomaly, details
