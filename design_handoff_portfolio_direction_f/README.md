# Handoff: Portfolio — Direction F ("Warm Cream / Copper")

## Overview

A single-page personal portfolio for **Francesco Seddo**, a Software Engineer III based in New York. The page introduces him, shows three case-studied projects, lists career history, lists tech stack, and ends with contact links.

The design direction ("F") is a warm, editorial, paper-toned aesthetic — cream background, deep warm ink for body text, a copper accent, and an italic serif (Instrument Serif) used for emphasis inside a clean grotesque (DM Sans) heading system. The hero has a softly drifting "tech glyph" canvas in the background.

There are two parity files in this bundle: **`Direction F.html`** (the canonical light version this handoff documents) and **`Direction F Dark.html`** (a dark companion in the same layout — included for reference; treat the light one as canon).

## About the Design Files

The HTML files in this bundle are **design references, not production code**. They were authored as self-contained prototypes to communicate look, layout, motion, copy, and interaction. They use vanilla HTML/CSS/JS with everything inlined (`<style>` and `<script>` in one document) because that is the fastest way to iterate on a static prototype — it is **not** the architecture this portfolio should ship in.

The task is to **recreate this design in the target codebase's existing environment** — typically a React/Next.js app — using its established patterns (component library, design tokens, routing, asset pipeline, image-optimization component, etc.). If no environment exists yet, **Next.js (App Router) + TypeScript + Tailwind** is the recommended pick: the design already uses Tailwind-friendly tokens, all type weights ship from Google Fonts via `next/font`, and the page is fundamentally a long-scroll marketing page that benefits from Next's image optimization (`next/image`) and static generation.

## Fidelity

**High-fidelity.** All colors, type sizes, spacing, line-heights, border-radii, animation durations, and copy are final. Recreate the UI pixel-perfectly. The motion (canvas drift, marquee, hero-chip bob, signal-pipeline particles, case-study panel swap) is integral to the feel — please port it, not just the static styles.

The only fuzzy areas are:

- The **About photo** (`uploads/IMG_5489.JPG`) is the real photograph and should be kept as-is, optimized.
- The **Urbanstems carousel images** are screenshots of the live demo and should be replaced with current screenshots if available, otherwise kept.
- The **resume PDF** is a placeholder file path; the real one will be supplied by Francesco.

---

## Page Structure — Top to Bottom

The page is a single long scroll. In order:

1. **Fixed nav** (top, 60 px tall)
2. **Hero** (full viewport, two-column with a 320 px right rail of "status chips")
3. **About** (intro, with photo)
4. **Selected Work** (3 project cards, the first spans full width)
5. **Experience** (3 timeline rows)
6. **Stack** (4 columns of tech)
7. **Footer / Contact**

All body sections share `max-width: 1280px`, `padding: 100px 40px`, and a `1px solid var(--line)` bottom border. The hero is full-bleed and has its own internal max-width wrapper (`1440px`).

---

## Design Tokens

### Colors

| Token | Hex / Value | Use |
|---|---|---|
| `--cream` | `#EFE8DA` | Page background |
| `--cream-2` | `#E5DCC9` | Card backgrounds, footer background |
| `--cream-3` | `#D6CAB0` | Hero floor marquee, case-study panel background |
| `--ink` | `#1B140C` | Primary text |
| `--ink-2` | `#2A1F14` | (reserved; not currently used) |
| `--ink-mid` | `#5C4F40` | Body / secondary text |
| `--ink-light` | `#8C7E68` | Tertiary text, captions, mono labels |
| `--line` | `rgba(27,20,12,.14)` | Section dividers, borders |
| `--line-2` | `rgba(27,20,12,.07)` | Lighter inner dividers |
| `--copper` | `#B85A2A` | Accent (italic serif, eyebrows, chips, dots) |
| `--copper-dim` | `oklch(72% 0.09 35)` | Hero eyebrow only |
| `--moss` | `#5A6D3A` | "Open to roles" green-ish dot, status dot |
| Status green | `#3F8A4A` | "Open to roles" hero chip dot |
| Vote-pending yellow | `#D9A23A` | Inline status badges in CMS art |
| Stalled red | `#C84A3A` | Inline status badges in CMS art |

Selection: `background: var(--ink); color: var(--cream);`

The full-page background has a **paper-grain overlay** — a fixed `body::before` pseudo-element with `background-image: radial-gradient(circle at 1px 1px, rgba(27,20,12,.04) 1px, transparent 0); background-size: 3px 3px; opacity: .55;`. Reproduce this in the global layout; it is what makes the cream feel like paper.

### Typography

Three families, all loaded from Google Fonts:

| Family | Role | Weights |
|---|---|---|
| **DM Sans** | UI / headings / body sans | 300, 400, 500, 600, 700 |
| **Instrument Serif** | Italic accents inside headings (`<span class="it">`) | 400 italic |
| **JetBrains Mono** | Eyebrows, labels, monospaced UI labels, badges | 400, 500 |

Heading style: **DM Sans 300, tight tracking** (`letter-spacing: -.025em` to `-.035em`), large sizes (`clamp(36–72px, ...)`), line-height `0.95–1.1`. Inside any heading, a `<span class="it">` flips the run to **Instrument Serif 400 italic in copper** — this is the design's signature move and must be preserved everywhere it appears.

Body copy: **DM Sans 400, 15px / 1.75**, color `--ink-mid`.

Eyebrows / monospace labels: **JetBrains Mono 400/500, 10–11px, uppercase, letter-spacing 0.12–0.18em, copper**, often prefixed with a `28px × 1px` copper hairline (`::before { content:''; width:28px; height:1px; background:var(--copper); }`).

### Spacing & Layout

- Section vertical padding: `100px` desktop, `70px` mobile.
- Section horizontal padding: `40px` desktop, `22px` mobile.
- Section max-width: `1280px` (hero wrap is `1440px`).
- Cards: `border-radius: 14px`, `border: 1px solid var(--line)`, hover-lift `translateY(-3px)` + `box-shadow: 0 24px 50px -28px rgba(27,20,12,.22)`.
- Button pills: `border-radius: 99px`.
- Buttons / chips horizontal padding: 11–20 px depending on size.
- Mobile breakpoint: `900px`.

### Motion

| Motion | Duration | Easing |
|---|---|---|
| Reveal on scroll (`.rv → .in`) | 800 ms | `cubic-bezier(.16,1,.3,1)` |
| Card hover lift | 300 ms | `cubic-bezier(.16,1,.3,1)` |
| Hero-side chip bob | 7.5–9.5 s loop | `ease-in-out` |
| Hero floor marquee | 38 s loop | `linear` |
| Carousel auto-advance | 5 s interval | crossfade 600 ms |
| Case-study panel swap | 350–450 ms | `cubic-bezier(.16,1,.3,1)` |
| Signal-pipeline particles | 1.4–3.4 s loop | SVG `animateMotion` |
| Signal-pipeline rings | 2.6 s pulse | `ease-in-out` |

A `.rv` class starts at `opacity: 0; transform: translateY(24px)`; an IntersectionObserver flips it to `.in` (`opacity: 1; transform: none`) when the element is 12 % visible with an 8 % bottom margin. Stagger delays come from `.rv-s` (80 ms), `.rv-m` (160 ms), `.rv-l` (240 ms).

---

## Section-by-Section Specification

### 1. Nav (`<nav id="nav">`)

- **Position**: `fixed`, top, full width, `z-index: 100`, height **60 px**.
- **Padding**: `0 40px` (`0 22px` mobile).
- **Background**: transparent over hero; once `window.scrollY > 40` it gains `.solid`, which is `rgba(239,232,218,.88)` + `backdrop-filter: blur(14px)` + bottom border `var(--line)`. Transition: `.3s` on background / border / blur.
- **Left**: logo. A 7 × 7 copper dot + `Francesco Seddo` in DM Sans 600, 13 px, uppercase, letter-spacing `.18em`.
- **Center**: link list — `About`, `Work`, `Career`, `Stack`, `Contact`. JetBrains Mono 11 px, uppercase, `.14em` tracking, color `--ink-mid`, hover → `--ink`. Hidden under 900 px.
- **Right**: `Resume ↗` CTA. Mono 11 px, `7px 16px` pill, `1px solid var(--ink)`, transparent background. Hover fills `--ink` with `--cream` text.

### 2. Hero (`<section class="hero" id="hero">`)

Layout: `min-height: 100vh`, two-column grid `1fr 320px`, gap `64px`, padding `120px 40px 110px`, max width `1440px`.

Stacked layers (z-index ascending):
- **Canvas** (`#hero-canvas`, `z-index: 1`) — see the "Hero canvas" section below.
- **Veil** (`z-index: 2`) — two radial / linear gradients that softly lighten the upper-left and tint the bottom warmer.
- **Grain** (`z-index: 3`) — 4 px radial-gradient grain at 0.45 opacity.
- **Content wrap** (`z-index: 5`).

**Left column (`.hero-main`, max-width 640 px):**

1. Eyebrow: `Software Engineer III · New York` — Mono 10.5 px uppercase `.18em`, color `--copper-dim`, prefixed by a 28 × 1 copper hairline.
2. **H1**: two lines — `Francesco` then `<span class="it">Seddo.</span>` on its own line. DM Sans 300, `clamp(48px,5.5vw,72px)`, line-height `.95`, letter-spacing `-.035em`. The `Seddo.` line flips to Instrument Serif italic in copper.
3. **Deck paragraph** (16 px / 1.65, `--ink-mid`, max 48 ch):
   > I build **fast, durable web applications** and the systems behind them. Frontend-leaning, fullstack by nature. Four years at Leadership Connect.
4. **Action row** (`.hero-actions`, gap 10 px, margin-bottom 48 px):
   - Primary `View work →`: `--ink` fill, `--cream` text, hover swaps to `--copper` background and lifts 1 px.
   - Ghost `GitHub` (with inline SVG icon, 14 × 14): translucent `rgba(255,252,247,.55)` with `backdrop-filter: blur(8px)`, `1px solid var(--line)`, hover → `#fff` background + `--ink` border.
   - Ghost `LinkedIn` (same style as GitHub).
5. **Stat row** (`.hero-stats`, divided by 1px lines):
   - `2s` — *Load · was 3+ min*
   - `60%` — *Pipeline time saved*
   - `40%` — *Workflow time saved*
   - `4yr` — *Leadership Connect*
   - Each stat: value DM Sans 300 28 px with the unit (`s`, `%`, `yr`) in `--copper`; label JetBrains Mono 9.5 px uppercase `--ink-light`.

**Right column (`.hero-side`, three chips):**

Each chip is a translucent card: `rgba(255,252,247,.7)` + `backdrop-filter: blur(14px) saturate(140%)`, `1px solid var(--line)`, `border-radius: 13px`, `padding: 14px 16px`, soft shadow.

Chip contents:
1. Green dot · **Open to roles** / Senior · Staff · Fullstack
2. Copper dot · **React · TypeScript** / Primary stack · TanStack
3. Moss dot · **New York, NY** / Open to remote

Each chip bobs vertically by 12 px on its own loop (durations 7.5 / 9.5 / 8.5 s, staggered negative delays). The 2nd chip is `align-self: flex-end; width: 92%`; the 3rd is `align-self: flex-start; width: 96%`. This produces the asymmetric stagger.

**Floor marquee (`.hero-floor-marquee`):**

- Pinned to the bottom of the hero, full width, `--cream-3` background, `1px solid var(--line)` top.
- 11 px vertical padding.
- A horizontal track loops left at `38s linear infinite` (CSS `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`).
- Items: `React / TypeScript / Next.js / Spring Boot / Kotlin / Django / PostgreSQL / Elasticsearch / TanStack / Jotai / AWS / Docker`, each separated by a copper `/` glyph. Duplicate the list once inline so the transform-50 % wrap is seamless.

#### Hero canvas (the drifting tech glyphs)

A fullscreen `<canvas>` underneath the content. It draws **51 particles** total — 17 distinct branded "tech chip" glyphs, each instanced 3 times — drifting slowly with random velocity and rotation. Each glyph is rendered at very low alpha (`0.10–0.26`) so it integrates with the warm hero instead of dominating.

Glyphs (each `~14–28 px`, drawn from scratch per frame):

1. **React** — dark rounded rect with three rotating cyan ellipses + dot.
2. **TS** — blue rounded rect with white `TS`.
3. **JS** — yellow rounded rect with ink `JS`.
4. **Next** — black circle with white `N`.
5. **Node** — green hexagon with white `Node`.
6. **Py** — half blue / half yellow circle with white `Py`.
7. **K (Kotlin)** — diagonal purple→pink→orange gradient rounded rect with white `K`.
8. **PG** — blue circle with white `PG`.
9. **Docker** — blue rounded rect with five small white blocks (whale silhouette).
10. **AWS** — dark rounded rect, orange smile arc, orange `AWS`.
11. **Tail (Tailwind)** — slate circle with cyan wave.
12. **Sp (Spring)** — green circle with white leaf.
13. **ES (Elastic)** — dark rounded rect with yellow / teal / pink stacked bars.
14. **Dj (Django)** — dark green rounded rect with green serif `Dj`.
15. **Jotai** — navy circle with lavender ring + dot.
16. **Vite** — purple→orange lightning bolt.
17. **Fig (Figma)** — black circle with the five-circle Figma logo.

Particles initialize with random `(x, y)`, random `vx/vy` in `[-0.21, 0.21]`, random rotation `0–2π`, random rotation velocity `±0.00175`, random alpha `0.10–0.26`. On each frame: clear, translate to particle position, rotate, set alpha, draw the glyph at scale `s`, restore. Wrap around screen edges with `s*4` padding.

Resize handler re-measures `offsetWidth/Height` and re-applies `dpr` transform (`Math.max(1, devicePixelRatio || 1)`). Use `requestAnimationFrame` at native rate (no throttling).

> **Reproducing in React/Next:** put the canvas in a `'use client'` component that mounts a `useEffect`, sizes itself to the parent, and runs the rAF loop. Pause on `document.hidden` for battery. The glyph dictionary is straightforward to port — see the inline `techs` array in `Direction F.html` around line ~880.

### 3. About (`<section id="about">`)

- Section eyebrow `About`, title `A short introduction.` (italic on "introduction"), right-aligned note `№ 01 / Available May 2026`.
- Two-column grid: **300 px photo column** + **flexible text column**, gap `64px`, vertically centered.
- Photo: `aspect-ratio: 3/4`, `border-radius: 8px`, `object-position: center 15%`. Source: `uploads/IMG_5489.JPG`.
- Floating badge bottom-right of the photo (`bottom: -14px; right: -14px`): cream card with name `Francesco Seddo` (13 px / 600) + role `SE III · NY` (Mono 10 px uppercase copper).
- Right column h3 (DM Sans 300 28–38 px, max 22ch): *Engineer who cares about the **full picture.*** (the words "full picture." in italic serif copper).
- Three paragraphs of body copy — see source for exact text.

### 4. Selected Work (`<section id="work">`)

Section eyebrow `Selected work`, title `Projects.`, note `№ 02 / Three of many`.

A 2-column grid (`gap: 24px`). The first card spans both columns (`grid-column: 1/-1`); the remaining two share the second row.

Each card (`.work-card`) is a column with an **art area** on top and a **body area** below.

#### Project 1 — Urbanstems (wide, with image carousel)

- Art: `aspect-ratio: 21/9` (wide override), holds an `<img>` carousel.
- Two slides cross-fade every 5 s (`opacity` 600 ms transition). Slides: `uploads/Screenshot 2026-05-02 001352.png` and `uploads/Screenshot 2026-05-02 001432.png`.
- **Tag** (top-left, z 4): `01 · Full-stack e-commerce`. Mono 10 px uppercase, cream, prefixed by an 18 × 1 cream hairline.
- **Dots** (bottom-left, z 4): two 7 × 7 dots; active dot stretches to a 22 × 7 cream pill.
- **Demo CTA** (bottom-right, z 4): `View live demo ↗` — cream pill background `rgba(239,232,218,.94)`, ink text, hover widens gap from 7 → 11 px. Links to `https://urbanstems-sim.up.railway.app/`.
- **Veil**: bottom-up dark gradient to make tag / dots legible — `linear-gradient(180deg, transparent 0%, transparent 55%, rgba(27,20,12,.55) 88%, rgba(27,20,12,.92) 100%)`.
- Body padding: `28px 32px 30px`. Eyebrow `2025 · Live · Personal build`. h3 `Urbanstems Clone` (28 px). One paragraph + 5 tech chips + `View case study →` underline button.

#### Project 2 — Legislative Tracker (CMS art)

- Art: `aspect-ratio: 5/4`, contains a **hand-drawn CMS mockup** entirely in HTML/CSS (no image asset). Class `.art-cms`. See the source for exact markup — it is a 70 px left rail + main pane with a top crumb bar (`Bills / 119th / Energy`), an `Active bills.` heading + filter/export/track buttons, a 3-stat strip (`In committee 242 / Pending 31 / Stalled 14`), and a 5-row bill table where row 1 (`HR-2901 — Energy Innovation Act`) is highlighted with a copper-tinted background.
- All proportions in this mockup must hit at the card's actual render size — that is why most type is in the 7.5–13 px range. Don't bump it up.
- Tag: `02 · CMS rebuild`. Body: eyebrow `2025 · Lead · 6 engineers`, h3 `Legislative Tracker` (italic on "Tracker").

#### Project 3 — Signal Pipeline (animated SVG)

- Art: `aspect-ratio: 5/4`, holds an **animated SVG diagram** (`.art-pipe`).
- Dark warm background `#14100a` with a soft radial copper glow + faint horizontal stripe pattern.
- Four labelled source pills on the left (`Twitter`, `Facebook`, `News RSS`, `Email`) at 18 / 36 / 54 / 72 % vertical positions, each with a glowing copper dot.
- Four bezier feed paths (`.feed`) from each source to a central point `(240, 125)`.
- Three concentric copper ellipses pulse at offset delays around `(240–278, 125)` — `.ring.r1/r2/r3` with `ringPulse` keyframes (`opacity 0.25 ↔ 0.9`, 2.6 s).
- A short trunk path `(293, 125) → (360, 125)` to a glowing copper pill labelled `ES Index`.
- Six animated `<circle>` elements use SVG `animateMotion` along the feeds (3.4 s loop, staggered 0/0.7/1.4/2.1 s starts) and the trunk (1.4 s loop, 0 / 0.7 s starts). Colors: primary copper, warm `#E08A4A`, dim `#D9A23A`, moss `#5A6D3A`, each with a matching drop-shadow filter.
- Bottom strip: `4 sources · dedupe · verify` / `→ index` in copper. Top corner: `Signal pipeline` (with copper dot) / `Thousands / week`.
- Tag: `03 · Backend automation`. Body: eyebrow `2024–26 · Production · Backend lead`, h3 `Signal Pipeline` (italic on "Pipeline").

#### Card → Case study panel swap

Each card lives inside a `<div class="work-slot">`. Clicking `View case study →` runs `openCase(id)`:

1. The card fades to `opacity: 0` and is taken out of flow (`position: absolute; inset: 0; pointer-events: none`).
2. A `.case-panel` is generated in place — same size as the card slot, `--cream-3` background, `1px solid var(--line)`, soft shadow.
3. The panel slides up (`translateY 12px → 0`) and fades in over 350 ms (`cubic-bezier(.16,1,.3,1)`).
4. The wide slot uses a two-column layout inside the panel; the narrow slots are single-column.
5. `← Back` (mono 10.5 px, underlined) closes it; panel fades out, the card returns.

Each panel contains:
- `← Back` button.
- `№ NN / Case study` mono eyebrow in copper.
- h3 title (with italic serif span).
- Italic serif subhead.
- A `<dl>` of meta rows (Year, Role, Stack, etc.) — mono 10 px uppercase, copper for the "outcome" value.
- Sections, each with a labelled eyebrow, an h4, optional `<p>`'s, optional bulleted `<ul>` (custom 10 × 1 copper hairline bullets), optional 3-up metric tiles (`.case-metric`), and an optional final stack-chip row (`.case-stack`, first chip filled copper).

Case-study content for all three projects (titles, subs, meta, sections, bullets, metrics, stacks) is defined in the `CASES` object at the bottom of `Direction F.html`. **Lift the content verbatim** — copy was wordsmithed deliberately.

### 5. Experience (`<section id="career">`)

Section eyebrow `Career`, title `Experience.`, note `№ 03 / Four years, one company`.

Three rows in a vertical list. Each row is a 3-column grid (`200px 1fr auto`, gap `36px`), `padding: 32px 0`, with a 1 px top border (and a 1 px bottom border on the last row).

Row layout:
- Col 1: date range (Mono 10.5 px uppercase `--ink-light`) + company (Mono 11 px uppercase 500 in `--copper`).
- Col 2: role title (DM Sans 400, 20 px, with italic serif accent on suffix words like *III*, *II*, *Developer*) + a description paragraph (14 px / 1.7, max 62 ch, `--ink-mid`, with `<strong>` runs in `--ink`).
- Col 3: a small pill badge (1 px border, Mono 10.5 px). On row hover, the row shifts right by 14 px and the badge fills `--copper` with cream text.

Rows (top → bottom, newest first):

1. **Mar 2026 — Present** · Leadership Connect · *Software Engineer III* · badge `Arch lead`. Description: "Leading **frontend architecture** across two codebases — driving design discussions, cross-team code reviews, and release coordination. Rebuilding the automated signal pipeline (Spring Boot · Kotlin · Elasticsearch) processing thousands of weekly signals."
2. **Jan 2025 — Mar 2026** · Leadership Connect · *Software Engineer II* · badge `3 min → 2s`. Description: "Led a **6-engineer, 6-month rebuild** of a legislative bill-tracking CMS. Migrated Vue/PHP → React + TanStack + Tailwind + Jotai. Page loads from 3+ min to under 2 seconds. Thousands of daily users, no design team."
3. **Feb 2022 — Jan 2025** · Leadership Connect · *Fullstack Developer* · badge `40% faster`. Description: "Built the company's first landing dashboard — a **personalized, permission-based** task system reducing time-to-completion by 40%. Created a reusable Jotai/Zod validation framework and CI/CD pipelines saving ~2h/day per user across hundreds of users."

### 6. Stack (`<section id="stack">`)

Section eyebrow `Stack`, title `Technologies.`, note `№ 04 / Daily tools, in order`.

Four columns (`grid-template-columns: repeat(4, 1fr)`, gap `32px`). Each column:
- Category label (Mono 10 px 500 uppercase `.18em`, 1 px `--ink` bottom border, padding-bottom 10 px). Right side of the label shows the count in `--ink-light`.
- Bulletless `<ul>` of items, each 13.5 px `--ink-mid`, `line-height: 2`, hover → `--ink`.

Columns:

| Category | Items |
|---|---|
| **Frontend** (10) | React, Next.js, Vue, React Native, TanStack Query, TanStack Router, Jotai, Redux, Tailwind, Zod |
| **Backend & Infra** (10) | Node.js, Express, Spring Boot, Django, PostgreSQL, Elasticsearch, Firebase, AWS, Docker, Jenkins |
| **Languages** (6) | TypeScript, JavaScript, Python, Kotlin, HTML5, CSS3 |
| **Tools & AI** (9) | Vite, Jest, Vitest, Playwright, React Testing Library, Figma, Claude, Cursor, Copilot |

### 7. Footer / Contact (`<section id="contact" class="footer-section">`)

- Background `--cream-2`, top border `--line`, padding `80px 40px 36px`.
- Inner: a 2-column grid (`1fr auto`) with the content block on the left and a status pill on the right (aligned to bottom-right).
- Eyebrow `Get in touch`. Headline `Let's build together.` (DM Sans 300 36–56 px, with "together." in italic serif copper).
- A row of inline links (`gap: 8px 28px`): `fseddo@example.com`, `LinkedIn`, `GitHub`, `Resume`. Each link is DM Sans 17 px with a small mono arrow (`→`, `↗`, `↓`). Each underline-on-default (`border-bottom: 1px solid var(--line)`); hover swaps color + border to `--copper` and widens the icon gap from 8 to 14 px.
- Status pill (`Open to roles`): mono 10.5 px uppercase, 1 px border, with a 7 px moss dot ringed by `rgba(90,109,58,.2)`.
- Meta row (under a 1 px divider): `© 2026 Francesco Seddo` / `New York, NY · Available May 2026` / `Designed & built solo`. Mono 10 px uppercase `--ink-light`.

---

## Interactions & Behavior Recap

1. **Sticky nav blur**: on `scroll > 40 px`, nav gains translucent cream + blur + bottom border.
2. **In-view reveal**: every `.rv` element rises + fades when 12 % visible. `.rv-s/m/l` stagger by 80 / 160 / 240 ms.
3. **Hero canvas drift**: 51 tech-chip particles, low-alpha, slow drift, slow rotation, wrap around edges.
4. **Hero floor marquee**: 38 s left-scroll, infinite, duplicate inline once for seamless loop.
5. **Hero side chips bob**: each chip independently translateY(-12 px) on its own ease-in-out loop.
6. **Urbanstems carousel**: auto-advances every 5 s; dot click jumps and restarts the timer; 600 ms crossfade.
7. **Signal pipeline**: SVG `animateMotion` particles along bezier feeds + trunk; three concentric copper rings pulse.
8. **Project card hover**: 3 px lift, shadow, art `img-wrap` scales to 1.03 over 1.2 s.
9. **View case study**: clicking the button on a card swaps the card for an inline case-study panel in the same slot, in-place, no scroll jump. `← Back` reverses it.
10. **Experience row hover**: row slides right by 14 px and badge fills copper.
11. **Tech chip hover** (inside project cards): fills copper, removes border.

---

## State Management Notes

There's almost no app state — this is a static marketing page. The only stateful bits are local to their components:

- **Open case study**: which project (if any) has its panel open. Reasonable to model as `openCaseId: 'urbanstems' | 'tracker' | 'pipeline' | null` at the work-section level.
- **Carousel index**: `currentSlide: number` local to the Urbanstems card.
- **Nav scrolled state**: derived from `scrollY`; in React use a `useEffect` that listens passively and a single `boolean` state.

No data fetching. All copy is hardcoded — recommend extracting into a typed content module (e.g. `content/portfolio.ts`) so future copy edits don't touch JSX.

---

## Assets

All in this bundle under `uploads/`:

| File | Use |
|---|---|
| `IMG_5489.JPG` | About-section photo of Francesco. Object-position `center 15%`. |
| `Screenshot 2026-05-02 001352.png` | Urbanstems carousel slide 1. |
| `Screenshot 2026-05-02 001432.png` | Urbanstems carousel slide 2. |
| `Francesco_Seddo.pdf` | Resume — linked from nav CTA and footer. |

No icon library is used. The only inline SVGs are the GitHub and LinkedIn glyphs in the hero action row — both are 24 × 24 single-path icons with `fill="currentColor"`; the source is in `Direction F.html` around line 380. Copy them as-is, or replace with the codebase's icon library equivalents.

The CMS mockup and signal-pipeline diagram are pure HTML/CSS/SVG — no raster assets.

---

## Files in This Bundle

- `Direction F.html` — **canonical** design reference, light theme.
- `Direction F Dark.html` — companion dark-theme exploration in the same layout. Use as reference if a dark-mode is wanted later; otherwise ignore.
- `uploads/` — all referenced assets.

---

## Recommended Implementation Order

1. Set up project shell (Next.js + TS + Tailwind + Google Fonts via `next/font`).
2. Define design tokens in `tailwind.config.ts` (`cream`, `cream-2`, `cream-3`, `ink`, `ink-mid`, `ink-light`, `copper`, `moss`, etc.) and add a `font-sans` / `font-serif` / `font-mono` mapping.
3. Build the static sections first (About, Experience, Stack, Footer) — they have no motion beyond reveal.
4. Build the nav + scroll-blur + smooth anchor scrolling.
5. Build the Hero — static layout first, then add the marquee, then the bobbing chips, then the canvas.
6. Build the Work cards (without the case-study swap), including the CMS and Pipeline pure-CSS/SVG art.
7. Add the case-study panel swap last — it's the most stateful piece.
8. Add the IntersectionObserver `.rv → .in` reveal as a small hook (`useInView`) applied to every section primitive.
9. Optimize: pause hero canvas on `document.hidden`, lazy-mount below-the-fold motion components, swap `<img>` for `next/image`.
10. QA at 360 / 768 / 1280 / 1440 widths. Mobile breakpoint is 900 px in the source.

If anything in this document is ambiguous, open `Direction F.html` directly — every value, every easing, every line of copy is in there.
