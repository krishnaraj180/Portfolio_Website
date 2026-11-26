"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Don't show on return visits (sessionStorage flag)
    if (sessionStorage.getItem("visited")) {
      setShow(false);
      return;
    }

    // Animate progress bar
    let frame;
    const start = performance.now();
    const duration = 1600;

    function tick(now) {
      const pct = Math.min((now - start) / duration, 1);
      setProgress(Math.round(pct * 100));
      if (pct < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem("visited", "1");
        }, 300);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="preloader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Loading portfolio"
          role="status"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="preloader-logo"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              K
            </motion.span>
            <span className="preloader-logo-r">R</span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="preloader-name"
          >
            Krishnaraj R.
          </motion.p>

          {/* Progress bar */}
          <div className="preloader-bar-track" aria-hidden="true">
            <motion.div
              className="preloader-bar-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>

          {/* Counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2 }}
            className="preloader-counter"
            aria-hidden="true"
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
