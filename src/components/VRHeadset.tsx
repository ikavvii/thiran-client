import { motion } from 'framer-motion';

export default function VRHeadset({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 120"
      className={`${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <defs>
        {/* Gradient for the headset body */}
        <linearGradient id="headsetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(270 91% 65%)" />
          <stop offset="50%" stopColor="hsl(330 81% 60%)" />
          <stop offset="100%" stopColor="hsl(187 94% 43%)" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Lens gradient */}
        <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(187 94% 55%)" stopOpacity="0.8" />
          <stop offset="70%" stopColor="hsl(270 91% 65%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(330 81% 60%)" stopOpacity="0.4" />
        </radialGradient>
        
        {/* Scan line pattern */}
        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
          <line x1="0" y1="0" x2="4" y2="0" stroke="hsl(187 94% 55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        </pattern>
      </defs>
      
      {/* Main headset body */}
      <motion.path
        d="M20 45 Q20 25, 50 25 L150 25 Q180 25, 180 45 L180 75 Q180 95, 150 95 L50 95 Q20 95, 20 75 Z"
        fill="url(#headsetGradient)"
        fillOpacity="0.15"
        stroke="url(#headsetGradient)"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      
      {/* Left lens */}
      <motion.ellipse
        cx="70"
        cy="60"
        rx="30"
        ry="25"
        fill="url(#lensGradient)"
        stroke="hsl(187 94% 55%)"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      
      {/* Right lens */}
      <motion.ellipse
        cx="130"
        cy="60"
        rx="30"
        ry="25"
        fill="url(#lensGradient)"
        stroke="hsl(187 94% 55%)"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
      
      {/* Scan lines on lenses */}
      <ellipse cx="70" cy="60" rx="28" ry="23" fill="url(#scanlines)" />
      <ellipse cx="130" cy="60" rx="28" ry="23" fill="url(#scanlines)" />
      
      {/* Center bridge */}
      <motion.rect
        x="95"
        y="50"
        width="10"
        height="20"
        rx="2"
        fill="hsl(270 91% 65%)"
        fillOpacity="0.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
      
      {/* Strap indicators */}
      <motion.path
        d="M20 55 L5 50 L5 70 L20 65"
        stroke="url(#headsetGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      <motion.path
        d="M180 55 L195 50 L195 70 L180 65"
        stroke="url(#headsetGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      
      {/* Decorative circuit lines */}
      <motion.path
        d="M50 30 L50 20 L70 20 M130 20 L150 20 L150 30"
        stroke="hsl(187 94% 55%)"
        strokeWidth="1"
        strokeOpacity="0.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      
      {/* Pulsing power indicator */}
      <motion.circle
        cx="100"
        cy="95"
        r="3"
        fill="hsl(187 94% 55%)"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}
