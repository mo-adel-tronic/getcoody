"use client";

import { motion, useScroll } from "framer-motion";

interface ScrollSectionProps {
    children: React.ReactNode
}
export default function AppScrollSection({children}:ScrollSectionProps) {
  
  const { scrollYProgress } = useScroll();

  return (
      <>
      <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
        height: 6,
        background: 'hsl(32, 87%, 56%)',
        transformOrigin: 'right',
        direction: 'rtl'
      }}
      >
      </motion.div>
      {children}
      </>
  );
}
