import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Work = {
  title: string;
  hueDeg: number;
};

// TODO: replace these with real projects — `title` shows up in the list view
// (HomePage.tsx) and `hueDeg` seeds the gradient texture on each spiral tile.
const WORKS: Work[] = [
  { title: 'Aurora', hueDeg: 48 },
  { title: 'Helix', hueDeg: 160 },
  { title: 'Cobalt', hueDeg: 220 },
  { title: 'Saffron', hueDeg: 30 },
  { title: 'Quartz', hueDeg: 280 },
  { title: 'Sable', hueDeg: 200 },
  { title: 'Ember', hueDeg: 12 },
  { title: 'Mira', hueDeg: 320 },
  { title: 'Drift', hueDeg: 180 },
  { title: 'Vellum', hueDeg: 60 },
  { title: 'Onyx', hueDeg: 240 },
  { title: 'Lumen', hueDeg: 100 },
];

const makeGradientTexture = (hueDeg: number): THREE.CanvasTexture => {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 512, 320);
  g.addColorStop(0, `hsl(${hueDeg}, 70%, 65%)`);
  g.addColorStop(0.5, `hsl(${(hueDeg + 30) % 360}, 60%, 50%)`);
  g.addColorStop(1, `hsl(${(hueDeg + 60) % 360}, 50%, 30%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 320);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, 488, 296);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

type Props = {
  active: boolean;
};

// Renders a rotating helix of textured planes via three.js.
//
// Helix math: for each tile i ∈ [0, COUNT)
//   t = i / COUNT          → normalized position [0, 1)
//   θ = t · 2π · TURNS     → angle around the Y axis
//   y = (t − 0.5) · HEIGHT → vertical position centered at 0
//   x = cos(θ) · RADIUS, z = sin(θ) · RADIUS
// Each tile then `lookAt`s the central column at its own y, so the planes
// always face inward. The whole group rotates on the Y axis with a constant
// drift; the pointer's screen-space offset nudges the rotation targets so
// the spiral feels alive without dragging.
export const SpiralCanvas = ({ active }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.classList.add('portfolio-webgl');

    const group = new THREE.Group();
    scene.add(group);

    const planeGeometry = new THREE.PlaneGeometry(1.6, 1, 1, 1);
    const textures: THREE.Texture[] = [];

    const COUNT = 24;
    const TURNS = 2; // ← number of full revolutions across the helix
    const RADIUS = 3.4;
    const HEIGHT = 6;
    for (let i = 0; i < COUNT; i++) {
      const work = WORKS[i % WORKS.length];
      const tex = makeGradientTexture(work.hueDeg);
      textures.push(tex);
      const material = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(planeGeometry, material);
      const t = i / COUNT;
      const theta = t * Math.PI * 2 * TURNS;
      mesh.position.set(
        Math.cos(theta) * RADIUS,
        (t - 0.5) * HEIGHT,
        Math.sin(theta) * RADIUS
      );
      mesh.lookAt(0, mesh.position.y, 0);
      group.add(mesh);
    }

    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener('pointermove', onPointerMove);

    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      targetRotationY += dt * 0.18 + pointerX * dt * 0.4;
      targetRotationX += (pointerY * 0.3 - targetRotationX) * 0.05;
      group.rotation.y = targetRotationY;
      group.rotation.x = targetRotationX;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      planeGeometry.dispose();
      textures.forEach((t) => t.dispose());
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          (obj.material as THREE.Material).dispose();
        }
      });
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='portfolio-webgl'
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 400ms ease',
        pointerEvents: active ? 'auto' : 'none',
      }}
    />
  );
};
