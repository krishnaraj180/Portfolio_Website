"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

const inputVariant = {
  hidden: { opacity: 0, y: 15 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Submission failed");

      form.reset();
      setStatus("success");
      showToast(
        "success",
        "Thanks — your inquiry is on its way. I'll be in touch soon.",
      );
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      showToast(
        "error",
        error.message || "Something went wrong. Please email me directly.",
      );
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const fields = [
    {
      label: "Your name",
      id: "contact-name",
      name: "name",
      type: "text",
      autoComplete: "name",
      required: true,
      maxLength: 100,
      placeholder: "Jane Smith",
    },
    {
      label: "Email address",
      id: "contact-email",
      name: "email",
      type: "email",
      autoComplete: "email",
      required: true,
      maxLength: 254,
      placeholder: "jane@example.com",
    },
  ];

  const inputClasses =
    "form-control accent-input mt-2 w-full rounded-md border border-white/10 px-4 py-3 outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.1)]";

  return (
    <motion.form
      ref={formRef}
      action="/api/contact"
      method="POST"
      onSubmit={handleSubmit}
      aria-busy={status === "sending"}
      className="glass p-6 sm:p-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Honeypot spam trap — hidden from real users */}
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="_subject" value="New portfolio inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <motion.h3 variants={inputVariant} custom={0} className="text-xl font-bold">
        Tell me about your project
      </motion.h3>
      <motion.p
        variants={inputVariant}
        custom={1}
        className="mt-2 text-sm leading-6 text-zinc-400"
      >
        Share a few details and I&apos;ll reply with next steps by email.
      </motion.p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Name & email */}
        {fields.map((f, i) => (
          <motion.label
            key={f.id}
            variants={inputVariant}
            custom={i + 2}
            className="text-sm text-zinc-300"
          >
            <span>{f.label}</span>
            <input
              id={f.id}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              required={f.required}
              maxLength={f.maxLength}
              placeholder={f.placeholder}
              className={inputClasses}
            />
          </motion.label>
        ))}

        {/* Project type */}
        <motion.label
          variants={inputVariant}
          custom={4}
          className="text-sm text-zinc-300"
        >
          <span>What do you need?</span>
          <select
            id="contact-project-type"
            name="projectType"
            defaultValue="Portfolio website"
            className={inputClasses}
          >
            <option>Portfolio website</option>
            <option>Website application</option>
            <option>React application</option>
            <option>Full stack application</option>
            <option>Website redesign</option>
            <option>Other project</option>
          </select>
        </motion.label>

        {/* Budget */}
        <motion.label
          variants={inputVariant}
          custom={5}
          className="text-sm text-zinc-300"
        >
          <span>
            Budget range <span className="text-zinc-500">(optional)</span>
          </span>
          <input
            id="contact-budget"
            name="budget"
            type="text"
            inputMode="numeric"
            placeholder="e.g. ₹25,000 - ₹50,000"
            className={inputClasses}
          />
          {/*
            <option value="">Prefer not to say</option>
            <option>Under &#8377;25,000</option>
            <option>&#8377;25,000–&#8377;50,000</option>
            <option>&#8377;50,000+</option>
            <option>Let&apos;s discuss</option>
          */}
        </motion.label>

        {/* Timeline */}
        <motion.label
          variants={inputVariant}
          custom={6}
          className="text-sm text-zinc-300"
        >
          <span>
            Target timeline <span className="text-zinc-500">(optional)</span>
          </span>
          <select
            id="contact-timeline"
            name="timeline"
            defaultValue=""
            className={inputClasses}
          >
            <option value="">Not decided yet</option>
            <option>Within 2 weeks</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>Flexible</option>
          </select>
        </motion.label>

        {/* Message */}
        <motion.label
          variants={inputVariant}
          custom={7}
          className="text-sm text-zinc-300 sm:col-span-2"
        >
          <span>Project details</span>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            placeholder="What are you hoping to build?"
            className={`${inputClasses} resize-y`}
          />
        </motion.label>
      </div>

      {/* Submit button */}
      <motion.button
        variants={inputVariant}
        custom={8}
        type="submit"
        disabled={status === "sending"}
        className="accent-bg accent-button mt-5 inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        whileHover={{ scale: status === "sending" ? 1 : 1.03 }}
        whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
      >
        {status === "sending" && <span className="spinner" />}
        {status === "success" && <CheckCircle2 size={17} />}
        {status === "sending"
          ? "Sending..."
          : status === "success"
            ? "Sent!"
            : "Send inquiry"}
        {status === "idle" && <ArrowUpRight size={17} aria-hidden="true" />}
      </motion.button>

      <motion.p
        variants={inputVariant}
        custom={9}
        className="mt-3 text-xs text-zinc-500"
      >
        Your details are only used to reply to this inquiry.
      </motion.p>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            role={toast.type === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-sm items-start justify-center gap-3 rounded-lg border px-5 py-4 text-center text-sm shadow-2xl backdrop-blur ${
              toast.type === "success"
                ? "border-cyan-400/40 bg-cyan-950/90 text-cyan-100"
                : "border-red-400/40 bg-red-950/90 text-red-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-cyan-300"
              />
            ) : (
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-red-300"
              />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
