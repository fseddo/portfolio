/**
 * All static portfolio content lives here so JSX stays purely structural.
 * Strings marked `Html` contain `<span class="it">…</span>` or `<strong>…</strong>`
 * runs and are rendered via `dangerouslySetInnerHTML`. Editing copy never
 * touches a component file.
 */

export type HeroStat = {
  value: string;
  unit: string;
  label: string;
};

export type HeroChip = {
  dot: 'c2' | 'copper' | 'moss';
  heading: string;
  sub: string;
  bobDurationS: number;
  /** Negative delay so each chip starts at a different phase of its loop. */
  bobDelayS: number;
  /** Asymmetric alignment within the side column. */
  align?: 'end' | 'start';
  /** Percentage width; the design uses 100/92/96. */
  widthPct: number;
};

export type ExperienceRow = {
  date: string;
  company: string;
  /** HTML — contains `<span class="it">III</span>`-style accents. */
  titleHtml: string;
  /** HTML — contains `<strong>…</strong>` runs. */
  descHtml: string;
  badge: string;
};

export type StackCategory = {
  label: string;
  items: readonly string[];
};

export type ProjectId = 'urbanstems' | 'tracker' | 'pipeline';

export type Project = {
  id: ProjectId;
  /** Card label inside the dark veil (e.g. "01 · Full-stack e-commerce"). */
  tagNumber: string;
  tagText: string;
  eyebrowYear: string;
  eyebrowMeta: string;
  /** HTML title with optional italic accent. */
  titleHtml: string;
  /** HTML body paragraph with `<strong>` runs. */
  bodyHtml: string;
  chips: readonly string[];
  /** Wide cards span the full 2-column row. Urbanstems is the only wide one. */
  wide?: boolean;
};

export type CaseMetaRow = readonly [label: string, value: string, accent?: 'cu'];

export type CaseMetric = {
  /** HTML — may contain `<span class="cu">…</span>` runs. */
  valueHtml: string;
  label: string;
};

export type CaseSection = {
  label: string;
  /** HTML — may contain `.it` italics. */
  headingHtml?: string;
  /** HTML paragraphs — each may contain `<strong>`. */
  paragraphsHtml?: readonly string[];
  /** HTML bullets — each may contain `<strong>`. */
  bulletsHtml?: readonly string[];
  metrics?: readonly CaseMetric[];
  stack?: readonly string[];
};

export type CaseStudy = {
  number: string;
  /** HTML title (e.g. `Urbanstems, <span class="it">cloned.</span>`). */
  titleHtml: string;
  sub: string;
  meta: readonly CaseMetaRow[];
  sections: readonly CaseSection[];
};

export const MARQUEE_ITEMS = [
  'React',
  'TypeScript',
  'Next.js',
  'Spring Boot',
  'Kotlin',
  'Django',
  'PostgreSQL',
  'Elasticsearch',
  'TanStack',
  'Jotai',
  'AWS',
  'Docker',
] as const;

export const HERO_STATS: readonly HeroStat[] = [
  { value: '2', unit: 's', label: 'Load · was 3+ min' },
  { value: '60', unit: '%', label: 'Pipeline time saved' },
  { value: '40', unit: '%', label: 'Workflow time saved' },
  { value: '4', unit: 'yr', label: 'Leadership Connect' },
];

export const HERO_CHIPS: readonly HeroChip[] = [
  {
    dot: 'c2',
    heading: 'Open to roles',
    sub: 'Senior · Staff · Fullstack',
    bobDurationS: 7.5,
    bobDelayS: 0,
    widthPct: 100,
  },
  {
    dot: 'copper',
    heading: 'React · TypeScript',
    sub: 'Primary stack · TanStack',
    bobDurationS: 9.5,
    bobDelayS: -2.4,
    align: 'end',
    widthPct: 92,
  },
  {
    dot: 'moss',
    heading: 'New York, NY',
    sub: 'Open to remote',
    bobDurationS: 8.5,
    bobDelayS: -4.8,
    align: 'start',
    widthPct: 96,
  },
];

export const PROJECTS: readonly Project[] = [
  {
    id: 'urbanstems',
    tagNumber: '01',
    tagText: 'Full-stack e-commerce',
    eyebrowYear: '2025',
    eyebrowMeta: 'Live · Personal build',
    titleHtml: 'Urbanstems Clone',
    bodyHtml:
      'Full-stack e-commerce with <strong>Next.js &amp; Django</strong>. Server-driven filtering and image preloading eliminate visual flicker. 1,000+ products seeded via Sproutly — an AI-assisted Python scraper.',
    chips: ['Next.js', 'Django', 'Python', 'PostgreSQL', 'AI-assisted'],
    wide: true,
  },
  {
    id: 'tracker',
    tagNumber: '02',
    tagText: 'CMS rebuild',
    eyebrowYear: '2025',
    eyebrowMeta: 'Lead · 6 engineers',
    titleHtml: 'Legislative <span class="it">Tracker</span>',
    bodyHtml:
      'Led a 6-engineer rebuild at Leadership Connect. Migrated <strong>Vue/PHP → React + TanStack + Jotai</strong>. Page loads from 3+ minutes to under 2 seconds. Thousands of daily users, no design team.',
    chips: ['React', 'TanStack', 'Jotai', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'pipeline',
    tagNumber: '03',
    tagText: 'Backend automation - Data Ingestion pipeline',
    eyebrowYear: '2024–26',
    eyebrowMeta: 'Production · Backend lead',
    titleHtml: 'Signal <span class="it">Pipeline</span>',
    bodyHtml:
      'Automated CI/CD ingestion from Twitter, Facebook, news, and email. <strong>Spring Boot · Kotlin · Elasticsearch.</strong> Saves ~2h/day per user across hundreds of users.',
    chips: ['Spring Boot', 'Kotlin', 'Elasticsearch', 'Jenkins'],
  },
];

export const URBANSTEMS_SLIDES = [
  { src: '/portfolio/urbanstems-1.png', alt: 'Urbanstems homepage' },
  { src: '/portfolio/urbanstems-2.png', alt: 'Urbanstems product' },
] as const;

export const URBANSTEMS_DEMO_URL = 'https://urbanstems-sim.up.railway.app/';

export const EXPERIENCE: readonly ExperienceRow[] = [
  {
    date: 'Mar 2026 — Present',
    company: 'Leadership Connect',
    titleHtml: 'Software Engineer <span class="it">III</span>',
    descHtml:
      'Leading <strong>frontend architecture</strong> across two codebases — driving design discussions, cross-team code reviews, and release coordination. Rebuilding the automated signal pipeline (Spring Boot · Kotlin · Elasticsearch) processing thousands of weekly signals.',
    badge: 'Arch lead',
  },
  {
    date: 'Jan 2025 — Mar 2026',
    company: 'Leadership Connect',
    titleHtml: 'Software Engineer <span class="it">II</span>',
    descHtml:
      'Led a <strong>6-engineer, 6-month rebuild</strong> of a legislative bill-tracking CMS. Migrated Vue/PHP → React + TanStack + Tailwind + Jotai. Page loads from 3+ min to under 2 seconds. Thousands of daily users, no design team.',
    badge: '3 min → 2s',
  },
  {
    date: 'Feb 2022 — Jan 2025',
    company: 'Leadership Connect',
    titleHtml: 'Fullstack <span class="it">Developer</span>',
    descHtml:
      "Built the company's first landing dashboard — a <strong>personalized, permission-based</strong> task system reducing time-to-completion by 40%. Created a reusable Jotai/Zod validation framework and CI/CD pipelines saving ~2h/day per user across hundreds of users.",
    badge: '40% faster',
  },
];

export const STACK: readonly StackCategory[] = [
  {
    label: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Vue',
      'React Native',
      'TanStack Query',
      'TanStack Router',
      'Jotai',
      'Redux',
      'Tailwind',
      'Zod',
    ],
  },
  {
    label: 'Backend & Infra',
    items: [
      'Node.js',
      'Express',
      'Spring Boot',
      'Django',
      'PostgreSQL',
      'Elasticsearch',
      'Firebase',
      'AWS',
      'Docker',
      'Jenkins',
    ],
  },
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Kotlin', 'HTML5', 'CSS3'],
  },
  {
    label: 'Tools & AI',
    items: [
      'Vite',
      'Jest',
      'Vitest',
      'Playwright',
      'React Testing Library',
      'Figma',
      'Claude',
      'Cursor',
      'Copilot',
    ],
  },
];

export const CASES: Record<ProjectId, CaseStudy> = {
  urbanstems: {
    number: '01',
    titleHtml: 'Urbanstems, <span class="it">cloned.</span>',
    sub: 'A pixel-faithful fullstack rebuild of a flower-delivery storefront.',
    meta: [
      ['Year', '2025'],
      ['Role', 'Solo, fullstack'],
      ['Stack', 'Next.js · Django · Python'],
      ['State', 'Live · Personal', 'cu'],
    ],
    sections: [
      {
        label: 'The brief',
        headingHtml: 'Match the original, then make the data real.',
        paragraphsHtml: [
          'I rebuilt a flower-delivery storefront I admired, end-to-end, to learn the modern e-commerce playbook. The first goal was pixel fidelity — every state, every hover, every loading transition. The second was the part most clone projects skip: <strong>real data</strong>.',
        ],
      },
      {
        label: 'The build',
        headingHtml:
          'Server-driven filtering, image preloading, AI-scraped catalogue.',
        bulletsHtml: [
          '<strong>Filtering on the server</strong> — categories, colors, occasions resolve via one Django endpoint that returns the next render-ready payload. No client flicker.',
          '<strong>Image preloading</strong> — hovering a thumbnail prefetches the full variant. Swaps feel instant.',
          '<strong>Sproutly</strong> — an AI-assisted Python scraper I wrote alongside, seeded the catalogue with 1,000+ products.',
        ],
      },
      {
        label: 'The outcome',
        metrics: [
          { valueHtml: '1,000+', label: 'Products seeded' },
          { valueHtml: '<span class="cu">0</span>ms', label: 'Filter flicker' },
          { valueHtml: '~95%', label: 'Pixel parity' },
        ],
        stack: ['Next.js', 'Django', 'Python', 'PostgreSQL', 'Tailwind'],
      },
    ],
  },
  tracker: {
    number: '02',
    titleHtml: 'Legislative <span class="it">Tracker.</span>',
    sub: 'A 6-engineer, 6-month CMS rewrite — engineering set the bar.',
    meta: [
      ['Year', '2025'],
      ['Role', 'Tech lead'],
      ['Team', '6 eng · 6 mo'],
      ['Outcome', '3min → 2s', 'cu'],
    ],
    sections: [
      {
        label: 'The brief',
        headingHtml:
          'A 12-year-old Vue/PHP CMS taking <span class="it">3+ minutes</span> to load.',
        paragraphsHtml: [
          'Thousands of policy analysts ran their day on this product. It was correct — and it had aged badly. Replacing it without breaking a single workflow was the real constraint.',
        ],
      },
      {
        label: 'The build',
        headingHtml: 'Vue/PHP out. React, TanStack, Jotai in.',
        bulletsHtml: [
          '<strong>Server state ≠ client state.</strong> TanStack Query for the former, Jotai atoms for the latter.',
          '<strong>Routing as a state machine.</strong> Every filter combination became a URL, every URL a cache key.',
          '<strong>Virtualized tables</strong> for thousands-of-bills views, with Playwright covering the resize/scroll paths.',
        ],
      },
      {
        label: 'The outcome',
        metrics: [
          { valueHtml: '<span class="cu">2s</span>', label: 'Page load (from 3min)' },
          { valueHtml: '1,840', label: 'Daily analysts' },
          { valueHtml: '0', label: 'Day-one regressions' },
        ],
        stack: ['React', 'TanStack', 'Jotai', 'Zod', 'Tailwind', 'Playwright'],
      },
    ],
  },
  pipeline: {
    number: '03',
    titleHtml: 'Signal <span class="it">Pipeline.</span>',
    sub: 'Four sources, one deduped index, ~2 hours saved per analyst per day.',
    meta: [
      ['Year', '2024 — 2026'],
      ['Role', 'Backend lead'],
      ['Stack', 'Spring · Kotlin · ES'],
      ['Outcome', '~2h saved / day', 'cu'],
    ],
    sections: [
      {
        label: 'The brief',
        headingHtml:
          "Two hours of every analyst's day, lost to four feeds.",
        paragraphsHtml: [
          "Twitter, Facebook, news, email. Miss a committee schedule change or a senator's tweet and a client report goes out wrong. The team wanted those hours back — without losing the verification step.",
        ],
      },
      {
        label: 'The build',
        headingHtml: 'Four ingestors fan into one Elasticsearch index.',
        bulletsHtml: [
          '<strong>Four ingestors</strong> normalize Twitter, Facebook Graph, RSS, and IMAP into a canonical Signal record.',
          '<strong>Verification fan-out</strong> — source weighting and MinHash near-duplicate detection over title + first 200 chars.',
          '<strong>Multi-field analyzers</strong> (text, ngram) for legislative jargon. One index powers both the analyst search and the daily digest.',
        ],
      },
      {
        label: 'The outcome',
        metrics: [
          { valueHtml: '~2h', label: 'Saved / analyst / day' },
          { valueHtml: '<span class="cu">4</span>', label: 'Source streams' },
          { valueHtml: '~12k', label: 'Weekly signals' },
        ],
        stack: ['Spring Boot', 'Kotlin', 'Elasticsearch', 'PostgreSQL', 'Docker'],
      },
    ],
  },
};

export const SOCIAL = {
  github: 'https://github.com/fseddo',
  linkedin: 'https://linkedin.com/in/francesco-seddo',
  email: 'francesco.seddo@gmail.com',
  resumePdf: '/Francesco_Seddo.pdf',
} as const;
