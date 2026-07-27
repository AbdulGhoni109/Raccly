import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, CheckCircle2, Info, List, Sparkles, AlignLeft, AlignJustify } from 'lucide-react';
import { grammarData } from '../data/grammar';
import GrammarExplanationFormatter from '../components/grammar/GrammarExplanationFormatter';
import GrammarExercise from '../components/grammar/GrammarExercise';
import { useMascot } from '../contexts/MascotContext';

import BackgroundClouds from '../components/BackgroundClouds';

export default function GrammarDetail() {
  const { setMascotMessage } = useMascot();
  const [viewMode, setViewMode] = useState('lengkap'); // 'ringkas' | 'lengkap'

  useEffect(() => {
    setMascotMessage("Pelajari polanya baik-baik ya!");
  }, [setMascotMessage]);

  const { id } = useParams();
  const topic = grammarData.find(t => t.id === id);

  if (!topic) {
    return <Navigate to="/grammar" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">
      
      {/* Background Watermark & Clouds */}
      <BackgroundClouds />

      <header className="max-w-4xl mx-auto mb-4 md:mb-6 flex flex-col md:flex-row items-center justify-between gap-3 relative">
        <div className="w-full md:w-auto flex items-center justify-start">
          <Link to="/grammar" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 sm:backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Daftar Topik
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-black text-indigo-950 drop-shadow-sm">
            {topic.title}
          </h1>
        </div>
        <div className="hidden md:block w-28"></div>
      </header>

      {/* View Mode Toggle */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center">
        <div className="bg-white/80 sm:backdrop-blur-md rounded-2xl p-1 flex items-center gap-1 border border-white/60 shadow-sm">
          <button
            onClick={() => setViewMode('ringkas')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              viewMode === 'ringkas'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/60'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            Ringkas
          </button>
          <button
            onClick={() => setViewMode('lengkap')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              viewMode === 'lengkap'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/60'
            }`}
          >
            <AlignJustify className="w-3.5 h-3.5" />
            Lengkap
          </button>
        </div>

        {/* Mode hint */}
        <div className="ml-3 flex items-center">
          <span className="text-xs font-semibold text-indigo-900/60">
            {viewMode === 'ringkas' ? '📖 Tampilan ringkasan cepat' : '📚 Semua detail ditampilkan'}
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Redesigned Grammar Explanation Cards */}
          <GrammarExplanationFormatter explanation={topic.explanation} mode={viewMode} />

          {/* Contoh Kalimat Ringkasan */}
          {topic.examples && topic.examples.length > 0 && (
            <div className="bg-white/90 sm:backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-900/5 border border-white/80 mb-12">
              <h2 className="flex items-center text-xl font-black text-indigo-950 mb-6">
                <div className="p-2.5 bg-purple-600 text-white rounded-2xl mr-3 shadow-md">
                  <List className="w-5 h-5" />
                </div>
                Kumpulan Contoh Kalimat Praktis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {topic.examples.map((example, idx) => (
                  <div key={idx} className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100/90 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-indigo-600 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span>Contoh #{idx + 1}</span>
                    </div>
                    <span className="text-indigo-950 text-xs sm:text-sm font-bold leading-relaxed font-sans">
                      "{example}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 flex items-center justify-center">
            <div className="h-0.5 bg-white/40 flex-grow"></div>
            <h2 className="px-6 flex items-center text-2xl font-black text-indigo-950 drop-shadow-sm">
              <PenTool className="w-6 h-6 mr-3 text-purple-600" /> Latihan
            </h2>
            <div className="h-0.5 bg-white/40 flex-grow"></div>
          </div>

          <GrammarExercise exercises={topic.exercises} />
        </motion.div>
      </main>
    </div>
  );
}

