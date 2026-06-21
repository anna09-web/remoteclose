import ScrollReveal from "./ScrollReveal";
import { STEPS } from "../lib/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-zinc-400">
            From application to your first closed deal.
          </p>
        </ScrollReveal>

        <div className="relative grid gap-10 md:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.12}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-base font-semibold text-accent-2 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
