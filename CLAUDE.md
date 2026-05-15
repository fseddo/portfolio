# Portfolio rules

Auto-loaded for the whole repo. Rules only — for rationale and worked
examples, follow the links at the bottom of each section once `docs/` exists.

These rules are carried over from a larger sibling project. They've been
trimmed to what applies *here* (single-page Vite + React + TanStack Router
+ Tailwind v4 portfolio). When you add new dependencies or architecture
layers (data fetching, forms, animation library), promote the relevant
patterns into this file rather than relying on memory.

## State

`useState` is fine for genuinely local, ephemeral UI state. It is NOT the
default. Before adding one, check whether an existing primitive already
answers:

- _Shared across routes / unmounts?_ → lift to a parent, or reach for Jotai.
  Survives reload? `atomWithStorage`.
- _Filter / sort / page state?_ → URL search params via the route's
  `validateSearch`.
- _Derived from props/state?_ → compute inline. No `useState` +
  `useEffect`-to-sync pair.

A `useState` mirroring something already in a URL, atom, or computable value
is a bug — the two desync. If you find yourself writing `useEffect` to keep
them in sync, delete the `useState` and read from the source.

**Hoist popup/modal/sheet visibility state to the parent.** The component
takes `onClose`; the parent owns the `useState`.

**`useEffect` is for side effects only** — subscribing to events you can't
attach via JSX, mutating outside React, async setup with cleanup. Not for
"react to state by setting other state" (that's a smell pointing at
hoisting state, deriving instead, or moving the logic into the event
handler).

## Naming

Names match the reader's expectation from the name alone — no hovering for
types, no learning local jargon.

- **Functions** → name the *operation*: `asString(v)`, `formatCents`. Not
  the call site or the return type.
- **Variables and value props** → name what the value *is*: `columnCount:
  number` over `columns: number` (which reads as an array). `selectedSlug`
  over `selected` when the value is the slug.
- **Boolean props** → name the *action*: `withBackdrop`, `hasIcon`,
  `showCount`. Verb prefix signals it's a toggle. Avoid structural jargon
  (`leaf`, `head`, `tail`).

## Reuse and derive types

When the same field/key list appears in two places, derive one from the
other:

- **Mapped conditional types** to extract a subset of keys by value type.
- **Single-source literal unions** — define once and import (e.g.
  `ViewMode` in [src/home/HomePage.tsx](src/home/HomePage.tsx)).
- **`Pick` / `Omit` / `Extract`** to narrow without redeclaring.
- **Generics** so callers' typed values flow through instead of widening.

**Derive types, not values.** `useState<ViewMode>('spiral')` has the same
type safety as `useState<ViewMode>(VIEW_MODES[0])`. Don't add indirection
for its own sake — name a constant if the position is semantic (`const
DEFAULT_VIEW = 'spiral'`).

## Function syntax

- **Arrow functions** for all declarations including React components:
  `const Foo = (props: Props) => {}`. Never `function Foo() {}`.
- **One component per file** by default. Route files in `routes/` are thin
  (route definition + page-component import); the page component lives
  under `src/<area>/`. See [routes/index.tsx](routes/index.tsx).
- **Drop `async`** from arrow functions whose body is a single returned
  promise. Before stripping, verify the absence of `await`/`try` is
  intentional, not a missed transform.

## Styling — Tailwind v4

Tailwind v4 via `@tailwindcss/vite`. Design tokens live in
[src/globals.css](src/globals.css) under `@theme` (colors, fonts, radii,
easing). Reference them through generated utilities (`bg-cream`,
`text-copper`, `font-mono`, `ease-soft-out`).

- **Tailwind utilities first.** Compose styles inline in JSX. Don't write
  per-component CSS files unless the design needs something utilities
  can't express (complex keyframes, deeply nested non-reusable structure).
- **Cross-cutting primitives in `globals.css`.** Things every section
  reaches for and that aren't a single utility — `.it` (the italic-serif
  copper accent), `.rv` (reveal-on-scroll) — live there. They earn a
  global class name because they're applied site-wide.
- **Arbitrary values are fine when the design specifies an exact figure.**
  `text-[clamp(40px,5vw,88px)]`, `tracking-[-0.045em]` — the design
  handoff is the source of truth and most values are precise (not on the
  Tailwind default scale).
- **`cx` helper for conditional or composed classNames** lives at
  [src/common/utils/cx.ts](src/common/utils/cx.ts). Use it the moment a
  className is composed from more than one source. Don't template-literal
  concatenate — conditional fragments slip past type-checking and are
  harder to grep.

## Motion

Anything entering or leaving the UI must transition — never pop. Default
to a **fade** (`transition-opacity` with a small duration like 200ms); use
a **slide transform** when motion direction carries meaning (drawers,
sheets, top-arriving bars).

- **Slot stays reserved** → keep mounted, toggle
  `opacity-0 pointer-events-none` with `transition-opacity`. Cleanest path;
  no reflow.
- **Element must leave the DOM** → delayed-unmount state machine.
  `exiting` flag → `setTimeout(FADE_DURATION_MS)` → unmount.
- **Hiding would reflow neighbors** → hold the slot via flex/grid sizing
  or `visibility: hidden` so the fade plays clean before layout changes.
- **Content collapses / expands in place** → grid-template-rows trick
  (`grid-template-rows: 0fr ↔ 1fr` transition) so any content height
  slides cleanly without measuring.

Reference: the drawer in [src/home/HomePage.css](src/home/HomePage.css)
(staggered `:nth-child` delays, transform-driven slide).

## Extract when repetition is real

Don't abstract on the first instance — you don't know the variation
surface yet. **At 3+ near-identical bodies** (JSX blocks, conditionals,
helpers), extract a small reusable component or helper. Trigger is
*observed* repetition, not anticipated future use.

Three similar lines is better than a premature abstraction. No
half-finished implementations — finish or revert, don't leave both.

## Comments

Default to writing no comments. Only add one when the WHY is non-obvious:
a hidden constraint, a subtle invariant, a workaround for a specific bug,
behavior that would surprise a reader. If removing the comment wouldn't
confuse a future reader, don't write it.

Don't explain WHAT the code does — well-named identifiers already do
that. Don't reference the current task or callers ("used by X", "handles
the case from issue Y") — those belong in the PR description and rot as
the codebase evolves.

Exception: math-heavy code (helix arrangement, marquee transforms) earns
a short formula block. The geometry isn't obvious from reading the
implementation; the formula is.

## Other conventions

- **Don't hand-edit `routeTree.gen.ts`** — the Vite plugin
  (`@tanstack/router-plugin`) rewrites it on route file changes. See
  [vite.config.ts](vite.config.ts).
- **Persistent client state** → Jotai `atomWithStorage`. If a loader
  reads such an atom, declare it with `{ getOnInit: true }` — the default
  only hydrates on React mount, so loaders see the initial value on hard
  refresh.
- **Env vars** → `.env` (gitignored). Vite exposes them as
  `import.meta.env.VITE_*`.
- **No dead code.** Delete unused files, exports, props, branches. If
  something is unused, you can delete it completely — no `// removed`
  comments, no underscore-renaming of unused params. Type-checking + git
  history are sufficient.

## When to update this file

A rule belongs here when it's been violated *and* corrected at least once,
or when it embodies a non-obvious choice you'd make again. Speculative
rules ("we'll probably want X someday") just rot.
