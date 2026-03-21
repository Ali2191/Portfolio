'use client';
import Link from 'next/link';
import { Project } from '../../data/projects';
import { ArrowLeft, ExternalLink, Github, ArrowRight } from 'lucide-react';

interface Props { project: Project; others: Project[]; }

export default function ProjectDetail({ project: p, others }: Props) {
  const statusClass = p.status === 'Live' ? 'badge-live' : p.status === 'In Progress' ? 'badge-wip' : 'badge-built';
  const archLayers = [
    { label:'Frontend', items: p.techStack.filter(t => ['Next.js','React','React Native','Tailwind CSS','TypeScript','Expo','HTML/CSS','Expo Router'].includes(t)) },
    { label:'Backend',  items: p.techStack.filter(t => ['Supabase','Node.js','REST APIs','PostgreSQL','AsyncStorage','Google APIs'].includes(t)) },
    { label:'AI / APIs',items: p.techStack.filter(t => ['Gemini API','Claude API','TensorFlow.js','PDF Generation'].includes(t)) },
    { label:'Infra',    items: p.techStack.filter(t => ['Vercel','Expo'].includes(t)) },
  ].filter(l => l.items.length > 0);

  return (
    <main style={{ paddingTop:60 }}>
      {/* ── HERO ── */}
      <section className="project-hero-section"
        style={{ background:`radial-gradient(ellipse 80% 60% at 50% 40%, ${p.accentColor}18, transparent 70%), var(--bg-void)` }}>
        <div style={{ position:'absolute', top:80, left:40, zIndex:10 }}>
          <Link href="/projects" data-cursor="link"
            style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--text-muted)', fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', textDecoration:'none', padding:'8px 0', transition:'color 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--text-primary)')}
            onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}>
            <ArrowLeft size={13} /> Back to Projects
          </Link>
        </div>
        <div style={{ position:'relative', zIndex:2, maxWidth:800, width:'100%' }}>
          <span className={`badge ${statusClass}`} style={{ marginBottom:20, display:'inline-flex' }}>
            <span className="badge-dot" /> {p.status}
          </span>
          <h1 style={{ fontFamily:"'Geist',sans-serif", fontWeight:900, fontSize:'var(--text-hero)', color:'var(--text-primary)', lineHeight:0.9, letterSpacing:'-0.04em', marginBottom:16 }}>
            {p.title}
          </h1>
          <p style={{ fontSize:'var(--text-xl)', color:'var(--text-secondary)', marginBottom:32, maxWidth:560 }}>{p.tagline}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', marginBottom:36 }}>
            {p.techStack.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" data-cursor="link">
                <ExternalLink size={15} /> View Live
              </a>
            )}
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor="link">
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 40px' }}>

        {/* ── OVERVIEW ── */}
        <section style={{ padding:'80px 0 60px', borderBottom:'1px solid var(--border-subtle)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:64 }}>
            {[
              { icon:'🎯', label:'Problem', value:'Real user pain' },
              { icon:'⚡', label:'Solution', value:'Engineered fast' },
              { icon:'🛠', label:'Stack size', value:`${p.techStack.length} technologies` },
            ].map(s => (
              <div key={s.label} style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:24, textAlign:'center' }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'var(--text-muted)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>{s.label}</div>
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:600, color:'var(--text-primary)', fontSize:'var(--text-base)' }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
            <div>
              <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-2xl)', color:'var(--text-primary)', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:p.accentColor }}>⟶</span> The Problem
              </h2>
              <p style={{ fontSize:'var(--text-base)', color:'var(--text-secondary)', lineHeight:1.8 }}>{p.problem}</p>
            </div>
            <div>
              <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-2xl)', color:'var(--text-primary)', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:p.accentColor }}>⟶</span> The Solution
              </h2>
              <p style={{ fontSize:'var(--text-base)', color:'var(--text-secondary)', lineHeight:1.8 }}>{p.solution}</p>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ padding:'60px 0', borderBottom:'1px solid var(--border-subtle)' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>// FEATURES</p>
          <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:'var(--text-primary)', letterSpacing:'-0.02em', marginBottom:40 }}>What it does</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:12 }}>
            {p.features.map(f => (
              <div key={f.name} className="feature-card">
                <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-lg)', color:'var(--text-primary)', marginBottom:8 }}>{f.name}</div>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', lineHeight:1.7 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ARCHITECTURE ── */}
        <section style={{ padding:'60px 0', borderBottom:'1px solid var(--border-subtle)' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>// ARCHITECTURE</p>
          <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:'var(--text-primary)', letterSpacing:'-0.02em', marginBottom:40 }}>How it&apos;s built</h2>
          <div>
            {archLayers.map((layer, i) => (
              <div key={layer.label} className="arch-layer"
                style={{ borderLeft:`3px solid ${p.accentColor}${i === 0 ? 'ff' : i === 1 ? 'cc' : i === 2 ? '88' : '44'}` }}>
                <span className="arch-label">{layer.label}</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {layer.items.map(t => (
                    <span key={t} className="tech-tag" style={{ borderColor:`${p.accentColor}35`, color:p.accentColor }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VISUALS ── */}
        <section style={{ padding:'60px 0', borderBottom:'1px solid var(--border-subtle)' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>// VISUALS</p>
          <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:'var(--text-primary)', letterSpacing:'-0.02em', marginBottom:40 }}>Mockups</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[1,2].map(n => (
              <div key={n} style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:16, padding:32, aspectRatio:'16/10', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
                {/* Browser chrome */}
                <div style={{ width:'100%', height:'100%', background:'var(--bg-elevated)', borderRadius:10, overflow:'hidden', display:'flex', flexDirection:'column' }}>
                  <div style={{ height:28, background:p.accentColor+'22', display:'flex', alignItems:'center', gap:6, padding:'0 12px', flexShrink:0 }}>
                    {['#ef4444','#f59e0b','#10b981'].map(c => <span key={c} style={{ width:8, height:8, borderRadius:'50%', background:c }} />)}
                    <div style={{ flex:1, height:14, background:'var(--bg-surface)', borderRadius:4, marginLeft:8 }} />
                  </div>
                  <div style={{ flex:1, padding:16, display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ height:12, width:'60%', background:p.accentColor+'33', borderRadius:3 }} />
                    <div style={{ height:8, width:'90%', background:'var(--bg-surface)', borderRadius:3 }} />
                    <div style={{ height:8, width:'75%', background:'var(--bg-surface)', borderRadius:3 }} />
                    <div style={{ height:40, background:p.accentColor+'18', borderRadius:8, marginTop:8 }} />
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:4 }}>
                      <div style={{ height:32, background:'var(--bg-surface)', borderRadius:6 }} />
                      <div style={{ height:32, background:'var(--bg-surface)', borderRadius:6 }} />
                    </div>
                  </div>
                </div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'var(--text-muted)', letterSpacing:'0.06em' }}>
                  {p.title} — Screen {n}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHALLENGES & LEARNINGS ── */}
        <section style={{ padding:'60px 0', borderBottom:'1px solid var(--border-subtle)' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>// LEARNINGS</p>
          <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:'var(--text-primary)', letterSpacing:'-0.02em', marginBottom:40 }}>What I learned</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
            <div>
              <h3 style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-xl)', color:'var(--text-primary)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:'var(--accent-amber)' }}>⚠</span> Challenges
              </h3>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:16 }}>
                {p.challenges.map((c, i) => (
                  <li key={i} style={{ display:'flex', gap:14, fontSize:'var(--text-sm)', color:'var(--text-secondary)', lineHeight:1.75 }}>
                    <span style={{ color:'var(--accent-amber)', fontWeight:700, flexShrink:0, fontFamily:"'JetBrains Mono',monospace", minWidth:20 }}>0{i+1}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-xl)', color:'var(--text-primary)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:'var(--accent-cyan)' }}>↻</span> What I&apos;d do differently
              </h3>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:16 }}>
                {p.learnings.map((l, i) => (
                  <li key={i} style={{ display:'flex', gap:14, fontSize:'var(--text-sm)', color:'var(--text-secondary)', lineHeight:1.75 }}>
                    <span style={{ color:'var(--accent-cyan)', fontWeight:700, flexShrink:0, fontFamily:"'JetBrains Mono',monospace", minWidth:20 }}>0{i+1}</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── MORE PROJECTS ── */}
        <section style={{ padding:'60px 0' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>// MORE WORK</p>
          <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:'var(--text-primary)', letterSpacing:'-0.02em', marginBottom:40 }}>Other projects</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {others.slice(0,3).map(o => (
              <Link key={o.slug} href={`/projects/${o.slug}`} data-cursor="link"
                style={{ textDecoration:'none', display:'block', background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:24, transition:'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--border-hover)'; el.style.transform='translateY(-4px)';}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--border-subtle)'; el.style.transform='';}}>
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-lg)', color:'var(--text-primary)', marginBottom:6 }}>{o.title}</div>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', lineHeight:1.6, marginBottom:14 }}>{o.description}</p>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--accent-glow)', fontFamily:"'JetBrains Mono',monospace", fontSize:11 }}>
                  View <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop:32, textAlign:'center' }}>
            <Link href="/projects" className="btn-ghost" data-cursor="link">← Back to all projects</Link>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">© 2025 Ali Tayyab — Built with Next.js & Deployed on Vercel</span>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
