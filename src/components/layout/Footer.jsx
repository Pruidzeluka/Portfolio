import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-dark-900/95 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <span className="font-mono text-xs font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 px-2 py-1 rounded-lg">
                &lt;LF&gt;
              </span>
              <span className="text-xl font-extrabold text-white">
                Luka<span className="text-accent-cyan">.dev</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              Crafting modern, accessible, and resilient web applications with React &amp; Tailwind CSS.
            </p>
          </div>

          {/* Quick Nav Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <li>
              <button 
                onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('hero'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                className="hover:text-accent-cyan transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('about'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                className="hover:text-accent-cyan transition-colors cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('skills'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                className="hover:text-accent-cyan transition-colors cursor-pointer"
              >
                Skills
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('projects'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                className="hover:text-accent-cyan transition-colors cursor-pointer"
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onNavigate('community'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-accent-emerald hover:underline transition-colors cursor-pointer"
              >
                Community (Page 2)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                className="hover:text-accent-cyan transition-colors cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan hover:text-dark-900 transition-all cursor-pointer ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="font-mono text-accent-emerald flex items-center gap-1">
            <span>Built with clean code &amp; React</span>
            <span className="text-gray-600">•</span>
            <span>TBC Academy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

