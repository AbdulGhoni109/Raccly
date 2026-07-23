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
      description: 'Hafal kosakata dengan kartu flip interaktif 2 sisi',
      icon: <Layers className="w-8 h-8 text-white" />,
      badge: 'Mode Kartu',
      gradient: 'from-[#6366F1] to-[#4F46E5]',
      shadow: 'shadow-indigo-500/25'
    },
    { 
      id: 'swipe', 
      title: 'Swipe Game', 
      description: 'Geser kanan jika sudah tahu, kiri jika belum paham',
      icon: <Hand className="w-8 h-8 text-white" />,
      badge: 'Mode Swipe',
      gradient: 'from-[#F43F5E] to-[#E11D48]',
      shadow: 'shadow-rose-500/25'
    },
    { 
      id: 'quiz', 
      title: 'Multiple Choice Quiz', 
      description: 'Uji pemahaman kosa katamu dengan kuis 4 pilihan jawaban',
      icon: <HelpCircle className="w-8 h-8 text-white" />,
      badge: 'Mode Kuis',
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
      
      {/* Background Watermark & Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#A78BFA] rounded-full opacity-20 blur-[90px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-[#38BDF8] rounded-full opacity-20 blur-[90px]"></div>
        
        {/* Sunburst Pattern */}
        <svg className="absolute -top-10 -right-10 w-80 h-80 opacity-15 text-white stroke-current" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="20" strokeWidth="1" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="50" y1="50" x2={50 + 38 * Math.cos((i * Math.PI) / 6)} y2={50 + 38 * Math.sin((i * Math.PI) / 6)} strokeWidth="0.8" />
          ))}
        </svg>

        {/* Floating sparkles */}
        <div className="absolute top-[15%] left-[10%] text-white/40 text-lg">✨</div>
        <div className="absolute bottom-[20%] right-[12%] text-white/40 text-base">🌸</div>
      </div>

      {/* Header & Navigation (Hidden during active FlashcardMode for 100% clean UI matching reference screenshot) */}
      {(!selectedMode || !selectedCategory || selectedMode !== 'flashcard') && (
        <header className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-3 relative">
          <div className="w-full md:w-auto flex items-center justify-start">
            {!selectedMode ? (
              <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Beranda
              </Link>
            ) : !selectedCategory ? (
              <button 
                onClick={() => setSelectedMode(null)} 
                className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Ganti Mode
              </button>
            ) : (
              <button 
                onClick={() => setSelectedCategory(null)} 
                className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Ganti Kelompok
              </button>
            )}
          </div>

          {/* Title & Breadcrumbs */}
          <div className="text-center">
            {/* Breadcrumb indicator */}
            <div className="text-[10px] md:text-xs font-extrabold text-purple-900/70 mb-0.5 flex items-center justify-center gap-1.5 uppercase tracking-wider flex-wrap">
              <span>Vocabulary</span>
              {selectedMode && (
                <>
                  <span>&gt;</span>
                  <span className="text-indigo-900">{getActiveModeObj()?.title}</span>
                </>
              )}
              {selectedCategory && (
                <>
                  <span>&gt;</span>
                  <span className="text-purple-700">{selectedCategory}</span>
                </>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 drop-shadow-sm">
              {!selectedMode ? (
                <>Vocabulary <span className="text-purple-600">📚</span></>
              ) : !selectedCategory ? (
                <>{getActiveModeObj()?.title}</>
              ) : (
                <>{selectedCategory}</>
              )}
            </h1>
          </div>

          <div className="hidden md:block w-28"></div>
        </header>
      )}

      <main className="max-w-4xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          
          {/* LANGKAH 1 — Pilih Mode */}
          {!selectedMode && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <span className="bg-white/80 text-indigo-900 text-xs font-black px-4 py-1.5 rounded-full border border-white/40 shadow-sm uppercase tracking-wide">
                  Langkah 1 dari 3
                </span>
                <h2 className="text-3xl font-extrabold text-indigo-950 mt-3">Pilih Mode Latihan</h2>
                <p className="text-purple-900/80 text-sm font-semibold mt-1">Pilih metode belajar yang paling kamu sukai hari ini</p>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className="group block w-full outline-none text-left"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-gradient-to-r ${mode.gradient} p-6 rounded-3xl text-white shadow-xl ${mode.shadow} flex items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10`}
                    >
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                      <div className="flex items-center gap-5 relative z-10">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                          {mode.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-extrabold text-white leading-tight">{mode.title}</h3>
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold border border-white/20">
                              {mode.badge}
                            </span>
                          </div>
                          <p className="text-white/85 text-sm font-medium">{mode.description}</p>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20 relative z-10">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* LANGKAH 2 — Pilih Kelompok Kata */}
          {selectedMode && !selectedCategory && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <span className="bg-white/80 text-indigo-900 text-xs font-black px-4 py-1.5 rounded-full border border-white/40 shadow-sm uppercase tracking-wide">
                  Langkah 2 dari 3
                </span>
                <h2 className="text-3xl font-extrabold text-indigo-950 mt-3">Pilih Kelompok Kosakata</h2>
                <p className="text-purple-900/80 text-sm font-semibold mt-1">Pilih kategori materi untuk latihan {getActiveModeObj()?.title}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`bg-gradient-to-r ${cat.gradient} p-6 rounded-3xl text-white shadow-xl ${cat.shadow} flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10 h-full`}
                      >
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                        <div>
                          <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                              {cat.icon}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold border border-white/20">
                                {totalCount} kata
                              </span>
                              <span className="bg-black/20 text-white text-xs px-3 py-1 rounded-full font-bold">
                                {masteredCount}/{totalCount} dikuasai
                              </span>
                            </div>
                          </div>

                          <h3 className="text-xl font-extrabold text-white leading-tight mb-1 relative z-10">
                            {cat.name}
                          </h3>
                          <p className="text-white/85 text-xs font-medium leading-relaxed relative z-10">
                            {cat.description}
                          </p>
                        </div>

                        {/* Progress Bar inside card */}
                        <div className="mt-5 pt-3 border-t border-white/20 relative z-10 flex items-center justify-between">
                          <div className="w-full bg-black/20 rounded-full h-2 mr-3 overflow-hidden">
                            <div 
                              className="bg-white h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20">
                            <ChevronRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* LANGKAH 3 — Masuk ke Mode dengan Kata Terfilter */}
          {selectedMode && selectedCategory && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {selectedMode === 'flashcard' ? (
                <FlashcardMode 
                  vocabList={filteredVocab} 
                  onBack={() => setSelectedCategory(null)} 
                />
              ) : (
                <>
                  <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl mb-8 flex items-center justify-between border border-white/40 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="bg-indigo-600 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                        {getActiveModeObj()?.title}
                      </span>
                      <span className="text-indigo-950 font-bold text-sm">
                        Kategori: <strong className="text-purple-700">{selectedCategory}</strong> ({filteredVocab.length} Kata)
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
                    >
                      Ganti Kelompok
                    </button>
                  </div>

                  <div className="min-h-[450px]">
                    {selectedMode === 'swipe' && <SwipeMode vocabList={filteredVocab} />}
                    {selectedMode === 'quiz' && <QuizMode vocabList={filteredVocab} />}
                  </div>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
