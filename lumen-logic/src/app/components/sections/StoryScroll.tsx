'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stories = [
  {
    id: "01",
    title: "The Spark",
    text: "Every great narrative begins with a single, undeniable thought. A flicker in the dark that refuses to be ignored.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" // Reusing the abstract vibe
  },
  {
    id: "02",
    title: "The Descent",
    text: "Diving deeper into the details. The journey gets complex, colors blend, and the structure starts to take its true form.",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "The Climax",
    text: "Where everything converges. The visual and the interactive become one seamless experience that leaves a lasting impression.",
    img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const storyRows = gsap.utils.toArray('.story-row') as HTMLElement[];

    storyRows.forEach((row) => {
      const img = row.querySelector('.story-img');
      const content = row.querySelector('.story-content');

      // Animate image
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        }
      );

      // Animate text content
      gsap.fromTo(
        content,
        { opacity: 0, x: row.classList.contains('md:flex-row-reverse') ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2, // Slight delay after image
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent text-white py-32 px-8 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-48">
        {stories.map((story, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={story.id}
              className={`story-row flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              {/* Image Side */}
              <div className="story-img w-full md:w-1/2 aspect-[4/3] relative rounded-2xl overflow-hidden shrink-0">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  src={story.img}
                  alt={story.title}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 hover:bg-transparent" />
              </div>

              {/* Text Side */}
              <div className="story-content w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-zinc-500 font-mono text-sm mb-4 tracking-widest uppercase">
                  Chapter {story.id}
                </span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
                  {story.title}
                </h2>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-lg leading-relaxed">
                  {story.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
