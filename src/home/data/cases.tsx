import type { ReactNode } from 'react';

export type CaseId = 'urbanstems' | 'tracker' | 'pipeline';

type MetaTone = 'copper';

export type CaseMetricValue = { value: ReactNode; label: string };

export type CaseSection = {
  label: string;
  heading?: ReactNode;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
  metrics?: CaseMetricValue[];
  stack?: string[];
};

export type CaseStudy = {
  id: CaseId;
  number: string;
  title: ReactNode;
  sub: string;
  meta: Array<readonly [label: string, value: ReactNode, tone?: MetaTone]>;
  sections: CaseSection[];
};

// Helper for the `<span class="it">…</span>` italic accent in JSX content.
const It = ({ children }: { children: ReactNode }) => (
  <span className='it'>{children}</span>
);
// Inline copper highlight used inside metric values.
const Cu = ({ children }: { children: ReactNode }) => (
  <span className='text-copper'>{children}</span>
);

export const CASES: ReadonlyArray<CaseStudy> = [
  {
    id: 'urbanstems',
    number: '01',
    title: (
      <>
        Urbanstems, <It>cloned.</It>
      </>
    ),
    sub: 'A pixel-faithful fullstack rebuild of a flower-delivery storefront.',
    meta: [
      ['Year', '2025'],
      ['Role', 'Solo, fullstack'],
      ['Stack', 'Next.js · Django · Python'],
      ['State', 'Live · Personal', 'copper'],
    ],
    sections: [
      {
        label: 'The brief',
        heading: 'Match the original, then make the data real.',
        paragraphs: [
          <>
            I rebuilt a flower-delivery storefront I admired, end-to-end, to learn
            the modern e-commerce playbook. The first goal was pixel fidelity —
            every state, every hover, every loading transition. The second was
            the part most clone projects skip: <strong>real data</strong>. A
            flower shop without a thousand SKUs isn't a flower shop.
          </>,
        ],
      },
      {
        label: 'The build',
        heading: 'Server-driven filtering, image preloading, AI-scraped catalogue.',
        bullets: [
          <>
            <strong>Filtering on the server</strong> — categories, colors,
            occasions resolve via one Django endpoint that returns the next
            render-ready payload. No client flicker.
          </>,
          <>
            <strong>Image preloading</strong> — hovering a thumbnail prefetches
            the full variant. Swaps feel instant.
          </>,
          <>
            <strong>Sproutly</strong> — an AI-assisted Python scraper I wrote
            alongside, seeded the catalogue with 1,000+ products.
          </>,
        ],
      },
      {
        label: 'The outcome',
        metrics: [
          { value: '1,000+', label: 'Products seeded' },
          {
            value: (
              <>
                <Cu>0</Cu>ms
              </>
            ),
            label: 'Filter flicker',
          },
          { value: '~95%', label: 'Pixel parity' },
        ],
        stack: ['Next.js', 'Django', 'Python', 'PostgreSQL', 'Tailwind'],
      },
    ],
  },
  {
    id: 'tracker',
    number: '02',
    title: (
      <>
        Legislative <It>Tracker.</It>
      </>
    ),
    sub: 'A 6-engineer, 6-month CMS rewrite — engineering set the bar.',
    meta: [
      ['Year', '2025'],
      ['Role', 'Tech lead'],
      ['Team', '6 eng · 6 mo'],
      ['Outcome', '3min → 2s', 'copper'],
    ],
    sections: [
      {
        label: 'The brief',
        heading: (
          <>
            A 12-year-old Vue/PHP CMS taking <It>3+ minutes</It> to load.
          </>
        ),
        paragraphs: [
          <>
            Thousands of policy analysts ran their day on this product. It was
            correct — and it had aged badly. Replacing it without breaking a
            single workflow was the real constraint.
          </>,
        ],
      },
      {
        label: 'The build',
        heading: 'Vue/PHP out. React, TanStack, Jotai in.',
        bullets: [
          <>
            <strong>Server state ≠ client state.</strong> TanStack Query for the
            former, Jotai atoms for the latter.
          </>,
          <>
            <strong>Routing as a state machine.</strong> Every filter combination
            became a URL, every URL a cache key.
          </>,
          <>
            <strong>Co-located query keys</strong> made cache invalidation a
            one-liner — see the Craft section.
          </>,
          <>
            <strong>Virtualized tables</strong> for thousands-of-bills views,
            with Playwright covering the resize/scroll paths.
          </>,
        ],
      },
      {
        label: 'The outcome',
        metrics: [
          {
            value: (
              <>
                <Cu>2s</Cu>
              </>
            ),
            label: 'Page load (from 3min)',
          },
          { value: '1,840', label: 'Daily analysts' },
          { value: '0', label: 'Day-one regressions' },
        ],
        stack: ['React', 'TanStack', 'Jotai', 'Zod', 'Tailwind', 'Playwright'],
      },
    ],
  },
  {
    id: 'pipeline',
    number: '03',
    title: (
      <>
        Signal <It>Pipeline.</It>
      </>
    ),
    sub: 'Four sources, one deduped index, ~2 hours saved per analyst per day.',
    meta: [
      ['Year', '2024 — 2026'],
      ['Role', 'Backend lead'],
      ['Stack', 'Spring · Kotlin · ES'],
      ['Outcome', '~2h saved / day', 'copper'],
    ],
    sections: [
      {
        label: 'The brief',
        heading: "Two hours of every analyst's day, lost to four feeds.",
        paragraphs: [
          <>
            Twitter, Facebook, news, email. Miss a committee schedule change or
            a senator's tweet and a client report goes out wrong. The team
            wanted those hours back — without losing the verification step.
          </>,
        ],
      },
      {
        label: 'The build',
        heading: 'Four ingestors fan into one Elasticsearch index.',
        bullets: [
          <>
            <strong>Four ingestors</strong> normalize Twitter, Facebook Graph,
            RSS, and IMAP into a canonical Signal record.
          </>,
          <>
            <strong>Verification fan-out</strong> — source weighting and MinHash
            near-duplicate detection over title + first 200 chars.
          </>,
          <>
            <strong>Multi-field analyzers</strong> (text, ngram) for legislative
            jargon. One index powers both the analyst search and the daily
            digest.
          </>,
          <>
            <strong>Observability</strong> — every record carries a trace ID
            through ingest → dedupe → index.
          </>,
        ],
      },
      {
        label: 'The outcome',
        metrics: [
          { value: '~2h', label: 'Saved / analyst / day' },
          {
            value: (
              <>
                <Cu>4</Cu>
              </>
            ),
            label: 'Source streams',
          },
          { value: '~12k', label: 'Weekly signals' },
        ],
        stack: ['Spring Boot', 'Kotlin', 'Elasticsearch', 'PostgreSQL', 'Docker'],
      },
    ],
  },
];

export const getCase = (id: CaseId): CaseStudy =>
  CASES.find((c) => c.id === id)!;
