import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, BookOpen, Zap, Flame, Star } from 'lucide-react';
import { grammarData } from '../data/grammar';
import { useMascot } from '../contexts/MascotContext';
import useLocalStorage from '../hooks/useLocalStorage';

import BackgroundClouds from '../components/BackgroundClouds';

// ── Level taxonomy ────────────────────────────────────────────────────────────
const LEVELS = [
  {
    key: 'beginner',
    label: 'Beginner',
    emoji: '🌱',
    tagline: 'Bangun fondasi yang kuat',
    icon: <Star className="w-3.5 h-3.5" />,
    stars: 1,
    ids: ['g-001', 'g-002', 'g-003', 'g-008', 'g-013'],
    // Greens
    sectionBg: 'bg-emerald-50/60',
    sectionBorder: 'border-emerald-200/60',
    headerGradient: 'from-emerald-500 to-teal-500',
    headerShadow: 'shadow-emerald-500/20',
    starColor: 'text-emerald-500',
    cardGradient: 'from-[#10B981] to-[#059669]',
    cardShadow: 'shadow-emerald-500/20',
  },
  {
    key: 'intermediate',
    label: 'Intermediate',
    emoji: '⚡',
    tagline: 'Tingkatkan kemampuanmu',
    icon: <Zap className="w-3.5 h-3.5" />,
    stars: 2,
    ids: ['g-004', 'g-005', 'g-006', 'g-007', 'g-009', 'g-010', 'g-011', 'g-012'],
    // Blues
    sectionBg: 'bg-blue-50/60',
    sectionBorder: 'border-blue-200/60',
    headerGradient: 'from-blue-500 to-indigo-500',
    headerShadow: 'shadow-blue-500/20',
    starColor: 'text-blue-500',
    cardGradient: 'from-[#3B82F6] to-[#4F46E5]',
    cardShadow: 'shadow-blue-500/20',
  },
  {
    key: 'advanced',
    label: 'Advanced',
    emoji: '🔥',
    tagline: 'Kuasai grammar tingkat atas',
    icon: <Flame className="w-3.5 h-3.5" />,
    stars: 3,
    ids: ['g-014', 'g-015', 'g-016', 'g-017'],
    // Purples
    sectionBg: 'bg-purple-50/60',
    sectionBorder: 'border-purple-200/60',
    headerGradient: 'from-violet-500 to-purple-600',
    headerShadow: 'shadow-purple-500/20',
    starColor: 'text-purple-500',
    cardGradient: 'from-[#8B5CF6] to-[#7C3AED]',
    cardShadow: 'shadow-purple-500/20',
  },
];

// Build a lookup from topic id → topic object
const topicById = Object.fromEntries(grammarData.map(t => [t.id, t]));

export default function GrammarList() {
  const { setMascotMessage } = useMascot();
  const [grammarScores] = useLocalStorage('raccly_grammar_scores', []);
  // Store completed exercise sets per topic: { 'g-001': true, ... }
  const [completedTopics] = useLocalStorage('raccly_grammar_completed', {});

  useEffect(() => {
    setMascotMessage("Grammar emang kadang bikin pusing, tapi kamu pasti bisa!");
  }, [setMascotMessage]);

  // Overall progress
  const totalTopics = grammarData.length;
  const completedCount = useMemo(
    () => Object.values(completedTopics).filter(Boolean).length,
    [completedTopics]
  );
  const completedPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const progressLabel = completedPct === 0
    ? "Mulai dari topik pertama! 🚀"
    : completedPct < 40
    ? "Awal yang bagus — terus lanjut! 💪"
    : completedPct < 70
    ? "Sudah lebih dari setengah — keren! 🔥"
    : completedPct < 100
    ? "Hampir selesai semua topik! ⭐"
    : "Semua topik selesai! Legend! 🏆";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">

      <BackgroundClouds />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="max-w-3xl mx-auto mb-5 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-900 font-bold bg-white/80 sm:backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Beranda
        </Link>
        <div className="text-[10px] font-extrabold text-purple-900/50 uppercase tracking-wider">
          Grammar Topics
        </div>
      </header>

      <main className="max-w-3xl mx-auto pb-10">

        {/* ── Page Title + Progress ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-indigo-950 leading-tight">
                📖 Grammar
              </h1>
              <p className="text-purple-800/80 font-semibold text-sm mt-0.5">
                {totalTopics} Topics · 3 Levels · Build your English foundation
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/70 sm:backdrop-blur-md rounded-2xl px-3 py-2 border border-white/60 shadow-sm text-center min-w-[72px]">
              <div className="text-xl font-black text-indigo-700 leading-none">{completedCount}</div>
              <div className="text-[10px] text-indigo-500 font-bold mt-0.5">selesai</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-white/40 rounded-2xl p-3 border border-white/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-indigo-900/70">{progressLabel}</span>
              <span className="text-xs font-black text-indigo-700">{completedPct}%</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completedPct}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-indigo-700/60 font-medium">0</span>
              <span className="text-[10px] text-indigo-700/60 font-medium">{completedCount} / {totalTopics}</span>
              <span className="text-[10px] text-indigo-700/60 font-medium">{totalTopics}</span>
            </div>
          </div>
        </motion.div>

        {/* ── Level Sections ─────────────────────────────────────────────── */}
        <div className="space-y-6">
          {LEVELS.map((level, levelIdx) => {
            const levelTopics = level.ids
              .map(id => topicById[id])
              .filter(Boolean);

            const levelCompleted = levelTopics.filter(t => completedTopics[t.id]).length;

            return (
              <motion.section
                key={level.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: levelIdx * 0.1 }}
              >
                {/* Section header */}
                <div className={`flex items-center justify-between bg-gradient-to-r ${level.headerGradient} rounded-2xl px-4 py-3 mb-3 shadow-md ${level.headerShadow} border border-white/10 relative overflow-hidden`}>
                  {/* Dot texture */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                  <div className="relative z-10 flex items-center gap-2.5">
                    <span className="text-xl">{level.emoji}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-black text-white">{level.label}</h2>
                        {/* Star indicators */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < level.stars ? 'text-yellow-300' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-white/70 text-[10px] font-semibold">{level.tagline}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex-shrink-0 text-right">
                    <div className="text-white font-black text-sm">{levelCompleted}<span className="text-white/60 font-medium text-xs">/{levelTopics.length}</span></div>
                    <div className="text-white/60 text-[10px] font-semibold">selesai</div>
                  </div>
                </div>

                {/* Topic cards */}
                <div className="space-y-2">
                  {levelTopics.map((topic, topicIdx) => {
                    const exerciseCount = topic.exercises?.length ?? 0;
                    const isDone = !!completedTopics[topic.id];
                    const globalIdx = levelIdx * 10 + topicIdx;

                    return (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: globalIdx * 0.04 }}
                      >
                        <Link to={`/grammar/${topic.id}`} className="group block outline-none">
                          <div className={`bg-gradient-to-r ${level.cardGradient} px-4 py-3.5 rounded-2xl text-white shadow-md ${level.cardShadow} flex items-center justify-between transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 relative overflow-hidden border border-white/10 will-change-transform`}>

                            {/* Dot texture */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                            <div className="flex items-center gap-3 relative z-10 min-w-0 pr-2">
                              {/* Icon */}
                              <div className="bg-white/20 sm:backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                                {isDone
                                  ? <span className="text-base leading-none">✅</span>
                                  : <BookOpen className="w-5 h-5 text-white" />
                                }
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                                    {topic.title}
                                  </h3>
                                  {isDone && (
                                    <span className="text-[10px] font-extrabold bg-white/25 text-white px-2 py-0.5 rounded-full border border-white/20 flex-shrink-0">
                                      ✔ Completed
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                  <span className="text-white/70 text-[10px] font-bold">
                                    {exerciseCount} Exercises
                                  </span>
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
              </motion.section>
            );
          })}
        </div>

        {/* ── Bottom tip ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-6 bg-white/50 border border-white/70 rounded-2xl p-4 flex items-start gap-3 shadow-sm"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-base">🦝</span>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-purple-700/60 uppercase tracking-widest mb-0.5">Raccly's Tip</p>
            <p className="text-indigo-950 font-semibold text-sm leading-snug">
              📌 Mulai dari <strong>Beginner</strong> dulu! Topik dasar seperti Simple Present dan To Be adalah fondasi dari semua grammar di atasnya.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
