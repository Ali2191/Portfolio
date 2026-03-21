import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';

export const metadata: Metadata = {
  title: { template: '%s | Tayyab Ali', default: 'Tayyab Ali — Developer & Builder' },
  description: 'CS student from Pakistan building AI-powered web apps. Full-stack developer, available for work.',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Ali Tayyab' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CustomCursor />
        <Navbar />
        <div className="page-enter">{children}</div>
      </body>
    </html>
  );
}
