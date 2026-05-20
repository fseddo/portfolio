import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '../../../common/utils/cx';
import type { Project, ProjectId } from '../../data/portfolio';
import { CasePanel } from './CasePanel';
import { PipelineArt } from './PipelineArt';
import { TrackerArt } from './TrackerArt';
import { UrbanstemsArt } from './UrbanstemsArt';

type WorkSlotProps = {
  project: Project;
  /** True when the parent has selected this slot's case study. */
  casing: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ARTS: Record<ProjectId, () => ReactNode> = {
  urbanstems: UrbanstemsArt,
  tracker: TrackerArt,
  pipeline: PipelineArt,
};

/**
 * Tracker and Pipeline arts render inside an `.img-wrap` that scales 1.03×
 * on card hover. Urbanstems doesn't — its carousel is the focal element and
 * its dots/demo CTA need to sit ABOVE the veil as siblings, not get
 * transformed.
 */
const WRAP_FOR_HOVER_SCALE: Record<ProjectId, boolean> = {
  urbanstems: false,
  tracker: true,
  pipeline: true,
};

const CASE_FADE_MS = 360;

/**
 * Card ↔ case-study panel swap.
 *
 * `casing` is owned by the parent (one open at a time). Internally we delay
 * removing the panel from the DOM by {@link CASE_FADE_MS} so the fade-out
 * has time to play. While the panel is present it is the only in-flow child
 * and sizes the slot; the card goes absolute and invisible.
 */
export const WorkSlot = ({ project, casing, onOpen, onClose }: WorkSlotProps) => {
  const wide = project.wide ?? false;
  const Art = ARTS[project.id];

  // Whether the panel is mounted and in flow. Lags `casing` by CASE_FADE_MS
  // on close so the exit transition can complete before unmount.
  const [panelMounted, setPanelMounted] = useState(false);
  // Whether the panel is at its "open" visual state (opacity 1, no translate).
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (casing) {
      setPanelMounted(true);
      // Double-rAF so the panel paints at its initial state before the
      // class flip kicks off the transition.
      let r2 = 0;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setPanelOpen(true));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    setPanelOpen(false);
    const id = window.setTimeout(() => setPanelMounted(false), CASE_FADE_MS);
    return () => clearTimeout(id);
  }, [casing]);

  return (
    <div
      id={`slot-${project.id}`}
      className={cx(
        'relative flex min-h-0 flex-col',
        wide && 'col-span-full'
      )}
    >
      <article
        className={cx(
          'flex flex-col overflow-hidden rounded-[14px] border border-line bg-cream-2 transition-[opacity,transform] duration-300 ease-soft-out',
          panelMounted
            ? 'pointer-events-none absolute inset-0 opacity-0'
            : 'hover:-translate-y-[3px] hover:shadow-[0_24px_50px_-28px_rgba(27,20,12,0.22)]',
          'rv'
        )}
      >
        <div
          className={cx(
            'group/art relative overflow-hidden bg-ink',
            wide ? 'aspect-[21/9]' : 'aspect-[5/4]'
          )}
        >
          {WRAP_FOR_HOVER_SCALE[project.id] ? (
            <div className='absolute inset-0 transition-transform duration-1200 ease-soft-out group-hover/art:scale-[1.03]'>
              <Art />
            </div>
          ) : (
            <Art />
          )}

          {/* Bottom-up dark veil so the tag and dots stay legible. */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 z-2 bg-[linear-gradient(180deg,transparent_0%,transparent_55%,rgba(27,20,12,0.55)_88%,rgba(27,20,12,0.92)_100%)]'
          />

          <span className='absolute top-4 left-[18px] z-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/[0.78] before:inline-block before:h-px before:w-[18px] before:bg-cream/40'>
            <span className='font-medium text-cream'>{project.tagNumber}</span>
            <span>· {project.tagText}</span>
          </span>
        </div>

        <div
          className={cx(
            'flex flex-col gap-[11px]',
            wide ? 'p-[28px_32px_30px]' : 'p-[24px_28px_26px]'
          )}
        >
          <div className='flex items-center gap-[9px] font-mono text-[10px] uppercase tracking-[0.14em] text-copper'>
            <span className='font-normal text-ink-light'>{project.eyebrowYear}</span>
            <span>· {project.eyebrowMeta}</span>
          </div>
          <h3
            className={cx(
              'm-0 font-sans font-normal leading-[1.05] tracking-[-0.015em] text-ink',
              wide ? 'text-[28px]' : 'text-[24px]'
            )}
            dangerouslySetInnerHTML={{ __html: project.titleHtml }}
          />
          <p
            className='max-w-[60ch] text-sm leading-[1.65] text-ink-mid [&_strong]:font-medium [&_strong]:text-ink'
            dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
          />
          <div className='mt-1 flex flex-wrap gap-[6px]'>
            {project.chips.map((chip) => (
              <span
                key={chip}
                className='rounded-pill border border-copper/30 bg-transparent px-[11px] py-[5px] font-mono text-[10.5px] tracking-[0.02em] text-copper transition-colors duration-200 hover:border-transparent hover:bg-copper hover:text-cream'
              >
                {chip}
              </span>
            ))}
          </div>
          <button
            type='button'
            onClick={onOpen}
            className='mt-[6px] inline-flex cursor-pointer items-center gap-[10px] self-start border-0 border-b border-ink bg-transparent px-0 py-[5px] font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-all duration-250 hover:gap-4 hover:border-copper hover:text-copper'
          >
            View case study →
          </button>
        </div>
      </article>

      {panelMounted && (
        <CasePanel
          projectId={project.id}
          wide={wide}
          open={panelOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};
