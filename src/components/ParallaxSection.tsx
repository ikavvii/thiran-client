import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.to(contentRef.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

export function ParallaxOrb({ 
  color, 
  size, 
  position, 
  speed = 0.3 
}: { 
  color: 'purple' | 'pink' | 'cyan'; 
  size: string; 
  position: string; 
  speed?: number;
}) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current) return;

    gsap.to(orbRef.current, {
      y: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: orbRef.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  const colorMap = {
    purple: 'bg-cosmic-purple/20',
    pink: 'bg-cosmic-pink/15',
    cyan: 'bg-cosmic-cyan/10',
  };

  return (
    <div
      ref={orbRef}
      className={`absolute ${colorMap[color]} rounded-full blur-[40px] pointer-events-none ${size} ${position}`}
    />
  );
}
