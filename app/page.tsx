"use client";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Mail, ArrowRight, MapPin, Sparkles } from "lucide-react";

/* ── DATA ── */
const projects = [
  {
    name: "IsItAI",
    desc: "Five-layer forensic AI image detection system. Detects AI-generated images using model ensembles, EXIF forensics, FFT frequency analysis, face/skin heuristics, and dimension analysis.",
    tags: ["Next.js", "AI/ML", "Vercel"],
    accent: "#00f5d4",
    live: "https://isitai-gilt.vercel.app",
    github: "#",
    status: "Live",
  },
  {
    name: "Learnify",
    desc: "Pakistani student learning platform targeting NUST NET, FAST NAT-ICS, MDCAT exam prep. Built with AI-powered practice questions and spaced repetition.",
    tags: ["Next.js 14", "Supabase", "Gemini API"],
    accent: "#7b5ea7",
    live: "#",
    github: "#",
    status: "In Progress",
  },
  {
    name: "Pakistan Resume Builder",
    desc: "AI-powered resume builder with ATS scoring, cover letter generation, bullet writer, and four professional templates tailored for Pakistani job market.",
    tags: ["React", "AI", "PDF"],
    accent: "#f72585",
    live: "#",
    github: "#",
    status: "Built",
  },
  {
    name: "UniDash",
    desc: "Unified Gmail, Google Calendar, and Tasks mobile app built with Expo and React Native. Google Cloud OAuth integration for seamless student productivity.",
    tags: ["React Native", "Expo", "Google APIs"],
    accent: "#00f5d4",
    live: "#",
    github: "#",
    status: "In Progress",
  },
];

const skills = {
  "Languages": ["Python", "JavaScript", "TypeScript", "HTML/CSS"],
  "Frontend": ["Next.js", "React", "React Native", "Tailwind CSS"],
  "Backend & DB": ["Supabase", "Node.js", "REST APIs"],
  "AI & Tools": ["Gemini API", "Claude API", "n8n", "Vercel"],
  "Design": ["Figma", "CapCut", "Adobe Express"],
};

/* ── STARS ── */
function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.004 + 0.001,
      });
    }
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 0.01;
      stars.forEach((s) => {
        const opacity = s.o * (0.7 + 0.3 * Math.sin(frame * s.speed * 60));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ── CURSOR ── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
      rx += (e.clientX - rx) * 0.15;
      ry += (e.clientY - ry) * 0.15;
      if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  const links = ["about", "projects", "skills", "contact"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Mono', monospace", color: "var(--accent)" }}>
          AT<span className="text-white/30">.</span>
        </a>
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l}`} className="text-sm text-white/50 hover:text-white transition-colors capitalize tracking-wide" style={{ fontFamily: "'Space Mono', monospace" }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ background: "rgba(0,245,212,0.06)", border: "1px solid rgba(0,245,212,0.15)" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="section-tag" style={{ fontSize: "0.68rem" }}>Available for opportunities</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6">
          <span className="block text-white/90">Ali</span>
          <span className="block glow-text">Tayyab</span>
        </h1>

        <p className="text-white/40 text-sm mb-2" style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
          CS Student &nbsp;·&nbsp; Full-Stack Developer &nbsp;·&nbsp; AI Builder
        </p>

        <div className="flex items-center justify-center gap-1.5 mb-10 text-white/30 text-sm">
          <MapPin size={13} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>Kot Addu, Punjab, Pakistan</span>
        </div>

        <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-12">
          I build AI-powered web apps that solve real problems. Currently pursuing CS at FAST University, shipping side projects, and turning ideas into products.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-accent">
            View my work <ArrowRight size={15} />
          </a>
          <a href="#contact" className="text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            Get in touch
          </a>
        </div>

        {/* Floating orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,94,167,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="section-tag mb-4">// about me</p>
        <h2 className="text-4xl font-bold mb-16 text-white/90">Who I am</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-3 text-white/90">The Builder</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              I&apos;m an 18-year-old CS student from Pakistan building real products — from AI image detectors to exam prep platforms. I learn by shipping. Every project teaches me something new about design, engineering, and users.
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold mb-3 text-white/90">The Goal</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              I want to build a remote tech career that lets me work from anywhere in the world. I&apos;m drawn to the intersection of AI and practical tools — software that makes a real difference for real people.
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold mb-3 text-white/90">Before Code</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              Before becoming a developer, I worked 8 months as a graphic designer and as a customer service specialist at IBEX on Amazon campaigns. That taught me how to think about users and communicate clearly — skills that make me a better engineer.
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-3 text-white/90">Right Now</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              Preparing for FAST University NAT-ICS, actively building Learnify — a platform specifically for Pakistani students preparing for university entrance exams. Reading, shipping, improving every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
function Projects() {
  return (
    <section id="projects" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="section-tag mb-4">// projects</p>
        <h2 className="text-4xl font-bold mb-4 text-white/90">Things I&apos;ve built</h2>
        <p className="text-white/40 text-sm mb-16" style={{ fontFamily: "'Space Mono', monospace" }}>Real products, real users, real code.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p.name} className="glass-card p-7 group flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white/90">{p.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      background: p.status === "Live" ? "rgba(0,200,100,0.1)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${p.status === "Live" ? "rgba(0,200,100,0.25)" : "rgba(255,255,255,0.1)"}`,
                      color: p.status === "Live" ? "#4ade80" : "rgba(255,255,255,0.35)",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.live !== "#" && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <a href={p.github} className="text-white/30 hover:text-white transition-colors">
                    <Github size={16} />
                  </a>
                </div>
              </div>

              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}40, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ── */
function Skills() {
  return (
    <section id="skills" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="section-tag mb-4">// skills</p>
        <h2 className="text-4xl font-bold mb-16 text-white/90">What I work with</h2>
        <div className="space-y-10">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-white/30 text-xs mb-4" style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em" }}>{cat.toUpperCase()}</p>
              <div className="flex flex-wrap gap-3">
                {items.map((s) => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { n: "4+", label: "Projects shipped" },
            { n: "2+", label: "Years building" },
            { n: "18", label: "Years old" },
            { n: "∞", label: "Ideas left" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <div className="text-3xl font-bold glow-text mb-1">{s.n}</div>
              <div className="text-white/40 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section id="contact" className="relative z-10 py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-tag mb-4">// contact</p>
        <h2 className="text-4xl font-bold mb-6 text-white/90">Let&apos;s talk</h2>
        <p className="text-white/50 leading-relaxed mb-12 text-lg">
          I&apos;m open to internships, freelance projects, collaborations, and interesting conversations. If you have an idea or opportunity, reach out.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:alitayyab@example.com" className="btn-accent text-base px-8 py-3">
            <Mail size={16} />
            Send me an email
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="btn-accent text-base px-8 py-3">
            <Github size={16} />
            GitHub
          </a>
        </div>

        <div className="mt-24 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/20 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
            Built by Ali Tayyab &nbsp;·&nbsp; Next.js + Tailwind &nbsp;·&nbsp; 2025
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <>
      <Cursor />
      <div className="space-bg" />
      <div className="grid-lines" />
      <Stars />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
