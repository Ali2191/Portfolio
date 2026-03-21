'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [hasPhoto,  setHasPhoto]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const img = new Image(); img.src = '/avatar.jpg';
    img.onload = () => setHasPhoto(true);
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    { href: '/about',    label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/#github',  label: 'GitHub' },
    { href: '/contact',  label: 'Contact' },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-progress" style={{ width: `${progress}%` }} />
        <Link href="/" className="nav-logo" data-cursor="link">AT.</Link>
        <div className="nav-links">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`nav-link ${pathname === l.href ? 'active' : ''}`}
              data-cursor="link">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta" data-cursor="link">Let&apos;s chat →</Link>
        </div>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href}
            style={{ animationDelay: `${i * 40}ms`, animation: menuOpen ? `fadeSlideLeft 0.4s ${i*40}ms both` : 'none' }}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" style={{ animationDelay: `${links.length * 40}ms`, animation: menuOpen ? `fadeSlideLeft 0.4s ${links.length*40}ms both` : 'none' }}>
          Let&apos;s chat
        </Link>
      </div>
      <style>{`@keyframes fadeSlideLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </>
  );
}
