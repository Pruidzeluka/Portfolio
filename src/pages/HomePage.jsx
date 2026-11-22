import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import Contact from '../components/home/Contact';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Users, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage({ onNavigate, onShowToast }) {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero onNavigate={onNavigate} />

      {/* 2. About Section */}
      <About />

      {/* 3. Skills Section */}
      <Skills />

      {/* 4. Projects Section */}
      <Projects />

      {/* 5. Special Callout to NEW Community & Team Page */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card glow className="p-8 sm:p-10 border border-accent-emerald/30 bg-gradient-to-r from-dark-800/90 via-dark-700/80 to-dark-800/90 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-accent-emerald/15 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald flex-shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <span className="text-xs font-mono font-bold text-accent-emerald uppercase tracking-wider">
                    Explore Multi-Page Feature
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/40 rounded-full">
                    NEW PAGE
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Developer Community &amp; Team Directory
                </h3>
                <p className="text-sm text-gray-300 max-w-xl mt-1">
                  Check out the new dedicated second page featuring dynamic JSONPlaceholder API integration, real-time live search, and publications modal!
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="flex-shrink-0 whitespace-nowrap"
              onClick={() => {
                onNavigate('community');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Open Community Page
            </Button>
          </Card>
        </div>
      </section>

      {/* 6. Contact Section */}
      <Contact onShowToast={onShowToast} />
    </div>
  );
}

