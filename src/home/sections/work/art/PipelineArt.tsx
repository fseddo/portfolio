const SOURCES = [
  { label: 'Twitter', top: '18%' },
  { label: 'Facebook', top: '36%' },
  { label: 'News RSS', top: '54%' },
  { label: 'Email', top: '72%' },
];

// SVG feed paths: each Bezier curve from a left-edge source position to the
// tunnel mouth at (240, 125). Signal circles animateMotion along these.
const FEEDS = [
  { id: 'p1', d: 'M 88 45  C 150 45, 200 110, 240 125' },
  { id: 'p2', d: 'M 88 90  C 160 90, 210 118, 240 125' },
  { id: 'p3', d: 'M 88 135 C 160 135, 210 132, 240 125' },
  { id: 'p4', d: 'M 88 180 C 160 180, 210 142, 240 125' },
];

const SIGNAL_FILLS = [
  { fill: 'var(--color-copper)', shadow: 'rgba(184,90,42,.9)' },
  { fill: '#E08A4A', shadow: 'rgba(184,90,42,.9)' },
  { fill: '#D9A23A', shadow: 'rgba(184,90,42,.9)' },
  { fill: 'var(--color-moss)', shadow: 'rgba(90,109,58,.7)' },
];

export const PipelineArt = () => (
  <div
    className='absolute inset-0 overflow-hidden bg-[#14100a]'
    style={{
      backgroundImage:
        'radial-gradient(circle at 50% 50%,rgba(184,90,42,.16),transparent 65%),repeating-linear-gradient(0deg,transparent 0 22px,rgba(255,255,255,.018) 22px 23px)',
    }}
  >
    <div className='absolute left-[18px] top-[14px] z-[5] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40 before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-copper before:content-[""]'>
      Backend · Live
    </div>
    <div className='absolute right-[18px] top-[14px] z-[5] font-mono text-[10px] uppercase tracking-[0.14em] text-cream/55'>
      Thousands / week
    </div>

    {SOURCES.map((s) => (
      <span
        key={s.label}
        className='absolute left-[18px] z-[4] flex items-center gap-[7px] rounded-[6px] border border-cream/[0.14] bg-cream/[0.06] px-[9px] py-[5px] font-mono text-[10px] uppercase tracking-[0.14em] text-cream/[0.78] backdrop-blur-[6px]'
        style={{ top: s.top }}
      >
        <span className='h-[5px] w-[5px] shrink-0 rounded-full bg-copper shadow-[0_0_8px_var(--color-copper)]' />
        {s.label}
      </span>
    ))}

    <span className='absolute right-[14%] top-1/2 z-[5] -translate-y-1/2 rounded-[6px] bg-copper px-3 py-[7px] font-mono text-[11px] uppercase tracking-[0.16em] text-cream shadow-[0_0_0_5px_rgba(184,90,42,.18),0_0_24px_rgba(184,90,42,.4)]'>
      ES Index
    </span>

    <svg
      viewBox='0 0 400 250'
      preserveAspectRatio='none'
      className='absolute inset-[42px_14px_32px] h-[calc(100%-74px)] w-[calc(100%-28px)] overflow-visible'
    >
      <defs>
        <linearGradient id='trunkGrad' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#B85A2A' stopOpacity='0' />
          <stop offset='40%' stopColor='#B85A2A' stopOpacity='.9' />
          <stop offset='100%' stopColor='#B85A2A' stopOpacity='1' />
        </linearGradient>
      </defs>

      {FEEDS.map((f) => (
        <path
          key={f.id}
          id={f.id}
          d={f.d}
          fill='none'
          stroke='rgba(239,232,218,.22)'
          strokeWidth={1.2}
        />
      ))}

      {/* Tunnel mouth: three concentric ellipses with staggered pulse,
          plus a solid throat ellipse at the tunnel's right edge. */}
      <ellipse
        cx='240'
        cy='125'
        rx='22'
        ry='48'
        fill='none'
        stroke='rgba(184,90,42,.55)'
        strokeWidth={1.4}
        style={{ animation: 'ringPulse 2.6s ease-in-out infinite' }}
      />
      <ellipse
        cx='260'
        cy='125'
        rx='16'
        ry='38'
        fill='none'
        stroke='rgba(184,90,42,.55)'
        strokeWidth={1.1}
        opacity={0.6}
        style={{ animation: 'ringPulse 2.6s ease-in-out 0.4s infinite' }}
      />
      <ellipse
        cx='278'
        cy='125'
        rx='11'
        ry='28'
        fill='none'
        stroke='rgba(184,90,42,.55)'
        strokeWidth={0.9}
        opacity={0.35}
        style={{ animation: 'ringPulse 2.6s ease-in-out 0.8s infinite' }}
      />
      <ellipse cx='293' cy='125' rx='6' ry='18' fill='rgba(184,90,42,.35)' />

      <path
        id='trunk'
        d='M 293 125 L 360 125'
        fill='none'
        stroke='var(--color-copper)'
        strokeWidth={2}
        strokeLinecap='round'
        style={{ filter: 'drop-shadow(0 0 6px rgba(184,90,42,.5))' }}
      />

      {FEEDS.map((f, i) => (
        <circle
          key={`signal-${f.id}`}
          r={3}
          fill={SIGNAL_FILLS[i].fill}
          style={{
            filter: `drop-shadow(0 0 6px ${SIGNAL_FILLS[i].shadow})`,
          }}
        >
          <animateMotion
            dur='3.4s'
            repeatCount='indefinite'
            rotate='auto'
            begin={`${i * 0.7}s`}
          >
            <mpath href={`#${f.id}`} />
          </animateMotion>
        </circle>
      ))}

      <circle
        r={3.5}
        fill='var(--color-copper)'
        style={{ filter: 'drop-shadow(0 0 6px rgba(184,90,42,.9))' }}
      >
        <animateMotion dur='1.4s' repeatCount='indefinite' begin='0s'>
          <mpath href='#trunk' />
        </animateMotion>
      </circle>
      <circle
        r={3.5}
        fill='#E08A4A'
        style={{ filter: 'drop-shadow(0 0 6px rgba(184,90,42,.9))' }}
      >
        <animateMotion dur='1.4s' repeatCount='indefinite' begin='0.7s'>
          <mpath href='#trunk' />
        </animateMotion>
      </circle>
    </svg>

    <div className='absolute inset-x-[18px] bottom-[14px] z-[5] flex justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-cream/45'>
      <span>4 sources · dedupe · verify</span>
      <span className='text-copper'>→ index</span>
    </div>
  </div>
);
