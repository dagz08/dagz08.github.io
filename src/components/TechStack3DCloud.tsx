import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface CloudNode {
  id: string;
  name: string;
  category: string;
  color: string;
  glow: string;
  position: [number, number, number];
  skills: string[];
}

const CLOUD_NODES: CloudNode[] = [
  {
    id: 'dotnet',
    name: '.NET 8 / 9',
    category: 'Backend Core',
    color: '#7c3db5',
    glow: '#a855f7',
    position: [0, 0, 0],
    skills: ['ASP.NET Core Minimal APIs', 'C# 13 async/TPL concurrency', 'Dependency Injection & Clean Arch', 'High-throughput microservices']
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'Programming',
    color: '#15803d',
    glow: '#22c55e',
    position: [-3.2, 1.2, 0.5],
    skills: ['Generics, Delegates & Events', 'LINQ query execution', 'Garbage Collection tuning', 'SOLID & Clean Code craftsmanship']
  },
  {
    id: 'azure',
    name: 'Azure Cloud',
    category: 'Cloud Infrastructure',
    color: '#0284c7',
    glow: '#38bdf8',
    position: [3.2, 1.4, -0.6],
    skills: ['Azure App Services & Functions', 'Azure Service Bus & Event Grid', 'Azure SQL & Cosmos DB', 'ARM Templates & IaC']
  },
  {
    id: 'sql',
    name: 'SQL Server',
    category: 'Database Engine',
    color: '#b91c1c',
    glow: '#ef4444',
    position: [2.5, -1.8, 1.2],
    skills: ['Advanced T-SQL & Stored Procs', 'Execution plan & index tuning', 'Deadlock & concurrency isolation', 'Query Store & Profiler tuning']
  },
  {
    id: 'docker',
    name: 'Docker & AKS',
    category: 'Containers & DevOps',
    color: '#1d4ed8',
    glow: '#3b82f6',
    position: [-2.8, -1.6, -1.1],
    skills: ['Multi-stage Dockerfiles', 'AKS deployment & pods', 'Azure DevOps CI/CD pipelines', 'GitHub Actions automation']
  },
  {
    id: 'react',
    name: 'React 18+',
    category: 'Frontend Engineering',
    color: '#0891b2',
    glow: '#06b6d4',
    position: [0, 2.5, -1.8],
    skills: ['React Hooks & custom hooks', 'TypeScript strict interfaces', 'Zustand & TanStack Query', 'Vite build optimization']
  },
  {
    id: 'microservices',
    name: 'Microservices',
    category: 'Architecture',
    color: '#0f766e',
    glow: '#14b8a6',
    position: [-1.8, 0.5, 2.4],
    skills: ['Domain-Driven Design (DDD)', 'CQRS & MediatR pattern', 'Outbox pattern messaging', 'YARP & Ocelot API Gateways']
  },
  {
    id: 'efcore',
    name: 'EF Core & Dapper',
    category: 'ORM & Data Access',
    color: '#4338ca',
    glow: '#6366f1',
    position: [1.8, 0.4, 2.2],
    skills: ['Compiled EF Core queries', 'Dapper high-speed micro-ORM', 'Code-First / Db-First migrations', 'ADO.NET streaming']
  },
];

function createNodeTexture(node: CloudNode): THREE.CanvasTexture {
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

  // Solid Tech Pill
  c.save();
  const r = 28, x = 24, y = 24, w = S - 48, h = S - 48;
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

  c.fillStyle = '#101626';
  c.fill();
  c.strokeStyle = node.glow;
  c.lineWidth = 4;
  c.stroke();
  c.restore();

  // Label
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillStyle = '#ffffff';
  c.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
  c.fillText(node.name, cx, cy - 8);

  c.fillStyle = '#94a3b8';
  c.font = '600 15px "JetBrains Mono", monospace';
  c.fillText(node.category, cx, cy + 28);

  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

const FloatingNodeItem: React.FC<{
  node: CloudNode;
  isActive: boolean;
  onSelect: (node: CloudNode) => void;
}> = ({ node, isActive, onSelect }) => {
  const tex = useMemo(() => createNodeTexture(node), [node]);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.8} position={node.position}>
      <mesh
        ref={meshRef}
        scale={isActive ? 1.4 : 1.1}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <planeGeometry args={[1.7, 1.7]} />
        <meshStandardMaterial map={tex} transparent alphaTest={0.05} roughness={0.2} metalness={0.4} />

        {isActive && (
          <Html distanceFactor={11} position={[0, 1.25, 0]} center>
            <div className="tech-surface px-4 py-3 rounded-xl border border-teal-400 text-xs text-white shadow-2xl w-64 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                <span className="font-bold text-teal-300 font-mono text-sm">{node.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{node.category}</span>
              </div>
              <ul className="space-y-1">
                {node.skills.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                    <span className="text-teal-400 font-bold">›</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
};

const CameraFocusController: React.FC<{ targetNode: CloudNode | null }> = ({ targetNode }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (targetNode) {
      const [tx, ty, tz] = targetNode.position;
      gsap.to(camera.position, {
        x: tx * 0.7,
        y: ty * 0.7 + 0.5,
        z: tz + 5.5,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  });

  return null;
};

export const TechStack3DCloud: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<CloudNode | null>(null);

  return (
    <div className="relative w-full h-[540px] rounded-2xl tech-surface overflow-hidden border border-slate-800">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <pointLight position={[-4, 2, 3]} color="#14b8a6" intensity={2} />
        <pointLight position={[4, -2, 3]} color="#3b82f6" intensity={2} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
        <CameraFocusController targetNode={selectedNode} />

        {CLOUD_NODES.map((node) => (
          <FloatingNodeItem
            key={node.id}
            node={node}
            isActive={selectedNode?.id === node.id}
            onSelect={(n) => setSelectedNode((prev) => (prev?.id === n.id ? null : n))}
          />
        ))}
      </Canvas>

      {/* Floating Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-4 py-1.5 rounded-full tech-surface border border-slate-700 text-xs font-mono text-teal-300 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
        <span>Click any floating 3D tech node to inspect • Drag to rotate cloud</span>
      </div>
    </div>
  );
};
