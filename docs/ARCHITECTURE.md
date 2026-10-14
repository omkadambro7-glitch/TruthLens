# TruthLens System Architecture (Project PRIMUS)

## 1. High-Level Architecture Overview

TruthLens is architected as an asynchronous, modular full-stack application separating forensic calculation engines from client presentation layers.

```
                    ┌────────────────────────┐
                    │      Client UI         │
                    │  (React 19 + Vite +    │
                    │   Tailwind CSS v4)     │
                    └───────────┬────────────┘
                                │ HTTP / REST (v1)
                                ▼
                    ┌────────────────────────┐
                    │     FastAPI Gateway    │
                    │   CORS / Auth / SSRF   │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼────────────────────────┐
        ▼                       ▼                        ▼
┌───────────────┐       ┌───────────────┐        ┌───────────────┐
│ Image Forensic│       │ Document OCR  │        │ Trust Report  │
│ Ensemble      │       │ & Risk Engine │        │ Generator     │
├───────────────┤       ├───────────────┤        ├───────────────┤
│ • ELA Engine  │       │ • Regex OCR   │        │ • HMAC-SHA256 │
│ • 2D FFT Spec │       │ • Date Logic  │        │ • Seal Engine │
│ • Noise CV    │       │ • Stamp Check │        │ • Share Link  │
│ • Face Sym    │       │ • Heuristics  │        │ • PDF Preview │
└───────────────┘       └───────────────┘        └───────────────┘
        │                       │                        │
        └───────────────────────┼────────────────────────┘
                                ▼
                    ┌────────────────────────┐
                    │  Storage & Persistence │
                    │ • SQLite/PostgreSQL    │
                    │ • Private Disk Storage │
                    └────────────────────────┘
```

## 2. Forensic Signal Pipeline

Every uploaded image traverses five independent forensic evaluators:
1. **Error Level Analysis (ELA):** Recompresses the artifact at 90% JPEG quality, computes pixel-level absolute difference matrices, and checks block variance across 8×8 tiles.
2. **2D Fast Fourier Transform (FFT):** Calculates radial frequency decay profiles to test compliance with natural optical 1/f power-law decay against high-frequency periodic grid spikes characteristic of generative diffusion upsamplers.
3. **Noise Dispersion:** Analyzes localized high-pass filtered patch variance to detect hyper-smooth synthetic skin adjacent to natural textures.
4. **Facial Symmetry & Corneal Reflection:** Evaluates left-right facial luminance symmetry and specular reflections when facial subjects are present.
5. **Container & EXIF Inspection:** Scans for embedded generation parameters (e.g. ComfyUI, Automatic1111) while validating color profiles and dimension bounds.

## 3. Mandatory Human Review Safeguard Architecture

For medical certificates and high-consequence identity documents:
- Automated extraction outputs a **Risk Category**, **Extraction Confidence**, and **Integrity Flags**.
- Consequential actions (such as student absence approval or dispute) are strictly routed to the **University Review Queue**.
- The system prohibits automated rejection or accusations of fraud without human authorization.
