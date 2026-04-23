'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// 1. The Custom Shader Material
const LiquidShader = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // useFrame runs on every monitor refresh (60fps/120fps)
  useFrame((state) => {
    if (materialRef.current) {
      // Pass the elapsed time to the shader to animate the waves
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    // A deep charcoal/slate color for a premium dark mode
    uColor: { value: new THREE.Color("#111111") } 
  }), []);

  return (
    <mesh>
      {/* A plane with many segments so it has geometry to bend */}
      <planeGeometry args={[15, 15, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        // The Vertex Shader: Bends the 3D geometry using sine waves
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Create liquid distortion based on X/Y coordinates and Time
            float elevation = sin(pos.x * 1.5 + uTime * 0.5) * 0.5;
            elevation += cos(pos.y * 1.5 + uTime * 0.4) * 0.5;
            pos.z += elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        // The Fragment Shader: Paints the pixels, adding slight shading to the peaks
        fragmentShader={`
          uniform vec3 uColor;
          uniform vec2 uMouse;
          varying vec2 vUv;
          
          void main() {
            // Slight gradient based on the UV coordinates
            float dist = distance(vUv, uMouse);
  float strength = smoothstep(0.5, 0.0, dist);
            vec3 color = uColor + vec3(vUv.y * 0.05); 
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// 2. The Canvas Container
export default function LiquidBackground() {
  return (
    // Positioned absolutely behind your main content
    <div className="absolute inset-0 w-full h-screen z-[-1] bg-black overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        {/* Ambient lighting (though shaders handle their own color mostly) */}
        <ambientLight intensity={0.5} />
        <LiquidShader />
      </Canvas>
    </div>
  );
}