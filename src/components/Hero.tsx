import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronDown, Calendar, MapPin, Sparkles, Box, Scan, Zap } from 'lucide-react';
import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { useCountdown } from '@/hooks/useCountdown';
import { DecryptedText, BlurText, GradientText } from './reactbits';

// Animated number counter
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(count, value, { duration: 0.5 });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return <span>{displayValue.toString().padStart(2, '0')}</span>;
}

function CountdownBox({ value, label, index }: { value: number; label: string; index: number }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value && boxRef.current) {
      gsap.fromTo(
        boxRef.current.querySelector('.countdown-value'),
        { scale: 1.2, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
    prevValue.current = value;
  }, [value]);

  return (
    <motion.div 
      ref={boxRef}
      className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 30, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="relative glass rounded-xl p-3 sm:p-4 md:p-6 min-w-[60px] sm:min-w-[70px] md:min-w-[90px] overflow-hidden transition-all duration-300 group-hover:bg-white/10">
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-cyan animate-spin-slow" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-xl bg-background" />
        </div>
        
        <span className="countdown-value relative z-10 text-2xl sm:text-3xl md:text-5xl font-bold gradient-text">
          <AnimatedCounter value={value} />
        </span>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

// Floating orb component
function FloatingOrb({ delay, size, color, position }: { delay: number; size: string; color: string; position: string }) {
  return (
    <motion.div
      className={`absolute ${size} ${color} rounded-full blur-[30px] ${position}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        y: [0, -30, 0],
      }}
      transition={{
        delay,
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Particle effect - optimized
function Particles() {
  const particles = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Animated grid lines
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Perspective grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%),
            linear-gradient(90deg, hsl(270 91% 65% / 0.15) 1px, transparent 1px),
            linear-gradient(0deg, hsl(270 91% 65% / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          height: '200%',
          top: '50%',
        }}
      />
    </div>
  );
}

// Cyber lines effect
function CyberLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cosmic-cyan/50 to-transparent"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Vertical accent lines */}
      <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cosmic-purple/20 to-transparent" />
      <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cosmic-pink/20 to-transparent" />
      <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cosmic-cyan/10 to-transparent" />
      <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cosmic-purple/10 to-transparent" />
    </div>
  );
}

// Floating geometric shapes - optimized
function FloatingShapes() {
  const shapes = useMemo(() => [
    { type: 'ring', size: 50, x: 15, y: 25, duration: 20, delay: 0 },
    { type: 'square', size: 25, x: 85, y: 75, duration: 18, delay: 1 },
    { type: 'ring', size: 35, x: 90, y: 20, duration: 22, delay: 2 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8],
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {shape.type === 'ring' && (
            <div 
              className="rounded-full border border-cosmic-purple/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'square' && (
            <div 
              className="border border-cosmic-cyan/30 rotate-45"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && (
            <div 
              className="border-l border-b border-cosmic-pink/30"
              style={{ 
                width: 0, 
                height: 0, 
                borderLeftWidth: shape.size / 2,
                borderRightWidth: shape.size / 2,
                borderBottomWidth: shape.size,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'hsl(330 81% 68% / 0.3)',
              }}
            />
          )}
          {shape.type === 'hexagon' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <polygon 
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
                fill="none" 
                stroke="hsl(270 91% 65% / 0.3)" 
                strokeWidth="1"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Glowing orbs - simplified with CSS only (no JS animation for performance)
function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main orb - CSS animation only */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] animate-pulse-slow">
        <div className="w-full h-full rounded-full bg-cosmic-purple/20 blur-[40px]" />
      </div>
      
      {/* Secondary orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] animate-float">
        <div className="w-full h-full rounded-full bg-cosmic-pink/15 blur-[40px]" />
      </div>
    </div>
  );
}

// Starfield background - optimized
function Starfield() {
  const stars = useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`, 
            width: star.size, 
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 2, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// VR Headset wireframe decoration - simplified static version
function VRWireframe() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
        viewBox="0 0 800 600"
        fill="none"
      >
        {/* Static VR outline - no animations */}
        <ellipse cx="400" cy="300" rx="280" ry="140" stroke="url(#vrGradient)" strokeWidth="1" />
        <circle cx="300" cy="300" r="70" stroke="url(#vrGradient)" strokeWidth="1" />
        <circle cx="500" cy="300" r="70" stroke="url(#vrGradient)" strokeWidth="1" />
        <defs>
          <linearGradient id="vrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 91% 65%)" />
            <stop offset="100%" stopColor="hsl(187 94% 55%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Noise texture overlay
function NoiseOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eventDate = useMemo(() => new Date('2026-02-23T10:00:00'), []);
  const timeLeft = useCountdown(eventDate);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    // Animate each letter of THIRAN individually
    const titleChars = titleRef.current?.querySelectorAll('.hero-char');

    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(
      '.hero-badge',
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    // Animate title characters with 3D rotation
    if (titleChars && titleChars.length > 0) {
      tl.fromTo(
        titleChars,
        { 
          opacity: 0, 
          y: 80, 
          rotateX: -90,
          scale: 0.5,
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );
    }

    tl.fromTo(
      '.hero-year',
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      '-=0.4'
    )
    .fromTo(
      '.hero-tagline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      '.hero-description',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      '.hero-info-badge',
      { opacity: 0, y: 20, x: -20 },
      { opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(
      '.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.2'
    );

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to('.parallax-slow', {
        x: xPercent * 20,
        y: yPercent * 20,
        duration: 1,
        ease: 'power2.out',
      });
      
      gsap.to('.parallax-fast', {
        x: xPercent * 40,
        y: yPercent * 40,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleText = 'THIRAN';

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-background via-background to-cosmic-surface/50"
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,50,200,0.15),transparent)]" />
      
      {/* Starfield */}
      <Starfield />
      
      {/* VR Wireframe decoration */}
      <VRWireframe />
      
      {/* Perspective grid */}
      <AnimatedGrid />
      
      {/* Cyber lines */}
      <CyberLines />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      {/* Floating particles */}
      <Particles />
      
      {/* Glowing orbs */}
      <GlowingOrbs />

      {/* Animated background orbs with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingOrb delay={0} size="w-40 h-40" color="bg-cosmic-purple/40" position="top-20 left-10" />
        <FloatingOrb delay={1} size="w-32 h-32" color="bg-cosmic-pink/50" position="top-40 right-20" />
        <FloatingOrb delay={2} size="w-48 h-48" color="bg-cosmic-cyan/30" position="bottom-40 left-1/4" />
        <FloatingOrb delay={0.5} size="w-24 h-24" color="bg-cosmic-purple/30" position="bottom-20 right-1/4" />
        <FloatingOrb delay={1.5} size="w-36 h-36" color="bg-cosmic-pink/25" position="top-1/3 left-1/3" />
        
        {/* Parallax layers */}
        <div className="parallax-slow absolute top-20 left-10 w-32 h-32 bg-cosmic-purple/30 rounded-full blur-[30px]" />
        <div className="parallax-fast absolute top-40 right-20 w-24 h-24 bg-cosmic-pink/40 rounded-full blur-[25px]" />
        <div className="parallax-slow absolute bottom-40 left-1/4 w-40 h-40 bg-cosmic-cyan/20 rounded-full blur-[30px]" />
      </div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)] pointer-events-none" />
      
      {/* Noise texture */}
      <NoiseOverlay />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)',
      }} />

      {/* Content */}
      <div ref={contentRef} className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge with DecryptedText */}
          <motion.div 
            className="hero-badge inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 cursor-pointer hover:bg-white/10 transition-all duration-300 opacity-0 border border-cosmic-cyan/30"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(187 94% 55% / 0.3)" }}
          >
            <span className="text-sm text-cosmic-cyan font-mono tracking-wider">
              <DecryptedText 
                text="THe IntRa collegiate AreNa" 
                speed={30} 
                maxIterations={15}
                characters="THIRAN0123456789!@#$%"
              />
            </span>
          </motion.div>

          {/* Main Title - Direct GSAP character animation */}
          <div className="mb-6" style={{ perspective: '1000px' }}>
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {titleText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="hero-char inline-block opacity-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(270 91% 72%), hsl(330 81% 68%), hsl(187 94% 55%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px hsl(270 91% 65% / 0.6))',
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.span 
              className="hero-year block text-2xl md:text-4xl font-bold tracking-[0.3em] mt-1 opacity-0"
              style={{
                background: 'linear-gradient(90deg, hsl(187 94% 55%), hsl(330 81% 68%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px hsl(187 94% 43% / 0.6))',
              }}
              whileHover={{ scale: 1.1, letterSpacing: "0.4em" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              '26
            </motion.span>
          </div>

          {/* Tagline with animated words */}
          <motion.p 
            className="hero-tagline text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-4 opacity-0 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span 
              className="text-cosmic-cyan inline-block"
              animate={{ 
                textShadow: [
                  "0 0 10px hsl(187 94% 55% / 0.5)",
                  "0 0 20px hsl(187 94% 55% / 0.8)",
                  "0 0 10px hsl(187 94% 55% / 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Enter
            </motion.span>
            {" "}the Future of{" "}
            <motion.span 
              className="text-cosmic-pink inline-block"
              animate={{ 
                textShadow: [
                  "0 0 10px hsl(330 81% 68% / 0.5)",
                  "0 0 20px hsl(330 81% 68% / 0.8)",
                  "0 0 10px hsl(330 81% 68% / 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              Reality
            </motion.span>
          </motion.p>

          {/* Subtitle with BlurText */}
          <div className="hero-description text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0">
            <BlurText 
              text="Dive into an extraordinary world where AR and VR reshape technology. Experience immersive workshops, cutting-edge demos, and connect with XR pioneers."
              delay={30}
              duration={0.4}
            />
          </div>

          {/* Event Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            {[
              { icon: Calendar, text: "February 23, 2026", color: "cosmic-purple" },
              { icon: MapPin, text: "MCA Block, PSG Tech Campus", color: "cosmic-pink" },
              { icon: Box, text: "AR/VR Experience Zone", color: "cosmic-cyan" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className={`hero-info-badge flex items-center gap-2 glass rounded-full px-4 py-2 cursor-pointer transition-all duration-300 opacity-0 border border-${item.color}/20`}
                whileHover={{ 
                  scale: 1.08, 
                  y: -3,
                  boxShadow: `0 10px 30px hsl(var(--${item.color}) / 0.2)` 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className={`w-4 h-4 text-${item.color}`} />
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <motion.div 
              className="hero-cta opacity-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MagneticButton className="btn-cosmic text-white text-lg">
                <a href="#events" className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Scan className="w-5 h-5" />
                  </motion.span>
                  Enter Experience
                </a>
              </MagneticButton>
            </motion.div>
            <motion.div 
              className="hero-cta opacity-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MagneticButton className="btn-cosmic-outline text-white text-lg">
                <a href="#contact" className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.span>
                  Get Access
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Countdown Timer */}
          <div>
            <motion.p 
              className="text-sm mb-4 uppercase tracking-widest font-mono"
              animate={{ 
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GradientText 
                text="[ LAUNCHING IN ]" 
                colors={["#22d3ee", "#c084fc", "#f472b6", "#22d3ee"]}
                animationSpeed={3}
              />
            </motion.p>
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-6" role="timer" aria-label="Countdown to event">
              <CountdownBox value={timeLeft.days} label="Days" index={0} />
              <CountdownBox value={timeLeft.hours} label="Hours" index={1} />
              <CountdownBox value={timeLeft.minutes} label="Minutes" index={2} />
              <CountdownBox value={timeLeft.seconds} label="Seconds" index={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#events"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        whileHover={{ y: 5 }}
        aria-label="Scroll to events section"
      >
        <motion.span 
          className="text-xs uppercase tracking-widest group-hover:text-cosmic-cyan transition-colors"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
