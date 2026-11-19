import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Compass } from '../components/Icons';
import ProfileCard from '../components/ProfileCard';
import SwipeButtons from '../components/SwipeButtons';

export default function DiscoverPage({
  profiles = [],
  loading = false,
  matches = [],
  onSwipe,
  onResetSwipes,
  activeSubSection,
  setActiveSubSection,
}) {
  const [activeDirection, setActiveDirection] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const currentProfile = profiles.length > 0 ? profiles[0] : null;
  const nextProfile = profiles.length > 1 ? profiles[1] : null;

  const handleButtonAction = (direction) => {
    if (!currentProfile || activeDirection) return;
    setActiveDirection(direction);
    setTimeout(() => {
      onSwipe(currentProfile.id, direction);
      setActiveDirection(null);
    }, 280);
  };

  const handleCardSwipe = (direction) => {
    if (!currentProfile) return;
    onSwipe(currentProfile.id, direction);
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-3 pb-24 max-w-md mx-auto w-full">
      {/* Sub-Navigation Toggle: Discover vs Matches */}
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex p-1 bg-gray-100 rounded-2xl border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E]">
          <button
            onClick={() => setActiveSubSection('discover')}
            className={`flex items-center gap-1.5 px-5 py-1.5 rounded-xl text-xs font-black transition-all ${
              activeSubSection === 'discover'
                ? 'bg-[#FF3680] text-white border-2 border-[#17141E] shadow-[1.5px_1.5px_0px_#17141E]'
                : 'text-gray-600 hover:text-[#17141E]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setActiveSubSection('matches')}
            className={`relative flex items-center gap-1.5 px-5 py-1.5 rounded-xl text-xs font-black transition-all ${
              activeSubSection === 'matches'
                ? 'bg-[#E8DFFF] text-[#17141E] border-2 border-[#17141E] shadow-[1.5px_1.5px_0px_#17141E]'
                : 'text-gray-600 hover:text-[#17141E]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-[#FF3680] text-[#FF3680]" fill="#FF3680" />
            <span>Matches</span>
            {matches.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[#FF3680] text-white font-extrabold rounded-full">
                {matches.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 1: DISCOVER SWIPE DECK */}
      {activeSubSection === 'discover' && (
        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#FF3680] border-t-transparent animate-spin mb-4" />
              <p className="text-sm font-bold text-gray-600">Finding people near you...</p>
            </div>
          ) : currentProfile ? (
            <div className="flex-1 flex flex-col">
              {/* Card Container */}
              <div className="relative flex-1 w-full min-h-[460px] max-h-[520px]">
                {/* Background Next Card */}
                {nextProfile && (
                  <ProfileCard
                    key={`bg-${nextProfile.id}`}
                    profile={nextProfile}
                    isFront={false}
                  />
                )}

                {/* Front Active Card */}
                <ProfileCard
                  key={`front-${currentProfile.id}`}
                  profile={currentProfile}
                  isFront={true}
                  onSwipe={handleCardSwipe}
                  activeDirection={activeDirection}
                />
              </div>

              {/* Action Buttons for Desktop / Click */}
              <SwipeButtons
                onPass={() => handleButtonAction('PASS')}
                onLike={() => handleButtonAction('LIKE')}
                disabled={Boolean(activeDirection)}
              />

              {/* Deck progress footer indicator */}
              <div className="text-center">
                <span className="text-[11px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                  {profiles.length} profiles remaining
                </span>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-auto">
              <div className="w-full rounded-3xl border-2 border-dashed border-[#17141E]/40 p-8 flex flex-col items-center bg-[#FCE4EC]/40">
                <div className="w-16 h-16 rounded-full bg-[#E8DFFF] border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-[#FF3680]" />
                </div>

                <h3 className="text-2xl font-black text-[#17141E] mb-2 tracking-tight">
                  You're all caught up!
                </h3>
                <p className="text-xs font-semibold text-gray-500 mb-6 max-w-xs leading-relaxed">
                  You've swiped on all available profiles. Check out your mutual matches or reset the cards to explore again.
                </p>

                <div className="flex flex-col gap-2.5 w-full max-w-xs">
                  {matches.length > 0 && (
                    <button
                      onClick={() => setActiveSubSection('matches')}
                      className="w-full py-3 px-4 rounded-full bg-[#FF3680] text-white font-extrabold text-xs border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-4 h-4 fill-white" fill="#FFFFFF" />
                      <span>View {matches.length} Mutual Matches</span>
                    </button>
                  )}

                  <button
                    onClick={onResetSwipes}
                    className="w-full py-3 px-4 rounded-full bg-[#FFE45C] hover:bg-[#fad839] text-[#17141E] font-black text-xs border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4 text-[#17141E]" />
                    <span>Reset Demo Deck</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: MATCHES LIST */}
      {activeSubSection === 'matches' && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-[#17141E]">Your Matches</h2>
              <p className="text-xs font-semibold text-gray-500">
                Profiles where both of you liked each other
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-black bg-[#E8DFFF] border border-[#17141E] rounded-full">
              {matches.length} Total
            </span>
          </div>

          {matches.length === 0 ? (
            /* Empty Matches State */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-auto">
              <div className="w-full rounded-3xl border-2 border-dashed border-[#17141E]/30 p-8 flex flex-col items-center bg-gray-50/60">
                <div className="w-14 h-14 rounded-full bg-[#FCE4EC] border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] flex items-center justify-center mb-3">
                  <Heart className="w-7 h-7 text-[#FF3680]" />
                </div>
                <h3 className="text-lg font-black text-[#17141E] mb-1">
                  No mutual matches yet
                </h3>
                <p className="text-xs font-medium text-gray-500 mb-5 max-w-xs leading-relaxed">
                  Likes are 100% confidential. When someone you like also likes you back, they'll appear here!
                </p>
                <button
                  onClick={() => setActiveSubSection('discover')}
                  className="py-2.5 px-5 rounded-full bg-[#FF3680] text-white font-extrabold text-xs border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  Start Swiping
                </button>
              </div>
            </div>
          ) : (
            /* Matches Grid */
            <div className="grid grid-cols-2 gap-3.5">
              {matches.map((match) => (
                <motion.div
                  key={match.matchId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedMatch(match.profile)}
                  className="bg-white rounded-2xl border-2 border-[#17141E] shadow-[3px_3px_0px_#17141E] overflow-hidden cursor-pointer hover:translate-y-[-2px] transition-all flex flex-col"
                >
                  <div className="relative w-full h-36 bg-gray-100 overflow-hidden">
                    <img
                      src={match.profile.photo}
                      alt={match.profile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FF3680] border border-[#17141E] flex items-center justify-center shadow-[1px_1px_0px_#17141E]">
                      <Heart className="w-3.5 h-3.5 fill-white text-white" fill="#FFFFFF" />
                    </div>
                  </div>

                  <div className="p-2.5 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-black text-[#17141E] truncate">
                        {match.profile.name}, {match.profile.age}
                      </h4>
                      <p className="text-[11px] font-semibold text-gray-500 truncate">
                        {match.profile.cityOrCollege}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-gray-600 font-bold">
                      <span className="px-1.5 py-0.5 bg-[#E8DFFF] rounded-md border border-[#17141E]">
                        Matched
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Match Detail Drawer / Dialog */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-white rounded-3xl border-3 border-[#17141E] shadow-[6px_6px_0px_#17141E] overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-56 bg-gray-100">
              <img
                src={selectedMatch.photo}
                alt={selectedMatch.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedMatch(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-black text-[#17141E]">
                  {selectedMatch.name}, {selectedMatch.age}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#FF3680] text-white">
                  Mutual Match
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-600 mb-3">
                {selectedMatch.cityOrCollege}
              </p>
              <p className="text-xs text-gray-700 font-medium mb-4 leading-relaxed">
                {selectedMatch.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {selectedMatch.interests?.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-bold bg-[#E8DFFF] text-[#17141E] border border-[#17141E] rounded-lg"
                  >
                    {i}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedMatch(null)}
                className="w-full py-2.5 rounded-full bg-[#17141E] text-white font-extrabold text-xs"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
