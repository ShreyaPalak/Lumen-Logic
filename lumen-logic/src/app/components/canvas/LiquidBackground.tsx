'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// 1. The Custom Shader Material
const LiquidShader = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Global mouse position (from window events, bypasses pointer-events-none)
  const targetMouse = useRef({ x: 0.5, y: 0.5 });

  // Service hover state — drives shader mode and accent color
  const serviceState = useRef({
    mode: 0,          // 0=default, 1=scrollytelling, 2=webgl, 3=motion
    targetColor: new THREE.Color(0, 0, 0),
    currentColor: new THREE.Color(0, 0, 0),
  });

  useEffect(() => {
    // Track real mouse position across the full page
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };

    // Listen for service hover events from Services.tsx
    const handleServiceHover = (e: Event) => {
      const { mode, color } = (e as CustomEvent).detail as {
        mode: number;
        color: [number, number, number];
      };
      serviceState.current.mode = mode;
      serviceState.current.targetColor.setRGB(color[0], color[1], color[2]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('serviceHover', handleServiceHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('serviceHover', handleServiceHover);
    };
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    const m = materialRef.current;

    m.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse position
    m.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
      m.uniforms.uMouse.value.x, targetMouse.current.x, 0.05
    );
    m.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
      m.uniforms.uMouse.value.y, targetMouse.current.y, 0.05
    );

    // Smooth accent color transition
    serviceState.current.currentColor.lerp(serviceState.current.targetColor, 0.04);
    m.uniforms.uAccentColor.value.copy(serviceState.current.currentColor);

    // Smooth shader mode transition
    const targetMode = serviceState.current.mode;
    m.uniforms.uServiceMode.value = THREE.MathUtils.lerp(
      m.uniforms.uServiceMode.value,
      targetMode,
      0.03
    );
  });

  const uniforms = useMemo(() => ({
    uTime:         { value: 0 },
    uMouse:        { value: new THREE.Vector2(0.5, 0.5) },
    uColor:        { value: new THREE.Color('#050505') },
    uHighlightColor: { value: new THREE.Color('#1a1a1a') },
    uAccentColor:  { value: new THREE.Color(0, 0, 0) },
    uServiceMode:  { value: 0.0 },
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
          uniform float uServiceMode;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // --- Base ambient waves ---
            float elevation = sin(pos.x * 1.2 + uTime * 0.7) * 0.4;
            elevation += cos(pos.y * 1.2 + uTime * 0.6) * 0.4;
            elevation += sin(pos.x * 2.0 + pos.y * 2.0 + uTime * 0.5) * 0.2;
            
            // --- Mouse ripple & tear ---
            float mouseDist = distance(uv, uMouse);
            float tear = smoothstep(0.15, 0.0, mouseDist) * 2.5;
            float ripple = sin(mouseDist * 30.0 - uTime * 8.0) * 0.4;
            ripple *= smoothstep(0.4, 0.0, mouseDist);
            elevation -= tear;
            elevation += ripple;
            
            // --- Service Mode morphs ---
            // Mode 1: Scrollytelling — deep slow rolling waves (like turning pages)
            float mode1 = step(0.5, uServiceMode) * (1.0 - step(1.5, uServiceMode));
            float pageWave = sin(pos.x * 0.5 + uTime * 0.3) * 1.5;
            pageWave += cos(pos.y * 0.4 + uTime * 0.25) * 1.0;
            elevation += pageWave * clamp(uServiceMode - 0.0, 0.0, 1.0);
            
            // Mode 2: WebGL Envs — tight crystalline grid pattern
            float mode2intensity = clamp(uServiceMode - 1.0, 0.0, 1.0);
            float crystal = sin(pos.x * 6.0 + uTime * 1.5) * cos(pos.y * 6.0 + uTime * 1.2) * 0.6;
            elevation += crystal * mode2intensity;
            
            // Mode 3: Motion Systems — fast directional velocity streaks
            float mode3intensity = clamp(uServiceMode - 2.0, 0.0, 1.0);
            float streak = sin(pos.x * 3.0 - uTime * 5.0) * 0.8;
            streak += sin(pos.y * 2.0 + uTime * 4.0) * 0.4;
            elevation += streak * mode3intensity;
            
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform vec3 uHighlightColor;
          uniform vec3 uAccentColor;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mouseDist = distance(vUv, uMouse);
            
            // Deep tears darker, peaks lighter
            float mixStrength = (vElevation + 1.5) * 0.4; 
            mixStrength = clamp(mixStrength, 0.0, 1.0);
            vec3 baseColor = mix(uColor, uHighlightColor, mixStrength);
            
            // Accent glow near cursor — coloured by active service
            float glowRadius = 0.3;
            float glow = smoothstep(glowRadius, 0.0, mouseDist);
            
            // Service accent halo (wider, more diffuse)
            float halo = smoothstep(0.6, 0.0, mouseDist) * 0.12;
            
            vec3 finalColor = baseColor;
            finalColor += uAccentColor * glow * 0.25;   // tight colored glow
            finalColor += uAccentColor * halo;           // wide atmospheric halo
            finalColor += vec3(vUv.x, vUv.y, 1.0) * 0.02; // UV depth gradient
            
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
    <div className="fixed inset-0 w-full h-screen z-[-1] bg-black overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <LiquidShader />
      </Canvas>
    </div>
  );
}