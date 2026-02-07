import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Text, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Mouse position context for VR tracking
const mousePosition = { x: 0, y: 0 };

// Professional VR Headset - Premium Design
function VRHeadset() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  
  // Memoize strap curves for performance - complete loop to back
  const leftStrapCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.12, 0.04, -0.2),
    new THREE.Vector3(-0.18, 0.06, -0.4),
    new THREE.Vector3(-0.15, 0.05, -0.6),
    new THREE.Vector3(-0.08, 0.03, -0.75),
    new THREE.Vector3(0, 0, -0.85),
  ]), []);
  
  const rightStrapCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.12, 0.04, -0.2),
    new THREE.Vector3(0.18, 0.06, -0.4),
    new THREE.Vector3(0.15, 0.05, -0.6),
    new THREE.Vector3(0.08, 0.03, -0.75),
    new THREE.Vector3(0, 0, -0.85),
  ]), []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Target rotation based on mouse (small range: -0.15 to 0.15)
      targetRotation.current.y = mousePosition.x * 0.15;
      targetRotation.current.x = mousePosition.y * 0.08;
      
      // Smooth lerp to target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.05 + targetRotation.current.x,
        0.05
      );
      
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.03;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={groupRef} position={[0, 0, 0]} rotation={[0.05, 0.2, 0]} scale={0.85}>
        
        {/* === MAIN BODY - Matte black shell === */}
        <RoundedBox args={[2.6, 1.15, 0.9]} radius={0.4} smoothness={32} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.1} 
            roughness={0.6}
          />
        </RoundedBox>
        
        {/* Body side accent - silver trim */}
        <mesh position={[0, 0, 0.35]}>
          <boxGeometry args={[2.55, 0.025, 0.2]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.15} />
        </mesh>
        
        {/* === FRONT VISOR - Glossy black panel === */}
        <RoundedBox args={[2.35, 0.95, 0.15]} radius={0.25} smoothness={16} position={[0, 0, 0.45]}>
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.95} 
            roughness={0.02}
          />
        </RoundedBox>
        
        {/* Visor glass - dark reflective */}
        <mesh position={[0, 0, 0.54]}>
          <planeGeometry args={[2.0, 0.65]} />
          <meshStandardMaterial 
            color="#050505" 
            metalness={1} 
            roughness={0.01}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* === DUAL LENSES - Professional look === */}
        {/* Left lens housing */}
        <mesh position={[-0.5, 0, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.5, 0, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#020202" metalness={1} roughness={0.01} />
        </mesh>
        {/* Left lens reflection */}
        <mesh position={[-0.42, 0.08, 0.545]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>
        
        {/* Right lens housing */}
        <mesh position={[0.5, 0, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, 0, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#020202" metalness={1} roughness={0.01} />
        </mesh>
        {/* Right lens reflection */}
        <mesh position={[0.58, 0.08, 0.545]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>
        
        {/* === NOSE BRIDGE CUTOUT === */}
        <mesh position={[0, -0.35, 0.4]}>
          <boxGeometry args={[0.35, 0.25, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.6} />
        </mesh>
        
        {/* === TRACKING SENSORS - Subtle silver dots === */}
        {[[-1.05, 0.32], [1.05, 0.32], [-1.05, -0.28], [1.05, -0.28]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.42]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        
        {/* === PREMIUM FABRIC STRAPS === */}
        {/* Left strap connector - brushed silver */}
        <mesh position={[-1.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.025, 16, 24]} />
          <meshStandardMaterial color="#808080" metalness={0.85} roughness={0.2} />
        </mesh>
        
        {/* Right strap connector - brushed silver */}
        <mesh position={[1.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.025, 16, 24]} />
          <meshStandardMaterial color="#808080" metalness={0.85} roughness={0.2} />
        </mesh>
        
        {/* Left elastic strap - dark fabric */}
        <mesh position={[-1.35, 0, 0]}>
          <tubeGeometry args={[leftStrapCurve, 48, 0.05, 12, false]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.1} 
            roughness={0.85}
          />
        </mesh>
        
        {/* Right elastic strap */}
        <mesh position={[1.35, 0, 0]}>
          <tubeGeometry args={[rightStrapCurve, 48, 0.05, 12, false]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.1} 
            roughness={0.85}
          />
        </mesh>
        
        {/* Back head cradle - complete band */}
        <RoundedBox args={[0.8, 0.35, 0.15]} radius={0.06} position={[0, 0, -1.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
        </RoundedBox>
        
        {/* Back padding cushion */}
        <RoundedBox args={[0.6, 0.25, 0.08]} radius={0.04} position={[0, 0, -1.12]}>
          <meshStandardMaterial color="#0d0d0d" metalness={0} roughness={1} />
        </RoundedBox>
        
        {/* Top head strap */}
        <mesh position={[0, 0.45, -0.4]} rotation={[Math.PI / 2.5, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.9, 8, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.1} roughness={0.85} />
        </mesh>
        
        {/* Strap adjustment slider - left - silver */}
        <RoundedBox args={[0.18, 0.1, 0.06]} radius={0.02} position={[-1.15, 0, -0.5]}>
          <meshStandardMaterial color="#606060" metalness={0.7} roughness={0.25} />
        </RoundedBox>
        
        {/* Strap adjustment slider - right - silver */}
        <RoundedBox args={[0.18, 0.1, 0.06]} radius={0.02} position={[1.15, 0, -0.5]}>
          <meshStandardMaterial color="#606060" metalness={0.7} roughness={0.25} />
        </RoundedBox>
        
        {/* === FACE CUSHION - Soft black foam === */}
        <mesh position={[0, 0, -0.4]}>
          <boxGeometry args={[2.2, 0.85, 0.12]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0} roughness={1} />
        </mesh>
        
        {/* Cushion edge */}
        <mesh position={[0, 0, -0.35]}>
          <torusGeometry args={[0.95, 0.08, 8, 32]} />
          <meshStandardMaterial color="#151515" metalness={0} roughness={1} />
        </mesh>
        
        {/* === SIDE CONTROLS === */}
        {/* Power button with LED */}
        <group position={[1.32, 0.38, 0.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 0.06, 24]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* LED indicator - white */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.035, 0, 0]}>
            <torusGeometry args={[0.035, 0.005, 8, 24]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
        
        {/* Volume rocker */}
        <mesh position={[-1.32, 0.25, 0.1]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.025, 0.12, 8, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.4} />
        </mesh>
        
        {/* === BRANDING === */}
        {/* Silver accent line */}
        <mesh position={[0, -0.5, 0.42]}>
          <boxGeometry args={[1.0, 0.02, 0.015]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Top accent line */}
        <mesh position={[0, 0.5, 0.42]}>
          <boxGeometry args={[0.8, 0.015, 0.015]} />
          <meshStandardMaterial color="#808080" metalness={0.8} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

// Welcome text floating above
function WelcomeText() {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });
  
  return (
    <group ref={textRef} position={[0, 1.35, 0.5]}>
      <Text
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        WELCOME TO
        <meshBasicMaterial color="#888888" />
      </Text>
      <Text
        position={[0, -0.32, 0]}
        fontSize={0.38}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        THIRAN'26
        <meshBasicMaterial color="#ffffff" />
      </Text>
      {/* Underline accent */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[1.3, 0.012, 0.01]} />
        <meshBasicMaterial color="#666666" />
      </mesh>
    </group>
  );
}

// Floating particles - optimized
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(20 * 3);
    for (let i = 0; i < 20; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return pos;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={20}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#606060" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Glow ring behind headset
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0.2, -1.5]} rotation={[0.1, 0, 0]}>
      <torusGeometry args={[2.2, 0.008, 8, 32]} />
      <meshBasicMaterial color="#808080" transparent opacity={0.3} />
    </mesh>
  );
}

// VR Grid floor effect
function VRGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
    }
  });
  
  return (
    <group ref={gridRef} position={[0, -2, -3]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* Grid lines - reduced for performance */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`h-${i}`} position={[0, i * 1 - 4, 0]}>
          <boxGeometry args={[10, 0.01, 0.01]} />
          <meshBasicMaterial color="#404040" transparent opacity={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`v-${i}`} position={[i * 1.2 - 4.2, 0, 0]}>
          <boxGeometry args={[0.01, 8, 0.01]} />
          <meshBasicMaterial color="#404040" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Floating elements removed for performance
function VRFloatingElements() {
  return null;
}

export default function Thiran3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position to -1 to 1
      mousePosition.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mousePosition.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    
    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      mousePosition.x = 0;
      mousePosition.y = 0;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px] relative cursor-crosshair">
      {/* Minimal background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal accent lines */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/10 to-transparent" />
      </div>
      
      <Canvas
        camera={{ position: [0, 0.2, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Professional studio lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Key light - main illumination */}
        <directionalLight 
          position={[5, 5, 6]} 
          intensity={1.0} 
          color="#ffffff"
        />
        
        {/* Fill light - soften shadows */}
        <directionalLight 
          position={[-4, 2, 4]} 
          intensity={0.3} 
          color="#e8e8e8" 
        />
        
        {/* Rim light - subtle edge highlight */}
        <directionalLight 
          position={[0, 3, -4]} 
          intensity={0.4} 
          color="#ffffff" 
        />
        
        {/* Front light for lens reflections */}
        <pointLight position={[0, 0.5, 4]} intensity={0.3} color="#ffffff" distance={6} />
        
        {/* Welcome Text */}
        <WelcomeText />
        
        {/* VR Headset */}
        <VRHeadset />
        
        {/* Effects */}
        <Particles />
        <GlowRing />
        
        {/* Drag Controls - limited rotation */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
      
      {/* Status indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-gray-500/50 font-mono">
        <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-pulse" />
        VR READY
      </div>
      
      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 font-mono">
        drag to rotate
      </div>
    </div>
  );
}

