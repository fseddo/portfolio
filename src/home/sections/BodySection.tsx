import type { ReactNode } from 'react';
import { Eyebrow } from '../../common/atoms/Eyebrow';
import { SectionHeading } from '../../common/atoms/SectionHeading';
import { cx } from '../../common/utils/cx';

type BodySectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** Standard 1280px max-width section shell shared by About, Work, Career, Stack. */
export const BodySection = ({ id, children, className }: BodySectionProps) => (
  <section
    id={id}
    className={cx(
      'mx-auto max-w-7xl border-b border-line px-10 py-25 max-[900px]:px-5.5 max-[900px]:py-17.5',
      className
    )}
  >
    {children}
  </section>
);

type SectionHeadProps = {
  eyebrow: string;
  /** Heading content — may include a `<span className="it">…</span>`. */
  title: ReactNode;
};

export const SectionHead = ({
  eyebrow,
  title,
}: SectionHeadProps) => (
  <div className='mb-12 flex flex-wrap items-baseline justify-between gap-4'>
    <div>
      <Eyebrow className='rv'>{eyebrow}</Eyebrow>
      <SectionHeading className='rv rv-s mt-2.5'>{title}</SectionHeading>
    </div>
  </div>
);
