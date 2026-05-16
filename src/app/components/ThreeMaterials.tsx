import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    name: 'CONCRETE',
    description: 'Raw polished surfaces',
    properties: ['Brutalist', 'Monolithic', 'Timeless'],
    color: '#3a3a3a',
  },
  {
    name: 'MARBLE',
    description: 'Black natural stone',
    properties: ['Luxury', 'Reflective', 'Organic'],
    color: '#2a2a2a',
  },
  {
    name: 'STEEL',
    description: 'Brushed metal finishes',
    properties: ['Industrial', 'Modern', 'Structural'],
    color: '#4a4a4a',
  },
  {
    name: 'GLASS',
    description: 'Smoked transparency',
    properties: ['Light', 'Fluid', 'Ethereal'],
    color: '#2f2f2f',
  },
  {
    name: 'WOOD',
    description: 'Dark walnut grain',
    properties: ['Warm', 'Natural', 'Textured'],
    color: '#342820',
  },
  {
    name: 'SHADOW',
    description: 'Negative space',
    properties: ['Void', 'Depth', 'Mystery'],
    color: '#1a1a1a',
  },
];

function MaterialSphere({ color, isHovered }: { color: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isHovered ? 0.6 : 0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export function ThreeMaterials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.set(card, { opacity: 0, scale: 0.8, rotationY: -30 });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.1,
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
    <div className="relative bg-[#111111] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — MATERIAL PALETTE
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            MATERIALS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {materials.map((material, index) => (
            <div
              key={material.name}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative aspect-square border border-white/10 bg-gradient-to-br from-white/5 to-transparent cursor-pointer group overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 opacity-30">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <MaterialSphere color={material.color} isHovered={activeIndex === index} />
                </Canvas>
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div>
                  <div className="text-white/20 text-xs font-light tracking-widest mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-3xl font-light tracking-tight text-white/90">
                    {material.name}
                  </h3>
                </div>

                <div>
                  <p className="text-white/50 text-sm font-light mb-4 transition-all duration-300"
                     style={{
                       opacity: activeIndex === index ? 1 : 0,
                       transform: activeIndex === index ? 'translateY(0)' : 'translateY(10px)',
                     }}>
                    {material.description}
                  </p>

                  <div className="flex gap-2 flex-wrap transition-all duration-300"
                       style={{
                         opacity: activeIndex === index ? 1 : 0,
                         transform: activeIndex === index ? 'translateY(0)' : 'translateY(10px)',
                       }}>
                    {material.properties.map((prop, i) => (
                      <div
                        key={i}
                        className="text-white/30 text-xs border border-white/10 px-2 py-1"
                      >
                        {prop}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 border border-white/30 transition-opacity duration-300"
                style={{ opacity: activeIndex === index ? 1 : 0 }}
              />
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-white/40 text-sm font-light tracking-wide max-w-2xl mx-auto">
          Each material is carefully selected to create tactile experiences
          that transcend visual aesthetics. We craft with intention.
        </p>
      </div>
    </div>
  );
}
