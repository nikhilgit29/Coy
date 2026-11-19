import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from './Icons';
import CoyLogo from './CoyLogo';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // 1.5 seconds splash duration for a snappy, delightful transition
    const timer = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCE4EC] select-none"
    >
      <div className="flex flex-col items-center">
        {/* Heart with clean heartbeat animation (2 smooth beats over 1.5s) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1.05, 1.25, 1],
          }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center w-24 h-24 mb-6"
        >
          <Heart
            className="w-20 h-20 text-[#FF3680] fill-[#FF3680]"
            strokeWidth={1.5}
            fill="#FF3680"
          />
        </motion.div>

        {/* Coy Logo below the heart */}
        <div className="mt-2">
          <CoyLogo size="large" />
        </div>
      </div>
    </motion.div>
  );
}
