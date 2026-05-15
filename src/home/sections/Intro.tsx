import { Eyebrow } from '../../common/atoms/Eyebrow';
import { SectionHeading } from '../../common/atoms/SectionHeading';

export const Intro = () => (
  <section
    id='about'
    className='mx-auto grid max-w-[1440px] grid-cols-[240px_1fr] items-start gap-16 px-14 pt-[120px] pb-[100px] max-[1100px]:grid-cols-1 max-[1100px]:gap-12 max-[1100px]:px-6'
  >
    <aside className='sticky top-24 font-mono text-[10.5px] uppercase leading-[1.8] tracking-[0.18em] text-ink-light max-[1100px]:static'>
      <span className='block text-ink-light'>About</span>
      <span className='mb-[18px] block text-copper'>— 01</span>
      <span className='block text-ink-light'>Discipline</span>
      <span className='block text-ink'>Fullstack engineering</span>
    </aside>
    <div className='max-w-[1000px]'>
      <Eyebrow className='rv mb-6'>About</Eyebrow>
      <SectionHeading className='rv rv-s !text-[clamp(36px,4vw,60px)] !leading-none !tracking-[-0.025em] text-balance mb-7'>
        Four years, one company, <span className='it'>three rebuilds.</span>
      </SectionHeading>
      <p className='rv rv-m max-w-[62ch] font-sans text-[17px] leading-[1.6] text-ink-mid [&_strong]:font-medium [&_strong]:text-ink'>
        Frontend-leaning, fullstack by nature. React, TypeScript, TanStack on
        the frontend. Kotlin, Spring, Elasticsearch on the backend.
        Pixel-perfect UIs and the systems behind them.
      </p>
    </div>
  </section>
);
