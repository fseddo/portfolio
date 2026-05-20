import type { ReactNode } from 'react';
import { cx } from '../utils/cx';

type EyebrowProps = {
  children: ReactNode;
  /** Use copper-dim (the hero variant) instead of full copper. */
  dim?: boolean;
  className?: string;
};

/**
 * Editorial eyebrow — copper hairline + mono caps. Renders the hairline as
 * an explicit `<span className="line">` (not `::before`) so the palette-
 * expand block in globals.css can recolor it inside `#career` / `#stack`
 * without specificity gymnastics.
 */
export const Eyebrow = ({ children, dim, className }: EyebrowProps) => (
  <div
    className={cx(
      'section-eyebrow flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em]',
      dim ? 'text-copper-dim' : 'text-copper',
      className
    )}
  >
    <span className='line inline-block h-px w-7 bg-copper' />
    {children}
  </div>
);
