import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    
    gsap.to(buttonRef.current, {
      x: distanceX,
      y: distanceY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    setIsHovered(false);
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-cyan opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-cyan rounded-xl blur-lg"
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
