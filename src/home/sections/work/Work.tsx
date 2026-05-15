import { useState } from 'react';
import type { CaseId } from '../../data/cases';
import { Eyebrow } from '../../../common/atoms/Eyebrow';
import { SectionHeading } from '../../../common/atoms/SectionHeading';
import { WORK_CARDS } from './cards';
import { WorkSlot } from './WorkSlot';

// State is hoisted here so the slots stay dumb. Only one case can be open
// at a time — clicking a second card closes the first.
export const Work = () => {
  const [openCase, setOpenCase] = useState<CaseId | null>(null);

  return (
    <section
      id='work'
      className='border-t border-line px-14 pb-30 pt-35 max-[1100px]:px-6'
      style={{ paddingTop: '140px', paddingBottom: '120px' }}
    >
      <div className='mx-auto mb-20 grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-end gap-12 max-[1100px]:grid-cols-1 max-[1100px]:gap-[18px]'>
        <Eyebrow>№ 02 — Selected work</Eyebrow>
        <SectionHeading className='rv text-[clamp(56px,7vw,108px)] tracking-[-0.035em] leading-[0.92]'>
          Recent <span className='it'>projects.</span>
        </SectionHeading>
        <div className='pb-[14px] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.18em] text-ink-mid text-right max-[1100px]:text-left max-[1100px]:pb-0'>
          Three builds
          <br />
          Last 18 months
        </div>
      </div>

      <div className='mx-auto grid max-w-[1440px] grid-cols-2 gap-x-12 gap-y-16 max-[1100px]:grid-cols-1 max-[1100px]:gap-12'>
        {WORK_CARDS.map((card) => (
          <WorkSlot
            key={card.id}
            data={card}
            isOpen={openCase === card.id}
            onOpen={() => setOpenCase(card.id)}
            onClose={() => setOpenCase(null)}
          />
        ))}
      </div>
    </section>
  );
};
