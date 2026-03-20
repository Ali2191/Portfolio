"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ExternalLink, Github, Mail, ArrowRight, MapPin, Star, GitFork, Calendar } from "lucide-react";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const NAV_LINKS = ["about","projects","skills","github","contact"];

const PROJECTS = [
  {
    name: "IsItAI",
    status: "Live",
    desc: "Five-layer forensic AI image detection system. Detects AI-generated images using model ensembles, EXIF forensics, FFT frequency analysis, face/skin heuristics, and dimension analysis.",
    tags: ["Next.js","AI/ML","Vercel"],
    live: "https://isitai-gilt.vercel.app",
    github: "https://github.com/Ali2191",
    accent: "#22d3ee",
  },
  {
    name: "Learnify",
    status: "In Progress",
    desc: "Pakistani student learning platform targeting NUST NET, FAST NAT-ICS, MDCAT exam prep. Built with AI-powered practice questions and spaced repetition.",
    tags: ["Next.js 14","Supabase","Gemini API"],
    live: null,
    github: "https://github.com/Ali2191",
    accent: "#6366f1",
  },
  {
    name: "Pakistan Resume Builder",
    status: "Built",
    desc: "AI-powered resume builder with ATS scoring, cover letter generation, bullet writer, and four professional templates tailored for Pakistani job market.",
    tags: ["React","Claude API","PDF"],
    live: null,
    github: "https://github.com/Ali2191",
    accent: "#818cf8",
  },
  {
    name: "UniDash",
    status: "In Progress",
    desc: "Unified Gmail, Google Calendar, and Tasks mobile app built with Expo and React Native. Google Cloud OAuth for seamless student productivity.",
    tags: ["React Native","Expo","Google APIs"],
    live: null,
    github: "https://github.com/Ali2191",
    accent: "#22d3ee",
  },
];

const SKILLS: Record<string, string[]> = {
  "Languages":    ["Python","JavaScript","TypeScript","HTML/CSS"],
  "Frontend":     ["Next.js","React","React Native","Tailwind CSS"],
  "Backend & DB": ["Supabase","Node.js","REST APIs"],
  "AI & Tools":   ["Gemini API","Claude API","n8n","Vercel"],
  "Design":       ["Figma","CapCut","Adobe Express"],
};

const COUNTERS = [
  { value: 8, suffix: "mo+", label: "Design experience" },
  { value: 4,  suffix: "+",   label: "Projects shipped" },
  { value: 2,  suffix: "+",   label: "Years building" },
  { value: 18, suffix: "",    label: "Years old" },
];

/* ══════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════ */
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("cursor-active");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(loop);
    };

    const onDown = () => ringRef.current?.classList.add("clicking");
    const onUp   = () => ringRef.current?.classList.remove("clicking");

    const onEnterLink = () => ringRef.current?.classList.add("hover-link");
    const onLeaveLink = () => ringRef.current?.classList.remove("hover-link");
    const onEnterCard = () => ringRef.current?.classList.add("hover-card");
    const onLeaveCard = () => ringRef.current?.classList.remove("hover-card");

    const bindHovers = () => {
      document.querySelectorAll("a,button").forEach(el => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
      document.querySelectorAll(".glass-card").forEach(el => {
        el.addEventListener("mouseenter", onEnterCard);
        el.addEventListener("mouseleave", onLeaveCard);
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf.current = requestAnimationFrame(loop);
    setTimeout(bindHovers, 500);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
      document.body.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef}>
        <span id="cursor-label">View</span>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = el.dataset.delay || "0";
          setTimeout(() => el.classList.add("visible"), parseInt(delay));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ══════════════════════════════════════════════
   COUNTER ANIMATION HOOK
══════════════════════════════════════════════ */
function useCounter(target: number, triggered: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [triggered, target]);
  return val;
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function Nav({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:"1.1rem", color:"var(--accent-primary)", textDecoration:"none" }}>AT.</a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l}`}
                style={{
                  fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", fontWeight:500,
                  textDecoration:"none", textTransform:"capitalize", letterSpacing:"0.02em",
                  color: activeSection === l ? "var(--accent-glow)" : "var(--text-muted)",
                  transition:"color 0.2s",
                  position:"relative",
                }}
              >
                {l}
                {activeSection === l && (
                  <span style={{
                    position:"absolute", bottom:"-4px", left:0, right:0, height:"2px",
                    background:"var(--accent-primary)", borderRadius:"1px",
                    boxShadow:"0 0 8px rgba(99,102,241,0.8)"
                  }} />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(true)}
            style={{ background:"none", border:"none", cursor:"pointer" }}>
            {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:1.5, background:"var(--text-secondary)", borderRadius:1 }} />)}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background:"rgba(10,10,10,0.97)", backdropFilter:"blur(20px)" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position:"absolute", top:20, right:24, background:"none", border:"none", color:"var(--text-muted)", fontSize:"1.5rem", cursor:"pointer" }}>✕</button>
          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((l, i) => (
              <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily:"'Inter',sans-serif", fontSize:"2rem", fontWeight:600,
                  textDecoration:"none", textTransform:"capitalize",
                  color:"var(--text-primary)", animation:`fadeSlideUp 0.4s ${i*0.07}s both`,
                }}
              >{l}</a>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}

/* ══════════════════════════════════════════════
   SCROLL PROGRESS INDICATOR
══════════════════════════════════════════════ */
function ScrollProgress({ activeSection }: { activeSection: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div id="scroll-progress" className="hidden lg:flex">
      <div className="progress-track" style={{ marginBottom: 8 }}>
        <div className="progress-fill" style={{ height: `${progress}%` }} />
      </div>
      {NAV_LINKS.map(l => (
        <a key={l} href={`#${l}`} className={`progress-dot ${activeSection === l ? "active" : ""}`}
          title={l} style={{ display:"block" }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const roles = "CS Student · Full-Stack Developer · AI Builder";

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      if (i < roles.length) { setTyped(roles.slice(0, ++i)); }
      else clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [started]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div className="ambient-orb" style={{ width:500, height:500, background:"rgba(99,102,241,0.08)", top:"-10%", left:"-5%" }} />
      <div className="ambient-orb" style={{ width:400, height:400, background:"rgba(34,211,238,0.05)", bottom:"-5%", right:"-5%" }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Status badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:999, padding:"6px 16px", marginBottom:32 }}
          className="reveal" data-delay="0">
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", animation:"pulse 2s infinite", display:"inline-block" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.15em", color:"#4ade80" }}>AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, lineHeight:1, marginBottom:20 }}>
          <span className="reveal" data-delay="200" style={{ display:"block", fontSize:"clamp(3.5rem,10vw,7rem)", color:"var(--text-primary)", opacity:0 }}>Ali</span>
          <span className="reveal" data-delay="400" style={{ display:"block", fontSize:"clamp(3.5rem,10vw,7rem)", background:"linear-gradient(135deg, #6366f1, #22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", opacity:0 }}>Tayyab</span>
        </h1>

        {/* Typewriter */}
        <p className="reveal" data-delay="800"
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.8rem,2vw,1rem)", color:"var(--text-secondary)", marginBottom:16, minHeight:"1.5em", letterSpacing:"0.05em", opacity:0 }}>
          <span>{typed}</span>
          {typed.length < roles.length && <span className="typewriter-cursor" />}
        </p>

        {/* Location */}
        <div className="reveal" data-delay="900" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:"var(--text-muted)", marginBottom:24, opacity:0 }}>
          <MapPin size={12} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem" }}>Kot Addu, Punjab, Pakistan</span>
        </div>

        {/* Bio */}
        <p className="reveal" data-delay="1000"
          style={{ fontSize:"1.05rem", color:"var(--text-secondary)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.7, opacity:0 }}>
          I build AI-powered web apps that solve real problems. Currently pursuing CS at FAST University, shipping side projects, and turning ideas into products.
        </p>

        {/* CTAs */}
        <div className="reveal" data-delay="1200" style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", opacity:0 }}>
          <a href="#projects" className="btn-primary">View my work <ArrowRight size={15} /></a>
          <a href="#contact" className="btn-ghost">Get in touch</a>
        </div>

        {/* Scroll indicator */}
        <div className="reveal" data-delay="1600" style={{ marginTop:80, display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0 }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", color:"var(--text-muted)", letterSpacing:"0.15em" }}>SCROLL</span>
          <div style={{ width:1, height:40, background:"linear-gradient(to bottom, var(--accent-primary), transparent)", animation:"scrollBounce 2s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════ */
function CounterCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCounter(value, triggered);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }}, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="counter-card">
      <div style={{ fontSize:"2.2rem", fontWeight:700, fontFamily:"'Inter',sans-serif", background:"linear-gradient(135deg,var(--accent-primary),var(--accent-cta))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.1, marginBottom:4 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize:"0.78rem", color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace" }}>{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="mono-tag reveal" data-delay="0">// about</p>
        <h2 className="reveal" data-delay="80" style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, marginTop:8, marginBottom:48, color:"var(--text-primary)" }}>
          Before Code &amp; Right Now
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="reveal-left" data-delay="100">
            <div style={{ borderLeft:"2px solid var(--accent-primary)", paddingLeft:20, marginBottom:24 }}>
              <h3 style={{ fontSize:"1.1rem", fontWeight:600, marginBottom:10, color:"var(--text-primary)" }}>The Path Here</h3>
              <p style={{ color:"var(--text-secondary)", lineHeight:1.8, fontSize:"0.95rem" }}>
                Before becoming a developer, I worked 8 months as a graphic designer and as a customer service specialist at IBEX on Amazon campaigns. That experience taught me to think about users first — a habit that makes my code better.
              </p>
            </div>
            <div style={{ borderLeft:"2px solid var(--accent-cta)", paddingLeft:20 }}>
              <h3 style={{ fontSize:"1.1rem", fontWeight:600, marginBottom:10, color:"var(--text-primary)" }}>Right Now</h3>
              <p style={{ color:"var(--text-secondary)", lineHeight:1.8, fontSize:"0.95rem" }}>
                Preparing for FAST University NAT-ICS, building Learnify — a learning platform for Pakistani students, and constantly shipping. I read, build, and improve every single day.
              </p>
            </div>
          </div>

          <div className="reveal-right" data-delay="200">
            <div style={{ borderLeft:"2px solid var(--accent-glow)", paddingLeft:20, marginBottom:24 }}>
              <h3 style={{ fontSize:"1.1rem", fontWeight:600, marginBottom:10, color:"var(--text-primary)" }}>The Goal</h3>
              <p style={{ color:"var(--text-secondary)", lineHeight:1.8, fontSize:"0.95rem" }}>
                I want a remote tech career that lets me work from anywhere. I&apos;m drawn to the intersection of AI and practical tools — software that makes a real difference for real people.
              </p>
            </div>
            <div style={{ borderLeft:"2px solid rgba(255,255,255,0.1)", paddingLeft:20 }}>
              <h3 style={{ fontSize:"1.1rem", fontWeight:600, marginBottom:10, color:"var(--text-primary)" }}>Tech Stack</h3>
              <p style={{ color:"var(--text-secondary)", lineHeight:1.8, fontSize:"0.95rem" }}>
                Next.js, React, TypeScript, Supabase, Tailwind CSS — with a growing focus on AI APIs (Gemini, Claude). I build full-stack from scratch and deploy to Vercel.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COUNTERS.map((c, i) => (
            <div key={c.label} className="reveal" data-delay={`${i * 80}`}>
              <CounterCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROJECT CARD with 3D tilt
══════════════════════════════════════════════ */
function ProjectCard({ p, delay }: { p: typeof PROJECTS[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "";
  }, []);

  const badge = p.status === "Live" ? "badge-live" : p.status === "In Progress" ? "badge-wip" : "badge-built";

  return (
    <div className="reveal" data-delay={`${delay}`} style={{ opacity:0 }}>
      <div ref={cardRef} className="glass-card" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
        style={{ padding:28, height:"100%", display:"flex", flexDirection:"column", gap:16, willChange:"transform", transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.4s" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <h3 style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--text-primary)" }}>{p.name}</h3>
              <span className={badge}>{p.status}</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, opacity:0.4 }} className="card-actions">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer"
                style={{ color:"var(--text-secondary)", display:"flex", alignItems:"center" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-cta)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                <ExternalLink size={15} />
              </a>
            )}
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{ color:"var(--text-secondary)", display:"flex", alignItems:"center" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-glow)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
              <Github size={15} />
            </a>
          </div>
        </div>

        <p style={{ fontSize:"0.88rem", color:"var(--text-secondary)", lineHeight:1.7, flexGrow:1 }}>{p.desc}</p>

        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {p.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>

        {/* Accent bottom line */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${p.accent}50, transparent)`, opacity:0, transition:"opacity 0.3s" }}
          className="card-glow-line" />
      </div>
      <style>{`.glass-card:hover .card-actions{opacity:1!important}.glass-card:hover .card-glow-line{opacity:1!important}`}</style>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="mono-tag reveal" data-delay="0">// projects</p>
        <h2 className="reveal" data-delay="80" style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, marginTop:8, marginBottom:8, color:"var(--text-primary)" }}>
          Things I&apos;ve built
        </h2>
        <p className="reveal" data-delay="120" style={{ color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem", marginBottom:48 }}>
          Real products, real users, real code.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════ */
function Skills() {
  return (
    <section id="skills" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="mono-tag reveal" data-delay="0">// skills</p>
        <h2 className="reveal" data-delay="80" style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, marginTop:8, marginBottom:48, color:"var(--text-primary)" }}>
          What I work with
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat}>
              <p className="reveal" data-delay={`${ci * 40}`} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", color:"var(--text-muted)", letterSpacing:"0.18em", marginBottom:12, opacity:0 }}>
                {cat.toUpperCase()}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {items.map((s, si) => (
                  <span key={s} className="skill-chip reveal" data-delay={`${ci * 40 + si * 40}`} style={{ opacity:0 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   GITHUB ACTIVITY
══════════════════════════════════════════════ */
type GHRepo = { id: number; name: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; updated_at: string; html_url: string; };
type GHUser = { login: string; avatar_url: string; bio: string | null; followers: number; public_repos: number; html_url: string; };

function GithubSection() {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const GH = "Ali2191";
    Promise.all([
      fetch(`https://api.github.com/users/${GH}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=4`).then(r => r.json()),
    ])
    .then(([u, r]) => {
      if (u.login) setUser(u);
      if (Array.isArray(r)) setRepos(r.slice(0, 4));
    })
    .catch(() => setError(true));
  }, []);

  const langColor: Record<string, string> = {
    TypeScript:"#3178c6", JavaScript:"#f7df1e", Python:"#3572A5",
    CSS:"#563d7c", HTML:"#e34c26",
  };

  return (
    <section id="github" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="mono-tag reveal" data-delay="0">// github</p>
        <h2 className="reveal" data-delay="80" style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, marginTop:8, marginBottom:48, color:"var(--text-primary)" }}>
          GitHub Activity
        </h2>

        {error && (
          <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-subtle)", borderRadius:12, padding:24, color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem" }}>
            GitHub API rate limited. <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" style={{ color:"var(--accent-glow)" }}>View profile directly →</a>
          </div>
        )}

        {!error && (
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {/* Profile card */}
            {user && (
              <div className="reveal" data-delay="100" style={{ background:"var(--bg-surface)", border:"1px solid var(--border-subtle)", borderRadius:16, padding:24, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap", opacity:0 }}>
                <img src={user.avatar_url} alt="avatar" style={{ width:64, height:64, borderRadius:"50%", border:"2px solid rgba(99,102,241,0.3)" }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:"1.1rem", color:"var(--text-primary)", marginBottom:4 }}>{user.login}</div>
                  {user.bio && <div style={{ color:"var(--text-secondary)", fontSize:"0.88rem", marginBottom:8 }}>{user.bio}</div>}
                  <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", color:"var(--text-muted)" }}>{user.followers} followers</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", color:"var(--text-muted)" }}>{user.public_repos} repos</span>
                  </div>
                </div>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ whiteSpace:"nowrap" }}>
                  <Github size={14} /> View Profile
                </a>
              </div>
            )}

            {/* Repo grid */}
            {repos.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4">
                {repos.map((repo, i) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    className="github-repo-card reveal" data-delay={`${200 + i * 80}`}
                    style={{ opacity:0, textDecoration:"none", display:"block" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <span style={{ fontWeight:600, fontSize:"0.95rem", color:"var(--text-primary)" }}>{repo.name}</span>
                      <div style={{ display:"flex", gap:10, color:"var(--text-muted)", fontSize:"0.75rem", fontFamily:"'JetBrains Mono',monospace", flexShrink:0, marginLeft:8 }}>
                        <span style={{ display:"flex", alignItems:"center", gap:3 }}><Star size={11} />{repo.stargazers_count}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:3 }}><GitFork size={11} />{repo.forks_count}</span>
                      </div>
                    </div>
                    {repo.description && <p style={{ fontSize:"0.82rem", color:"var(--text-secondary)", marginBottom:12, lineHeight:1.6 }}>{repo.description}</p>}
                    <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                      {repo.language && (
                        <span style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color:"var(--text-muted)" }}>
                          <span style={{ width:8, height:8, borderRadius:"50%", background:langColor[repo.language] || "#888", display:"inline-block" }} />
                          {repo.language}
                        </span>
                      )}
                      <span style={{ display:"flex", alignItems:"center", gap:4, fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color:"var(--text-muted)" }}>
                        <Calendar size={10} /> {new Date(repo.updated_at).toLocaleDateString("en-US",{month:"short",year:"numeric"})}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Placeholder while loading */}
            {!user && !error && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ background:"var(--bg-surface)", border:"1px solid var(--border-subtle)", borderRadius:12, padding:20, height:100, animation:"shimmer 1.5s infinite" }} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes shimmer{0%,100%{opacity:0.4}50%{opacity:0.7}}`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════ */
function Contact() {
  const [blink, setBlink] = useState(true);
  useEffect(() => { const t = setInterval(() => setBlink(b => !b), 600); return () => clearInterval(t); }, []);
  return (
    <section id="contact" className="relative z-10 py-32 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <p className="mono-tag reveal" data-delay="0">// contact</p>
        <h2 className="reveal" data-delay="80"
          style={{ fontSize:"clamp(2.5rem,7vw,5rem)", fontWeight:700, marginTop:8, marginBottom:16, color:"var(--text-primary)", lineHeight:1.1, opacity:0 }}>
          Let&apos;s build something<span style={{ color:"var(--accent-cta)", opacity: blink ? 1 : 0, transition:"opacity 0.1s" }}>.</span>
        </h2>
        <p className="reveal" data-delay="160" style={{ color:"var(--text-secondary)", fontSize:"1.05rem", marginBottom:48, opacity:0 }}>
          Open to internships, freelance work, collaborations, and interesting conversations.
        </p>

        <div className="reveal" data-delay="240" style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center", marginBottom:64, opacity:0 }}>
          <a href="mailto:alitayyab@example.com" className="contact-tile" style={{ maxWidth:280 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Mail size={20} color="var(--accent-glow)" />
            </div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontWeight:600, color:"var(--text-primary)", marginBottom:2 }}>Email</div>
              <div style={{ fontSize:"0.82rem", color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace" }}>alitayyab@example.com</div>
            </div>
          </a>
          <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" className="contact-tile" style={{ maxWidth:280 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Github size={20} color="var(--accent-cta)" />
            </div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontWeight:600, color:"var(--text-primary)", marginBottom:2 }}>GitHub</div>
              <div style={{ fontSize:"0.82rem", color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace" }}>github.com/Ali2191</div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div style={{ borderTop:"1px solid var(--border-subtle)", paddingTop:32, color:"var(--text-muted)", fontSize:"0.78rem", fontFamily:"'JetBrains Mono',monospace", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
          <span>© 2025 Ali Tayyab</span>
          <span>Built with Next.js + Tailwind · Deployed on Vercel</span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ACTIVE SECTION TRACKER
══════════════════════════════════════════════ */
function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    NAV_LINKS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function Home() {
  const active = useActiveSection();
  useScrollReveal();

  return (
    <>
      <Cursor />
      <div className="grid-texture" />

      {/* Ambient orbs */}
      <div className="ambient-orb" style={{ width:600, height:600, background:"rgba(99,102,241,0.05)", top:"20%", left:"60%", transform:"translateX(-50%)" }} />
      <div className="ambient-orb" style={{ width:400, height:400, background:"rgba(34,211,238,0.04)", top:"60%", left:"10%" }} />

      <Nav activeSection={active} />
      <ScrollProgress activeSection={active} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <GithubSection />
        <Contact />
      </main>
    </>
  );
}
