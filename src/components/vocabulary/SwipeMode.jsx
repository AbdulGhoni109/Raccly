import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, RefreshCcw, Sparkles, AlertCircle, CheckCircle2, ArrowRight, ChevronLeft } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useMascot } from '../../contexts/MascotContext';

export default function SwipeMode({ vocabList, onBack }) {
  const { setMascotMessage } = useMascot();
  const [vocabProgress, setVocabProgress] = useLocalStorage('raccly_vocab_progress', {});

  const [challenges, setChallenges] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect, realMeaning, isMatch } | null
  const [isFinished, setIsFinished] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const listKey = vocabList ? vocabList.map(v => v.id).join(',') : '';

  useEffect(() => {
    initGame();
  }, [listKey]);

  const initGame = () => {
    if (!vocabList || vocabList.length === 0) return;

    const shuffled = [...vocabList].sort(() => Math.random() - 0.5);

    const generated = shuffled.map((wordObj) => {
      const isMatch = Math.random() < 0.5;
      let displayedMeaning = wordObj.meaning;
      if (!isMatch && vocabList.length > 1) {
        const otherWords = vocabList.filter(w => w.id !== wordObj.id);
        const randomOther = otherWords[Math.floor(Math.random() * otherWords.length)];
        displayedMeaning = randomOther.meaning;
      }
      return { wordObj, displayedMeaning, isMatch };
    });

    setChallenges(generated);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    x.set(0);
  };

  const handleAnswer = (userSaysMatch) => {
    if (feedback !== null || isFinished || challenges.length === 0) return;

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
      isMatch: current.isMatch,
      newScore,
    });
  };

  const handleNext = () => {
    const savedNewScore = feedback?.newScore ?? score;
    setFeedback(null);
    x.set(0);
    if (currentIndex + 1 < challenges.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setMascotMessage(`Luar biasa! Kamu menyelesaikan sesi dengan skor ${savedNewScore}/${challenges.length}! 🏆`);
    }
  };

  const handleDragEnd = (event, info) => {
    if (feedback !== null) return;
    const swipeThreshold = 80;
    if (info.offset.x > swipeThreshold) {
      handleAnswer(true);
    } else if (info.offset.x < -swipeThreshold) {
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

  const isAnswering = feedback !== null;
  const categoryName = currentChallenge.wordObj.category || 'Kosakata';

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-2 px-1">
        <button
          onClick={onBack}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-md shadow-indigo-900/5 hover:bg-slate-50 transition-all border border-white/90 active:scale-95 flex-shrink-0"
          title="Ganti Kelompok"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700 stroke-[2.5]" />
        </button>

        <div className="flex flex-col items-center text-center min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-slate-700 truncate max-w-[160px] sm:max-w-[220px]">
            {categoryName}
          </span>
          <span className="text-xs font-black text-purple-700 tracking-tight">
            {currentIndex + 1} / {challenges.length}
          </span>
        </div>

        <div className="bg-[#22C55E] text-white font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm shadow-emerald-500/20 flex-shrink-0">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/70 h-2 rounded-full overflow-hidden shadow-inner mb-3">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / challenges.length) * 100}%` }}
        />
      </div>

      {/* Card Container */}
      <div className="relative w-full h-[22rem] sm:h-[25rem] flex justify-center">
        
        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`absolute inset-0 z-30 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md ${
                feedback.isCorrect ? 'bg-emerald-600/95 text-white' : 'bg-rose-600/95 text-white'
              }`}
            >
              <div className="p-3 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-14 h-14 text-white" />
                ) : (
                  <AlertCircle className="w-14 h-14 text-white" />
                )}
              </div>
              <h3 className="text-2xl font-black mb-2">
                {feedback.isCorrect ? 'BENAR! 🎉' : 'KURANG TEPAT! 😅'}
              </h3>
              <p className="text-white/90 font-semibold text-sm max-w-xs leading-relaxed mb-5">
                {feedback.isCorrect 
                  ? (feedback.isMatch ? 'Arti tersebut memang COCOK!' : 'Arti tersebut memang TIDAK COCOK!')
                  : (
                    <>
                      <span className="block text-white/70 text-xs mb-1">Arti yang benar untuk kata ini:</span>
                      <span className="text-white font-black text-base">"{feedback.realMeaning}"</span>
                    </>
                  )
                }
              </p>

              {/* Manual Advance Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onClick={handleNext}
                className="flex items-center gap-2 bg-white/25 hover:bg-white/35 active:scale-95 transition-all px-6 py-3 rounded-2xl font-extrabold text-sm border border-white/30 shadow-lg"
              >
                {currentIndex + 1 < challenges.length ? (
                  <>
                    <span>Kata Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Lihat Hasil</span>
                    <Trophy className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Swipable Card */}
        <motion.div
          className="w-full h-full bg-gradient-to-b from-white to-indigo-50/60 rounded-[2.5rem] shadow-xl border border-white/80 flex flex-col justify-between p-5 sm:p-6 cursor-grab active:cursor-grabbing relative overflow-hidden"
          style={{ x, rotate, opacity }}
          drag={isAnswering ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Polka Dot Texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

          {/* Top English Word Box */}
          <div className="flex flex-col items-center justify-center flex-grow text-center relative z-10 pt-1">
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-2 tracking-tight">
              {currentChallenge.wordObj.word}
            </h2>
            <p className="text-indigo-900/70 italic text-xs sm:text-sm font-medium leading-relaxed max-w-xs px-2">
              "{currentChallenge.wordObj.example}"
            </p>
          </div>

          {/* Lower Displayed Meaning Box */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-indigo-100 shadow-md text-center relative z-10">
            <div className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3 text-indigo-200" />
              <span>Apakah artinya ini?</span>
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug my-1">
              {currentChallenge.displayedMeaning}
            </h4>
          </div>

        </motion.div>
      </div>

      {/* Swipe / Click Control Buttons */}
      <div className="w-full flex items-center justify-between mt-4 px-4">
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-black text-rose-500 mb-1">← Tidak Cocok</span>
          <button 
            onClick={() => handleAnswer(false)}
            disabled={isAnswering}
            className={`w-14 h-14 bg-rose-500 text-white rounded-full shadow-lg shadow-rose-500/25 flex items-center justify-center transition-all border border-rose-600 ${
              isAnswering ? 'opacity-30 cursor-not-allowed' : 'hover:bg-rose-600 hover:scale-110 active:scale-95'
            }`}
            title="Tidak cocok"
          >
            <X className="w-7 h-7 stroke-[3]" />
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-400">geser atau tap</span>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-black text-emerald-600 mb-1">Cocok →</span>
          <button 
            onClick={() => handleAnswer(true)}
            disabled={isAnswering}
            className={`w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/25 flex items-center justify-center transition-all border border-emerald-600 ${
              isAnswering ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-600 hover:scale-110 active:scale-95'
            }`}
            title="Cocok"
          >
            <Check className="w-7 h-7 stroke-[3]" />
          </button>
        </div>
      </div>

    </div>
  );
}
