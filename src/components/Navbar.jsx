"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const links = ["Work", "Skills", "About", "Experience", "Services", "Journey", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
    setScrolled(latest > 50);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled
              ? "shadow-lg shadow-black/20 backdrop-blur-xl"
              : "backdrop-blur-sm"
          }`}
        >
          <motion.a
            href="#home"
            aria-label="Krishnaraj R. — home"
            className="flex items-center gap-2 font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="accent-text text-lg">
              K<span className="text-white">R</span>
            </span>
            <span className="hidden text-xs font-medium text-zinc-400 sm:inline">
              Krishnaraj R.
            </span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="relative text-sm text-zinc-400 transition hover:text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -1 }}
              >
                {l}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent-color)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/images/Resume.pdf"
            download="Krishnaraj-R-Resume.pdf"
            className="accent-bg accent-button hidden rounded-md px-4 py-2 text-sm font-semibold md:inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>

          {/* Mobile menu button */}
          <motion.button
            className="rounded-xl p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X /> : <Menu />}
          </motion.button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-3 md:hidden"
            >
              {links.map((l, i) => (
                <motion.a
                  onClick={() => setOpen(false)}
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {l}
                </motion.a>
              ))}
              <motion.a
                href="/images/Resume.pdf"
                download="Krishnaraj-R-Resume.pdf"
                className="accent-bg accent-button mt-2 block rounded-xl px-4 py-3 text-center text-sm font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
