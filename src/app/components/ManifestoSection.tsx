import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0.3]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] py-48">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          style={{ opacity: opacity1 }}
          className="mb-48"
        >
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — PHILOSOPHY
          </div>
          <h2 className="text-[8vw] md:text-[6vw] font-light leading-[0.9] tracking-tighter text-white/90">
            STRUCTURE.
          </h2>
          <div className="mt-12 max-w-2xl">
            <p className="text-white/60 text-xl font-light leading-relaxed">
              We believe architecture is not about filling space, but about creating it.
              Every line drawn is a meditation. Every form, a conversation with light.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: opacity2 }}
          className="mb-48 flex justify-end"
        >
          <div className="max-w-2xl">
            <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8 text-right">
              — APPROACH
            </div>
            <h2 className="text-[8vw] md:text-[6vw] font-light leading-[0.9] tracking-tighter text-white/90 text-right">
              SILENCE.
            </h2>
            <div className="mt-12">
              <p className="text-white/60 text-xl font-light leading-relaxed text-right">
                In the quiet spaces between walls, we discover possibility.
                Our work speaks through absence as much as presence.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: opacity3 }}
          className="mb-24"
        >
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — VISION
          </div>
          <h2 className="text-[8vw] md:text-[6vw] font-light leading-[0.9] tracking-tighter text-white/90">
            FORM.
          </h2>
          <div className="mt-12 max-w-2xl">
            <p className="text-white/60 text-xl font-light leading-relaxed">
              We craft spaces that breathe. Structures that stand as monuments to restraint.
              Luxury defined not by excess, but by perfect precision.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-32"
        />
      </div>
    </div>
  );
}
