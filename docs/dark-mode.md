# Dark variant — improvement note

## Status

Not implemented. Light is the canonical Direction F design and what currently
ships. The handoff bundle includes a `Direction F Dark.html` companion as a
reference exploration; this doc captures what would need to change so it can
be revived later without rediscovering the design decisions.

## What "dark" actually means here

It is **not** a global theme swap. The page background remains cream and most
sections are unchanged. Only the **hero** flips to a dark backdrop with cream
text, and the **nav over the hero** picks up a light-on-dark color set until
it scrolls into its solid cream state. Selected-Work / About / Experience /
Stack / Footer remain identical to light.

A future "full dark" mode would be a separate redesign — the Direction F Dark
file does not specify those sections.

## Token table

The Direction F Dark prototype reuses every existing `--cream` / `--ink` /
`--copper` / `--moss` value. No new color tokens. The dark hero is rendered
by pointing the hero surface at an existing token (`--ink` = `#1B140C`) and
flipping the text/border palette inside the section only.

| Surface | Light value | Dark hero value |
| --- | --- | --- |
| Hero background | `var(--cream)` (`#EFE8DA`) | `var(--ink)` (`#1B140C`) |
| Hero text | `var(--ink)` | `var(--cream)` |
| Hero veil | `radial(cream)` + `linear(cream-2)` warm tint | `linear-gradient(110deg, rgba(27,20,12,.88), rgba(27,20,12,.6) 45%, rgba(27,20,12,.15))` |
| Primary `.hbtn.p` | `bg-ink text-cream`, hover `bg-copper` | `bg-cream text-ink`, hover `bg-copper text-cream` |
| Ghost `.hbtn.g` | `bg-cream/55 border-line backdrop-blur` | `bg-transparent border-cream/30`, hover `bg-cream/[0.06] border-cream` |
| Side chip background | `rgba(255,252,247,.7)` (warm glass) | `rgba(42,31,20,.7)` (dark glass) |
| Side chip border | `var(--line)` | `rgba(239,232,218,.12)` |
| Side chip dot (green) | `#3F8A4A` | `#4F9A5A` (lifted +1 step for contrast against ink) |
| Floor marquee | `bg-cream-3 text-ink` | `bg-copper text-cream` (full copper, not warm bar) |
| Scroll cue line under hero | (none) | `1px line, animated 30% cream wipe over 2.4s` |
| Nav default state over hero | `text-ink-mid`, logo `text-ink` | `text-cream/70`, logo `text-cream`, CTA border `rgba(239,232,218,.4)` |
| Nav `.solid` (post-scroll) | `bg-cream/[0.88] backdrop-blur` (unchanged) | same — once nav passes the hero it returns to light behavior |

The `.it` italic-serif accent stays copper in both modes. Stats keep their
copper unit. `--copper-dim` still applies to the hero eyebrow.

## Implementation checklist

1. **Add a `mode` enum and atom.** `type ThemeMode = 'light' | 'dark'`;
   persistent via `atomWithStorage('portfolio.theme', 'light', { getOnInit:
   true })`. The Nav reads it. Persist on `[data-theme]` of `<html>` so SSR-
   style first paint can pick it up.
2. **Add a `[data-theme="dark"]` override block in `globals.css`** that, for
   `.hero` and `.hero *` only, swaps the values listed above. Body remains
   cream — do not touch `body`, `body::before`, or any non-hero section.
3. **Nav `over-hero` state.** Add a `useIsOverElement(heroRef)` helper that
   tracks whether the nav vertical band currently overlaps the hero. When
   `dark && overHero && !solid`, the Nav uses the dark color set from the
   table above. When `solid` (scrolled past 40px), Nav reverts to its light
   look regardless of theme — even in dark mode, the nav over body sections
   is light.
4. **Rebuild the Hero veil.** In dark mode the cream radial veil over the
   canvas would wash out the copper glyphs. Swap it for the ink-side
   gradient (see token table). Keep the inner `hero-grain` opacity.
5. **Marquee re-tint.** In dark mode the floor marquee is solid copper with
   cream text — the warm-cream-3 bar would lose contrast against ink hero.
6. **Add the scroll cue.** The dark hero adds a small "scroll" hint under
   the side chips (a 48px line with a 30% cream wipe animating across, 2.4s
   loop). Not present in the light version. Mount conditionally.
7. **Toggle UI.** A pill in the Nav (e.g. `☀ / ☾`) next to the Resume CTA.
   Disable mid-transition while the IntersectionObserver re-settles, or the
   `over-hero` flip will flash.

## Things to verify after porting

- Hero canvas glyphs are already dark-friendly (drawn with their own brand
  colors at low alpha) — confirm visually that contrast is acceptable; if
  the React/JS glyphs feel too dim against ink, raise the alpha floor in
  `HeroCanvas.tsx` from `0.10` to `~0.18` for dark mode specifically.
- The Open-to-roles green dot (`#3F8A4A`) is a touch too dark against ink;
  the prototype lifts it to `#4F9A5A`. Pass the lifted value as part of the
  dark token override.
- Test with `prefers-color-scheme: dark` as the initial value when the user
  has no stored preference yet (`atomWithStorage` default callback).

## What to ignore from the Dark prototype

- Section ordering, content, and copy are identical to light. Do not
  re-translate anything.
- The Dark prototype's CMS art and Pipeline art are unchanged — their dark
  backgrounds are already dark in light mode too.
- The Footer in Dark is unchanged from light.
