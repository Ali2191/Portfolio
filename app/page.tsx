"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══ DATA ══════════════════════════════════════════ */
const PROJECTS = [
  { num:"01", name:"IsItAI", status:"Live" as const,
    desc:"Five-layer forensic AI image detection — model ensembles, EXIF forensics, FFT analysis, face/skin heuristics.",
    tags:["Next.js","AI/ML","Vercel"], live:"https://isitai-gilt.vercel.app", github:"https://github.com/Ali2191" },
  { num:"02", name:"Learnify", status:"In Progress" as const,
    desc:"AI exam-prep platform for Pakistani students — NUST NET, FAST NAT-ICS, MDCAT. Adaptive quizzes + spaced repetition.",
    tags:["Next.js 14","Supabase","Gemini API"], live:null, github:"https://github.com/Ali2191" },
  { num:"03", name:"Pakistan Resume Builder", status:"Built" as const,
    desc:"ATS scoring, AI bullet writer, cover letter generator, four templates tailored to the Pakistani job market.",
    tags:["React","Claude API","PDF"], live:null, github:"https://github.com/Ali2191" },
  { num:"04", name:"UniDash", status:"In Progress" as const,
    desc:"Unified Gmail + Calendar + Tasks mobile app for students. React Native + Expo with Google OAuth.",
    tags:["React Native","Expo","Google APIs"], live:null, github:"https://github.com/Ali2191" },
];

const TIMELINE = [
  { role:"Full-Stack Developer", company:"Self-employed", years:"2024 — Present" },
  { role:"CS Student", company:"FAST University (NAT-ICS prep)", years:"2025 — Present" },
  { role:"Customer Service Specialist", company:"IBEX · Amazon Campaign", years:"2023 — 2024" },
  { role:"Graphic Designer", company:"Freelance", years:"2022 — 2023" },
];

const SKILLS: Record<string,string[]> = {
  "Languages":    ["Python","JavaScript","TypeScript","HTML","CSS"],
  "Frontend":     ["Next.js","React","React Native","Tailwind CSS"],
  "Backend & DB": ["Supabase","Node.js","REST APIs","PostgreSQL"],
  "AI & Tools":   ["Gemini API","Claude API","n8n","Vercel"],
  "Design":       ["Figma","Adobe Express","CapCut"],
};

const LANG_COLORS: Record<string,string> = {
  TypeScript:"#3178c6", JavaScript:"#f0db4f", Python:"#4B8BBE",
  CSS:"#7b5ea7", HTML:"#e44d26",
};

/* ══ CURSOR ════════════════════════════════════════ */
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const lx   = useRef(0); const ly = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    let raf: number;

    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left=e.clientX+"px"; dot.current.style.top=e.clientY+"px"; }
      lx.current += (e.clientX - lx.current) * 0.12;
      ly.current += (e.clientY - ly.current) * 0.12;
    };
    const loop = () => {
      if (ring.current) { ring.current.style.left=lx.current+"px"; ring.current.style.top=ly.current+"px"; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const addLink  = () => ring.current?.classList.add("link-hover");
    const rmLink   = () => ring.current?.classList.remove("link-hover");
    const addCard  = () => ring.current?.classList.add("card-hover");
    const rmCard   = () => ring.current?.classList.remove("card-hover");

    const bind = () => {
      document.querySelectorAll("a,button,.nav-cta").forEach(el => {
        el.addEventListener("mouseenter", addLink);
        el.addEventListener("mouseleave", rmLink);
      });
      document.querySelectorAll(".project-item,.repo-card").forEach(el => {
        el.addEventListener("mouseenter", addCard);
        el.addEventListener("mouseleave", rmCard);
      });
    };
    window.addEventListener("mousemove", move);
    setTimeout(bind, 600);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cur-dot"  style={{position:"fixed",pointerEvents:"none"}} />
      <div ref={ring} className="cur-ring" style={{position:"fixed",pointerEvents:"none"}}>
        <span className="cur-label">View</span>
      </div>
    </>
  );
}

/* ══ NAVBAR ════════════════════════════════════════ */
function Navbar({ active }: { active: string }) {
  const links = ["about","projects","skills","contact"];
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => {
    const img = new Image(); img.src = "/avatar.jpg";
    img.onload = () => setHasPhoto(true);
  }, []);
  return (
    <nav className="navbar">
      <div className="nav-avatar">
        {hasPhoto ? <img src="/avatar.jpg" alt="Ali Tayyab" /> : "AT"}
      </div>
      <ul className="nav-links-center">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} className={active===l?"active":""}
               style={{textTransform:"capitalize"}}>{l}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">Hire Me ●</a>
    </nav>
  );
}

/* ══ HERO ══════════════════════════════════════════ */
function Hero() {
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => {
    const img = new Image(); img.src = "/avatar.jpg";
    img.onload = () => setHasPhoto(true);
  }, []);
  return (
    <section className="hero" id="hero">
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Available for work
      </div>
      <h1 className="hero-title">
        <span>ALI</span>
        <span className="hero-title-img-wrap">
          {hasPhoto ? <img src="/avatar.jpg" alt="Ali Tayyab" /> : "AT"}
        </span>
        <span className="hero-title-accent">TAYYAB</span>
      </h1>
      <p className="hero-sub">
        CS student from Pakistan building AI-powered web apps. Full-stack developer, product thinker, remote-first.
      </p>
      <div className="hero-ctas">
        <a href="#projects" className="btn btn-lime">View my work ↓</a>
        <a href="#contact"  className="btn btn-outline">Get in touch →</a>
      </div>
    </section>
  );
}

/* ══ ABOUT ═════════════════════════════════════════ */
function About() {
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => {
    const img = new Image(); img.src = "/avatar.jpg";
    img.onload = () => setHasPhoto(true);
  }, []);
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <p className="section-eyebrow">About me</p>
        <div className="about-grid">
          <div>
            <h2 className="section-heading">ABOUT<br />ME</h2>
            <p className="about-body">
              I&apos;m <strong>Ali Tayyab</strong> — an 18-year-old CS student from <strong>Kot Addu, Punjab, Pakistan</strong>. I build full-stack web apps with a focus on AI, and I&apos;m currently preparing for FAST University NAT-ICS.
            </p>
            <p className="about-body">
              Before writing code full-time, I spent 8 months as a <strong>graphic designer</strong> and worked as a customer service specialist at <strong>IBEX on Amazon campaigns</strong>. That background taught me to think about users before features.
            </p>
            <p className="about-body">
              My goal is a <strong>remote tech career</strong> — building AI-powered products that solve real problems for real people.
            </p>
            <div className="stats-row">
              {[["4+","Projects built"],["8mo","Design background"],["2+","Years building"],["18","Years old"]].map(([n,l]) => (
                <div key={l}>
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-photo">
            {hasPhoto
              ? <img src="/avatar.jpg" alt="Ali Tayyab" />
              : <span className="about-photo-placeholder">AT</span>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ TIMELINE ══════════════════════════════════════ */
function Timeline() {
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => {
    const img = new Image(); img.src = "/avatar.jpg";
    img.onload = () => setHasPhoto(true);
  }, []);
  return (
    <section className="section" id="experience" style={{borderTop:"1px solid var(--border)"}}>
      <div className="section-inner">
        <p className="section-eyebrow">Experience</p>
        <div className="timeline-grid">
          <div>
            <h2 className="section-heading">MY<br />JOURNEY</h2>
            <ul className="timeline-list">
              {TIMELINE.map(t => (
                <li key={t.role} className="timeline-item">
                  <div>
                    <div className="tl-role">{t.role}</div>
                    <div className="tl-company">{t.company}</div>
                  </div>
                  <div className="tl-years">{t.years}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="timeline-photo">
            {hasPhoto
              ? <img src="/avatar.jpg" alt="Working" />
              : <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"4rem",color:"var(--lime)",opacity:.25}}>AT</span>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ PROJECTS ══════════════════════════════════════ */
function Projects() {
  return (
    <section className="section" id="projects" style={{borderTop:"1px solid var(--border)"}}>
      <div className="section-inner">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-heading">THINGS I&apos;VE<br />BUILT</h2>
        <div className="projects-list">
          {PROJECTS.map(p => (
            <div key={p.name} className="project-item"
              onClick={() => p.live && window.open(p.live,"_blank")}>
              <span className="proj-num">{p.num}</span>
              <div>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-tags">
                  {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
              </div>
              <div className="proj-right">
                <span className={`badge ${p.status==="Live"?"badge-live":p.status==="In Progress"?"badge-wip":"badge-built"}`}>
                  {p.status}
                </span>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                     className="proj-arrow" onClick={e=>e.stopPropagation()}>↗</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ SKILLS ════════════════════════════════════════ */
function Skills() {
  return (
    <section className="section" id="skills" style={{borderTop:"1px solid var(--border)"}}>
      <div className="section-inner">
        <p className="section-eyebrow">Skills</p>
        <h2 className="section-heading">WHAT I<br />WORK WITH</h2>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat,items]) => (
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

/* ══ GITHUB ════════════════════════════════════════ */
type GHUser = {login:string;avatar_url:string;bio:string|null;followers:number;public_repos:number;html_url:string};
type GHRepo = {id:number;name:string;description:string|null;language:string|null;stargazers_count:number;forks_count:number;updated_at:string;html_url:string};

function Github() {
  const [user,  setUser]    = useState<GHUser|null>(null);
  const [repos, setRepos]   = useState<GHRepo[]>([]);
  const [err,   setErr]     = useState(false);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    const GH = "Ali2191";
    Promise.all([
      fetch(`https://api.github.com/users/${GH}`).then(r=>{if(!r.ok)throw 0;return r.json()}),
      fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=4`).then(r=>{if(!r.ok)throw 0;return r.json()}),
    ]).then(([u,r])=>{setUser(u);setRepos(Array.isArray(r)?r.slice(0,4):[])})
      .catch(()=>setErr(true)).finally(()=>setLoading(false));
  },[]);

  return (
    <section className="section" id="github" style={{borderTop:"1px solid var(--border)"}}>
      <div className="section-inner">
        <p className="section-eyebrow">GitHub</p>
        <h2 className="section-heading">RECENT<br />ACTIVITY</h2>
        {err && (
          <div style={{padding:24,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,fontFamily:"'DM Mono',monospace",fontSize:"0.8rem",color:"var(--muted)"}}>
            GitHub API rate limited. <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" style={{color:"var(--lime)"}}>View profile →</a>
          </div>
        )}
        {loading && !err && (
          <div className="repo-grid">
            {[0,1,2,3].map(i=><div key={i} className="gh-placeholder" style={{animationDelay:`${i*.15}s`}}/>)}
          </div>
        )}
        {!loading && !err && (
          <>
            {user && (
              <div className="gh-profile-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar_url} alt={user.login} className="gh-avatar-img"/>
                <div style={{flex:1}}>
                  <div className="gh-name">{user.login}</div>
                  {user.bio && <div className="gh-bio">{user.bio}</div>}
                  <div className="gh-stats">
                    <span>{user.followers} followers</span>
                    <span>{user.public_repos} repos</span>
                  </div>
                </div>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer"
                   className="btn btn-outline" style={{fontSize:"0.8rem",padding:"9px 20px",borderRadius:"999px",whiteSpace:"nowrap"}}>
                  View Profile ↗
                </a>
              </div>
            )}
            {repos.length>0 && (
              <div className="repo-grid">
                {repos.map(r=>(
                  <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className="repo-card">
                    <div className="repo-name">{r.name}</div>
                    {r.description && <div className="repo-desc">{r.description}</div>}
                    <div className="repo-meta">
                      {r.language && (
                        <span>
                          <span className="lang-dot" style={{background:LANG_COLORS[r.language]||"#888"}}/>
                          {r.language}
                        </span>
                      )}
                      <span>★ {r.stargazers_count}</span>
                      <span>{new Date(r.updated_at).toLocaleDateString("en-US",{month:"short",year:"numeric"})}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ══ CONTACT ═══════════════════════════════════════ */
function Contact() {
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => {
    const img = new Image(); img.src = "/avatar.jpg";
    img.onload = () => setHasPhoto(true);
  },[]);
  return (
    <section className="section" id="contact" style={{borderTop:"1px solid var(--border)"}}>
      <div className="contact-section">
        {/* Left — photo */}
        <div className="contact-left">
          <div className="contact-img-frame">
            {hasPhoto
              ? <img src="/avatar.jpg" alt="Ali Tayyab"/>
              : <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"6rem",color:"var(--lime)",opacity:.2}}>AT</span>
            }
            <div className="contact-img-badge">Hi!</div>
          </div>
        </div>
        {/* Right — links */}
        <div className="contact-right">
          <h2 className="contact-heading">LET&apos;S WORK<br />TOGETHER</h2>
          <p className="contact-sub">
            Open to internships, freelance projects, collaborations, and interesting conversations. Reach out — I reply fast.
          </p>
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
              <div className="tile-icon" style={{fontWeight:700,fontSize:"13px",fontFamily:"serif"}}>in</div>
              <div>
                <div className="tile-label">LinkedIn</div>
                <div className="tile-value">linkedin.com/in/alitayyab</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ FOOTER ════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-name">ALI TAYYAB</span>
        <div className="footer-links">
          <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/alitayyab" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:hello@alitayyab.dev">Email</a>
        </div>
        <span className="footer-copy">© 2025 Ali Tayyab · Built with Next.js</span>
      </div>
    </footer>
  );
}

/* ══ ACTIVE SECTION ════════════════════════════════ */
function useActive() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const ids = ["about","projects","skills","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  },[]);
  return active;
}

/* ══ PAGE ══════════════════════════════════════════ */
export default function Page() {
  const active = useActive();
  return (
    <>
      <Cursor />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Github />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
