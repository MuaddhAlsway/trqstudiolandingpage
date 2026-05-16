import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeBackground } from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.textContent?.split('') || [];
    titleRef.current.innerHTML = letters
      .map((letter, i) => `<span class="inline-block" style="opacity: 0; transform: translateY(100px)">${letter === ' ' ? '&nbsp;' : letter}</span>`)
      .join('');

    const spans = titleRef.current.querySelectorAll('span');

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
      delay: 0.5,
    });

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      scale: 0.5,
      rotation: 2,
      ease: 'none',
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-[#0A0A0A]">
      <ThreeBackground />

      <motion.div
        className="absolute inset-0"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(40, 40, 40, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(30, 30, 30, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(50, 50, 50, 0.2) 0%, transparent 60%)
            `,
            backgroundSize: '200% 200%',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <motion.div
        style={{ y }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="text-center"
        >
          <div className="text-white/30 text-sm font-light tracking-[0.5em] mb-8 overflow-hidden">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              RIYADH — JEDDAH — NEOM
            </motion.div>
          </div>

          <h1
            ref={titleRef}
            className="text-[15vw] md:text-[12vw] font-light leading-[0.85] tracking-tighter text-white/90 mb-6"
          >
            SPACE.
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-12"
            style={{ transformOrigin: 'center' }}
          />

          <div className="max-w-2xl mx-auto overflow-hidden">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="text-white/50 text-lg font-light tracking-wide leading-relaxed"
            >
              Crafting architectural narratives that transcend materiality.
              <br />
              Where structure meets silence.
            </motion.p>
          </div>

          <motion.div
            className="mt-16 flex items-center justify-center gap-12 text-white/40 text-xs font-light tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              EST. 2024
            </motion.div>
            <div className="w-px h-8 bg-white/20" />
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              LUXURY ARCHITECTURE
            </motion.div>
            <div className="w-px h-8 bg-white/20" />
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.6 }}
            >
              RIYADH
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
            <div className="text-white/30 text-xs tracking-widest">SCROLL</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-8 left-8 text-white/20 text-xs font-light tracking-wider"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          24°42'N 46°43'E
        </motion.div>

        <motion.div
          className="absolute top-8 right-8 text-white/20 text-xs font-light tracking-wider"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          TRQ STUDIO
        </motion.div>
      </motion.div>
    </div>
  );
}
