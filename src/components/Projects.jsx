"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [openCaseStudy, setOpenCaseStudy] = useState(null);

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const categoryProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const visibleProjects =
    activeCategory === "All" && !showAll
      ? categoryProjects.filter((project) => project.featured)
      : categoryProjects;

  return (
    <>
      {/* Filter buttons */}
      <div
        className="mb-7 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              if (category !== "All") setShowAll(true);
              setOpenCaseStudy(null);
            }}
            aria-pressed={activeCategory === category}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeCategory === category
                ? "accent-border accent-bg"
                : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid items-start gap-5 md:grid-cols-2">
        <AnimatePresence>
          {visibleProjects.map((p, i) => (
            <motion.article
              key={p.name}
              custom={i}
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass glow group flex flex-col overflow-hidden p-5 sm:p-6"
            >
              {/* Screenshot */}
              <div className="surface-raised relative mb-5 aspect-[16/9] overflow-hidden rounded-lg border border-white/10">
                {p.screenshot ? (
                  <Image
                    src={p.screenshot}
                    alt={`${p.name} project screenshot`}
                    fill
                    loading="lazy"
                    quality={72}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.28),_transparent_42%),linear-gradient(135deg,_#111827,_#1e293b)] px-6 text-center"
                    aria-label={`${p.name} project preview`}
                  >
                    <span className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
                      {p.name}
                    </span>
                  </div>
                )}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="absolute left-3 top-3 rounded border border-white/10 bg-slate-950/90 px-3 py-1 text-xs text-zinc-200"
                >
                  {p.category}
                </motion.span>
                {p.featured && (
                  <span className="absolute right-3 top-3 rounded border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="text-xl font-bold text-white">{p.name}</h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {p.description}
                </p>

                {p.outcome && (
                  <p className="mt-3 rounded-lg border border-cyan-300/10 bg-cyan-300/5 px-3 py-2 text-sm leading-6 text-cyan-100/80">
                    <span className="font-semibold text-cyan-200">Client value:</span>{" "}
                    {p.outcome}
                  </p>
                )}

                {/* Tech stack pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s, si) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * si }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors duration-300 group-hover:bg-white/10"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                  {p.highlights.map((highlight) => (
                    <li key={highlight} className="list-inside list-disc">
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Case study toggle */}
                <div className="mt-5 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenCaseStudy((current) =>
                        current === p.name ? null : p.name,
                      )
                    }
                    aria-expanded={openCaseStudy === p.name}
                    aria-controls={`case-study-${i}`}
                    className="accent-text w-fit cursor-pointer border-b border-current pb-1 text-sm font-medium transition-colors hover:opacity-80"
                  >
                    {openCaseStudy === p.name
                      ? "Close case study"
                      : "Read case study"}
                  </button>
                  <AnimatePresence>
                    {openCaseStudy === p.name && (
                      <motion.div
                        id={`case-study-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-4 text-sm leading-6">
                          <div>
                            <h4 className="font-semibold text-white">
                              Challenge
                            </h4>
                            <p className="mt-1 text-zinc-400">{p.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              Approach
                            </h4>
                            <p className="mt-1 text-zinc-400">{p.approach}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              What I built
                            </h4>
                            <p className="mt-1 text-zinc-400">
                              {p.highlights.join(" · ")}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action links */}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.live !== "#" && (
                    <motion.a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live demo for ${p.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live demo
                      <ArrowUpRight size={14} />
                    </motion.a>
                  )}
                  {p.github && (
                    <motion.a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${p.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={14} />
                      Source code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Show all / featured toggle */}
      {activeCategory === "All" && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/30 hover:bg-white/5"
            aria-expanded={showAll}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {showAll ? "Show featured projects" : "View all projects"}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowDown size={15} aria-hidden="true" />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
