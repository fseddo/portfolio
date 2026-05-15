import type { WorkCardData } from './cards';
import { cx } from '../../../common/utils/cx';

type WorkCardProps = {
  data: WorkCardData;
  isHidden: boolean;
  onOpenCase: () => void;
};

export const WorkCard = ({ data, isHidden, onOpenCase }: WorkCardProps) => {
  const { Art, wide } = data;

  return (
    <article
      className={cx(
        'group block transition-opacity duration-300 ease-soft-out',
        isHidden && 'pointer-events-none opacity-0'
      )}
    >
      <div
        className={cx(
          'relative mb-6 overflow-hidden bg-ink',
          wide ? 'aspect-[21/9]' : 'aspect-[4/3]'
        )}
      >
        <div className='absolute inset-0 transition-transform duration-[1.6s] ease-soft-out group-hover:scale-[1.03]'>
          <Art />
        </div>
        <div className='absolute left-[18px] top-[18px] z-[3] flex flex-wrap gap-2'>
          {data.cat.map((p) => (
            <span
              key={p.label}
              className={cx(
                'border px-[11px] py-[5px] font-mono text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur-[6px]',
                p.tone === 'copper'
                  ? 'border-transparent bg-copper'
                  : 'border-cream/[0.18] bg-ink/60'
              )}
            >
              {p.label}
            </span>
          ))}
        </div>
        <div className='absolute bottom-[18px] right-[18px] z-[3] border border-cream/[0.18] bg-ink/60 px-3 py-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-cream backdrop-blur-[6px]'>
          {data.statTag}
        </div>
      </div>

      <div className='mb-[14px] grid grid-cols-[auto_1fr_auto] items-baseline gap-6'>
        <span className='flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mid before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-copper before:content-[""]'>
          {data.location}
        </span>
        <span />
        <span className='font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-light'>
          {data.index}
        </span>
      </div>

      <h3 className='mb-3 font-sans font-light leading-none tracking-[-0.025em] text-ink transition-colors duration-250 group-hover:text-copper text-[clamp(32px,3.6vw,52px)]'>
        {data.title}
      </h3>
      <p className='mb-[14px] max-w-[56ch] text-[15.5px] leading-relaxed text-ink-mid [&_strong]:font-medium [&_strong]:text-ink'>
        {data.prose}
      </p>
      <button
        type='button'
        onClick={onOpenCase}
        className='inline-flex cursor-pointer items-center gap-[10px] border-0 border-b border-ink bg-transparent pb-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink transition-[gap,color,border-color] duration-250 hover:gap-5 hover:border-copper hover:text-copper'
      >
        View case study <span>→</span>
      </button>
    </article>
  );
};
