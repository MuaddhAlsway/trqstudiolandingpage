import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title letters
    if (titleRef.current) {
      const letters = titleRef.current.textContent?.split('') || [];
      titleRef.current.innerHTML = letters
        .map((letter, i) => `<span class="inline-block" style="opacity: 0; transform: translateY(100px) rotateX(-90deg)">${letter === ' ' ? '&nbsp;' : letter}</span>`)
        .join('');

      const spans = titleRef.current.querySelectorAll('span');

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Glitch effect
      gsap.to(titleRef.current, {
        x: () => (Math.random() - 0.5) * 10,
        duration: 0.1,
        repeat: 8,
        yoyo: true,
        delay: 1.5,
        onComplete: () => {
          gsap.to(titleRef.current, { x: 0, duration: 0.2 });
        },
      });
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Aggressive exit animation
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              scale: 1.2,
              opacity: 0,
              duration: 0.8,
              ease: 'power4.in',
              onComplete,
            });
          }
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center"
      style={{ pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="relative"
        >
          <h1 ref={titleRef} className="text-[20vw] font-light tracking-tighter text-white/90" style={{ perspective: '1000px' }}>
            TRQ
          </h1>

          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mt-12 w-[300px]"
          style={{ transformOrigin: 'left' }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-white/40 text-sm font-light tracking-[0.3em]"
        >
          ARCHITECTURE STUDIO
        </motion.div>

        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 border border-white/10"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 45, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.3 }}
        />

        <motion.div
          className="absolute -bottom-10 -left-10 w-24 h-24 border border-white/10"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: -45, opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20">
          <div className="text-white/30 text-xs font-light tracking-wider">
            {progress.toFixed(0)}%
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
