import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMascot } from '../contexts/MascotContext';

export default function MascotHost() {
  const { message, isVisible, isBouncing } = useMascot();
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when user scrolls down at least 250px or 30% of page height
      const threshold = Math.min(250, (document.documentElement.scrollHeight - window.innerHeight) * 0.3);
      if (window.scrollY > threshold) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Should only show if page requires mascot AND user scrolled down
  const shouldShow = isVisible && isScrolledDown;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.8 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-30 flex flex-col items-end pointer-events-none"
        >
          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-white/95 backdrop-blur-md p-2.5 md:p-3.5 rounded-2xl shadow-lg border border-indigo-100/80 mb-1.5 max-w-[130px] sm:max-w-[160px] md:max-w-[200px] text-center relative pointer-events-auto"
            style={{ borderBottomRightRadius: '4px' }}
          >
            <p className="text-indigo-950 font-extrabold text-[11px] md:text-xs leading-tight md:leading-relaxed">{message}</p>
            {/* Tail */}
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-indigo-100/80 -z-10"></div>
          </motion.div>

          {/* Mascot Image */}
          <motion.img
            src="/mascot/raccoon-host.png"
            alt="EnglisHeu Host"
            className="w-14 sm:w-16 md:w-22 h-auto drop-shadow-xl pointer-events-auto hover:scale-110 transition-transform duration-300 origin-bottom"
            animate={isBouncing ? { y: [0, -12, 0] } : { y: 0 }}
            transition={isBouncing ? { duration: 0.4, ease: "easeInOut", repeat: 1 } : {}}
            onError={(e) => {
              e.target.src = 'https://placehold.co/200x200/transparent/transparent.png';
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
