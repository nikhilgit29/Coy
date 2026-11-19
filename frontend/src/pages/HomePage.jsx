import React from 'react';
import { Compass, Sparkles } from '../components/Icons';

export default function HomePage({ onGoToDiscover }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* Intentionally kept blank / minimalist per Coy specifications */}
      <div className="max-w-xs flex flex-col items-center">
        <div className="w-16 h-16 rounded-3xl bg-[#FCE4EC] border-2 border-[#17141E] shadow-[4px_4px_0px_#17141E] flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-[#FF3680]" />
        </div>

        <h1 className="text-2xl font-black text-[#17141E] mb-2 tracking-tight">
          Welcome to Coy
        </h1>
        <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
          Find out who likes you back with complete privacy. Ready to find your match?
        </p>

        <button
          onClick={onGoToDiscover}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FF3680] text-white font-extrabold text-base border-2 border-[#17141E] shadow-[4px_4px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <Compass className="w-5 h-5" />
          <span>Go to Discover</span>
        </button>
      </div>
    </div>
  );
}
