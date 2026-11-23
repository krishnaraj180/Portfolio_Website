"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-6xl font-bold accent-text"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Page not found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 max-w-md text-zinc-400"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/"
          className="accent-bg accent-button mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold"
        >
          <ArrowLeft size={17} />
          Go home
        </Link>
      </motion.div>
    </main>
  );
}

