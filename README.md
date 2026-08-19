# ReverseRecruit AI — Job Search Concierge & Reverse Recruiting SaaS

[![Daily Job Sync](https://github.com/kpbhoomika/reverse-recruit-ai/actions/workflows/daily-job-sync.yml/badge.svg)](https://github.com/kpbhoomika/reverse-recruit-ai/actions/workflows/daily-job-sync.yml)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com)
[![Google Gemini API](https://img.shields.io/badge/AI-Google%20Gemini%20API-blue)](https://aistudio.google.com)

**ReverseRecruit AI** is an end-to-end reverse recruiting SaaS platform and agency operating system built to automate tech job hunting for **Students / Freshers ($20/mo)** and **IT Professionals ($99/mo)** with a **guaranteed minimum of 5 tech interviews**.

---

## Key Features

1. **High-Converting Landing Page & Free ATS Scanner**:
   - Interactive Lead Magnet: Visitors paste any job description and test their resume ATS score with real-time keyword matching.
   - Dual-tier pricing matrix: **$20 Student Plan** (150 applications) & **$99 IT Professional Plan** (250 applications + Recruiter InMails + Offer Negotiation).
2. **4-Step Candidate Intake Wizard**:
   - Captures target roles, minimum desired compensation, work auth/visa status, company blacklist, and master resume.
3. **100% ATS-Compliant Resume Tailor**:
   - Rewrites accomplishment bullets using the Google XYZ formula aligned to target JD keywords without hallucinating fake experience.
4. **Dual-Channel Outreach Engine**:
   - Generates tailored 3-paragraph ATS cover letters + 3-sentence direct InMail pitches for hiring managers.
5. **LinkedIn Recruiter SEO Optimizer**:
   - Generates algorithm-optimized headlines and rich About sections for maximum ranking in LinkedIn Recruiter searches.
6. **AI Offer Negotiation Copilot**:
   - Benchmarks offers against real market percentiles and writes data-backed counter-offer letters.
7. **Agency Admin Cockpit**:
   - Multi-client queue management, 1-click ATS application dispatcher, live ATS board ingestion, and guarantee tracking.
8. **Daily GitHub Actions Automation**:
   - Automated daily job aggregation from Greenhouse, Lever, and Ashby career boards every morning.

---

## 🛠 Tech Stack ($0 Bootstrapped Infrastructure)

- **Frontend & Fullstack**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Lucide Icons + Glassmorphism Dark Theme
- **AI Intelligence**: Google Gemini API (`gemini-1.5-flash` via Google AI Studio free tier)
- **Database & Auth**: Supabase PostgreSQL + Row Level Security (`lib/schema.sql`)
- **Daily Cron Automations**: GitHub Actions workflows (`.github/workflows/`)

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Add your free Gemini API key (optional for development, local high-fidelity fallback is enabled):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

---

## Deployment to Vercel (100% Free)

1. Push this repository to GitHub: `https://github.com/kpbhoomika/reverse-recruit-ai`
2. Import the repository into [Vercel](https://vercel.com).
3. Add your `GEMINI_API_KEY` and Supabase keys in the Vercel Environment Variables dashboard.
4. Deploy in 1 click!

---

## License
MIT License. Built by [Bhoomika K P](https://github.com/kpbhoomika).
