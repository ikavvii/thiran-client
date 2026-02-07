import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function WobblingSphere({ position, color, speed = 1, size = 0.5 }: { position: [number, number, number]; color: string; speed?: number; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 2]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function GlowingRing({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.1, 8, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorusKnot({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.4, 0.15, 48, 8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 50;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const colorOptions = [
      new THREE.Color('#a855f7'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#06b6d4'),
    ];
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function FloatingGeometry() {
  return (
    <>
      {/* Wobbling Spheres - reduced to 1 */}
      <WobblingSphere position={[-8, 3, -15]} color="#a855f7" speed={1.2} size={0.8} />
      
      {/* Glowing Rings - reduced to 1 */}
      <GlowingRing position={[-5, -3, -18]} color="#a855f7" size={1.2} />
      
      {/* Torus Knots - reduced to 1 */}
      <FloatingTorusKnot position={[0, -4, -15]} color="#06b6d4" />
      
      {/* Particle Field */}
      <ParticleField />
    </>
  );
}
