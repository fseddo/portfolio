import { Eyebrow } from '../../common/atoms/Eyebrow';
import { SectionHeading } from '../../common/atoms/SectionHeading';
import { CAREER_ROWS } from '../data/career';
import { cx } from '../../common/utils/cx';

export const Career = () => (
  <section
    id='career'
    className='border-t border-line px-14 max-[1100px]:px-6'
    style={{ paddingTop: '140px', paddingBottom: '100px' }}
  >
    <div className='mx-auto mb-16 grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-end gap-12 max-[1100px]:grid-cols-1 max-[1100px]:gap-[18px]'>
      <Eyebrow>№ 04 — Career</Eyebrow>
      <SectionHeading className='rv text-[clamp(48px,6vw,88px)]'>
        Same place, <span className='it'>three roles,</span> increasing scope.
      </SectionHeading>
      <div className='pb-[14px] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.18em] text-ink-mid text-right max-[1100px]:text-left max-[1100px]:pb-0'>
        Leadership Connect
        <br />
        2022 — Present
      </div>
    </div>

    <div className='mx-auto max-w-[1440px]'>
      <div className='flex flex-col border-t border-ink'>
        {CAREER_ROWS.map((row, i) => (
          <div
            key={row.dateStart}
            className={cx(
              'group relative grid grid-cols-[200px_1fr_220px] items-start gap-12 border-b border-line-2 py-9 transition-[padding-left] duration-250 last:border-b-ink hover:pl-[14px] rv',
              i === 1 && 'rv-s',
              i === 2 && 'rv-m',
              row.isPresent &&
                'before:absolute before:left-0 before:top-[42px] before:h-px before:w-6 before:bg-copper before:transition-[left] before:duration-250 before:content-[""] group-hover:before:left-[14px] max-[1100px]:before:hidden',
              'max-[1100px]:grid-cols-1 max-[1100px]:gap-[6px] max-[1100px]:py-6'
            )}
          >
            <div className='pt-[6px] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.06em] text-ink-mid max-[1100px]:order-1 max-[1100px]:pt-0 max-[1100px]:text-[10px] max-[1100px]:tracking-[0.12em] max-[1100px]:text-ink-light'>
              <div
                className={cx(
                  row.isPresent && 'font-medium text-copper'
                )}
              >
                {row.dateStart}
              </div>
              <div>{row.dateEnd}</div>
            </div>

            <div className='max-[1100px]:order-3'>
              <h4 className='mb-[6px] font-sans text-[32px] font-light leading-[1.05] tracking-[-0.02em] max-[1100px]:mb-1 max-[1100px]:text-[24px]'>
                {row.title}
              </h4>
              <div className='mb-[14px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink max-[1100px]:mb-[10px] max-[1100px]:text-[10.5px]'>
                {row.company}{' '}
                <span className='text-ink-light'>/ {row.location}</span>
              </div>
              <p className='max-w-[62ch] font-sans text-[15.5px] leading-[1.7] text-ink-mid max-[1100px]:max-w-full max-[1100px]:text-[14.5px] [&_strong]:font-medium [&_strong]:text-ink [&_em]:font-serif [&_em]:text-[17px] [&_em]:italic [&_em]:text-copper'>
                {row.prose}
              </p>
            </div>

            <div className='pt-2 text-right font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-copper max-[1100px]:order-2 max-[1100px]:pb-[6px] max-[1100px]:pt-0 max-[1100px]:text-left'>
              {row.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
