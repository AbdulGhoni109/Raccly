import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { grammarData } from '../data/grammar';
import { useMascot } from '../contexts/MascotContext';

import BackgroundClouds from '../components/BackgroundClouds';

export default function GrammarList() {
  const { setMascotMessage } = useMascot();

  useEffect(() => {
    setMascotMessage("Grammar emang kadang bikin pusing, tapi kamu pasti bisa!");
  }, [setMascotMessage]);

  const cardGradients = [
    { bg: 'from-[#6366F1] to-[#4F46E5]', shadow: 'shadow-indigo-500/25' },
    { bg: 'from-[#06B6D4] to-[#0891B2]', shadow: 'shadow-cyan-500/25' },
    { bg: 'from-[#F43F5E] to-[#E11D48]', shadow: 'shadow-rose-500/25' },
    { bg: 'from-[#8B5CF6] to-[#7C3AED]', shadow: 'shadow-purple-500/25' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">
      
      {/* Background Watermark & Clouds */}
      <BackgroundClouds />

      <header className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-3 relative">
        <div className="w-full md:w-auto flex items-center justify-start">
          <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Beranda
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-black text-indigo-950 drop-shadow-sm">
            Grammar Topics <span className="text-purple-600">📝</span>
          </h1>
          <p className="text-purple-900/80 text-xs md:text-sm font-semibold mt-0.5">Pilih topik tata bahasa yang ingin kamu pelajari</p>
        </div>
        <div className="hidden md:block w-28"></div>
      </header>

      <main className="max-w-3xl mx-auto pb-32">
        <div className="space-y-4">
          {grammarData.map((topic, index) => {
            const style = cardGradients[index % cardGradients.length];
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/grammar/${topic.id}`} className="group block outline-none">
                  <div className={`bg-gradient-to-r ${style.bg} p-6 rounded-3xl text-white shadow-xl ${style.shadow} flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden border border-white/10`}>
                    
                    {/* Polka Dot Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                    <div className="flex items-center gap-5 relative z-10 pr-4">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold text-white leading-tight">{topic.title}</h3>
                          <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold border border-white/20">
                            {topic.exercises.length} latihan
                          </span>
                        </div>
                        <p className="text-white/85 text-sm font-medium line-clamp-2 max-w-lg">
                          {topic.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20 relative z-10">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
