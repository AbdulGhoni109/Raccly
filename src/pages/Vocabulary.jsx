import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Layers, 
  Hand, 
  HelpCircle, 
  GraduationCap, 
  Heart, 
  Gamepad2, 
  Smartphone, 
  Target, 
  Smile, 
  Sun, 
  Zap,
  Sparkles,
  Clock,
  Utensils,
  Stethoscope,
  CloudRain,
  Compass,
  Shirt,
  MessageSquare,
  BookOpen,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { vocabularyData } from '../data/vocabulary';
import useLocalStorage from '../hooks/useLocalStorage';

import FlashcardMode from '../components/vocabulary/FlashcardMode';
import SwipeMode from '../components/vocabulary/SwipeMode';
import QuizMode from '../components/vocabulary/QuizMode';
import { useMascot } from '../contexts/MascotContext';

import BackgroundClouds from '../components/BackgroundClouds';

const DAILY_TIPS = [
  { tip: "Don't just memorize — use the word in a sentence today!", emoji: "✍️" },
  { tip: "Learning 3 new words a day = 1,000+ words in a year.", emoji: "📈" },
  { tip: "Say the word out loud. Your mouth remembers too!", emoji: "🗣️" },
  { tip: "Try to use a new word when texting a friend today.", emoji: "💬" },
  { tip: "Review yesterday's words before learning new ones.", emoji: "🔁" },
  { tip: "Context helps memory — read the example sentence carefully.", emoji: "📖" },
  { tip: "Mastering 5 categories already? You're ahead of the curve!", emoji: "🏆" },
];

export default function Vocabulary() {
  const { setMascotMessage } = useMascot();
  const [vocabProgress] = useLocalStorage('raccly_vocab_progress', {});

  const [selectedMode, setSelectedMode] = useState(null); // 'flashcard' | 'swipe' | 'quiz' | null
  const [selectedCategory, setSelectedCategory] = useState(null); // string | null

  // Pick a stable daily tip (changes by day, not by render)
  const dailyTip = DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length];

  useEffect(() => {
    if (!selectedMode) {
      setMascotMessage("Pilih mode belajar kosakata favoritmu! 🚀");
    } else if (!selectedCategory) {
      setMascotMessage("Pilih kelompok topik yang mau kamu kuasai hari ini! 📚");
    } else {
      setMascotMessage("Semangat hafalin kata baru! Kamu pasti bisa! 💪");
    }
  }, [selectedMode, selectedCategory, setMascotMessage]);

  const modes = [
    { 
      id: 'flashcard', 
      title: 'Flashcard Mode', 
      description: 'Flip kartu, lihat artinya, tandai yang sudah kamu kuasai',
      tagline: 'Best for building memory',
      icon: (
        <div className="relative w-10 h-8">
          <div className="w-8 h-6 bg-white/30 rounded-md border border-white/40 absolute top-0 left-0 rotate-[-8deg]" />
          <div className="w-8 h-6 bg-white/20 rounded-md border border-white/30 absolute top-0.5 left-0.5 rotate-[-4deg]" />
          <div className="w-8 h-6 bg-white/90 rounded-md flex items-center justify-center absolute top-1 left-1 shadow-sm">
            <span className="text-indigo-600 font-black text-xs">A</span>
          </div>
        </div>
      ),
      badge: '⭐ Recommended',
      badgeBg: 'bg-yellow-400/90 text-yellow-900',
      gradient: 'from-[#6366F1] to-[#4F46E5]',
      shadow: 'shadow-indigo-500/25',
      accent: 'bg-indigo-400/20',
    },
    { 
      id: 'swipe', 
      title: 'Swipe Game', 
      description: 'Geser kanan kalau tahu artinya, kiri kalau belum — cepat & seru!',
      tagline: 'Best for quick review',
      icon: (
        <div className="flex items-center gap-1">
          <span className="text-lg leading-none">👈</span>
          <div className="w-5 h-7 bg-white/80 rounded-md border border-white/40 shadow-sm flex items-center justify-center mx-0.5">
            <span className="text-rose-500 font-black text-[9px]">Aa</span>
          </div>
          <span className="text-lg leading-none">👉</span>
        </div>
      ),
      badge: '🎮 Playful',
      badgeBg: 'bg-white/20 text-white',
      gradient: 'from-[#F43F5E] to-[#E11D48]',
      shadow: 'shadow-rose-500/25',
      accent: 'bg-rose-400/20',
    },
    { 
      id: 'quiz', 
      title: 'Multiple Choice Quiz', 
      description: 'Pilih 1 dari 4 jawaban — uji seberapa dalam kamu memahami kata',
      tagline: 'Best for exam prep',
      icon: (
        <div className="space-y-1 w-10">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full border border-white/60 flex-shrink-0" />
            <div className="h-1.5 bg-white/40 rounded flex-1" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0" />
            <div className="h-1.5 bg-white/80 rounded flex-1" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full border border-white/60 flex-shrink-0" />
            <div className="h-1.5 bg-white/40 rounded flex-1" />
          </div>
        </div>
      ),
      badge: '🎯 Academic',
      badgeBg: 'bg-white/20 text-white',
      gradient: 'from-[#F59E0B] to-[#D97706]',
      shadow: 'shadow-amber-500/25',
      accent: 'bg-amber-400/20',
    },
  ];

  const categoryConfig = {
    'Sekolah & Belajar': {
      description: 'Kegiatan belajar, tugas, dan jadwal di sekolah',
      icon: <GraduationCap className="w-7 h-7 text-white" />,
      gradient: 'from-[#6366F1] to-[#4F46E5]',
      shadow: 'shadow-indigo-500/20'
    },
    'Keluarga & Pertemanan': {
      description: 'Hubungan keluarga, teman, dan kebersamaan',
      icon: <Heart className="w-7 h-7 text-white" />,
      gradient: 'from-[#F43F5E] to-[#E11D48]',
      shadow: 'shadow-rose-500/20'
    },
    'Hobi & Waktu Luang': {
      description: 'Aktivitas santai, musik, olahraga, dan kreasi',
      icon: <Gamepad2 className="w-7 h-7 text-white" />,
      gradient: 'from-[#F59E0B] to-[#D97706]',
      shadow: 'shadow-amber-500/20'
    },
    'Teknologi & Sosial Media': {
      description: 'Gadget, aplikasi, notifikasi, dan dunia digital',
      icon: <Smartphone className="w-7 h-7 text-white" />,
      gradient: 'from-[#06B6D4] to-[#0891B2]',
      shadow: 'shadow-cyan-500/20'
    },
    'Cita-cita & Masa Depan': {
      description: 'Impian, karier, beasiswa, dan tekad sukses',
      icon: <Target className="w-7 h-7 text-white" />,
      gradient: 'from-[#8B5CF6] to-[#7C3AED]',
      shadow: 'shadow-purple-500/20'
    },
    'Emosi & Kepribadian': {
      description: 'Perasaan, sifat positif, dan resiliensi diri',
      icon: <Smile className="w-7 h-7 text-white" />,
      gradient: 'from-[#EC4899] to-[#DB2777]',
      shadow: 'shadow-pink-500/20'
    },
    'Kehidupan Sehari-hari': {
      description: 'Rutinitas, kesehatan, dan aktivitas harian',
      icon: <Sun className="w-7 h-7 text-white" />,
      gradient: 'from-[#10B981] to-[#059669]',
      shadow: 'shadow-emerald-500/20'
    },
    'Kata Kerja Umum': {
      description: 'Kata kerja aktivitas fisik, komunikasi, mental, & rutinitas',
      icon: <Zap className="w-7 h-7 text-white" />,
      gradient: 'from-[#2563EB] to-[#1D4ED8]',
      shadow: 'shadow-blue-500/20'
    },
    'Kata Sifat Umum': {
      description: 'Deskripsi ukuran, kualitas, tekstur, & sifat benda',
      icon: <Sparkles className="w-7 h-7 text-white" />,
      gradient: 'from-[#7C3AED] to-[#6D28D9]',
      shadow: 'shadow-violet-500/20'
    },
    'Waktu, Angka & Tanggal': {
      description: 'Angka, hari, bulan, jam, dan ekspresi waktu',
      icon: <Clock className="w-7 h-7 text-white" />,
      gradient: 'from-[#059669] to-[#047857]',
      shadow: 'shadow-emerald-500/20'
    },
    'Makanan & Minuman': {
      description: 'Makanan pokok, buah, sayur, minuman, & rasa',
      icon: <Utensils className="w-7 h-7 text-white" />,
      gradient: 'from-[#EA580C] to-[#C2410C]',
      shadow: 'shadow-orange-500/20'
    },
    'Tubuh & Kesehatan': {
      description: 'Bagian tubuh, kesehatan, obat, & perawatan',
      icon: <Stethoscope className="w-7 h-7 text-white" />,
      gradient: 'from-[#0284C7] to-[#0369A1]',
      shadow: 'shadow-sky-500/20'
    },
    'Alam & Cuaca': {
      description: 'Elemen alam, cuaca, hewan, & tumbuhan',
      icon: <CloudRain className="w-7 h-7 text-white" />,
      gradient: 'from-[#0D9488] to-[#0F766E]',
      shadow: 'shadow-teal-500/20'
    },
    'Tempat & Arah': {
      description: 'Tempat umum, posisi, preposisi, & arah navigasi',
      icon: <Compass className="w-7 h-7 text-white" />,
      gradient: 'from-[#4F46E5] to-[#3730A3]',
      shadow: 'shadow-indigo-500/20'
    },
    'Pakaian & Penampilan': {
      description: 'Pakaian, aksesoris, warna, & penampilan fisik',
      icon: <Shirt className="w-7 h-7 text-white" />,
      gradient: 'from-[#DB2777] to-[#BE185D]',
      shadow: 'shadow-pink-500/20'
    },
    'Ungkapan Sehari-hari': {
      description: 'Sapaan, percakapan kelas, pendapat, & frasa harian',
      icon: <MessageSquare className="w-7 h-7 text-white" />,
      gradient: 'from-[#E11D48] to-[#9F1239]',
      shadow: 'shadow-rose-500/20'
    }
  };

  const categoryStats = React.useMemo(() => {
    const stats = {};
    for (let i = 0; i < vocabularyData.length; i++) {
      const v = vocabularyData[i];
      if (!stats[v.category]) {
        stats[v.category] = { total: 0, mastered: 0 };
      }
      stats[v.category].total += 1;
      if (vocabProgress[v.id]) {
        stats[v.category].mastered += 1;
      }
    }
    return stats;
  }, [vocabProgress]);

  const categories = React.useMemo(() => {
    const uniqueCatNames = Object.keys(categoryStats);
    return uniqueCatNames.map(catName => {
      const config = categoryConfig[catName] || {
        description: 'Koleksi kosakata bahasa Inggris',
        icon: <BookOpen className="w-7 h-7 text-white" />,
        gradient: 'from-[#6366F1] to-[#4F46E5]',
        shadow: 'shadow-indigo-500/20'
      };
      return {
        name: catName,
        ...config
      };
    });
  }, [categoryStats]);

  const getActiveModeObj = () => modes.find(m => m.id === selectedMode);

  const filteredVocab = React.useMemo(() => {
    return selectedCategory 
      ? vocabularyData.filter(v => v.category === selectedCategory)
      : [];
  }, [selectedCategory]);

  const totalWords = vocabularyData.length;
  const masteredWords = React.useMemo(
    () => Object.values(vocabProgress).filter(Boolean).length,
    [vocabProgress]
  );
  const masteredPct = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;

  const progressLabel = masteredPct === 0
    ? "Mulai perjalananmu hari ini! 🚀"
    : masteredPct < 25
    ? "Awal yang bagus, terus semangat! 💪"
    : masteredPct < 50
    ? "Sedikit lagi sampai setengahnya! 🔥"
    : masteredPct < 75
    ? "Lebih dari separuh — luar biasa! ⭐"
    : masteredPct < 100
    ? "Hampir selesai, kamu keren banget! 🏆"
    : "Semua kata dikuasai! Legend! 🎉";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">
      
      <BackgroundClouds />

      {(!selectedMode || !selectedCategory) && (
        <header className="max-w-4xl mx-auto mb-4 flex items-center gap-3">
          {!selectedMode ? (
            <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 sm:backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Beranda
            </Link>
          ) : (
            <button 
              onClick={() => setSelectedMode(null)} 
              className="inline-flex items-center text-indigo-900 font-bold bg-white/80 sm:backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Ganti Mode
            </button>
          )}

          <div className="text-[10px] font-extrabold text-purple-900/50 flex items-center gap-1 uppercase tracking-wider min-w-0 overflow-hidden">
            <span className="truncate">Vocab</span>
            {selectedMode && (
              <>
                <span className="flex-shrink-0">&gt;</span>
                <span className="text-indigo-800 truncate">{getActiveModeObj()?.title}</span>
              </>
            )}
          </div>
        </header>
      )}

      <main className="max-w-4xl mx-auto pb-8">
        <AnimatePresence mode="wait">
          
          {!selectedMode && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black text-indigo-950 leading-tight">
                      📚 Vocabulary
                    </h1>
                    <p className="text-purple-800/80 font-semibold text-sm mt-0.5">
                      {vocabularyData.length}+ Words · 3 Learning Modes · {Object.keys(categoryConfig).length} Categories
                    </p>
                  </div>
                  <div className="flex-shrink-0 bg-white/70 sm:backdrop-blur-md rounded-2xl px-3 py-2 border border-white/60 shadow-sm text-center min-w-[72px]">
                    <div className="text-xl font-black text-indigo-700 leading-none">{masteredWords}</div>
                    <div className="text-[10px] text-indigo-500 font-bold mt-0.5">dikuasai</div>
                  </div>
                </div>

                <div className="mt-3 bg-white/40 rounded-2xl p-3 border border-white/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-indigo-900/70">{progressLabel}</span>
                    <span className="text-xs font-black text-indigo-700">{masteredPct}%</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${masteredPct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-indigo-700/60 font-medium">0</span>
                    <span className="text-[10px] text-indigo-700/60 font-medium">{masteredWords} / {totalWords}</span>
                    <span className="text-[10px] text-indigo-700/60 font-medium">{totalWords}</span>
                  </div>
                </div>
              </motion.div>

              <p className="text-xs font-extrabold text-purple-900/50 uppercase tracking-widest mb-2.5 px-0.5">
                Choose your learning style today
              </p>

              <div className="space-y-2.5">
                {modes.map((mode, idx) => (
                  <motion.button
                    key={mode.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.07 }}
                    onClick={() => setSelectedMode(mode.id)}
                    className="group block w-full outline-none text-left"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-gradient-to-r ${mode.gradient} px-4 py-4 rounded-2xl text-white shadow-md sm:shadow-lg ${mode.shadow} flex items-center gap-4 cursor-pointer relative overflow-hidden transition-shadow duration-300 border border-white/10`}
                    >
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                      <div className={`${mode.accent} p-3 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:scale-110 transition-transform duration-200 min-w-[56px] min-h-[56px]`}>
                        {mode.icon}
                      </div>

                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="text-base font-black text-white leading-tight">{mode.title}</h3>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${mode.badgeBg} border border-white/20`}>
                            {mode.badge}
                          </span>
                        </div>
                        <p className="text-white/80 text-xs font-medium leading-snug">{mode.description}</p>
                        <p className="text-white/50 text-[10px] font-bold mt-1 uppercase tracking-wide">{mode.tagline}</p>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20 relative z-10">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-5 bg-white/50 border border-white/70 rounded-2xl p-4 flex items-start gap-3 shadow-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-base">🦝</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold text-purple-700/60 uppercase tracking-widest mb-0.5">Tip of the Day</p>
                  <p className="text-indigo-950 font-semibold text-sm leading-snug">
                    <span className="mr-1">{dailyTip.emoji}</span>
                    {dailyTip.tip}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {selectedMode && !selectedCategory && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const stat = categoryStats[cat.name] || { total: 0, mastered: 0 };
                  const totalCount = stat.total;
                  const masteredCount = stat.mastered;
                  const progressPct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="group block w-full outline-none text-left"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`bg-gradient-to-r ${cat.gradient} px-4 py-3.5 rounded-2xl text-white shadow-md sm:shadow-lg ${cat.shadow} flex items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10`}
                      >
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                        <div className="flex items-center gap-3 relative z-10 min-w-0">
                          <div className="bg-white/20 sm:backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                            {React.cloneElement(cat.icon, { className: 'w-5 h-5 text-white' })}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-white leading-tight truncate">{cat.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <div className="w-16 bg-black/20 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-white h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                              </div>
                              <span className="text-white/70 text-[10px] font-bold">{masteredCount}/{totalCount}</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20 relative z-10">
                          <ChevronRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

          )}

          {selectedMode && selectedCategory && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {selectedMode === 'flashcard' && (
                <FlashcardMode 
                  vocabList={filteredVocab} 
                  onBack={() => setSelectedCategory(null)} 
                />
              )}
              {selectedMode === 'swipe' && (
                <SwipeMode 
                  vocabList={filteredVocab} 
                  onBack={() => setSelectedCategory(null)} 
                />
              )}
              {selectedMode === 'quiz' && (
                <QuizMode 
                  vocabList={filteredVocab} 
                  onBack={() => setSelectedCategory(null)} 
                />
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
