import { useEffect, useRef, useState } from 'react';
import { Eyebrow } from '../../../common/atoms/Eyebrow';
import { SectionHeading } from '../../../common/atoms/SectionHeading';
import { SNIPPETS } from '../../data/snippets';
import { cx } from '../../../common/utils/cx';

export const Craft = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMarker, setActiveMarker] = useState('1');
  const codeRef = useRef<HTMLPreElement>(null);

  const snippet = SNIPPETS[activeTab];

  // Reset active marker to '1' whenever the tab changes.
  useEffect(() => {
    setActiveMarker('1');
  }, [activeTab]);

  // The snippet code is rendered via dangerouslySetInnerHTML, so markers are
  // raw DOM nodes. Attach mouseenter/click listeners to them here. Static
  // author-controlled content, no XSS surface.
  useEffect(() => {
    const codeEl = codeRef.current;
    if (!codeEl) return;
    const markers = codeEl.querySelectorAll<HTMLElement>('.marker');
    const handlers: Array<() => void> = [];
    markers.forEach((m) => {
      const setActive = () => {
        if (m.dataset.n) setActiveMarker(m.dataset.n);
      };
      m.addEventListener('mouseenter', setActive);
      m.addEventListener('click', setActive);
      handlers.push(() => {
        m.removeEventListener('mouseenter', setActive);
        m.removeEventListener('click', setActive);
      });
    });
    return () => handlers.forEach((cleanup) => cleanup());
  }, [activeTab]);

  // Apply active class to the current marker DOM node imperatively (so the
  // dangerouslySetInnerHTML content doesn't need to be re-rendered when the
  // active marker changes — keeps things snappy on hover).
  useEffect(() => {
    const codeEl = codeRef.current;
    if (!codeEl) return;
    codeEl.querySelectorAll<HTMLElement>('.marker').forEach((m) => {
      m.classList.toggle('active', m.dataset.n === activeMarker);
    });
  }, [activeMarker, activeTab]);

  return (
    <section
      id='craft'
      className='border-t border-line bg-cream-2 px-14 max-[1100px]:px-6'
      style={{ paddingTop: '140px', paddingBottom: '140px' }}
    >
      <div className='mx-auto mb-16 grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-end gap-12 max-[1100px]:grid-cols-1 max-[1100px]:gap-[18px]'>
        <Eyebrow>№ 03 — On craft</Eyebrow>
        <SectionHeading className='rv text-[clamp(48px,6vw,88px)]'>
          Small <span className='it'>patterns,</span>
          <br />
          quietly insisted upon.
        </SectionHeading>
        <div className='pb-[14px] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.18em] text-ink-mid text-right max-[1100px]:text-left max-[1100px]:pb-0'>
          Marginalia
          <br />
          Hover the marks
        </div>
      </div>

      <div className='mx-auto grid max-w-[1440px] grid-cols-[300px_1fr] items-start gap-8 max-[1100px]:grid-cols-1'>
        <div className='sticky top-24 flex flex-col gap-[10px] max-[1100px]:static max-[1100px]:flex-row max-[1100px]:overflow-x-auto max-[1100px]:pb-[10px]'>
          {SNIPPETS.map((s, i) => (
            <button
              key={i}
              type='button'
              onClick={() => setActiveTab(i)}
              className={cx(
                'grid cursor-pointer grid-cols-[auto_1fr] gap-[14px] border border-l-2 p-[18px] text-left font-sans transition-all duration-250 max-[1100px]:min-w-[240px] max-[1100px]:shrink-0',
                activeTab === i
                  ? 'border-transparent border-l-copper bg-ink text-cream'
                  : 'border-line border-l-transparent bg-white/40 text-ink hover:border-l-copper hover:bg-white/70'
              )}
            >
              <span
                className={cx(
                  'self-start pt-1 font-mono text-[10.5px] font-medium tracking-[0.12em]',
                  activeTab === i ? 'text-copper' : 'text-copper'
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className='mb-1 font-sans text-[17px] font-light leading-tight tracking-[-0.01em]'>
                  {s.tabTitle}
                </div>
                <div
                  className={cx(
                    'text-[12px] leading-[1.5]',
                    activeTab === i ? 'text-cream/65' : 'text-ink-mid'
                  )}
                >
                  {s.tabBlurb}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className='overflow-hidden border border-black/20 bg-[#15100a] shadow-[0_30px_60px_-25px_rgba(27,20,12,0.4)]'>
          <div className='flex items-start justify-between gap-4 border-b border-cream/[0.08] bg-black/[0.18] px-7 py-[22px]'>
            <div>
              <div className='font-sans text-[22px] font-light leading-tight tracking-[-0.01em] text-cream'>
                {snippet.title}
              </div>
              <div className='mt-[6px] font-sans text-[13.5px] leading-[1.5] text-cream/55'>
                {snippet.blurb}
              </div>
            </div>
            <span className='shrink-0 border border-cream/[0.12] bg-cream/[0.08] px-[10px] py-[5px] font-mono text-[10px] uppercase tracking-[0.14em] text-cream/70'>
              {snippet.pill}
            </span>
          </div>

          <div className='code-snippet grid min-h-[380px] grid-cols-[1.5fr_1fr] max-[1100px]:grid-cols-1'>
            <pre
              ref={codeRef}
              className='m-0 overflow-x-auto border-r border-cream/[0.06] bg-[#15100a] px-7 py-[26px] font-mono text-[12.5px] leading-[1.85] text-cream/[0.82]'
              dangerouslySetInnerHTML={{ __html: snippet.codeHtml }}
            />
            <div className='flex flex-col gap-4 bg-black/[0.28] px-6 py-[26px]'>
              {snippet.annotations.map((a, i) => {
                const n = String(i + 1);
                const isActive = n === activeMarker;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveMarker(n)}
                    className={cx(
                      'grid grid-cols-[auto_1fr] items-start gap-3 transition-opacity duration-250',
                      isActive ? 'opacity-100' : 'opacity-35'
                    )}
                  >
                    <span
                      className={cx(
                        'mt-[1px] inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-semibold',
                        isActive ? 'bg-white text-ink' : 'bg-copper text-white'
                      )}
                    >
                      {n}
                    </span>
                    <span
                      className='annot-text text-[13.5px] leading-relaxed text-cream/[0.82]'
                      dangerouslySetInnerHTML={{ __html: a }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
