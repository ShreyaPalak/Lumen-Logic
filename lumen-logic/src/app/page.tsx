import ImmersiveHero from '@/app/components/sections/Hero';
import StoryScroll from '@/app/components/sections/StoryScroll';
import HorizontalGallery from '@/app/components/sections/HorizontalGallery';
import Services from '@/app/components/sections/Services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ImmersiveHero />
      
      {/* Tagline Transition Section */}
      <section className="relative w-full py-32 bg-transparent text-white flex flex-col items-center justify-center text-center px-4">
        <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mb-6">
          The Studio
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight max-w-4xl leading-tight mix-blend-difference">
          We build the web's most{' '}
          <span className="italic font-serif text-zinc-400">unreasonably beautiful</span>{' '}
          experiences.
        </h2>
      </section>

      {/* Services — The Core Value Proposition */}
      <Services />

      {/* Process / Story */}
      <StoryScroll />
      
      {/* Selected Works */}
      <HorizontalGallery />
      
      {/* Footer */}
      <footer className="h-[50vh] bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-600 font-mono text-sm tracking-widest uppercase">Lumen Studio</p>
        <h2 className="text-2xl font-light tracking-widest uppercase text-zinc-400">
          Let's build something unreasonable.
        </h2>
        <a
          href="mailto:hello@lumenstudio.io"
          className="mt-4 border border-zinc-700 text-zinc-400 font-mono text-sm px-6 py-3 hover:border-white hover:text-white transition-colors duration-300"
        >
          hello@lumenstudio.io
        </a>
      </footer>
    </div>
  );
}
