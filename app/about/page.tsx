'use client';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';

const TIMELINE = [
  { year:'2022', title:'Before Code', body:'Spent 8 months as a graphic designer — it taught me to think about users, visual hierarchy, and communication before I even knew what UX was. That eye for design still shows up in every product I build.' },
  { year:'2023', title:'First Line of Code', body:'Started with Python, then HTML and CSS. Realized I could build the ideas in my head. Also worked at IBEX on Amazon campaigns — learned how real users think, what frustrates them, and why clarity matters more than cleverness.' },
  { year:'2024', title:'Building Real Things', body:'Nights were for projects. Built IsItAI — forensic AI image detection running in the browser. Then the Pakistan Resume Builder with Claude API. Every project was a new lesson. Every bug was a teacher.' },
  { year:'2025', title:'Going Full Stack', body:'Pursuing CS at FAST University. Shipping Learnify — an AI exam-prep platform for Pakistani students. Building in public. Learning every day. Not stopping.' },
];
const VALUES = [
  { icon:'🎯', title:'Build for real people', desc:"AI tools that solve actual problems — not demos that look impressive but sit unused. Every feature starts with a user." },
  { icon:'🚀', title:'Ship, then improve', desc:"Done is better than perfect. Shipping something real teaches more than planning something ideal. Iterate from real feedback." },
  { icon:'📚', title:'Learn by doing', desc:"Every project is a classroom. I deliberately pick things I haven't done before — the discomfort is where the learning happens." },
];
const LEARNING = [
  { title:'Advanced TypeScript', note:'Generics, utility types, conditional types', level:65 },
  { title:'System Design', note:'Databases, caching, scaling patterns', level:40 },
  { title:'AI/ML Engineering', note:'Model fine-tuning, RAG, embeddings', level:50 },
  { title:'Mobile Development', note:'React Native, Expo, native modules', level:60 },
];

export default function AboutPage() {
  return (
    <main style={{ paddingTop:80 }}>
      <section style={{ minHeight:'80vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px 40px', maxWidth:1100, margin:'0 auto', position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(124,58,237,0.08), transparent 60%)', pointerEvents:'none' }} />
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20, position:'relative' }}>// ABOUT</p>
        <h1 style={{ fontFamily:"'Geist',sans-serif", fontWeight:900, fontSize:'var(--text-hero)', color:'var(--text-primary)', lineHeight:0.9, letterSpacing:'-0.04em', marginBottom:24, position:'relative' }}>
          I&apos;m Ali<br />
          <span style={{ background:'linear-gradient(135deg,var(--accent-violet),var(--accent-cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Tayyab.</span>
        </h1>
        <p style={{ fontFamily:"'Geist',sans-serif", fontWeight:600, fontSize:'var(--text-3xl)', color:'var(--text-secondary)', marginBottom:32, letterSpacing:'-0.02em', position:'relative' }}>18. CS Student. Builder.</p>
        <p style={{ fontSize:'var(--text-lg)', color:'var(--text-secondary)', maxWidth:580, lineHeight:1.8, marginBottom:32, position:'relative' }}>
          An 18-year-old from Kot Addu, Punjab, Pakistan — building AI-powered products that solve real problems. Every project teaches me something new. Not stopping until I&apos;ve built a remote tech career that lets me work from anywhere.
        </p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', position:'relative' }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>📍 Kot Addu, Pakistan</span>
          <span style={{ color:'var(--border-subtle)' }}>·</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-green)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-green)', animation:'pulse 2.5s ease-in-out infinite' }} />
            Available for work
          </span>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// STORY</p>
        <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-5xl)', color:'var(--text-primary)', letterSpacing:'-0.03em', marginBottom:56 }}>How I got here</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:80 }}>
          <p style={{ fontSize:'var(--text-base)', color:'var(--text-secondary)', lineHeight:1.8 }}>The path wasn&apos;t linear. It started with design, moved through customer service, and landed in code. Every detour taught me something that makes me a better developer.</p>
          <div className="timeline">
            {TIMELINE.map(t => (
              <div key={t.year} className="tl-node">
                <div className="tl-dot" />
                <div className="tl-year">{t.year}</div>
                <div className="tl-title">{t.title}</div>
                <p className="tl-body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// VALUES</p>
        <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-5xl)', color:'var(--text-primary)', letterSpacing:'-0.03em', marginBottom:40 }}>What drives me</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:16, padding:28 }}>
              <div style={{ fontSize:28, marginBottom:16 }}>{v.icon}</div>
              <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:700, fontSize:'var(--text-xl)', color:'var(--text-primary)', marginBottom:10 }}>{v.title}</div>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', lineHeight:1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning */}
      <section style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// LEARNING</p>
        <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-5xl)', color:'var(--text-primary)', letterSpacing:'-0.03em', marginBottom:40 }}>Currently exploring</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {LEARNING.map(l => (
            <div key={l.title} style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:24 }}>
              <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:600, fontSize:'var(--text-base)', color:'var(--text-primary)', marginBottom:4 }}>{l.title}</div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'var(--text-muted)', marginBottom:14 }}>{l.note}</div>
              <div style={{ height:3, background:'var(--bg-elevated)', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${l.level}%`, background:'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))', borderRadius:2 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond */}
      <section style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// BEYOND</p>
        <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-5xl)', color:'var(--text-primary)', letterSpacing:'-0.03em', marginBottom:24 }}>When I&apos;m not building</h2>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          {['📖 Reading','🧠 Learning','✈️ Planning to travel while building','🌍 Working toward remote freedom','🎯 Preparing for FAST NAT-ICS'].map(item => (
            <span key={item} style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:999, padding:'10px 20px', fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{item}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto', borderTop:'1px solid var(--border-subtle)' }}>
        <h2 style={{ fontFamily:"'Geist',sans-serif", fontWeight:800, fontSize:'var(--text-5xl)', color:'var(--text-primary)', letterSpacing:'-0.03em', marginBottom:16 }}>Want to collaborate?</h2>
        <p style={{ fontSize:'var(--text-lg)', color:'var(--text-secondary)', marginBottom:36, maxWidth:480 }}>Always up for interesting conversations, collaborations, and new opportunities.</p>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <a href="mailto:hello@alitayyab.dev" className="btn-primary" data-cursor="link"><Mail size={15} /> Send an email</a>
          <Link href="/contact" className="btn-ghost" data-cursor="link"><ArrowRight size={15} /> Full contact page</Link>
        </div>
      </section>

      <footer className="footer"><div className="footer-inner"><span className="footer-copy">© 2025 Ali Tayyab</span><div className="footer-links"><Link href="/">Home</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></div></div></footer>
    </main>
  );
}
