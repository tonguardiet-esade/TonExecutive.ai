import { motion } from 'motion/react';
import clsx from 'clsx';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  delay?: number;
}

export default function AnimatedGradientText({
  children,
  className,
  as: Tag = 'h1',
  delay = 0,
}: AnimatedGradientTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag
        className={clsx(
          'font-black tracking-tighter leading-[0.92]',
          'bg-clip-text text-transparent',
          className
        )}
        style={{
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1fae5 30%, #10b981 55%, #6ee7b7 75%, #ffffff 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 6s ease infinite',
        }}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
