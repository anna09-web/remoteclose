import { motion, type Variants } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ParticleBackground from "./ParticleBackground";

const HEADLINE = "Become a Remote Closer. Work from anywhere. Get paid to sell.";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
} satisfies Variants;

const word = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} satisfies Variants;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Animated background: mouse-reactive particle network + soft gradient glows */}
      <div className="absolute inset-0 -z-20 grid-bg" aria-hidden="true" />
      <ParticleBackground />
      <div
        className="absolute -top-32 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 -z-10 h-[360px] w-[480px] rounded-full bg-blue-500/10 blur-[100px] animate-float-slow-rev"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-base"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-300"
        >
          Premium Remote Sales Training
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="glow-text text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {HEADLINE.split(" ").map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block">
              {w}&nbsp;
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-balance text-lg text-zinc-400"
        >
          Learn the exact frameworks to land high-ticket remote closing roles
          and turn conversations into commissions — no office required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={() => scrollToId("apply")}>
            Apply Now
          </MagneticButton>
          <a
            href="#curriculum"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.03] hover:border-white/30 hover:bg-white/5"
          >
            See the curriculum
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-6 text-sm text-zinc-500"
        >
          Limited spots per cohort
        </motion.p>
      </div>
    </section>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
