import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  icon = null,
  target,
  rel,
  ariaLabel
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-accent-cyan to-accent-emerald text-dark-900 font-bold shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/40 hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-white/5 text-gray-100 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-accent-cyan/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
    outline: "bg-transparent text-accent-cyan border border-accent-cyan/40 hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/20 hover:-translate-y-0.5 active:translate-y-0",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses} 
        target={target} 
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        <span>{children}</span>
        {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
}

