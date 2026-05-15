import type { ReactNode } from 'react';

export type CareerRow = {
  dateStart: string;
  dateEnd: string;
  isPresent?: boolean;
  title: ReactNode;
  company: string;
  location: string;
  prose: ReactNode;
  badge: string;
};

const It = ({ children }: { children: ReactNode }) => (
  <span className='it'>{children}</span>
);

export const CAREER_ROWS: ReadonlyArray<CareerRow> = [
  {
    dateStart: 'Mar 2026',
    dateEnd: '— Present',
    isPresent: true,
    title: (
      <>
        Software Engineer <It>III</It>
      </>
    ),
    company: 'Leadership Connect',
    location: 'New York, NY',
    prose: (
      <>
        Leading <strong>frontend architecture</strong> across two codebases —
        driving design discussions, cross-team code reviews, and release
        coordination. Rebuilding the automated <em>signal pipeline</em>{' '}
        processing thousands of weekly signals.
      </>
    ),
    badge: 'Arch lead · Now',
  },
  {
    dateStart: 'Jan 2025',
    dateEnd: '— Mar 2026',
    title: (
      <>
        Software Engineer <It>II</It>
      </>
    ),
    company: 'Leadership Connect',
    location: 'New York, NY',
    prose: (
      <>
        Led a <strong>6-engineer, 6-month rebuild</strong> of a legislative
        bill-tracking CMS. Migrated from Vue/PHP to React, TanStack, Tailwind,
        and Jotai. <em>Page loads from 3+ minutes to under two seconds</em> for
        thousands of daily users — without a design team.
      </>
    ),
    badge: '3min → 2s',
  },
  {
    dateStart: 'Feb 2022',
    dateEnd: '— Jan 2025',
    title: (
      <>
        Fullstack <It>Developer</It>
      </>
    ),
    company: 'Leadership Connect',
    location: 'New York, NY',
    prose: (
      <>
        Built the company's first landing dashboard — a{' '}
        <strong>personalized, permission-based</strong> task system reducing
        time-to-completion by 40%. Created a reusable Jotai/Zod validation
        framework and CI/CD pipelines saving ~2h/day per user across hundreds
        of users.
      </>
    ),
    badge: '40% faster',
  },
];
