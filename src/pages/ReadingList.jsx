import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { storiesData } from '../data/stories';
import useLocalStorage from '../hooks/useLocalStorage';
import { useMascot } from '../contexts/MascotContext';

import BackgroundClouds from '../components/BackgroundClouds';

export default function ReadingList() {
  const { setMascotMessage } = useMascot();

  useEffect(() => {
    setMascotMessage("Yuk baca cerita seru sambil belajar~");
  }, [setMascotMessage]);

  const [readStories] = useLocalStorage('raccly_read_stories', {});

  const cardGradients = [
    { bg: 'from-[#F59E0B] to-[#D97706]', shadow: 'shadow-amber-500/25' },
    { bg: 'from-[#8B5CF6] to-[#7C3AED]', shadow: 'shadow-purple-500/25' },
    { bg: 'from-[#06B6D4] to-[#0891B2]', shadow: 'shadow-cyan-500/25' },
    { bg: 'from-[#F43F5E] to-[#E11D48]', shadow: 'shadow-rose-500/25' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">
      
      {/* Background Watermark & Clouds */}
      <BackgroundClouds />

      {/* Header */}
      <header className="max-w-3xl mx-auto mb-4 flex items-center gap-3">
        <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Beranda
        </Link>

        {/* Breadcrumb */}
        <div className="text-[10px] font-extrabold text-purple-900/50 flex items-center gap-1 uppercase tracking-wider min-w-0 overflow-hidden">
          <span className="truncate">Short Stories</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pb-8">
        <div className="space-y-2.5">
          {storiesData.map((story, index) => {
            const isRead = readStories[story.id];
            const style = cardGradients[index % cardGradients.length];

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link to={`/reading/${story.id}`} className="group block outline-none">
                  <div className={`bg-gradient-to-r ${style.bg} px-4 py-3.5 rounded-2xl text-white shadow-lg ${style.shadow} flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 relative overflow-hidden border border-white/10`}>
                    
                    {/* Polka Dot Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                    <div className="flex items-center gap-3 relative z-10 min-w-0 pr-2">
                      <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate">{story.title}</h3>
                          {isRead && (
                            <span className="flex items-center px-2 py-0.5 bg-emerald-400/30 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-emerald-300/40 flex-shrink-0">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Selesai
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform border border-white/20 relative z-10">
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
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

