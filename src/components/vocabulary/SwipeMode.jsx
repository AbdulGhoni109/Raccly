import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, RefreshCcw, Heart, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useMascot } from '../../contexts/MascotContext';

export default function SwipeMode({ vocabList }) {
  const { setMascotMessage } = useMascot();
  const [vocabProgress, setVocabProgress] = useLocalStorage('raccly_vocab_progress', {});

  const [challenges, setChallenges] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, realMeaning: string } | null
  const [isFinished, setIsFinished] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const listKey = vocabList ? vocabList.map(v => v.id).join(',') : '';

  // Generate challenges whenever vocabList changes or restart
  useEffect(() => {
    initGame();
  }, [listKey]);

  const initGame = () => {
    if (!vocabList || vocabList.length === 0) return;

    // Shuffle words
    const shuffled = [...vocabList].sort(() => Math.random() - 0.5);

    const generated = shuffled.map((wordObj) => {
      // 50% chance for correct match, 50% chance for incorrect match
      const isMatch = Math.random() < 0.5;

      let displayedMeaning = wordObj.meaning;
      if (!isMatch && vocabList.length > 1) {
        const otherWords = vocabList.filter(w => w.id !== wordObj.id);
        const randomOther = otherWords[Math.floor(Math.random() * otherWords.length)];
        displayedMeaning = randomOther.meaning;
      }

      return {
        wordObj,
        displayedMeaning,
        isMatch
      };
    });

    setChallenges(generated);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
  };

  const handleAnswer = (userSaysMatch) => {
    if (feedback || isFinished || challenges.length === 0) return;

    const current = challenges[currentIndex];
    const isUserCorrect = (userSaysMatch === current.isMatch);

    let newScore = score;
    if (isUserCorrect) {
      newScore = score + 1;
      setScore(newScore);
      setVocabProgress({ ...vocabProgress, [current.wordObj.id]: true });
      setMascotMessage("Keren banget! Pemahamanmu tentang kata ini tepat! 🎉");
    } else {
      setVocabProgress({ ...vocabProgress, [current.wordObj.id]: false });
      setMascotMessage(`Kurang tepat! Arti aslinya: "${current.wordObj.meaning}" 💪`);
    }

    setFeedback({
      isCorrect: isUserCorrect,
      realMeaning: current.wordObj.meaning,
      isMatch: current.isMatch
    });

    // Advance to next after 1.4 seconds feedback
    setTimeout(() => {
      setFeedback(null);
      x.set(0);
      if (currentIndex + 1 < challenges.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
        setMascotMessage(`Luar biasa! Kamu menyelesaikan sesi dengan skor ${newScore}/${challenges.length}! 🏆`);
      }
    }, 1400);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 80;
    if (info.offset.x > swipeThreshold) {
      // Swiped Right -> User says "Cocok"
      handleAnswer(true);
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped Left -> User says "Nggak Cocok"
      handleAnswer(false);
    }
  };

  if (!vocabList || vocabList.length === 0) {
    return (
      <div className="text-center p-8 text-slate-500 font-medium">
        Tidak ada kosakata dalam kelompok ini.
      </div>
    );
  }

  // Completion Screen
  if (isFinished) {
    const pct = Math.round((score / challenges.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/60 max-w-md mx-auto text-center relative overflow-hidden"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-indigo-950 mb-2">Sesi Selesai! 🎉</h2>
        <p className="text-purple-900/80 font-bold text-sm mb-6">Kamu telah menguji pemahaman seluruh kata dalam kelompok ini.</p>
        
        <div className="bg-indigo-50/80 p-6 rounded-2xl border border-indigo-100 mb-8">
          <div className="text-5xl font-black text-indigo-900 mb-1">{score} / {challenges.length}</div>
          <p className="text-indigo-600 font-bold text-sm">Akurasi Pemahaman: {pct}%</p>
        </div>

        <button 
          onClick={initGame} 
          className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" />
          Main Lagi
        </button>
      </motion.div>
    );
  }

  const currentChallenge = challenges[currentIndex];
  if (!currentChallenge) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-sm text-xs font-black text-indigo-950 flex items-center gap-1.5">
          <span>🏷️ {currentChallenge.wordObj.category}</span>
          <span className="text-purple-600 font-extrabold">{currentIndex + 1}/{challenges.length}</span>
        </div>

        <div className="bg-emerald-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-400/30 text-xs font-extrabold text-emerald-900 flex items-center gap-1">
          <span>✅</span>
          <span>{score}</span>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-white/40 h-2 rounded-full mb-6 overflow-hidden border border-white/20">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / challenges.length) * 100}%` }}
        />
      </div>

      {/* Card Container */}
      <div className="relative w-full h-[27rem] flex justify-center">
        
        {/* Instant Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute inset-0 z-30 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md ${
                feedback.isCorrect ? 'bg-emerald-600/95 text-white' : 'bg-rose-600/95 text-white'
              }`}
            >
              <div className="p-4 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-16 h-16 text-white" />
                ) : (
                  <AlertCircle className="w-16 h-16 text-white" />
                )}
              </div>
              <h3 className="text-3xl font-black mb-2">
                {feedback.isCorrect ? 'BENAR! 🎉' : 'KURANG TEPAT! 😅'}
              </h3>
              <p className="text-white/90 font-semibold text-sm max-w-xs leading-relaxed">
                {feedback.isCorrect 
                  ? (feedback.isMatch ? 'Arti tersebut memang COCOK!' : 'Arti tersebut memang TIDAK COCOK!')
                  : `Arti sebenarnya: "${feedback.realMeaning}"`
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Swipable Card */}
        <motion.div
          className="w-full h-full bg-gradient-to-b from-white to-indigo-50/60 rounded-[2.5rem] shadow-xl border border-white/80 flex flex-col justify-between p-6 cursor-grab active:cursor-grabbing relative overflow-hidden"
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Polka Dot Texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

          {/* Top English Word Box */}
          <div className="flex flex-col items-center justify-center flex-grow text-center relative z-10 pt-2">
            <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest bg-indigo-100/80 px-3 py-1 rounded-full mb-4">
              {currentChallenge.wordObj.category}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-3 tracking-tight">
              {currentChallenge.wordObj.word}
            </h2>
            <p className="text-indigo-900/70 italic text-sm font-medium leading-relaxed max-w-xs px-2">
              "{currentChallenge.wordObj.example}"
            </p>
          </div>

          {/* Lower "CALON PASANGAN" Card (Jennii-Style Attachment) */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-purple-100 shadow-md text-center relative z-10 mb-2">
            <span className="text-[11px] font-black text-pink-500 uppercase tracking-widest flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> CALON PASANGAN
            </span>
            <h4 className="text-lg font-bold text-slate-800 leading-snug mb-1">
              {currentChallenge.displayedMeaning}
            </h4>
            <p className="text-xs font-semibold text-slate-400">Cocok atau nggak cocok?</p>
          </div>

        </motion.div>
      </div>

      {/* Swipe / Click Control Buttons at Bottom */}
      <div className="w-full flex items-center justify-between mt-6 px-4">
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-extrabold text-slate-500 mb-1.5">← Nggak Cocok</span>
          <button 
            onClick={() => handleAnswer(false)}
            className="w-16 h-16 bg-white text-rose-500 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all border border-rose-100"
          >
            <X className="w-8 h-8 stroke-[3]" />
          </button>
        </div>

        <span className="text-xs font-bold text-indigo-900/60">swipe atau tap tombol</span>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-extrabold text-slate-500 mb-1.5">Cocok →</span>
          <button 
            onClick={() => handleAnswer(true)}
            className="w-16 h-16 bg-white text-rose-500 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all border border-rose-100"
          >
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
          </button>
        </div>
      </div>

    </div>
  );
}
