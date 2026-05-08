'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

// Register ScrollTrigger exactly once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImmersiveHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // 2. Initial Text Reveal Animation (The "Load" state)
    // Assuming text is split into lines wrapping in overflow-hidden divs
    gsap.fromTo(
      '.hero-line',
      { y: '110%', rotate: 2 },
      {
        y: '0%',
        rotate: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2,
      }
    );
    gsap.to(".line-1", {
      x: -100, // Moves left
      scrollTrigger: {
        scrub: true,
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top"
      }
    });

    gsap.to(".line-2", {
      x: 100, // Moves right
      scrollTrigger: {
        scrub: true,
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top"
      }
    });

    // 3. Image Scaling Scrollytelling (Parallax Effect)
    // Image grows in scale as the user scrolls down
    gsap.to(imageRef.current, {
      scale: 1.3,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top', // Animation ends when the bottom of the hero hits the top of viewport
        scrub: true, // Ties the animation strictly to the scrollbar
      },
    });

    // Cleanup Lenis on unmount
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent text-[#f4f4f4]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Cinematic abstract texture"
          className="w-full h-full object-cover transform origin-center opacity-40 mix-blend-luminosity"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Kinetic Typography Foreground */}
      <div
        ref={textWrapperRef}
        className="relative z-10 flex flex-col items-center justify-center h-full mix-blend-difference"
      >
        {/* We use an overflow-hidden wrapper so the text "slides up" from nothing */}
        <div className="overflow-hidden">
          <h1 className="hero-line line-1 text-[8vw] leading-[0.85] font-black uppercase tracking-tighter m-0">
            Lumen
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line line-2 text-[8vw] leading-[0.85] font-black uppercase tracking-tighter m-0">
            Logic
          </h1>
        </div>
      </div>
    </section>
  );
}