import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  hue: number;
  depth: number;
}

export default function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const orbsRef = useRef<Orb[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // Initialize orbs with depth layers
    orbsRef.current = Array.from({ length: 7 }, (_, i) => {
      const depth = 0.3 + Math.random() * 0.7;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4 * depth,
        vy: (Math.random() - 0.5) * 0.4 * depth,
        radius: (80 + Math.random() * 160) * depth,
        baseRadius: (80 + Math.random() * 160) * depth,
        opacity: 0.12 + Math.random() * 0.18,
        hue: 155 + Math.random() * 30, // emerald range 155-185
        depth,
      };
    });

    const ATTRACTION_RADIUS = 320;
    const ATTRACTION_FORCE = 0.018;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of orbsRef.current) {
        // Mouse attraction
        const dx = mouse.current.x - orb.x;
        const dy = mouse.current.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACTION_RADIUS) {
          const force = (1 - dist / ATTRACTION_RADIUS) * ATTRACTION_FORCE * orb.depth;
          orb.vx += dx * force;
          orb.vy += dy * force;
        }

        // Friction
        orb.vx *= 0.98;
        orb.vy *= 0.98;

        // Clamp speed
        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
        if (speed > 2) {
          orb.vx = (orb.vx / speed) * 2;
          orb.vy = (orb.vy / speed) * 2;
        }

        orb.x += orb.vx;
        orb.y += orb.vy;

        // Soft boundary bounce
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Draw orb with radial gradient
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `hsla(${orb.hue}, 85%, 52%, ${orb.opacity * 1.4})`);
        grad.addColorStop(0.4, `hsla(${orb.hue}, 75%, 45%, ${orb.opacity * 0.8})`);
        grad.addColorStop(1, `hsla(${orb.hue}, 70%, 35%, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
}
