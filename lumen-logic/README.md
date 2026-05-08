# 🌌 Lumen Logic

**Lumen Logic** is a high-performance, visually immersive web application built with a focus on modern design aesthetics and seamless interactivity. It serves as a showcase for cutting-edge front-end techniques, combining 3D WebGL environments with precision-engineered scrollytelling.

---

## ✨ Vision

In an era where digital interfaces are often static and predictable, **Lumen Logic** pushes the boundaries of the browser. We believe that every scroll should be an event, and every interaction should feel alive. By leveraging the power of WebGL and advanced animation libraries, we create "Liquid Experiences" that adapt and flow with the user.

## 🛠️ Technical Foundation

The project is built on a state-of-the-art stack designed for performance and flexibility:

-   **Framework**: [Next.js 15+](https://nextjs.org/) – Utilizing the latest App Router for optimal routing and performance.
-   **Core Logic**: [React 19](https://react.dev/) – Leveraging the latest features of the React ecosystem.
-   **3D Engine**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) – Powering complex WebGL shaders and 3D scenes.
-   **Motion**: [GSAP](https://gsap.com/) (GreenSock Animation Platform) – The gold standard for high-performance web animations.
-   **Scrolling**: [Lenis](https://lenis.studiofreight.com/) – Implementation of buttery-smooth kinetic scrolling.
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) – Using the latest utility-first CSS framework for rapid, maintainable design.

## 📦 Key Architecture & Components

### 🌊 Liquid Background (`/canvas/LiquidBackground.tsx`)
A global, interactive 3D shader background that responds to mouse movement and scroll events. It provides a cohesive visual atmosphere across the entire application without impacting DOM performance.

### 🎭 Immersive Hero (`/sections/Hero.tsx`)
A cinematic entry point featuring kinetic typography and parallax image scaling. It sets the tone for the application using GSAP's `ScrollTrigger` and `Lenis` for a perfectly synchronized reveal.

### 📜 Story Scroll (`/sections/StoryScroll.tsx`)
A scrollytelling engine that orchestrates complex transitions between text and visual elements. It uses a pinned layout to ensure the user stays engaged with the narrative as they scroll.

### 🖼️ Horizontal Gallery (`/sections/HorizontalGallery.tsx`)
A sophisticated horizontal scrolling showcase. Instead of traditional vertical layouts, this component captures the user's scroll intent to glide through a series of projects or images, creating a "gallery" feel.

### 🖱️ Custom Cursor (`/ui/CustomCursor.tsx`)
A custom-engineered cursor that adds a layer of tactile feedback to the user experience, responding to hover states and interactive elements.

## 🚀 Getting Started

### Prerequisites
-   Node.js 18.0 or later
-   npm / yarn / pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ShreyaPalak/Lumen-Logic.git
    cd lumen-logic
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Principles

-   **Fluidity**: Animations should feel natural and organic, never jarring.
-   **Depth**: Using Z-axis layers and 3D elements to create a sense of space.
-   **Contrast**: High-contrast typography and dark-mode aesthetics for a premium, cinematic feel.
-   **Performance**: Despite the heavy visuals, the app is optimized for 60FPS interaction.

