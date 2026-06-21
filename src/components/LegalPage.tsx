import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <a
          href="#/"
          className="mb-10 inline-block text-sm text-accent-2 hover:underline"
        >
          ← Back to RemoteClose
        </a>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm text-zinc-500">Last updated: {updated}</p>

          <div className="prose-legal mt-8 space-y-5 text-sm leading-relaxed text-zinc-400">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
