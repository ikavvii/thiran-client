import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingGeometry from './FloatingGeometry';

function AnimatedStars() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={1500}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[-5, 2, -10]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={3}>
        <mesh position={[5, -2, -15]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.5} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh position={[0, 3, -20]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
      </Float>
    </>
  );
}

function CosmicSparkles() {
  return (
    <>
      <Sparkles count={25} scale={20} size={2} speed={0.5} color="#c084fc" opacity={0.5} />
      <Sparkles count={15} scale={15} size={3} speed={0.3} color="#f472b6" opacity={0.4} />
    </>
  );
}

function NebulaCloud() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#7c3aed') },
    uColor2: { value: new THREE.Color('#ec4899') },
    uColor3: { value: new THREE.Color('#06b6d4') },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Float speed={0.5} floatIntensity={1} rotationIntensity={0.2}>
      <mesh ref={meshRef} position={[0, 0, -30]} scale={15}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial 
          color="#7c3aed" 
          transparent 
          opacity={0.04} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + Math.random() * 1.5, []);
  const startX = useMemo(() => -20 + Math.random() * 40, []);
  const startY = useMemo(() => 5 + Math.random() * 10, []);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed) % 8);
    if (t < 1.5) {
      ref.current.visible = true;
      ref.current.position.x = startX + t * 15;
      ref.current.position.y = startY - t * 8;
      ref.current.position.z = -10 - Math.random() * 5;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(t / 1.5 * Math.PI) * 0.8;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} />
    </mesh>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#c084fc" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f472b6" />
          <pointLight position={[0, 5, -5]} intensity={0.2} color="#22d3ee" />
          <AnimatedStars />
          <FloatingOrbs />
          <FloatingGeometry />
          <CosmicSparkles />
          <NebulaCloud />
          {/* Shooting stars */}
          {Array.from({ length: 3 }).map((_, i) => (
            <ShootingStar key={i} />
          ))}
        </Suspense>
      </Canvas>
      {/* Gradient overlays - brighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cosmic-purple/25 rounded-full blur-[40px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-pink/20 rounded-full blur-[40px] pointer-events-none animate-float" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cosmic-cyan/15 rounded-full blur-[40px] pointer-events-none animate-pulse-glow" />
      {/* Morphing orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none animate-morph" 
        style={{
          background: 'radial-gradient(ellipse, hsl(270 91% 65% / 0.08) 0%, hsl(330 81% 60% / 0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(270 91% 65% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(270 91% 65% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
