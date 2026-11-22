import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { 
  Code2, 
  Palette, 
  FileCode, 
  GitBranch, 
  Smartphone, 
  Server, 
  Layers 
} from 'lucide-react';

export default function SkillCard({ skill }) {
  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'html5':
        return <FileCode className="w-7 h-7 text-[#e34f26]" />;
      case 'css3':
        return <Palette className="w-7 h-7 text-[#00f5ff]" />;
      case 'javascript':
        return <Code2 className="w-7 h-7 text-[#f7df1e]" />;
      case 'react':
        return <Layers className="w-7 h-7 text-[#61dafb]" />;
      case 'git':
        return <GitBranch className="w-7 h-7 text-[#f05032]" />;
      case 'responsive':
        return <Smartphone className="w-7 h-7 text-accent-emerald" />;
      case 'api':
        return <Server className="w-7 h-7 text-purple-400" />;
      default:
        return <Code2 className="w-7 h-7 text-accent-cyan" />;
    }
  };

  return (
    <Card glow className="p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-13 h-13 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110">
            {getSkillIcon(skill.icon)}
          </div>
          <Badge variant="muted" size="sm">
            {skill.level}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
          {skill.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5">
          {skill.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
        {skill.tags.map((tag, idx) => (
          <span 
            key={idx}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5 group-hover:border-accent-cyan/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}

