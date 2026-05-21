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
    className='border-t border-line bg-cream-2 px-10 py-9 max-[900px]:px-5.5'
  >
    <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-widest text-ink-light max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-2'>
      <span className='flex items-center gap-2.25'>
        <span className='h-1.5 w-1.5 rounded-full bg-copper' />© 2026 Francesco Seddo
      </span>
      <span>New York, NY · Available May 2026</span>
      <span>Designed &amp; built solo</span>
    </div>
  </section>
);
