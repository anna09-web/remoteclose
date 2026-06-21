import { SITE } from "../lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="text-lg font-bold text-white">
            Remote<span className="text-accent">Close</span>
          </div>
          <p className="mt-1 max-w-sm text-sm text-zinc-500">
            {SITE.tagline}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="text-sm text-zinc-400 transition-colors hover:text-accent-2"
          >
            {SITE.contactEmail}
          </a>
          <div className="flex gap-5 text-sm text-zinc-500">
            <a href="#/terms" className="transition-colors hover:text-white">
              Terms of Use
            </a>
            <a href="#/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-zinc-600">
        © {year} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
