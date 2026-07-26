import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Check, Sparkles } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';

const categoryIconMap = {
  'Sekolah & Belajar': '🎓',
  'Keluarga & Pertemanan': '💖',
  'Hobi & Waktu Luang': '🎮',
  'Teknologi & Sosial Media': '📱',
  'Cita-cita & Masa Depan': '🎯',
  'Emosi & Kepribadian': '😊',
  'Kehidupan Sehari-hari': '☀️',
  'Kata Kerja Umum': '⚡',
  'Kata Sifat Umum': '✨',
  'Waktu, Angka & Tanggal': '⏰',
  'Makanan & Minuman': '🍔',
  'Tubuh & Kesehatan': '🩺',
  'Alam & Cuaca': '🐾',
  'Tempat & Arah': '🧭',
  'Pakaian & Penampilan': '👕',
  'Ungkapan Sehari-hari': '💬'
};

export default function FlashcardMode({ vocabList, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabProgress, setVocabProgress] = useLocalStorage('raccly_vocab_progress', {});

  if (!vocabList || vocabList.length === 0) {
    return <div className="text-center p-10 text-slate-600 font-semibold">Tidak ada data kosakata.</div>;
  }

  const currentVocab = vocabList[currentIndex];
  const categoryName = currentVocab?.category || '';
  const categoryEmoji = categoryIconMap[categoryName] || '🐾';
  const isCurrentMastered = !!vocabProgress[currentVocab?.id];

  const totalCount = vocabList.length;
  const masteredCount = vocabList.filter(v => !!vocabProgress[v.id]).length;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % totalCount);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount);
  };

  const toggleMastered = (vocabId) => {
    setVocabProgress((prev) => ({
      ...prev,
      [vocabId]: !prev[vocabId]
    }));
  };

  const handleDotClick = (index) => {
    setIsFlipped(false);
    setCurrentIndex(index);
  };

  // Calculate window of pagination dots for large lists (max 9 dots visible)
  const maxVisibleDots = 9;
  let dotStart = 0;
  let dotEnd = totalCount;

  if (totalCount > maxVisibleDots) {
    dotStart = Math.max(0, currentIndex - Math.floor(maxVisibleDots / 2));
    dotEnd = dotStart + maxVisibleDots;
    if (dotEnd > totalCount) {
      dotEnd = totalCount;
      dotStart = Math.max(0, dotEnd - maxVisibleDots);
    }
  }

  const visibleDots = Array.from({ length: dotEnd - dotStart }, (_, i) => dotStart + i);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto min-h-screen pb-6 relative z-10 select-none">
      
      {/* 1. Top Navigation & Header Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-2 px-1">
        {/* Back button */}
        <button
          onClick={onBack}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-md shadow-indigo-900/5 hover:bg-slate-50 transition-all border border-white/90 active:scale-95 flex-shrink-0"
          title="Kembali ke Kelompok"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700 stroke-[2.5]" />
        </button>

        {/* Category Emoji & Title + Counter */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-600">
            <span className="text-base">{categoryEmoji}</span>
            <span className="truncate max-w-[160px] sm:max-w-[220px]">{categoryName}</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight mt-0.5">
            {currentIndex + 1}/{totalCount}
          </div>
        </div>

        {/* Green Mastered Count Badge */}
        <div className="bg-[#22C55E] text-white font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm shadow-emerald-500/20 flex-shrink-0">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>{masteredCount}/{totalCount}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/70 h-2 rounded-full overflow-hidden shadow-inner mb-3">
        <div
          className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
        />
      </div>

      {/* 2. Flashcard Card Area */}
      <div
        className="w-full max-w-[320px] sm:max-w-[380px] h-[300px] sm:h-[380px] cursor-pointer relative group mx-auto"
        style={{ perspective: '1200px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 20 }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute w-full h-full bg-gradient-to-b from-[#FFFDF2] via-[#FFF9D6] to-[#FFF5C0] rounded-[32px] sm:rounded-[36px] shadow-md sm:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.22),0_10px_25px_-5px_rgba(249,115,22,0.12)] border border-amber-200/60 p-3 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Dashed Frame */}
            <div className="w-full h-full border-2 border-dashed border-[#FCD34D]/80 rounded-[24px] sm:rounded-[28px] p-6 flex flex-col items-center justify-between text-center">
              
              {/* Top Decorative Paw / Icon */}
              <div className="text-3xl sm:text-4xl opacity-80 pt-2 group-hover:scale-110 transition-transform">
                🐾
              </div>

              {/* Main Word & Pronunciation */}
              <div className="flex flex-col items-center justify-center my-auto px-2">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                  {currentVocab.word}
                </h2>
                {currentVocab.phonetic ? (
                  <span className="text-sm sm:text-base font-bold text-orange-500 mt-2">
                    {currentVocab.phonetic}
                  </span>
                ) : (
                  <span className="mt-2 h-5" />
                )}
              </div>

              {/* Bottom Hint */}
              <div className="text-amber-500 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 opacity-85 group-hover:opacity-100 transition-opacity pb-1">
                <span className="text-base">👆</span>
                <span>Tap untuk lihat arti</span>
              </div>

            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute w-full h-full bg-gradient-to-b from-[#FFFDF2] via-[#FFF9D6] to-[#FFF5C0] rounded-[32px] sm:rounded-[36px] shadow-md sm:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.22),0_10px_25px_-5px_rgba(249,115,22,0.12)] border border-amber-200/60 p-3 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Dashed Frame */}
            <div className="w-full h-full border-2 border-dashed border-[#FCD34D]/80 rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col justify-between text-center gap-3">

              {/* TOP: English word chip */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200/60">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="font-black">{currentVocab.word}</span>
                </div>
              </div>

              {/* MIDDLE: label pill + meaning ONLY — no example here */}
              <div className="flex flex-col items-center justify-center flex-1 gap-2 px-1">
                <span className="inline-block bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.18em] px-3 py-0.5 rounded-full shadow-sm">
                  Arti Bahasa Indonesia
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  {currentVocab.meaning}
                </h2>
              </div>

              {/* Bottom tap hint */}
              <p className="text-amber-400/70 text-[10px] font-bold">Tap untuk kembali</p>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ── BELOW CARD SECTION ── */}
      <div className="w-full max-w-[320px] sm:max-w-[380px] mx-auto mt-3 flex flex-col gap-3">

        {/* Contoh Kalimat — always visible below card */}
        {currentVocab.example && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/70 shadow-md px-4 py-3">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contoh kalimat</span>
            <p className="text-slate-600 text-xs font-medium italic leading-relaxed">
              "{currentVocab.example}"
            </p>
          </div>
        )}

        {/* Tandai Sudah Hafal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMastered(currentVocab.id);
          }}
          className={`w-full py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 border shadow-md active:scale-95 ${
            isCurrentMastered
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20 hover:bg-emerald-600'
              : 'bg-white/90 backdrop-blur-md text-slate-700 border-white hover:bg-white shadow-indigo-950/5'
          }`}
        >
          <span
            className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
              isCurrentMastered
                ? 'bg-white text-emerald-600 font-black'
                : 'bg-slate-200 border border-slate-300'
            }`}
          >
            {isCurrentMastered && <Check className="w-3 h-3 stroke-[3]" />}
          </span>
          <span>{isCurrentMastered ? 'Sudah Hafal ✓' : 'Tandai Sudah Hafal'}</span>
        </button>

      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4 max-w-full px-4 overflow-x-auto py-1">
        {dotStart > 0 && <span className="text-slate-400 text-xs font-bold px-1">...</span>}
        {visibleDots.map((idx) => {
          const isActive = idx === currentIndex;
          const isMastered = !!vocabProgress[vocabList[idx]?.id];

          return (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              title={`Kartu ${idx + 1}`}
              className={`transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'w-7 h-2.5 bg-[#E11D48] rounded-full shadow-xs'
                  : isMastered
                  ? 'w-2.5 h-2.5 bg-emerald-400 rounded-full hover:scale-125'
                  : 'w-2.5 h-2.5 bg-pink-200/90 rounded-full hover:bg-pink-300 hover:scale-125'
              }`}
            />
          );
        })}
        {dotEnd < totalCount && <span className="text-slate-400 text-xs font-bold px-1">...</span>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 w-full max-w-xs sm:max-w-sm mx-auto relative z-30">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-100 shadow-md shadow-indigo-950/5 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4 text-slate-700 stroke-[2.5]" />
          <span>Sebelumnya</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#FF9800] via-[#FF7043] to-[#FF5722] hover:brightness-105 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>Berikutnya</span>
          <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}
