import { useScrolledPast } from '../../common/hooks/useScrolledPast';
import { cx } from '../../common/utils/cx';
import { SOCIAL } from '../data/portfolio';

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#career', label: 'Career' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
] as const;

export const Nav = () => {
  const solid = useScrolledPast(40);

  return (
    <nav
      className={cx(
        'fixed inset-x-0 top-0 z-100 flex h-15 items-center justify-between px-10 transition-[background,border-color,backdrop-filter] duration-300 max-[900px]:px-5.5',
        solid
          ? 'border-b border-line bg-cream/88 backdrop-blur-[14px]'
          : 'border-b border-transparent bg-transparent'
      )}
    >

      <ul className='flex items-center gap-8 max-[900px]:hidden'>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className='font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mid transition-colors duration-250 hover:text-ink'
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={SOCIAL.resumePdf}
        target='_blank'
        rel='noreferrer'
        className='rounded-pill border border-ink px-4 py-1.75 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-all duration-250 hover:bg-ink hover:text-cream'
      >
        Resume ↗
      </a>
    </nav>
  );
};
