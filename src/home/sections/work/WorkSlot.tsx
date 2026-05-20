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
  // `wide` no longer affects the row card (every row is full-width), but the
  // case panel still uses it to choose its internal layout.
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
    // `.rv` lives on the stable slot wrapper, NOT the article: useRevealOnScroll
    // adds `.in` via `classList.add` (imperative DOM), and React re-renders the
    // article's className every time `panelMounted` flips. If `.rv` lived on
    // the article, returning from a case study would wipe `.in` and the card
    // would re-hide at opacity 0 — the slot wrapper's className is stable so
    // the imperative `.in` survives.
    <div
      id={`slot-${project.id}`}
      className='rv relative flex min-h-0 flex-col'
    >
      <article
        className={cx(
          'work-card flex flex-row max-[900px]:flex-col-reverse overflow-hidden rounded-[14px] border border-line bg-cream-2 transition-[opacity,transform] duration-300 ease-soft-out',
          panelMounted
            ? 'pointer-events-none absolute inset-0 opacity-0'
            : 'hover:-translate-y-[3px] hover:shadow-[0_24px_50px_-28px_rgba(27,32,29,0.22)]'
        )}
      >
        <div className='work-body flex basis-[60%] flex-col justify-center gap-[12px] p-[34px_36px] max-[900px]:basis-auto max-[900px]:p-[26px_28px_28px]'>
          <div className='flex items-center gap-[9px] font-mono text-[10px] uppercase tracking-[0.14em] text-copper'>
            <span className='font-normal text-ink-light'>{project.eyebrowYear}</span>
            <span>· {project.eyebrowMeta}</span>
          </div>
          <h3
            className='m-0 font-sans text-[28px] font-normal leading-[1.05] tracking-[-0.015em] text-ink'
            dangerouslySetInnerHTML={{ __html: project.titleHtml }}
          />
          <p
            className='max-w-[60ch] text-sm leading-[1.65] text-ink-mid [&_strong]:font-medium [&_strong]:text-ink'
            dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
          />
          {/* `.tech-chips` + `.tch` — palette-expand rotates accent colors on
              the 3n+2 and 3n positions inside each card. */}
          <div className='tech-chips mt-1 flex flex-wrap gap-[6px]'>
            {project.chips.map((chip) => (
              <span
                key={chip}
                className='tch rounded-pill border border-copper/30 bg-transparent px-[11px] py-[5px] font-mono text-[10.5px] tracking-[0.02em] text-copper transition-colors duration-200 hover:border-transparent hover:bg-copper hover:text-cream'
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

        <div
          className='work-art group/art relative basis-[40%] self-stretch overflow-hidden bg-ink max-[900px]:basis-auto max-[900px]:aspect-[5/4]'
        >
          {WRAP_FOR_HOVER_SCALE[project.id] ? (
            <div className='absolute inset-0 transition-transform duration-1200 ease-soft-out group-hover/art:scale-[1.03]'>
              <Art />
            </div>
          ) : (
            <Art />
          )}
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
