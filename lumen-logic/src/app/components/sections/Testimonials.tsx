'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const testimonials = [
  {
    id: 1,
    quote:
      "Lumen Studio delivered a site that felt like a film, not a browser tab. Our bounce rate dropped 60% the week it launched. Clients ask us who made it before they ask about the product.",
    author: 'Mara Chen',
    role: 'Creative Director',
    company: 'Axiom Brand Co.',
    initials: 'MC',
  },
  {
    id: 2,
    quote:
      "I've worked with expensive agencies that produce less. The shader work alone made our product feel like it belonged in the future. Our investors noticed before we even demoed the features.",
    author: 'Tobias Renner',
    role: 'Head of Digital',
    company: 'Parallax Systems',
    initials: 'TR',
  },
  {
    id: 3,
    quote:
      "They didn't just execute our brief — they interrogated it. What came back was something we'd never have thought to ask for. The web can feel like this? We didn't know that was possible.",
    author: 'Isla Moreno',
    role: 'VP of Brand',
    company: 'Crest Collective',
    initials: 'IM',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  // Animate the quote text in with a clip-path wipe
  const revealContent = useCallback(() => {
    if (!quoteRef.current || !authorRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }
    );
    gsap.fromTo(
      authorRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 }
    );
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(testimonials.length - 1, index));
      if (clamped === activeIndex) return;
      // Slide out current
      const direction = clamped > activeIndex ? -1 : 1;
      gsap.to(quoteRef.current, {
        x: direction * 80,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIndex(clamped);
          gsap.set(quoteRef.current, { x: -direction * 60, opacity: 0 });
          revealContent();
          gsap.to(quoteRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
        },
      });
      gsap.to(authorRef.current, { opacity: 0, duration: 0.2 });
    },
    [activeIndex, revealContent]
  );

  // Initial reveal on mount
  useGSAP(() => {
    gsap.fromTo(
      '.testimonials-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        onComplete: revealContent,
      }
    );
  }, { scope: sectionRef });

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragCurrentX.current = e.clientX;
    // Give the card a live drag offset feel
    const delta = e.clientX - dragStartX.current;
    gsap.to(trackRef.current, { x: delta * 0.25, duration: 0.1, ease: 'none' });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = dragCurrentX.current - dragStartX.current;
    // Snap track back
    gsap.to(trackRef.current, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.7)' });
    if (delta < -60) goTo(activeIndex + 1);
    else if (delta > 60) goTo(activeIndex - 1);
  };

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full text-white px-8 md:px-16 py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header Row */}
        <div className="testimonials-header flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 opacity-0">
          <div>
            <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mb-3">
              Client Voices
            </p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
              The{' '}
              <span className="italic font-serif text-zinc-400">verdict</span>
            </h2>
          </div>
          {/* Drag hint */}
          <div className="flex items-center gap-3 mt-6 md:mt-0 text-zinc-600 font-mono text-xs tracking-widest uppercase select-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            drag to explore
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M14 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* The Draggable Card */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`
            relative border border-zinc-800 p-10 md:p-16 rounded-2xl
            bg-white/[0.02] backdrop-blur-sm
            transition-colors duration-300
            ${isDragging ? 'cursor-grabbing border-zinc-600' : 'cursor-grab hover:border-zinc-700'}
            select-none
          `}
          style={{ touchAction: 'none' }}
        >
          {/* Large decorative quote mark */}
          <span
            className="absolute top-8 left-10 text-[8rem] leading-none text-zinc-800 font-serif select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </span>

          {/* Quote */}
          <p
            ref={quoteRef}
            className="relative z-10 text-2xl md:text-4xl font-light leading-snug tracking-tight text-zinc-100 max-w-4xl mt-8"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            {active.quote}
          </p>

          {/* Author */}
          <div
            ref={authorRef}
            className="flex items-center gap-4 mt-10 opacity-0"
          >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
              <span className="font-mono text-xs text-zinc-400">{active.initials}</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{active.author}</p>
              <p className="text-zinc-500 font-mono text-xs tracking-wider">
                {active.role} · {active.company}
              </p>
            </div>
          </div>

          {/* Progress indicator (top-right) */}
          <div className="absolute top-10 right-10 font-mono text-xs text-zinc-700 tracking-widest">
            {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </div>
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`
                  rounded-full transition-all duration-300
                  ${i === activeIndex
                    ? 'w-8 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }
                `}
              />
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
              className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:border-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === testimonials.length - 1}
              aria-label="Next testimonial"
              className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:border-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M14 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
