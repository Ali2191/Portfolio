"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══ DATA ══ */
const PROJECTS = [
  { name:"IsItAI", cat:"AI / Full-Stack", status:"Live" as const, year:"2025",
    desc:"Five-layer forensic AI image detection — model ensembles, EXIF forensics, FFT analysis.",
    tags:["Next.js","AI/ML","Vercel"], live:"https://isitai-gilt.vercel.app", github:"https://github.com/Ali2191",
    accent:"#e8f5e9" },
  { name:"Learnify", cat:"EdTech / Full-Stack", status:"In Progress" as const, year:"2025",
    desc:"AI exam-prep for Pakistani students. NUST NET, FAST NAT-ICS, MDCAT — adaptive practice + spaced repetition.",
    tags:["Next.js 14","Supabase","Gemini API"], live:null, github:"https://github.com/Ali2191",
    accent:"#e8eaf6" },
  { name:"Pakistan Resume Builder", cat:"AI / Productivity", status:"Built" as const, year:"2024",
    desc:"ATS scoring, AI bullet writer, cover letter generator. Four templates for Pakistani job market.",
    tags:["React","Claude API","PDF"], live:null, github:"https://github.com/Ali2191",
    accent:"#fce4ec" },
  { name:"UniDash", cat:"Mobile / Productivity", status:"In Progress" as const, year:"2025",
    desc:"Unified Gmail + Calendar + Tasks mobile app. React Native + Expo with Google OAuth.",
    tags:["React Native","Expo","Google APIs"], live:null, github:"https://github.com/Ali2191",
    accent:"#e3f2fd" },
];

const TIMELINE = [
  { role:"Full-Stack Developer", co:"Self-employed · Building AI products", yr:"2024 — Present" },
  { role:"CS Student", co:"Preparing for FAST University NAT-ICS", yr:"2025 — Present" },
  { role:"Customer Service Specialist", co:"IBEX · Amazon Campaign", yr:"2023 — 2024" },
  { role:"Graphic Designer", co:"Freelance", yr:"2022 — 2023" },
];

const BUILDING = [
  { icon:"🚀", title:"Learnify", desc:"AI-powered exam prep for Pakistani students — NUST NET, FAST NAT-ICS, MDCAT. Adaptive quizzes, spaced repetition, Gemini API.", status:"Actively building" },
  { icon:"📚", title:"NAT-ICS Prep", desc:"Grinding through the Dogars book daily. Logical reasoning, CS theory, math, physics. FAST University admission is the target.", status:"Daily practice" },
  { icon:"🌍", title:"Remote Career", desc:"Every project is a step toward a remote tech career. Building the portfolio, the skills, and the reputation to work from anywhere.", status:"Long-term goal" },
];

const FAQS = [
  { q:"Are you available for freelance work?", a:"Yes — I take on freelance web development projects. I'm especially interested in AI-powered tools, web apps, and anything that needs a solid Next.js + Supabase stack." },
  { q:"Can you work remotely?", a:"Absolutely. Remote-first is my preference and long-term goal. I'm set up to collaborate async across any timezone." },
  { q:"Are you open to internships?", a:"Yes, actively looking. I'm available for remote internships in full-stack development, AI/ML engineering, or product development." },
  { q:"What's your typical tech stack?", a:"Next.js + TypeScript + Tailwind on the frontend, Supabase for backend + DB, and AI APIs (Gemini, Claude) for intelligence layers. Deployed on Vercel." },
  { q:"How do you work on a project?", a:"Discuss scope → agree on deliverables → build iteratively → ship and iterate. I keep communication tight and updates frequent." },
];

const ALL_SKILLS = [
  "Next.js","React","TypeScript","Python","Supabase","Tailwind CSS",
  "Gemini API","Claude API","React Native","Node.js","Figma","n8n","Vercel","PostgreSQL",
  "Next.js","React","TypeScript","Python","Supabase","Tailwind CSS",
  "Gemini API","Claude API","React Native","Node.js","Figma","n8n","Vercel","PostgreSQL",
];

const TECH_PILLS = [
  "Next.js","React","TypeScript","Python","Supabase","Tailwind CSS",
  "Gemini API","Claude API","React Native","Node.js","Figma","n8n","Vercel",
  "Next.js","React","TypeScript","Python","Supabase","Tailwind CSS",
  "Gemini API","Claude API","React Native","Node.js","Figma","n8n","Vercel",
];

const GH = "Ali2191";
type GHUser = { login:string; avatar_url:string; bio:string|null; followers:number; public_repos:number; html_url:string; };
type GHRepo = { id:number; name:string; description:string|null; language:string|null; stargazers_count:number; forks_count:number; updated_at:string; html_url:string; };
const LANG_COLORS: Record<string,string> = { TypeScript:"#3178c6",JavaScript:"#f0db4f",Python:"#4B8BBE",CSS:"#7b5ea7",HTML:"#e44d26" };

/* ══ CURSOR ══ */
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const lx = useRef(0); const ly = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    let raf: number = 0;
    const move = (e: MouseEvent) => {
      lx.current += (e.clientX - lx.current) * 0.14;
      ly.current += (e.clientY - ly.current) * 0.14;
      if (ref.current) { ref.current.style.left=e.clientX+"px"; ref.current.style.top=e.clientY+"px"; }
    };
    const addH = () => ref.current?.classList.add("hovering");
    const rmH  = () => ref.current?.classList.remove("hovering","on-card");
    const addC = () => { ref.current?.classList.add("on-card"); ref.current?.classList.remove("hovering"); };
    const rmC  = () => ref.current?.classList.remove("on-card");
    const bind = () => {
      document.querySelectorAll("a,button,.theme-toggle").forEach(el => { el.addEventListener("mouseenter",addH); el.addEventListener("mouseleave",rmH); });
      document.querySelectorAll(".project-card").forEach(el => { el.addEventListener("mouseenter",addC); el.addEventListener("mouseleave",rmC); });
    };
    window.addEventListener("mousemove", move);
    setTimeout(bind, 600);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="cur" style={{position:"fixed",pointerEvents:"none"}}>
      <span className="cur-label">View</span>
    </div>
  );
}

/* ══ THEME ══ */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);
  const toggle = useCallback(() => {
    setDark(d => {
      const next = !d;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);
  return { dark, toggle };
}

/* ══ NAV ══ */
function Nav({ active, dark, onToggle }: { active:string; dark:boolean; onToggle:()=>void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const img = new Image(); img.src = "/avatar.jpg";
    img.onload = () => setHasPhoto(true);
  }, []);
  const links = [
    { id:"projects", label:"Projects" },
    { id:"about", label:"About me" },
    { id:"skills", label:"Skills" },
  ];
  return (
    <nav className={`nav ${scrolled?"scrolled":""}`}>
      <div className="nav-left">
        <div className="nav-avatar">
          {hasPhoto ? <img src="/avatar.jpg" alt="Ali" /> : "AT"}
        </div>
        <div>
          <div className="nav-name">Ali Tayyab</div>
          <div className="nav-location">Kot Addu · Pakistan</div>
        </div>
      </div>
      <div className="nav-right">
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`}
             className={`nav-link ${active===l.id?"active":""}`}>{l.label}</a>
        ))}
        <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
          {dark ? "☀️" : "🌙"}
        </button>
        <a href="#contact" className="nav-cta">Let&apos;s chat →</a>
      </div>
    </nav>
  );
}

/* ══ HERO ══ */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Full-Stack Developer · Available for projects
      </div>
      <h1 className="hero-heading">
        Code that makes people <em>build and ship</em> faster
      </h1>
      <p className="hero-sub">
        CS student from Pakistan building AI-powered web apps — products that solve real problems for real people.
      </p>
      <div className="hero-ctas">
        <a href="#projects" className="btn btn-dark">View my work →</a>
        <a href="#contact"  className="btn btn-light">Get in touch</a>
      </div>
      <div className="hero-tech">
        <div className="tech-scroll">
          {TECH_PILLS.map((t,i) => <span key={i} className="tech-pill">{t}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ══ PROJECTS ══ */
function Projects() {
  return (
    <section id="projects" style={{borderTop:"1px solid var(--border)"}}>
      <div className="wrap">
        <span className="eyebrow">Projects</span>
        <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:400,letterSpacing:"-0.025em",color:"var(--ink)",marginBottom:8,lineHeight:1.1}}>
          Apps built on logic,<br /><em style={{fontStyle:"italic"}}>finished with craft.</em>
        </h2>
        <p style={{fontSize:"0.9rem",color:"var(--ink3)",marginBottom:48}}>Real products, real code, real users.</p>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <div key={p.name} className="project-card"
              onClick={() => p.live && window.open(p.live,"_blank")}>
              <div className="project-card-img" style={{background:p.accent}}>
                <div className="project-img-placeholder">
                  <span style={{fontSize:"2.5rem"}}>
                    {p.name==="IsItAI"?"🔍":p.name==="Learnify"?"📚":p.name.includes("Resume")?"📄":"📱"}
                  </span>
                  <span>{p.name}</span>
                </div>
                <div className="project-card-overlay">
                  <div className="overlay-btn">VIEW</div>
                </div>
              </div>
              <div className="project-card-body">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
                  <div className="project-card-name">{p.name}</div>
                  <span className={p.status==="Live"?"badge-live":p.status==="In Progress"?"badge-wip":"badge-built"}>{p.status}</span>
                </div>
                <div className="project-card-cat">{p.cat}</div>
                <p style={{fontSize:"0.82rem",color:"var(--ink3)",lineHeight:1.65,marginTop:8,marginBottom:10}}>{p.desc}</p>
                <div className="project-card-tags">
                  {p.tags.map(t=><span key={t} className="ptag">{t}</span>)}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                       onClick={e=>e.stopPropagation()}
                       style={{marginLeft:"auto",fontSize:"0.75rem",color:"var(--ink3)",textDecoration:"none",display:"flex",alignItems:"center",gap:4,fontFamily:"'Geist Mono',monospace"}}>
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ ABOUT ══ */
function About() {
  const [hasPhoto, setHasPhoto] = useState(false);
  useEffect(() => { const img=new Image(); img.src="/avatar.jpg"; img.onload=()=>setHasPhoto(true); }, []);
  return (
    <section id="about" style={{borderTop:"1px solid var(--border)"}}>
      <div className="wrap">
        <span className="eyebrow">About</span>
        <div className="about-grid">
          <div>
            <h2 className="about-name">Hi, I am<br /><em>Ali Tayyab</em></h2>
            <div className="social-row">
              <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">⌥</a>
              <a href="https://linkedin.com/in/alitayyab" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn" style={{fontWeight:700,fontSize:"13px",fontFamily:"serif"}}>in</a>
              <a href="mailto:hello@alitayyab.dev" className="social-btn" title="Email">✉</a>
            </div>
            <p className="about-para">
              An 18-year-old CS student from <strong>Kot Addu, Punjab, Pakistan</strong> — currently preparing for FAST University NAT-ICS while building real AI-powered products on the side.
            </p>
            <p className="about-para">
              Before coding full-time I spent 8 months as a <strong>graphic designer</strong> and worked as a customer service specialist at <strong>IBEX on Amazon campaigns</strong>. That background taught me to think about users before features.
            </p>
            <p className="about-para">
              My goal is a <strong>remote tech career</strong> — building from anywhere, solving real problems with AI and clean engineering.
            </p>
            <div className="stat-grid">
              {[["4+","Projects shipped"],["8mo","Design background"],["2+","Years building"],["18","Years old"]].map(([v,k])=>(
                <div key={k} className="stat-box">
                  <div className="stat-val">{v}</div>
                  <div className="stat-key">{k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-photo">
            {hasPhoto
              ? <img src="/avatar.jpg" alt="Ali Tayyab" />
              : <span className="about-photo-init">AT</span>
            }
          </div>
        </div>
        {/* Timeline */}
        <div style={{marginTop:72}}>
          <span className="eyebrow">Experience</span>
          <div style={{marginTop:0}}>
            {TIMELINE.map(t=>(
              <div key={t.role} className="tl-item">
                <div>
                  <div className="tl-role">{t.role}</div>
                  <div className="tl-co">{t.co}</div>
                </div>
                <div className="tl-yr">{t.yr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ SKILLS ══ */
function Skills() {
  return (
    <section id="skills" style={{borderTop:"1px solid var(--border)"}}>
      <div className="wrap">
        <span className="eyebrow">Skills</span>
        <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:400,letterSpacing:"-0.025em",color:"var(--ink)",marginBottom:12,lineHeight:1.1}}>
          Everything your product<br /><em style={{fontStyle:"italic"}}>needs to ship right</em>
        </h2>
        <p style={{fontSize:"0.9rem",color:"var(--ink3)",marginBottom:48,maxWidth:480}}>
          Full-stack from idea to deployment — with AI baked in everywhere that matters.
        </p>
      </div>
      <div className="skills-scroll-wrap" style={{paddingBottom:8}}>
        <div className="skills-scroll">
          {ALL_SKILLS.map((s,i) => <span key={i} className="s-chip">{s}</span>)}
        </div>
      </div>

      {/* Process steps */}
      <div className="wrap" style={{marginTop:64}}>
        <span className="eyebrow">How I work</span>
        <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:400,letterSpacing:"-0.025em",color:"var(--ink)",marginBottom:40,lineHeight:1.1}}>
          Three steps to your<br /><em style={{fontStyle:"italic"}}>next project.</em>
        </h2>
        <div className="steps-grid">
          {[
            { n:"01", title:"We discuss the idea", desc:"A casual conversation about what you want to build, the scope, timeline, and what success looks like. No pressure, no jargon." },
            { n:"02", title:"I scope and build", desc:"I define the tech stack, break it into milestones, and start building. You get updates at every stage — no black boxes." },
            { n:"03", title:"We ship and iterate", desc:"Launch is just the beginning. I stay involved post-launch to fix bugs, improve UX, and add features as the product grows." },
          ].map(s=>(
            <div key={s.n} className="step-card">
              <span className="step-num">{s.n}</span>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ CURRENTLY BUILDING ══ */
function Building() {
  return (
    <section style={{borderTop:"1px solid var(--border)"}}>
      <div className="wrap">
        <span className="eyebrow">Currently building</span>
        <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:400,letterSpacing:"-0.025em",color:"var(--ink)",marginBottom:12,lineHeight:1.1}}>
          What I&apos;m working on <em style={{fontStyle:"italic"}}>right now.</em>
        </h2>
        <p style={{fontSize:"0.9rem",color:"var(--ink3)",marginBottom:48}}>
          Real-time snapshot of my focus. Updated as projects evolve.
        </p>
        <div className="building-grid">
          {BUILDING.map(b=>(
            <div key={b.title} className="building-card">
              <div className="building-icon">{b.icon}</div>
              <div className="building-title">{b.title}</div>
              <div className="building-desc">{b.desc}</div>
              <div className="building-status">
                <span className="building-status-dot" />
                {b.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ GITHUB ══ */
function Github() {
  const [user, setUser]   = useState<GHUser|null>(null);
  const [repos,setRepos]  = useState<GHRepo[]>([]);
  const [err,  setErr]    = useState(false);
  const [loading,setLoad] = useState(true);
  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GH}`).then(r=>{if(!r.ok)throw 0;return r.json()}),
      fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=4`).then(r=>{if(!r.ok)throw 0;return r.json()}),
    ]).then(([u,r])=>{setUser(u);setRepos(Array.isArray(r)?r.slice(0,4):[])})
      .catch(()=>setErr(true)).finally(()=>setLoad(false));
  },[]);
  return (
    <section style={{borderTop:"1px solid var(--border)"}}>
      <div className="wrap">
        <span className="eyebrow">GitHub</span>
        <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:400,letterSpacing:"-0.025em",color:"var(--ink)",marginBottom:40,lineHeight:1.1}}>
          Recent <em style={{fontStyle:"italic"}}>activity.</em>
        </h2>
        {err && <p style={{color:"var(--ink3)",fontSize:"0.9rem",fontFamily:"'Geist Mono',monospace"}}>Rate limited. <a href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer" style={{color:"var(--ink)"}}>View on GitHub →</a></p>}
        {loading && !err && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[0,1,2,3].map(i=><div key={i} style={{height:110,borderRadius:12,background:"var(--bg2)",border:"1px solid var(--border)",animation:"pulse 1.8s ease-in-out infinite",animationDelay:`${i*.15}s`}}/>)}
          </div>
        )}
        {!loading && !err && (
          <>
            {user && (
              <div style={{display:"flex",alignItems:"center",gap:16,padding:"20px 24px",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:14,marginBottom:20,flexWrap:"wrap"}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar_url} alt={user.login} style={{width:52,height:52,borderRadius:"50%",border:"1px solid var(--border2)",objectFit:"cover"}}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:"0.95rem",color:"var(--ink)"}}>{user.login}</div>
                  {user.bio && <div style={{fontSize:"0.8rem",color:"var(--ink3)",marginTop:2}}>{user.bio}</div>}
                  <div style={{display:"flex",gap:16,marginTop:4}}>
                    <span style={{fontFamily:"'Geist Mono',monospace",fontSize:"0.7rem",color:"var(--ink4)"}}>{user.followers} followers</span>
                    <span style={{fontFamily:"'Geist Mono',monospace",fontSize:"0.7rem",color:"var(--ink4)"}}>{user.public_repos} repos</span>
                  </div>
                </div>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-light" style={{fontSize:"0.8rem",padding:"8px 18px"}}>View Profile ↗</a>
              </div>
            )}
            {repos.length>0 && (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {repos.map(r=>(
                  <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer"
                     style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:20,textDecoration:"none",display:"block",transition:"border-color .2s,background .2s"}}
                     onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border2)";(e.currentTarget as HTMLElement).style.background="var(--bg3)"}}
                     onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)";(e.currentTarget as HTMLElement).style.background="var(--bg2)"}}>
                    <div style={{fontWeight:600,fontSize:"0.88rem",color:"var(--ink)",marginBottom:5}}>{r.name}</div>
                    {r.description && <div style={{fontSize:"0.78rem",color:"var(--ink3)",lineHeight:1.6,marginBottom:10}}>{r.description}</div>}
                    <div style={{display:"flex",gap:12,fontFamily:"'Geist Mono',monospace",fontSize:"0.65rem",color:"var(--ink4)",flexWrap:"wrap"}}>
                      {r.language && <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:LANG_COLORS[r.language]||"#888",display:"inline-block"}}/>{r.language}</span>}
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

/* ══ FAQ ══ */
function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <div className="faq-list">
      {FAQS.map((f,i)=>(
        <div key={i} className={`faq-item ${open===i?"open":""}`} onClick={()=>setOpen(open===i?null:i)}>
          <div className="faq-q">
            <span>{f.q}</span>
            <span className="faq-icon">+</span>
          </div>
          <div className="faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
}

/* ══ CONTACT ══ */
function Contact() {
  const [hasPhoto,setHasPhoto]=useState(false);
  useEffect(()=>{const img=new Image();img.src="/avatar.jpg";img.onload=()=>setHasPhoto(true);},[]);
  return (
    <section id="contact" style={{borderTop:"1px solid var(--border)"}}>
      <div className="wrap">
        <div className="contact-split">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="contact-heading">
              Have a project<br />in mind? Let&apos;s<br /><em>make it real.</em>
            </h2>
            <p className="contact-sub">
              I&apos;m currently available for freelance projects and internships starting immediately. Whether you need a web app, an AI integration, or a full product build — let&apos;s talk.
            </p>
            <div className="contact-ctas">
              <a href="mailto:hello@alitayyab.dev" className="btn btn-dark">✉ Send an email</a>
              <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" className="btn btn-light">GitHub ↗</a>
            </div>
            <div className="contact-meta">
              <div className="contact-meta-item"><strong>Email:</strong> hello@alitayyab.dev</div>
              <div className="contact-meta-item"><strong>Based in:</strong> Kot Addu, Pakistan</div>
              <div className="contact-meta-item"><strong>Available for:</strong> Freelance · Remote Internships · Full-Time</div>
            </div>
          </div>
          <div>
            <FAQ />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ FOOTER ══ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-email">hello@alitayyab.dev</div>
          <div className="footer-loc">Based in Kot Addu, Pakistan</div>
          <div className="footer-avail">Available for: Freelance · Remote · Internships</div>
        </div>
        <div>
          <div className="footer-col-title">Pages</div>
          <a href="#hero" className="footer-link">Home</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#skills" className="footer-link">Skills</a>
        </div>
        <div>
          <div className="footer-col-title">Connect</div>
          <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://linkedin.com/in/alitayyab" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:hello@alitayyab.dev" className="footer-link">Email</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Ali Tayyab. All rights reserved.</span>
        <span className="footer-copy">Built with Next.js · Deployed on Vercel</span>
      </div>
    </footer>
  );
}

/* ══ ACTIVE SECTION ══ */
function useActive() {
  const [active,setActive]=useState("hero");
  useEffect(()=>{
    const ids=["hero","projects","about","skills","contact"];
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);}),{threshold:0.3});
    ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
    return ()=>obs.disconnect();
  },[]);
  return active;
}

/* ══ PAGE ══ */
export default function Page() {
  const active = useActive();
  const { dark, toggle } = useTheme();
  return (
    <>
      <Cursor />
      <Nav active={active} dark={dark} onToggle={toggle} />
      <main>
        <Hero />
        <Projects />
        <About />
        <Building />
        <Skills />
        <Github />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
