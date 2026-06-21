import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { TYPEFORM_ENDPOINT } from "../lib/typeform";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  situation: string;
  experience: string;
  incomeGoal: string;
  hoursPerWeek: string;
  readyToInvest: string;
  motivation: string;
  startTiming: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  situation: "",
  experience: "",
  incomeGoal: "",
  hoursPerWeek: "",
  readyToInvest: "",
  motivation: "",
  startTiming: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s()-]{7,20}$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number, include your country code.";
  }
  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-accent focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/30";

const labelClass = "mb-1.5 block text-sm font-medium text-zinc-300";
const errorClass = "mt-1.5 text-xs text-red-400";

export default function ApplicationForm() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate({ ...values }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      // TODO: connect Typeform here.
      // Once TYPEFORM_ENDPOINT is configured (via a backend proxy that
      // holds the Typeform API key), replace this block with a POST of
      // `values` to that endpoint, e.g.:
      //
      //   const response = await fetch(TYPEFORM_ENDPOINT, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(values),
      //   });
      //   if (!response.ok) throw new Error("Submission failed");
      //
      // Until then, this simulates a network call so the front-end flow
      // (validation, loading, success state) can be fully tested.
      if (TYPEFORM_ENDPOINT) {
        const response = await fetch(TYPEFORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Submission failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setSubmitted(true);
      setValues(INITIAL_STATE);
      setTouched({});
    } catch {
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="apply" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Apply for the next cohort
          </h2>
          <p className="mt-4 text-zinc-400">
            Takes about 3 minutes. We review every application personally —
            we'll be in touch by email if it's a fit.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="h-14 w-14 text-accent" />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    Application received
                  </h3>
                  <p className="mt-2 max-w-sm text-zinc-400">
                    We'll be in touch by email. Keep an eye on your inbox
                    (and spam folder, just in case).
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium text-accent-2 underline-offset-4 hover:underline"
                  >
                    Submit another application
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className={labelClass}>
                        Full name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={values.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        className={fieldClass}
                        placeholder="Jane Doe"
                      />
                      {touched.fullName && errors.fullName && (
                        <p className={errorClass}>{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={fieldClass}
                        placeholder="jane@example.com"
                      />
                      {touched.email && errors.email && (
                        <p className={errorClass}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        className={fieldClass}
                        placeholder="+1 555 555 5555"
                      />
                      {touched.phone && errors.phone && (
                        <p className={errorClass}>{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="location" className={labelClass}>
                        Country / city
                      </label>
                      <input
                        id="location"
                        type="text"
                        autoComplete="address-level2"
                        value={values.location}
                        onChange={(e) => update("location", e.target.value)}
                        className={fieldClass}
                        placeholder="Lisbon, Portugal"
                      />
                    </div>
                  </div>

                  <Select
                    id="situation"
                    label="What's your current situation?"
                    value={values.situation}
                    onChange={(v) => update("situation", v)}
                    options={[
                      "Student",
                      "Employed 9–5",
                      "Self-employed",
                      "Between jobs",
                      "Other",
                    ]}
                  />

                  <Select
                    id="experience"
                    label="Do you have any sales experience?"
                    value={values.experience}
                    onChange={(v) => update("experience", v)}
                    options={["None", "A little", "1–3 years", "3+ years"]}
                  />

                  <Select
                    id="incomeGoal"
                    label="What's your monthly income goal in the next 6–12 months?"
                    value={values.incomeGoal}
                    onChange={(v) => update("incomeGoal", v)}
                    options={["<$2k", "$2k–$5k", "$5k–$10k", "$10k+"]}
                  />

                  <Select
                    id="hoursPerWeek"
                    label="How many hours per week can you commit?"
                    value={values.hoursPerWeek}
                    onChange={(v) => update("hoursPerWeek", v)}
                    options={["<5", "5–10", "10–20", "20+"]}
                  />

                  <Select
                    id="readyToInvest"
                    label="Are you ready to invest in yourself to make this happen?"
                    value={values.readyToInvest}
                    onChange={(v) => update("readyToInvest", v)}
                    options={["Yes, fully", "Yes, with some flexibility", "Not sure yet"]}
                  />

                  <div>
                    <label htmlFor="motivation" className={labelClass}>
                      Why do you want to become a remote closer?
                    </label>
                    <textarea
                      id="motivation"
                      rows={4}
                      value={values.motivation}
                      onChange={(e) => update("motivation", e.target.value)}
                      className={`${fieldClass} resize-none`}
                      placeholder="Tell us a bit about your goals..."
                    />
                  </div>

                  <Select
                    id="startTiming"
                    label="When can you start?"
                    value={values.startTiming}
                    onChange={(v) => update("startTiming", v)}
                    options={[
                      "Immediately",
                      "Within 2 weeks",
                      "Within a month",
                      "Just exploring",
                    ]}
                  />

                  {submitError && (
                    <p className="text-sm text-red-400">{submitError}</p>
                  )}

                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Submit Application →"
                      )}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} appearance-none bg-no-repeat`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239ca0aa'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 0.85rem center",
          backgroundSize: "1.1em",
        }}
      >
        <option value="" disabled className="bg-surface text-zinc-500">
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-surface text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
