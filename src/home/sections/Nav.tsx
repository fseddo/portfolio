import { useScrolledPast } from '../../common/hooks/useScrolledPast';
import { cx } from '../../common/utils/cx';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#craft', label: 'Craft' },
  { href: '#career', label: 'Career' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export const Nav = () => {
  const solid = useScrolledPast(40);

  return (
    <nav
      className={cx(
        'fixed inset-x-0 top-0 z-100 grid h-16 grid-cols-[auto_1fr_auto] items-center gap-8 border-b border-transparent px-10 transition-[background,border-color] duration-350 ease-soft-out max-[1100px]:px-6',
        solid &&
          'border-line bg-cream/[0.92] backdrop-blur-[14px] backdrop-saturate-150'
      )}
    >
      <a
        href='#'
        className='flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-ink no-underline'
      >
        <span className='inline-block h-2 w-2 bg-copper' />
        F. Seddo
      </a>

      <ul className='hidden justify-self-center min-[1101px]:flex gap-9 list-none'>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className='group relative block py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink no-underline'
            >
              {link.label}
              <span className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100' />
            </a>
          </li>
        ))}
      </ul>

      <a
        href='#contact'
        className='group flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink no-underline'
      >
        Get in touch
        <span className='inline-flex h-[14px] w-[14px] items-center justify-center rounded-full bg-ink text-[9px] text-cream transition-[transform,background] duration-250 group-hover:-rotate-45 group-hover:bg-copper'>
          ↗
        </span>
      </a>
    </nav>
  );
};
