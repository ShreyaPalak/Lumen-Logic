import Image from "next/image";
import ImmersiveHero from '@/app/components/sections/Hero';
import StoryScroll from '@/app/components/sections/StoryScroll';
import HorizontalGallery from '@/app/components/sections/HorizontalGallery';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ImmersiveHero />
      
      {/* Tagline Transition Section */}
      <section className="relative w-full py-32 bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mb-6">
          The Philosophy
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight max-w-4xl leading-tight mix-blend-difference">
          Where stories <span className="italic font-serif text-zinc-400">unfold</span> with every scroll.
        </h2>
      </section>

      <StoryScroll />
      
      {/* New Interactive Horizontal Showcase */}
      <HorizontalGallery />
      
      {/* Very basic footer spacing to allow the user to scroll past the gallery */}
      <footer className="h-[50vh] bg-black text-white flex items-center justify-center">
        <h2 className="text-2xl font-light tracking-widest uppercase text-zinc-600">The End</h2>
      </footer>
    </div>
  );
}
