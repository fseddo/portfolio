export type CommitType = 'feat' | 'fix' | 'perf' | 'refactor';

export type Commit = {
  repo: string;
  type: CommitType;
  message: string;
  when: string;
};

export const LATEST_COMMIT: Commit = {
  repo: 'portfolio-v9',
  type: 'refactor',
  message: 'extract signal funnel into reusable component',
  when: '2h',
};

export const RECENT_COMMITS: ReadonlyArray<Commit> = [
  LATEST_COMMIT,
  {
    repo: 'portfolio-v9',
    type: 'feat',
    message: 'prefers-reduced-motion guard for hero',
    when: '5h',
  },
  {
    repo: 'tanstack-utils',
    type: 'fix',
    message: 'column resize race on virtual rows',
    when: '1d',
  },
  {
    repo: 'kotlin-search',
    type: 'perf',
    message: 'precompute analyzer chain',
    when: '2d',
  },
  {
    repo: 'portfolio-v9',
    type: 'feat',
    message: 'sticky commit footer',
    when: '3d',
  },
  {
    repo: 'tanstack-utils',
    type: 'refactor',
    message: 'consolidate query key factories',
    when: '4d',
  },
  {
    repo: 'urbanstems-sim',
    type: 'fix',
    message: 'image preload race on filter swap',
    when: '5d',
  },
  {
    repo: 'kotlin-search',
    type: 'feat',
    message: 'multi-field analyzer for legislative text',
    when: '6d',
  },
];
