import { useEffect, useState } from 'react';

// Returns true once window.scrollY exceeds the threshold. Single passive
// listener shared by callers via React state. Used by Nav for its solid
// background swap.
export const useScrolledPast = (threshold: number) => {
  const [scrolled, setScrolled] = useState(() =>
    typeof window === 'undefined' ? false : window.scrollY > threshold
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
};
