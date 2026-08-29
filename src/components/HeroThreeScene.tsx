import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Box, Disc, Layers } from 'lucide-react';

interface HeroThreeSceneProps {
  interactiveControls?: boolean;
}

export const HeroThreeScene: React.FC<HeroThreeSceneProps> = ({ interactiveControls = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [geometryType, setGeometryType] = useState<'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron'>('icosahedron');
  const [wireframeOpacity, setWireframeOpacity] = useState<number>(0.65);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Mesh and scene refs for live updates
  const meshRef = useRef<THREE.Mesh | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const particlePointsRef = useRef<THREE.Points | null>(null);
  const rotationSpeedRef = useRef<number>(rotationSpeed);
  rotationSpeedRef.current = rotationSpeed;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Clean previous children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Create Outer Geometric Wireframe Mesh
    const createGeometry = (type: string) => {
      switch (type) {
        case 'torus':
          return new THREE.TorusGeometry(1.6, 0.6, 24, 48);
        case 'octahedron':
          return new THREE.OctahedronGeometry(2.2, 3);
        case 'dodecahedron':
          return new THREE.DodecahedronGeometry(2, 2);
        case 'icosahedron':
        default:
          return new THREE.IcosahedronGeometry(2, 4);
      }
    };

    const geometry = createGeometry(geometryType);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff5722, // Brand Construction Orange
      wireframe: true,
      transparent: true,
      opacity: wireframeOpacity,
      shininess: 90
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Inner subtle glowing core for architectural depth
    const innerGeometry = new THREE.IcosahedronGeometry(1.1, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x1c1b1b,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);
    innerMeshRef.current = innerMesh;

    // Ambient floating dust particles (intelligent design blueprint vibe)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff5722,
      size: 0.045,
      transparent: true,
      opacity: 0.45
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlePointsRef.current = particles;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const orangeLight = new THREE.PointLight(0xff5722, 2, 20);
    orangeLight.position.set(-4, -3, 3);
    scene.add(orangeLight);

    // Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        targetMouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize handling via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        const w = cr.width || window.innerWidth;
        const h = cr.height || window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const speed = rotationSpeedRef.current;

      if (mesh) {
        mesh.rotation.x += 0.004 * speed + currentMouseY * 0.02;
        mesh.rotation.y += 0.006 * speed + currentMouseX * 0.02;
      }

      if (innerMesh) {
        innerMesh.rotation.x -= 0.003 * speed;
        innerMesh.rotation.y -= 0.004 * speed;
      }

      if (particles) {
        particles.rotation.y += 0.0008 * speed;
        particles.rotation.x += 0.0004 * speed;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [geometryType, wireframeOpacity]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" id="threejs-container-ANIMATION_2" />

      {/* Interactive 3D Mesh Customizer Toggle (Optional floating badge) */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-auto flex flex-col items-end gap-2">
        {showControls && (
          <div className="glass-panel p-4 rounded-lg border border-[#747878]/30 shadow-lg w-64 text-xs flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center pb-2 border-b border-[#747878]/20">
              <span className="font-bold text-[#1c1b1b] uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" /> 3D Model Mesh
              </span>
              <span className="text-[10px] text-[#ff5722] font-semibold">Interactive</span>
            </div>

            {/* Geometry Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1c1b1b] mb-1.5">Geometry Mode</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGeometryType('icosahedron')}
                  className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                    geometryType === 'icosahedron' ? 'bg-[#ff5722] text-white' : 'bg-black/5 hover:bg-black/10 text-[#1c1b1b]'
                  }`}
                >
                  Icosahedron
                </button>
                <button
                  type="button"
                  onClick={() => setGeometryType('dodecahedron')}
                  className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                    geometryType === 'dodecahedron' ? 'bg-[#ff5722] text-white' : 'bg-black/5 hover:bg-black/10 text-[#1c1b1b]'
                  }`}
                >
                  Dodecahedron
                </button>
                <button
                  type="button"
                  onClick={() => setGeometryType('torus')}
                  className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                    geometryType === 'torus' ? 'bg-[#ff5722] text-white' : 'bg-black/5 hover:bg-black/10 text-[#1c1b1b]'
                  }`}
                >
                  Torus Node
                </button>
                <button
                  type="button"
                  onClick={() => setGeometryType('octahedron')}
                  className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                    geometryType === 'octahedron' ? 'bg-[#ff5722] text-white' : 'bg-black/5 hover:bg-black/10 text-[#1c1b1b]'
                  }`}
                >
                  Octahedron
                </button>
              </div>
            </div>

            {/* Rotation Speed */}
            <div>
              <div className="flex justify-between text-[10px] text-[#444748] mb-1 font-medium">
                <span>Rotation Velocity</span>
                <span>{rotationSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.2"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 rounded appearance-none cursor-pointer accent-[#ff5722]"
              />
            </div>

            {/* Opacity */}
            <div>
              <div className="flex justify-between text-[10px] text-[#444748] mb-1 font-medium">
                <span>Wireframe Density</span>
                <span>{Math.round(wireframeOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={wireframeOpacity}
                onChange={(e) => setWireframeOpacity(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 rounded appearance-none cursor-pointer accent-[#ff5722]"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-1.5 bg-[#1c1b1b]/80 hover:bg-[#ff5722] text-white text-[11px] font-medium py-1.5 px-3 rounded-full backdrop-blur-md transition-all shadow-md"
          title="Customize 3D architectural mesh"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${showControls ? 'rotate-180 text-white' : 'text-[#ff5722]'}`} />
          <span>{showControls ? 'Close 3D Spec' : '3D Spatial Mesh'}</span>
        </button>
      </div>
    </div>
  );
};
