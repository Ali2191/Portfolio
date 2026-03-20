"use client";
import { useEffect, useRef, useState } from "react";

/* ── DATA ── */
const PROJECTS = [
  {
    name: "IsItAI",
    status: "Live" as const,
    year: "2025",
    desc: "Five-layer forensic AI image detection. Model ensembles, EXIF forensics, FFT frequency analysis, face/skin heuristics, and dimension analysis — all in the browser.",
    tags: ["Next.js", "AI/ML", "Vercel"],
    live: "https://isitai-gilt.vercel.app",
    github: "https://github.com/Ali2191",
  },
  {
    name: "Learnify",
    status: "In Progress" as const,
    year: "2025",
    desc: "AI-powered exam prep for Pakistani students. Covers NUST NET, FAST NAT-ICS, MDCAT — with adaptive practice questions and spaced repetition.",
    tags: ["Next.js 14", "Supabase", "Gemini API"],
    live: null,
    github: "https://github.com/Ali2191",
  },
  {
    name: "Pakistan Resume Builder",
    status: "Built" as const,
    year: "2024",
    desc: "Full-stack resume builder with ATS scoring, AI bullet writer, cover letter generation, and four templates designed for the Pakistani job market.",
    tags: ["React", "Claude API", "PDF Generation"],
    live: null,
    github: "https://github.com/Ali2191",
  },
  {
    name: "UniDash",
    status: "In Progress" as const,
    year: "2025",
    desc: "Unified productivity app for students. Gmail, Google Calendar, and Tasks in one mobile interface — built with React Native and Expo.",
    tags: ["React Native", "Expo", "Google APIs"],
    live: null,
    github: "https://github.com/Ali2191",
  },
];

const SKILLS = {
  "Languages":    ["Python", "JavaScript", "TypeScript", "HTML", "CSS"],
  "Frontend":     ["Next.js", "React", "React Native", "Tailwind CSS"],
  "Backend & DB": ["Supabase", "Node.js", "REST APIs", "PostgreSQL"],
  "AI & Tools":   ["Gemini API", "Claude API", "n8n", "Vercel"],
  "Design":       ["Figma", "Adobe Express", "CapCut"],
};

const MARQUEE_ITEMS = [
  "Full-Stack Developer", "AI Builder", "CS Student",
  "Next.js", "Supabase", "Open to Work",
  "Full-Stack Developer", "AI Builder", "CS Student",
  "Next.js", "Supabase", "Open to Work",
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f0db4f",
  Python: "#4B8BBE", CSS: "#7b5ea7", HTML: "#e44d26",
};

/* ── CURSOR ── */
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer:coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top  = e.clientY + "px";
      }
      pos.current = { rx: pos.current.rx + (e.clientX - pos.current.rx) * 0.13,
                      ry: pos.current.ry + (e.clientY - pos.current.ry) * 0.13 };
    };

    let raf: number;
    const loop = () => {
      if (ring.current) {
        ring.current.style.left = pos.current.rx + "px";
        ring.current.style.top  = pos.current.ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cur-dot"  style={{ position:"fixed", pointerEvents:"none" }} />
      <div ref={ring} className="cur-ring" style={{ position:"fixed", pointerEvents:"none" }} />
    </>
  );
}

/* ── NAV ── */
function Nav({ active }: { active: string }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["about", "projects", "skills", "contact"];
  return (
    <nav className={`nav ${solid ? "solid" : ""}`}>
      <a href="#" className="nav-logo">AT.</a>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} className={active === l ? "active" : ""}
               style={{ textTransform: "uppercase" }}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero">
      {/* Top-left status */}
      <div style={{ position:"absolute", top:80, left:40, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"breathe 2.5s ease-in-out infinite" }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.15em", color:"var(--muted)", textTransform:"uppercase" }}>Available for work</span>
      </div>

      {/* Top-right location */}
      <div style={{ position:"absolute", top:80, right:40, fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", color:"var(--muted)", letterSpacing:"0.1em", textAlign:"right" }}>
        <div>Kot Addu, Punjab</div>
        <div style={{ color:"var(--dim)", marginTop:2 }}>Pakistan 🇵🇰</div>
      </div>

      {/* Big name */}
      <div>
        <p className="hero-eyebrow">CS Student · Builder · Developer</p>
        <h1 className="hero-name">
          Ali<br /><em>Tayyab</em>
        </h1>
      </div>

      {/* Bottom row */}
      <div className="hero-bottom">
        <p className="hero-desc">
          I build AI-powered web apps that solve real problems. Currently pursuing CS at FAST University and shipping side projects.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn btn-filled">View my work →</a>
          <a href="#contact"  className="btn btn-outline">Get in touch</a>
        </div>
      </div>

      <style>{`@keyframes breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}`}</style>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about">
      <p className="section-label">About</p>
      <div className="about-grid">
        <div>
          <h2 className="about-heading">
            Before code,<br />there was <em>curiosity.</em>
          </h2>
        </div>
        <div>
          <p className="about-body">
            I&apos;m an 18-year-old CS student from <strong>Kot Addu, Punjab, Pakistan</strong> — preparing for FAST University while building real products on the side.
          </p>
          <p className="about-body">
            Before diving into code, I spent 8 months as a <strong>graphic designer</strong> and worked as a customer service specialist at <strong>IBEX on Amazon campaigns</strong>. That background taught me to think in terms of users, not just features.
          </p>
          <p className="about-body">
            My goal is a <strong>remote tech career</strong> — working from anywhere, building AI-powered tools that make a real difference. I learn by shipping. Every project is a new lesson.
          </p>
          <div style={{ marginTop:32, display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize:"0.8rem", padding:"9px 18px" }}>GitHub ↗</a>
            <a href="#contact" className="btn btn-outline" style={{ fontSize:"0.8rem", padding:"9px 18px" }}>Contact →</a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {[
          { n:"18", l:"Years old" },
          { n:"4+", l:"Projects built" },
          { n:"8mo", l:"Design background" },
          { n:"∞",  l:"Ideas remaining" },
        ].map(s => (
          <div key={s.l} className="stat-cell">
            <span className="stat-num">{s.n}</span>
            <span className="stat-label">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
function Projects() {
  return (
    <section id="projects">
      <p className="section-label">Projects</p>
      <div style={{ marginBottom:40 }}>
        <h2 style={{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:"var(--white)", letterSpacing:"-0.02em", lineHeight:1.15 }}>
          Things I&apos;ve <em style={{ fontStyle:"italic", color:"var(--accent)" }}>built</em>
        </h2>
      </div>
      <div className="projects-grid">
        {PROJECTS.map(p => (
          <div key={p.name} className="project-card">
            {/* Header */}
            <div className="project-header">
              <div style={{ display:"flex", alignItems:"baseline", gap:12, flexWrap:"wrap" }}>
                <h3 className="project-name">{p.name}</h3>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"var(--muted)" }}>{p.year}</span>
              </div>
              <span className={`badge ${p.status === "Live" ? "badge-live" : p.status === "In Progress" ? "badge-wip" : "badge-built"}`}>
                {p.status}
              </span>
            </div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="project-links">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>↗</span> Live
                </a>
              )}
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                <span>⌥</span> GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── SKILLS ── */
function Skills() {
  return (
    <section id="skills">
      <p className="section-label">Skills</p>
      <div className="skills-layout">
        <div>
          <h2 className="skills-heading">
            What I<br />work<br /><em>with.</em>
          </h2>
        </div>
        <div>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="skill-group">
              <p className="skill-group-name">{cat}</p>
              <div className="skill-chips">
                {items.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── GITHUB ── */
type GHUser = { login:string; avatar_url:string; bio:string|null; followers:number; public_repos:number; html_url:string; };
type GHRepo = { id:number; name:string; description:string|null; language:string|null; stargazers_count:number; forks_count:number; updated_at:string; html_url:string; };

function Github() {
  const [user,  setUser]  = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [err,   setErr]   = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GH = "Ali2191";
    Promise.all([
      fetch(`https://api.github.com/users/${GH}`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=4`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
    ])
    .then(([u, r]) => { setUser(u); setRepos(Array.isArray(r) ? r.slice(0,4) : []); })
    .catch(() => setErr(true))
    .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" style={{ borderTop:"1px solid var(--border)" }}>
      <p className="section-label">GitHub</p>
      <div style={{ marginBottom:32 }}>
        <h2 style={{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:"var(--white)", letterSpacing:"-0.02em" }}>
          Recent <em style={{ fontStyle:"italic", color:"var(--accent)" }}>activity</em>
        </h2>
      </div>

      {err && (
        <div style={{ padding:24, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontFamily:"'DM Mono',monospace", fontSize:"0.8rem", color:"var(--muted)" }}>
          GitHub API rate limit reached.{" "}
          <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" style={{ color:"var(--accent)", textDecoration:"none" }}>View profile directly →</a>
        </div>
      )}

      {loading && !err && (
        <div className="repo-grid">
          {[0,1,2,3].map(i => <div key={i} className="gh-placeholder" style={{ animationDelay:`${i*0.15}s` }} />)}
        </div>
      )}

      {!loading && !err && (
        <>
          {user && (
            <div className="github-profile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.avatar_url} alt={user.login} className="gh-avatar" />
              <div style={{ flex:1 }}>
                <div className="gh-name">{user.login}</div>
                {user.bio && <div className="gh-bio">{user.bio}</div>}
                <div className="gh-meta">
                  <span>{user.followers} followers</span>
                  <span>{user.public_repos} repos</span>
                </div>
              </div>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer"
                className="btn btn-outline" style={{ fontSize:"0.8rem", padding:"9px 18px", whiteSpace:"nowrap" }}>
                View Profile ↗
              </a>
            </div>
          )}
          {repos.length > 0 && (
            <div className="repo-grid">
              {repos.map(r => (
                <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className="repo-card">
                  <div className="repo-name">{r.name}</div>
                  {r.description && <div className="repo-desc">{r.description}</div>}
                  <div className="repo-meta">
                    {r.language && (
                      <span>
                        <span className="lang-dot" style={{ background: LANG_COLORS[r.language] || "#888" }} />
                        {r.language}
                      </span>
                    )}
                    <span>★ {r.stargazers_count}</span>
                    <span>{new Date(r.updated_at).toLocaleDateString("en-US", { month:"short", year:"numeric" })}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <p className="section-label">Contact</p>
      <h2 className="contact-heading">
        Let&apos;s build<br /><em>something.</em>
      </h2>
      <div className="contact-tiles">
        <a href="mailto:hello@alitayyab.dev" className="contact-tile">
          <div className="tile-icon">✉</div>
          <div>
            <div className="tile-label">Email</div>
            <div className="tile-value">hello@alitayyab.dev</div>
          </div>
        </a>
        <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" className="contact-tile">
          <div className="tile-icon">⌥</div>
          <div>
            <div className="tile-label">GitHub</div>
            <div className="tile-value">github.com/Ali2191</div>
          </div>
        </a>
        <a href="https://linkedin.com/in/alitayyab" target="_blank" rel="noopener noreferrer" className="contact-tile">
          <div className="tile-icon">in</div>
          <div>
            <div className="tile-label">LinkedIn</div>
            <div className="tile-value">linkedin.com/in/alitayyab</div>
          </div>
        </a>
      </div>
      <div className="footer-bar">
        <span>© 2025 Ali Tayyab</span>
        <span>Built with Next.js · Deployed on Vercel</span>
        <span>Kot Addu, Pakistan 🇵🇰</span>
      </div>
    </section>
  );
}

/* ── ACTIVE SECTION ── */
function useActive() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const ids = ["about","projects","skills","github","contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ── PAGE ── */
export default function Page() {
  const active = useActive();
  return (
    <>
      <Cursor />
      <Nav active={active} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Github />
        <Contact />
      </main>
    </>
  );
}
