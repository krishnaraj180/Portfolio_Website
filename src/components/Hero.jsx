"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, Eye, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

/* ── Typewriter hook ────────────────────────────────── */
function useTypewriter(texts, speed = 80, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          if (charIndex + 1 === currentText.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
          if (charIndex <= 1) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return displayText;
}

/* ── Floating particles ─────────────────────────────── */
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (i * 37.17) % 100,
        y: (i * 61.43) % 100,
        size: 1 + ((i * 29) % 100) / 50,
        duration: 3 + ((i * 17) % 40) / 10,
        delay: ((i * 13) % 30) / 10,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.15,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero component ─────────────────────────────────── */
export default function Hero() {
  const typedRole = useTypewriter([
    "Full Stack Developer",
    "React & Next.js Developer",
    "MERN Stack Developer",
  ]);

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center overflow-hidden grid-bg px-5 pb-16 pt-28 sm:px-8 sm:pb-20"
    >
      <Particles />
      <span className="hero-orbit hero-orbit-cyan" aria-hidden="true" />
      <span className="hero-orbit hero-orbit-violet" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="hero-glow absolute -right-24 top-24 h-[360px] w-[360px] rounded-full blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="hero-glow absolute -left-32 bottom-20 h-[280px] w-[280px] rounded-full blur-[100px] opacity-50"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        {/* ── Left column ──────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 flex items-center gap-3 font-mono text-sm accent-text"
          >
            <span className="h-px w-8 bg-[var(--accent-color)]" aria-hidden="true" />
            Welcome to my portfolio
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-300"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            Available for freelance projects
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-.045em] sm:text-6xl lg:text-7xl"
          >
            I build digital products that move businesses forward.
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
          >
            <p>
              <span className="font-semibold text-white">{typedRole}</span>
              <motion.span
                className="inline-block w-[2px] h-[1.1em] bg-[var(--accent-color)] ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                aria-hidden="true"
              />
            </p>
            <p className="mt-2">
              I help teams turn ideas into fast, polished web experiences —
              from clean React interfaces to reliable full-stack applications.
              Thoughtful UX, maintainable code, and a clear path from concept to launch.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <motion.a
              href="#work"
              className="accent-bg accent-button group inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See what I can build
              <ArrowUpRight
                size={17}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-semibold transition hover:border-white/30 hover:bg-white/5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Let&apos;s discuss your idea
              <ArrowUpRight size={17} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="/images/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-semibold transition hover:border-white/30 hover:bg-white/5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Eye size={17} aria-hidden="true" />
              View resume
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center gap-5 text-sm text-zinc-400"
          >
            <motion.a
              href="https://github.com/krishnaraj180"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition hover:text-white"
              whileHover={{ scale: 1.15, y: -2 }}
            >
              <Github size={19} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/krishnaraj180"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-white"
              whileHover={{ scale: 1.15, y: -2 }}
            >
              <Linkedin size={19} aria-hidden="true" />
            </motion.a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={17} aria-hidden="true" />
              Let&apos;s talk
            </a>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="#work"
            className="mt-10 inline-flex items-center gap-2 text-xs text-zinc-500 transition hover:text-white"
          >
            Scroll to explore
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={14} aria-hidden="true" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* ── Right column — portrait ──────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-[22rem]"
        >
          <motion.div
            aria-hidden="true"
            className="hero-glow absolute -inset-4 rounded-[2rem] blur-2xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[var(--color-raised)] p-2 shadow-2xl shadow-cyan-950/30">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/krishnaraj-portrait.png"
                alt="Portrait of Krishnaraj R."
                fill
                priority
                sizes="(max-width: 1024px) min(88vw, 24rem), 22rem"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/15 bg-slate-950/75 px-4 py-3 backdrop-blur-md"
            >
              <div>
                <p className="text-sm font-semibold text-white">Krishnaraj R.</p>
                <p className="mt-0.5 text-xs text-zinc-400">Full Stack Developer</p>
              </div>
              <span className="flex items-center gap-2 text-xs font-medium text-emerald-200">
                <motion.span
                  className="h-2 w-2 rounded-full bg-emerald-300"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
                Available
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
