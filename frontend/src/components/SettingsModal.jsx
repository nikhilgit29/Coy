import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, RefreshCw } from './Icons';

export default function SettingsModal({
  isOpen,
  onClose,
  onResetSwipes,
  user,
}) {
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  if (!isOpen) return null;

  const handleReset = async () => {
    try {
      setResetting(true);
      await onResetSwipes();
      setResetDone(true);
      setTimeout(() => {
        setResetDone(false);
      }, 2000);
    } finally {
      setResetting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-sm bg-white rounded-3xl border-2 border-[#17141E] shadow-[6px_6px_0px_#17141E] p-6 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-black text-[#17141E]">Settings & Demo</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border-2 border-[#17141E] flex items-center justify-center bg-gray-50 hover:bg-gray-100 shadow-[1px_1px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5"
            >
              <X className="w-4 h-4 text-[#17141E]" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FCE4EC] border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] mb-5">
            <img
              src={user?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
              alt="Alex"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#17141E]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-[#17141E]">{user?.name || "Alex"}, {user?.age || 22}</span>
                <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-[#FF3680] text-white rounded-full">DEMO</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{user?.city || "San Francisco, CA"}</p>
            </div>
          </div>

          {/* Privacy Guarantee Box */}
          <div className="p-4 rounded-2xl bg-[#E8DFFF] border-2 border-[#17141E] mb-5 text-left">
            <div className="flex items-center gap-2 mb-1.5 text-[#17141E]">
              <ShieldCheck className="w-5 h-5 text-[#FF3680]" />
              <span className="font-extrabold text-sm">Strict Coy Privacy</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              One-sided likes are strictly private and never exposed to the other person. Only mutual matches are revealed.
            </p>
          </div>

          {/* Reset Demo Swipes Button */}
          <div className="space-y-3">
            <button
              onClick={handleReset}
              disabled={resetting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FFE45C] hover:bg-[#fad839] text-[#17141E] font-black text-xs border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
              <span>{resetDone ? "Swipes Reset!" : "Reset Swipes & Matches (Demo)"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-full bg-white text-gray-700 font-extrabold text-xs border-2 border-gray-300 hover:border-[#17141E] transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
