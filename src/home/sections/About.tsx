import { BodySection, SectionHead } from './BodySection';

export const About = () => (
  <BodySection id='about'>
    <SectionHead
      eyebrow='About'
      title={
        <>
          A short <span className='it'>introduction.</span>
        </>
      }
      noteLine1='№ 01'
      noteLine2='Available May 2026'
    />

    <div className='grid grid-cols-[300px_1fr] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-12'>
      <div className='rv relative'>
        <div className='aspect-[3/4] w-full overflow-hidden rounded-lg border border-line bg-cream-2'>
          <img
            src='/portfolio/francesco.jpg'
            alt='Francesco Seddo'
            className='h-full w-full object-cover object-[center_15%]'
          />
        </div>
        <div className='absolute right-[-14px] bottom-[-14px] min-w-[170px] rounded-lg border border-line bg-cream p-[12px_16px] shadow-[0_8px_24px_-10px_rgba(27,20,12,0.15)]'>
          <div className='mb-[2px] text-[13px] font-semibold text-ink'>
            Francesco Seddo
          </div>
          <div className='font-mono text-[10px] uppercase tracking-[0.06em] text-copper'>
            SE III · NY
          </div>
        </div>
      </div>

      <div className='rv rv-s'>
        <h3 className='mb-5 max-w-[22ch] font-sans font-light leading-[1.1] tracking-[-0.02em] text-ink text-[clamp(28px,3vw,38px)]'>
          Engineer who cares about the <span className='it'>full picture.</span>
        </h3>
        <div className='space-y-[14px] text-[15px] leading-[1.75] text-ink-mid'>
          <p className='max-w-[60ch]'>
            I'm a{' '}
            <strong className='font-medium text-ink'>
              frontend-leaning fullstack engineer
            </strong>{' '}
            with a deep focus on performance, developer experience, and shipping things that work at scale.
          </p>
          <p className='max-w-[60ch]'>
            At{' '}
            <strong className='font-medium text-ink'>Leadership Connect</strong>
            , I led a 6-engineer rebuild of a legislative tracking CMS — taking page loads from 3+ minutes to under 2 seconds. No design team, no shortcuts.
          </p>
          <p className='max-w-[60ch]'>
            I'm drawn to the intersection of systems thinking and craft: where clean architecture and a great UI feel like the same decision.
          </p>
        </div>
      </div>
    </div>
  </BodySection>
);
