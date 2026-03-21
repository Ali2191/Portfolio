'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fn = () => {
      const t = new Date().toLocaleTimeString('en-US', { timeZone:'Asia/Karachi', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });
      setTime(t);
    };
    fn(); const id = setInterval(fn, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

const CONTACTS = [
  { icon:<Mail size={20}/>, label:'Email', handle:'hello@alitayyab.dev', href:'mailto:hello@alitayyab.dev', accent:'var(--accent-violet)', note:'Primary — replies within 24h' },
  { icon:<Linkedin size={20}/>, label:'LinkedIn', handle:'linkedin.com/in/alitayyab', href:'https://linkedin.com/in/alitayyab', accent:'var(--accent-cyan)', note:'Professional profile' },
  { icon:<Github size={20}/>, label:'GitHub', handle:'github.com/Ali2191', href:'https://github.com/Ali2191', accent:'#a1a1aa', note:'Code & open source' },
];

export default function ContactPage() {
  const [wave, setWave] = useState(false);
  useEffect(() => { const id = setInterval(() => setWave(w => !w), 2000); return () => clearInterval(id); }, []);

  return (
    <main style={{ paddingTop:80 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'80px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <div>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--accent-violet)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>// CONTACT</p>
            <h1 style={{ fontFamily:"'Geist',sans-serif", fontWeight:900, fontSize:'var(--text-hero)', color:'var(--text-primary)', lineHeight:0.9, letterSpacing:'-0.04em', marginBottom:24 }}>
              Say{' '}
              <span style={{ display:'inline-block', transition:'transform 0.3s var(--ease-spring)', transform: wave ? 'rotate(20deg)' : 'rotate(0deg)', transformOrigin:'bottom center' }}>hello.</span>
            </h1>
            <p style={{ fontSize:'var(--text-lg)', color:'var(--text-secondary)', lineHeight:1.8, marginBottom:36, maxWidth:440 }}>
              Open to freelance projects, internships, collaborations, and interesting conversations. Whether you have a project in mind or just want to connect — reach out.
            </p>
            <div style={{ background:'var(--bg-surface)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:14, padding:'20px 24px', marginBottom:16, display:'inline-flex', alignItems:'center', gap:14 }}>
              <span style={{ width:10, height:10, borderRadius:'50%', background:'var(--accent-green)', animation:'pulse 2.5s ease-in-out infinite', flexShrink:0 }} />
              <div>
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:600, fontSize:'var(--text-base)', color:'var(--text-primary)', marginBottom:2 }}>Open to opportunities</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>Freelance · Remote Internships · Full-Time</div>
              </div>
            </div>
            <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:'20px 24px', display:'inline-flex', alignItems:'center', gap:14, marginLeft:12 }}>
              <span style={{ fontSize:20 }}>🕐</span>
              <div>
                <div style={{ fontFamily:"'Geist',sans-serif", fontWeight:600, fontSize:'var(--text-base)', color:'var(--text-primary)', marginBottom:2 }}><LiveClock /> PKT</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>UTC+5 · Pakistan</div>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {CONTACTS.map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:14, padding:'22px 24px', display:'flex', alignItems:'center', gap:18, textDecoration:'none', transition:'all 0.25s var(--ease-out)' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform='translateX(6px)';el.style.borderColor=c.accent;}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform='';el.style.borderColor='var(--border-subtle)';}}
                data-cursor="link">
                <div style={{ width:48,height:48,borderRadius:12,background:'rgba(124,58,237,0.1)',border:'1px solid rgba(124,58,237,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:c.accent,flexShrink:0 }}>{c.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'var(--text-muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:3 }}>{c.label}</div>
                  <div style={{ fontFamily:"'Geist',sans-serif",fontWeight:600,fontSize:'var(--text-base)',color:'var(--text-primary)',marginBottom:2 }}>{c.handle}</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'var(--text-muted)' }}>{c.note}</div>
                </div>
                <ArrowRight size={16} style={{ color:'var(--text-muted)',flexShrink:0 }} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="footer" style={{ marginTop:80 }}>
        <div className="footer-inner">
          <span className="footer-copy">© 2025 Ali Tayyab</span>
          <div className="footer-links"><Link href="/">Home</Link><Link href="/projects">Projects</Link><Link href="/about">About</Link></div>
        </div>
      </footer>
    </main>
  );
}
