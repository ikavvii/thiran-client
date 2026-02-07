import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
}

export default function ShinyText({
  text,
  className = "",
  shimmerWidth = 100,
  speed = 2,
}: ShinyTextProps) {
  return (
    <motion.span
      className={`inline-block relative ${className}`}
      style={{
        backgroundImage: `linear-gradient(
          120deg,
          rgba(255, 255, 255, 0) 40%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0) 60%
        )`,
        backgroundSize: `${shimmerWidth}% 100%`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "inherit",
      }}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
