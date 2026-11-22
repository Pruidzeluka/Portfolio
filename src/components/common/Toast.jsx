import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = 'success', isVisible }) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-dark-800/95 border border-accent-cyan/40 text-white shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,245,255,0.25)] backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 text-sm font-medium"
      role="status"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-accent-emerald flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}

