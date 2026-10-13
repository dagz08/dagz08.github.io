import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface TechNode {
  id: string;
  name: string;
  role: string;
  color: string;
  glow: string;
  orbitRadius: number;
  speed: number;
  angle: number;
  yOffset: number;
  highlight: string;
}

const TECH_NODES: TechNode[] = [
  { id: 'dotnet', name: '.NET 9', role: 'Runtime Core', color: '#7c3db5', glow: '#a855f7', orbitRadius: 3.5, speed: 0.35, angle: 0, yOffset: 0.3, highlight: 'Clean Architecture, Minimal APIs, Async/TPL' },
  { id: 'csharp', name: 'C# 13', role: 'Language', color: '#15803d', glow: '#22c55e', orbitRadius: 3.5, speed: 0.35, angle: (Math.PI * 2) / 3, yOffset: -0.2, highlight: 'Generics, LINQ, Memory & Task Parallel' },
  { id: 'azure', name: 'Azure', role: 'Cloud Platform', color: '#0284c7', glow: '#38bdf8', orbitRadius: 3.5, speed: 0.35, angle: (Math.PI * 4) / 3, yOffset: 0.1, highlight: 'Service Bus, AKS, App Services, Functions' },

  { id: 'react', name: 'React', role: 'Modern Frontend', color: '#0891b2', glow: '#06b6d4', orbitRadius: 5.1, speed: 0.24, angle: 0.8, yOffset: -0.4, highlight: 'React 18+, TypeScript, Hooks, Vite, State' },
  { id: 'sql', name: 'SQL Server', role: 'Database Core', color: '#b91c1c', glow: '#ef4444', orbitRadius: 5.1, speed: 0.24, angle: 0.8 + (Math.PI * 2) / 4, yOffset: 0.4, highlight: 'Advanced T-SQL, Index Tuning, Query Store' },
  { id: 'docker', name: 'Docker', role: 'Containers', color: '#1d4ed8', glow: '#3b82f6', orbitRadius: 5.1, speed: 0.24, angle: 0.8 + (Math.PI * 4) / 4, yOffset: -0.2, highlight: 'Multi-stage builds, Compose, AKS pods' },
  { id: 'micro', name: 'Microservices', role: 'Distributed Arch', color: '#0f766e', glow: '#14b8a6', orbitRadius: 5.1, speed: 0.24, angle: 0.8 + (Math.PI * 6) / 4, yOffset: 0.2, highlight: 'CQRS, MediatR, Event-Driven Pub/Sub' },

  { id: 'efcore', name: 'EF Core', role: 'ORM & Data', color: '#4338ca', glow: '#6366f1', orbitRadius: 6.7, speed: 0.16, angle: 1.5, yOffset: 0.4, highlight: 'Code-First migrations, Dapper, Compiled queries' },
  { id: 'rest', name: 'REST APIs', role: 'Integration', color: '#16a34a', glow: '#4ade80', orbitRadius: 6.7, speed: 0.16, angle: 1.5 + (Math.PI * 2) / 3, yOffset: -0.3, highlight: 'Rate Limiting, JWT Bearer, Ocelot / YARP' },
  { id: 'angular', name: 'Angular', role: 'Frontend', color: '#be123c', glow: '#f43f5e', orbitRadius: 6.7, speed: 0.16, angle: 1.5 + (Math.PI * 4) / 3, yOffset: 0.1, highlight: 'RxJS, Services, Reactive Forms, NgRx' },
];

function createNodeTexture(node: TechNode): THREE.CanvasTexture {
  const S = 256;
  const cx = 128, cy = 128;
  const cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const c = cv.getContext('2d')!;

  // Subtle glow
  const g = c.createRadialGradient(cx, cy, 30, cx, cy, 115);
  g.addColorStop(0, node.glow + '44');
  g.addColorStop(1, 'transparent');
  c.fillStyle = g;
  c.fillRect(0, 0, S, S);

  // Solid Rounded Hexagon / Tech badge
  c.save();
  const r = 28, x = 26, y = 26, w = S - 52, h = S - 52;
  c.beginPath();
  c.moveTo(x + r, y);
  c.lineTo(x + w - r, y);
  c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r);
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();

  // Solid dark background with gradient tint
  const bgGrad = c.createLinearGradient(x, y, x + w, y + h);
  bgGrad.addColorStop(0, '#101626');
  bgGrad.addColorStop(1, '#090d16');
  c.fillStyle = bgGrad;
  c.fill();

  c.strokeStyle = node.glow;
  c.lineWidth = 4;
  c.shadowColor = node.glow;
  c.shadowBlur = 10;
  c.stroke();
  c.restore();

  // Text
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillStyle = '#ffffff';
  c.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
  c.fillText(node.name, cx, cy - 6);

  c.fillStyle = '#94a3b8';
  c.font = '600 15px "JetBrains Mono", monospace';
  c.fillText(node.role, cx, cy + 28);

  const texture = new THREE.CanvasTexture(cv);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Single 3D Tech Node Component
const OrbitingNode: React.FC<{
  node: TechNode;
  activeNode: string | null;
  onSelect: (id: string | null) => void;
}> = ({ node, activeNode, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createNodeTexture(node), [node]);
  const isSelected = activeNode === node.id;

  useFrame(({ clock, camera }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const currentAngle = node.angle + t * node.speed;
    const x = Math.cos(currentAngle) * node.orbitRadius;
    const z = Math.sin(currentAngle) * node.orbitRadius;
    const y = node.yOffset + Math.sin(t * 1.8 + node.orbitRadius) * 0.12;

    meshRef.current.position.set(x, y, z);
    meshRef.current.lookAt(camera.position);
  });

  return (
    <mesh
      ref={meshRef}
      scale={isSelected ? 1.4 : 1.1}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isSelected ? null : node.id);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <planeGeometry args={[1.6, 1.6]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        roughness={0.25}
        metalness={0.4}
      />
      {isSelected && (
        <Html distanceFactor={14} position={[0, 1.1, 0]} center>
          <div className="tech-surface px-4 py-2.5 rounded-xl border border-teal-400 text-xs font-mono text-white shadow-2xl w-52 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 mb-1.5">
              <span className="font-bold text-teal-300">{node.name}</span>
              <span className="text-[10px] text-slate-400">{node.role}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">{node.highlight}</p>
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Holographic Enterprise Server Core in the center
const EnterpriseCore: React.FC = () => {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.x += 0.5 * delta;
      innerRef.current.rotation.y += 0.7 * delta;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= 0.3 * delta;
      outerRef.current.rotation.y -= 0.4 * delta;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Inner Wireframe Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#14b8a6"
          emissive="#0d9488"
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Outer Cage */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4338ca"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <pointLight color="#2dd4bf" intensity={4} distance={9} />
    </group>
  );
};

// Orbit guide rings
const OrbitRings: React.FC = () => {
  const rings = [
    { r: 3.5, color: '#14b8a6' },
    { r: 5.1, color: '#3b82f6' },
    { r: 6.7, color: '#8b5cf6' },
  ];

  return (
    <>
      {rings.map((ring, idx) => {
        const points: THREE.Vector3[] = [];
        const segs = 128;
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(a) * ring.r, 0, Math.sin(a) * ring.r));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive
            key={idx}
            object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: ring.color, transparent: true, opacity: 0.22 }))}
          />
        );
      })}
    </>
  );
};

// Scroll-driven camera controller with mouse parallax
const ScrollCameraController: React.FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 1200;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // As user scrolls past hero, camera lifts up, rotates slightly, and zooms out for storytelling transition
      gsap.to(camera.position, {
        x: Math.sin(progress * Math.PI * 0.4) * 3,
        y: 8 + progress * 5,
        z: 14 + progress * 3,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => camera.lookAt(0, 0, 0),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  // Smooth mouse tilt parallax
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 2.2 - state.camera.position.x) * 0.02;
    state.camera.position.y += (8 - state.pointer.y * 1.5 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

export const HeroR3F: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 8, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 12, 8]} intensity={1.2} />
        <pointLight position={[-5, 3, 4]} color="#14b8a6" intensity={2.5} distance={20} />
        <pointLight position={[5, -2, 4]} color="#8b5cf6" intensity={2} distance={20} />

        <ScrollCameraController />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <EnterpriseCore />
        </Float>

        <OrbitRings />

        {TECH_NODES.map((node) => (
          <OrbitingNode
            key={node.id}
            node={node}
            activeNode={selectedNode}
            onSelect={setSelectedNode}
          />
        ))}
      </Canvas>

      {/* Floating HUD Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full tech-surface text-xs font-mono text-teal-300 shadow-xl border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Click any 3D node to inspect • React Three Fiber</span>
        </div>
      </div>
    </div>
  );
};
