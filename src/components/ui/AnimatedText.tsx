"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  duration?: number;
  className?: string;
}

const AnimatedText = ({ text, duration, className }: Props) => {
  return (
    <>
      <span className="mx-2 text-4xl sm:text-5xl ">
        {text.split("").map((char, index) => (
          <motion.span
            key={char + "-" + index}
            animate={{
              x: [0, 10, -10, 0].map((x) => (Math.random() - 0.5) * x * 50),
              y: [0, 10, -10, 0].map((y) => (Math.random() - 0.5) * y * 100),
              rotate: [0, 10, -10, 0].map(
                (r) => (Math.random() - 0.5) * r * 100
              ),
            }}
            transition={{ duration: duration || 5 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className={cn(className, "inline-block")}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </>
  );
};
export default memo(AnimatedText);
