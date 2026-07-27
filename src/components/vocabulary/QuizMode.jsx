import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RefreshCcw, ArrowRight, HelpCircle, ChevronLeft } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useMascot } from '../../contexts/MascotContext';

export default function QuizMode({ vocabList, onBack }) {
  const { setMascotMessage } = useMascot();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [vocabScores, setVocabScores] = useLocalStorage('raccly_vocab_scores', []);

  const listKey = vocabList ? vocabList.map(v => v.id).join(',') : '';

  useEffect(() => {
    initQuiz();
  }, [listKey]);

  const initQuiz = () => {
    if (!vocabList || vocabList.length < 4) return;

    const shuffledVocab = [...vocabList].sort(() => 0.5 - Math.random());
    const generatedQuestions = shuffledVocab.map((vocab) => {
      const wrongOptions = vocabList
        .filter(v => v.meaning !== vocab.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.meaning);

      const options = [...wrongOptions, vocab.meaning].sort(() => 0.5 - Math.random());

      return {
        word: vocab.word,
        example: vocab.example,
        category: vocab.category,
        correctAnswer: vocab.meaning,
        options
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setMascotMessage("Pilih arti kata yang tepat di bawah ini ya! 💡");
  };

  if (!vocabList || vocabList.length < 4) {
    return (
      <div className="text-center p-8 bg-white/80 sm:backdrop-blur-md rounded-3xl border border-white/40 shadow-sm max-w-md mx-auto">
        <p className="text-indigo-950 font-bold">Perlu minimal 4 kata dalam kelompok ini untuk memulai Kuis Pilihan Ganda.</p>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);

    if (option === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
      setMascotMessage("Hebat banget! Jawabanmu 100% tepat! 🎉");
    } else {
      setMascotMessage(`Ups, kurang tepat! Arti yang benar: "${currentQ.correctAnswer}". Tetap semangat! 💪`);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setMascotMessage("Lanjut ke soal berikutnya! Kamu pasti bisa! 🚀");
    } else {
      setIsFinished(true);
      const finalScorePct = Math.round((score / questions.length) * 100);
      setVocabScores([...vocabScores, finalScorePct]);
      setMascotMessage(`Kuis Selesai! Kamu berhasil meraih skor ${score}/${questions.length}! 🏆`);
    }
  };

  if (isFinished) {
    const finalScorePct = Math.round((score / questions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 sm:backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/60 max-w-md mx-auto text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-indigo-950 mb-2">Kuis Selesai! 🎉</h2>
        <p className="text-purple-900/80 font-bold text-sm mb-6">Hasil evaluasi kuis pilihan ganda kamu:</p>
        
        <div className="bg-indigo-50/80 p-6 rounded-2xl border border-indigo-100 mb-8">
          <div className="text-5xl font-black text-indigo-950 mb-1">
            {score} <span className="text-xl text-slate-400 font-bold">/ {questions.length}</span>
          </div>
          <p className="text-indigo-600 font-extrabold text-sm">Nilai Akhir: {finalScorePct}%</p>
        </div>

        <button 
          onClick={initQuiz}
          className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" />
          Coba Kuis Lagi
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      
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
            {currentQ.category || 'Kuis'}
          </span>
          <span className="text-xs font-black text-purple-700 tracking-tight">
            Soal {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="bg-amber-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm shadow-amber-500/20 flex-shrink-0">
          <span>⭐</span>
          <span>{score}</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-white/70 h-2 rounded-full mb-4 overflow-hidden shadow-inner">
        <motion.div 
          className="bg-indigo-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white/90 sm:backdrop-blur-md px-6 py-5 sm:p-8 rounded-[2.5rem] shadow-xl border border-white/80 text-center mb-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

        <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest bg-indigo-100/80 px-3 py-1 rounded-full mb-3 inline-block">
          Apa arti dari kata ini?
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-2 tracking-tight">
          {currentQ.word}
        </h2>
        {currentQ.example && (
          <p className="text-indigo-900/70 italic text-xs md:text-sm font-medium">
            "{currentQ.example}"
          </p>
        )}
      </div>

      {/* 4 Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          const isCorrectOption = option === currentQ.correctAnswer;
          const isSelectedOption = option === selectedAnswer;
          const hasAnswered = selectedAnswer !== null;

          let optionStyle = "bg-white/80 sm:backdrop-blur-md border-white/80 text-slate-800 hover:bg-white hover:border-indigo-300 hover:scale-[1.01]";
          let icon = null;

          if (hasAnswered) {
            if (isCorrectOption) {
              optionStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/25 font-bold scale-[1.02]";
              icon = <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />;
            } else if (isSelectedOption) {
              optionStyle = "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/25 font-bold scale-[1.02]";
              icon = <XCircle className="w-6 h-6 text-white flex-shrink-0" />;
            } else {
              optionStyle = "bg-white/40 text-slate-400 border-white/20 opacity-50";
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={!hasAnswered ? { scale: 1.01 } : {}}
              whileTap={!hasAnswered ? { scale: 0.99 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={hasAnswered}
              className={`w-full text-left p-3 md:p-4 rounded-2xl border transition-all duration-300 font-bold text-sm md:text-base flex items-center justify-between shadow-sm outline-none ${
                hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
              } ${optionStyle}`}
            >
              <span className="flex-1 pr-3 leading-snug">{option}</span>
              {icon}
            </motion.button>
          );
        })}
      </div>

      {/* Manual "Soal Berikutnya" Button */}
      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-4"
          >
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white rounded-2xl font-black text-base shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
