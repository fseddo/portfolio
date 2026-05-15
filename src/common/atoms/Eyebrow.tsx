import type { ReactNode } from 'react';
import { cx } from '../utils/cx';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export const Eyebrow = ({ children, className }: EyebrowProps) => (
  <div
    className={cx(
      'flex items-center gap-[14px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-copper',
      className
    )}
  >
    <span className='inline-block h-px w-8 bg-copper' />
    {children}
  </div>
);
