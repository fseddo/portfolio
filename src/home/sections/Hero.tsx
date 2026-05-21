import { cx } from '../../common/utils/cx';
import {
  HERO_CHIPS,
  HERO_STATS,
  MARQUEE_ITEMS,
  SOCIAL,
  type HeroChip,
} from '../data/portfolio';
import { HeroCanvas } from './HeroCanvas';

/** Maps the abstract dot color in our data to the CSS class globals exposes. */
const DOT_CLASS: Record<HeroChip['dot'], 'c2' | 'cu' | 'ms'> = {
  c2: 'c2',
  copper: 'cu',
  moss: 'ms',
};

const ALIGN: Record<NonNullable<HeroChip['align']>, string> = {
  end: 'self-end',
  start: 'self-start',
};

const GithubIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='h-3.5 w-3.5 shrink-0'>
    <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z' />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='h-3.5 w-3.5 shrink-0'>
    <path d='M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z' />
  </svg>
);

export const Hero = () => (
  <section
    id='hero'
    className='hero relative flex min-h-screen items-center overflow-hidden bg-cream text-ink'
  >
    <HeroCanvas />

    {/* Soft cream veil over the canvas — slightly cool to match the linen palette. */}
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_at_22%_32%,rgba(234,231,221,0.45)_0%,rgba(234,231,221,0)_55%),linear-gradient(180deg,transparent_0%,transparent_72%,rgba(220,216,203,0.55)_100%)]'
    />
    {/* Inner hero grain. */}
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 z-3 opacity-45 bg-[radial-gradient(circle_at_1px_1px,rgba(27,32,29,0.04)_1px,transparent_0)] bg-size-[4px_4px]'
    />

    <div className='relative z-5 mx-auto grid w-full max-w-360 grid-cols-[1fr_320px] items-center gap-16 px-10 pt-30 pb-27.5 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[900px]:px-5.5 max-[900px]:pt-25 max-[900px]:pb-22.5'>
      <div className='max-w-160'>
        <h1 className='mb-5.5 mt-30 text-copper font-sans font-light leading-[0.95] tracking-[-0.035em] text-[clamp(48px,5.5vw,72px)]'>
         I’m Francesco.
        </h1>

        <p className='mb-8 max-w-[70ch] text-base leading-[1.65] text-ink-mid flex flex-col gap-4 font-medium'>
          <span>I have four years of experience building production web apps in a startup environment. I'm comfortable jumping between problems, picking up new skills, and working closely with end-users to build solutions that make their lives easier.</span>
          <span>Always trying to become a stronger engineer — through work and my own projects. I'm interested in roles where I'm challenged technically, have room to grow, and make a real impact.</span>
        </p>

        <div className='mb-12 flex flex-wrap items-center gap-2.5'>
          <a
            href='#projects'
            className='inline-flex items-center gap-2 rounded-pill border border-transparent bg-ink px-5 py-2.75 font-mono text-[11.5px] tracking-[0.08em] text-cream transition-all duration-250 hover:-translate-y-px hover:bg-copper'
          >
            View Projects →
          </a>
          <a
            href={SOCIAL.github}
            target='_blank'
            rel='noreferrer'
            aria-label='GitHub'
            className='inline-flex items-center gap-2 rounded-pill border border-line bg-[rgba(248,245,236,0.55)] px-5 py-2.75 font-mono text-[11.5px] tracking-[0.08em] text-ink backdrop-blur-md transition-all duration-250 hover:border-ink hover:bg-white'
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href={SOCIAL.linkedin}
            target='_blank'
            rel='noreferrer'
            aria-label='LinkedIn'
            className='inline-flex items-center gap-2 rounded-pill border border-line bg-[rgba(248,245,236,0.55)] px-5 py-2.75 font-mono text-[11.5px] tracking-[0.08em] text-ink backdrop-blur-md transition-all duration-250 hover:border-ink hover:bg-white'
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>

        <div className='hero-stats flex flex-wrap border-t border-line pt-6'>
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cx(
                'hero-stat pr-9',
                i < HERO_STATS.length - 1 && 'mr-9 border-r border-line-2',
                'max-[900px]:mr-5 max-[900px]:mb-3.5 max-[900px]:pr-5'
              )}
            >
              {/* `.v` + `.cu` are palette hooks — `.cu` gets recolored per
                  hero-stat nth-child by the palette-expand block in globals. */}
              <div className='v mb-1.25 font-sans text-[28px] font-light leading-none tracking-tight text-ink'>
                {stat.value}
                <span className='cu'>{stat.unit}</span>
              </div>
              <div className='font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-light'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='hero-side flex flex-col gap-3 max-[900px]:flex-row max-[900px]:flex-wrap'>
        {HERO_CHIPS.map((chip) => (
          <div
            key={chip.heading}
            style={{
              animation: `hbob ${chip.bobDurationS}s ease-in-out ${chip.bobDelayS}s infinite`,
              width: `${chip.widthPct}%`,
            }}
            className={cx(
              'hchip flex items-center gap-2.75 rounded-[13px] border border-line bg-[rgba(248,245,236,0.7)] p-4 shadow-[0_8px_24px_-12px_rgba(27,32,29,0.16)] backdrop-blur-[14px] backdrop-saturate-140 will-change-transform',
              chip.align && ALIGN[chip.align]
            )}
          >
            <span className={cx('d', DOT_CLASS[chip.dot])} />
            <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
              <span className='text-[13.5px] font-medium leading-tight tracking-[-0.005em] text-ink'>
                {chip.heading}
              </span>
              <span className='font-mono text-[10.5px] tracking-[0.04em] text-ink-light'>
                {chip.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Floor marquee. Items and separators are flat siblings inside the
        track so `.marquee-sep:nth-of-type(3n)` lands cleanly in palette-
        expand and the separator color can rotate c1/c2/c3. */}
    <div className='hero-floor-marquee absolute inset-x-0 bottom-0 z-5 overflow-hidden border-t border-line bg-cream-3 py-2.75'>
      <div
        className='marquee-track inline-flex whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.18em]'
        style={{ animation: 'marquee 38s linear infinite' }}
      >
        {/* Duplicate the items twice so translateX(-50%) wraps seamlessly. */}
        {[0, 1].flatMap((cycle) =>
          MARQUEE_ITEMS.flatMap((item) => [
            <span key={`${cycle}-${item}-i`} className='marquee-item px-6'>
              {item}
            </span>,
            <span key={`${cycle}-${item}-s`} className='marquee-sep text-copper/60'>
              /
            </span>,
          ])
        )}
      </div>
    </div>
  </section>
);
