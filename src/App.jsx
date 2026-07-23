import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Type, FileText, ArrowRight, BarChart3 } from 'lucide-react';
import Vocabulary from './pages/Vocabulary';
import GrammarList from './pages/GrammarList';
import GrammarDetail from './pages/GrammarDetail';
import ReadingList from './pages/ReadingList';
import ReadingDetail from './pages/ReadingDetail';
import Dashboard from './pages/Dashboard';
import MascotHost from './components/MascotHost';
import { useEffect } from 'react';
import { useMascot } from './contexts/MascotContext';

function LandingPage() {
  const { setMascotMessage, hideMascot } = useMascot();
  
  useEffect(() => {
    hideMascot(); // Don't show floating mascot on landing page because it has a big centered one
  }, [hideMascot]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B8C0FF] via-[#D5C6FE] to-[#EDE8FF] flex flex-col items-center justify-center p-6 text-slate-800 relative z-0 overflow-hidden">
      
      {/* Background Watermarks & Decorative Flowers */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Sunburst / Flower lineart patterns */}
        <svg className="absolute -top-12 -left-12 w-96 h-96 opacity-15 text-white stroke-current" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="20" strokeWidth="1" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos((i * Math.PI) / 6)} y2={50 + 40 * Math.sin((i * Math.PI) / 6)} strokeWidth="0.8" />
          ))}
        </svg>
        <svg className="absolute top-1/3 -right-16 w-96 h-96 opacity-15 text-white stroke-current" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="25" strokeWidth="1" />
          {[...Array(16)].map((_, i) => (
            <line key={i} x1="50" y1="50" x2={50 + 42 * Math.cos((i * Math.PI) / 8)} y2={50 + 42 * Math.sin((i * Math.PI) / 8)} strokeWidth="0.8" />
          ))}
        </svg>
        <svg className="absolute bottom-10 -left-10 w-80 h-80 opacity-15 text-white stroke-current" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="20" strokeWidth="1" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="50" y1="50" x2={50 + 38 * Math.cos((i * Math.PI) / 6)} y2={50 + 38 * Math.sin((i * Math.PI) / 6)} strokeWidth="0.8" />
          ))}
        </svg>

        {/* Floating Sparkles & Hearts */}
        <div className="absolute top-[18%] left-[22%] text-white/30 text-xl font-bold">✨</div>
        <div className="absolute top-[28%] right-[20%] text-purple-400/40 text-lg">💜</div>
        <div className="absolute bottom-[25%] left-[15%] text-pink-300/40 text-lg">🌸</div>
        <div className="absolute bottom-[35%] right-[18%] text-white/40 text-sm">✨</div>
      </div>

      <div className="max-w-xl w-full flex flex-col items-center text-center my-6">
        
        {/* Center Mascot & Speech Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-6 relative"
        >
          {/* Speech Bubble Above Mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-lg border border-purple-100 text-purple-700 font-extrabold text-sm mb-3 flex items-center gap-1.5 shadow-purple-900/10"
          >
            <span>Hai! Yuk belajar bareng aku!</span>
          </motion.div>

          <div className="relative">
            {/* Soft Glow behind Mascot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/40 rounded-full blur-2xl -z-10"></div>
            <img 
              src="/mascot/raccoon-host.png" 
              alt="Raccly Raccoon Mascot" 
              className="w-48 md:w-56 h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/transparent/transparent.png';
              }}
            />
          </div>
        </motion.div>

        {/* Title & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-indigo-950 mb-2 drop-shadow-sm">
            Racc<span className="text-purple-600">ly</span>
          </h1>
          <p className="text-purple-800/90 font-bold text-base md:text-lg flex items-center justify-center gap-1">
            Happy Learning with Raccly! You can do it! 💪
          </p>
        </motion.div>

        {/* Vertical Stacked Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full space-y-4"
        >
          <NavCard 
            to="/vocabulary" 
            icon={<Type className="w-7 h-7 text-white" />} 
            title="Vocabulary" 
            description="Perkaya kosa katamu setiap hari"
            badge="50 kata"
            bgGradient="from-[#6366F1] to-[#4F46E5]"
            shadowColor="shadow-indigo-500/30 hover:shadow-indigo-500/40"
          />
          <NavCard 
            to="/grammar" 
            icon={<BookOpen className="w-7 h-7 text-white" />} 
            title="Grammar" 
            description="Pahami tata bahasa dengan mudah"
            badge="Topic"
            bgGradient="from-[#F43F5E] to-[#E11D48]"
            shadowColor="shadow-rose-500/30 hover:shadow-rose-500/40"
          />
          <NavCard 
            to="/reading" 
            icon={<FileText className="w-7 h-7 text-white" />} 
            title="Reading" 
            description="Latih pemahaman membacamu"
            badge="Cerita"
            bgGradient="from-[#F59E0B] to-[#D97706]"
            shadowColor="shadow-amber-500/30 hover:shadow-amber-500/40"
          />
          <NavCard 
            to="/dashboard" 
            icon={<BarChart3 className="w-7 h-7 text-white" />} 
            title="Dashboard" 
            description="Pantau pencapaian & skor kamu"
            badge="Progress"
            bgGradient="from-[#06B6D4] to-[#0891B2]"
            shadowColor="shadow-cyan-500/30 hover:shadow-cyan-500/40"
          />
        </motion.div>

      </div>
    </div>
  );
}

function NavCard({ to, icon, title, description, badge, bgGradient, shadowColor }) {
  return (
    <Link to={to} className="group block w-full outline-none">
      <motion.div 
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gradient-to-r ${bgGradient} p-5 rounded-3xl text-white shadow-xl ${shadowColor} flex items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10`}
      >
        {/* Polka Dot Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10 text-left">
          <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-white/80 text-sm font-medium mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          {badge && (
            <span className="hidden sm:inline-block bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold border border-white/20">
              {badge}
            </span>
          )}
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Placeholder pages
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative z-0">
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-slate-800">{title}</h1>
        <p className="text-slate-500 mb-10 text-lg">Halaman ini sedang dalam pengembangan.</p>
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md border border-slate-100">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
          <Route path="/vocabulary" element={<PageWrapper><Vocabulary /></PageWrapper>} />
          <Route path="/grammar" element={<PageWrapper><GrammarList /></PageWrapper>} />
          <Route path="/grammar/:id" element={<PageWrapper><GrammarDetail /></PageWrapper>} />
          <Route path="/reading" element={<PageWrapper><ReadingList /></PageWrapper>} />
          <Route path="/reading/:id" element={<PageWrapper><ReadingDetail /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <MascotHost />
    </>
  );
}
