// Central place for editable site copy, numbers and config.
// Update stats, curriculum, testimonials, and contact info here.

export const SITE = {
  name: "RemoteClose",
  tagline: "The premium training program for high-ticket remote closers.",
  contactEmail: "aschnabelbuisness@gmail.com",
  launchDate: "July 1st",
};

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

// Pre-launch stats: no cohort has run yet, so these describe the program
// itself rather than claiming past student outcomes.
export const STATS: Stat[] = [
  { label: "Cost for founding cohort", value: 0, prefix: "$" },
  { label: "Core modules", value: 6 },
  { label: "Spots in founding cohort", value: 25 },
  { label: "Weeks of live training", value: 4 },
];

export const CURRICULUM = [
  {
    title: "Finding High-Ticket Offers",
    desc: "Identify and vet remote closing offers worth your time.",
    icon: "Target",
  },
  {
    title: "Cold & Warm Outreach",
    desc: "Fill your pipeline without sounding like a spammer.",
    icon: "Send",
  },
  {
    title: "Discovery Calls",
    desc: "Ask the right questions and qualify leads fast.",
    icon: "PhoneCall",
  },
  {
    title: "Objection Handling",
    desc: "Turn hesitation into momentum, every time.",
    icon: "ShieldCheck",
  },
  {
    title: "Closing Frameworks",
    desc: "Proven scripts and structures that close deals.",
    icon: "Handshake",
  },
  {
    title: "Landing Your First Role",
    desc: "Position yourself and get hired by remote teams.",
    icon: "Briefcase",
  },
];

export const STEPS = [
  {
    title: "Apply",
    desc: "Submit your application and tell us about your goals.",
  },
  {
    title: "Get Accepted",
    desc: "We review every application to keep cohorts high quality.",
  },
  {
    title: "Train Live + On-Demand",
    desc: "Learn the frameworks through live sessions and self-paced modules.",
  },
  {
    title: "Start Closing",
    desc: "Land remote roles and start generating commissions.",
  },
];

