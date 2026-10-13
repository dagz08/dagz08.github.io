import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BadgeConfig {
  name: string;
  category: string;
  color: string;
  glow: string;
  shape: 'hex' | 'circle' | 'rounded';
  orbitRadius: number;
  speed: number;
  scale: number;
  initialAngle: number;
  yOffset: number;
}

const BADGE_CONFIGS: BadgeConfig[] = [
  { name: '.NET 9', category: 'Core Runtime', color: '#7c3db5', glow: '#a855f7', shape: 'hex', orbitRadius: 3.6, speed: 0.38, scale: 1.15, initialAngle: 0, yOffset: 0.2 },
  { name: 'C#', category: 'Language', color: '#15803d', glow: '#22c55e', shape: 'hex', orbitRadius: 3.6, speed: 0.38, scale: 1.1, initialAngle: (Math.PI * 2) / 3, yOffset: -0.2 },
  { name: 'Azure', category: 'Cloud Infrastructure', color: '#0284c7', glow: '#38bdf8', shape: 'rounded', orbitRadius: 3.6, speed: 0.38, scale: 1.1, initialAngle: (Math.PI * 4) / 3, yOffset: 0.1 },

  { name: 'React', category: 'Modern Frontend', color: '#0891b2', glow: '#06b6d4', shape: 'circle', orbitRadius: 5.2, speed: 0.26, scale: 1.05, initialAngle: 0.5, yOffset: -0.3 },
  { name: 'SQL Server', category: 'Database Engine', color: '#b91c1c', glow: '#ef4444', shape: 'rounded', orbitRadius: 5.2, speed: 0.26, scale: 1.05, initialAngle: 0.5 + (Math.PI * 2) / 4, yOffset: 0.3 },
  { name: 'Docker', category: 'Containers', color: '#1d4ed8', glow: '#3b82f6', shape: 'rounded', orbitRadius: 5.2, speed: 0.26, scale: 1.05, initialAngle: 0.5 + (Math.PI * 4) / 4, yOffset: -0.1 },
  { name: 'Microservices', category: 'Distributed Arch', color: '#0f766e', glow: '#14b8a6', shape: 'rounded', orbitRadius: 5.2, speed: 0.26, scale: 1.05, initialAngle: 0.5 + (Math.PI * 6) / 4, yOffset: 0.2 },

  { name: 'EF Core', category: 'ORM & Data', color: '#4338ca', glow: '#6366f1', shape: 'circle', orbitRadius: 6.8, speed: 0.18, scale: 1.0, initialAngle: 1.1, yOffset: 0.4 },
  { name: 'REST / Minimal', category: 'Web APIs', color: '#16a34a', glow: '#4ade80', shape: 'rounded', orbitRadius: 6.8, speed: 0.18, scale: 1.0, initialAngle: 1.1 + (Math.PI * 2) / 3, yOffset: -0.4 },
  { name: 'Angular', category: 'Frontend Framework', color: '#be123c', glow: '#f43f5e', shape: 'hex', orbitRadius: 6.8, speed: 0.18, scale: 1.0, initialAngle: 1.1 + (Math.PI * 4) / 3, yOffset: 0.2 },
];

function createBadgeTexture(badge: BadgeConfig): THREE.CanvasTexture {
  const S = 256;
  const cx = 128;
  const cy = 128;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d')!;

  // Subtle outer aura
  const aura = ctx.createRadialGradient(cx, cy, 30, cx, cy, 115);
  aura.addColorStop(0, badge.glow + '44');
  aura.addColorStop(1, 'transparent');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, S, S);

  // Background shape
  ctx.save();
  ctx.beginPath();
  if (badge.shape === 'hex') {
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 30);
      const x = cx + 85 * Math.cos(a);
      const y = cy + 85 * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  } else if (badge.shape === 'circle') {
    ctx.arc(cx, cy, 84, 0, Math.PI * 2);
  } else {
    // Rounded rect
    const r = 32, x = 24, y = 24, w = S - 48, h = S - 48;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }
  ctx.closePath();

  // Glass gradient fill
  const grad = ctx.createLinearGradient(cx - 70, cy - 70, cx + 70, cy + 70);
  grad.addColorStop(0, badge.color + 'dd');
  grad.addColorStop(1, '#090d16ee');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = badge.glow;
  ctx.lineWidth = 4;
  ctx.shadowColor = badge.glow;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.restore();

  // Badge Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 8;
  ctx.fillText(badge.name, cx, cy - 6);

  // Subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.shadowBlur = 0;
  ctx.fillText(badge.category, cx, cy + 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 8, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 12, 7);
    scene.add(dirLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 3, 20);
    tealLight.position.set(-4, 2, 3);
    scene.add(tealLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 2.5, 20);
    purpleLight.position.set(4, -2, 3);
    scene.add(purpleLight);

    // Center Core: Holographic Enterprise Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      emissive: 0x0f766e,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Outer wireframe cage
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const outerCage = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCage);

    // Core point light
    const coreLight = new THREE.PointLight(0x2dd4bf, 3, 8);
    coreGroup.add(coreLight);

    // Orbit Rings
    const orbitRadii = [3.6, 5.2, 6.8];
    const ringColors = [0x14b8a6, 0x3b82f6, 0x8b5cf6];

    orbitRadii.forEach((r, idx) => {
      const ringPts: THREE.Vector3[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringMat = new THREE.LineBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: 0.25,
      });
      scene.add(new THREE.Line(ringGeo, ringMat));
    });

    // Orbiting Badges
    const badgeMeshes: { mesh: THREE.Mesh; config: BadgeConfig; angle: number }[] = [];

    BADGE_CONFIGS.forEach((config) => {
      const texture = createBadgeTexture(config);
      const size = 1.35 * config.scale;
      const geometry = new THREE.PlaneGeometry(size, size);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.3,
        alphaTest: 0.05,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { config };

      scene.add(mesh);
      badgeMeshes.push({
        mesh,
        config,
        angle: config.initialAngle,
      });
    });

    // Ambient floating cyber particles
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.06,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interaction for smooth parallax
    let targetCameraX = 0;
    let targetCameraY = 8;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      targetCameraX = x * 2.5;
      targetCameraY = 8 + y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Raycaster for badge hover
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleHoverCheck = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setHoveredBadge(null);
        return;
      }
      mouseVector.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / height) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);

      const intersects = raycaster.intersectObjects(badgeMeshes.map((b) => b.mesh));
      if (intersects.length > 0) {
        const top = intersects[0].object as THREE.Mesh;
        const cfg = top.userData.config as BadgeConfig;
        setHoveredBadge(`${cfg.name} • ${cfg.category}`);
      } else {
        setHoveredBadge(null);
      }
    };

    window.addEventListener('mousemove', handleHoverCheck);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      // Parallax smooth camera glide
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate central core
      innerCore.rotation.x += 0.4 * dt;
      innerCore.rotation.y += 0.6 * dt;
      outerCage.rotation.x -= 0.2 * dt;
      outerCage.rotation.y -= 0.3 * dt;
      coreGroup.position.y = Math.sin(t * 1.2) * 0.15;

      // Rotate particle cloud gently
      particles.rotation.y = t * 0.03;

      // Update badge orbits
      badgeMeshes.forEach(({ mesh, config }, idx) => {
        const currentAngle = config.initialAngle + t * config.speed;
        const x = Math.cos(currentAngle) * config.orbitRadius;
        const z = Math.sin(currentAngle) * config.orbitRadius;
        const y = config.yOffset + Math.sin(t * 2 + idx) * 0.12;

        mesh.position.set(x, y, z);
        mesh.lookAt(camera.position); // Always face camera
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleHoverCheck);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] flex items-center justify-center">
      {/* Three.js container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-teal-500/30 text-xs font-mono text-teal-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>{hoveredBadge ? hoveredBadge : 'Interactive 3D Core • Hover or move mouse to inspect'}</span>
        </div>
      </div>
    </div>
  );
};
