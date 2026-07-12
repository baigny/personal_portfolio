import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight, Menu, X,
  Code2, Layers, Database, Wrench, Cloud, Palette, FlaskConical,
  GraduationCap, Award, Server, Circle, Sun, Moon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Nabil Yaseen Baig",
  role: "Frontend Engineer",
  tagline: "React · Next.js · TypeScript · moving full-stack",
  location: "Hyderabad, India",
  email: "baigny@gmail.com",
  phone: "+91 94817 66276",
  github: "https://github.com/baigny",
  linkedin: "https://www.linkedin.com/in/nybui/",
  status: "Open to work",
};

const SPEC = [
  { k: "role", v: "Frontend Engineer" },
  { k: "focus", v: "React · TypeScript · GraphQL" },
  { k: "experience", v: "5 years, production" },
  { k: "based_in", v: "Hyderabad, IN" },
  { k: "status", v: "Open to work" },
];

const EXPERIENCE = [
  {
    company: "Ngenux Solutions",
    role: "Full Stack Developer",
    client: "OPAL — Assessment & Certification Platform",
    period: "Nov 2024 – Dec 2025",
    points: [
      "Built 5 role-based React SPA portals (Admin, Assessor, Candidate, Employer, Master Access) with RBAC and dynamic route guards.",
      "Owned the full certification lifecycle UI — enrollment, scheduling, slot management, admit cards, evaluation and certificate delivery.",
      "Wrote type-safe GraphQL with Apollo Client + Codegen, analytics dashboards in Recharts, and multi-step forms with React Hook Form + Zod.",
      "Contributed across the stack: NestJS resolvers, TypeORM (PostgreSQL), Mongoose (MongoDB) and Apollo Federation subgraphs.",
      "Ran L1 production support for 5 portals and 6 microservices — caching, federated schema fixes, payments (PayTabs) and notifications (SendGrid / RabbitMQ).",
    ],
    tech: ["React 18", "TypeScript", "Vite", "Apollo Client", "Tailwind CSS", "Radix / shadcn", "React Hook Form", "Zod", "Recharts", "Auth0", "i18next", "NestJS", "Apollo Federation", "PostgreSQL", "MongoDB"],
  },
  {
    company: "Ngenux Solutions",
    role: "Frontend Developer",
    client: "EdTech — Amazon IVS Live Streaming",
    period: "Jan 2024 – Jan 2025",
    points: [
      "Built the React UI for a low-latency live-streaming education platform powered by Amazon IVS.",
      "Shipped real-time engagement features — live chat, polling and Q&A during sessions.",
      "Tuned cross-device playback to cut buffering and keep streams smooth.",
    ],
    tech: ["React.js", "TypeScript", "Amazon IVS SDK", "AWS"],
  },
  {
    company: "Ngenux Solutions",
    role: "Frontend Developer",
    client: "DocTutorials — Medical Exam Coaching",
    period: "Jan 2023 – Dec 2023",
    points: [
      "Developed a cross-platform React Native app (Android & iOS) for NEET PG, FMGE and INI CET aspirants.",
      "Implemented deep-linking and push-notification routing to lift re-engagement.",
      "Resolved critical UI bugs and managed releases via Bitbucket with sprints tracked in Jira.",
    ],
    tech: ["React Native", "React.js", "Bitbucket", "Jira"],
  },
  {
    company: "Ngenux Solutions",
    role: "Frontend Developer",
    client: "Paro — FinTech Talent Matching (US)",
    period: "Apr 2021 – Apr 2023",
    points: [
      "Built reusable components and full-page layouts in React, Next.js and TypeScript for a US fintech product.",
      "Contributed to a Base-UI design system, standardising CSS architecture and improving accessibility.",
      "Integrated Apollo GraphQL with Federation to cut over-fetching, and wrote Jest unit tests.",
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Base-UI", "GraphQL", "Apollo", "Jest"],
  },
  {
    company: "ALTN Solutions",
    role: "Frontend Developer",
    client: "Flixmedia — Rich Media for Global Retailers",
    period: "Mar 2019 – Mar 2021",
    points: [
      "Built Inpage, Minisite and Hotspot rich-media experiences for major global retail brands.",
      "Applied responsive design across browsers and devices, optimising assets and page-load performance.",
    ],
    tech: ["HTML5", "CSS3", "jQuery", "Bootstrap", "JavaScript"],
  },
];

const SKILLS = [
  { label: "Languages", icon: Code2, items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "PHP"] },
  { label: "Frontend", icon: Layers, items: ["React.js", "Next.js", "React Native", "Flutter"] },
  { label: "UI Systems", icon: Palette, items: ["Tailwind CSS", "Material UI", "shadcn / Radix", "Chakra UI", "Ant Design", "Styled Components", "Bootstrap"] },
  { label: "Backend", icon: Server, items: ["NestJS", "Node.js", "GraphQL", "Apollo Federation", "REST APIs"] },
  { label: "Databases", icon: Database, items: ["PostgreSQL", "MongoDB", "MySQL", "SQL"] },
  { label: "Testing", icon: FlaskConical, items: ["Jest", "Cross-browser QA"] },
  { label: "Tooling", icon: Wrench, items: ["Git", "GitHub", "Bitbucket", "CI/CD", "Jira", "Trello", "Asana"] },
  { label: "Cloud & Design", icon: Cloud, items: ["AWS", "Amazon IVS", "Photoshop", "CorelDraw"] },
];

const EDUCATION = [
  { degree: "Master of Business Administration (MBA)", school: "PACE, Mangaluru, Karnataka", period: "2013 – 2015" },
  { degree: "Bachelor of Computer Applications (BCA)", school: "PACE, Mangaluru, Karnataka", period: "2007 – 2010" },
];

const CERTS = [
  "Udacity — Front-End Web Developer Nanodegree",
  "Google — Google Ads Certification (Academy for Ads)",
  "MICE — Adobe Photoshop & CorelDraw",
];

const SECTIONS = [
  { id: "work", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  Theme                                                              */
/* ------------------------------------------------------------------ */

function useTheme() {
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion helpers                                                     */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ index, children }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
      <span className="text-amber-500 dark:text-amber-400">{index}</span>
      <span className="h-px w-8 bg-emerald-300 dark:bg-emerald-700" />
      <span>{children}</span>
    </div>
  );
}

function Token({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Nav({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-slate-200 bg-stone-50/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 font-mono text-sm font-bold text-emerald-300 dark:bg-emerald-500 dark:text-slate-950">
            ny
          </span>
          <span className="font-mono text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100">
            baig<span className="text-emerald-600 dark:text-emerald-400">.dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400">
              {s.label}
            </a>
          ))}
          <ThemeToggle dark={dark} setDark={setDark} />
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
            Hire me <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button onClick={() => setOpen((v) => !v)} className="text-slate-900 dark:text-slate-100" aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-stone-50 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="py-2.5 font-mono text-sm uppercase tracking-widest text-slate-600 dark:text-slate-300">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${PROFILE.email}`} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-slate-900 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-white dark:bg-emerald-500 dark:text-slate-950">
              Hire me <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient grid + glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-200 opacity-40 blur-3xl dark:bg-emerald-700 dark:opacity-20" />
      <div className="pointer-events-none absolute top-32 -left-20 h-72 w-72 rounded-full bg-amber-100 opacity-50 blur-3xl dark:bg-amber-700 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </span>
                {PROFILE.status} · {PROFILE.location}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-slate-50">
                I turn hard requirements into{" "}
                <span className="text-emerald-700 dark:text-emerald-400">fast, reliable</span> React apps
                <span className="text-amber-500">.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Frontend engineer with five years shipping responsive, type-safe
                web and mobile products — component systems, GraphQL APIs, and
                the NestJS services behind them, taken from prototype to production.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                  <Mail className="h-4 w-4" /> Get in touch
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-400">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-400">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </Reveal>
          </div>

          {/* spec panel — the signature element */}
          <Reveal delay={200}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-xl border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex items-center gap-1.5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
                <span className="ml-3 font-mono text-xs text-slate-400">profile.spec</span>
              </div>
              <div className="rounded-lg bg-slate-900 p-5 font-mono text-sm dark:bg-slate-950">
                <p className="text-slate-500"><span className="text-emerald-400">const</span> <span className="text-amber-300">developer</span> = {"{"}</p>
                {SPEC.map((row) => (
                  <p key={row.k} className="pl-4 text-slate-300">
                    <span className="text-emerald-300">{row.k}</span>:{" "}
                    <span className="text-amber-200">&quot;{row.v}&quot;</span>,
                  </p>
                ))}
                <p className="text-slate-500">{"}"};</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal><Eyebrow index="01">Experience</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 className="mb-14 max-w-2xl font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
          Five years of client work, shipped to production.
        </h2>
      </Reveal>

      <motion.div
        className="space-y-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {EXPERIENCE.map((job, i) => (
          <motion.article
            key={i}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group relative grid gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-emerald-300 hover:shadow-md md:grid-cols-[200px_1fr] md:p-8 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
          >
            <div className="md:border-r md:border-slate-100 md:pr-6 dark:md:border-slate-800">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{job.period}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-slate-50">{job.role}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
            </div>

            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Circle className="h-2 w-2 fill-current" /> {job.client}
              </p>
              <ul className="space-y-2.5">
                {job.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-amber-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((t) => <Token key={t}>{t}</Token>)}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal><Eyebrow index="02">Skills</Eyebrow></Reveal>
        <Reveal delay={60}>
          <h2 className="mb-14 max-w-2xl font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
            A working toolkit, grouped the way I reach for it.
          </h2>
        </Reveal>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {SKILLS.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.label}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full rounded-xl border border-slate-200 bg-stone-50 p-5 transition-colors hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-700"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-slate-900 dark:text-slate-100">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((t) => <Token key={t}>{t}</Token>)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal><Eyebrow index="03">Education &amp; Credentials</Eyebrow></Reveal>

      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="mb-7 flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              <GraduationCap className="h-5 w-5 text-emerald-700 dark:text-emerald-400" /> Education
            </h2>
            <div className="space-y-4">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{e.period}</p>
                  <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-slate-50">{e.degree}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{e.school}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h2 className="mb-7 flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              <Award className="h-5 w-5 text-emerald-700 dark:text-emerald-400" /> Certifications
            </h2>
            <div className="space-y-3">
              {CERTS.map((c) => (
                <div key={c} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-900 dark:bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-600 opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
            <span className="text-amber-400">04</span>
            <span className="h-px w-8 bg-emerald-700" />
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Let&apos;s build something solid together.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-xl text-lg text-slate-400">
            Open to frontend and full-stack roles. The fastest way to reach me is email — I usually reply within a day.
          </p>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            href={`mailto:${PROFILE.email}`}
            className="group flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-colors hover:border-emerald-500"
          >
            <Mail className="h-5 w-5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">Email</span>
            <span className="break-all text-sm text-slate-200 group-hover:text-white">{PROFILE.email}</span>
          </motion.a>
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
            className="group flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-colors hover:border-emerald-500"
          >
            <Phone className="h-5 w-5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">Phone</span>
            <span className="text-sm text-slate-200 group-hover:text-white">{PROFILE.phone}</span>
          </motion.a>
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-colors hover:border-emerald-500"
          >
            <Github className="h-5 w-5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">GitHub</span>
            <span className="text-sm text-slate-200 group-hover:text-white">@baigny</span>
          </motion.a>
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-colors hover:border-emerald-500"
          >
            <Linkedin className="h-5 w-5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">LinkedIn</span>
            <span className="text-sm text-slate-200 group-hover:text-white">in/nybui</span>
          </motion.a>
        </motion.div>
      </div>

      <div className="relative border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" /> {PROFILE.location}
          </p>
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} {PROFILE.name} — built with React + Vite + Tailwind
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [dark, setDark] = useTheme();
  return (
    <div className="min-h-screen scroll-smooth bg-stone-50 font-sans text-slate-900 antialiased transition-colors duration-300 selection:bg-emerald-200 selection:text-emerald-900 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-emerald-800 dark:selection:text-emerald-100">
      <Nav dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
