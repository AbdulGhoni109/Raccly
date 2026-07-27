import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle2, BookOpen, Clock, Heart, Sparkles, Filter } from 'lucide-react';
import { storiesData } from '../data/stories';
import useLocalStorage from '../hooks/useLocalStorage';
import { useMascot } from '../contexts/MascotContext';

import BackgroundClouds from '../components/BackgroundClouds';

// ── Story metadata mapping (Theme, Mood, Emoji, Teaser, Accent Styles) ─────────
const STORY_METADATA = {
  's-003': {
    category: '🌱 Confidence',
    mood: 'Self Confidence',
    emoji: '🦁',
    readTime: '3 min read',
    summary: 'A quiet student discovers that true preparation and inner dedication speak louder than words.',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    accentDot: 'bg-amber-400',
  },
  's-004': {
    category: '🌧️ Healing',
    mood: 'Feeling Down',
    emoji: '🌧️',
    readTime: '3 min read',
    summary: 'Kevin learns that failure is not a dead end, but a gentle turn on the road to growth.',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
    accentDot: 'bg-sky-400',
  },
  's-005': {
    category: '🤝 Friendship',
    mood: 'Friendship',
    emoji: '🤝',
    readTime: '3 min read',
    summary: 'Maya finds a true friend who celebrates her creative passion instead of dimming her light.',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
    accentDot: 'bg-rose-400',
  },
  's-006': {
    category: '💙 Anxiety',
    mood: 'Feeling Down',
    emoji: '🌬️',
    readTime: '3 min read',
    summary: 'Overcoming nervousness by taking deep breaths and trusting in steady preparation.',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    accentDot: 'bg-blue-400',
  },
  's-007': {
    category: '🌸 Self Acceptance',
    mood: 'Self Confidence',
    emoji: '🌸',
    readTime: '3 min read',
    summary: 'Embracing your own unique pace without comparing your worth to others.',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
    accentDot: 'bg-purple-400',
  },
  's-008': {
    category: '🌱 Persistence',
    mood: 'Perseverance',
    emoji: '🧗',
    readTime: '3 min read',
    summary: 'Daniel discovers that true mastery is built through steady everyday efforts.',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    accentDot: 'bg-emerald-400',
  },
  's-009': {
    category: '❤️ Integrity',
    mood: 'Kindness',
    emoji: '🛡️',
    readTime: '3 min read',
    summary: 'Rory chooses peace of mind and honesty over a shortcut he would regret.',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    accentDot: 'bg-indigo-400',
  },
  's-010': {
    category: '🔥 Courage',
    mood: 'Need Motivation',
    emoji: '✨',
    readTime: '3 min read',
    summary: 'Chloe takes a brave step forward, learning that courage starts by taking action.',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    accentDot: 'bg-amber-400',
  },
  's-011': {
    category: '🤝 Teamwork',
    mood: 'Friendship',
    emoji: '🎨',
    readTime: '3 min read',
    summary: 'Marcus sees how different perspectives make teamwork richer and more meaningful.',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-200',
    accentDot: 'bg-teal-400',
  },
  's-012': {
    category: '🧘 Balance',
    mood: 'Need Motivation',
    emoji: '🌿',
    readTime: '3 min read',
    summary: 'Tariq learns that taking time to rest is essential fuel for long-term progress.',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    accentDot: 'bg-emerald-400',
  },
};

const MOOD_FILTERS = [
  { id: 'all', label: '✨ Semua Cerita' },
  { id: 'Need Motivation', label: '🌤️ Need Motivation' },
  { id: 'Feeling Down', label: '🌧️ Feeling Down' },
  { id: 'Self Confidence', label: '🌈 Self Confidence' },
  { id: 'Friendship', label: '🤝 Friendship' },
  { id: 'Perseverance', label: '🔥 Perseverance' },
  { id: 'Kindness', label: '❤️ Kindness' },
];

export default function ReadingList() {
  const { setMascotMessage } = useMascot();
  const [readStories] = useLocalStorage('raccly_read_stories', {});
  const [activeMood, setActiveMood] = useState('all');

  useEffect(() => {
    setMascotMessage("Pilih cerita yang pas dengan suasana hatimu hari ini~ ✨");
  }, [setMascotMessage]);

  // Calculate overall reading progress
  const totalStories = storiesData.length;
  const readCount = useMemo(
    () => Object.values(readStories).filter(Boolean).length,
    [readStories]
  );
  const readPct = totalStories > 0 ? Math.round((readCount / totalStories) * 100) : 0;

  const progressLabel = readPct === 0
    ? "Mulai membaca cerita pertamamu! 📖"
    : readPct < 40
    ? "Bagus sekali — terus nikmati setiap cerita! 🌸"
    : readPct < 80
    ? "Lebih dari setengah perpustakaan telah kamu baca! ⭐"
    : readPct < 100
    ? "Hampir semua cerita selesai dibaca! 🏆"
    : "Seluruh perpustakaan tuntas! Kamu pembaca hebat! 🎉";

  // Filter stories by mood
  const filteredStories = useMemo(() => {
    if (activeMood === 'all') return storiesData;
    return storiesData.filter(s => {
      const meta = STORY_METADATA[s.id];
      return meta && meta.mood === activeMood;
    });
  }, [activeMood]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8C7FF] via-[#E2DCFF] to-[#D0EAFF] text-slate-800 p-4 sm:p-6 md:p-10 relative z-0 overflow-hidden">
      
      {/* Background Watermark & Clouds */}
      <BackgroundClouds />

      {/* Header Navigation */}
      <header className="max-w-3xl mx-auto mb-5 flex items-center gap-3">
        <Link to="/" className="inline-flex items-center text-indigo-900 font-bold bg-white/80 sm:backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white transition-all border border-white/40 text-xs flex-shrink-0">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Beranda
        </Link>
        <div className="text-[10px] font-extrabold text-purple-900/50 uppercase tracking-wider">
          Mini Reading Library
        </div>
      </header>

      <main className="max-w-3xl mx-auto pb-10">

        {/* ── Page Header & Healing Progress ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-indigo-950 leading-tight">
                📖 Mini Reading Library
              </h1>
              <p className="text-purple-800/80 font-semibold text-sm mt-0.5">
                {totalStories} Healing Stories · Read at your own pace · Level A2-B1
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/70 sm:backdrop-blur-md rounded-2xl px-3 py-2 border border-white/60 shadow-sm text-center min-w-[72px]">
              <div className="text-xl font-black text-indigo-700 leading-none">{readCount}</div>
              <div className="text-[10px] text-indigo-500 font-bold mt-0.5">dibaca</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-white/40 rounded-2xl p-3 border border-white/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-indigo-900/70">{progressLabel}</span>
              <span className="text-xs font-black text-indigo-700">{readPct}%</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-amber-400 via-purple-400 to-indigo-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${readPct}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-indigo-700/60 font-medium">0</span>
              <span className="text-[10px] text-indigo-700/60 font-medium">{readCount} / {totalStories}</span>
              <span className="text-[10px] text-indigo-700/60 font-medium">{totalStories} cerita</span>
            </div>
          </div>
        </motion.div>

        {/* ── Mood Filter Pills ────────────────────────────────────────── */}
        <div className="mb-6">
          <p className="text-xs font-extrabold text-purple-900/50 uppercase tracking-widest mb-2 px-0.5 flex items-center gap-1.5">
            <Filter className="w-3 h-3" /> Filter Suasana Hati
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {MOOD_FILTERS.map(filter => {
              const isActive = activeMood === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveMood(filter.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex-shrink-0 border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20 scale-[1.02]'
                      : 'bg-white/70 text-slate-700 border-white/60 hover:bg-white hover:text-purple-900'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Story Cards List (Mini Library Style) ────────────────────── */}
        <div className="space-y-3.5">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story, index) => {
              const isRead = readStories[story.id];
              const meta = STORY_METADATA[story.id] || {
                category: '🌱 Story',
                emoji: '📖',
                readTime: '3 min read',
                summary: 'Cerita inspiratif bahasa Inggris untuk melatih pemahamanmu.',
                badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
                accentDot: 'bg-purple-400',
              };

              return (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/reading/${story.id}`} className="group block outline-none">
                    <div className="bg-white/85 hover:bg-white border border-purple-100/90 hover:border-purple-300/80 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                      
                      {/* Subtle ambient gradient overlay */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

                      {/* Header Row: Category Badge + Read Time + Status */}
                      <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${meta.badgeBg}`}>
                            {meta.category}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> {meta.readTime}
                          </span>
                        </div>

                        {/* Status Badge */}
                        {isRead ? (
                          <span className="flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" /> ✔ Selesai
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                            📖 Belum dibaca
                          </span>
                        )}
                      </div>

                      {/* Main Title & Emoji */}
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {meta.emoji}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-black text-indigo-950 group-hover:text-purple-700 transition-colors leading-tight">
                            {story.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                            {meta.summary}
                          </p>
                        </div>
                      </div>

                      {/* Supportive Quote Banner */}
                      {story.quote && (
                        <div className="mt-3 pt-3 border-t border-purple-100/70 flex items-center justify-between gap-3">
                          <p className="text-xs italic font-medium text-purple-900/80 leading-relaxed flex items-center gap-1.5">
                            <span className="text-base leading-none not-italic">💬</span>
                            <span>"{story.quote}"</span>
                          </p>
                          <div className="w-7 h-7 rounded-full bg-purple-100/80 group-hover:bg-purple-600 group-hover:text-white text-purple-700 flex items-center justify-center flex-shrink-0 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      )}

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Footer Tip Card ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 bg-white/50 border border-white/70 rounded-2xl p-4 flex items-start gap-3 shadow-sm"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-base">🦝</span>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-amber-800/70 uppercase tracking-widest mb-0.5">Raccly's Reading Tip</p>
            <p className="text-indigo-950 font-semibold text-sm leading-snug">
              💡 Jangan terburu-buru! Klik kata yang digarisbawahi di dalam cerita untuk langsung melihat artinya dalam Bahasa Indonesia.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
