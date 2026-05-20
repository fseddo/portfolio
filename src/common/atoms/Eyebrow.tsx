import type { ReactNode } from 'react';
import { cx } from '../utils/cx';

type EyebrowProps = {
  children: ReactNode;
  /** Use copper-dim (the hero variant) instead of full copper. */
  dim?: boolean;
  className?: string;
};

export const Eyebrow = ({ children, dim, className }: EyebrowProps) => (
  <div
    className={cx(
      'flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em]',
      dim ? 'text-copper-dim' : 'text-copper',
      className
    )}
  >
    <span className='inline-block h-px w-7 bg-copper' />
    {children}
  </div>
);
