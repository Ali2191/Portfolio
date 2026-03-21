'use client';
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };
    const loop = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = () => ring.classList.add('clicking');
    const onUp   = () => ring.classList.remove('clicking');

    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      const c  = el.dataset.cursor || el.closest('[data-cursor]')?.getAttribute('data-cursor');
      ring.classList.remove('link-mode','project-mode');
      dot.classList.remove('text-mode','hidden-dot');
      if (c === 'link')    { ring.classList.add('link-mode');    dot.classList.add('hidden-dot'); }
      if (c === 'project') { ring.classList.add('project-mode'); dot.classList.add('hidden-dot'); }
      if (c === 'text')    { dot.classList.add('text-mode'); }
    };
    const onLeave = () => {
      ring.classList.remove('link-mode','project-mode');
      dot.classList.remove('text-mode','hidden-dot');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const bindAll = () => {
      document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    bindAll();
    const obs = new MutationObserver(bindAll);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cur-dot"  />
      <div id="cur-ring"><span id="cur-view">VIEW</span></div>
    </>
  );
}
