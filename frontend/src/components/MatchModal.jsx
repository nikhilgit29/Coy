import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from './Icons';

export default function MatchModal({
  isOpen,
  matchedProfile,
  userPhoto,
  onContinue,
  onViewMatches,
}) {
  if (!isOpen || !matchedProfile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-sm bg-white rounded-3xl border-2 border-[#17141E] shadow-[6px_6px_0px_#17141E] p-6 text-center relative overflow-hidden"
        >
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#FF3680]" />

          {/* Sparkle Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE45C] border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] text-xs font-black uppercase tracking-wider text-[#17141E] mb-4 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-[#17141E]" />
            <span>Mutual Match</span>
          </div>

          <h2 className="text-3xl font-black text-[#17141E] tracking-tight mb-1">
            It's a match!
          </h2>
          <p className="text-sm font-semibold text-gray-600 mb-6">
            You and <span className="text-[#FF3680] font-black">{matchedProfile.name}</span> liked each other.
          </p>

          {/* Overlapping Photos */}
          <div className="flex items-center justify-center relative my-4 h-28">
            {/* User photo */}
            <div className="w-24 h-24 rounded-full border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] overflow-hidden bg-gray-100 absolute left-14 z-10 transform -rotate-6">
              <img
                src={userPhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"}
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Heart in center */}
            <div className="w-10 h-10 rounded-full bg-[#FF3680] border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] flex items-center justify-center absolute z-30">
              <Heart className="w-5 h-5 fill-white text-white" fill="#FFFFFF" />
            </div>

            {/* Matched profile photo */}
            <div className="w-24 h-24 rounded-full border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] overflow-hidden bg-gray-100 absolute right-14 z-20 transform rotate-6">
              <img
                src={matchedProfile.photo}
                alt={matchedProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Matched person details preview */}
          <div className="bg-[#E8DFFF] rounded-2xl border-2 border-[#17141E] p-3 mb-6">
            <p className="text-sm font-black text-[#17141E]">
              {matchedProfile.name}, {matchedProfile.age}
            </p>
            <p className="text-xs font-semibold text-gray-700">
              {matchedProfile.cityOrCollege}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={onContinue}
              className="w-full py-3.5 px-4 rounded-full bg-[#FF3680] hover:bg-[#f02973] text-white font-black text-sm border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Continue Discovering
            </button>

            <button
              onClick={onViewMatches}
              className="w-full py-3 px-4 rounded-full bg-white hover:bg-gray-50 text-[#17141E] font-extrabold text-sm border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
            >
              <span>View in Matches</span>
              <ArrowRight className="w-4 h-4 text-[#FF3680]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
