import type { ReactNode } from 'react';
import { cx } from '../utils/cx';

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export const SectionHeading = ({ children, className }: SectionHeadingProps) => (
  <h2
    className={cx(
      'm-0 font-sans font-light leading-none tracking-tight text-ink text-[clamp(36px,4vw,52px)]',
      className
    )}
  >
    {children}
  </h2>
);
