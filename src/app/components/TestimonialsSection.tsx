import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'TRQ Studio transformed our vision into a reality that exceeded every expectation. Their attention to spatial poetry is unmatched.',
    author: 'KHALID AL-MANSOUR',
    role: 'CEO, Mansour Development',
    project: 'Riyadh Tower',
  },
  {
    quote:
      'Working with TRQ was like collaborating with artists who speak the language of light and space. Pure architectural brilliance.',
    author: 'SARA ABDULLAH',
    role: 'Founder, Red Sea Hospitality',
    project: 'Red Sea Pavilion',
  },
  {
    quote:
      "They don't just design buildings. They craft experiences. Every corner, every shadow tells a story.",
    author: 'MOHAMMED BIN FAISAL',
    role: 'Director, NEOM Projects',
    project: 'NEOM Residence',
  },
];

export function TestimonialsSection() {
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    testimonialRefs.current.forEach((testimonial, index) => {
      if (!testimonial) return;

      const quote = testimonial.querySelector('.quote-text');
      const openQuote = testimonial.querySelector('.open-quote');
      const closeQuote = testimonial.querySelector('.close-quote');
      const author = testimonial.querySelector('.author-info');

      gsap.set([openQuote, quote, closeQuote, author], { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: testimonial,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(openQuote, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });

          gsap.to(quote, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
          });

          gsap.to(closeQuote, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
          });

          gsap.to(author, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
          });
        },
      });

      // Parallax effect on quote
      gsap.to(quote, {
        scrollTrigger: {
          trigger: testimonial,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -30,
        ease: 'none',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#111111] py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <div className="text-white/20 text-sm font-light tracking-[0.3em] mb-8">
            — CLIENT VOICES
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-light leading-[0.9] tracking-tighter text-white/90">
            VOICES.
          </h2>
        </div>

        <div className="space-y-32">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                  <div className="open-quote text-white/20 text-6xl md:text-8xl font-light mb-6">
                    "
                  </div>

                  <p className="quote-text text-2xl md:text-3xl font-light leading-relaxed text-white/80 tracking-tight">
                    {testimonial.quote}
                  </p>

                  <div className="close-quote text-white/20 text-6xl md:text-8xl font-light mt-6 text-right">
                    "
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-end">
                  <div className="author-info border-l border-white/20 pl-8">
                    <div className="text-white/70 text-lg font-light tracking-tight mb-2">
                      {testimonial.author}
                    </div>
                    <div className="text-white/40 text-sm font-light mb-1">
                      {testimonial.role}
                    </div>
                    <div className="text-white/20 text-xs font-light tracking-widest mt-4">
                      {testimonial.project}
                    </div>
                  </div>
                </div>
              </div>

              {index < testimonials.length - 1 && (
                <div className="h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent mt-16" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
