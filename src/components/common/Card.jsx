import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  glow = false,
  hoverLift = true,
  onClick
}) {
  return (
    <div 
      onClick={onClick}
      className={`relative rounded-2xl bg-dark-800/70 backdrop-blur-xl border border-white/10 transition-all duration-300 ${
        hoverLift ? 'hover:-translate-y-1.5' : ''
      } ${
        glow ? 'hover:border-accent-cyan/40 hover:shadow-[0_0_35px_-5px_rgba(0,245,255,0.2)]' : 'hover:border-white/20'
      } ${className}`}
    >
      {/* Subtle top border highlight shine */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl pointer-events-none" />
      {children}
    </div>
  );
}

