import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, GraduationCap, Heart, X } from './Icons';

export default function ProfileCard({
  profile,
  isFront = true,
  onSwipe,
  activeDirection = null,
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('LIKE');
    } else if (info.offset.x < -threshold) {
      onSwipe('PASS');
    }
  };

  // If this is the background card, render static without drag
  if (!isFront) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <div className="w-full h-full bg-white rounded-3xl border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] overflow-hidden flex flex-col scale-[0.96] translate-y-3 opacity-90 transition-all">
          <div className="relative w-full h-[52%] overflow-hidden bg-gray-100">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between bg-white">
            <div>
              <h2 className="text-xl font-black text-[#17141E]">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-xs font-semibold text-gray-500 mt-1 line-clamp-1">
                {profile.cityOrCollege}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        activeDirection === 'LIKE'
          ? { x: 500, rotate: 20, opacity: 0 }
          : activeDirection === 'PASS'
          ? { x: -500, rotate: -20, opacity: 0 }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      <div className="relative w-full h-full bg-white rounded-3xl border-2 border-[#17141E] shadow-[4px_4px_0px_#17141E] overflow-hidden flex flex-col">
        {/* Swipe Badge Overlays */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-6 left-6 z-20 pointer-events-none transform -rotate-12"
        >
          <div className="px-4 py-1.5 rounded-xl border-2 border-[#FF3680] bg-[#FF3680] text-white font-black text-xl tracking-wider shadow-[3px_3px_0px_#17141E] flex items-center gap-1.5">
            <Heart className="w-5 h-5 fill-white" fill="#FFFFFF" />
            <span>LIKE</span>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: passOpacity }}
          className="absolute top-6 right-6 z-20 pointer-events-none transform rotate-12"
        >
          <div className="px-4 py-1.5 rounded-xl border-2 border-[#17141E] bg-[#17141E] text-white font-black text-xl tracking-wider shadow-[3px_3px_0px_#17141E] flex items-center gap-1.5">
            <X className="w-5 h-5" strokeWidth={3} />
            <span>PASS</span>
          </div>
        </motion.div>

        {/* Profile Photograph */}
        <div className="relative w-full h-[52%] overflow-hidden bg-gray-100 border-b-2 border-[#17141E]">
          <img
            src={profile.photo}
            alt={profile.name}
            draggable={false}
            className="w-full h-full object-cover"
          />

          {/* Location / College Tag Over Photo */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 border-2 border-[#17141E] shadow-[2px_2px_0px_#17141E] text-xs font-bold text-[#17141E]">
            {profile.cityOrCollege.toLowerCase().includes('university') ||
            profile.cityOrCollege.toLowerCase().includes('college') ||
            profile.cityOrCollege.toLowerCase().includes('tisch') ||
            profile.cityOrCollege.toLowerCase().includes('tech') ? (
              <GraduationCap className="w-3.5 h-3.5 text-[#FF3680]" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-[#FF3680]" />
            )}
            <span>{profile.cityOrCollege}</span>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="flex-1 p-4.5 flex flex-col justify-between bg-white overflow-y-auto">
          <div>
            {/* Name and Age */}
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-2xl font-black text-[#17141E] tracking-tight">
                {profile.name}, <span className="font-extrabold text-gray-700">{profile.age}</span>
              </h2>
            </div>

            {/* Short Bio */}
            <p className="text-sm font-medium text-gray-600 line-clamp-3 leading-relaxed mb-3">
              {profile.bio}
            </p>
          </div>

          {/* Interests Pills */}
          <div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {profile.interests &&
                profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-[#E8DFFF] text-[#17141E] border border-[#17141E] shadow-[1.5px_1.5px_0px_#17141E]"
                  >
                    {interest}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
