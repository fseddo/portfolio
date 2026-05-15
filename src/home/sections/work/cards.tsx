import type { ComponentType, ReactNode } from 'react';
import type { CaseId } from '../../data/cases';
import { UrbanstemsArt } from './art/UrbanstemsArt';
import { TrackerArt } from './art/TrackerArt';
import { PipelineArt } from './art/PipelineArt';

type CatPill = { label: string; tone?: 'copper' };

export type WorkCardData = {
  id: CaseId;
  wide?: boolean;
  Art: ComponentType;
  cat: ReadonlyArray<CatPill>;
  statTag: ReactNode;
  location: string;
  year: string;
  index: string;
  title: ReactNode;
  prose: ReactNode;
};

const It = ({ children }: { children: ReactNode }) => (
  <span className='it'>{children}</span>
);

export const WORK_CARDS: ReadonlyArray<WorkCardData> = [
  {
    id: 'urbanstems',
    wide: true,
    Art: UrbanstemsArt,
    cat: [
      { label: 'Live', tone: 'copper' },
      { label: 'Fullstack e-commerce' },
    ],
    statTag: (
      <>
        <span className='text-[#FFB28E]'>●</span> 1,000+ products seeded
      </>
    ),
    location: 'New York / 2025',
    year: '2025',
    index: '№ 01 / 03',
    title: (
      <>
        Urbanstems, <It>cloned.</It>
      </>
    ),
    prose: (
      <>
        A pixel-faithful fullstack rebuild on <strong>Next.js + Django</strong>.
        Server-driven filtering and image preloading eliminate visual flicker.
        Catalogue seeded by Sproutly — an AI-assisted Python scraper I wrote
        alongside.
      </>
    ),
  },
  {
    id: 'tracker',
    Art: TrackerArt,
    cat: [{ label: 'CMS Rebuild' }, { label: 'Lead' }],
    statTag: (
      <>
        3min → <span className='text-[#FFB28E]'>2s</span>
      </>
    ),
    location: 'New York / 2025',
    year: '2025',
    index: '№ 02 / 03',
    title: (
      <>
        Legislative <It>Tracker.</It>
      </>
    ),
    prose: (
      <>
        A 6-engineer, 6-month rewrite — Vue/PHP out,{' '}
        <strong>React + TanStack + Jotai</strong> in. Drove architecture,
        design, and ship date. Engineering set the bar.
      </>
    ),
  },
  {
    id: 'pipeline',
    Art: PipelineArt,
    cat: [{ label: 'Backend pipeline' }, { label: 'Production' }],
    statTag: (
      <>
        ~2h saved <span className='text-[#FFB28E]'>/ day</span>
      </>
    ),
    location: 'New York / 2024',
    year: '2024',
    index: '№ 03 / 03',
    title: (
      <>
        Signal <It>Pipeline.</It>
      </>
    ),
    prose: (
      <>
        Automated CI/CD ingestion from Twitter, Facebook, news, and email.{' '}
        <strong>Spring Boot · Kotlin · Elasticsearch.</strong> Saves ~2h/day per
        user, across hundreds of users.
      </>
    ),
  },
];
