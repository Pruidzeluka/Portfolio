import React from 'react';
import { Sparkles, Terminal, GraduationCap, Wand2, Boxes, Rocket, CheckCircle2, IdCard } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import SectionHeader from '../common/SectionHeader';
import { personalInfo, aboutPillars, tbcTopics } from '../../data/portfolioData';

export default function About() {
  const pillarIcons = {
    wand: <Wand2 className="w-5 h-5 text-accent-emerald" />,
    cubes: <Boxes className="w-5 h-5 text-accent-cyan" />,
    rocket: <Rocket className="w-5 h-5 text-purple-400" />
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="About Me"
          titlePrefix="Driven by Curiosity,"
          gradientWord="Engineered"
          titleSuffix="for Excellence"
          subtitle="A glimpse into my background, philosophy, and continuous journey in modern software development."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story Narrative Card */}
          <div className="lg:col-span-7">
            <Card glow className="p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-accent-cyan uppercase tracking-wider block">
                      My Journey &amp; Mindset
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Turning complex challenges into elegant digital solutions.
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    My journey into software development started with a profound curiosity about how digital products shape our everyday world. From writing my first semantic tags to architecting modular full-stack applications with React and modern APIs, I maintain an unwavering commitment to detail, user experience, and computational efficiency.
                  </p>
                  <p>
                    Currently immersed in the rigorous <strong className="text-white">TBC Academy Full-Stack Development program</strong>, I spend my days building end-to-end web applications, mastering modern ECMAScript standards, component architectures, and team collaboration workflows.
                  </p>
                </div>
              </div>

              {/* 3 Pillars */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                {aboutPillars.map((pillar) => (
                  <div key={pillar.id} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {pillarIcons[pillar.icon] || <Sparkles className="w-4 h-4 text-accent-cyan" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 leading-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: TBC Spotlight & Quick Facts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* TBC Academy Spotlight Card */}
            <Card glow className="p-6 sm:p-8 border-l-4 border-l-accent-cyan bg-gradient-to-br from-dark-800/90 to-dark-700/80">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-accent-emerald" />
                <span className="text-xs font-mono font-semibold text-accent-emerald uppercase tracking-wider">
                  Current Program
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-1">
                TBC Academy
              </h3>
              <p className="text-sm font-semibold text-accent-cyan mb-3">
                Full-Stack Development Course
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                Intensive, project-based training covering modern web engineering, component design systems, server-side data handling, Git workflows, and production software standards.
              </p>

              {/* Topic Pills */}
              <div className="flex flex-wrap gap-1.5">
                {tbcTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Card>

            {/* Quick Highlights Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <IdCard className="w-4 h-4 text-accent-cyan" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Key Information
                </h4>
              </div>

              <ul className="divide-y divide-white/5 text-sm">
                <li className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-400">Name</span>
                  <span className="font-semibold text-white">{personalInfo.name}</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-400">Role</span>
                  <span className="font-semibold text-white">{personalInfo.role}</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-400">Institution</span>
                  <span className="font-semibold text-accent-emerald font-mono">TBC Academy</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="font-semibold text-accent-cyan font-mono text-xs">Open for Roles &amp; Internships</span>
                </li>
              </ul>
            </Card>

          </div>

        </div>
      </div>
    </section>
  );
}
