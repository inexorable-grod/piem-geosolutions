# PIEM GeoSolutions — Claude.md

## Project Overview
Full-stack web application for PIEM Geosolutions LLC and Petro-Explorers joint venture.
A public-facing marketing/brochure site combined with a secure administration panel.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v3 (extended theme)
- **Animations:** Framer Motion
- **Auth:** NextAuth.js v5 (JWT, no database)
- **Charts:** Recharts
- **Deployment:** Vercel

## Architecture Decisions
- **No database**: Users stored in-memory (env vars). Replace with Prisma + Supabase/PlanetScale for production persistence.
- **Route Groups**: `(landing)` for public pages, `(auth)` for login/register, `/admin` for protected panel.
- **Agents**: Located in `src/lib/agents/` — each agent handles a single domain concern.

## Design System
- **Brand colors**: Gold (#d4a520), Steel (#495057), Dark BG (#0a0c0f)
- **Typography**: Cinzel (display headings), Outfit (body text)
- **Dark/Light mode**: via `next-themes`, CSS variables in `globals.css`
- **Logo**: `/public/images/piem-logo-dark.png` and `/public/images/piem-logo-light.png`

## Key Files
| Path | Purpose |
|------|---------|
| `src/lib/constants.ts` | All app data (services, team, clients, stats) |
| `src/lib/users.ts` | In-memory user store + bcrypt auth |
| `src/lib/auth.ts` | NextAuth configuration |
| `src/middleware.ts` | Route protection (admin + role-based) |
| `src/types/index.ts` | All TypeScript interfaces |
| `src/lib/agents/` | Specialized domain agents |

## Environment Variables
See `.env.local` — copy and populate before running.

## Running Locally
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deployment (Vercel)
```bash
git remote add origin https://github.com/YOUR_ORG/piem-geosolutions.git
git push -u origin main
# Then in Vercel Dashboard: Import repo, add env vars, deploy
```

## Admin Credentials (Dev)
- Email: admin@piemgeosolutions.com
- Password: Admin@PIEM2024! — CHANGE IN PRODUCTION

## Security Notes
- All /admin routes are protected by middleware
- Role-based access: only `admin` role can access `/admin/users`
- Passwords hashed with bcrypt (cost 12)
- JWT sessions expire in 8 hours
- SecurityMonitorAgent blocks users after 5 failed login attempts
- In production: replace in-memory user store with a persistent DB + add rate limiting

## Agents
| Agent | File | Responsibility |
|-------|------|---------------|
| ReservoirAnalyzer | `agents/reservoir-analyzer.ts` | Interprets reservoir data |
| ProjectTracker | `agents/project-tracker.ts` | Monitors deadlines & health |
| ReportGenerator | `agents/report-generator.ts` | Generates project reports |
| SecurityMonitor | `agents/security-monitor.ts` | Auth event logging & blocking |
| ContactRouter | `agents/contact-router.ts` | Routes contact form inquiries |
