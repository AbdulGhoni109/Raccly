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

export default function Vocabulary() {
  const { setMascotMessage } = useMascot();
  const [vocabProgress] = useLocalStorage('raccly_vocab_progress', {});

  const [selectedMode, setSelectedMode] = useState(null); // 'flashcard' | 'swipe' | 'quiz' | null
  const [selectedCategory, setSelectedCategory] = useState(null); // string | null

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
      description: 'Hafal kosakata dengan kartu flip interaktif',
      icon: <Layers className="w-5 h-5 text-white" />,
      gradient: 'from-[#6366F1] to-[#4F46E5]',
      shadow: 'shadow-indigo-500/25'
    },
    { 
      id: 'swipe', 
      title: 'Swipe Game', 
      description: 'Geser kanan jika tahu, kiri jika belum',
      icon: <Hand className="w-5 h-5 text-white" />,
      gradient: 'from-[#F43F5E] to-[#E11D48]',
      shadow: 'shadow-rose-500/25'
    },
    { 
      id: 'quiz', 
      title: 'Multiple Choice Quiz', 
      description: 'Uji pemahaman dengan 4 pilihan jawaban',
      icon: <HelpCircle className="w-5 h-5 text-white" />,
      gradient: 'from-[#F59E0B] to-[#D97706]',
      shadow: 'shadow-amber-500/25'
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

  const uniqueCategories = Array.from(new Set(vocabularyData.map(v => v.category)));

  const categories = uniqueCategories.map(catName => {
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

  const getActiveModeObj = () => modes.find(m => m.id === selectedMode);

  // Filtered vocabulary list for Step 3 (memoized to keep reference stable)
  const filteredVocab = React.useMemo(() => {
    return selectedCategory 
      ? vocabularyData.filter(v => v.category === selectedCategory)
      : [];
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">
      
      {/* Background Watermark & Clouds */}
      <BackgroundClouds />

      {/* Header & Navigation — Only shown when NOT in active exercise mode */}
      {(!selectedMode || !selectedCategory) && (
        <header className="max-w-4xl mx-auto mb-4 flex items-center gap-3">
          {!selectedMode ? (
            <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Beranda
            </Link>
          ) : (
            <button 
              onClick={() => setSelectedMode(null)} 
              className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Ganti Mode
            </button>
          )}

          {/* Breadcrumb */}
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
          
          {/* STEP 1 — Pilih Mode */}
          {!selectedMode && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-2.5 max-w-2xl mx-auto"
            >
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className="group block w-full outline-none text-left"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-r ${mode.gradient} px-4 py-3.5 rounded-2xl text-white shadow-lg ${mode.shadow} flex items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10`}
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                        {mode.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{mode.title}</h3>
                        <p className="text-white/80 text-xs font-medium mt-0.5">{mode.description}</p>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20 relative z-10">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                </button>
              ))}
            </motion.div>
          )}

          {/* STEP 2 — Pilih Kelompok */}
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
                  const catWords = vocabularyData.filter(v => v.category === cat.name);
                  const totalCount = catWords.length;
                  const masteredCount = catWords.filter(v => vocabProgress[v.id] === true).length;
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
                        className={`bg-gradient-to-r ${cat.gradient} px-4 py-3.5 rounded-2xl text-white shadow-lg ${cat.shadow} flex items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10`}
                      >
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                        <div className="flex items-center gap-3 relative z-10 min-w-0">
                          <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
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

          {/* STEP 3 — Mode Latihan */}
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
