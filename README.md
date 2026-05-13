# Portfolio

Starter for a personal portfolio site. A single fullscreen home page with a rotating WebGL spiral of "works," a side-drawer menu, a circular "showreel" marquee, and a spiral ⇄ list view toggle. Visually patterned after Pacôme Pertant's portfolio, with the proprietary content stripped out.

## Stack

- **Vite 6** + **React 19** + **TypeScript**
- **TanStack Router** (file-based, auto-generated route tree via `@tanstack/router-plugin`)
- **three.js** for the spiral canvas
- Scoped vanilla CSS — no Tailwind, no CSS-in-JS

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm build
```

## Development conventions

Rules and posture live alongside the code:

- [CLAUDE.md](CLAUDE.md) — checked-in development rules (state, naming,
  types, motion, when to extract, etc.). Auto-loaded by Claude Code; read
  it yourself if you're working without an agent.
- [CLAUDE.local.md](CLAUDE.local.md) — gitignored personal posture
  ("learning sandbox," preference for smart TypeScript). Re-create it in
  any fresh clone.

When you add a feature area complex enough to warrant its own deep-dive
(forms, data fetching, animation pipeline), put it under `docs/<area>.md`
and link to it from CLAUDE.md.

## Project layout

```
portfolio/
├── index.html                   ← Vite shell, loads /src/main.tsx
├── vite.config.ts               ← TanStack Router + React plugins, "@" alias → "./"
├── tsconfig.json
├── routes/                      ← File-based routes (TanStack picks these up)
│   ├── __root.tsx               ← Bare layout: just <Outlet />
│   └── index.tsx                ← "/" → HomePage
├── routeTree.gen.ts             ← Auto-generated. Don't hand-edit; the vite
│                                  plugin rewrites it on route file changes.
└── src/
    ├── main.tsx                 ← Mounts <RouterProvider> at #root
    ├── globals.css              ← Minimal reset + body-level defaults
    └── home/
        ├── HomePage.tsx         ← Compose-everything page component
        ├── HomePage.css         ← All page styles, scoped under .portfolio-root
        └── SpiralCanvas.tsx     ← three.js helix; isolated so the page stays
                                    declarative
```

## Key pieces

### CSS scoping — `.portfolio-root` namespace

Every rule in `HomePage.css` lives under `.portfolio-root`. Class names like `.wrapper`, `.button`, `.link`, `.dot` are intentionally generic and would collide with third-party CSS the moment you add a UI library. Scoping with a single root selector + namespaced animation keyframes (`portfolio-spin`, `portfolio-rotate`) keeps the page safely encapsulated.

CSS custom properties (`--bg`, `--fg`, `--accent-a`, `--accent-b`, `--muted`) all live on `.portfolio-root` so the palette is one find-and-replace away.

### Spiral canvas (`SpiralCanvas.tsx`)

Helix math, applied once at mount:

```
for i in [0, COUNT):
  t     = i / COUNT                      → normalized [0, 1)
  θ     = t · 2π · TURNS                 → angle around Y
  pos   = (cos θ · R, (t − 0.5) · H, sin θ · R)
  lookAt(0, y, 0)                        → face the central column
```

Tunables at the top of the `useEffect`: `COUNT`, `TURNS`, `RADIUS`, `HEIGHT`.

Each tile gets its own procedurally generated gradient texture (`makeGradientTexture`) seeded by `WORKS[i % WORKS.length].hueDeg`. Replace `WORKS` with your real projects; swap `makeGradientTexture` for `new THREE.TextureLoader().load(thumbUrl)` when you have artwork.

The group rotates continuously on Y with constant drift; pointer position nudges the rotation targets so the spiral reacts to the cursor without requiring a drag.

Cleanup disposes the renderer, geometry, all textures, and every material — important because Vite's HMR will otherwise leak GPU resources on every save.

### Circular marquee (`ShowreelMarquee` in `HomePage.tsx`)

Each character is positioned on a circle of radius `R` using a four-stage transform pipeline (applied right-to-left in CSS):

```
transform-origin: 0 0
translate to circle center  (top: 50%, left: 50%)
→ rotate(angle)             (point along the radius)
→ translate(R)              (push out)
→ rotate(90deg)             (turn glyph upright relative to circle)
```

The whole container then rotates via `@keyframes portfolio-rotate`. Change letter count by editing `MARQUEE_TEXT.repeat(4)`; the angles redistribute automatically.

### Staggered menu drawer

The drawer slides in on `.is-open`. Inside it, each `<a>` has the same enter transition (`opacity` + `translate`) but a different `transition-delay` per `:nth-child`. The footer block fades in last via its own delay. This pattern is purely CSS-driven — no JS timers, no animation libraries.

The `<button>`'s "MENU" letters use the same `:nth-child` trick on a `transform: translateY` hover.

## Adding more pages

The router plugin watches `routes/`. To add `/works`:

1. Create `routes/works.tsx`:
   ```tsx
   import { createFileRoute } from '@tanstack/react-router';
   import { WorksPage } from '@/src/works/WorksPage';

   export const Route = createFileRoute('/works')({
     component: WorksPage,
   });
   ```
2. Create the page module under `src/works/`.
3. Restart `pnpm dev` if HMR doesn't pick it up.

`routeTree.gen.ts` regenerates automatically. For nested routes use directory structure: `routes/works/$slug.tsx` → `/works/:slug`.

## What needs replacing

Search for `TODO:` to find every placeholder:

- `HomePage.tsx` — `CONTACT_EMAIL`, `SOCIAL_URLS`
- `SpiralCanvas.tsx` — `WORKS` array (titles + hues)
- `ListView` inside `HomePage.tsx` — hard-coded work names; should pull from a shared source once you have real data
- `index.html` `<title>`, favicon
- `routes/index.tsx` `document.title`

Renaming `.portfolio-*` → your own brand prefix: search-and-replace `portfolio-` across `HomePage.css`, `HomePage.tsx`, and `SpiralCanvas.tsx` (just the `classList.add` line + the className on the wrapper div).

## Notes

- Body scroll is locked while `HomePage` is mounted — the page is intentionally a fixed overlay. Routes that aren't fullscreen should restore body overflow themselves or extract that effect into a hook.
- The view switch's "list" mode is a placeholder layout, not the spiral's actual content. Decide whether it should mirror `WORKS` from the canvas (probably) or be a separate route once you build out the works detail.
- No analytics, no SEO meta beyond `<title>`. Add a head manager (e.g. TanStack Router's built-in `head` API) when you're ready.
