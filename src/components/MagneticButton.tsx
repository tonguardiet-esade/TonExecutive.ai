import { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import clsx from 'clsx';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.35,
  as = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Tag = as === 'a' ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        style={{ x, y }}
        onClick={onClick}
        className={clsx(
          'relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-semibold transition-all duration-300',
          'before:absolute before:inset-0 before:rounded-full before:opacity-0 before:transition-opacity before:duration-300',
          hovered && 'before:opacity-100 scale-105',
          className
        )}
        whileTap={{ scale: 0.95 }}
      >
        {/* Shimmer sweep on hover */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={hovered ? {
            background: [
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
              'linear-gradient(105deg, transparent 60%, rgba(255,255,255,0.15) 70%, transparent 80%)',
            ]
          } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {children}
      </Tag>
    </div>
  );
}
