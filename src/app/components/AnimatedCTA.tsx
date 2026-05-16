import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FloatingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, '#ffffff', '#ffffff']}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -5]}
    />
  );
}

export function AnimatedCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !formRef.current || !containerRef.current) return;

    const titleWords = titleRef.current.querySelectorAll('.word');

    gsap.set(titleWords, { opacity: 0, y: 100, rotationX: -90 });
    gsap.set(formRef.current, { opacity: 0, y: 60 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(titleWords, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
        });

        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.8,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: 'rgba(255, 255, 255, 0.6)',
      duration: 0.3,
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      duration: 0.3,
    });
  };

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] min-h-screen flex items-center justify-center py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <FloatingGrid />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 w-full">
        <div className="text-center mb-20">
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — LET'S CREATE
          </div>

          <h2
            ref={titleRef}
            className="text-[10vw] md:text-[6vw] font-light leading-[0.85] tracking-tighter text-white/90 mb-12"
            style={{ perspective: '1000px' }}
          >
            <div className="word inline-block">BEGIN</div>{' '}
            <div className="word inline-block">THE</div>
            <br />
            <div className="word inline-block">CONVERSATION.</div>
          </h2>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12" />

          <p className="text-white/50 text-lg font-light tracking-wide max-w-2xl mx-auto">
            Share your vision with us. Let's craft something extraordinary together.
          </p>
        </div>

        <div ref={formRef} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-white/40 text-xs font-light tracking-widest mb-4">
                YOUR NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white/90 text-lg font-light focus:outline-none transition-colors"
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
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white/90 text-lg font-light focus:outline-none transition-colors"
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              rows={6}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white/90 text-lg font-light focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project"
            />
          </div>

          <div className="pt-8 flex justify-center">
            <button
              className="px-16 py-6 border border-white/30 text-white/90 text-sm font-light tracking-[0.3em] hover:bg-white/5 transition-all hover:scale-105"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
              }}
            >
              SEND MESSAGE
            </button>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
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
        </div>

        <div className="mt-20 text-center text-white/20 text-xs font-light tracking-widest">
          © 2024 TRQ STUDIO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}
