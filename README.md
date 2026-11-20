# PsyCodes Studio — Production Web Platform & Engine

> **Tagline:** Code. Create. Automate.  
> **Founder & Lead Architect:** Bilawal Feroze  
> **Origin:** Karachi, Pakistan // Established 2026  
> **Contact:** [psycodestech@gmail.com](mailto:psycodestech@gmail.com)

---

## 1. Overview & Architecture

**PsyCodes Studio** is an independent software, mobile applications, and game engineering laboratory. This repository contains the complete production website translated faithfully from Stitch-generated visual references into a scalable, high-velocity web application.

### Key Capabilities & Philosophy
- **Zero-Input-Lag Game Mechanics:** 60/120 FPS targets with deterministic game tick rates in Unity 6 & WebGL.
- **Offline-First Resilience:** Local SQLite / Isar DB persistence and CRDT replication patterns (demonstrated in the *FitLyfe* mobile suite).
- **Practical Autonomous Intelligence:** Multi-agent LangChain swarms bounded by deterministic guardrails.
- **Token-Accurate Design Fidelity:** Cyber-luxe dark palette matching Stitch design references (Midnight navy `#0d1225`, electric blue `#3890ff`, cyan `#18d9f6`, and violet `#a855f7`).

---

## 2. Technology Stack

- **Frontend:** React 18, TypeScript 5, Vite 6, Tailwind CSS 3, Framer Motion 12, Lucide React icons
- **Routing:** React Router DOM v6
- **Server State & Caching:** TanStack React Query v5
- **Forms & Validation:** React Hook Form + Zod
- **Backend & Database:** Supabase, PostgreSQL, Row Level Security (RLS), Supabase Storage
- **Resilience:** Graceful offline/mock data fallback when external Supabase credentials are pending.

---

## 3. Directory Structure

```text
├── public/
│   └── assets/
│       ├── logo/       # Official PsyCodes logos
│       └── banner/     # Studio banners and game artwork
├── src/
│   ├── components/
│   │   ├── common/     # SEO & shared UI primitives
│   │   ├── layout/     # Navbar, Footer, and Layout shell
│   │   └── modals/     # Project, Game, and Service specification modals
│   ├── data/
│   │   └── mockData.ts # Authentic project, game, and service datasets
│   ├── hooks/
│   │   ├── useProjects.ts
│   │   ├── useGames.ts
│   │   ├── useServices.ts
│   │   └── useInquiries.ts
│   ├── lib/
│   │   └── supabase/   # Client initialization & database types
│   ├── pages/
│   │   ├── Home/           # Hero, interactive simulators, studio capabilities
│   │   ├── Projects/       # Products & Ecosystem catalog
│   │   ├── ProjectDetails/ # Deep-dive project dossiers
│   │   ├── Services/       # Service offerings & sprint calculator
│   │   ├── Arcade/         # WebGL game portal & cabinet previews
│   │   ├── GameDetails/    # Game mechanics & playable staging
│   │   ├── About/          # Bilawal Feroze founder dossier & tenets
│   │   ├── Contact/        # Project specification transmission terminal
│   │   ├── Admin/          # Studio Command Core (CRUD operations)
│   │   └── NotFound/       # Cyber-luxe 404 recovery
│   ├── services/       # Project, game, service, and inquiry services
│   ├── types/          # Central TypeScript interfaces
│   ├── App.tsx         # Route registry & React Query provider
│   ├── index.css       # Neon glows, glassmorphism, and scanline utilities
│   └── main.tsx        # Application root
├── supabase/
│   ├── migrations/     # PostgreSQL schema, tables, RLS & storage policies
│   └── seed.sql        # Initial dataset seed script
└── vite.config.ts      # Vite configuration
```

---

## 4. Getting Started

### Prerequisites
- Node.js `v18+` (Tested on `v24.15.0`)
- npm `v9+` (Tested on `v11.12.1`)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/`.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 5. Supabase Backend Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Insert your Supabase Project URL and Anon Key:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Run the migration script in `supabase/migrations/20260101000000_psycodes_schema.sql` via the Supabase Dashboard SQL Editor or Supabase CLI:
   ```bash
   supabase db reset
   ```
4. Seed initial projects and games with `supabase/seed.sql`.

*Note: The website features an automatic offline/demo fallback mode. If Supabase keys are not set, all pages, interactive calculators, and the Admin panel function seamlessly using local storage and verified datasets.*

---

## 6. Admin Control Core (`/admin`)

- Access the private administrative terminal at `/admin`.
- Features overview telemetry, real-time client inquiry management, and CRUD capabilities for portfolio projects, arcade cabinets, and service offerings.
- In development/demo mode, click **"Ignite Demo Session"** to inspect live dashboard interactions without setting up external OAuth.

---

## 7. Verification & Production Audit

- **Type Safety:** 100% TypeScript compliance (`tsc -b` passes with zero errors).
- **Responsive Layouts:** Mobile, tablet, and desktop breakpoints matching Stitch designs.
- **Brand Fidelity:** All logos, banners, typography, and dark cyber-luxe design tokens fully synchronized.

