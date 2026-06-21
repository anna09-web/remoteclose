import { Rocket, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "../lib/content";

// RemoteClose hasn't run a cohort yet, so there are no student reviews
// to show. This section is honest about that and turns it into a
// "founding cohort" pitch instead of fabricating social proof.
export default function FoundingCohort() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div
              className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent-2">
              <Rocket className="h-3.5 w-3.5" />
              Launching {SITE.launchDate}
            </div>

            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              We're brand new — and that's the opportunity
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
              RemoteClose hasn't run a cohort yet, so we don't have
              student reviews to show you. What we do have is a complete
              curriculum and a small founding cohort starting{" "}
              {SITE.launchDate}. Join now and you'll help shape the
              program — at founding-cohort pricing, before the reviews
              roll in and spots get harder to come by.
            </p>

            <div className="relative mt-7 flex items-center justify-center gap-2 text-sm text-zinc-500">
              <Sparkles className="h-4 w-4 text-accent" />
              First come, first reviewed.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
