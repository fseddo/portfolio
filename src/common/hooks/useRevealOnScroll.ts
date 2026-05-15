import { useEffect } from 'react';

// Attaches a single IntersectionObserver to every `.rv` element on the page
// and adds `.in` when each enters the viewport. The `.rv` styles live in
// globals.css and own the actual transition.
export const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll('.rv').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
