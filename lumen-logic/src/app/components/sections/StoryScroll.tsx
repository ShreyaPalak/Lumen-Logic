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
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We want the left side (images) to be pinned while the right side scrolls.
    // Instead of pinning the left side, it's often easier to pin a specific container 
    // OR we can just use ScrollTrigger on the text sections to fade them in and out.

    const texts = gsap.utils.toArray('.story-text') as HTMLElement[];
    const images = gsap.utils.toArray('.story-image') as HTMLElement[];

    // Set initial states for images (except the first one)
    gsap.set(images.slice(1), { opacity: 0, scale: 1.1 });

    texts.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        start: "top center",
        end: "bottom center",
        // markers: true, // Uncomment for debugging
        onEnter: () => {
          gsap.to(text, { opacity: 1, duration: 0.5 });
          // Crossfade images
          if (images[i]) {
            gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.8, overwrite: true }); // hide all
            gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8 }); // show current
          }
        },
        onEnterBack: () => {
          gsap.to(text, { opacity: 1, duration: 0.5 });
          if (images[i]) {
            gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.8, overwrite: true });
            gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8 });
          }
        },
        onLeave: () => {
          gsap.to(text, { opacity: 0.2, duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to(text, { opacity: 0.2, duration: 0.5 });
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent text-white px-8 md:px-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">

        {/* Left Side: Pinned Images Container */}
        <div
          ref={leftRef}
          className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full aspect-[4/5] md:aspect-square max-w-md rounded-2xl overflow-hidden">
            {stories.map((story, i) => (
              <img
                key={story.id}
                className="story-image absolute inset-0 w-full h-full object-cover"
                src={story.img}
                alt={story.title}
              />
            ))}
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          </div>
        </div>

        {/* Right Side: Scrolling Text */}
        <div
          ref={rightRef}
          className="w-full md:w-1/2 flex flex-col py-[50vh]"
        >
          {stories.map((story, i) => (
            <div
              key={story.id}
              className="story-text min-h-screen flex flex-col justify-center opacity-20"
            >
              <span className="text-zinc-500 font-mono text-sm mb-4 tracking-widest uppercase">
                Chapter {story.id}
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                {story.title}
              </h2>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-lg leading-relaxed">
                {story.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
