import React from 'react';
import { Settings } from './Icons';
import CoyLogo from './CoyLogo';

export default function Header({ onOpenSettings }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100">
      <div className="flex items-center">
        <CoyLogo />
      </div>

      <button
        onClick={onOpenSettings}
        aria-label="Settings"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#17141E]"
      >
        <Settings className="w-5 h-5 text-[#17141E]" />
      </button>
    </header>
  );
}
