# SIRIRAJ MAP SIWAY

Hospital wayfinding Progressive Web App with mobile, desktop, kiosk-friendly layouts and Thai-first UX.

## Stack

- Next.js 16 (App Router, TypeScript strict)
- Tailwind CSS
- Zustand (UI state)
- TanStack Query
- Fuse.js search
- Vitest + RTL (unit/component baseline)
- Playwright (E2E)

## Project Structure

- `src/app/`: public routes (`/`, `/search`, `/place/[id]`, `/navigate`), admin mock (`/admin/*`), offline page
- `src/components/`: layout, search, map, navigation, admin components
- `src/lib/`: data access, fuzzy search, opening-hour status, pathfinding
- `src/data/`: JSON source files (`buildings`, `places`, `nodes`, `routes`)
- `tests/unit/`: core logic tests
- `tests/e2e/`: Playwright journey test
- `public/`: manifest and service worker

## Local Development

```bash
pnpm install
pnpm dev
```

Open: `http://localhost:3000`

## Quality Checks

```bash
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

## GitHub Pages Deployment

Workflow file: `/.github/workflows/deploy-pages.yml` (repository root).

This workflow:
1. Installs dependencies from `hospital-wayfinding/`
2. Builds static export (`next build --webpack` with `output: "export"`)
3. Publishes `hospital-wayfinding/out` to GitHub Pages

The app is configured for project site base path:

`https://burinboo256.github.io/SIRIRAJ_MAP_SIWAY/`

## Notes

- Admin routes are mock/stub UIs in Phase 1 (no server auth or DB writes).
- PWA support uses `public/sw.js` and `public/manifest.webmanifest`.
