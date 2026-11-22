import React from 'react';

export default function PostCard({ post, index }) {
  return (
    <article className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-all hover:bg-white/[0.07] group">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-[11px] font-mono font-bold text-accent-cyan bg-accent-cyan/15 px-2 py-0.5 rounded border border-accent-cyan/30 flex-shrink-0">
          #{index + 1}
        </span>
        <h4 className="text-sm sm:text-base font-bold text-white capitalize leading-snug group-hover:text-accent-cyan transition-colors flex-1">
          {post.title}
        </h4>
      </div>

      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-1">
        {post.body}
      </p>
    </article>
  );
}

