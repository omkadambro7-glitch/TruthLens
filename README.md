# TruthLens — Project PRIMUS
## Royal Digital Media & Medical Document Authenticity Platform

[![Python](https://img.shields.io/badge/Python-3.12%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

> **"See what's real. Know what to trust."**  
> TruthLens is a free-first, privacy-preserving digital authenticity and forensic verification platform. It enables students, journalists, researchers, universities, and victims of deepfakes to analyze visual media and assess medical certificates with honest, explainable uncertainty.

---

## 👑 Royal Design System (Real Madrid Inspired)

TruthLens features an art-directed royal aesthetic with layered surfaces, editorial typography, tactile controls, and subtle microinteractions:

- **Royal Ivory Background:** `#FAF9F6`
- **Pure White Surface:** `#FFFFFF`
- **Midnight Navy:** `#101B35`
- **Royal Blue:** `#233F8C`
- **Championship Gold:** `#C6A45C`
- **Soft Gold Highlight:** `#E6D5A2`
- **Muted Blue-Gray:** `#737D90`
- **Main Text:** `#192338`
- **Secondary Text:** `#687386`
- **Success Green:** `#1E824C`
- **Warning Amber:** `#D97706`
- **Error Red:** `#DC2626`

---

## 🌐 Global Multilingual Architecture

A real internationalization system lives in the shared header and updates the entire website instantly:
- **English (`EN`)**
- **Hindi (`HI` - हिन्दी)**
- **Marathi (`MR` - मराठी)**

Translations cover header navigation, hero sections, forensic cards, certificate verification, victim SOS, review queues, audit logs, and modal dialogs. Language preferences persist across refreshes via `localStorage` and synchronize with the document `html lang` attribute.

---

## 🚀 One-Click Instant Demo Exploration

Visitors can immediately explore TruthLens without configuring a database or registering:
1. **Academic Reviewer Demo:** Signed in as **Dr. Eleanor Vance** (Senior Registrar, National Metropolitan University) with full review queue access.
2. **Student Demo:** Signed in as **Karan Malhotra** (NMU) with document pre-check and submission tools.
3. **Public Investigator Demo:** Signed in as **Aarav Sharma** with multi-signal image forensics.

---

## 🌟 Key Functional Modules

### 1. Multi-Spectral Deepfake & AI Image Detector (`/verify/image`)
- **Error Level Analysis (ELA):** Detects localized re-compression and splicing anomalies across 8×8 DCT blocks.
- **2D Fast Fourier Transform (FFT):** Identifies high-frequency periodic grid artifacts characteristic of generative diffusion upsamplers and GANs.
- **Sensor Shot Noise & Laplacian Dispersion:** Evaluates physical optical sensor consistency against synthetic smoothing.
- **Facial Landmark & Corneal Reflection Symmetry:** Checks for anatomical and corneal specular reflection discrepancies.
- **Calibrated Three-Way Verdicts:** Strictly categorizes every result into **`LIKELY REAL`**, **`LIKELY FAKE`**, or **`NEEDS HUMAN REVIEW`** (Abstention corridor 33%–67%).

### 2. Medical Certificate Integrity & Pre-Check (`/verify/certificate`)
- **OCR Credential Extraction:** Extracts physician name, state/national medical council registration number, clinic/hospital, and designated patient.
- **Chronological Date Logic:** Identifies chronological impossibilities and date latency (e.g. retrospective clinic visits).
- **Physical Stamp & Signatory Detection:** Distinguishes genuine physical ink signatures from unendorsed digital drafts.
- **Mandatory Non-Punitive Safeguard:** Our system **never** automatically rejects leave or labels a student dishonest. All consequential decisions require authorized human review.

### 3. Victim SOS Incident Response (`/sos`)
- **Zero-Upload Guidance:** Victims of non-consensual deepfakes are **never** required to upload sensitive material.
- **100% Confidential Local Storage:** Incident notes and evidence checklists remain stored strictly inside the user's browser with a one-click wipe button.
- **Formal Takedown Request Templates:** Pre-drafted formal notices citing platform terms for Meta, X, Reddit, and Telegram.
- **Verified Statutory Helplines:** Official cybercrime reporting portals for India (1930 / cybercrime.gov.in), US (NCMEC CyberTipline), UK (Revenge Porn Helpline), and Global (StopNCII.org).

### 4. Tamper-Evident Trust Reports (`/dashboard/reports/:id`)
- **HMAC-SHA256 Cryptographic Seal:** Immutable signatures over canonical findings.
- **Revocable Authenticated Sharing:** Shareable public verification links with copy feedback.
- **Downloadable Print View:** Clean, formatted PDF/print summaries.

### 5. University Review Workspace (`/university`)
- **Review Queue with Priority Sorting:** Flags critical chronological discrepancies for senior administrative attention.
- **Structured Review Decisions:** Record approvals, escalations, clarification requests, and reviewer case notes.
- **Tenant Isolation & Immutable Audit Trails:** Ensures student records from one institution are strictly inaccessible to others.

### 6. Media Literacy Hub & Spot-the-Fake Game (`/learn`)
- Interactive educational lessons on cognitive bias, ELA forensics, and metadata traps.
- Playable Spot-the-Fake challenge with instant feedback, explanations, and score tracking.

---

## 🛠️ Running Locally

### Backend (FastAPI)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Interactive OpenAPI documentation will be available at `http://127.0.0.1:8000/docs`.

Run tests:
```bash
cd backend
PYTHONPATH=. ./venv/bin/pytest tests/test_truthlens_backend.py -v
```

### Frontend (React 19 + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open `http://127.0.0.1:5173` in your browser.

Build for production:
```bash
cd frontend
npm run build
```

---

## 🔒 Security & Privacy Commitments
- Anti-SSRF URL validation blocking private, loopback, and cloud metadata IP ranges.
- Zero data harvesting: uploaded files are never used to train public generative models.
- WCAG 2.1 AA accessibility conformance with high contrast and full reduced-motion support.
