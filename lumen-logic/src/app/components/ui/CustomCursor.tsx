'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Create highly optimized animation functions
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    // Track mouse movement
    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Optional: Add hover logic for "magnetic" buttons
    const interactiveElements = document.querySelectorAll('a, button, .magnetic');
    
    const onEnter = () => gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "back.out(1.7)" });
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Fixed positioning, mix-blend for the Vogue feel, and pointer-events-none so it doesn't block clicks!
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    />
  );
}