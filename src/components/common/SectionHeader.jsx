import React from 'react';
import Badge from './Badge';

export default function SectionHeader({
  tag,
  titlePrefix,
  gradientWord,
  titleSuffix,
  subtitle,
  centered = true,
  className = ''
}) {
  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {tag && (
        <Badge variant="cyan" size="md" className="mb-4">
          {tag}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
        {titlePrefix}{' '}
        {gradientWord && (
          <span className="bg-gradient-to-r from-accent-cyan via-teal-300 to-accent-emerald bg-clip-text text-transparent">
            {gradientWord}
          </span>
        )}{' '}
        {titleSuffix}
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

