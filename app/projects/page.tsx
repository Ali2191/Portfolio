'use client';
import Link from 'next/link';
import { projects } from '../data/projects';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: 100 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px' }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// PROJECTS</p>
        <h1 style={{ fontFamily:"'Geist',sans-serif", fontWeight:900, fontSize:'var(--text-hero)', color:'var(--text-primary)', lineHeight:0.95, letterSpacing:'-0.04em', marginBottom:20 }}>
          All <span style={{ background:'linear-gradient(135deg,var(--accent-violet),var(--accent-cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>work</span>
        </h1>
        <p style={{ fontSize:'var(--text-lg)', color:'var(--text-secondary)', marginBottom:64, maxWidth:500 }}>
          Real products, real code, real users. Every project is a lesson.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {projects.map((p, i) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration:'none' }}>
              <div style={{
                display:'grid', gridTemplateColumns:'80px 1fr auto', gap:32,
                alignItems:'center', padding:'32px 0',
                borderBottom:'1px solid var(--border-subtle)',
                ...(i === 0 ? { borderTop:'1px solid var(--border-subtle)' } : {}),
                transition:'background 0.2s, padding-left 0.25s',
                position:'relative', cursor:'none',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.paddingLeft='20px';(e.currentTarget as HTMLElement).style.background='rgba(124,58,237,0.04)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.paddingLeft='0';(e.currentTarget as HTMLElement).style.background='transparent'}}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-sm)', color:'var(--text-muted)' }}>0{i+1}</span>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
                    <span style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-4xl)', color:'var(--text-primary)', letterSpacing:'-0.02em' }}>{p.title}</span>
                    <span className={`badge ${p.status==='Live'?'badge-live':p.status==='In Progress'?'badge-wip':'badge-built'}`}>{p.status}</span>
                  </div>
                  <p style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', maxWidth:560, lineHeight:1.65, marginBottom:10 }}>{p.description}</p>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {p.techStack.slice(0,5).map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'var(--text-muted)' }}>{p.year}</span>
                  <div style={{ display:'flex', gap:12 }}>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ color:'var(--accent-green)', display:'flex', alignItems:'center' }}><ExternalLink size={15} /></a>}
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ color:'var(--text-muted)', display:'flex', alignItems:'center' }}><Github size={15} /></a>
                  </div>
                  <span style={{ color:'var(--accent-violet)', display:'flex', alignItems:'center', gap:4, fontFamily:"'JetBrains Mono',monospace", fontSize:11, opacity:0, transition:'opacity 0.2s' }} className="proj-arrow-hint">
                    View <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
