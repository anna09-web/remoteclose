import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "The Program", href: "#results" },
  { label: "Apply", href: "#apply" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-9 z-50 transition-all duration-300 sm:top-10 ${
        scrolled ? "py-2" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-300 ${
          scrolled
            ? "glass py-2.5 shadow-lg shadow-black/20"
            : "bg-transparent py-1"
        }`}
      >
        <a href="#top" className="text-lg font-bold tracking-tight text-white">
          Remote<span className="text-accent">Close</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#apply"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(59,130,246,0.65)]"
        >
          Apply Now
        </a>
      </div>
    </motion.header>
  );
}
