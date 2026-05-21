import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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
 * Tracker and Pipeline arts render inside a wrapper that scales 1.03×
 * on card hover. Urbanstems doesn't — its carousel is the focal element
 * and its dots/demo CTA need to sit ABOVE the veil as siblings, not get
 * transformed.
 */
const WRAP_FOR_HOVER_SCALE: Record<ProjectId, boolean> = {
  urbanstems: false,
  tracker: true,
  pipeline: true,
};

const NOOP = () => {};

const CARD_BASE =
  'work-card flex flex-row max-[900px]:flex-col-reverse overflow-hidden rounded-[14px] border border-line bg-cream-2';

/** Front-face contents (no outer `<article>` — caller provides it). Rendered
 * twice per slot: once inside the visible flipper face, once inside an
 * invisible sizing probe so the slot can measure the front's natural height
 * at the current viewport width. */
const FrontContent = ({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) => {
  const Art = ARTS[project.id];
  return (
    <>
      <div className='work-body flex basis-[60%] flex-col justify-center gap-3 p-[34px_36px] max-[900px]:basis-auto max-[900px]:p-[26px_28px_28px]'>
        <div className='flex items-center gap-2.25 font-mono text-[10px] uppercase tracking-[0.14em] text-copper'>
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
        <div className='tech-chips mt-1 flex flex-wrap gap-1.5'>
          {project.chips.map((chip) => (
            <span
              key={chip}
              className='tch rounded-pill border border-copper/30 bg-transparent px-2.75 py-1.25 font-mono text-[10.5px] tracking-[0.02em] text-copper transition-colors duration-200 hover:border-transparent hover:bg-copper hover:text-cream'
            >
              {chip}
            </span>
          ))}
        </div>
        <button
          type='button'
          onClick={onOpen}
          className='mt-1.5 inline-flex cursor-pointer items-center gap-2.5 self-start border-0 border-b border-ink bg-transparent px-0 py-1.25 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-all duration-250 hover:gap-4 hover:border-copper hover:text-copper'
        >
          View case study →
        </button>
      </div>

      <div className='work-art group/art relative basis-[40%] self-stretch overflow-hidden bg-ink max-[900px]:basis-auto max-[900px]:aspect-5/4'>
        {WRAP_FOR_HOVER_SCALE[project.id] ? (
          <div className='absolute inset-0 transition-transform duration-1200 ease-soft-out group-hover/art:scale-[1.03]'>
            <Art />
          </div>
        ) : (
          <Art />
        )}
      </div>
    </>
  );
};

/**
 * Card ↔ case-study 3D flip with stretch.
 *
 * Two invisible sizing probes (the front article + the case panel) live at
 * the top of the slot, absolute-positioned so they don't affect flow but
 * inherit the slot's width — line-wraps and the 900px breakpoint flip
 * naturally re-measure each face. A ResizeObserver pipes their heights into
 * state; the slot's explicit `height` is set to the active face's measured
 * value and transitions in lock-step with the flipper's `rotateX(180deg)`,
 * producing a combined flip+stretch.
 */
export const WorkSlot = ({ project, casing, onOpen, onClose }: WorkSlotProps) => {
  const wide = project.wide ?? false;

  const frontProbeRef = useRef<HTMLElement>(null);
  const backProbeRef = useRef<HTMLDivElement>(null);
  const [frontH, setFrontH] = useState<number>();
  const [backH, setBackH] = useState<number>();

  useLayoutEffect(() => {
    const front = frontProbeRef.current;
    const back = backProbeRef.current;
    if (!front || !back) return;

    // Synchronous initial read so the first paint already reflects measured
    // heights — no flash at 0 before the observer's first async tick.
    setFrontH(front.getBoundingClientRect().height);
    setBackH(back.getBoundingClientRect().height);

    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const h = e.contentRect.height;
        if (e.target === front) setFrontH(h);
        else if (e.target === back) setBackH(h);
      }
    });
    obs.observe(front);
    obs.observe(back);
    return () => obs.disconnect();
  }, []);

  const slotH = casing ? backH : frontH;

  return (
    // `.rv` lives on an outer wrapper so the slot's className can change
    // freely (height transitions, casing flips) without wiping the
    // imperative `.in` that useRevealOnScroll adds.
    <div className='rv'>
      <div
        id={`slot-${project.id}`}
        // The toggle lives on the slot, not the faces: the slot never rotates
        // so a click registers at any flip angle. Faces go `backface-hidden`
        // near 90°, which would otherwise drop clicks landing mid-flip.
        onClick={casing ? onClose : onOpen}
        className='group relative cursor-pointer perspective-[1800px] transition-[height] duration-700 ease-soft-out'
        style={{ height: slotH }}
      >
        {/* Sizing probes — invisible, absolute, but stretch left:0→right:0 so
            they inherit slot width and reflow with the viewport. */}
        <article
          ref={frontProbeRef}
          aria-hidden
          className={cx(CARD_BASE, 'pointer-events-none invisible absolute top-0 right-0 left-0')}
        >
          <FrontContent project={project} onOpen={NOOP} />
        </article>
        <div
          ref={backProbeRef}
          aria-hidden
          className='pointer-events-none invisible absolute top-0 right-0 left-0'
        >
          <CasePanel projectId={project.id} wide={wide} onClose={NOOP} />
        </div>

        {/* Flipper — both faces are `absolute inset-0` so they share a
            rotation center as the slot stretches. */}
        <div
          className={cx(
            'absolute inset-0 transform-3d transition-transform duration-700 ease-soft-out',
            casing && 'transform-[rotateX(180deg)]'
          )}
        >
          <article
            className={cx(
              CARD_BASE,
              // Hover is driven by `group-hover` on the slot, not `:hover` on
              // this article — the article foreshortens as it rotates, which
              // would make a direct `:hover` toggle frame-to-frame during the
              // flip. The slot's hit area is stable, so group-hover isn't.
              'absolute inset-0 transition-[scale,box-shadow] duration-700 ease-soft-out backface-hidden',
              casing
                ? 'pointer-events-none'
                : 'group-hover:scale-[1.015] group-hover:shadow-[0_30px_70px_-20px_rgba(27,32,29,0.25),0_8px_24px_-12px_rgba(27,32,29,0.15)]'
            )}
          >
            <FrontContent project={project} onOpen={onOpen} />
          </article>

          <div
            className={cx(
              'absolute inset-0 overflow-y-auto rounded-[14px] backface-hidden transform-[rotateX(180deg)] transition-[scale,box-shadow] duration-700 ease-soft-out',
              casing
                ? 'group-hover:scale-[1.015] group-hover:shadow-[0_30px_70px_-20px_rgba(27,32,29,0.25),0_8px_24px_-12px_rgba(27,32,29,0.15)]'
                : 'pointer-events-none'
            )}
          >
            <CasePanel projectId={project.id} wide={wide} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
