import { useRevealOnScroll } from '../common/hooks/useRevealOnScroll';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Nav } from './sections/Nav';
import { Stack } from './sections/Stack';
import { Work } from './sections/work/Work';

export const HomePage = () => {
  useRevealOnScroll();

  return (
    <>
      <Nav />
      <Hero />
      {/* <About /> */}
      <Experience />
      <Work />
      <Stack />
      <Footer />
    </>
  );
};
