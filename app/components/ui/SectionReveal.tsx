'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  threshold?: number;
}

export default function SectionReveal({
  children, className = '', direction = 'up', delay = 0, threshold = 0.12
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add('visible');
          obs.unobserve(el);
        }, delay);
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);

  const cls = direction === 'left' ? 'reveal-left'
            : direction === 'right' ? 'reveal-right'
            : direction === 'fade'  ? 'reveal-fade'
            : 'reveal';

  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  );
}
