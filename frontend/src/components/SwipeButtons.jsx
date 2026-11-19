import React from 'react';
import { Heart, X } from './Icons';

export default function SwipeButtons({ onPass, onLike, disabled = false }) {
  return (
    <div className="flex items-center justify-center gap-6 py-4 select-none">
      {/* Pass Button */}
      <button
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white hover:bg-gray-50 border-2 border-[#17141E] shadow-[4px_4px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-[#17141E]"
      >
        <X className="w-7 h-7 text-[#17141E]" strokeWidth={2.5} />
      </button>

      {/* Like Button */}
      <button
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FF3680] hover:bg-[#f02973] border-2 border-[#17141E] shadow-[4px_4px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-white"
      >
        <Heart className="w-8 h-8 fill-white text-white" fill="#FFFFFF" strokeWidth={1.5} />
      </button>
    </div>
  );
}
