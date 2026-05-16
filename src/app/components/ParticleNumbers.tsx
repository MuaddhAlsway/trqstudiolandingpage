import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 450000, suffix: 'm²', label: 'BUILT AREA' },
  { value: 47, suffix: '', label: 'PROJECTS COMPLETED' },
  { value: 12, suffix: '', label: 'CITIES' },
  { value: 8, suffix: '', label: 'AWARDS' },
];

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 1000;

  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!inView) return;

    gsap.to(countRef.current, {
      value: value,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.floor(countRef.current.value));
      },
    });
  }, [value, inView]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ParticleNumbers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => setInView(true),
    });

    statRefs.current.forEach((stat, index) => {
      if (!stat) return;

      gsap.set(stat, { opacity: 0, y: 80, scale: 0.8 });

      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(stat, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="mb-24 text-center">
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — BY THE NUMBERS
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            IMPACT.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statRefs.current[index] = el)}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white/90">
                  <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>

                <div
                  className="absolute -top-4 -right-4 w-16 h-16 border border-white/10"
                  style={{
                    animation: `rotate-${index} 20s linear infinite`,
                  }}
                />
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

              <div className="text-white/40 text-sm font-light tracking-[0.3em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rotate-0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate-1 { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
        @keyframes rotate-2 { from { transform: rotate(90deg); } to { transform: rotate(450deg); } }
        @keyframes rotate-3 { from { transform: rotate(135deg); } to { transform: rotate(495deg); } }
      `}</style>
    </div>
  );
}
