# Handoff: Francesco Seddo Portfolio (v9 — Material × Spatial)

## Screenshots
See the `screenshots/` folder for renders of each section:
1. `01-hero.png` — Hero satellite view
2. `02-intro.png` — Intro / About
3. `03-work-list.png` — Selected work list
4. `04-work-tracker-card.png` — Legislative Tracker card with the CMS mock art
5. `05-work-tracker-case-study-open.png` — Inline case study panel opened
6. `06-craft-snippets.png` — Code snippets with marginalia
7. `07-career.png` — Career section
8. `08-stack-marquee.png` — Tech stack marquee
9. `09-contact-strip.png` — Contact strip with résumé download
10. `10-commit-footer-expanded.png` — Live GitHub commit footer in expanded state

## Overview
A single-page portfolio site for a Software Engineer III based in NYC. Showcases three case-study projects with inline expandable detail panels, a code-craft section with interactive marginalia, a marquee tech stack, career history, and a live GitHub commit feed at the bottom of every screen.

The vibe is **warm material editorial** — cream paper backgrounds, ink-black text, a copper accent (`#B85A2A`), and a moss-green secondary. Typography pairs a geometric sans (Geist) with a classical italic serif (Instrument Serif) for the prose flourishes, and a monospace (Geist Mono) for all eyebrows, labels, and metadata.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React + your component system, Next.js, Astro, whatever) using its established patterns and libraries. If no environment exists yet, **Next.js + React + Tailwind** is the recommended starting point — the design leans heavily on view-transitions, scroll-driven effects, and component-shaped sections that map naturally onto React.

The provided HTML is a single 1500-line file with inline CSS and JS. In the real implementation it should be broken into components.

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, animations, and interactions are intentional and final. Recreate the UI pixel-perfectly using the codebase's existing libraries and patterns. The HTML file is the source of truth for visual values — when in doubt, open it and inspect the computed style.

## Screens / Views
This is a single-page site. Sections in vertical order:

### 1. Hero — Satellite View
- **Layout**: Full-viewport (100vh, min 680px) dark section. Title positioned bottom-left, status labels top-left and top-right corners, "Scroll" hint bottom-left.
- **Background**: A "satellite view" — radial gradient dark ink center, four concentric orbit ring patterns, a glowing copper core dot (10px) centered.
- **Tech chips**: ~20 floating pill-shaped chips bouncing inside the viewport like screensavers. Each chip is a tech (React, TypeScript, Kotlin, etc.) with a status dot (copper for daily, dim for occasional, moss-green for exploring) and a years-of-experience suffix. Chips drift on linear velocity vectors and bounce off both the viewport edges AND invisible exclusion rectangles around the title, status labels, and scroll hint (so they never overlap text).
- **Title**: "Francesco / Seddo." — `clamp(80px, 14vw, 232px)`, weight 300, line-height 0.86, letter-spacing -0.045em. The "Seddo." word uses Instrument Serif italic.
- **Tagline below title**: 13px monospace, copper underline before the text. Reads: "Frontend-leaning, fullstack by nature. — Four years, one company, three rebuilds."
- **Top-left labels**: "Now / Software Engineer III", "Based — New York, NY", "Tenure — 4 years · Leadership Connect" (with a copper dot bullet on the first line).
- **Top-right labels**: "● Available May 2026" (copper dot), "Open to senior fullstack roles".
- **Bottom-right corner**: "Portfolio / № 07 / 2026".
- **Scroll indicator**: animated horizontal line at bottom-left.

### 2. Intro / About (№ 01)
- **Layout**: Two-column grid (240px sticky sidebar + flex body, max-width 1440px, padding 120px 56px 100px).
- **Sidebar**: Two-line monospace label list ("About — 01" copper / "Discipline / Fullstack engineering").
- **Body**: Copper eyebrow → large weight-300 sans h2 ("Four years, one company, *three rebuilds.*" — with the serif italic on the last two words) → one short paragraph of plain prose.

### 3. Selected Work (№ 02)
- **Layout**: Header row (3-col grid: eyebrow + h2 + right-aligned meta), then 2-col `.work-grid` with the first card spanning the full width.
- **Three cards** in this order:
  1. **Urbanstems, *cloned.*** (wide, full-row). Hero image fills a 21:9 frame (use `assets/urbanstems-ref.png`).
  2. **Legislative *Tracker.*** (half-width). The work-art is a custom mini-CMS mockup — see Components section.
  3. **Signal *Pipeline.*** (half-width). The work-art is an animated SVG funnel — see Components section.
- **Each card** has: an art frame (4:3 or 21:9) with floating pill tags top-left ("Live", category) and a metric tag bottom-right with the headline number; below the frame, a meta row (location, year); below that, the project title (h3) and a short prose paragraph; finally a "View case study →" button that triggers the inline case-study swap.

### 4. Craft — Code Snippets (№ 03)
- **Layout**: Two-column grid (300px tabs + 1fr snippet, max-width 1440px, padding 140px 56px, background `--cream-2`).
- **Left**: Three sticky tab buttons (active gets ink-black background, copper left border, copper number, cream text).
- **Right**: A dark code-window panel. Header row with title (sans + serif italic) and a "TS / TanStack" pill on the right. Body is a 2-column grid (1.5fr code + 1fr annotations). Code has syntax-highlighted spans (keyword copper, string moss, function white, type tan, comment dim italic). Numbered "marker" circles in the code (copper pills, 20px) hover-bind to numbered annotations on the right.
- **Three snippets**: `useStableCallback`, `invariant` (type-safe assert), `Query keys` (TanStack factory). See HTML for full code + annotation text.

### 5. Career (№ 04)
- **Layout**: Header row (eyebrow + h2 + right meta), then full-width rows list. Each row is `grid-template-columns: 200px 1fr 220px` (date / body / outcome badge), 36px vertical padding, copper dash before the "Now" row's date column.
- **Three entries**: Software Engineer III (current), Software Engineer II, Fullstack Developer. All at Leadership Connect, NYC.
- **Body of each row**: title h4 (sans 32px weight 300, with serif italic suffix), monospace company line, prose paragraph with `<strong>` highlights and copper serif italic for key phrases.
- **Badge column**: small monospace copper line ("Arch lead · Now", "3min → 2s", "40% faster").

### 6. Stack — Marquee (№ 05)
- **Layout**: Full-bleed dark ink band (background `--ink`, color `--cream`, padding 64px 0).
- **Header**: 3-col grid (eyebrow + h2 + legend). Legend has three swatches: copper for "Daily", cream for "Within reach", moss for "Exploring".
- **Two marquee strips** below the header, full-width, mask-image fade on both edges. Each strip has a `display: flex; gap: 14px; width: max-content` track with chips duplicated 2× for seamless looping. Tracks are CSS-animated translateX from 0 to -50% (row 1 left, 80s) and -50% to 0 (row 2 right, 90s). Animation pauses on `:hover`.
- **Chips**: pill-shaped, with a colored status dot, the tech name, and a years suffix. Daily chips are larger (14px) and copper-tinted; exploring chips moss-tinted; others muted.
- **Row 1**: React, TypeScript, TanStack Query, TanStack Router, Tailwind, Jotai, Zod, Next.js, Vite, Vitest, Playwright, Storybook, Figma.
- **Row 2**: Kotlin, Spring Boot, Elasticsearch, PostgreSQL, Node.js, Python, Django, Docker, AWS, Jenkins, Redis, Rust + WASM.

### 7. Contact Strip (№ 06)
- **Layout**: Tight single row. 3-col grid (eyebrow + line + links), padding 60px 56px, background `--cream-2`.
- **Eyebrow**: "№ 06 — Contact" (monospace, copper).
- **Line**: "Get in touch — or *download the résumé ↓*" (the second clause is a serif italic copper link with a copper underline that expands gap on hover; download attribute set to `assets/Francesco_Seddo.pdf`).
- **Links**: An ink-pill primary button "hello@seddo.dev →", plus two text links "github" and "linkedin".

### 8. Footer
- Dark ink band, 48px 56px 32px padding, 3-col grid (copyright / center location-availability / right link cluster). Monospace 11px, all uppercase 0.06em tracking.

### Persistent: Top Navigation
- Fixed at top. Transparent until scrolled, then `rgba(239,232,218,0.92)` with blur + bottom border. 64px tall, padding 0 40px.
- 3-col grid: brand mark (copper square dot + "F. Seddo") / centered nav links (Work, Craft, Career, Stack, Contact) / right CTA ("Get in touch ↗" with a circular arrow that rotates -45° on hover and turns copper).

### Persistent: Commit Footer Bar
- Fixed bottom (14px from all edges), `rgba(27,20,12,0.94)` with blur, 48px collapsed height, 360px expanded.
- **Collapsed**: pulsing copper dot + "Live · GitHub" label, repo name pill, latest commit message with copper "refactor:" type prefix, time ago, "github.com/fseddo ↗" link, and a chevron toggle.
- **Expanded**: panel reveals a 2-col grid of 8 recent commits with type pills (feat moss, fix copper, perf gold, refactor copper-tinted), commit message, time ago.
- Click anywhere on the bar to toggle.

---

## Custom Components in the Work Section

### Legislative Tracker Art (`.art-cms`)
A miniature CMS app screenshot — must look like a real product, not a sketch.
- **Layout**: 2-col grid `76px 1fr` filling its 4:3 work-art frame.
- **Sidebar** (background `#0a0805`, right border): Logo row at top (copper dot + "LC.Tracker"), then 7 nav rows (Dash, Bills [active], People, Cmtees, Reports, Alerts, Saved). Each nav row is `7px 0` padded, has a 9px icon square (rounded 2px) and a 9.5px monospace label. The active row has a copper left border, a copper-tinted background, and the icon turns copper with glow.
- **Top bar** (28px tall, `#0d0905`): a crumb path "Bills / 119th / Energy" (with the middle segment copper), a search pill on the right with a small circle search icon, and a 16px copper-gradient circle avatar.
- **Body**: flex column, gap 8px, padding 12px:
  - **Header row**: Title "Active *bills.*" (15px sans + serif italic) on the left, 3 action buttons on the right (Filter, Export, Track — last one copper primary).
  - **Stats banner**: 3-column grid of low-height pills (label left in muted monospace, value right in 15px sans). Values: "In committee 242 / Vote pending **31** [copper] / Stalled 14".
  - **Table**: 6 rows of bills with status dot (moss/gold/red/copper), bill ID + title, status label, "Updated" time. The first row is the live one — copper background tint, copper border, copper status text.
  - **Activity panel**: header label "Activity · last 24h", then a 3-col grid of activity items. Each item has a 14px gradient circle avatar, a short ellipsing description with a strong name and a copper highlight, and a time stamp.

### Signal Pipeline Art (`.art-pipe`)
An animated SVG funnel — four data sources converging into a tunnel mouth and exiting to an "ES Index" badge.
- **Background**: dark ink with copper radial center and faint horizontal lines.
- **HTML labels**: corner status ("Backend · Live"), top-right ticker ("Thousands / week"), four absolutely-positioned source pills on the left side (top 18% / 36% / 54% / 72% — "Twitter / Facebook / News RSS / Email"), and a "ES Index" pill on the right with a copper background.
- **SVG layer** (positioned inset 42px 14px 32px): four curved Bezier feed paths converging from the left source positions to a center point (240, 125). On top of that center point, three concentric ellipses (rx 22/16/11, all centered (240–278, 125)) animate opacity 0.25↔0.9 with staggered delays — this is the "tunnel mouth". A trunk path exits horizontally to the right (293 → 360).
- **Animated signals**: For each of the 4 feed paths, an `<animateMotion>` circle (r=3, copper / warm / dim / moss colors) travels along the path on a 3.4s loop, staggered 0.7s each. Two more circles travel the trunk path on a 1.4s loop, simulating signals exiting the tunnel.
- **Bottom stat line**: "4 sources · dedupe · verify  →  index" (right half in copper).

### Inline Case Study Swap
Each work card lives inside a `.work-slot` wrapper. When the "View case study →" button is clicked:
1. The slot gets `.casing` class.
2. The `.work-card` is hidden (`opacity: 0; pointer-events: none; position: absolute`).
3. A `.case-panel` is created/shown inside the slot — same dimensions as the card.
4. The panel fades in (`opacity: 0 → 1; transform: translateY(12px) → 0; 350ms ease`).
5. Sibling cards in other slots stay put.
6. Clicking the panel's "← Back" button reverses the transition (panel fades out, then `.casing` removed and original card re-shown).
7. **Wide slot variant** (Urbanstems): the case panel's body uses a 2-col grid so the long-form content reads as columns instead of a tall scroll.

### Case study panel contents (per project)
- **Header**: Back button, "№ XX / Case study" eyebrow, h3 title (sans + serif italic), serif italic sub-line, `<dl>` of meta (Year, Role, Team/Stack, Outcome — copper).
- **Sections** (typically 3): "The brief" / "The build" / "The outcome". Each has a copper eyebrow with a dash, an h4 headline, optional paragraphs, optional bulleted list with copper dash bullets, optional metrics grid (3 cards with sans-300 value + monospace label), optional stack chip row.
- The full case data is in the JS object `CASES` — see the HTML file for the exact prose.

### Code Snippet Marginalia
- Inside the `<pre>` code block, embed `<span class="marker" data-n="1">1</span>` numbered pills inline with the code.
- Render annotations on the right with matching `data-n` attributes.
- `mouseenter` on either a marker or an annotation activates both (the active marker gets `transform: scale(1.18)` and `background: white`; inactive annotations are at `opacity: 0.35`; active is `opacity: 1`).
- Default state: marker `1` is active on load and tab switch.

---

## Interactions & Behavior

### Scroll behavior
- **Hero parallax**: title, top labels, and scroll hint translate Y upward at scroll rates of -0.25 to -0.35× scrollY. Title fades to 0 by 1.2× hero height. Background image translates +0.4× scrollY with a 5% scale increase. Driven by a scroll listener.
- **Reveal-on-scroll**: any element with `.rv` class starts at `opacity: 0; transform: translateY(36px)` and animates to `opacity: 1; transform: none` over 900ms cubic-bezier(0.16, 1, 0.3, 1). An `IntersectionObserver` (threshold 0.15, rootMargin '0px 0px -8% 0px') adds the `.in` class as elements enter the viewport.
- **Stagger variants**: `.rv-s` adds 80ms delay, `.rv-m` 160ms, `.rv-l` 240ms.
- **Nav background**: nav element gets `.solid` class added when `window.scrollY > 40`.

### Hero satellite
- On `load` and `resize` (debounced 250ms): measure the container, query all exclusion-target elements (`.hero-title`, `.hero-tl`, `.hero-tr`, `.hero-scroll`, `.hero-br`), pad each by 14px, and place chips at random non-overlapping positions.
- Each chip stores `{x, y, w, h, vx, vy, paused}`. `vx, vy` are random unit vectors × speed `0.18–0.43px/frame`.
- `requestAnimationFrame` loop: for each chip, advance position; on container-edge or exclusion-box overlap, find the smallest overlap axis and reflect that velocity component.
- `mouseenter` on a chip pauses it (sets `paused: true`), `mouseleave` resumes.

### Marquee strips
- Two `.marquee-strip` containers each get a `.marquee-track` populated with the tech chip array duplicated 2× (so the loop is seamless).
- CSS animation `marqueeL` (translateX 0 → -50%) on row 1, `marqueeR` (-50% → 0) on row 2.
- Hovering the strip pauses the animation.

### Case study toggle
- Per-slot inline swap, NOT a page transition. See "Inline Case Study Swap" component description above.

### Commit footer
- Click anywhere on the `.cf-bar` to toggle `.expanded` class on the parent `.cf`.
- Inside-bar links use `event.stopPropagation()` to avoid toggling.

### Mobile responsiveness
- Breakpoint at 1100px:
  - Nav links hidden (no hamburger needed at this size — just brand and CTA).
  - All major sections drop padding to 24px horizontal.
  - Grid layouts collapse to single column.
  - Career rows reflow: date eyebrow → outcome badge → body (full width, no 62ch cap on prose).
  - Marquee animation duration shortens (60s / 70s).
  - Stack header collapses to single column.
- Important: the mobile career rule must be specified as `.career .career-row` (not just `.career-row`) to override the desktop selector's specificity.

---

## State Management
Minimal global state — almost all interactions are local:
- **Per-slot case-study state**: a boolean (open/closed) keyed by project id. In a React implementation, lift this to a parent `Work` component or co-locate in each `WorkSlot`.
- **Code snippet active tab + active marker**: local to the `Craft` component.
- **Commit footer expanded**: boolean local to the `CommitFooter` component.
- **Nav scrolled**: derived from `window.scrollY` — use a `useScrollPosition` hook or a single passive scroll listener.

No data fetching is required for the design — the GitHub commit list is hardcoded static data. In production, you may want to wire that to the real GitHub API (`GET /users/fseddo/events/public`) but the design specifies the static fallback content for offline / unauthenticated viewers.

---

## Design Tokens

### Colors
```css
--cream:     #EFE8DA  /* page background */
--cream-2:   #E5DCC9  /* subtle alt surface (craft, contact strip) */
--cream-3:   #D6CAB0
--ink:       #1B140C  /* primary text, dark surfaces */
--ink-2:     #2A1F14
--ink-mid:   #5C4F40  /* body text */
--ink-light: #8C7E68  /* eyebrows, meta */
--line:      rgba(27,20,12,.14)
--line-2:    rgba(27,20,12,.08)
--copper:    #B85A2A  /* primary accent — eyebrows, italic emphasis, active states */
--copper-2:  #8B3F1A  /* darker copper for gradients */
--moss:      #5A6D3A  /* secondary accent — "exploring" tag, success states */
```

### Typography
```
--sans:  'Geist', system-ui, sans-serif
--serif: 'Instrument Serif', Georgia, serif
--mono:  'Geist Mono', ui-monospace, monospace
```

Load via Google Fonts:
```
Instrument+Serif:ital@0;1
Geist:wght@300;400;500;600;700
Geist+Mono:wght@400;500
```

### Type scale
- **Hero h1**: `clamp(80px, 14vw, 232px)` / weight 300 / line-height 0.86 / tracking -0.045em
- **Section h2**: `clamp(40px, 5vw, 88px)` / weight 300 / line-height 0.95 / tracking -0.03em
- **Case h3**: `clamp(28px, 3vw, 40px)` / weight 300 / line-height 1.1
- **Card h3**: `clamp(32px, 3.6vw, 52px)` / weight 300
- **Career h4**: 32px / weight 300
- **Body**: 15.5–17px / line-height 1.6–1.7 / `--ink-mid`
- **Eyebrow (monospace)**: 10.5px / letter-spacing 0.18em / uppercase / `--copper` with a `width:32px; height:1px; background:--copper` pseudo-element before
- **Italic accents**: any word that should pop uses `<span class="it">` → switches to `--serif`, `font-style: italic`, color `--copper` (or `--cream` on dark surfaces)

### Spacing
- Section padding: 120–140px vertical / 56px horizontal (24px on mobile)
- Card frame: 4:3 default, 21:9 for wide hero cards
- Grid gaps: 32px (work meta), 48px (intro/craft/career), 64px (work grid), 96px (career inner)

### Radii
- Pill: 99px (chips, buttons, status indicators)
- Card: 0 (sharp edges intentional — this is a print-feeling design)
- Soft (only inside the CMS art): 4–6px

### Shadows
- Dark cards / commit footer: `0 30px 60px -25px rgba(27,20,12,0.4)`
- Subtle elevation (cards on cream): no shadow — borders only (`1px solid --line`)

### Easing
- Default transition: `cubic-bezier(0.16, 1, 0.3, 1)` — soft-out, generous (use for reveal, card hover scale, case-study fade)
- Default duration: 250–450ms for hover, 900ms for reveal

---

## Assets

| Asset | Origin | Used for |
|---|---|---|
| `assets/urbanstems-ref.png` | Reference screenshot provided by user | Hero image for the Urbanstems case-study card |
| `assets/Francesco_Seddo.pdf` | Résumé provided by user | Downloaded from the contact strip "download the résumé" link |
| `image-slot.js` | Custom web component | Drop-in placeholder for images the user fills in later. In the production build this should be replaced with proper `<img>` or `next/image` tags |

No icon library is used — all glyphs are unicode arrows (`→`, `←`, `↗`, `↓`, `↑`) and dots.

---

## Files
- `v9-material-mix.html` — the complete design prototype. Open in any browser to see the working version. All styles are inline; the only external dependency is Google Fonts.
- `image-slot.js` — custom element script used by the prototype for image placeholders. Not required in production.
- `assets/urbanstems-ref.png` — Urbanstems reference image used in the work section.
- `assets/Francesco_Seddo.pdf` — résumé PDF served from the contact link.

---

## Recommended Implementation Plan

1. **Bootstrap** Next.js 14 (App Router) + Tailwind + TypeScript.
2. **Wire fonts** via `next/font` (Geist, Instrument Serif, Geist Mono).
3. **Set up design tokens** in `tailwind.config.ts` — map the colors above to `cream`, `ink`, `copper`, `moss`, etc., and the type scale.
4. **Build atoms first**: `Eyebrow`, `SectionHeading`, `Pill`, `Chip`, `MetricCard`, `StackChip`.
5. **Build the persistent chrome**: `<Nav>` and `<CommitFooter>`. Both use a `usePathname`-aware scroll listener.
6. **Build sections top-down**: `<Hero>` (with the satellite chip system), `<Intro>`, `<Work>` (with `<WorkSlot>` and `<CaseStudy>` co-located), `<Craft>` (snippet renderer + marginalia interaction), `<Career>`, `<StackMarquee>`, `<ContactStrip>`, `<Footer>`.
7. **Animations**: prefer Framer Motion for the case-study swap and reveal-on-scroll. CSS animation is fine for the marquee strips. The hero satellite must stay imperative (raf loop) — port it to a `useEffect` that owns the chip state and `requestAnimationFrame` handle.
8. **Accessibility**: every button is keyboard-reachable (test the case-study toggle and the commit-footer expand). The marquee should pause on `prefers-reduced-motion`. The satellite chips should freeze (or be replaced with a static grid) under `prefers-reduced-motion`.
9. **Responsive**: implement the 1100px breakpoint behaviors listed above. Mobile-first is fine — the design is content-driven and works at any width once the grids collapse.
