import { useRef, ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlassCard({ children, className = '', glowColor = 'purple' }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const glowColors = {
    purple: 'from-cosmic-purple/30 via-cosmic-pink/20 to-transparent',
    pink: 'from-cosmic-pink/30 via-cosmic-purple/20 to-transparent',
    cyan: 'from-cosmic-cyan/30 via-cosmic-purple/20 to-transparent',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    rotateX.set(-percentY * 10);
    rotateY.set(percentX * 10);
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const background = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      hsl(var(--cosmic-${glowColor}) / 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-cyan opacity-50" />
      
      {/* Glass background */}
      <div className="relative glass-strong rounded-2xl h-full">
        {/* Mouse follow glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ background }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
