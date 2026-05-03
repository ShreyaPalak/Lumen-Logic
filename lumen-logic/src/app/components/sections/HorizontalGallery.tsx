'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Web Experience",
    img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Nebula Core",
    category: "Brand Identity",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Echo Interface",
    category: "Product Design",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Prism Engine",
    category: "WebGL / 3D",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // FIXED: Measure actual DOM elements instead of calculating widths
    // This automatically handles padding, gaps, responsive sizes, etc.
    const calculateScrollDistance = () => {
      const cards = container.querySelectorAll('[data-card]');
      if (cards.length === 0) return 0;

      const lastCard = cards[cards.length - 1];

      // How far does the last card extend beyond the viewport?
      // offsetLeft = distance from container's left edge
      // offsetWidth = card's actual rendered width (accounts for min-w)
      // window.innerWidth = viewport width
      const lastCardEnd = lastCard.offsetLeft + lastCard.offsetWidth;
      const scrollNeeded = lastCardEnd - window.innerWidth;

      // Return negative because we're translating the container LEFT
      return -scrollNeeded;
    };

    // Set up GSAP animation
    gsap.to(container, {
      x: calculateScrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        // Multiplier: how much vertical scroll = horizontal movement
        // Adjust the 1.5 value to make scrolling feel faster/slower
        end: () => {
          const distance = Math.abs(calculateScrollDistance());
          return `+=${distance * 1.5}`;
        },
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          // Recalculate on window resize
          gsap.set(container, { x: calculateScrollDistance });
        }
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden pt-[20vh]"
    >
      <div className="absolute top-16 left-8 md:left-16 z-10 text-white">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mix-blend-difference">
          Selected <span className="font-serif italic text-zinc-500">Works</span>
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap gap-8 px-8 md:px-32 h-[60vh] items-center"
        style={{ width: 'max-content' }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            data-card
            className="group relative w-[80vw] min-w-[80vw] md:w-[40vw] md:min-w-[40vw] h-[60vh] shrink-0 overflow-hidden cursor-pointer"
          >
            {/* Image Container with Parallax inner scale effect on hover */}
            <div className="w-full h-full overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/10 flex flex-col justify-end p-8 pointer-events-none">
              <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase mb-2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {project.category}
              </p>
              <h3 className="text-white text-3xl md:text-5xl font-semibold translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}