# Architecture Overview

```mermaid
flowchart LR
  U[User: Mobile / Desktop / Kiosk] --> P[Next.js App Router]
  P --> H[Home + Search + Place + Navigate]
  P --> A[Admin Mock Routes]
  H --> S[Fuse.js Search Engine]
  H --> R[Pathfinding Engine]
  S --> D[(JSON Data Files)]
  R --> D
  P --> SW[Service Worker]
  SW --> C[Offline Cache]
```

## Data Flow

1. UI loads static JSON via `src/lib/data.ts`.
2. Search uses Fuse.js weighted fields.
3. Navigation computes shortest route with accessibility filter.
4. Service worker caches app shell and key pages for offline fallback.
