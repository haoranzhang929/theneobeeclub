"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function MetaballsEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    resize();
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        varying vec2 vUv;

        float metaball(vec2 p, vec2 pos, float r) {
          float d = length(p - pos);
          return r * r / (d * d + 0.1);
        }

        vec3 palette(float t) {
          vec3 a = vec3(0.5, 0.5, 0.5);
          vec3 b = vec3(0.5, 0.5, 0.5);
          vec3 c = vec3(1.0, 1.0, 1.0);
          vec3 d = vec3(0.263, 0.416, 0.557);
          return a + b * cos(6.28318 * (c * t + d));
        }

        void main() {
          vec2 uv = (vUv * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
          vec2 mouse = (u_mouse * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
          float t = u_time * 0.6;

          // More metaballs with varied movements
          vec2 p1 = vec2(sin(t * 1.3) * 0.8, cos(t * 1.2) * 0.6);
          vec2 p2 = vec2(cos(t * 0.8) * 0.7, sin(t * 0.9) * 0.8);
          vec2 p3 = vec2(sin(t * 1.1) * 0.6, sin(t * 1.5) * 0.5);
          vec2 p4 = vec2(cos(t * 1.7) * 0.4, cos(t * 0.7) * 0.9);
          vec2 p5 = vec2(sin(t * 2.1) * 0.5, cos(t * 1.8) * 0.4);
          vec2 p6 = mouse * 0.8;

          float v = 0.0;
          v += metaball(uv, p1, 0.6);
          v += metaball(uv, p2, 0.7);
          v += metaball(uv, p3, 0.5);
          v += metaball(uv, p4, 0.4);
          v += metaball(uv, p5, 0.6);
          v += metaball(uv, p6, 0.8);

          // Enhanced intensity and color mixing
          float intensity = smoothstep(0.8, 2.5, v);
          float colorIndex = v * 0.3 + t * 0.2;
          
          // Dynamic color palette
          vec3 color1 = palette(colorIndex);
          vec3 color2 = palette(colorIndex + 0.5);
          vec3 finalColor = mix(color1, color2, sin(t + v) * 0.5 + 0.5);
          
          // Add purple/pink tint to match brand
          finalColor = mix(finalColor, vec3(0.6, 0.3, 0.9), 0.4);
          finalColor = mix(finalColor, vec3(0.9, 0.4, 0.7), intensity * 0.3);
          
          // Enhanced glow effect
          float glow = exp(-length(uv - mouse) * 2.0) * 0.3;
          finalColor += vec3(0.8, 0.2, 1.0) * glow;
          
          // Pulsing effect
          float pulse = sin(t * 3.0) * 0.1 + 0.9;
          intensity *= pulse;
          
          gl_FragColor = vec4(finalColor, intensity * 0.9);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.u_mouse.value.set((e.clientX - rect.left) / rect.width, 1.0 - (e.clientY - rect.top) / rect.height);
    };

    const onMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      uniforms.u_mouse.value.set(0.5, 0.5);
    };

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      uniforms.u_resolution.value.set(width, height);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      uniforms.u_time.value += 0.016; // ~60fps timing
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseleave", onMouseLeave);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-5" />;
}
