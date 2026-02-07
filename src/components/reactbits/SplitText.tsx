import { useMemo } from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 0.5,
  ease = "easeOut",
  splitType = "chars",
  once = true,
}: SplitTextProps) {
  const items = useMemo(() => {
    if (splitType === "words") {
      return text.split(" ");
    }
    return text.split("");
  }, [text, splitType]);

  return (
    <span className={className}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once }}
          transition={{
            duration,
            delay: index * (delay / 1000),
            ease,
          }}
          className="inline-block"
          style={{ whiteSpace: item === " " ? "pre" : "normal" }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </span>
  );
}
