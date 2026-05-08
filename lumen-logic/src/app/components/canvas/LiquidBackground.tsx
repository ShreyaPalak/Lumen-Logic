'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// 1. The Custom Shader Material
const LiquidShader = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Track mouse position
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate mouse position for a "fluid" feel
      const { x, y } = state.mouse;
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        (x + 1) / 2,
        0.1
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        (y + 1) / 2,
        0.1
      );
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColor: { value: new THREE.Color("#050505") }, // Darker base
    uHighlightColor: { value: new THREE.Color("#1a1a1a") } // Slightly lighter highlights
  }), []);

  return (
    <mesh rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Complex wave interference
            float elevation = sin(pos.x * 1.2 + uTime * 0.7) * 0.4;
            elevation += cos(pos.y * 1.2 + uTime * 0.6) * 0.4;
            elevation += sin(pos.x * 2.0 + pos.y * 2.0 + uTime * 0.5) * 0.2;
            
            pos.z += elevation;
            vElevation = elevation; // Pass to fragment shader
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform vec3 uHighlightColor;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            // Mouse interaction: create a glow around the cursor
            float mouseDist = distance(vUv, uMouse);
            float mouseGlow = smoothstep(0.4, 0.0, mouseDist) * 0.15;
            
            // Mix colors based on elevation (peaks are lighter)
            float mixStrength = (vElevation + 1.0) * 0.5;
            vec3 finalColor = mix(uColor, uHighlightColor, mixStrength);
            
            // Add mouse glow and slight UV gradient for depth
            finalColor += mouseGlow;
            finalColor += vec3(vUv.x, vUv.y, 1.0) * 0.02;
            
            gl_FragColor = vec4(finalColor, 1.0);
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
    <div className="fixed inset-0 w-full h-screen z-[-1] bg-black overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        {/* Ambient lighting (though shaders handle their own color mostly) */}
        <ambientLight intensity={0.5} />
        <LiquidShader />
      </Canvas>
    </div>
  );
}