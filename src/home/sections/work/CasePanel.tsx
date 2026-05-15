import type { CaseStudy, CaseSection } from '../../data/cases';
import { cx } from '../../../common/utils/cx';

type CasePanelProps = {
  data: CaseStudy;
  wide: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const Section = ({ s }: { s: CaseSection }) => (
  <div className='mb-[18px] last:mb-0'>
    <div className='mb-2 flex items-center gap-[10px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-copper before:block before:h-px before:w-[18px] before:bg-copper before:content-[""]'>
      {s.label}
    </div>
    {s.heading && (
      <h4 className='mb-[10px] max-w-[36ch] font-sans text-[18px] font-light leading-tight tracking-[-0.01em] text-cream'>
        {s.heading}
      </h4>
    )}
    {s.paragraphs?.map((p, i) => (
      <p
        key={i}
        className='mb-[10px] max-w-[62ch] text-[13px] leading-relaxed text-cream/[0.78] [&_strong]:font-medium [&_strong]:text-cream'
      >
        {p}
      </p>
    ))}
    {s.bullets && (
      <ul className='my-[10px] flex max-w-[62ch] list-none flex-col gap-2'>
        {s.bullets.map((b, i) => (
          <li
            key={i}
            className='relative pl-5 text-[12.5px] leading-relaxed text-cream/75 before:absolute before:left-0 before:top-[9px] before:h-px before:w-[10px] before:bg-copper before:content-[""] [&_strong]:font-medium [&_strong]:text-cream'
          >
            {b}
          </li>
        ))}
      </ul>
    )}
    {s.metrics && (
      <div className='my-[10px] grid grid-cols-3 gap-2'>
        {s.metrics.map((m, i) => (
          <div
            key={i}
            className='rounded-[5px] border border-cream/[0.08] bg-cream/[0.04] px-[14px] py-3'
          >
            <div className='mb-1 font-sans text-[22px] font-light leading-none tracking-[-0.02em] text-cream'>
              {m.value}
            </div>
            <div className='font-mono text-[8.5px] uppercase tracking-[0.12em] text-cream/50'>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    )}
    {s.stack && (
      <div className='mt-2 flex flex-wrap gap-[5px]'>
        {s.stack.map((c, i) => (
          <span
            key={c}
            className={cx(
              'rounded-pill border px-[9px] py-[3px] font-mono text-[9.5px] tracking-[0.06em]',
              i === 0
                ? 'border-transparent bg-copper text-white'
                : 'border-cream/[0.12] bg-cream/[0.06] text-cream/80'
            )}
          >
            {c}
          </span>
        ))}
      </div>
    )}
  </div>
);

export const CasePanel = ({ data, wide, isOpen, onClose }: CasePanelProps) => {
  const half = Math.ceil(data.sections.length / 2);
  const leftSections = wide ? data.sections.slice(0, half) : data.sections;
  const rightSections = wide ? data.sections.slice(half) : [];

  const head = (
    <>
      <button
        type='button'
        onClick={onClose}
        className='mb-[18px] inline-flex items-center gap-2 self-start border-b border-cream/30 bg-transparent pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream transition-[gap,color,border-color] duration-250 hover:gap-4 hover:border-copper hover:text-copper'
      >
        ← Back
      </button>
      <div className='mb-[10px] flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.18em] text-copper before:block before:h-px before:w-[22px] before:bg-copper before:content-[""]'>
        № {data.number} / Case study
      </div>
      <h3 className='mb-[10px] font-sans font-light leading-none tracking-[-0.025em] text-cream text-[clamp(28px,3vw,40px)]'>
        {data.title}
      </h3>
      <div className='mb-5 max-w-[42ch] font-serif text-[17px] italic leading-snug text-cream/70'>
        {data.sub}
      </div>
      <dl className='mb-[18px] grid grid-cols-[auto_1fr] gap-x-4 gap-y-[6px] border-y border-cream/[0.12] py-[14px] font-mono text-[10px] uppercase tracking-[0.06em]'>
        {data.meta.map(([k, v, tone]) => (
          <div key={k} className='contents'>
            <dt className='text-cream/45'>{k}</dt>
            <dd
              className={cx(
                tone === 'copper'
                  ? 'font-medium text-copper'
                  : 'text-cream'
              )}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );

  return (
    <div
      className={cx(
        'absolute inset-0 flex flex-col overflow-y-auto overflow-x-hidden border border-black/20 bg-[#15100a] p-[24px_26px] text-cream shadow-[0_30px_60px_-25px_rgba(27,20,12,0.4)] transition-[opacity,transform] duration-350 ease-soft-out',
        wide && 'p-[32px_36px]',
        isOpen
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      {wide ? (
        <>
          <div className='mb-[18px]'>{head}</div>
          <div className='grid grid-cols-2 items-start gap-8'>
            <div>
              {leftSections.map((s, i) => (
                <Section key={i} s={s} />
              ))}
            </div>
            <div>
              {rightSections.map((s, i) => (
                <Section key={i} s={s} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {head}
          {leftSections.map((s, i) => (
            <Section key={i} s={s} />
          ))}
        </>
      )}
    </div>
  );
};
