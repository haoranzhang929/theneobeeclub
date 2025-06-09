"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * MetaballsEffect Component
 *
 * Creates an interactive WebGL-based metaballs animation using Three.js.
 * Metaballs are organic-looking blobs that merge together when they get close,
 * creating fluid, dynamic shapes. This implementation features:
 * - 6 animated metaballs with different movement patterns
 * - Mouse interaction with glow effects
 * - Dynamic color palette that shifts over time
 * - Pulsing animation effects
 * - Responsive design that handles window resizing
 */
export default function MetaballsEffect() {
  // Refs to maintain WebGL context and animation frame
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ============================================================================
    // WEBGL RENDERER SETUP
    // ============================================================================

    // Create WebGL renderer with antialiasing and transparency support
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Limit pixel ratio for performance while maintaining quality
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Resize function to maintain proper canvas dimensions
    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    resize();
    container.appendChild(renderer.domElement);

    // ============================================================================
    // THREE.JS SCENE SETUP
    // ============================================================================

    const scene = new THREE.Scene();
    // Orthographic camera for 2D-like rendering (no perspective distortion)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Full-screen quad geometry (covers entire viewport)
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Shader uniforms - variables passed from JavaScript to GPU shaders
    const uniforms = {
      u_time: { value: 0 }, // Animation time counter
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) }, // Mouse position (0-1 range)
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) } // Screen resolution
    };

    // ============================================================================
    // SHADER MATERIAL DEFINITION
    // ============================================================================

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true, // Enable alpha blending
      vertexShader: `
        // Vertex shader: positions vertices and passes UV coordinates to fragment shader
        varying vec2 vUv;
        void main() {
          vUv = uv; // Pass UV coordinates (0-1) to fragment shader
          gl_Position = vec4(position, 1.0); // Position vertex in clip space
        }
      `,
      fragmentShader: `
        // Fragment shader: runs for every pixel, creates the metaballs effect
        precision highp float;
        
        // Input uniforms from JavaScript
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        
        // Input from vertex shader
        varying vec2 vUv;

        /**
         * Metaball Function
         * 
         * Creates a single metaball at position 'pos' with radius 'r'.
         * Uses inverse distance squared for smooth falloff.
         * The closer a pixel is to the center, the higher the returned value.
         * 
         * @param p - Current pixel position
         * @param pos - Metaball center position
         * @param r - Metaball radius/influence
         * @return - Influence value (higher = closer to metaball center)
         */
        float metaball(vec2 p, vec2 pos, float r) {
          float d = length(p - pos); // Distance from pixel to metaball center
          return r * r / (d * d + 0.1); // Inverse distance squared with small offset to prevent division by zero
        }

        /**
         * Color Palette Function
         * 
         * Generates smooth, cyclical color transitions using cosine waves.
         * This creates a rainbow-like effect that smoothly transitions between colors.
         * Based on Inigo Quilez's palette generation technique.
         * 
         * @param t - Time/position parameter (0-1)
         * @return - RGB color vector
         */
        vec3 palette(float t) {
          vec3 a = vec3(0.5, 0.5, 0.5);     // Base color offset
          vec3 b = vec3(0.5, 0.5, 0.5);     // Color amplitude  
          vec3 c = vec3(1.0, 1.0, 1.0);     // Color frequency
          vec3 d = vec3(0.263, 0.416, 0.557); // Color phase shift
          return a + b * cos(6.28318 * (c * t + d)); // Cosine-based color generation
        }

        void main() {
          // ====================================================================
          // COORDINATE SYSTEM SETUP
          // ====================================================================
          
          // Convert UV coordinates (0-1) to normalized device coordinates (-1 to 1)
          // Also apply aspect ratio correction to prevent stretching
          vec2 uv = (vUv * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
          
          // Convert mouse position to same coordinate system
          vec2 mouse = (u_mouse * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
          
          // Scaled time for animation speed control
          float t = u_time * 0.6;

          // ====================================================================
          // METABALL POSITION CALCULATIONS
          // ====================================================================
          
          // Create 6 metaballs with different movement patterns
          // Each uses sine/cosine functions with different frequencies for organic motion
          
          // Metaball 1: Large elliptical orbit
          vec2 p1 = vec2(sin(t * 1.3) * 0.8, cos(t * 1.2) * 0.6);
          
          // Metaball 2: Wide circular motion  
          vec2 p2 = vec2(cos(t * 0.8) * 0.7, sin(t * 0.9) * 0.8);
          
          // Metaball 3: Vertical figure-8 pattern
          vec2 p3 = vec2(sin(t * 1.1) * 0.6, sin(t * 1.5) * 0.5);
          
          // Metaball 4: Fast diagonal movement
          vec2 p4 = vec2(cos(t * 1.7) * 0.4, cos(t * 0.7) * 0.9);
          
          // Metaball 5: Slow, small circular motion
          vec2 p5 = vec2(sin(t * 2.1) * 0.5, cos(t * 1.8) * 0.4);
          
          // Metaball 6: Mouse-controlled with damping
          vec2 p6 = mouse * 0.8;

          // ====================================================================
          // METABALL FIELD CALCULATION
          // ====================================================================
          
          // Sum up influence from all metaballs
          // Each metaball contributes to the final field value
          float v = 0.0;
          v += metaball(uv, p1, 0.6); // Medium influence
          v += metaball(uv, p2, 0.7); // Strong influence  
          v += metaball(uv, p3, 0.5); // Moderate influence
          v += metaball(uv, p4, 0.4); // Weak influence
          v += metaball(uv, p5, 0.6); // Medium influence
          v += metaball(uv, p6, 0.8); // Strongest influence (mouse)

          // ====================================================================
          // COLOR AND INTENSITY PROCESSING
          // ====================================================================
          
          // Create smooth intensity threshold - only show areas where metaballs overlap significantly
          float intensity = smoothstep(0.8, 2.5, v);
          
          // Generate dynamic color index based on field value and time
          float colorIndex = v * 0.3 + t * 0.2;
          
          // Generate two complementary colors and blend them
          vec3 color1 = palette(colorIndex);
          vec3 color2 = palette(colorIndex + 0.5); // Offset for complementary color
          vec3 finalColor = mix(color1, color2, sin(t + v) * 0.5 + 0.5);
          
          // ====================================================================
          // BRAND COLOR INTEGRATION
          // ====================================================================
          
          // Blend generated colors with brand purple/pink palette
          finalColor = mix(finalColor, vec3(0.6, 0.3, 0.9), 0.4); // Purple tint
          finalColor = mix(finalColor, vec3(0.9, 0.4, 0.7), intensity * 0.3); // Pink highlights
          
          // ====================================================================
          // INTERACTIVE EFFECTS
          // ====================================================================
          
          // Mouse glow effect - creates bright highlight near cursor
          float glow = exp(-length(uv - mouse) * 2.0) * 0.3;
          finalColor += vec3(0.8, 0.2, 1.0) * glow; // Add purple glow
          
          // ====================================================================
          // ANIMATION EFFECTS
          // ====================================================================
          
          // Pulsing effect - subtle breathing animation
          float pulse = sin(t * 3.0) * 0.1 + 0.9;
          intensity *= pulse;
          
          // Final color output with transparency
          gl_FragColor = vec4(finalColor, intensity * 0.9);
        }
      `
    });

    // Create mesh from geometry and material
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    /**
     * Mouse Movement Handler
     *
     * Converts mouse screen coordinates to normalized UV coordinates (0-1)
     * for use in the shader. Accounts for container position and size.
     */
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.u_mouse.value.set(
        (e.clientX - rect.left) / rect.width, // X: 0-1 from left to right
        1.0 - (e.clientY - rect.top) / rect.height // Y: 0-1 from bottom to top (flipped for WebGL)
      );
    };

    /**
     * Mouse Leave Handler
     *
     * Smoothly returns mouse effect to center when cursor leaves the container
     */
    const onMouseLeave = () => {
      uniforms.u_mouse.value.set(0.5, 0.5); // Center position
    };

    /**
     * Window Resize Handler
     *
     * Updates both WebGL renderer and shader uniforms when window size changes.
     * Essential for maintaining proper aspect ratio and mouse interaction.
     */
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Update shader resolution uniform
      uniforms.u_resolution.value.set(width, height);
      // Update WebGL canvas size
      renderer.setSize(width, height);
      // Maintain pixel ratio for quality
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Register event listeners
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", handleResize);

    // ============================================================================
    // ANIMATION LOOP
    // ============================================================================

    /**
     * Animation Loop
     *
     * Runs at ~60fps, updating time uniform and rendering the scene.
     * Uses requestAnimationFrame for smooth, browser-optimized animation.
     */
    const animate = () => {
      uniforms.u_time.value += 0.016; // Increment time (~60fps timing)
      renderer.render(scene, camera); // Render frame
      frameRef.current = requestAnimationFrame(animate); // Schedule next frame
    };
    animate(); // Start animation loop

    // ============================================================================
    // CLEANUP FUNCTION
    // ============================================================================

    /**
     * Cleanup Function
     *
     * Properly disposes of WebGL resources and removes event listeners
     * to prevent memory leaks when component unmounts.
     */
    return () => {
      // Stop animation loop
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      // Remove event listeners
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseleave", onMouseLeave);

      // Dispose of WebGL resources
      renderer.dispose(); // Cleanup WebGL context
      material.dispose(); // Cleanup shader material
      geometry.dispose(); // Cleanup geometry buffers

      // Remove canvas from DOM
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Render container div with proper z-index for layering
  return <div ref={containerRef} className="absolute inset-0 z-5" />;
}
