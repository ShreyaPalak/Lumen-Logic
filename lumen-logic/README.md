# Lumen Logic

Lumen Logic is a modern web application built to showcase highly interactive, dynamic UI components. It features advanced scrollytelling, seamless horizontal galleries, and immersive 3D background elements.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & ScrollTrigger
- **3D / WebGL**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **Language**: TypeScript

## ✨ Key Features

- **Liquid Background**: A dynamic, interactive 3D WebGL background powered by React Three Fiber.
- **Horizontal Gallery**: GSAP-driven horizontal scrolling layout that pins and scrolls seamlessly.
- **Story Scroll**: Scrollytelling sections with synchronized text and visual elements.
- **Smooth Scrolling**: Integrated Lenis scroll for a buttery-smooth user experience across all devices.

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

The main components are located in `src/app/components/`:
- `/canvas` - Contains the 3D WebGL components like `LiquidBackground.tsx`.
- `/sections` - Contains the layout and animated sections like `HorizontalGallery.tsx`, `StoryScroll.tsx`, and `Hero.tsx`.
