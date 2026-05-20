import { cx } from '../../common/utils/cx';
import { EXPERIENCE } from '../data/portfolio';
import { BodySection, SectionHead } from './BodySection';

const STAGGER = ['', 'rv-s', 'rv-m'] as const;

export const Experience = () => (
  <BodySection id='career'>
    <SectionHead
      eyebrow='Career'
      title={<>Experience.</>}
      noteLine1='№ 03'
      noteLine2='Four years, one company'
    />

    <div className='flex flex-col'>
      {EXPERIENCE.map((row, i) => (
        <div
          key={row.date}
          className={cx(
            'group grid grid-cols-[200px_1fr_auto] items-start gap-9 border-t border-line py-8 transition-[padding-left] duration-250 hover:pl-[14px]',
            i === EXPERIENCE.length - 1 && 'border-b border-line',
            'max-[900px]:grid-cols-1 max-[900px]:gap-2',
            'rv',
            STAGGER[i]
          )}
        >
          <div>
            <div className='mb-[6px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-light'>
              {row.date}
            </div>
            <div className='font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-copper'>
              {row.company}
            </div>
          </div>

          <div>
            <div
              className='mb-2 font-sans text-[20px] leading-[1.15] tracking-[-0.01em] text-ink'
              dangerouslySetInnerHTML={{ __html: row.titleHtml }}
            />
            <div
              className='max-w-[62ch] text-sm leading-[1.7] text-ink-mid [&_strong]:font-medium [&_strong]:text-ink'
              dangerouslySetInnerHTML={{ __html: row.descHtml }}
            />
          </div>

          <div className='mt-1 self-start whitespace-nowrap rounded-pill border border-line bg-transparent px-[13px] py-[6px] font-mono text-[10.5px] font-medium tracking-[0.04em] text-ink-mid transition-all duration-250 group-hover:border-copper group-hover:bg-copper group-hover:text-cream'>
            {row.badge}
          </div>
        </div>
      ))}
    </div>
  </BodySection>
);
