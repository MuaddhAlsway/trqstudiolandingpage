import { motion } from 'motion/react';
import { useState } from 'react';

export function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen flex items-center justify-center py-32 overflow-hidden">
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
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
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

      <div className="relative z-10 max-w-4xl mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — LET'S CREATE
          </div>

          <h2 className="text-[10vw] md:text-[6vw] font-light leading-[0.85] tracking-tighter text-white/90 mb-12">
            BEGIN THE
            <br />
            CONVERSATION.
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"
          />

          <p className="text-white/50 text-lg font-light tracking-wide max-w-2xl mx-auto">
            Share your vision with us. Let's craft something extraordinary together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-white/40 text-xs font-light tracking-widest mb-4">
                YOUR NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white/90 text-lg font-light focus:border-white/60 focus:outline-none transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-white/40 text-xs font-light tracking-widest mb-4">
                YOUR EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white/90 text-lg font-light focus:border-white/60 focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/40 text-xs font-light tracking-widest mb-4">
              YOUR VISION
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white/90 text-lg font-light focus:border-white/60 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project"
            />
          </div>

          <motion.div
            className="pt-8 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-16 py-6 border border-white/30 text-white/90 text-sm font-light tracking-[0.3em] hover:bg-white/5 transition-colors">
              SEND MESSAGE
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          <div>
            <div className="text-white/20 text-xs font-light tracking-widest mb-3">
              STUDIO
            </div>
            <div className="text-white/60 text-sm font-light">
              King Fahd Road
              <br />
              Riyadh, Saudi Arabia
            </div>
          </div>

          <div>
            <div className="text-white/20 text-xs font-light tracking-widest mb-3">
              CONTACT
            </div>
            <div className="text-white/60 text-sm font-light">
              hello@trqstudio.com
              <br />
              +966 11 234 5678
            </div>
          </div>

          <div>
            <div className="text-white/20 text-xs font-light tracking-widest mb-3">
              FOLLOW
            </div>
            <div className="text-white/60 text-sm font-light">
              Instagram / LinkedIn
              <br />
              Behance / Pinterest
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-20 text-center text-white/20 text-xs font-light tracking-widest"
        >
          © 2024 TRQ STUDIO. ALL RIGHTS RESERVED.
        </motion.div>
      </div>
    </div>
  );
}
