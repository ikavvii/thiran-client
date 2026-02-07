import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  revealDirection?: "start" | "end" | "center";
  onComplete?: () => void;
  triggerOnView?: boolean;
}

export default function DecryptedText({
  text,
  className = "",
  speed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  revealDirection = "start",
  onComplete,
  triggerOnView = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const decrypt = useCallback(() => {
    if (isDecrypting) return;
    setIsDecrypting(true);

    let iteration = 0;
    const originalText = text;
    const textLength = originalText.length;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const progress = iteration / maxIterations;
        let revealed = Math.floor(progress * textLength);

        if (revealDirection === "end") {
          revealed = textLength - revealed;
        } else if (revealDirection === "center") {
          revealed = Math.floor(progress * (textLength / 2));
        }

        return originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            if (revealDirection === "start" && index < revealed) {
              return originalText[index];
            } else if (revealDirection === "end" && index >= revealed) {
              return originalText[index];
            } else if (revealDirection === "center") {
              const center = Math.floor(textLength / 2);
              if (index >= center - revealed && index <= center + revealed) {
                return originalText[index];
              }
            }

            return getRandomChar();
          })
          .join("");
      });

      iteration++;

      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsDecrypting(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, getRandomChar, revealDirection, onComplete, isDecrypting]);

  useEffect(() => {
    if (!triggerOnView) {
      decrypt();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            decrypt();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [decrypt, triggerOnView, hasStarted]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
    </motion.span>
  );
}
