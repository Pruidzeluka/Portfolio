import React from 'react';

export default function Badge({ 
  children, 
  variant = 'cyan', 
  size = 'md',
  className = '',
  icon = null
}) {
  const variantStyles = {
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30',
    emerald: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30',
    muted: 'bg-white/5 text-gray-300 border-white/10',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5',
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border tracking-wide transition-colors ${variantStyles[variant] || variantStyles.cyan} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
}

