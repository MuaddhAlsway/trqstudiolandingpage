import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'NEOM RESIDENCE',
    location: 'NEOM, Saudi Arabia',
    year: '2024',
    type: 'Private Villa',
    area: '2,400 m²',
  },
  {
    id: 2,
    title: 'RIYADH TOWER',
    location: 'Riyadh, Saudi Arabia',
    year: '2023',
    type: 'Mixed-Use',
    area: '45,000 m²',
  },
  {
    id: 3,
    title: 'DESERT SANCTUARY',
    location: 'Empty Quarter',
    year: '2024',
    type: 'Cultural Center',
    area: '8,500 m²',
  },
  {
    id: 4,
    title: 'RED SEA PAVILION',
    location: 'Red Sea Project',
    year: '2023',
    type: 'Hospitality',
    area: '12,000 m²',
  },
];

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — SELECTED WORKS
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            PROJECTS.
          </h2>
        </motion.div>

        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative border-t border-white/10 py-12 cursor-pointer group"
            >
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-1">
                  <div className="text-white/20 text-sm font-light">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="col-span-6">
                  <motion.h3
                    className="text-4xl md:text-5xl font-light tracking-tight text-white/90"
                    animate={{
                      x: hoveredIndex === index ? 20 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {project.title}
                  </motion.h3>
                </div>

                <div className="col-span-5">
                  <div className="flex items-center justify-between text-white/40 text-sm font-light">
                    <div>
                      <div className="mb-2">{project.location}</div>
                      <div className="text-white/20">{project.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">{project.year}</div>
                      <div className="text-white/20">{project.area}</div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: 'left' }}
              />

              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  x: hoveredIndex === index ? 0 : -20,
                }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white/60"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-32 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 border border-white/20 text-white/70 text-sm font-light tracking-[0.3em] hover:bg-white/5 transition-colors"
          >
            VIEW ALL PROJECTS
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
