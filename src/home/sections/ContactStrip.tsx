export const ContactStrip = () => (
  <section
    id='contact'
    className='border-t border-line bg-cream-2 px-14 py-[60px] max-[1100px]:px-6 max-[1100px]:py-12'
  >
    <div className='mx-auto grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-12 max-[1100px]:grid-cols-1 max-[1100px]:gap-6'>
      <div className='flex items-center gap-[14px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-copper'>
        <span className='inline-block h-px w-8 bg-copper' />
        № 06 — Contact
      </div>

      <div className='font-sans font-light leading-tight tracking-[-0.015em] text-ink text-[clamp(22px,2.6vw,32px)]'>
        Get in touch — or{' '}
        <a
          href='/Francesco_Seddo.pdf'
          download
          className='inline-flex items-baseline gap-[6px] border-b border-copper font-serif italic text-copper no-underline transition-[gap,opacity] duration-200 hover:gap-3 hover:opacity-80'
        >
          download the résumé{' '}
          <span className='font-sans not-italic text-[0.85em]'>↓</span>
        </a>
      </div>

      <div className='flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] max-[1100px]:flex-wrap max-[1100px]:gap-[14px]'>
        <a
          href='mailto:hello@seddo.dev'
          className='rounded-pill bg-ink px-[18px] py-[11px] text-cream no-underline transition-colors duration-200 hover:bg-copper hover:text-white'
        >
          hello@seddo.dev →
        </a>
        <a
          href='#'
          className='inline-flex items-center gap-[7px] border-b border-ink pb-1 text-ink no-underline transition-[gap,color,border-color] duration-200 hover:gap-[14px] hover:border-copper hover:text-copper'
        >
          github
        </a>
        <a
          href='#'
          className='inline-flex items-center gap-[7px] border-b border-ink pb-1 text-ink no-underline transition-[gap,color,border-color] duration-200 hover:gap-[14px] hover:border-copper hover:text-copper'
        >
          linkedin
        </a>
      </div>
    </div>
  </section>
);
