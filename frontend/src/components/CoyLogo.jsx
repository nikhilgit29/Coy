import React from 'react';

export default function CoyLogo({ size = 'default' }) {
  const isLarge = size === 'large';

  return (
    <div className="flex items-baseline select-none font-black tracking-tight text-[#17141E]">
      <span className={isLarge ? "text-4xl" : "text-2xl"}>coy</span>
      <span
        className={`inline-block rounded-full bg-[#FF3680] ml-0.5 ${
          isLarge ? "w-3 h-3 mb-0.5" : "w-2 h-2 mb-0.5"
        }`}
      />
    </div>
  );
}
