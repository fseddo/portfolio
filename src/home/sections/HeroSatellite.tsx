import { useEffect, useRef } from 'react';
import { SATELLITE_CHIPS } from '../data/satellite';
import { TechChip } from '../../common/atoms/TechChip';

type Rect = { x: number; y: number; w: number; h: number };
type Chip = Rect & { el: HTMLElement; vx: number; vy: number; paused: boolean };

const EXCLUSION_SELECTORS = [
  '.hero-title',
  '.hero-tl',
  '.hero-tr',
  '.hero-scroll',
  '.hero-br',
];
const EXCLUSION_PAD = 14;

const rectsOverlap = (a: Rect, b: Rect) =>
  !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);

// Imperative RAF chip system. Each chip is positioned absolutely inside the
// satellite container, drifts on a linear velocity vector, and reflects off
// the container edge or any exclusion rectangle (the hero text blocks). All
// motion is driven by transform updates; nothing in React state, so no
// re-renders during the loop.
export const HeroSatellite = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<Chip[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let rafId = 0;

    const getExclusions = (): Rect[] => {
      const wrapRect = wrap.getBoundingClientRect();
      return EXCLUSION_SELECTORS.flatMap((selector) => {
        const el = document.querySelector(selector);
        if (!el) return [];
        const r = el.getBoundingClientRect();
        return [
          {
            x: r.left - wrapRect.left - EXCLUSION_PAD,
            y: r.top - wrapRect.top - EXCLUSION_PAD,
            w: r.width + EXCLUSION_PAD * 2,
            h: r.height + EXCLUSION_PAD * 2,
          },
        ];
      });
    };

    const init = () => {
      const { width: W, height: H } = wrap.getBoundingClientRect();
      if (W < 10 || H < 10) return;
      const exclude = getExclusions();
      const chipEls = Array.from(
        wrap.querySelectorAll<HTMLElement>('[data-sat-chip]')
      );

      chipsRef.current = chipEls.map((el) => {
        const { width: w, height: h } = el.getBoundingClientRect();
        let x = 0;
        let y = 0;
        for (let tries = 0; tries < 60; tries++) {
          x = 20 + Math.random() * (W - w - 40);
          y = 20 + Math.random() * (H - h - 40);
          const r = { x, y, w, h };
          if (!exclude.some((ex) => rectsOverlap(r, ex))) break;
        }
        const speed = 0.18 + Math.random() * 0.25;
        const angle = Math.random() * Math.PI * 2;
        const chip: Chip = {
          el,
          x,
          y,
          w,
          h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          paused: false,
        };

        el.addEventListener('mouseenter', () => {
          chip.paused = true;
        });
        el.addEventListener('mouseleave', () => {
          chip.paused = false;
        });
        return chip;
      });

      // Stash exclusions on the closure so the tick loop can read them.
      tickExclusions = exclude;
    };

    let tickExclusions: Rect[] = [];

    const tick = () => {
      const { width: W, height: H } = wrap.getBoundingClientRect();
      for (const c of chipsRef.current) {
        if (!c.paused) {
          let nx = c.x + c.vx;
          let ny = c.y + c.vy;

          if (nx < 8) {
            nx = 8;
            c.vx = Math.abs(c.vx);
          }
          if (ny < 8) {
            ny = 8;
            c.vy = Math.abs(c.vy);
          }
          if (nx + c.w > W - 8) {
            nx = W - 8 - c.w;
            c.vx = -Math.abs(c.vx);
          }
          if (ny + c.h > H - 8) {
            ny = H - 8 - c.h;
            c.vy = -Math.abs(c.vy);
          }

          const future = { x: nx, y: ny, w: c.w, h: c.h };
          for (const ex of tickExclusions) {
            if (rectsOverlap(future, ex)) {
              // Reflect on whichever axis has the smallest overlap distance.
              // Distances signed so we know which side we entered from.
              const left = ex.x - (c.x + c.w);
              const right = ex.x + ex.w - c.x;
              const top = ex.y - (c.y + c.h);
              const bottom = ex.y + ex.h - c.y;
              const dx = Math.abs(left) < Math.abs(right) ? left : right;
              const dy = Math.abs(top) < Math.abs(bottom) ? top : bottom;
              if (Math.abs(dx) < Math.abs(dy)) {
                c.vx = dx < 0 ? -Math.abs(c.vx) : Math.abs(c.vx);
                nx = c.x + c.vx;
              } else {
                c.vy = dy < 0 ? -Math.abs(c.vy) : Math.abs(c.vy);
                ny = c.y + c.vy;
              }
              break;
            }
          }
          c.x = nx;
          c.y = ny;
        }
        c.el.style.transform = `translate3d(${c.x.toFixed(1)}px,${c.y.toFixed(1)}px,0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    init();
    rafId = requestAnimationFrame(tick);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(init, 250);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      className='absolute inset-0 overflow-hidden'
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 45%,#3a2a1a 0%,#1a120b 60%,#0e0a06 100%)',
      }}
    >
      {/* orbit grid + concentric rings — radial gradients give the
          "satellite view" effect */}
      <div
        className='absolute inset-0 opacity-70'
        style={{
          backgroundImage: [
            'radial-gradient(circle at 50% 50%,rgba(184,90,42,.12) 1px,transparent 1.5px)',
            'radial-gradient(circle at 50% 50%,transparent 0,transparent 18%,rgba(239,232,218,.04) 18.1%,transparent 18.4%)',
            'radial-gradient(circle at 50% 50%,transparent 0,transparent 32%,rgba(239,232,218,.035) 32.1%,transparent 32.4%)',
            'radial-gradient(circle at 50% 50%,transparent 0,transparent 46%,rgba(239,232,218,.03) 46.1%,transparent 46.4%)',
            'radial-gradient(circle at 50% 50%,transparent 0,transparent 60%,rgba(239,232,218,.022) 60.1%,transparent 60.4%)',
          ].join(','),
          backgroundSize: '42px 42px,100% 100%,100% 100%,100% 100%,100% 100%',
          backgroundPosition: '0 0,center,center,center,center',
        }}
      />
      <div
        className='absolute left-1/2 top-1/2 z-[3] h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper'
        style={{
          boxShadow:
            '0 0 0 6px rgba(184,90,42,.18),0 0 24px rgba(184,90,42,.65)',
        }}
      />

      <div ref={wrapRef} className='absolute inset-0 z-[2]'>
        {SATELLITE_CHIPS.map((chip) => (
          <TechChip
            key={chip.name}
            name={chip.name}
            years={chip.years}
            status={chip.status}
            size='sm'
            className='absolute left-0 top-0 cursor-default select-none will-change-transform'
            data-sat-chip
          />
        ))}
      </div>
    </div>
  );
};
