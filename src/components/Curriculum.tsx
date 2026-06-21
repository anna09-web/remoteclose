import { motion } from "framer-motion";
import {
  Target,
  Send,
  PhoneCall,
  ShieldCheck,
  Handshake,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { CURRICULUM } from "../lib/content";

const ICONS: Record<string, LucideIcon> = {
  Target,
  Send,
  PhoneCall,
  ShieldCheck,
  Handshake,
  Briefcase,
};

export default function Curriculum() {
  return (
    <section id="curriculum" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What you'll learn
          </h2>
          <p className="mt-4 text-zinc-400">
            A complete curriculum built to take you from zero to closing
            high-ticket deals remotely.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CURRICULUM.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <ScrollReveal key={item.title} delay={(i % 3) * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="glass h-full rounded-2xl p-7"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
