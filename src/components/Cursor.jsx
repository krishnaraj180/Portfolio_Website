"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smooth spring following
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  // Slower trail spring
  const trailX = useSpring(mouseX, { stiffness: 120, damping: 28 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 28 });

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e) => {
      const target = e.target;
      setHovering(
        target.closest("a, button, [role='button'], label[for], select, textarea, input") !== null
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Spotlight glow that follows slowly */}
      <motion.div
        className="cursor-spotlight"
        style={{ left: trailX, top: trailY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{ left: springX, top: springY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : hovering ? 1.6 : 1,
          borderColor: hovering ? "var(--accent-color)" : "rgba(255,255,255,0.4)",
        }}
        transition={{ scale: { duration: 0.15 }, borderColor: { duration: 0.2 } }}
        aria-hidden="true"
      />

      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{ left: springX, top: springY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : hovering ? 0 : 1,
          backgroundColor: hovering ? "var(--accent-color)" : "white",
        }}
        transition={{ duration: 0.1 }}
        aria-hidden="true"
      />
    </>
  );
}
