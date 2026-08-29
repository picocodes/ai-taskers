# AGENTS.md

This is the living operating guide for AI Taskers. Future agents must update this file in the same commit whenever architecture, scripts, environment variables, deployment steps, or important product assumptions change.

## Project

- Next.js 16 App Router landing page for `https://ai-taskers.nopt.in`.
- Purpose: qualify owners of AI training accounts for a managed-work arrangement with a 50/50 split.
- Public claims must remain conservative. Never invent earnings, client counts, testimonials, platform approvals, or security certifications.
- Account-management language must remain conditional on each platform's rules.

## Commands

- `npm install` — install dependencies and update the lockfile when needed.
- `npm run dev` — local development on port 3000.
- `npm run build` — production verification.
- `npm start` — run the production server.
- `docker build -t ai-taskers .` — build the Coolify image.

## Structure

- `app/page.tsx` — page content, form UI, and client-side submission state.
- `app/globals.css` — page styling; imports root `tokens.css`.
- `app/api/contact/route.ts` — server-only SMTP lead handler with a honeypot check.
- `tokens.css` — portable design tokens. Keep raw colors and font stacks here.
- `.hallmark/` — design preflight and build history.

## Environment

Copy `.env.example` locally or configure the same values in Coolify: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`. SMTP credentials are server-only and must never use a `NEXT_PUBLIC_` prefix.

## Deployment

Coolify should build from the included `Dockerfile`, expose container port 3000, and attach domain `ai-taskers.nopt.in` with HTTPS enabled. Set all SMTP variables before testing the form.

## Working rules

1. Preserve responsive behavior at 320, 375, 414, and 768px.
2. Run `npm run build` after code changes.
3. Keep form errors generic on the client and secrets server-side.
4. Update this file when the project changes; add dated notes below for decisions that future agents need.

## Decision log

- 2026-08-29: Chose a single Next.js container rather than an external form service. This keeps visitor data under the owner's SMTP setup and is straightforward in Coolify.
- 2026-08-29: Social proof is intentionally process-based until verified case studies or testimonials are supplied.
- 2026-08-29: Production build and responsive QA passed at 320, 375, 414, 768, and 1280×800; dependency audit reported zero known vulnerabilities.
- 2026-08-29: User supplied the approved social-proof claim that AI Taskers has tens of vetted taskers with experience across major industries.
- 2026-08-29: Coolify production uses `HOSTNAME=0.0.0.0` in the runtime image so the standalone Next.js server is reachable by container health checks and the reverse proxy.
