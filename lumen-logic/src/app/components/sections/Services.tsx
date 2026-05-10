'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const services = [
  {
    id: 1,
    index: '01',
    title: 'Immersive Scrollytelling',
    tagline: 'Narratives that move.',
    description:
      'We convert dense whitepapers, annual reports, and brand stories into interactive journeys. Readers don\'t scroll past—they live inside the content.',
    tags: ['GSAP', 'ScrollTrigger', 'WebGL', 'Next.js'],
    // Emitted to shader: slow organic waves + amber glow
    shaderEvent: { mode: 1, color: [1.0, 0.6, 0.15] },
  },
  {
    id: 2,
    index: '02',
    title: 'WebGL Environments',
    tagline: '3D that ships to the browser.',
    description:
      '60FPS product showcases, configurators, and interactive environments. No Unity. No app download. Just a URL that leaves an impression.',
    tags: ['Three.js', 'R3F', 'GLSL Shaders', 'Draco'],
    // Emitted to shader: tight geometric crystal + electric blue
    shaderEvent: { mode: 2, color: [0.0, 0.83, 1.0] },
  },
  {
    id: 3,
    index: '03',
    title: 'Motion Systems',
    tagline: 'Design languages in motion.',
    description:
      'GSAP-driven animation libraries baked into your design system. Every button, transition, and micro-interaction speaks the same kinetic language.',
    tags: ['GSAP', 'Framer Motion', 'Design Tokens', 'SaaS'],
    // Emitted to shader: fast velocity + electric lime
    shaderEvent: { mode: 3, color: [0.47, 1.0, 0.08] },
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  useGSAP(() => {
    // Animate section heading in on scroll
    gsap.fromTo(
      '.services-heading',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  const handleEnter = (service: typeof services[0]) => {
    setActiveService(service.id);
    // Dispatch to LiquidBackground via custom window event
    window.dispatchEvent(
      new CustomEvent('serviceHover', {
        detail: { mode: service.shaderEvent.mode, color: service.shaderEvent.color },
      })
    );
  };

  const handleLeave = () => {
    setActiveService(null);
    window.dispatchEvent(
      new CustomEvent('serviceHover', { detail: { mode: 0, color: [0, 0, 0] } })
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full text-white px-8 md:px-16 py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="services-heading flex items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mb-3">
              What We Build
            </p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
              The{' '}
              <span className="italic font-serif text-zinc-400">craft</span>
            </h2>
          </div>
          <p className="hidden md:block text-zinc-600 font-mono text-sm max-w-xs text-right leading-relaxed">
            Three specializations.<br />One obsession: making the web feel alive.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, i) => {
            const isActive = activeService === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => handleEnter(service)}
                onMouseLeave={handleLeave}
                className="group relative border-t border-zinc-800 last:border-b cursor-default"
              >
                <div
                  className={`
                    flex flex-col md:flex-row md:items-center gap-6 md:gap-0
                    py-10 md:py-12 transition-all duration-500
                    ${isActive ? 'pl-4 md:pl-8' : 'pl-0'}
                  `}
                >
                  {/* Index */}
                  <span
                    className={`
                      font-mono text-sm tracking-widest transition-colors duration-300
                      w-16 shrink-0
                      ${isActive ? 'text-white' : 'text-zinc-700'}
                    `}
                  >
                    {service.index}
                  </span>

                  {/* Title + Tagline */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`
                        text-3xl md:text-5xl font-light tracking-tight transition-colors duration-300
                        ${isActive ? 'text-white' : 'text-zinc-300'}
                      `}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`
                        text-zinc-500 font-mono text-sm mt-1 transition-opacity duration-300
                        ${isActive ? 'opacity-100' : 'opacity-0'}
                      `}
                    >
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description — slides in on hover */}
                  <div
                    className={`
                      md:w-72 lg:w-96 shrink-0 transition-all duration-500
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    `}
                  >
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-zinc-700 text-zinc-500 font-mono text-xs px-2 py-1 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`
                      hidden md:flex items-center justify-end w-16 shrink-0
                      transition-all duration-300
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                    `}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Active background highlight */}
                <div
                  className={`
                    absolute inset-0 bg-white/[0.02] transition-opacity duration-300 pointer-events-none
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
