import { useRevealOnScroll } from '../common/hooks/useRevealOnScroll';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Intro } from './sections/Intro';
import { Work } from './sections/work/Work';
import { Craft } from './sections/craft/Craft';
import { Career } from './sections/Career';
import { Stack } from './sections/Stack';
import { ContactStrip } from './sections/ContactStrip';
import { Footer } from './sections/Footer';
import { CommitFooter } from './sections/CommitFooter';

export const HomePage = () => {
  useRevealOnScroll();

  return (
    <>
      <Nav />
      <main className='bg-cream text-ink'>
        <Hero />
        <Intro />
        <Work />
        <Craft />
        <Career />
        <Stack />
        <ContactStrip />
        <Footer />
      </main>
      <CommitFooter />
    </>
  );
};
