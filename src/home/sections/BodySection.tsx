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
      'mx-auto max-w-[1280px] border-b border-line px-10 py-[100px] max-[900px]:px-[22px] max-[900px]:py-[70px]',
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
  /** Two-line note printed on the right (e.g. "№ 01 / Available May 2026"). */
  noteLine1: string;
  noteLine2: string;
};

export const SectionHead = ({
  eyebrow,
  title,
  noteLine1,
  noteLine2,
}: SectionHeadProps) => (
  <div className='mb-12 flex flex-wrap items-baseline justify-between gap-4'>
    <div>
      <Eyebrow className='rv'>{eyebrow}</Eyebrow>
      <SectionHeading className='rv rv-s mt-[10px]'>{title}</SectionHeading>
    </div>
    <div className='rv rv-m text-right font-mono text-[10px] uppercase leading-[1.7] tracking-[0.12em] text-ink-light'>
      {noteLine1}
      <br />
      {noteLine2}
    </div>
  </div>
);
