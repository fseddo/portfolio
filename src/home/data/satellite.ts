export type TechStatus = 'daily' | 'occasional' | 'exploring' | 'default';

export type TechChip = {
  name: string;
  years: string;
  status: TechStatus;
};

export const SATELLITE_CHIPS: ReadonlyArray<TechChip> = [
  { name: 'React', years: '5y', status: 'daily' },
  { name: 'TypeScript', years: '5y', status: 'daily' },
  { name: 'TanStack', years: '3y', status: 'daily' },
  { name: 'Tailwind', years: '3y', status: 'daily' },
  { name: 'Kotlin', years: '3y', status: 'daily' },
  { name: 'Spring Boot', years: '3y', status: 'daily' },
  { name: 'Elasticsearch', years: '3y', status: 'daily' },
  { name: 'PostgreSQL', years: '4y', status: 'default' },
  { name: 'Jotai', years: '2y', status: 'default' },
  { name: 'Zod', years: '2y', status: 'default' },
  { name: 'Next.js', years: '2y', status: 'default' },
  { name: 'Node', years: '3y', status: 'default' },
  { name: 'Vite', years: '2y', status: 'default' },
  { name: 'Vitest', years: '2y', status: 'default' },
  { name: 'Playwright', years: '2y', status: 'occasional' },
  { name: 'Storybook', years: '3y', status: 'occasional' },
  { name: 'Docker', years: '2y', status: 'occasional' },
  { name: 'AWS', years: '2y', status: 'occasional' },
  { name: 'Figma', years: '3y', status: 'occasional' },
  { name: 'Rust + WASM', years: 'New', status: 'exploring' },
];
