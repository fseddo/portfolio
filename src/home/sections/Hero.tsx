import { useEffect, useRef } from 'react';
import { HeroSatellite } from './HeroSatellite';

// Hero owns the parallax scroll listener and writes transforms directly to
// the title/labels/scroll-hint refs. State-driven parallax would re-render
// on every scroll event — keeping it imperative is the standard pattern.
export const Hero = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => {
      const y = window.scrollY;
      const max = window.innerHeight;
      const p = Math.min(1, y / max);

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${-y * 0.35}px)`;
        titleRef.current.style.opacity = (1 - p * 1.2).toFixed(3);
      }
      if (tlRef.current) {
        tlRef.current.style.transform = `translateY(${-y * 0.25}px)`;
        tlRef.current.style.opacity = (1 - p * 1.4).toFixed(3);
      }
      if (trRef.current) {
        trRef.current.style.transform = `translateY(${-y * 0.25}px)`;
        trRef.current.style.opacity = (1 - p * 1.4).toFixed(3);
      }
      if (scrollRef.current) {
        scrollRef.current.style.opacity = Math.max(0, 1 - p * 3).toFixed(3);
      }
    };

    apply();
    window.addEventListener('scroll', apply, { passive: true });
    return () => window.removeEventListener('scroll', apply);
  }, []);

  return (
    <section className='relative h-screen min-h-[680px] overflow-hidden bg-ink'>
      <div className='absolute inset-0 z-[1]'>
        <HeroSatellite />
      </div>
      <div
        className='pointer-events-none absolute inset-0 z-[2]'
        style={{
          background:
            'linear-gradient(180deg,rgba(27,20,12,.45) 0%,transparent 25%,transparent 60%,rgba(27,20,12,.75) 100%),linear-gradient(90deg,rgba(27,20,12,.35) 0%,transparent 35%)',
        }}
      />

      <div
        ref={tlRef}
        className='hero-tl absolute left-10 top-[84px] z-[5] font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.18em] text-cream/70 will-change-[transform,opacity] max-[1100px]:left-6 max-[1100px]:right-6 max-[1100px]:top-[78px]'
      >
        <div className='flex items-center gap-[10px] before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-copper before:content-[""]'>
          Now / Software Engineer III
        </div>
        <div>
          <span className='text-cream/40'>Based</span> &nbsp; New York, NY
        </div>
        <div>
          <span className='text-cream/40'>Tenure</span> &nbsp; 4 years ·
          Leadership Connect
        </div>
      </div>

      <div
        ref={trRef}
        className='hero-tr absolute right-10 top-[84px] z-[5] text-right font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.18em] text-cream/70 will-change-[transform,opacity] max-[1100px]:right-6 max-[1100px]:top-[78px]'
      >
        <div>
          <span className='text-copper'>●</span> Available May 2026
        </div>
        <div>Open to senior fullstack roles</div>
      </div>

      <div
        ref={titleRef}
        className='hero-title absolute bottom-[120px] left-10 z-[5] max-w-[90%] text-cream will-change-[transform,opacity] max-[1100px]:bottom-[96px] max-[1100px]:left-6'
      >
        <h1 className='mb-7 font-sans font-light leading-[0.86] tracking-[-0.045em] text-[clamp(80px,14vw,232px)]'>
          Francesco
          <br />
          <span className='it text-cream'>Seddo.</span>
        </h1>
        <div
          className='flex max-w-[600px] items-center gap-[14px] font-sans text-[13px] font-medium uppercase tracking-[0.24em] text-cream/75'
          style={{}}
        >
          <span className='inline-block h-px w-12 bg-copper' />
          Frontend-leaning, fullstack by nature.
          <span className='ml-4 text-cream/50'>
            Four years, one company, three rebuilds.
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='hero-scroll absolute bottom-8 left-10 z-[5] flex items-center gap-[14px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream/55 will-change-[opacity] max-[1100px]:left-6'
      >
        <span>Scroll</span>
        <span className='relative block h-px w-[60px] overflow-hidden bg-cream/40'>
          <span className='absolute inset-y-0 -left-[30%] w-[30%] animate-[heroSlide_2.4s_ease-in-out_infinite] bg-cream' />
        </span>
        <span>Explore</span>
      </div>

      <div className='hero-br absolute bottom-8 right-10 z-[5] text-right font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.18em] text-cream/55'>
        Portfolio
        <br />№ 07 / 2026
      </div>
    </section>
  );
};
