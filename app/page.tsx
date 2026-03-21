'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from './data/projects';
import SectionReveal from './components/ui/SectionReveal';
import { MapPin, ArrowRight, Github, Mail, Linkedin, ExternalLink, Star, GitFork } from 'lucide-react';

/* ══ HERO ══ */
function Hero() {
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const roles = 'CS Student  ·  Full-Stack Developer  ·  AI Builder';

  useEffect(() => { const t = setTimeout(() => setStarted(true), 900); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      if (i < roles.length) setTyped(roles.slice(0, ++i));
      else clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [started]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const fn = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth  - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      hero.style.setProperty('--px', `${x * 40}px`);
      hero.style.setProperty('--py', `${y * 20}px`);
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ minHeight:'100dvh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:'100px 40px 80px', position:'relative', overflow:'hidden', background:'var(--bg-void)' }}>
      {/* Background */}
      <div className="hero-bg">
        <div className="blob blob-1" style={{ transform:'translate(calc(var(--px,0px) * 0.5), calc(var(--py,0px) * 0.5))' }} />
        <div className="blob blob-2" style={{ transform:'translate(calc(var(--px,0px) * -0.4), calc(var(--py,0px) * -0.3))' }} />
        <div className="dot-grid" />
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:2, maxWidth:800, width:'100%' }}>
        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:999, padding:'7px 18px', marginBottom:36, animation:'fadeIn 0.6s 0.2s both' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent-green)', animation:'pulse 2.5s ease-in-out infinite' }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-green)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Available for Opportunities</span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily:"'Geist',sans-serif", fontWeight:900, fontSize:'var(--text-hero)', lineHeight:0.95, letterSpacing:'-0.04em', marginBottom:24 }}>
          <span style={{ display:'block', color:'var(--text-primary)', animation:'slideUp 0.7s 0.5s both' }}>Ali</span>
          <span style={{ display:'block', background:'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'slideUp 0.7s 0.6s both' }}>Tayyab</span>
        </h1>

        {/* Typewriter */}
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-sm)', color:'var(--text-secondary)', marginBottom:12, minHeight:'1.5em', letterSpacing:'0.04em', animation:'fadeIn 0.6s 0.7s both' }}>
          {typed}{typed.length < roles.length && <span style={{ borderRight:'2px solid var(--accent-cyan)', paddingRight:2, animation:'blink 1s step-end infinite' }} />}
        </p>

        {/* Location */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, color:'var(--text-muted)', marginBottom:24, animation:'fadeIn 0.6s 1.1s both' }}>
          <MapPin size={13} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)' }}>Kot Addu, Punjab, Pakistan</span>
        </div>

        {/* Bio */}
        <p style={{ fontSize:'var(--text-lg)', color:'var(--text-secondary)', maxWidth:520, margin:'0 auto 40px', lineHeight:1.7, animation:'fadeIn 0.6s 1.3s both' }}>
          I build AI-powered web apps that solve real problems. Currently pursuing CS at FAST University, shipping side projects, and turning ideas into products.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', animation:'fadeIn 0.6s 1.5s both' }}>
          <Link href="/projects" className="btn-primary" data-cursor="link">
            View my work <ArrowRight size={15} />
          </Link>
          <Link href="/contact" className="btn-ghost" data-cursor="link">
            Get in touch
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{ position:'absolute', bottom:-60, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, animation:'fadeIn 0.6s 2s both', opacity:0.5 }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'var(--text-muted)', letterSpacing:'0.15em', textTransform:'uppercase' }}>Scroll to explore</span>
          <div style={{ width:1, height:36, background:'linear-gradient(to bottom, var(--accent-violet), transparent)', animation:'scrollBounce 2s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes scrollBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
      `}</style>
    </section>
  );
}

/* ══ ABOUT PREVIEW ══ */
function AboutPreview() {
  const [count1, setC1] = useState(0);
  const [count2, setC2] = useState(0);
  const [count3, setC3] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        const countTo = (target: number, setter: (n: number) => void) => {
          let n = 0;
          const step = Math.ceil(target / 30);
          const id = setInterval(() => { n = Math.min(n + step, target); setter(n); if (n >= target) clearInterval(id); }, 40);
        };
        countTo(8, setC1); countTo(4, setC2); countTo(2, setC3);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:80, alignItems:'start' }}>
        {/* Left */}
        <div>
          <SectionReveal><p className="section-label">// ABOUT</p></SectionReveal>
          <SectionReveal delay={80}>
            <h2 className="section-heading" style={{ marginBottom:32 }}>Before Code</h2>
          </SectionReveal>
          <SectionReveal delay={160}>
            <p style={{ fontSize:'var(--text-base)', color:'var(--text-secondary)', lineHeight:1.8, marginBottom:24 }} data-cursor="text">
              Before becoming a developer, I worked 8 months as a <strong style={{ color:'var(--text-primary)' }}>graphic designer</strong> and as a customer service specialist at <strong style={{ color:'var(--text-primary)' }}>IBEX on Amazon campaigns</strong>. That taught me to think about users before I even knew what UX was.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h2 className="section-heading" style={{ marginBottom:16 }}>Right Now</h2>
          </SectionReveal>
          <SectionReveal delay={260}>
            <p style={{ fontSize:'var(--text-base)', color:'var(--text-secondary)', lineHeight:1.8, marginBottom:32 }} data-cursor="text">
              Preparing for <strong style={{ color:'var(--text-primary)' }}>FAST University NAT-ICS</strong>, actively building Learnify — a platform specifically for Pakistani students preparing for university entrance exams. Reading, shipping, improving every day.
            </p>
          </SectionReveal>
          <SectionReveal delay={320}>
            <Link href="/about" data-cursor="link" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'var(--accent-glow)', fontFamily:"'Geist',sans-serif", fontWeight:600, fontSize:'var(--text-base)', textDecoration:'none', borderBottom:'1px solid transparent', paddingBottom:2, transition:'border-color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--accent-glow)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='transparent')}>
              Read my full story <ArrowRight size={15} />
            </Link>
          </SectionReveal>
        </div>

        {/* Right — Stat cards */}
        <div ref={ref} style={{ display:'flex', flexDirection:'column', gap:12, paddingTop:8 }}>
          {[
            { n: count1 + '+', label: 'Months as a Designer', color: 'var(--accent-violet)' },
            { n: count2 + '+', label: 'Live & In-Progress Projects', color: 'var(--accent-cyan)' },
            { n: count3 + '+', label: 'Years Learning to Code', color: 'var(--accent-green)' },
          ].map((s, i) => (
            <SectionReveal key={s.label} direction="right" delay={i * 100}>
              <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:'20px 24px', borderLeft:`3px solid ${s.color}`, transition:'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateX(4px)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform=''}}>
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:s.color, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:4, letterSpacing:'0.06em' }}>{s.label}</div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ PROJECTS PREVIEW ══ */
function ProjectsPreview() {
  const statusClass = (s: string) => s === 'Live' ? 'badge-live' : s === 'In Progress' ? 'badge-wip' : 'badge-built';
  const accentBg = (color: string) => `linear-gradient(135deg, ${color}22, ${color}11)`;

  return (
    <section id="projects" style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
      <SectionReveal><p className="section-label">// PROJECTS</p></SectionReveal>
      <SectionReveal delay={80}>
        <h2 className="section-heading">
          Things I&apos;ve <span className="grad">built</span>
        </h2>
      </SectionReveal>
      <SectionReveal delay={120}>
        <p style={{ fontSize:'var(--text-base)', color:'var(--text-muted)', marginBottom:48 }}>Real products, real users, real code.</p>
      </SectionReveal>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {projects.map((p, i) => (
          <SectionReveal key={p.slug} delay={i * 100}>
            <Link href={`/projects/${p.slug}`} style={{ textDecoration:'none', display:'block' }} data-cursor="project">
              <div className="project-card">
                <div className="project-card-top" style={{ background: accentBg(p.accentColor) }}>
                  <span style={{ fontFamily:"'Geist',sans-serif", fontWeight:900, fontSize:'clamp(4rem,8vw,7rem)', color:p.accentColor, opacity:0.15, userSelect:'none', position:'absolute' }}>
                    {p.title[0]}
                  </span>
                  <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                    <span className={`badge ${statusClass(p.status)}`}>
                      <span className="badge-dot" /> {p.status}
                    </span>
                  </div>
                  <div className="project-overlay">
                    <div className="project-view-btn">VIEW</div>
                  </div>
                </div>
                <div className="project-card-body">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <span className="project-name">{p.title}</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'var(--text-muted)' }}>{p.year}</span>
                  </div>
                  <p className="project-desc">{p.description}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:12 }}>
                    {p.techStack.slice(0,4).map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                        style={{ color:'var(--text-muted)', transition:'color 0.15s', display:'flex', alignItems:'center', gap:4, fontSize:'var(--text-xs)', fontFamily:"'JetBrains Mono',monospace" }}
                        onMouseEnter={e=>(e.currentTarget.style.color='var(--accent-green)')}
                        onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                      style={{ color:'var(--text-muted)', transition:'color 0.15s', display:'flex', alignItems:'center', gap:4, fontSize:'var(--text-xs)', fontFamily:"'JetBrains Mono',monospace" }}
                      onMouseEnter={e=>(e.currentTarget.style.color='var(--text-primary)')}
                      onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>
                      <Github size={12} /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal delay={400}>
        <div style={{ textAlign:'center', marginTop:48 }}>
          <Link href="/projects" className="btn-ghost" data-cursor="link">
            View all projects <ArrowRight size={15} />
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ══ SKILLS ══ */
const SKILLS: Record<string,string[]> = {
  'Languages':    ['Python','JavaScript','TypeScript','HTML/CSS'],
  'Frontend':     ['Next.js','React','React Native','Tailwind CSS'],
  'Backend':      ['Supabase','Node.js','REST APIs'],
  'AI & Tools':   ['Gemini API','Claude API','n8n','Vercel'],
  'Design':       ['Figma','CapCut','Adobe Express'],
};

function Skills() {
  return (
    <section id="skills" style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
      <SectionReveal><p className="section-label">// SKILLS</p></SectionReveal>
      <SectionReveal delay={80}>
        <h2 className="section-heading">What I <span className="grad">work with</span></h2>
      </SectionReveal>
      <SectionReveal delay={140}>
        <p style={{ fontSize:'var(--text-base)', color:'var(--text-muted)', marginBottom:48 }}>Full-stack from idea to deployment — AI baked in everywhere that matters.</p>
      </SectionReveal>

      <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
        {Object.entries(SKILLS).map(([cat, items], ci) => (
          <div key={cat}>
            <SectionReveal delay={ci * 40}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>{cat}</p>
            </SectionReveal>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {items.map((s, si) => (
                <SectionReveal key={s} delay={ci * 40 + si * 40}>
                  <span className="skill-chip">{s}</span>
                </SectionReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══ GITHUB ══ */
type GHUser = { login:string; avatar_url:string; bio:string|null; followers:number; public_repos:number; following:number; html_url:string; };
type GHRepo = { id:number; name:string; description:string|null; language:string|null; stargazers_count:number; forks_count:number; updated_at:string; html_url:string; };
const LANG_COLORS: Record<string,string> = { TypeScript:'#3178c6',JavaScript:'#f0db4f',Python:'#4B8BBE',CSS:'#7b5ea7',HTML:'#e44d26' };

function GithubSection() {
  const [user,  setUser]    = useState<GHUser|null>(null);
  const [repos, setRepos]   = useState<GHRepo[]>([]);
  const [err,   setErr]     = useState(false);
  const [loading,setLoad]   = useState(true);
  const GH = 'Ali2191';

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GH}`).then(r=>{ if(!r.ok) throw 0; return r.json(); }),
      fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=4`).then(r=>{ if(!r.ok) throw 0; return r.json(); }),
    ]).then(([u,r]) => { setUser(u); setRepos(Array.isArray(r)?r.slice(0,4):[]); })
      .catch(() => setErr(true))
      .finally(() => setLoad(false));
  }, []);

  return (
    <section id="github" style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
      <SectionReveal><p className="section-label">// OPEN SOURCE</p></SectionReveal>
      <SectionReveal delay={80}>
        <h2 className="section-heading">What I&apos;m <span className="grad">building</span></h2>
      </SectionReveal>

      {err && (
        <div style={{ padding:'20px 24px', background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:12, fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:40 }}>
          GitHub data temporarily unavailable. <a href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent-glow)' }}>View profile directly →</a>
        </div>
      )}

      {loading && !err && (
        <div style={{ marginTop:40 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:24 }}>
            <div className="skeleton" style={{ height:200 }} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {[0,1,2,3].map(i => <div key={i} className="skeleton" style={{ height:90 }} />)}
            </div>
          </div>
        </div>
      )}

      {!loading && !err && (
        <SectionReveal delay={160}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:24, marginTop:40, alignItems:'start' }}>
            {/* Profile */}
            {user && (
              <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:24 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar_url} alt={user.login} style={{ width:80, height:80, borderRadius:'50%', border:'2px solid var(--border-subtle)', objectFit:'cover', marginBottom:14, display:'block' }} />
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-lg)', color:'var(--text-primary)', marginBottom:4 }}>{user.login}</div>
                {user.bio && <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', marginBottom:14, lineHeight:1.6 }}>{user.bio}</div>}
                <div style={{ display:'flex', gap:0, marginBottom:20, borderTop:'1px solid var(--border-subtle)', borderBottom:'1px solid var(--border-subtle)', padding:'12px 0' }}>
                  {[
                    { n: user.public_repos, l: 'Repos' },
                    { n: user.followers,    l: 'Followers' },
                    { n: user.following,    l: 'Following' },
                  ].map(s => (
                    <div key={s.l} className="gh-stat">
                      <span className="gh-stat-num">{s.n}</span>
                      <span className="gh-stat-label">{s.l}</span>
                    </div>
                  ))}
                </div>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ width:'100%', justifyContent:'center', fontSize:'var(--text-sm)' }} data-cursor="link">
                  <Github size={14} /> View Profile
                </a>
              </div>
            )}
            {/* Repos */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {repos.map(r => (
                <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className="repo-card" data-cursor="link">
                  <div className="repo-name">{r.name}</div>
                  {r.description && <p className="repo-desc">{r.description}</p>}
                  <div className="repo-meta">
                    {r.language && (
                      <span className="repo-meta-item">
                        <span className="lang-dot" style={{ background: LANG_COLORS[r.language] || '#888' }} />
                        {r.language}
                      </span>
                    )}
                    <span className="repo-meta-item"><Star size={11} />{r.stargazers_count}</span>
                    <span className="repo-meta-item"><GitFork size={11} />{r.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>
      )}
    </section>
  );
}

/* ══ CONTACT PREVIEW ══ */
function ContactPreview() {
  return (
    <section id="contact" style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.05), transparent)', pointerEvents:'none' }} />
      <SectionReveal><p className="section-label">// CONTACT</p></SectionReveal>
      <SectionReveal delay={80}>
        <h2 className="section-heading" style={{ marginBottom:0 }}>Let&apos;s build</h2>
        <h2 className="section-heading" style={{ marginBottom:24 }}>
          <span className="grad" style={{ marginLeft:'1.5rem' }}>something.</span>
        </h2>
      </SectionReveal>
      <SectionReveal delay={160}>
        <p style={{ fontSize:'var(--text-base)', color:'var(--text-secondary)', marginBottom:40, maxWidth:480 }}>
          Open to opportunities, collaborations, and interesting problems. I reply fast.
        </p>
      </SectionReveal>

      <SectionReveal delay={240}>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:40 }}>
          <a href="mailto:hello@alitayyab.dev" className="contact-tile" data-cursor="link">
            <div className="contact-tile-icon">✉</div>
            <div>
              <div className="contact-tile-label">Email</div>
              <div className="contact-tile-value">hello@alitayyab.dev</div>
            </div>
          </a>
          <a href="https://linkedin.com/in/alitayyab" target="_blank" rel="noopener noreferrer" className="contact-tile" data-cursor="link">
            <div className="contact-tile-icon"><Linkedin size={20} /></div>
            <div>
              <div className="contact-tile-label">LinkedIn</div>
              <div className="contact-tile-value">Ali Tayyab</div>
            </div>
          </a>
        </div>
      </SectionReveal>

      <SectionReveal delay={320}>
        <Link href="/contact" data-cursor="link" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'var(--text-muted)', fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', textDecoration:'none', letterSpacing:'0.06em', transition:'color 0.2s' }}
          onMouseEnter={e=>(e.currentTarget.style.color='var(--accent-glow)')}
          onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>
          See the full contact page → /contact
        </Link>
      </SectionReveal>
    </section>
  );
}

/* ══ FOOTER ══ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">© 2025 Ali Tayyab — Built with Next.js & Deployed on Vercel</span>
        <div className="footer-links">
          <a href="https://github.com/Ali2191" target="_blank" rel="noopener noreferrer" data-cursor="link"><Github size={14} /></a>
          <a href="https://linkedin.com/in/alitayyab" target="_blank" rel="noopener noreferrer" data-cursor="link"><Linkedin size={14} /></a>
          <a href="mailto:hello@alitayyab.dev" data-cursor="link"><Mail size={14} /></a>
        </div>
      </div>
    </footer>
  );
}

/* ══ PAGE ══ */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProjectsPreview />
      <Skills />
      <GithubSection />
      <ContactPreview />
      <Footer />
    </>
  );
}
