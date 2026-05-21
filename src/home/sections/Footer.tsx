import { Eyebrow } from '../../common/atoms/Eyebrow';
import { SOCIAL } from '../data/portfolio';

const LINKS = [
  {
    href: `mailto:${SOCIAL.email}`,
    label: (
      <>
        francesco.seddo@<span className='it'>gmail.com</span>
      </>
    ),
    arrow: '→',
  },
  { href: SOCIAL.linkedin, label: 'LinkedIn', arrow: '↗', external: true },
  { href: SOCIAL.github, label: 'GitHub', arrow: '↗', external: true },
  { href: SOCIAL.resumePdf, label: 'Resume', arrow: '↓', external: true },
] as const;

export const Footer = () => (
  <section
    id='contact'
    className='border-t border-line bg-cream-2 px-10 pt-20 pb-9 max-[900px]:px-5.5'
  >
    <div className='mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-end gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-6'>
      <div>
        <Eyebrow className='rv mb-5'>Get in touch</Eyebrow>
        <h2 className='rv rv-s mb-9 max-w-[16ch] font-sans font-light leading-none tracking-tight text-ink text-[clamp(36px,4.2vw,56px)]'>
          Let's build <span className='it'>together.</span>
        </h2>
        <div className='rv rv-m flex flex-wrap items-center gap-x-7 gap-y-2'>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={'external' in link && link.external ? '_blank' : undefined}
              rel={'external' in link && link.external ? 'noreferrer' : undefined}
              className='footer-link group inline-flex items-center gap-2 border-b border-line py-1.5 font-sans text-[17px] text-ink transition-all duration-250 hover:gap-3.5 hover:border-copper hover:text-copper'
            >
              <span>{link.label}</span>
              {/* `.arr` palette-expand hook — palette-expand recolors to c2 on hover. */}
              <span className='arr font-mono text-[13px] text-ink-light transition-colors duration-250 group-hover:text-copper'>
                {link.arrow}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className='rv rv-l flex flex-col items-end gap-3.5 max-[900px]:items-start'>
        <div className='inline-flex items-center gap-2.25 whitespace-nowrap rounded-pill border border-line px-3.5 py-1.75 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mid'>
          <span className='h-1.75 w-1.75 rounded-full bg-moss shadow-[0_0_0_3px_rgba(90,109,58,0.2)]' />
          Open to roles
        </div>
      </div>
    </div>

    <div className='mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-6 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-widest text-ink-light max-[900px]:mt-9 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-2'>
      <span className='flex items-center gap-2.25'>
        <span className='h-1.5 w-1.5 rounded-full bg-copper' />© 2026 Francesco Seddo
      </span>
      <span>New York, NY · Available May 2026</span>
      <span>Designed &amp; built solo</span>
    </div>
  </section>
);
