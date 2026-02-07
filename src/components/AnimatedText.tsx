import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      <span className="inline-block" style={{ perspective: '1000px' }}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="char inline-block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  );
}

export function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-cosmic-cyan opacity-0"
        variants={{
          hover: {
            opacity: [0, 1, 0],
            x: [-2, 2, 0],
            transition: { duration: 0.3, repeat: Infinity },
          },
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-cosmic-pink opacity-0"
        variants={{
          hover: {
            opacity: [0, 1, 0],
            x: [2, -2, 0],
            transition: { duration: 0.3, repeat: Infinity, delay: 0.1 },
          },
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelector('.reveal-inner'),
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="reveal-inner">{text}</div>
    </div>
  );
}

export function TypewriterText({ text, className = '', speed = 50 }: { text: string; className?: string; speed?: number }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let currentIndex = 0;
    const element = containerRef.current;
    element.textContent = '';
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            if (currentIndex < text.length) {
              element.textContent += text[currentIndex];
              currentIndex++;
            } else {
              clearInterval(interval);
            }
          }, speed);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={containerRef} className={className}>
      {text}
    </span>
  );
}
