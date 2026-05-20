import { useEffect, useState } from 'react';
import { cx } from '../../../common/utils/cx';
import { URBANSTEMS_DEMO_URL, URBANSTEMS_SLIDES } from '../../data/portfolio';

const AUTO_MS = 5000;

export const UrbanstemsArt = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % URBANSTEMS_SLIDES.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className='absolute inset-0 z-1'>
        {URBANSTEMS_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={cx(
              'absolute inset-0 transition-opacity duration-[600ms] ease-out',
              i === current ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img src={slide.src} alt={slide.alt} className='h-full w-full object-cover object-left-top' />
          </div>
        ))}
      </div>

      {/* Bottom-up dark veil so the dots and demo CTA stay legible over any
          slide. Lives here (not on the .work-art container) because Tracker
          and Pipeline don't need it. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-2 bg-[linear-gradient(180deg,transparent_0%,transparent_55%,rgba(27,32,29,0.55)_88%,rgba(27,32,29,0.92)_100%)]'
      />

      <div className='absolute bottom-[18px] left-[18px] z-4 flex gap-[7px]'>
        {URBANSTEMS_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type='button'
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={cx(
              'h-[7px] cursor-pointer border-0 p-0 transition-[width,background-color,border-radius] duration-250',
              i === current
                ? 'w-[22px] rounded-pill bg-cream'
                : 'w-[7px] rounded-full bg-cream/[0.32]'
            )}
          />
        ))}
      </div>

      <a
        href={URBANSTEMS_DEMO_URL}
        target='_blank'
        rel='noreferrer'
        className='absolute right-[18px] bottom-[18px] z-4 inline-flex items-center gap-[7px] rounded-pill bg-cream/[0.94] px-[14px] py-[9px] font-mono text-[10.5px] tracking-[0.06em] text-ink transition-all duration-250 hover:gap-[11px] hover:bg-white'
      >
        View live demo ↗
      </a>
    </>
  );
};
