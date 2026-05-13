import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/src/home/HomePage';

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: () => {
    document.title = 'Portfolio';
  },
});
