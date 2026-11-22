import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const renderPreviewMockup = () => {
    switch (project.previewType) {
      case 'fintech':
        return (
          <div className="h-48 bg-gradient-to-br from-dark-900 to-dark-800 p-4 flex flex-col justify-between border-b border-white/10 relative overflow-hidden group-hover:border-accent-cyan/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-400">app.finvault.preview</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                Balance: $24,850
              </span>
            </div>
            {/* Visual chart bars */}
            <div className="flex items-end gap-2 h-20 pt-2 px-2">
              <div className="flex-1 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan h-[45%] rounded-t transition-all group-hover:h-[60%]" />
              <div className="flex-1 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan h-[70%] rounded-t transition-all group-hover:h-[80%]" />
              <div className="flex-1 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan h-[55%] rounded-t transition-all group-hover:h-[70%]" />
              <div className="flex-1 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan h-[90%] rounded-t transition-all group-hover:h-[95%]" />
              <div className="flex-1 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan h-[65%] rounded-t transition-all group-hover:h-[75%]" />
              <div className="flex-1 bg-gradient-to-t from-accent-emerald/20 to-accent-emerald h-[100%] rounded-t" />
            </div>
          </div>
        );

      case 'commerce':
        return (
          <div className="h-48 bg-gradient-to-br from-dark-900 to-dark-800 p-4 flex flex-col justify-between border-b border-white/10 relative overflow-hidden group-hover:border-accent-cyan/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-400">store.lumina.shop</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/30">
                Cart (3 Items)
              </span>
            </div>
            {/* Mini product visual items */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="h-10 rounded bg-gradient-to-r from-accent-cyan/20 to-accent-emerald/20 mb-2" />
                <div className="h-1.5 w-3/4 bg-white/20 rounded mb-1" />
                <div className="h-1.5 w-1/2 bg-white/10 rounded" />
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="h-10 rounded bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-2" />
                <div className="h-1.5 w-3/4 bg-white/20 rounded mb-1" />
                <div className="h-1.5 w-1/2 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        );

      case 'task':
      default:
        return (
          <div className="h-48 bg-gradient-to-br from-dark-900 to-dark-800 p-4 flex flex-col justify-between border-b border-white/10 relative overflow-hidden group-hover:border-accent-cyan/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-400">taskflow.app/board</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30">
                Sprint Active
              </span>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-accent-emerald/30 text-xs text-accent-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                <span className="font-mono truncate">✓ Responsive UI &amp; Architecture</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-accent-cyan/30 text-xs text-accent-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                <span className="font-mono truncate">⚡ React &amp; Tailwind Integration</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card glow className="flex flex-col justify-between overflow-hidden group h-full">
      <div>
        {renderPreviewMockup()}

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-accent-cyan uppercase tracking-wider">
              {project.category}
            </span>
            <Badge variant="muted" size="sm">
              {project.status}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Source Code</span>
        </a>

        <a
          href={project.demoUrl}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan hover:text-accent-emerald transition-colors"
        >
          <span>Live Preview</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
}

