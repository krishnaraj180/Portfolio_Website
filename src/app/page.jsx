"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  Smartphone,
  Sparkles,
  UserRound,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Section from "@/components/Section";
import BackToTop from "@/components/BackToTop";
import { portfolio } from "@/data/portfolio";
import { skills } from "@/data/skills";

/* ── Animation helpers ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ── Animated counter (count-up on scroll into view) ── */
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(value);
    if (isNaN(num)) {
      setDisplay(value);
      return;
    }
    const isDecimal = value.includes(".");
    const hasSuffix = value.endsWith("+");
    const target = hasSuffix ? parseFloat(value) : num;
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = eased * target;

      if (isDecimal) setDisplay(current.toFixed(2));
      else setDisplay(Math.floor(current).toString() + (hasSuffix ? "+" : ""));

      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    }

    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

/* ── Services data ──────────────────────────────────── */
const services = [
  [
    Code2,
    "Frontend development",
    "Responsive React and Next.js interfaces with reusable components and clean architecture.",
  ],
  [
    Server,
    "Full stack apps",
    "End-to-end MERN applications with REST APIs, databases and authentication.",
  ],
  [
    Sparkles,
    "UI implementation",
    "Clean, accessible layouts that turn product ideas into polished experiences.",
  ],
  [
    Smartphone,
    "Responsive design",
    "Mobile-first screens that feel consistent on every device.",
  ],
];

/* ── Page ───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />

      {/* ── Stats bar ───────────────────────────────── */}
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 border-y border-white/10 px-5 sm:grid-cols-4 sm:px-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerParent}
      >
        {portfolio.heroStats.map(([value, label], i) => (
          <motion.div
            key={label}
            variants={fadeUp}
            custom={i}
            className="border-white/10 px-3 py-5 first:pl-0 sm:border-l sm:px-6 sm:py-6 sm:first:border-l-0 sm:first:pl-0"
          >
            <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              <AnimatedCounter value={value} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-[.14em] text-zinc-500">
              {label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Projects ────────────────────────────────── */}
      <Section id="work" eyebrow="My selected work" title="Featured projects">
        <div className="mb-7 flex items-end justify-between gap-6">
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            A selection of full stack applications and interfaces built with
            React, Next.js, Node.js, state management, and API integrations.
          </p>
          <motion.a
            href="#contact"
            className="hidden items-center gap-2 text-sm font-semibold accent-text sm:inline-flex"
            whileHover={{ x: 3 }}
          >
            Start a project
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
        <Projects />
      </Section>

      {/* ── Skills ──────────────────────────────────── */}
      <Section
        id="skills"
        eyebrow="Technical skills"
        title="Tools I use to build dependable products"
      >
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerParent}
        >
          {skills.map(([group, items], gi) => (
            <motion.article
              key={group}
              variants={scaleIn}
              custom={gi}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass glow p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-white">{group}</h3>
                <motion.span
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Code2 size={18} className="accent-text" />
                </motion.span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                {items.map((item, ii) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + ii * 0.05 }}
                  >
                    <Check size={14} className="accent-text" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      {/* ── About ───────────────────────────────────── */}
      <Section
        id="about"
        eyebrow="Get to know me"
        title="Building thoughtful digital experiences"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="max-w-2xl text-lg leading-8 text-zinc-300">
              {portfolio.summary}
            </p>
            <motion.div
              className="mt-8 grid gap-4 sm:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerParent}
            >
              {[
                [MapPin, "Based in", portfolio.location],
                [GraduationCap, "Education", "B.Tech Information Technology"],
                [BriefcaseBusiness, "Focus", "Full Stack — MERN"],
              ].map(([Icon, label, value], i) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ y: -3 }}
                  className="glass p-4"
                >
                  <Icon size={18} className="accent-text" />
                  <p className="mt-3 text-xs uppercase tracking-wider text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="glass p-6 sm:p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -3 }}
          >
            <p className="font-mono text-xs uppercase tracking-[.2em] accent-text">
              My approach
            </p>
            <h3 className="mt-4 text-2xl font-bold text-white">
              Useful interfaces, built thoughtfully.
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              I focus on clear layouts, reusable components, robust APIs,
              responsive behavior, and details that make products easier to use —
              from frontend to backend.
            </p>
            <motion.a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold accent-text"
              whileHover={{ x: 4 }}
            >
              Work with me
              <ArrowUpRight size={15} />
            </motion.a>
          </motion.div>
        </div>
      </Section>

      {/* ── Services ────────────────────────────────── */}
      {/* Experience and certifications */}
      <Section
        id="experience"
        eyebrow="Experience"
        title="Growing through real-world work"
      >
        <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          {portfolio.experience.map((item) => (
            <motion.article
              key={`${item.role}-${item.company}`}
              className="glass glow p-6 sm:p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold accent-text">{item.company}</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">{item.role}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 sm:pt-1">
                  <CalendarDays size={15} aria-hidden="true" />
                  {item.period}
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{item.location}</p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-400">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 accent-text" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}

          <motion.article
            className="glass p-6 sm:p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Award className="accent-text" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-bold text-white">Certifications</h3>
            <div className="mt-6 space-y-5">
              {portfolio.certifications.map(([name, issuer, period]) => (
                <div key={name} className="border-l border-cyan-300/30 pl-4">
                  <p className="font-semibold text-white">{name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{issuer}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{period}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </Section>

      {/* Services */}
      <Section
        id="services"
        eyebrow="What I do"
        title="Full stack digital experiences"
      >
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerParent}
        >
          {services.map(([Icon, title, text], i) => (
            <motion.article
              key={title}
              variants={scaleIn}
              custom={i}
              whileHover={{
                y: -6,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.25 },
              }}
              style={{ transformPerspective: 1000 }}
              className="glass glow p-6"
            >
              <motion.span
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 accent-text"
                whileHover={{ rotate: 8, scale: 1.1 }}
              >
                <Icon size={22} />
              </motion.span>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
              <motion.a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold accent-text"
                whileHover={{ x: 3 }}
              >
                Start a project
                <ArrowUpRight size={15} />
              </motion.a>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      {/* ── Journey / Workflow ──────────────────────── */}
      <Section
        id="journey"
        eyebrow="How I work"
        title="A clear path from idea to interface"
      >
        <motion.div
          className="grid gap-4 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerParent}
        >
          {portfolio.workflow.map(([number, title, text], i) => (
            <motion.article
              key={number}
              variants={fadeUp}
              custom={i}
              className="relative border-l border-cyan-300/30 pl-5"
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--accent-color)]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              />
              <span className="font-mono text-sm accent-text">{number}</span>
              <h3 className="mt-3 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      {/* ── Contact ─────────────────────────────────── */}
      <Section
        id="contact"
        eyebrow="Get in touch"
        title="Let's build something useful together"
      >
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <motion.div
            className="glass h-fit self-start p-6 sm:p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <UserRound className="accent-text" />
            <h3 className="mt-5 text-2xl font-bold text-white">
              Have a project in mind?
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              I&apos;m open to full stack roles, freelance projects,
              collaborations, and interesting product ideas.
            </p>
            <div className="mt-7 space-y-4 text-sm text-zinc-300">
              <motion.a
                className="flex items-center gap-3 hover:text-white"
                href={`mailto:${portfolio.email}`}
                whileHover={{ x: 3 }}
              >
                <Mail size={17} className="accent-text" />
                {portfolio.email}
              </motion.a>
              <motion.a
                className="flex items-center gap-3 hover:text-white"
                href={`tel:${portfolio.phone.replace(/\s/g, "")}`}
                whileHover={{ x: 3 }}
              >
                <Phone size={17} className="accent-text" />
                {portfolio.phone}
              </motion.a>
              <motion.span
                className="flex items-center gap-3"
                whileHover={{ x: 3 }}
              >
                <MapPin size={17} className="accent-text" />
                {portfolio.location}
              </motion.span>
            </div>
            <div className="mt-8 flex gap-4">
              <motion.a
                href="https://github.com/krishnaraj180"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Github size={19} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/krishnaraj180"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Linkedin size={19} />
              </motion.a>
            </div>
          </motion.div>
          <ContactForm />
        </div>
      </Section>

      {/* ── Footer ──────────────────────────────────── */}
      <motion.footer
        className="border-t border-white/10 px-5 py-8 sm:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-white">KR</span>{" "}
            · © {new Date().getFullYear()} Krishnaraj R. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#home" className="transition hover:text-white">
              Home
            </a>
            <a href="#work" className="transition hover:text-white">
              Work
            </a>
            <a href="#skills" className="transition hover:text-white">
              Skills
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </motion.footer>

      <BackToTop />
      </main>
    </>
  );
}
