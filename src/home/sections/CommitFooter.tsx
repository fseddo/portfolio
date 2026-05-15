import { useState } from 'react';
import type { CommitType } from '../data/commits';
import { LATEST_COMMIT, RECENT_COMMITS } from '../data/commits';
import { cx } from '../../common/utils/cx';

const PILL: Record<CommitType, string> = {
  feat: 'bg-moss/[0.28] text-[#B5C690]',
  fix: 'bg-[rgba(232,160,106,0.22)] text-[#E8A06A]',
  perf: 'bg-[rgba(217,162,58,0.22)] text-[#E8C97D]',
  refactor: 'bg-copper/[0.22] text-[#E8A06A]',
};

export const CommitFooter = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((e) => !e)}
      className={cx(
        'fixed inset-x-[14px] bottom-[14px] z-90 cursor-pointer overflow-hidden border border-cream/10 bg-ink/[0.94] text-cream shadow-[0_18px_40px_-10px_rgba(27,20,12,0.5)] backdrop-blur-xl backdrop-saturate-[1.6] transition-[height] duration-350 ease-soft-out',
        expanded ? 'h-[360px] max-[1100px]:h-auto max-[1100px]:max-h-[60vh] max-[1100px]:overflow-y-auto' : 'h-12'
      )}
    >
      <div className='flex h-12 items-center gap-[14px] pl-[18px] pr-4'>
        <div className='flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-copper'>
          <span className='relative inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-copper after:absolute after:inset-[-4px] after:rounded-full after:border-[1.5px] after:border-copper after:content-[""] after:animate-[cfp_2s_ease-out_infinite]' />
          Live · GitHub
        </div>
        <div className='h-[18px] w-px shrink-0 bg-cream/[0.18]' />
        <div className='flex min-w-0 flex-1 items-center gap-3 overflow-hidden'>
          <span className='shrink-0 bg-cream/[0.06] px-2 py-[3px] font-mono text-[10.5px] tracking-[0.06em] text-cream'>
            {LATEST_COMMIT.repo}
          </span>
          <span className='overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[12.5px] text-cream/70'>
            <span className='mr-1 text-copper'>{LATEST_COMMIT.type}:</span>
            {LATEST_COMMIT.message}
          </span>
          <span className='shrink-0 font-mono text-[11px] tracking-[0.04em] text-cream/40'>
            {LATEST_COMMIT.when}
          </span>
        </div>
        <div className='flex shrink-0 items-center gap-[14px]'>
          <a
            href='#'
            onClick={(e) => e.stopPropagation()}
            className='font-mono text-[11px] tracking-[0.06em] text-cream/55 no-underline transition-colors duration-250 hover:text-copper'
          >
            github.com/fseddo ↗
          </a>
          <button
            type='button'
            aria-label='Toggle commit feed'
            className={cx(
              'flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-cream/10 bg-cream/[0.06] text-cream transition-[transform,background] duration-350',
              expanded && 'rotate-180 border-transparent bg-copper'
            )}
          >
            <svg width='12' height='12' viewBox='0 0 16 16' fill='none'>
              <path
                d='M3 6l5 5 5-5'
                stroke='currentColor'
                strokeWidth='1.6'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='px-5 pb-5 pt-[6px]'>
        <div className='mb-1 flex justify-between border-b border-cream/[0.12] py-[10px] font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45'>
          <span>Recent commits · 4 repos</span>
          <span>Showing {RECENT_COMMITS.length} of 142</span>
        </div>
        <div className='grid grid-cols-2 gap-x-7 max-[1100px]:grid-cols-1'>
          {RECENT_COMMITS.map((c, i) => (
            <div
              key={i}
              className='grid grid-cols-[auto_auto_1fr_auto] items-center gap-[10px] border-b border-cream/[0.06] py-[10px] text-[12px]'
            >
              <span className='shrink-0 bg-cream/[0.06] px-2 py-[2px] font-mono text-[10.5px] tracking-[0.06em] text-cream'>
                {c.repo}
              </span>
              <span
                className={cx(
                  'px-[7px] py-[2px] font-mono text-[9.5px] uppercase tracking-[0.08em]',
                  PILL[c.type]
                )}
              >
                {c.type}
              </span>
              <span className='overflow-hidden text-ellipsis whitespace-nowrap font-mono text-cream/70'>
                {c.message}
              </span>
              <span className='font-mono text-[11px] text-cream/40'>
                {c.when}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
