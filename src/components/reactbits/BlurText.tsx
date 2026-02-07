import { motion } from "framer-motion";
import { useMemo } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

export default function BlurText({
  text,
  className = "",
  delay = 100,
  duration = 0.5,
  yOffset = 20,
  once = true,
}: BlurTextProps) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0, 
            y: yOffset, 
            filter: "blur(10px)" 
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)" 
          }}
          viewport={{ once }}
          transition={{
            duration,
            delay: index * (delay / 1000),
            ease: "easeOut",
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
