import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Type, FileText, ArrowRight, BarChart3 } from 'lucide-react';
import MascotHost from './components/MascotHost';
import { useEffect } from 'react';
import { useMascot } from './contexts/MascotContext';
import BackgroundClouds from './components/BackgroundClouds';

// Lazy-load all pages so their JS + data is only fetched when user navigates there
const Vocabulary   = lazy(() => import('./pages/Vocabulary'));
const GrammarList  = lazy(() => import('./pages/GrammarList'));
const GrammarDetail = lazy(() => import('./pages/GrammarDetail'));
const ReadingList  = lazy(() => import('./pages/ReadingList'));
const ReadingDetail = lazy(() => import('./pages/ReadingDetail'));
const Dashboard    = lazy(() => import('./pages/Dashboard'));

// Minimal loading fallback — invisible to user (no spinner flash for fast connections)
function PageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF]" />
  );
}

function LandingPage() {
  const { setMascotMessage, hideMascot } = useMascot();
  
  useEffect(() => {
    hideMascot(); // Don't show floating mascot on landing page because it has a big centered one
  }, [hideMascot]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] flex flex-col items-center justify-center p-6 text-slate-800 relative z-0 overflow-hidden">
      
      {/* Subtle Background Clouds & Ambient Lights */}
      <BackgroundClouds />

      <div className="max-w-xl w-full flex flex-col items-center text-center my-6">
        
        {/* Center Mascot & Speech Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-3 relative"
        >
          {/* Speech Bubble Above Mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-white/90 sm:backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-lg border border-purple-100 text-purple-700 font-extrabold text-xs mb-2 flex items-center gap-1.5 shadow-purple-900/10"
          >
            <span>Hai! Yuk belajar bareng aku!</span>
          </motion.div>

          <div className="relative">
            {/* Soft Glow behind Mascot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/40 rounded-full blur-2xl -z-10"></div>
            <picture>
              <source srcset="/mascot/raccoon-host.webp" type="image/webp" />
              <img 
                src="/mascot/raccoon-host.png" 
                alt="Raccly Raccoon Mascot" 
                decoding="async"
                className="w-32 md:w-36 h-auto drop-shadow-md sm:drop-shadow-xl hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x400/transparent/transparent.png';
                }}
              />
            </picture>
          </div>
        </motion.div>

        {/* Title & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-indigo-950 mb-1 drop-shadow-sm">
            Racc<span className="text-purple-600">ly</span>
          </h1>
          <p className="text-purple-800/90 font-bold text-sm md:text-base flex items-center justify-center gap-1">
            Happy Learning with Raccly! You can do it! 💪
          </p>
        </motion.div>

        {/* Vertical Stacked Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full space-y-2.5"
        >
          <NavCard 
            to="/vocabulary" 
            icon={<Type className="w-5 h-5 text-white" />} 
            title="Vocabulary" 
            description="Perkaya kosa katamu setiap hari"
            badge="50 kata"
            bgGradient="from-[#6366F1] to-[#4F46E5]"
            shadowColor="shadow-indigo-500/30 hover:shadow-indigo-500/40"
          />
          <NavCard 
            to="/grammar" 
            icon={<BookOpen className="w-5 h-5 text-white" />} 
            title="Grammar" 
            description="Pahami tata bahasa dengan mudah"
            badge="Topic"
            bgGradient="from-[#F43F5E] to-[#E11D48]"
            shadowColor="shadow-rose-500/30 hover:shadow-rose-500/40"
          />
          <NavCard 
            to="/reading" 
            icon={<FileText className="w-5 h-5 text-white" />} 
            title="Reading" 
            description="Latih pemahaman membacamu"
            badge="Cerita"
            bgGradient="from-[#F59E0B] to-[#D97706]"
            shadowColor="shadow-amber-500/30 hover:shadow-amber-500/40"
          />
          <NavCard 
            to="/dashboard" 
            icon={<BarChart3 className="w-5 h-5 text-white" />} 
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
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gradient-to-r ${bgGradient} px-4 py-3 rounded-2xl text-white shadow-md sm:shadow-lg ${shadowColor} flex items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/10 will-change-transform`}
      >
        {/* Polka Dot Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

        <div className="flex items-center gap-3 relative z-10 text-left">
          <div className="bg-white/20 sm:backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{title}</h3>
            <p className="text-white/80 text-xs font-medium mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          {badge && (
            <span className="hidden sm:inline-block bg-white/20 sm:backdrop-blur-md text-white text-xs px-2.5 py-0.5 rounded-full font-bold border border-white/20">
              {badge}
            </span>
          )}
          <div className="w-7 h-7 rounded-full bg-white/20 sm:backdrop-blur-md flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4 text-white" />
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
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <MascotHost />
    </>
  );
}
