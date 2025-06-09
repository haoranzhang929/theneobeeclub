"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function MetaballsEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
      u_mouse: { value: new THREE.Vector2(0, 0) },
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
          return r * r / (d * d);
        }

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          vec2 mouse = (u_mouse / u_resolution) * 2.0 - 1.0;
          float t = u_time * 0.4;

          vec2 p1 = vec2(sin(t * 1.3), cos(t * 1.2)) * 0.5;
          vec2 p2 = vec2(cos(t * 0.8), sin(t * 0.9)) * 0.5;
          vec2 p3 = vec2(sin(t * 1.1), sin(t * 1.5)) * 0.5;

          float v = 0.0;
          v += metaball(uv, p1, 0.4);
          v += metaball(uv, p2, 0.4);
          v += metaball(uv, p3, 0.4);
          v += metaball(uv, mouse, 0.3);

          float intensity = smoothstep(1.0, 3.0, v);
          vec3 colorA = vec3(0.4, 0.0, 0.8);
          vec3 colorB = vec3(1.0, 0.6, 0.8);
          vec3 color = mix(colorA, colorB, intensity);
          gl_FragColor = vec4(color, intensity);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.set(e.clientX, container.clientHeight - e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", () => {
      uniforms.u_resolution.value.set(container.clientWidth, container.clientHeight);
      resize();
    });

    const animate = () => {
      uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
