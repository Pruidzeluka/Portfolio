import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import SkillCard from './SkillCard';
import Card from '../common/Card';
import { skillsData, toolingList } from '../../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Core Logic', 'Backend', 'Workflow'];

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Technical Arsenal"
          titlePrefix="Skills &amp;"
          gradientWord="Technologies"
          subtitle="Proficiencies acquired through hands-on development, rigorous coursework at TBC Academy, and modern project builds."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-emerald text-dark-900 shadow-md shadow-accent-cyan/20 font-bold'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Tooling Strip */}
        <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-1">
              Familiar Tooling &amp; Workflow
            </h4>
            <p className="text-xs text-gray-400">
              Modern developer ecosystem tools utilized for continuous productivity.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            {toolingList.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-accent-cyan/40 hover:text-white transition-all hover:-translate-y-0.5"
              >
                {tool}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

