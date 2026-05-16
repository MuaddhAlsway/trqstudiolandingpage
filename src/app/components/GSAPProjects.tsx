import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export function GSAPProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    projectRefs.current.forEach((project, index) => {
      if (!project) return;

      const title = project.querySelector('.project-title');
      const details = project.querySelector('.project-details');
      const number = project.querySelector('.project-number');
      const line = project.querySelector('.project-line');

      gsap.set([title, details, number], { opacity: 0, x: -100 });
      gsap.set(line, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: project,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(number, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          });

          gsap.to(title, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.1,
            ease: 'power3.out',
          });

          gsap.to(details, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          });

          gsap.to(line, {
            scaleX: 1,
            duration: 1.5,
            delay: 0.3,
            ease: 'power2.out',
          });
        },
      });

      // Parallax effect
      gsap.to(project, {
        scrollTrigger: {
          trigger: project,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        ease: 'none',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(index);
    const project = projectRefs.current[index];
    if (!project) return;

    const title = project.querySelector('.project-title');
    const arrow = project.querySelector('.project-arrow');

    gsap.to(title, {
      x: 30,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.to(arrow, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(project, {
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const project = projectRefs.current[index];
    if (!project) return;

    const title = project.querySelector('.project-title');
    const arrow = project.querySelector('.project-arrow');

    gsap.to(title, {
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.to(arrow, {
      x: -20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(project, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — SELECTED WORKS
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            PROJECTS.
          </h2>
        </div>

        <div className="space-y-1">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="relative border-t border-white/10 py-12 cursor-pointer group"
            >
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-1">
                  <div className="project-number text-white/20 text-sm font-light">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="col-span-6">
                  <h3 className="project-title text-4xl md:text-5xl font-light tracking-tight text-white/90">
                    {project.title}
                  </h3>
                </div>

                <div className="col-span-5">
                  <div className="project-details flex items-center justify-between text-white/40 text-sm font-light">
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

              <div
                className="project-line absolute bottom-0 left-0 right-0 h-[1px] bg-white/30 origin-left"
              />

              <div
                className="project-arrow absolute right-8 top-1/2 -translate-y-1/2 opacity-0"
                style={{ transform: 'translateY(-50%) translateX(-20px)' }}
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
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <button className="px-12 py-6 border border-white/20 text-white/70 text-sm font-light tracking-[0.3em] hover:bg-white/5 transition-colors">
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </div>
  );
}
