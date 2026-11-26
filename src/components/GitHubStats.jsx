"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, BookOpen, Users } from "lucide-react";

const GH_USER = "krishnaraj180";

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`, {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`,
            { headers: { Accept: "application/vnd.github+json" } }
          ),
        ]);

        if (!userRes.ok) throw new Error("API error");
        const user = await userRes.json();
        const repoList = reposRes.ok ? await reposRes.json() : [];

        const totalStars = repoList.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0
        );
        const totalForks = repoList.reduce(
          (sum, r) => sum + (r.forks_count || 0),
          0
        );

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          stars: totalStars,
          forks: totalForks,
        });

        // Top 3 non-fork repos by stars
        setRepos(
          repoList
            .filter((r) => !r.fork && r.description)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3)
        );
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statItems = stats
    ? [
        { icon: BookOpen, label: "Public repos", value: stats.publicRepos },
        { icon: Star, label: "Total stars", value: stats.stars },
        { icon: GitFork, label: "Total forks", value: stats.forks },
        { icon: Users, label: "Followers", value: stats.followers },
      ]
    : [];

  return (
    <motion.div
      className="glass glow mt-10 overflow-hidden p-6 sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 accent-text">
            <Github size={18} />
          </span>
          <div>
            <p className="font-semibold text-white">GitHub Activity</p>
            <p className="text-xs text-zinc-500">@{GH_USER}</p>
          </div>
        </div>
        <motion.a
          href={`https://github.com/${GH_USER}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs accent-text hover:underline"
          whileHover={{ x: 2 }}
        >
          View profile →
        </motion.a>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <span className="spinner" style={{ width: 14, height: 14, borderWidth: 1.5 }} />
          Loading GitHub stats…
        </div>
      )}

      {error && (
        <p className="text-sm text-zinc-500">
          GitHub stats unavailable right now.{" "}
          <a
            href={`https://github.com/${GH_USER}`}
            target="_blank"
            rel="noreferrer"
            className="accent-text underline"
          >
            View profile
          </a>
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Stats grid */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statItems.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                className="rounded-xl border border-white/8 bg-white/4 p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -2 }}
              >
                <Icon size={15} className="mx-auto mb-2 accent-text" />
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Top repos */}
          {repos.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Top repositories
              </p>
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/3 p-3 transition hover:border-white/20 hover:bg-white/6"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 2 }}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {repo.name}
                    </p>
                    {repo.description && (
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <span className="mt-1.5 inline-block rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-zinc-400">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
