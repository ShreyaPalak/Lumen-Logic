import Image from "next/image";
import ImmersiveHero from '@/app/components/sections/Hero';
import StoryScroll from '@/app/components/sections/StoryScroll';

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
    </div>
  );
}
