import { Sparkles } from "lucide-react";
import { SITE } from "../lib/content";

export default function FreeBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-white">
      <p className="flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider sm:text-sm">
        <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        100% Free for the Founding Cohort — Launches {SITE.launchDate}
      </p>
    </div>
  );
}
