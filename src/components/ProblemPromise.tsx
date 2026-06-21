import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const NOW = [
  "Trading hours for a paycheck that barely moves",
  "Stuck commuting to a desk job you don't care about",
  "No clear path to making real money on your own terms",
];

const AFTER = [
  "Closing high-ticket deals from your laptop, anywhere",
  "Setting your own hours and your own income ceiling",
  "A repeatable system you can rely on, cohort after cohort",
];

export default function ProblemPromise() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Where you are now vs. where RemoteClose takes you
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal delay={0.05}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Right now
              </h3>
              <ul className="space-y-4">
                {NOW.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.06] p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-2">
                With RemoteClose <ArrowRight className="h-4 w-4" />
              </h3>
              <ul className="space-y-4">
                {AFTER.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-100">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
