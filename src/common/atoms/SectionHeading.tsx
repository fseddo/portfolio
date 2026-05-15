import type { ReactNode } from 'react';
import { cx } from '../utils/cx';

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export const SectionHeading = ({ children, className }: SectionHeadingProps) => (
  <h2
    className={cx(
      'm-0 font-sans font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,5vw,88px)]',
      className
    )}
  >
    {children}
  </h2>
);
