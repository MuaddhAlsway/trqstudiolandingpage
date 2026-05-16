import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  { value: 450000, suffix: 'm²', label: 'BUILT AREA' },
  { value: 47, suffix: '', label: 'PROJECTS COMPLETED' },
  { value: 12, suffix: '', label: 'CITIES' },
  { value: 8, suffix: '', label: 'AWARDS' },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function NumbersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative bg-[#0A0A0A] py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24 text-center"
        >
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — BY THE NUMBERS
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            IMPACT.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white/90">
                  <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>

                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 border border-white/10"
                  animate={{
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * 0.5,
                  }}
                />
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

              <div className="text-white/40 text-sm font-light tracking-[0.3em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-32"
        />
      </div>
    </div>
  );
}
