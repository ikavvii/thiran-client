import { motion } from 'framer-motion';

export default function ARGridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Perspective grid floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-20"
        style={{
          background: `
            linear-gradient(90deg, hsl(187 94% 55% / 0.3) 1px, transparent 1px),
            linear-gradient(0deg, hsl(187 94% 55% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom center',
        }}
      />
      
      {/* Floating UI elements */}
      <motion.div
        className="absolute top-20 left-10 glass rounded-lg p-3 border border-cosmic-cyan/30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cosmic-cyan animate-pulse" />
          <span className="text-[10px] text-cosmic-cyan font-mono">AR MODE</span>
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-10 glass rounded-lg p-3 border border-cosmic-purple/30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cosmic-purple animate-pulse" />
          <span className="text-[10px] text-cosmic-purple font-mono">IMMERSIVE</span>
        </div>
      </motion.div>
      
      {/* Corner brackets - AR style targeting */}
      <svg className="absolute top-1/4 left-1/4 w-16 h-16 text-cosmic-cyan/40" viewBox="0 0 64 64">
        <motion.path
          d="M0 16 L0 0 L16 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
      </svg>
      
      <svg className="absolute top-1/4 right-1/4 w-16 h-16 text-cosmic-cyan/40" viewBox="0 0 64 64">
        <motion.path
          d="M64 16 L64 0 L48 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        />
      </svg>
      
      <svg className="absolute bottom-1/3 left-1/4 w-16 h-16 text-cosmic-pink/40" viewBox="0 0 64 64">
        <motion.path
          d="M0 48 L0 64 L16 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        />
      </svg>
      
      <svg className="absolute bottom-1/3 right-1/4 w-16 h-16 text-cosmic-pink/40" viewBox="0 0 64 64">
        <motion.path
          d="M64 48 L64 64 L48 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />
      </svg>
      
      {/* Floating data points */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cosmic-cyan"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
      
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cosmic-cyan/50 to-transparent"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
