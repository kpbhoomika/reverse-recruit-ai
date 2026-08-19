# ReverseRecruit AI — Job Search Concierge & Reverse Recruiting SaaS

A full-stack, AI-powered reverse recruiting SaaS platform built for students, freshers, and IT professionals to automate precision job matching, dynamic ATS resume tailoring, multi-channel applications, and interview tracking to guarantee 5+ tech interview calls.

## User Review Required

> [!IMPORTANT]
> **GitHub Repository Destination**:
> We will connect your local codebase to `https://github.com/kpbhoomika`. You can create a new repository (e.g., `reverse-recruit-ai` or `job-pilot-saas`) on GitHub or we can push to a repo name of your choice.
> 
> **Zero-Dollar Bootstrapped Strategy**:
> - **Frontend/Hosting**: Next.js 15 + Tailwind CSS deployed on Vercel ($0/mo).
> - **Database & Auth**: Supabase PostgreSQL + Storage ($0/mo free tier).
> - **AI Engine**: Google Gemini API via free tier ($0/mo).
> - **Cron Automations**: GitHub Actions daily schedule ($0/mo).

---

## Proposed Changes

### Full-Stack SaaS Application

The application is structured as a modern, unified Next.js 15 (App Router) + TypeScript + Tailwind CSS platform with modular feature layers:

```
c:/Users/Hemanth/OneDrive/Desktop/MySaas/
├── .github/
│   └── workflows/
│       ├── daily-job-sync.yml       # Daily automated job aggregation cron (6 AM)
│       └── daily-status-check.yml   # Daily pipeline status & candidate check
├── app/
│   ├── layout.tsx                  # Root layout with dark/light theme provider
│   ├── page.tsx                    # High-converting Landing Page & Live ATS Score tool
│   ├── onboarding/
│   │   └── page.tsx                # Candidate 4-Step Intake Wizard & Master Resume Parser
│   ├── dashboard/
│   │   ├── page.tsx                # Candidate Live Pipeline (Kanban & Table tracker)
│   │   ├── resume-tailor/page.tsx  # Dynamic JD-Aware ATS Resume Tailoring tool
│   │   ├── cover-letters/page.tsx  # 3-Paragraph Cover Letter & InMail generator
│   │   ├── linkedin-optimizer/page.tsx # LinkedIn Recruiter SEO & Headline optimizer
│   │   └── offer-negotiator/page.tsx   # AI Comp Analyzer & Negotiation script copilot
│   ├── admin/
│   │   └── page.tsx                # Agency Admin Cockpit (Multi-client queue, 1-Click dispatch)
│   └── api/
│       ├── ai/
│       │   ├── parse-resume/route.ts   # Gemini AI resume parsing endpoint
│       │   ├── tailor-resume/route.ts  # Gemini AI ATS keyword optimizer
│       │   ├── cover-letter/route.ts   # Gemini AI cover letter & recruiter pitch
│       │   ├── linkedin/route.ts       # Gemini AI LinkedIn profile optimization
│       │   └── negotiate/route.ts      # Gemini AI salary benchmark & counter-offer
│       └── jobs/
│           ├── sync/route.ts           # Job feed aggregator (Greenhouse, Lever, Ashby)
│           └── match/route.ts          # Semantic candidate-to-job matching algorithm
├── components/
│   ├── landing/                    # Hero, Live Pipeline Demo, ATS Calculator, Pricing Matrix
│   ├── dashboard/                  # Application Kanban, Metric Cards, Interview Timeline
│   ├── admin/                      # Client Queue, Daily Quotas, Dispatch Modal
│   └── ui/                         # shadcn/ui custom primitives (Button, Card, Badge, Modal, etc.)
├── lib/
│   ├── gemini.ts                   # Gemini API client & prompt engineering pipelines
│   ├── supabase.ts                 # Database client & mock fallback provider
│   ├── schema.sql                  # Supabase PostgreSQL database tables & RLS policies
│   └── types.ts                    # TypeScript data models for Candidates, Jobs, Applications
└── package.json
```

---

### Component Breakdown

#### 1. High-Converting Landing Page & Lead Magnet
- **Hero & Value Proposition**: *"Land 5+ Tech Interviews on Autopilot. Guaranteed."* with glowing dark-mode UI.
- **Free ATS Scanner Lead Magnet**: Candidates paste a job description + upload resume $\to$ calculates live ATS match score (e.g. 72%) and highlights missing keywords $\to$ high conversion into paying users.
- **Pricing Matrix with Student vs. Pro Toggle**:
  - *Student / Fresher Tier ($99/mo)*: 150 targeted applications, tailored ATS resumes, 3–5 guaranteed interviews.
  - *Pro Career Switcher Tier ($299/mo)*: 250 applications, direct recruiter InMail outreach, salary negotiation copilot, 5+ guaranteed interviews.
- **Live Pipeline Visualizer**: Interactive Kanban demo showcasing real-time job application lifecycle.

#### 2. Candidate Onboarding & Profile Hub
- **4-Step Wizard**:
  1. *Basics & Contact*: Name, email, phone, location, LinkedIn URL, GitHub.
  2. *Target Preferences*: Desired roles, minimum salary ($/yr or LPA), remote/hybrid/onsite, YOE.
  3. *Master Resume & Skills*: Upload PDF/Text $\to$ Gemini extracts structured skills, projects, and metrics.
  4. *Company Blacklist & Work Auth*: Visa status, notice period, and companies to never apply to.

#### 3. AI Intelligence Suite (Gemini Engine)
- **JD-Aware ATS Resume Tailor**: Analyzes any job description, scores compatibility, re-ranks bullet points, and generates tailored ATS-optimized resumes.
- **Context-Aware Cover Letter & Recruiter Pitch**: 3-paragraph compelling cover letters + 3-sentence direct recruiter outreach InMails.
- **LinkedIn Recruiter SEO Optimizer**: High-ranking headline, search-optimized About section, and metric-focused experience bullets.
- **AI Offer Negotiation Copilot**: Deconstructs compensation (Base, Bonus, Equity) and writes data-backed counter-offer emails.

#### 4. Agency Admin Cockpit (Your Operations Center)
- Manage multiple clients from a single command dashboard.
- View daily application quotas and guarantee trackers (e.g. *Client A: 3/5 interviews landed*).
- 1-Click Application Dispatcher: Review tailored answers and log submissions instantly.

#### 5. Database Schema & GitHub Automation
- Complete SQL migration script (`lib/schema.sql`) for Supabase (profiles, applications, jobs, interviews).
- Daily GitHub Actions workflows (`daily-job-sync.yml`) to keep the repo active and sync job feeds every single day.

---

## Verification Plan

### Automated Verification
- Run `npm run build` or `next build` to verify TypeScript types, route handlers, and bundle compilation.
- Test all API endpoints (`/api/ai/*`, `/api/jobs/*`) with mock and live payloads.

### Manual Verification
- Test interactive landing page (dark mode toggle, ATS score calculator, pricing switch).
- Walk through the full onboarding flow with a sample resume.
- Test the resume tailor, cover letter generator, and LinkedIn optimizer with live job descriptions.
- Test the Admin Cockpit to ensure multi-client tracking and status updates work seamlessly.
