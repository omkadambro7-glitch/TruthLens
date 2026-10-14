# TruthLens — See what's real.

[![Python](https://img.shields.io/badge/Python-3.12%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

> **"See what's real."**  
> TruthLens (Codename: PRIMUS) is a free-first, privacy-preserving digital authenticity and forensic verification platform. It enables students, journalists, researchers, and victims of deepfakes to analyze visual media and assess medical certificates with honest, explainable uncertainty.

---

## 🌟 Key Capabilities

### 1. Multi-Spectral Deepfake & AI Image Detector (`/verify/image`)
- **Error Level Analysis (ELA):** Detects localized re-compression and splicing anomalies across 8×8 DCT blocks.
- **2D Fast Fourier Transform (FFT):** Identifies high-frequency periodic grid artifacts characteristic of generative diffusion upsamplers and GANs.
- **Sensor Shot Noise & Laplacian Dispersion:** Evaluates physical optical sensor consistency against synthetic smoothing.
- **Facial Landmark & Corneal Reflection Symmetry:** Checks for anatomical and corneal reflection discrepancies.
- **Container & EXIF Inspection:** Scans for explicit generative parameter tags (e.g. ComfyUI, Automatic1111) while honestly disclosing that EXIF absence is standard on social media.
- **Calibrated Three-Way Verdicts:** Strictly categorizes every result into **`LIKELY REAL`**, **`LIKELY FAKE`**, or **`NEEDS HUMAN REVIEW`**.

### 2. Medical Certificate Integrity & Pre-Check (`/verify/certificate`)
- **OCR Credential Extraction:** Extracts physician name, state/national medical council registration number, clinic/hospital, and designated patient.
- **Chronological Date Logic:** Identifies chronological impossibilities (e.g., leave start date occurring after leave end date) and implausible leave durations.
- **Physical Stamp & Signatory Pen Stroke Detection:** Distinguishes genuine physical ink signatures from unendorsed digital drafts.
- **Mandatory Non-Punitive Safeguard:** Built-in ethical guardrail guaranteeing that our system **never** automatically rejects leave or labels a student dishonest. All consequential decisions require authorized human review.

### 3. Victim SOS Incident Response (`/sos`)
- **Zero-Upload Guidance:** Victims of non-consensual deepfakes are **never** required to upload sensitive material.
- **Confidential Local Storage:** Incident notes and evidence checklists remain stored 100% locally inside the user's browser with a one-click wipe button.
- **One-Click Takedown Templates:** Pre-drafted formal notices citing platform terms for Meta, X, Google, and Telegram.
- **Verified Statutory Helplines:** Official cybercrime reporting portals for India (1930 / cybercrime.gov.in), US (CCRI), UK (Revenge Porn Helpline), and Global (StopNCII.org).

### 4. Tamper-Evident Trust Reports (`/dashboard/reports/:id`)
- **HMAC-SHA256 Cryptographic Seal:** Every analysis generates an immutable signature over canonical findings.
- **Revocable Authenticated Sharing:** Shareable links with expiration dates and instant owner revocation.
- **Downloadable Print View:** Clean, formatted PDF/print summaries.

### 5. University Review Workspace (`/university`)
- **Review Queue with Priority Sorting:** Flags critical chronological discrepancies for senior administrative attention.
- **Structured Review Decisions:** Record approvals, escalations, clarification requests, and reviewer case notes.
- **Tenant Isolation & Immutable Audit Trails:** Ensures student records from one institution are strictly inaccessible to others.

### 6. Media Literacy Hub & Spot-the-Fake Game (`/learn`)
- Interactive educational lessons on cognitive bias, ELA forensics, and metadata traps.
- Playable Spot-the-Fake challenge with instant feedback, explanations, and score tracking.

---

## 🎨 Visual Design System

Crafted with the polish of modern fintech and the warmth of a trusted public health service:
- **Main Background:** Warm Ivory (`#FAF9F6`)
- **Main Surfaces:** Pure White (`#FFFFFF`)
- **Primary Brand:** Deep Forest Teal (`#116B67`)
- **Secondary:** Majestic Violet (`#7663D8`)
- **Accents:** Coral (`#FF806F`), Amber (`#F2BD59`)
- **Text:** Deep Ink (`#20252B`), Muted Slate (`#68717D`)
- **Typography:** Plus Jakarta Sans & Manrope (Google Fonts)

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Clone & Enter Directory
```bash
cd truthlens
```

### 2. Start the Backend API
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run backend server
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
- API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/api/v1/healthz`

### 3. Start the Frontend Application
```bash
# In a new terminal:
cd frontend
npm install
npm run dev
```
- Web Application: `http://127.0.0.1:5173`

---

## 🐳 Docker Deployment

TruthLens can be launched in isolated containers using Docker Compose:

```bash
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

---

## 🧪 Testing Suite

TruthLens includes a complete unit, integration, and security test suite:

```bash
cd backend
source venv/bin/activate
PYTHONPATH=. pytest tests/test_truthlens_backend.py -v
```

Tests cover:
- Health and readiness probes (`/api/v1/healthz`)
- Anti-SSRF defenses (blocking loopback, cloud metadata, link-local, and private RFC 1918 networks)
- Date logic sequence consistency and chronological validation
- Error Level Analysis (ELA) and 2D FFT spectral pipeline
- Medical certificate extraction and risk assessment
- Cryptographic HMAC-SHA256 tamper-evident seal integrity
- Authentication and SOS resource endpoints

---

## 🔑 Demo Credentials

Fictional demo accounts are pre-seeded upon initial startup:

| Role | Email | Password | Access |
|---|---|---|---|
| **University Reviewer** | `reviewer@truthlens.org` | `truthlens2026!` | University Review Workspace & Audit Queue |
| **Student** | `student@truthlens.org` | `truthlens2026!` | Student Verification & Pre-Check |

---

## 📜 Ethical Operating Principles

1. **Honest Uncertainty:** Detection models are probabilistic. TruthLens never describes experimental scores as 100% certainty.
2. **Mandatory Human Agency:** No student is denied leave or sanctioned automatically by an algorithm.
3. **Privacy First:** Uploaded artifacts are decoded in memory, stored outside the web root, and never used to retrain public models without explicit permission.

---

## 📄 License

Licensed under the Apache License, Version 2.0. Built for the public interest.
