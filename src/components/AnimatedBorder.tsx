import { motion } from "framer-motion";
import React from "react";

export default function AnimatedBorder({ children }: any) {
  const gradient = `linear-gradient(45deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 50%, rgba(9,9,121,1) 100%)`;

  return (
    <motion.div
      style={{
        padding: "2px",
        borderRadius: "8px",
        background: gradient,
        backgroundSize: "200% 200%",
        animation: "gradient-animation 3s ease infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
}
