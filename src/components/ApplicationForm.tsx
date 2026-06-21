import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ShieldAlert, ChevronLeft } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { FORM_ENDPOINT } from "../lib/form";

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

// The form is broken into small steps on purpose: it keeps completion
// rates high and lets us screen out people who aren't a fit before they
// invest the time to fill in everything.
interface Step {
  title: string;
  fields: (keyof FormState)[];
}

const STEPS: Step[] = [
  { title: "Contact details", fields: ["fullName", "email", "phone", "location"] },
  { title: "Your background", fields: ["situation", "experience"] },
  { title: "Goals & commitment", fields: ["incomeGoal", "hoursPerWeek", "readyToInvest"] },
  { title: "Final step", fields: ["motivation", "startTiming"] },
];

function validateField(key: keyof FormState, values: FormState): string | undefined {
  switch (key) {
    case "fullName":
      return values.fullName.trim() ? undefined : "Full name is required.";
    case "email":
      if (!values.email.trim()) return "Email is required.";
      if (!EMAIL_RE.test(values.email.trim())) return "Enter a valid email address.";
      return undefined;
    case "phone":
      if (!values.phone.trim()) return "Phone number is required.";
      if (!PHONE_RE.test(values.phone.trim()))
        return "Enter a valid phone number, include your country code.";
      return undefined;
    default:
      return undefined;
  }
}

function validateStep(step: Step, values: FormState): Errors {
  const errors: Errors = {};
  for (const field of step.fields) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-accent focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/30";

const labelClass = "mb-1.5 block text-sm font-medium text-zinc-300";
const errorClass = "mt-1.5 text-xs text-red-400";

export default function ApplicationForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, values) }));
  }

  function goToStep(nextIndex: number, dir: 1 | -1) {
    setDirection(dir);
    setStepIndex(nextIndex);
  }

  function handleBack() {
    if (stepIndex === 0) return;
    goToStep(stepIndex - 1, -1);
  }

  async function handleNext(e: FormEvent) {
    e.preventDefault();

    const stepErrors = validateStep(step, values);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    setTouched((prev) => {
      const next = { ...prev };
      for (const field of step.fields) next[field] = true;
      return next;
    });

    if (Object.keys(stepErrors).length > 0) return;

    if (!isLastStep) {
      goToStep(stepIndex + 1, 1);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // TODO: connect Formspree here.
      // Set FORM_ENDPOINT in src/lib/form.ts to your Formspree form URL
      // (e.g. https://formspree.io/f/abcd1234). Until it's set, this
      // simulates a network call so the front-end flow (validation,
      // loading, success state) can be fully tested.
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Submission failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setSubmitted(true);
      setValues(INITIAL_STATE);
      setTouched({});
      setStepIndex(0);
    } catch {
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="apply" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Apply for the next cohort
          </h2>
          <p className="mt-4 text-zinc-400">
            A few quick steps. We review every application personally —
            we'll be in touch by email if it's a fit.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mb-10">
          <div className="mx-auto flex max-w-md items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-left">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p className="text-xs leading-relaxed text-amber-200/90">
              We only accept applicants who are a genuine fit for the
              program. Spots per cohort are limited, so incomplete or
              low-effort applications are not reviewed.
            </p>
          </div>
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
                    (and spam folder, just in case) — we only follow up with
                    applicants who fit the program.
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
                <div className="relative">
                  <ProgressBar current={stepIndex} total={STEPS.length} title={step.title} />

                  <form onSubmit={handleNext} noValidate className="relative mt-7">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={stepIndex}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -24 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="space-y-5"
                      >
                        {stepIndex === 0 && (
                          <>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field
                                id="fullName"
                                label="Full name *"
                                type="text"
                                autoComplete="name"
                                value={values.fullName}
                                onChange={(v) => update("fullName", v)}
                                onBlur={() => handleBlur("fullName")}
                                error={touched.fullName ? errors.fullName : undefined}
                                placeholder="Jane Doe"
                              />
                              <Field
                                id="email"
                                label="Email *"
                                type="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={(v) => update("email", v)}
                                onBlur={() => handleBlur("email")}
                                error={touched.email ? errors.email : undefined}
                                placeholder="jane@example.com"
                              />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field
                                id="phone"
                                label="Phone number *"
                                type="tel"
                                autoComplete="tel"
                                value={values.phone}
                                onChange={(v) => update("phone", v)}
                                onBlur={() => handleBlur("phone")}
                                error={touched.phone ? errors.phone : undefined}
                                placeholder="+1 555 555 5555"
                              />
                              <Field
                                id="location"
                                label="Country / city"
                                type="text"
                                autoComplete="address-level2"
                                value={values.location}
                                onChange={(v) => update("location", v)}
                                placeholder="Lisbon, Portugal"
                              />
                            </div>
                          </>
                        )}

                        {stepIndex === 1 && (
                          <>
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
                          </>
                        )}

                        {stepIndex === 2 && (
                          <>
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
                              options={[
                                "Yes, fully",
                                "Yes, with some flexibility",
                                "Not sure yet",
                              ]}
                            />
                          </>
                        )}

                        {stepIndex === 3 && (
                          <>
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
                                placeholder="Tell us a bit about your goals — this is what we read most closely."
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
                            <p className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-zinc-500">
                              Last step. Applications are reviewed in the
                              order received — only candidates who fit the
                              program move forward.
                            </p>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {submitError && (
                      <p className="mt-4 text-sm text-red-400">{submitError}</p>
                    )}

                    <div className="mt-7 flex items-center justify-between gap-4">
                      {stepIndex > 0 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-1 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-white/25 hover:text-white"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Back
                        </button>
                      ) : (
                        <span />
                      )}

                      <MagneticButton type="submit" disabled={submitting}>
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </span>
                        ) : isLastStep ? (
                          "Submit Application →"
                        ) : (
                          "Continue →"
                        )}
                      </MagneticButton>
                    </div>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProgressBar({
  current,
  total,
  title,
}: {
  current: number;
  total: number;
  title: string;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">{title}</span>
        <span className="text-xs text-zinc-500">
          Step {current + 1} of {total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={fieldClass}
        placeholder={placeholder}
      />
      {error && <p className={errorClass}>{error}</p>}
    </div>
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
