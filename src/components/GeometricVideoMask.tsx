import { useRef } from 'react';
import { motion } from 'motion/react';

interface GeometricVideoMaskProps {
  videoSrc: string;
  posterSrc?: string;
}

const MASK_ID = 'hex-video-mask';

export default function GeometricVideoMask({ videoSrc, posterSrc }: GeometricVideoMaskProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">
      {/* SVG defs for clip path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={MASK_ID} clipPathUnits="objectBoundingBox">
            {/* Asymmetric polygon — not a boring hex, more editorial */}
            <polygon points="
              0.15,0.02
              0.88,0.00
              1.00,0.18
              0.97,0.82
              0.82,1.00
              0.05,0.98
              0.00,0.75
              0.03,0.22
            " />
          </clipPath>
        </defs>
      </svg>

      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-[40%] pointer-events-none"
        style={{
          width: '105%',
          height: '105%',
          background: 'radial-gradient(ellipse at 60% 40%, rgba(16,185,129,0.35) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating border accent */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '102%',
          height: '102%',
          clipPath: 'polygon(15% 2%, 88% 0%, 100% 18%, 97% 82%, 82% 100%, 5% 98%, 0% 75%, 3% 22%)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.7) 0%, transparent 40%, rgba(52,211,153,0.4) 100%)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Video with clip mask */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '100%',
          height: '100%',
          clipPath: 'polygon(15% 2%, 88% 0%, 100% 18%, 97% 82%, 82% 100%, 5% 98%, 0% 75%, 3% 22%)',
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
          style={{ transform: 'scale(1.04)' }}
        />
        {/* Inner color grading overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color"
          style={{ background: 'rgba(16,185,129,0.08)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(9,9,11,0.6) 100%)',
          }}
        />
      </div>

      {/* Floating accent dots */}
      {[
        { top: '8%', left: '-6%', size: 10, delay: 0 },
        { top: '80%', right: '-4%', size: 7, delay: 1.2 },
        { top: '45%', left: '-10%', size: 5, delay: 0.6 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-emerald-400/80 pointer-events-none"
          style={{ width: dot.size, height: dot.size, ...dot } as React.CSSProperties}
          animate={{ y: [-6, 6, -6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: dot.delay }}
        />
      ))}
    </div>
  );
}
