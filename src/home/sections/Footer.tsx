export const Footer = () => (
  <footer className='border-t border-cream/[0.12] bg-ink px-14 pb-20 pt-12 font-mono text-[11px] uppercase tracking-[0.06em] text-cream max-[1100px]:px-6'>
    <div className='mx-auto grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-12 text-cream/55 max-[1100px]:grid-cols-1 max-[1100px]:gap-[18px] [&_a]:text-cream/80 [&_a]:no-underline hover:[&_a]:text-copper'>
      <span>© 2026 Francesco Seddo</span>
      <div className='flex justify-self-center gap-6 max-[1100px]:justify-self-start'>
        <span>New York, NY</span>
        <span>·</span>
        <span>Available May 2026</span>
      </div>
      <div className='flex gap-[18px] max-[1100px]:justify-self-start'>
        <a href='#'>LinkedIn</a>
        <a href='#'>GitHub</a>
        <a href='mailto:hello@seddo.dev'>Email</a>
      </div>
    </div>
  </footer>
);
