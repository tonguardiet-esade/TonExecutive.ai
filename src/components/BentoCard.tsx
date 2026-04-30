import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import clsx from 'clsx';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltStrength?: number;
  delay?: number;
}

export default function BentoCard({
  children,
  className,
  glowColor = 'rgba(16, 185, 129, 0.25)',
  tiltStrength = 12,
  delay = 0,
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltStrength, tiltStrength]);

  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-white/10',
        'bg-white/[0.04] backdrop-blur-xl',
        'transition-shadow duration-300',
        hovered && 'shadow-2xl',
        className
      )}
    >
      {/* Cursor-following glow */}
      {hovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
          style={{
            background: `radial-gradient(320px circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Animated border gradient */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          hovered && 'opacity-100'
        )}
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, transparent 50%, rgba(16,185,129,0.1) 100%)',
        }}
      />

      <div style={{ transform: 'translateZ(20px)' }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
