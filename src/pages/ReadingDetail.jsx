import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, Lightbulb } from 'lucide-react';
import { storiesData } from '../data/stories';
import { vocabularyData } from '../data/vocabulary';
import ReadingQuiz from '../components/reading/ReadingQuiz';
import { useMascot } from '../contexts/MascotContext';

import BackgroundClouds from '../components/BackgroundClouds';

export default function ReadingDetail() {
  const { setMascotMessage } = useMascot();

  useEffect(() => {
    setMascotMessage("Perhatikan kata yang digarisbawahi ya! 🤓");
  }, [setMascotMessage]);

  const { id } = useParams();
  const story = storiesData.find(s => s.id === id);
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (!story) {
    return <Navigate to="/reading" replace />;
  }

  // Parse content to highlight words
  const renderContent = (text, highlightedWords) => {
    const words = text.split(' ');
    return words.map((wordObj, i) => {
      const cleanWord = wordObj.replace(/[.,!?'";:]/g, '').toLowerCase();
      
      if (highlightedWords.includes(cleanWord)) {
        return (
          <span key={i} className="relative inline-block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTooltip(activeTooltip === cleanWord ? null : cleanWord);
              }}
              className="text-indigo-700 font-bold underline decoration-amber-400 decoration-4 underline-offset-4 hover:text-indigo-900 transition-colors bg-amber-300/30 rounded px-1.5 py-0.5"
            >
              {wordObj}
            </button>
            <AnimatePresence>
              {activeTooltip === cleanWord && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3.5 bg-indigo-950 text-white text-sm rounded-2xl shadow-xl z-20 border border-indigo-700"
                >
                  <div className="font-extrabold text-amber-300 mb-1 flex items-center justify-between">
                    <span>{cleanWord}</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white">Arti</span>
                  </div>
                  <div className="text-indigo-100 text-xs font-medium leading-snug">
                    {vocabularyData.find(v => v.word.toLowerCase() === cleanWord)?.meaning || 'Arti kata ini.'}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-950"></div>
                </motion.div>
              )}
            </AnimatePresence>
            {' '}
          </span>
        );
      }
      return <span key={i}>{wordObj} </span>;
    });
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden"
      onClick={() => setActiveTooltip(null)}
    >
      {/* Background Watermark & Clouds */}
      <BackgroundClouds />

      <header className="max-w-3xl mx-auto mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-3 relative">
        <div className="w-full md:w-auto flex items-center justify-start">
          <Link to="/reading" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Daftar Cerita
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-black text-indigo-950 drop-shadow-sm">
            {story.title}
          </h1>
        </div>
        <div className="hidden md:block w-28"></div>
      </header>

      <main className="max-w-3xl mx-auto pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl shadow-purple-900/5 border border-white/60 mb-8 leading-relaxed text-lg text-slate-800 font-medium">
            <p>
              {renderContent(story.content, story.highlightedWords)}
            </p>
          </div>

          {/* Moral Quote Card */}
          <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-amber-500/25 mb-12 flex items-start relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-white mr-5 flex-shrink-0 relative z-10">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xs font-black text-amber-100 uppercase tracking-wider mb-1">Pesan Moral / Quote</h3>
              <p className="text-xl md:text-2xl font-bold italic">"{story.quote}"</p>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="h-0.5 bg-white/40 flex-grow"></div>
            <h2 className="px-6 flex items-center text-2xl font-black text-indigo-950 drop-shadow-sm">
              <PenTool className="w-6 h-6 mr-3 text-purple-600" /> Uji Pemahaman
            </h2>
            <div className="h-0.5 bg-white/40 flex-grow"></div>
          </div>

          <ReadingQuiz questions={story.comprehensionQuestions} storyId={story.id} />
        </motion.div>
      </main>
    </div>
  );
}
