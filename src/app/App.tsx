import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedHero } from './components/AnimatedHero';
import { GSAPManifesto } from './components/GSAPManifesto';
import { GSAPProjects } from './components/GSAPProjects';
import { ThreeMaterials } from './components/ThreeMaterials';
import { ParticleNumbers } from './components/ParticleNumbers';
import { CinematicBreak } from './components/CinematicBreak';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AnimatedCTA } from './components/AnimatedCTA';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  return (
    <div className="relative bg-[#0A0A0A] text-white antialiased cursor-none">
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        <AnimatedHero />
        <GSAPManifesto />
        <GSAPProjects />
        <ThreeMaterials />
        <ParticleNumbers />
        <CinematicBreak />
        <TestimonialsSection />
        <AnimatedCTA />
      </div>
    </div>
  );
}