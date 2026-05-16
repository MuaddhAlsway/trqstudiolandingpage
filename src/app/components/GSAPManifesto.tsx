import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GSAPManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = [section1Ref.current, section2Ref.current, section3Ref.current];

    sections.forEach((section, index) => {
      if (!section) return;

      const title = section.querySelector('h2');
      const text = section.querySelector('p');
      const label = section.querySelector('.label');

      gsap.set([title, text, label], { opacity: 0, y: 100 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(label, { opacity: progress, y: 100 - progress * 100, duration: 0.3 });
          gsap.to(title, { opacity: progress, y: 100 - progress * 100, duration: 0.3 });
          gsap.to(text, { opacity: progress, y: 100 - progress * 100, duration: 0.3, delay: 0.1 });
        },
      });

      if (title) {
        const letters = title.textContent?.split('') || [];
        title.innerHTML = letters
          .map((letter) => `<span class="inline-block">${letter === ' ' ? '&nbsp;' : letter}</span>`)
          .join('');

        const spans = title.querySelectorAll('span');

        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              spans,
              { opacity: 0, y: 50, rotationX: -90 },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                stagger: 0.03,
                ease: 'power4.out',
              }
            );
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] py-48">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={section1Ref} className="mb-48">
          <div className="label text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — PHILOSOPHY
          </div>
          <h2 className="text-[8vw] md:text-[6vw] font-light leading-[0.9] tracking-tighter text-white/90">
            STRUCTURE.
          </h2>
          <div className="mt-12 max-w-2xl">
            <p className="text-white/60 text-xl font-light leading-relaxed">
              We believe architecture is not about filling space, but about creating it.
              Every line drawn is a meditation. Every form, a conversation with light.
            </p>
          </div>
        </div>

        <div ref={section2Ref} className="mb-48 flex justify-end">
          <div className="max-w-2xl">
            <div className="label text-white/20 text-sm font-light tracking-[0.3em] mb-8 text-right">
              — APPROACH
            </div>
            <h2 className="text-[8vw] md:text-[6vw] font-light leading-[0.9] tracking-tighter text-white/90 text-right">
              SILENCE.
            </h2>
            <div className="mt-12">
              <p className="text-white/60 text-xl font-light leading-relaxed text-right">
                In the quiet spaces between walls, we discover possibility.
                Our work speaks through absence as much as presence.
              </p>
            </div>
          </div>
        </div>

        <div ref={section3Ref} className="mb-24">
          <div className="label text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — VISION
          </div>
          <h2 className="text-[8vw] md:text-[6vw] font-light leading-[0.9] tracking-tighter text-white/90">
            FORM.
          </h2>
          <div className="mt-12 max-w-2xl">
            <p className="text-white/60 text-xl font-light leading-relaxed">
              We craft spaces that breathe. Structures that stand as monuments to restraint.
              Luxury defined not by excess, but by perfect precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
