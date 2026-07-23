import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle2, BookOpen, Brain, TrendingUp } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import { vocabularyData } from '../data/vocabulary';
import { storiesData } from '../data/stories';
import { useMascot } from '../contexts/MascotContext';

export default function Dashboard() {
  const { setMascotMessage } = useMascot();

  useEffect(() => {
    setMascotMessage("Lihat progress kerenmu di sini! ✨");
  }, [setMascotMessage]);

  const [vocabProgress] = useLocalStorage('raccly_vocab_progress', {});
  const [readStories] = useLocalStorage('raccly_read_stories', {});
  const [vocabScores] = useLocalStorage('raccly_vocab_scores', []);
  const [grammarScores] = useLocalStorage('raccly_grammar_scores', []);

  // Calculate Vocab Progress
  const masteredVocabCount = Object.values(vocabProgress).filter(status => status === true).length;
  const totalVocabCount = vocabularyData.length;
  const vocabPercentage = totalVocabCount > 0 ? Math.round((masteredVocabCount / totalVocabCount) * 100) : 0;

  // Calculate Reading Progress
  const readStoriesCount = Object.values(readStories).filter(status => status === true).length;
  const totalStoriesCount = storiesData.length;
  const readingPercentage = totalStoriesCount > 0 ? Math.round((readStoriesCount / totalStoriesCount) * 100) : 0;

  // Calculate Averages
  const avgVocabScore = vocabScores.length > 0 
    ? Math.round(vocabScores.reduce((a, b) => a + b, 0) / vocabScores.length)
    : 0;

  const avgGrammarScore = grammarScores.length > 0 
    ? Math.round(grammarScores.reduce((a, b) => a + b, 0) / grammarScores.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B8C0FF] via-[#D5C6FE] to-[#EDE8FF] text-slate-800 p-6 md:p-10 relative z-0 overflow-hidden">
      
      {/* Background Watermark & Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#06B6D4] rounded-full opacity-15 blur-[80px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] bg-[#C084FC] rounded-full opacity-20 blur-[90px]"></div>
        
        {/* Sunburst Pattern */}
        <svg className="absolute -top-10 -right-10 w-80 h-80 opacity-15 text-white stroke-current" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="20" strokeWidth="1" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="50" y1="50" x2={50 + 38 * Math.cos((i * Math.PI) / 6)} y2={50 + 38 * Math.sin((i * Math.PI) / 6)} strokeWidth="0.8" />
          ))}
        </svg>

        {/* Floating sparkles */}
        <div className="absolute top-[20%] left-[15%] text-white/30 text-lg">✨</div>
        <div className="absolute bottom-[25%] right-[12%] text-white/30 text-base">🌸</div>
      </div>

      <header className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-3 relative">
        <div className="w-full md:w-auto flex items-center justify-start">
          <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs md:text-sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Beranda
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-black text-indigo-950 drop-shadow-sm">
            Dashboard <span className="text-purple-600">📊</span>
          </h1>
          <p className="text-purple-900/80 text-xs md:text-sm font-semibold mt-0.5">Pantau pencapaian & skor hasil belajarmu</p>
        </div>
        <div className="hidden md:block w-28"></div>
      </header>

      <main className="max-w-4xl mx-auto pb-32">
        
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Vocab Progress Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] p-8 rounded-3xl text-white shadow-xl shadow-indigo-500/25 relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-4xl font-black text-white">{masteredVocabCount}<span className="text-xl text-white/70 font-medium">/{totalVocabCount}</span></span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Kosakata Dikuasai</h3>
            <div className="w-full bg-black/20 rounded-full h-2.5 mb-2 relative z-10 overflow-hidden">
              <motion.div 
                className="bg-white h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${vocabPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <p className="text-xs text-white/80 font-bold text-right relative z-10">{vocabPercentage}% tuntas</p>
          </motion.div>

          {/* Reading Progress Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] p-8 rounded-3xl text-white shadow-xl shadow-amber-500/25 relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-4xl font-black text-white">{readStoriesCount}<span className="text-xl text-white/70 font-medium">/{totalStoriesCount}</span></span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Cerita Dibaca</h3>
            <div className="w-full bg-black/20 rounded-full h-2.5 mb-2 relative z-10 overflow-hidden">
              <motion.div 
                className="bg-white h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${readingPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-white/80 font-bold text-right relative z-10">{readingPercentage}% tuntas</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Vocab Quiz */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-8 rounded-3xl text-white shadow-xl shadow-cyan-500/25 relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center text-white relative z-10">
              <Brain className="w-6 h-6 mr-3 text-white" /> Rata-Rata Kuis Vocab
            </h3>
            <div className="text-6xl font-black mb-2 relative z-10">
              {avgVocabScore}<span className="text-2xl font-bold text-white/80">%</span>
            </div>
            <p className="text-white/80 text-xs font-bold relative z-10">{vocabScores.length} kuis diselesaikan</p>
          </motion.div>

          {/* Average Grammar Quiz */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[#F43F5E] to-[#E11D48] p-8 rounded-3xl text-white shadow-xl shadow-rose-500/25 relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center text-white relative z-10">
              <TrendingUp className="w-6 h-6 mr-3 text-white" /> Rata-Rata Kuis Grammar
            </h3>
            <div className="text-6xl font-black mb-2 relative z-10">
              {avgGrammarScore}<span className="text-2xl font-bold text-white/80">%</span>
            </div>
            <p className="text-white/80 text-xs font-bold relative z-10">{grammarScores.length} kuis diselesaikan</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
