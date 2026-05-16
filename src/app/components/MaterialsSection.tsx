import { useState } from 'react';
import { motion } from 'motion/react';

const materials = [
  {
    name: 'CONCRETE',
    description: 'Raw polished surfaces',
    properties: ['Brutalist', 'Monolithic', 'Timeless'],
  },
  {
    name: 'MARBLE',
    description: 'Black natural stone',
    properties: ['Luxury', 'Reflective', 'Organic'],
  },
  {
    name: 'STEEL',
    description: 'Brushed metal finishes',
    properties: ['Industrial', 'Modern', 'Structural'],
  },
  {
    name: 'GLASS',
    description: 'Smoked transparency',
    properties: ['Light', 'Fluid', 'Ethereal'],
  },
  {
    name: 'WOOD',
    description: 'Dark walnut grain',
    properties: ['Warm', 'Natural', 'Textured'],
  },
  {
    name: 'SHADOW',
    description: 'Negative space',
    properties: ['Void', 'Depth', 'Mystery'],
  },
];

export function MaterialsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative bg-[#111111] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — MATERIAL PALETTE
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            MATERIALS.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative aspect-square border border-white/10 bg-gradient-to-br from-white/5 to-transparent cursor-pointer group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/5"
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <motion.div
                    className="text-white/20 text-xs font-light tracking-widest mb-2"
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.5,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>

                  <motion.h3
                    className="text-3xl font-light tracking-tight text-white/90"
                    animate={{
                      y: activeIndex === index ? -10 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {material.name}
                  </motion.h3>
                </div>

                <div>
                  <motion.p
                    className="text-white/50 text-sm font-light mb-4"
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {material.description}
                  </motion.p>

                  <motion.div
                    className="flex gap-2 flex-wrap"
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {material.properties.map((prop, i) => (
                      <div
                        key={i}
                        className="text-white/30 text-xs border border-white/10 px-2 py-1"
                      >
                        {prop}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 border border-white/30"
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-white/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-white/40 text-sm font-light tracking-wide max-w-2xl mx-auto"
        >
          Each material is carefully selected to create tactile experiences
          that transcend visual aesthetics. We craft with intention.
        </motion.p>
      </div>
    </div>
  );
}
