import { motion } from 'framer-motion';

interface HolographicTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function HolographicText({ text, className = '', delay = 0 }: HolographicTextProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Glitch layers */}
      <span
        className="absolute inset-0 text-cosmic-cyan opacity-70"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          transform: 'translate(-2px, 0)',
          animation: 'glitch1 2.5s infinite',
        }}
      >
        {text}
      </span>
      <span
        className="absolute inset-0 text-cosmic-pink opacity-70"
        style={{
          clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)',
          transform: 'translate(2px, 0)',
          animation: 'glitch2 3s infinite',
        }}
      >
        {text}
      </span>
      
      {/* Main text */}
      <span
        className="relative"
        style={{
          background: 'linear-gradient(135deg, hsl(270 91% 72%), hsl(330 81% 68%), hsl(187 94% 55%))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px hsl(270 91% 65% / 0.6))',
        }}
      >
        {text}
      </span>
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
      
      <style>{`
        @keyframes glitch1 {
          0%, 100% { transform: translate(-2px, 0); }
          20% { transform: translate(2px, -1px); }
          40% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, 0); }
          80% { transform: translate(-2px, -1px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translate(2px, 0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, 0); }
        }
      `}</style>
    </motion.div>
  );
}
