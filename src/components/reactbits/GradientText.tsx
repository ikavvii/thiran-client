import { motion } from "framer-motion";

interface GradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  text,
  className = "",
  colors = ["#c084fc", "#f472b6", "#22d3ee", "#c084fc"],
  animationSpeed = 5,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
  };

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={gradientStyle}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {showBorder && (
        <span
          className="absolute inset-0 bg-clip-text text-transparent blur-sm"
          style={gradientStyle}
        >
          {text}
        </span>
      )}
      {text}
    </motion.span>
  );
}
