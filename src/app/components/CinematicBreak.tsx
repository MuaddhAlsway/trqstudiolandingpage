import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRings() {
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rings.current) {
      rings.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      rings.current.children.forEach((ring, i) => {
        ring.rotation.x = Math.sin(state.clock.getElapsedTime() + i) * 0.2;
        ring.rotation.y = Math.cos(state.clock.getElapsedTime() + i) * 0.2;
      });
    }
  });

  return (
    <group ref={rings}>
      {[4, 6, 8, 10].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.1 - i * 0.02}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export function CinematicBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    const letters = titleRef.current.textContent?.split('') || [];
    titleRef.current.innerHTML = letters
      .map((letter) => `<span class="inline-block">${letter === ' ' ? '&nbsp;' : letter}</span>`)
      .join('');

    const spans = titleRef.current.querySelectorAll('span');

    gsap.set(spans, { opacity: 0, scale: 0, rotationY: 90 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(spans, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          stagger: 0.08,
          ease: 'power4.out',
        });
      },
    });

    // Breathing animation
    gsap.to(titleRef.current, {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedRings />
        </Canvas>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.8) 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center px-8">
        <div
          ref={titleRef}
          className="text-[12vw] md:text-[8vw] font-light leading-[0.85] tracking-tighter text-white/90 mb-12"
          style={{ perspective: '1000px' }}
        >
          LIGHT.
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12 max-w-md mx-auto" />

        <p className="text-white/40 text-lg font-light tracking-wide max-w-2xl mx-auto">
          Between shadow and illumination, we find our truth.
        </p>
      </div>
    </div>
  );
}
