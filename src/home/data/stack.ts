export type StackCategory = {
  label: string;
  items: ReadonlyArray<string>;
};

export const STACK_CATEGORIES: ReadonlyArray<StackCategory> = [
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
