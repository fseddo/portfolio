import { cx } from '../../../common/utils/cx';
import {
  CASES,
  type CaseSection,
  type ProjectId,
} from '../../data/portfolio';

type CasePanelProps = {
  projectId: ProjectId;
  wide: boolean;
  onClose: () => void;
};

const Section = ({ section }: { section: CaseSection }) => (
  <div className='case-section mb-[18px] last:mb-0'>
    <div className='lbl mb-2 flex items-center gap-[10px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-copper'>
      <span className='line inline-block h-px w-[18px] bg-copper' />
      {section.label}
    </div>
    {section.headingHtml && (
      <h4
        className='mb-[10px] max-w-[40ch] font-sans text-[17px] font-light leading-[1.25] tracking-[-0.005em] text-ink'
        dangerouslySetInnerHTML={{ __html: section.headingHtml }}
      />
    )}
    {section.paragraphsHtml?.map((p, i) => (
      <p
        key={i}
        className='mb-2 max-w-[60ch] text-[13px] leading-[1.65] text-ink-mid [&_strong]:font-medium [&_strong]:text-ink'
        dangerouslySetInnerHTML={{ __html: p }}
      />
    ))}
    {section.bulletsHtml && (
      <ul className='my-2 flex max-w-[60ch] flex-col gap-2'>
        {section.bulletsHtml.map((b, i) => (
          <li
            key={i}
            className='relative pl-[18px] text-[12.5px] leading-[1.6] text-ink-mid before:absolute before:top-[9px] before:left-0 before:h-px before:w-[10px] before:bg-copper [&_strong]:font-medium [&_strong]:text-ink'
            dangerouslySetInnerHTML={{ __html: b }}
          />
        ))}
      </ul>
    )}
    {section.metrics && (
      <div className='my-[10px] grid grid-cols-3 gap-2'>
        {section.metrics.map((m, i) => (
          <div
            key={i}
            className='rounded-[5px] border border-line bg-[rgba(248,245,236,0.5)] p-[12px_14px]'
          >
            <div
              className='mb-1 font-sans text-[22px] font-light leading-none tracking-[-0.02em] text-ink'
              dangerouslySetInnerHTML={{ __html: m.valueHtml }}
            />
            <div className='font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-light'>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    )}
    {section.stack && (
      <div className='case-stack mt-2 flex flex-wrap gap-[5px]'>
        {section.stack.map((chip, i) => (
          <span
            key={chip}
            className={cx(
              'chip rounded-pill border px-[9px] py-[3px] font-mono text-[9.5px] tracking-[0.04em]',
              i === 0
                ? 'border-transparent bg-copper text-cream'
                : 'border-line bg-[rgba(248,245,236,0.6)] text-ink'
            )}
          >
            {chip}
          </span>
        ))}
      </div>
    )}
  </div>
);

export const CasePanel = ({ projectId, wide, onClose }: CasePanelProps) => {
  const c = CASES[projectId];
  const half = Math.ceil(c.sections.length / 2);

  return (
    <div
      className={cx(
        'case-panel relative flex flex-col rounded-[14px] border border-line bg-cream-2',
        wide ? 'p-[30px_34px]' : 'p-[26px_28px]'
      )}
    >
      <button
        type='button'
        onClick={onClose}
        className='mb-[18px] inline-flex items-center gap-2 self-start border-0 border-b border-ink bg-transparent px-0 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink transition-all duration-250 hover:gap-[14px] hover:border-copper hover:text-copper'
      >
        ← Back
      </button>

      <div>
        {/* `.case-num` palette-expand hook — text + `.line` recolored per
            owning slot (Tracker → c2, Pipeline → c3). */}
        <div className='case-num mb-[10px] flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.18em] text-copper'>
          <span className='line inline-block h-px w-[22px] bg-copper' />№ {c.number} / Case study
        </div>
        <h3
          className='mb-[10px] font-sans font-light leading-none tracking-[-0.02em] text-ink text-[clamp(26px,2.6vw,32px)]'
          dangerouslySetInnerHTML={{ __html: c.titleHtml }}
        />
        <div className='mb-[18px] max-w-[48ch] font-serif text-base italic leading-[1.4] text-ink-mid'>
          {c.sub}
        </div>
        <dl className='mb-[18px] grid grid-cols-[auto_1fr] gap-x-4 gap-y-[6px] border-y border-[rgba(27,32,29,0.18)] py-[14px] font-mono text-[10px] uppercase tracking-[0.06em]'>
          {c.meta.map(([k, v, accent]) => (
            <div key={k} className='contents'>
              <dt className='text-ink-light'>{k}</dt>
              <dd
                className={
                  accent === 'cu' ? 'cu font-medium text-copper' : 'text-ink'
                }
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {wide ? (
        <div className='grid grid-cols-2 items-start gap-8 max-[900px]:grid-cols-1'>
          <div>
            {c.sections.slice(0, half).map((s) => (
              <Section key={s.label} section={s} />
            ))}
          </div>
          <div>
            {c.sections.slice(half).map((s) => (
              <Section key={s.label} section={s} />
            ))}
          </div>
        </div>
      ) : (
        c.sections.map((s) => <Section key={s.label} section={s} />)
      )}
    </div>
  );
};
