import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RefreshCcw, ArrowRight } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useMascot } from '../../contexts/MascotContext';

export default function GrammarExercise({ topicId, exercises }) {
  const { setMascotMessage } = useMascot();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [grammarScores, setGrammarScores] = useLocalStorage('raccly_grammar_scores', []);
  const [completedTopics, setCompletedTopics] = useLocalStorage('raccly_grammar_completed', {});

  if (!exercises || exercises.length === 0) {
    return <div className="p-6 bg-white/80 rounded-2xl text-center text-slate-500 font-medium">Belum ada latihan untuk topik ini.</div>;
  }

  const currentQ = exercises[currentIndex];

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    if (option === currentQ.answer) {
      setScore(prev => prev + 1);
      setMascotMessage("Bagus banget! Jawabanmu tepat sekali! 🎉");
    } else {
      setMascotMessage(`Ups, kurang tepat! Jawaban yang benar: "${currentQ.answer}". Belajar dari kesalahan ya! 💪`);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setMascotMessage("Lanjut ke soal tata bahasa berikutnya! 🚀");
    } else {
      setIsFinished(true);
      const finalScorePct = Math.round((score / exercises.length) * 100);
      setGrammarScores([...grammarScores, finalScorePct]);
      if (topicId) {
        setCompletedTopics(prev => ({ ...prev, [topicId]: true }));
      }
      setMascotMessage(`Latihan Grammar Selesai! Skor kamu ${score}/${exercises.length}! 🏆`);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setMascotMessage("Pelajari polanya baik-baik ya! 🤓");
  };

  if (isFinished) {
    const finalScorePct = Math.round((score / exercises.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 sm:backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/60 text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
          <Trophy className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-indigo-950 mb-2">Latihan Selesai! 🎉</h3>
        <p className="text-purple-900/80 font-bold text-sm mb-6">Hasil latihan tata bahasa kamu:</p>
        
        <div className="bg-indigo-50/80 p-6 rounded-2xl border border-indigo-100 mb-8">
          <div className="text-5xl font-black text-indigo-950 mb-1">
            {score} <span className="text-xl text-slate-400 font-bold">/ {exercises.length}</span>
          </div>
          <p className="text-indigo-600 font-extrabold text-sm">Nilai Akhir: {finalScorePct}%</p>
        </div>

        <button 
          onClick={resetQuiz}
          className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" /> Ulangi Latihan
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/90 sm:backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white/80">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-extrabold text-indigo-950 bg-indigo-100/80 px-3 py-1.5 rounded-full border border-indigo-200">
          Soal {currentIndex + 1} dari {exercises.length}
        </span>
        <span className="text-xs font-extrabold text-amber-900 bg-amber-400/20 px-3 py-1.5 rounded-full border border-amber-400/30">
          ⭐ Skor: {score}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-8 leading-relaxed">
        {currentQ.question}
      </h3>

      <div className="space-y-3">
        {currentQ.options.map((option, idx) => {
          const isCorrectOption = option === currentQ.answer;
          const isSelectedOption = option === selectedAnswer;
          const hasAnswered = selectedAnswer !== null;

          let optionStyle = "bg-white border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-300";
          let icon = null;

          if (hasAnswered) {
            if (isCorrectOption) {
              optionStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/25 font-bold scale-[1.02]";
              icon = <CheckCircle className="w-6 h-6 text-white flex-shrink-0 ml-3" />;
            } else if (isSelectedOption) {
              optionStyle = "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/25 font-bold scale-[1.02]";
              icon = <XCircle className="w-6 h-6 text-white flex-shrink-0 ml-3" />;
            } else {
              optionStyle = "bg-slate-50 text-slate-400 border-slate-200 opacity-50";
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={!hasAnswered ? { scale: 1.01 } : {}}
              whileTap={!hasAnswered ? { scale: 0.99 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={hasAnswered}
              className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300 font-bold text-sm md:text-base flex items-center justify-between shadow-sm outline-none ${
                hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
              } ${optionStyle}`}
            >
              <span className="flex-1 leading-snug">{option}</span>
              {icon}
            </motion.button>
          );
        })}
      </div>

      {/* Manual Next Question Button */}
      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6"
          >
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl font-black text-base shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIndex < exercises.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
