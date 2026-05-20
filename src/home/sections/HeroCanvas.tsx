import { useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────────────────────────────────
 * Tech-chip glyph dictionary. Each entry knows how to draw itself on a 2D
 * context centered at (0,0) at half-size `s`. The dictionary is iterated three
 * times (51 particles total) at low alpha so the chips blend into the warm
 * hero rather than dominating it.
 *
 * Ported verbatim from the Direction F prototype — geometry constants here
 * (e.g. `s*.85` for the Python circles) are tuned to the brand glyph and
 * shouldn't be "cleaned up".
 * ───────────────────────────────────────────────────────────────────────── */

type DrawCtx = CanvasRenderingContext2D;

const roundRect = (
  c: DrawCtx,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
};

type Tech = {
  label: string;
  draw: (c: DrawCtx, s: number) => void;
};

const TECHS: readonly Tech[] = [
  {
    label: 'React',
    draw: (c, s) => {
      c.fillStyle = '#0F1722';
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      c.strokeStyle = '#61DAFB';
      c.lineWidth = s * 0.11;
      c.fillStyle = '#61DAFB';
      for (let i = 0; i < 3; i++) {
        c.save();
        c.rotate((i * Math.PI) / 3);
        c.beginPath();
        c.ellipse(0, 0, s * 0.78, s * 0.3, 0, 0, Math.PI * 2);
        c.stroke();
        c.restore();
      }
      c.beginPath();
      c.arc(0, 0, s * 0.16, 0, Math.PI * 2);
      c.fill();
    },
  },
  {
    label: 'TS',
    draw: (c, s) => {
      c.fillStyle = '#3178C6';
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      c.fillStyle = '#fff';
      c.font = `700 ${s * 0.95}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('TS', 0, s * 0.06);
    },
  },
  {
    label: 'JS',
    draw: (c, s) => {
      c.fillStyle = '#F0DB4F';
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      c.fillStyle = '#1B140C';
      c.font = `700 ${s * 0.95}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('JS', 0, s * 0.06);
    },
  },
  {
    label: 'Next',
    draw: (c, s) => {
      c.fillStyle = '#000';
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = 'rgba(255,255,255,.18)';
      c.lineWidth = s * 0.04;
      c.stroke();
      c.fillStyle = '#fff';
      c.font = `700 ${s * 1.05}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('N', 0, s * 0.05);
    },
  },
  {
    label: 'Node',
    draw: (c, s) => {
      c.fillStyle = '#3C873A';
      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        if (i === 0) c.moveTo(Math.cos(a) * s, Math.sin(a) * s);
        else c.lineTo(Math.cos(a) * s, Math.sin(a) * s);
      }
      c.closePath();
      c.fill();
      c.fillStyle = '#fff';
      c.font = `700 ${s * 0.5}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('Node', 0, 0);
    },
  },
  {
    label: 'Py',
    draw: (c, s) => {
      c.fillStyle = '#306998';
      c.beginPath();
      c.arc(-s * 0.12, -s * 0.12, s * 0.85, Math.PI, 0);
      c.fill();
      c.fillStyle = '#FFD43B';
      c.beginPath();
      c.arc(s * 0.12, s * 0.12, s * 0.85, 0, Math.PI);
      c.fill();
      c.fillStyle = '#fff';
      c.font = `700 ${s * 0.5}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('Py', 0, 0);
    },
  },
  {
    label: 'K',
    draw: (c, s) => {
      const g = c.createLinearGradient(-s, -s, s, s);
      g.addColorStop(0, '#E97529');
      g.addColorStop(0.5, '#C757BC');
      g.addColorStop(1, '#7F52FF');
      c.fillStyle = g;
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      c.fillStyle = '#fff';
      c.font = `700 ${s * 1.05}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('K', 0, s * 0.05);
    },
  },
  {
    label: 'PG',
    draw: (c, s) => {
      c.fillStyle = '#336791';
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#fff';
      c.font = `700 ${s * 0.55}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('PG', 0, 0);
    },
  },
  {
    label: 'Docker',
    draw: (c, s) => {
      c.fillStyle = '#2496ED';
      roundRect(c, -s, -s * 0.7, s * 2, s * 1.4, s * 0.28);
      c.fill();
      const bw = s * 0.36;
      const bh = s * 0.26;
      const gap = s * 0.07;
      c.fillStyle = '#fff';
      for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 2; row++) {
          if (col === 2 && row === 1) continue;
          roundRect(
            c,
            -s * 0.58 + col * (bw + gap),
            -s * 0.23 + row * (bh + gap),
            bw,
            bh,
            2
          );
          c.fill();
        }
      }
    },
  },
  {
    label: 'AWS',
    draw: (c, s) => {
      c.fillStyle = '#232F3E';
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      c.strokeStyle = '#FF9900';
      c.lineWidth = s * 0.13;
      c.beginPath();
      c.arc(0, s * 0.08, s * 0.6, Math.PI * 0.15, Math.PI * 0.85);
      c.stroke();
      c.fillStyle = '#FF9900';
      c.font = `700 ${s * 0.55}px DM Sans, sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('AWS', 0, -s * 0.22);
    },
  },
  {
    label: 'Tail',
    draw: (c, s) => {
      c.fillStyle = '#0F172A';
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = '#38BDF8';
      c.lineWidth = s * 0.16;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(-s * 0.7, 0);
      c.bezierCurveTo(-s * 0.35, -s * 0.5, 0, s * 0.5, s * 0.35, 0);
      c.bezierCurveTo(s * 0.55, -s * 0.35, s * 0.7, s * 0.35, s * 0.7, 0);
      c.stroke();
    },
  },
  {
    label: 'Sp',
    draw: (c, s) => {
      c.fillStyle = '#6DB33F';
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = '#fff';
      c.lineWidth = s * 0.14;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(s * 0.1, s * 0.55);
      c.lineTo(0, -s * 0.2);
      c.stroke();
      c.beginPath();
      c.bezierCurveTo(-s * 0.6, -s * 0.6, -s * 0.8, s * 0.2, 0, -s * 0.2);
      c.stroke();
    },
  },
  {
    label: 'ES',
    draw: (c, s) => {
      c.fillStyle = '#231F20';
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      const widths = [0.85, 1.2, 0.85];
      const cols = ['#FEC514', '#00BFB3', '#F04E98'];
      for (let i = 0; i < 3; i++) {
        const w = s * widths[i] * 1.05;
        c.fillStyle = cols[i];
        roundRect(c, -w / 2, -s * 0.5 + i * s * 0.42, w, s * 0.24, 3);
        c.fill();
      }
    },
  },
  {
    label: 'Dj',
    draw: (c, s) => {
      c.fillStyle = '#092E20';
      roundRect(c, -s, -s, s * 2, s * 2, s * 0.28);
      c.fill();
      c.fillStyle = '#44B78B';
      c.font = `700 ${s * 0.65}px Georgia, serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('Dj', 0, 0);
    },
  },
  {
    label: 'Jotai',
    draw: (c, s) => {
      c.fillStyle = '#1a1a2e';
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = '#C0A0FF';
      c.lineWidth = s * 0.1;
      c.beginPath();
      c.arc(0, 0, s * 0.45, 0, Math.PI * 2);
      c.stroke();
      c.fillStyle = '#C0A0FF';
      c.beginPath();
      c.arc(0, 0, s * 0.14, 0, Math.PI * 2);
      c.fill();
    },
  },
  {
    label: 'Vite',
    draw: (c, s) => {
      const g = c.createLinearGradient(-s, -s, s, s);
      g.addColorStop(0, '#BD34FE');
      g.addColorStop(1, '#FF9416');
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(s * 0.1, -s * 0.95);
      c.lineTo(-s * 0.55, s * 0.1);
      c.lineTo(0, s * 0.1);
      c.lineTo(-s * 0.1, s * 0.95);
      c.lineTo(s * 0.55, -s * 0.1);
      c.lineTo(0, -s * 0.1);
      c.closePath();
      c.fill();
    },
  },
  {
    label: 'Fig',
    draw: (c, s) => {
      c.fillStyle = '#1E1E1E';
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.fill();
      const r = s * 0.32;
      const cols = ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE', '#0ACF83'];
      c.fillStyle = cols[0];
      c.beginPath();
      c.arc(-r * 0.55, -r, r, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = cols[1];
      c.beginPath();
      c.arc(-r * 0.55, r, r, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = cols[2];
      c.beginPath();
      c.arc(-r * 0.55, 0, r, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = cols[3];
      c.beginPath();
      c.arc(r * 0.55, 0, r, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = cols[4];
      c.beginPath();
      c.arc(-r * 0.55, -r, r, Math.PI, Math.PI * 2);
      c.fill();
    },
  },
];

type Particle = {
  tech: Tech;
  x: number;
  y: number;
  s: number;
  vx: number;
  vy: number;
  alpha: number;
  rot: number;
  rotV: number;
};

const PER_TECH = 3;

export const HeroCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeParticle = (tech: Tech): Particle => ({
      tech,
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 14 + 14,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      alpha: Math.random() * 0.16 + 0.1,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.0035,
    });

    const init = () => {
      resize();
      particles = TECHS.flatMap((t) =>
        Array.from({ length: PER_TECH }, () => makeParticle(t))
      );
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        p.tech.draw(ctx, p.s);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        const pad = p.s * 4;
        if (p.x < -pad) p.x = w + pad;
        else if (p.x > w + pad) p.x = -pad;
        if (p.y < -pad) p.y = h + pad;
        else if (p.y > h + pad) p.y = -pad;
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => resize();

    init();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden='true'
      className='absolute inset-0 z-1 h-full w-full'
    />
  );
};
