import { useEffect, useState } from 'react';
import { SpiralCanvas } from './SpiralCanvas';
import './HomePage.css';

// TODO: replace contact details with your own.
const CONTACT_EMAIL = 'your-name@example.com';
const SOCIAL_URLS = {
  instagram: 'https://instagram.com/your-handle',
  twitter: 'https://x.com/your-handle',
  behance: 'https://behance.net/your-handle',
  linkedin: 'https://linkedin.com/in/your-handle',
};

const VIEW_MODES = ['spiral', 'list'] as const;
type ViewMode = (typeof VIEW_MODES)[number];

const MENU_LETTERS = ['M', 'E', 'N', 'U'] as const;

const NAV_LINKS = [
  { label: 'works', href: '#' },
  { label: 'about', href: '#' },
  { label: 'contact', href: `mailto:${CONTACT_EMAIL}` },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: SOCIAL_URLS.instagram,
    icon: (
      <svg width='14' height='14' viewBox='0 0 16 16' fill='currentColor'>
        <path d='M8 1.5C5.83 1.5 5.55 1.51 4.7 1.55c-.85.04-1.43.17-1.94.37a3.9 3.9 0 0 0-1.41.92 3.9 3.9 0 0 0-.92 1.41c-.2.5-.33 1.09-.37 1.94C0 7.55 0 7.83 0 10s.01 2.45.05 3.3c.04.85.17 1.43.37 1.94.21.53.49.98.92 1.41.43.43.88.71 1.41.92.51.2 1.09.33 1.94.37.85.04 1.13.05 3.3.05s2.45-.01 3.3-.05c.85-.04 1.43-.17 1.94-.37a3.9 3.9 0 0 0 1.41-.92c.43-.43.71-.88.92-1.41.2-.51.33-1.09.37-1.94.04-.85.05-1.13.05-3.3s-.01-2.45-.05-3.3c-.04-.85-.17-1.43-.37-1.94a3.9 3.9 0 0 0-.92-1.41 3.9 3.9 0 0 0-1.41-.92c-.51-.2-1.09-.33-1.94-.37C10.45 1.51 10.17 1.5 8 1.5zm0 1.5c2.14 0 2.39.01 3.23.05.78.04 1.2.17 1.48.28.37.14.64.32.92.6.28.28.46.55.6.92.11.28.24.7.28 1.48.04.84.05 1.09.05 3.23s-.01 2.39-.05 3.23c-.04.78-.17 1.2-.28 1.48-.14.37-.32.64-.6.92-.28.28-.55.46-.92.6-.28.11-.7.24-1.48.28-.84.04-1.09.05-3.23.05s-2.39-.01-3.23-.05c-.78-.04-1.2-.17-1.48-.28a2.5 2.5 0 0 1-.92-.6 2.5 2.5 0 0 1-.6-.92c-.11-.28-.24-.7-.28-1.48C1.51 10.39 1.5 10.14 1.5 8s.01-2.39.05-3.23c.04-.78.17-1.2.28-1.48.14-.37.32-.64.6-.92.28-.28.55-.46.92-.6.28-.11.7-.24 1.48-.28C5.61 1.51 5.86 1.5 8 1.5zm0 2.55a3.95 3.95 0 1 0 0 7.9 3.95 3.95 0 0 0 0-7.9zm0 6.5a2.55 2.55 0 1 1 0-5.1 2.55 2.55 0 0 1 0 5.1zm5.03-6.66a.92.92 0 1 1-1.85 0 .92.92 0 0 1 1.85 0z' />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: SOCIAL_URLS.twitter,
    icon: (
      <svg width='13' height='13' viewBox='0 0 16 15' fill='currentColor'>
        <path d='M12.587 0h2.453L9.654 6.133l6.293 8.32H11.008L7.142 9.397l-4.427 5.056H.261L5.968 7.893-.058 0h5.06l3.494 4.619L12.587 0zm-.86 13.013h1.36L4.288 1.387H2.827l8.9 11.626z' />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: SOCIAL_URLS.behance,
    icon: (
      <svg width='16' height='16' viewBox='0 0 18 18' fill='currentColor'>
        <path d='M5.24 3.4c.52 0 1 .04 1.43.16.44.08.8.24 1.12.44.32.2.56.48.72.84.16.36.24.8.24 1.28 0 .56-.12 1.04-.4 1.4-.24.36-.64.64-1.12.88.72.2 1.24.56 1.6 1.04.36.48.52 1.08.52 1.76 0 .56-.12 1.04-.32 1.44-.2.4-.52.72-.88.96-.36.24-.8.4-1.28.52-.48.08-.96.16-1.48.16H0V3.4h5.24zM4.92 7.4c.44 0 .8-.08 1.08-.32.28-.2.4-.56.4-1 0-.24-.04-.48-.16-.64-.08-.16-.2-.28-.36-.36a1.46 1.46 0 0 0-.52-.16c-.2-.04-.4-.04-.6-.04H2.4V7.4h2.52zm.16 4.2c.24 0 .48-.04.68-.08.2-.04.4-.12.56-.24.16-.12.28-.28.36-.48.08-.2.16-.44.16-.72 0-.6-.16-1-.48-1.24-.32-.24-.76-.36-1.32-.36H2.4v3.12h2.68zm9.6.6c.36.36.88.52 1.56.52.48 0 .92-.12 1.28-.36.36-.24.6-.52.68-.76h2.04c-.32 1-.84 1.72-1.52 2.16-.68.44-1.52.64-2.48.64-.68 0-1.28-.12-1.84-.32-.56-.2-1-.52-1.4-.92-.4-.4-.68-.88-.88-1.44-.2-.56-.32-1.16-.32-1.84 0-.64.12-1.24.32-1.8s.48-1.04.88-1.44c.4-.4.84-.72 1.36-.96.52-.24 1.12-.32 1.76-.32.72 0 1.36.12 1.88.4.52.28.96.64 1.32 1.08.32.44.56 1 .72 1.6.16.6.24 1.24.16 1.92h-6.04c0 .68.24 1.2.52 1.84zm2.72-4.92c-.28-.32-.76-.48-1.32-.48-.4 0-.72.08-1 .2-.24.16-.44.32-.6.52a1.7 1.7 0 0 0-.32.64c-.04.2-.12.4-.12.56h3.76c-.08-.6-.24-1.08-.52-1.44h.12zM12.32 4.6h4.68v1.16h-4.68V4.6z' />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: SOCIAL_URLS.linkedin,
    icon: (
      <svg width='14' height='14' viewBox='0 0 16 16' fill='currentColor'>
        <path d='M0 1.15C0 .51.53 0 1.18 0h13.65C15.47 0 16 .51 16 1.15v13.7c0 .63-.53 1.15-1.18 1.15H1.18C.53 16 0 15.49 0 14.85V1.15zm4.94 12.24V6.17H2.54v7.22h2.4zm-1.2-8.2c.84 0 1.36-.56 1.36-1.25-.02-.71-.52-1.25-1.34-1.25s-1.36.55-1.36 1.25c0 .69.52 1.25 1.34 1.25zm3.78 8.2h2.4v-4.04c0-.22.02-.43.08-.59.18-.43.57-.87 1.23-.87.87 0 1.21.66 1.21 1.62v3.88h2.4V9.32c0-2.22-1.18-3.26-2.76-3.26-1.27 0-1.84.7-2.16 1.2v-1.04h-2.4c.03.68 0 7.22 0 7.22z' />
      </svg>
    ),
  },
] as const;

const MARQUEE_TEXT = 'showreel · 2025 · ';

const ViewSwitch = ({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (next: ViewMode) => void;
}) => (
  <div className='portfolio-switch' role='tablist'>
    {VIEW_MODES.map((mode, i) => (
      <span key={mode} style={{ display: 'contents' }}>
        <button
          role='tab'
          aria-selected={value === mode}
          className={value === mode ? 'is-active' : ''}
          onClick={() => onChange(mode)}
        >
          {mode}
        </button>
        {i === 0 && <span className='dot' aria-hidden='true' />}
      </span>
    ))}
  </div>
);

const LogoMark = () => (
  <div className='portfolio-logo'>
    <svg
      className='star'
      viewBox='0 0 74 71'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='portfolio-star-grad' x1='7' x2='66' y1='65' y2='6'>
          <stop offset='0.1' stopColor='#fdff6c' />
          <stop offset='1' stopColor='#28de91' />
        </linearGradient>
      </defs>
      <path
        fill='url(#portfolio-star-grad)'
        d='M37 0 L43 26 L66 8 L52 30 L74 35 L52 41 L66 63 L43 45 L37 71 L31 45 L8 63 L22 41 L0 35 L22 30 L8 8 L31 26 Z'
      />
    </svg>
    <svg className='tag' viewBox='0 0 157 60' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill='#f8f8f8'
        d='M130 60 H0 L17 13 A20 20 0 0 1 36 0 H137 A20 20 0 0 1 156 27 L149 46 A20 20 0 0 1 130 60 Z'
      />
      <text
        x='78'
        y='37'
        textAnchor='middle'
        fill='#0a0a0a'
        fontFamily='Inter, sans-serif'
        fontSize='14'
        fontWeight='600'
        letterSpacing='3'
      >
        CREATIVE
      </text>
    </svg>
  </div>
);

const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className='portfolio-menu-button'
    onClick={onClick}
    aria-label='Open menu'
  >
    {MENU_LETTERS.map((letter, i) => (
      <span key={i} className='letter'>
        {letter}
      </span>
    ))}
  </button>
);

const MenuDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => (
  <aside
    className={`portfolio-menu-drawer${open ? ' is-open' : ''}`}
    aria-hidden={!open}
  >
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: 28,
        right: 32,
        background: 'transparent',
        border: '1px solid rgba(248,248,248,0.18)',
        borderRadius: 999,
        color: '#f8f8f8',
        padding: '12px 22px',
        fontSize: 12,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        font: 'inherit',
      }}
      aria-label='Close menu'
    >
      CLOSE
    </button>
    <nav className='portfolio-menu-links'>
      {NAV_LINKS.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
    <div className='portfolio-menu-footer'>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      <div className='portfolio-menu-socials'>
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            className='portfolio-social-link'
            href={s.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  </aside>
);

// Circular marquee:
//   For N glyphs in `letters`, the i-th glyph sits at angle (i / N) · 360°
//   on a circle of radius `radius`. The CSS pipeline is
//     translate to circle center        (top:50%, left:50%, transform-origin:0 0)
//     → rotate(angle)                   (point along the radius)
//     → translate(radius)               (push out along that radius)
//     → rotate(90deg)                   (turn glyph upright relative to circle)
//   The container itself rotates via @keyframes portfolio-rotate, so the text
//   appears to revolve continuously around the showreel thumb.
const ShowreelMarquee = () => {
  const letters = Array.from(MARQUEE_TEXT.repeat(4));
  const radius = 70;
  return (
    <div className='portfolio-showreel' aria-label='Showreel reel'>
      <div className='portfolio-marquee'>
        {letters.map((ch, i) => {
          const angle = (i / letters.length) * 360;
          return (
            <span
              key={i}
              className='letter'
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <div className='portfolio-showreel-thumb'>REEL</div>
    </div>
  );
};

const SoundButton = () => (
  <button className='portfolio-sound' aria-label='Toggle sound'>
    <svg width='14' height='12' viewBox='0 0 14 12' fill='currentColor'>
      <path d='M2.67 8H1.33A.67.67 0 0 1 .67 7.33V4.67c0-.37.3-.67.66-.67h1.34l3.2-2.93a.4.4 0 0 1 .67.3v9.26a.4.4 0 0 1-.67.3L2.67 8z' />
      <path d='M9.71 3.6a.42.42 0 0 1 .59 0l1.77 1.77 1.77-1.77a.42.42 0 0 1 .59.6l-1.77 1.76 1.77 1.77a.42.42 0 0 1-.59.59l-1.77-1.77-1.77 1.77a.42.42 0 0 1-.59-.59L11.47 6 9.71 4.19a.42.42 0 0 1 0-.6z' />
    </svg>
  </button>
);

const ListView = ({ active }: { active: boolean }) => (
  <div
    className={`portfolio-list${active ? ' is-active' : ''}`}
    aria-hidden={!active}
  >
    {['Aurora', 'Helix', 'Cobalt', 'Saffron', 'Quartz', 'Ember'].map((w) => (
      <a key={w} className='portfolio-list-item' href='#'>
        {w}
      </a>
    ))}
  </div>
);

export const HomePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('spiral');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className='portfolio-root' data-scroll='top'>
      <div className='portfolio-bg-vignette' />
      <div className='portfolio-bg-grain' />

      <SpiralCanvas active={viewMode === 'spiral'} />
      <ListView active={viewMode === 'list'} />

      <div className='portfolio-overlay'>
        <LogoMark />
        <ViewSwitch value={viewMode} onChange={setViewMode} />
        <MenuButton onClick={() => setMenuOpen(true)} />
        <ShowreelMarquee />
        <SoundButton />
      </div>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};
