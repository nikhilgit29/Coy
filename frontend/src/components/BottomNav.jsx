import React from 'react';
import { Home, Compass } from './Icons';

export default function BottomNav({ activeTab, onSelectTab, matchCount = 0 }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-center bg-white/95 backdrop-blur-md border-t-2 border-[#17141E]">
      <div className="w-full max-w-md flex items-center justify-around px-6 py-2.5">
        {/* Tab 1: Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-6 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-[#17141E] font-bold bg-[#FCE4EC] border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E]'
              : 'text-gray-500 hover:text-[#17141E] font-medium'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-xs">Home</span>
        </button>

        {/* Tab 2: Discover */}
        <button
          onClick={() => onSelectTab('discover')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-6 rounded-2xl transition-all ${
            activeTab === 'discover'
              ? 'text-[#17141E] font-bold bg-[#E8DFFF] border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E]'
              : 'text-gray-500 hover:text-[#17141E] font-medium'
          }`}
        >
          <Compass className={`w-5 h-5 mb-0.5 ${activeTab === 'discover' ? 'stroke-[2.5] text-[#FF3680]' : 'stroke-2'}`} />
          <span className="text-xs">Discover</span>
          {matchCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-extrabold text-white bg-[#FF3680] border-2 border-[#17141E] rounded-full">
              {matchCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
