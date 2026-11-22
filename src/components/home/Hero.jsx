import React, { useState, useEffect } from 'react';
import { ArrowRight, Send, Terminal, Sparkles, ShieldCheck, Code, Zap } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { personalInfo } from '../../data/portfolioData';

export default function Hero({ onNavigate }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    let timer;

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      }
    } else {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-emerald/10 border border-accent-emerald/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-ping" />
              <span className="text-xs font-semibold text-accent-emerald tracking-wide">
                {personalInfo.status}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-accent-cyan via-teal-300 to-accent-emerald bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6 h-8 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-gray-400">I am a</span>
              <span className="font-mono text-accent-cyan font-bold">
                {displayText}
              </span>
              <span className="animate-pulse text-accent-emerald font-light">|</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Passionate about writing clean, maintainable code and architecting scalable web applications. 
              Currently sharpening modern full-stack practices at{' '}
              <strong className="text-white border-b-2 border-accent-cyan pb-0.5">
                TBC Academy
              </strong>.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => scrollTo('projects')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View My Work
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => scrollTo('contact')}
                icon={<Send className="w-4 h-4" />}
              >
                Contact Me
              </Button>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Card glow className="w-full max-w-lg bg-dark-800/90 border border-white/15 shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-dark-700/80 border-b border-white/10 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="text-xs font-mono text-gray-400">
                  luka-fruidze.dev.ts
                </div>
                <Badge variant="cyan" size="sm">
                  TypeScript
                </Badge>
              </div>

              {/* Window Body: Syntax Highlighted Code */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-gray-300">
                <p>
                  <span className="text-pink-400 font-semibold">const</span>{' '}
                  <span className="text-accent-cyan">developer</span> = &#123;
                </p>
                <p className="pl-4">
                  <span className="text-cyan-300">name</span>:{' '}
                  <span className="text-accent-emerald">"Luka Fruidze"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-cyan-300">role</span>:{' '}
                  <span className="text-accent-emerald">"Software &amp; Web Developer"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-cyan-300">academy</span>:{' '}
                  <span className="text-accent-emerald">"TBC Academy Full-Stack"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-cyan-300">coreStack</span>: [
                </p>
                <p className="pl-8 text-accent-emerald">
                  "React", "Tailwind CSS", "ES6+"
                </p>
                <p className="pl-4">],</p>
                <p className="pl-4">
                  <span className="text-cyan-300">focus</span>:{' '}
                  <span className="text-accent-emerald">"Clean code &amp; scalable web"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-cyan-300">availableForHire</span>:{' '}
                  <span className="text-purple-400">true</span>
                </p>
                <p>&#125;;</p>
                <br />
                <p className="text-gray-500 italic">
                  // Let's create impactful digital experiences
                </p>
                <p>
                  <span className="text-yellow-400">console</span>.
                  <span className="text-blue-400">log</span>(
                  <span className="text-accent-emerald">"Ready to build together!"</span>
                  );
                </p>
              </div>

              {/* Window Footer Tags */}
              <div className="flex flex-wrap items-center gap-2 px-5 py-3 bg-dark-900/60 border-t border-white/5 rounded-b-2xl">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                  <Zap className="w-3 h-3 text-accent-cyan" /> Fast Performance
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                  <Code className="w-3 h-3 text-accent-emerald" /> Clean Code
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                  <ShieldCheck className="w-3 h-3 text-purple-400" /> Scalable
                </span>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}

