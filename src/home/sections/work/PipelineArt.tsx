/**
 * Animated SVG ingest diagram for the Signal Pipeline card art.
 *
 * Everything in this card — source pills, feeds, rings, trunk, ES Index
 * pill, stat line — lives inside ONE SVG with a single viewBox so the
 * entire diagram scales as a single proportional unit. `preserveAspect-
 * Ratio` is left at its default (`xMidYMid meet`), so as the card resizes,
 * the whole composition shrinks together without warping and without
 * elements drifting away from each other.
 *
 * Geometry: viewBox `-20 0 440 250` — the viewBox is 40 units wider than
 * the content range so there's ~5% empty padding on each side before the
 * source pills (x=8) and the ES Index pill (right edge x=397). Sources sit
 * on the left (rect right edge at x=108) and their feeds (`pf1`–`pf4`)
 * curve to a common convergence point at (240,125). From there a single
 * trunk line continues right through the three pulsing rings and the
 * convergence core, terminating inside the ES Index pill at (342,125) —
 * one visible pipe carrying the unified stream into the destination.
 *
 * Particle animation: each particle travels a hidden "combined" path
 * (`pc1`–`pc4` in `<defs>`) that strings the source's feed bezier
 * together with the trunk's straight segment, so the particle continues
 * smoothly from source through rings to ES Index without re-emitting at
 * the convergence. While it travels, a SMIL `<animate>` on its `fill`
 * fades the color from the source's brand hue → unified orange around the
 * convergence point — the visible "homogenization" of the data.
 *
 * Styles live under `.art-pipe` in globals.css.
 */

type SourceVariant = 'default' | 'warm' | 'dim' | 'moss';

/** Brand-flavored color per source — start hue for each particle's fade. */
const VARIANT_COLOR: Record<SourceVariant, string> = {
  default: '#5bc8de', // Twitter — teal
  warm: '#4a6baa', // Facebook — brand blue
  dim: '#d5483a', // News RSS — red
  moss: '#b478e8', // Email — purple
};

/** End hue — the unified orange the streams shift to after the rings. */
const TRUNK_COLOR = '#d4884d';

/** Combined-path duration (feed + trunk). Longer than the old feed-only
 *  3.4s because each particle now also covers the trunk segment. */
const PARTICLE_DUR = '4.8s';

/**
 * SMIL `keyTimes` for the source→orange fill fade. `animateMotion`
 * interpolates a path by arc length, and the feed bezier accounts for
 * ~60% of the combined path's total length. Anchoring the fade window to
 * 0.55–0.70 puts the color transition right around the convergence point,
 * so the particle visibly "homogenizes" as it crosses into the rings.
 */
const FADE_KEY_TIMES = '0;0.55;0.7;1';

type Source = {
  label: string;
  sub: string;
  y: number;
  variant: SourceVariant;
  /** Visible feed bezier from the source pill (x=108) to convergence
   *  (240,125). The particle motion path is this + ` L 342 125` (the
   *  trunk straight segment), assembled in <defs> below. */
  feedD: string;
  /** Staggered start so the four particles ride the pipe at different
   *  phases. 1.2s apart = `PARTICLE_DUR / 4`, so when particle 1 loops
   *  back to its source, particle 4 has just arrived at ES Index. */
  begin: string;
};

const SOURCES: readonly Source[] = [
  {
    label: 'Twitter',
    sub: 'Bio & name changes',
    y: 35,
    variant: 'default',
    feedD: 'M 108 35 C 170 35, 210 105, 240 125',
    begin: '0s',
  },
  {
    label: 'Facebook',
    sub: 'Profile & post updates',
    y: 90,
    variant: 'warm',
    feedD: 'M 108 90 C 175 90, 215 118, 240 125',
    begin: '1.2s',
  },
  {
    label: 'News RSS',
    sub: 'Career-shift mentions',
    y: 145,
    variant: 'dim',
    feedD: 'M 108 145 C 175 145, 215 132, 240 125',
    begin: '2.4s',
  },
  {
    label: 'Email',
    sub: 'Mailbox decommissions',
    y: 200,
    variant: 'moss',
    feedD: 'M 108 200 C 170 200, 210 145, 240 125',
    begin: '3.6s',
  },
];

/** Trunk straight segment appended to each feed to form the particle's
 *  full source-to-ES-Index motion path. Kept separate from the visible
 *  trunk `<path>` so we can also render the trunk on its own (the visible
 *  single line through the rings). */
const TRUNK_SEGMENT = ' L 342 125';

const srcClassName = (variant: SourceVariant) =>
  variant === 'default' ? 'src' : `src ${variant}`;

const signalClassName = (variant: SourceVariant) =>
  variant === 'default' ? 'signal' : `signal ${variant}`;

export const PipelineArt = () => (
  <div className='art-pipe'>
    <svg viewBox='-20 0 440 250' xmlns='http://www.w3.org/2000/svg'>
      {/* Hidden combined paths (feed + trunk) — referenced only by the
          particles' <animateMotion>; not rendered visibly. PLUS one
          linearGradient per feed, anchored in viewBox coordinates so the
          source color sits at the source pill end and orange at the
          convergence point (240, 125). The feed's stroke uses the gradient
          so the line itself fades source → orange, matching the bubble
          color fade that travels along it. */}
      <defs>
        {SOURCES.map((src, i) => (
          <path
            key={`pc-${src.label}`}
            id={`pc${i + 1}`}
            d={`${src.feedD}${TRUNK_SEGMENT}`}
          />
        ))}
        {SOURCES.map((src, i) => (
          <linearGradient
            key={`fg-${src.label}`}
            id={`fg${i + 1}`}
            gradientUnits='userSpaceOnUse'
            x1='108'
            y1={src.y}
            x2='240'
            y2='125'
          >
            {/* Hold source color across the early/middle stretch of the
                feed, then fade to orange in the last ~30% so the
                homogenization visibly happens near the convergence — same
                spatial moment the bubbles change color. */}
            <stop
              offset='0%'
              stopColor={VARIANT_COLOR[src.variant]}
              stopOpacity='0.65'
            />
            <stop
              offset='70%'
              stopColor={VARIANT_COLOR[src.variant]}
              stopOpacity='0.7'
            />
            <stop offset='100%' stopColor={TRUNK_COLOR} stopOpacity='0.95' />
          </linearGradient>
        ))}
      </defs>

      {/* Source pills — two-line cards (name + what it sources). Rect right
          edge at x=108 so the feeds emerge from the pill's right edge. Each
          pill is vertically centered on its feed origin y. */}
      {SOURCES.map((src) => (
        <g
          key={src.label}
          className={srcClassName(src.variant)}
          transform={`translate(8, ${src.y - 13})`}
        >
          <rect className='src-bg' width='100' height='26' rx='3' />
          <circle className='src-dot' cx='7' cy='13' r='2.5' />
          <text className='src-label' x='15' y='11'>
            {src.label.toUpperCase()}
          </text>
          <text className='src-sub' x='15' y='21'>
            {src.sub}
          </text>
        </g>
      ))}

      {/* Visible feeds — only the source-to-convergence bezier. Stroke is
          per-feed gradient (defined above): source brand color at the pill
          end, orange at the convergence end. Control points are pulled
          right to keep curves smooth despite the wider vertical spread. */}
      {SOURCES.map((src, i) => (
        <path
          key={src.label}
          id={`pf${i + 1}`}
          className='feed'
          d={src.feedD}
          stroke={`url(#fg${i + 1})`}
        />
      ))}

      {/* Single trunk visible from convergence (240,125) through all rings
          to the ES Index pill. Drawn BEFORE the rings so each ring's
          stroke renders on top of it — sells the "tunnel sections in
          front of a continuing pipe" depth. */}
      <path id='trunk' className='trunk' d='M 240 125 L 342 125' />

      {/* Tunnel rings — render on top of the trunk so their strokes
          visibly cross the orange line. */}
      <ellipse className='ring r1' cx='240' cy='125' rx='22' ry='48' />
      <ellipse className='ring r2' cx='260' cy='125' rx='16' ry='38' />
      <ellipse className='ring r3' cx='278' cy='125' rx='11' ry='28' />

      {/* Convergence core — kept sage to stay part of the system "tunnel".
          Acts as a small filled highlight on the trunk at the trunk root. */}
      <ellipse cx='293' cy='125' rx='6' ry='18' fill='rgba(91,122,82,.35)' />

      {/* ES Index pill — sits at the trunk's right end. Trunk enters from
          the left side of the rect. */}
      <g className='tunnel-out' transform='translate(337, 112)'>
        <rect className='tunnel-out-bg' width='60' height='26' rx='4' />
        <text className='tunnel-out-label' x='30' y='16.5' textAnchor='middle'>
          ES INDEX
        </text>
      </g>

      {/* Particles — one per source. Each travels its combined path (feed
          + trunk) and fades its `fill` from the source's brand color to
          the unified trunk orange around the convergence point. */}
      {SOURCES.map((src, i) => {
        const startColor = VARIANT_COLOR[src.variant];
        return (
          <circle
            key={src.label}
            r='3'
            className={signalClassName(src.variant)}
          >
            <animate
              attributeName='fill'
              values={`${startColor};${startColor};${TRUNK_COLOR};${TRUNK_COLOR}`}
              keyTimes={FADE_KEY_TIMES}
              dur={PARTICLE_DUR}
              begin={src.begin}
              repeatCount='indefinite'
            />
            <animateMotion
              dur={PARTICLE_DUR}
              repeatCount='indefinite'
              begin={src.begin}
            >
              <mpath href={`#pc${i + 1}`} />
            </animateMotion>
          </circle>
        );
      })}
    </svg>
  </div>
);
