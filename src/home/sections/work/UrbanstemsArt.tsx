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
              'absolute inset-0 transition-opacity duration-600 ease-out',
              i === current ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img src={slide.src} alt={slide.alt} className='h-full w-full object-cover object-top-left' />
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

      <div className='absolute bottom-4.5 left-4.5 z-4 flex gap-1.75'>
        {URBANSTEMS_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type='button'
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={cx(
              'h-1.75 cursor-pointer border-0 p-0 transition-[width,background-color,border-radius] duration-250',
              i === current
                ? 'w-5.5 rounded-pill bg-cream'
                : 'w-1.75 rounded-full bg-cream/32'
            )}
          />
        ))}
      </div>

      <a
        href={URBANSTEMS_DEMO_URL}
        target='_blank'
        rel='noreferrer'
        className='absolute right-4.5 bottom-4.5 z-4 inline-flex items-center gap-1.75 rounded-pill bg-cream/94 px-3.5 py-2.25 font-mono text-[10.5px] tracking-[0.06em] text-ink transition-all duration-250 hover:gap-2.75 hover:bg-white'
      >
        View live demo ↗
      </a>
    </>
  );
};
