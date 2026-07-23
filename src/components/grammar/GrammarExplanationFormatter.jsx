import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Binary, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  GitCompare,
  HelpCircle,
  Zap,
  Info,
  Check,
  X
} from 'lucide-react';

/**
 * Custom Quote Box for Example Sentences
 */
function ExampleQuoteBox({ text, label = "Contoh Kalimat" }) {
  if (!text) return null;
  
  // Clean quotes if double quoted
  const cleanedText = text.replace(/^["']|["']$/g, '').trim();

  return (
    <div className="my-2.5 p-3.5 sm:p-4 bg-indigo-50/80 rounded-2xl border-l-4 border-indigo-500 shadow-2xs">
      <div className="text-[11px] font-black text-indigo-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        <span>{label}</span>
      </div>
      <div className="text-sm sm:text-base font-bold text-indigo-950 leading-relaxed font-sans">
        "{cleanedText}"
      </div>
    </div>
  );
}

/**
 * Render Formula Pills Diagram
 * e.g. "Subjek + Verb 1 + -s/-es + Objek" -> [ Subjek ] + [ Verb 1 ] + [ -s/-es ] + [ Objek ]
 */
function FormulaDiagram({ formulaText }) {
  if (!formulaText) return null;

  // Split by '+' or '➔' or '->'
  const parts = formulaText.split(/(\+|\u2794|->)/).map(p => p.trim()).filter(Boolean);

  return (
    <div className="flex flex-wrap items-center gap-2 my-2 p-3 bg-white/90 rounded-2xl border border-indigo-150 shadow-2xs">
      {parts.map((part, i) => {
        if (part === '+' || part === '➔' || part === '->') {
          return (
            <span key={i} className="text-indigo-400 font-black text-sm px-1">
              {part === '+' ? '+' : '➔'}
            </span>
          );
        }
        
        let badgeStyle = "bg-indigo-600 text-white";
        if (part.toLowerCase().includes('subjek') || part.toLowerCase().includes('subject')) {
          badgeStyle = "bg-indigo-600 text-white";
        } else if (part.toLowerCase().includes('verb') || part.toLowerCase().includes('kata kerja') || part.toLowerCase().includes('v1') || part.toLowerCase().includes('v2') || part.toLowerCase().includes('v3')) {
          badgeStyle = "bg-purple-600 text-white";
        } else if (part.toLowerCase().includes('not') || part.toLowerCase().includes("don't") || part.toLowerCase().includes("doesn't") || part.toLowerCase().includes("didn't")) {
          badgeStyle = "bg-rose-500 text-white";
        } else if (part.toLowerCase().includes('do') || part.toLowerCase().includes('does') || part.toLowerCase().includes('did') || part.toLowerCase().includes('have') || part.toLowerCase().includes('has') || part.toLowerCase().includes('is') || part.toLowerCase().includes('am') || part.toLowerCase().includes('are')) {
          badgeStyle = "bg-amber-500 text-white";
        } else {
          badgeStyle = "bg-slate-700 text-white";
        }

        return (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm shadow-xs ${badgeStyle}`}
          >
            {part}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Warning Card Component for "Kesalahan Umum Siswa"
 */
function WarningMistakesCard({ title, lines }) {
  // Parse mistakes from lines
  const mistakes = [];
  let currentMistake = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('❌') || trimmed.match(/^[0-9]+\./) || trimmed.startsWith('- Salah:')) {
      if (currentMistake) mistakes.push(currentMistake);
      currentMistake = {
        title: trimmed.replace(/^❌\s*/, '').replace(/^[0-9]+\.\s*/, ''),
        wrong: '',
        correct: '',
        explanation: ''
      };
    } else if (trimmed.startsWith('- Salah:') || trimmed.includes('Salah:')) {
      if (!currentMistake) {
        currentMistake = { title: 'Poin Kesalahan', wrong: '', correct: '', explanation: '' };
      }
      currentMistake.wrong = trimmed.replace(/^-\s*Salah:\s*/, '').replace(/Salah:\s*/, '').replace(/❌|✔️/g, '').trim();
    } else if (trimmed.startsWith('- Benar:') || trimmed.includes('Benar:')) {
      if (!currentMistake) {
        currentMistake = { title: 'Poin Kesalahan', wrong: '', correct: '', explanation: '' };
      }
      currentMistake.correct = trimmed.replace(/^-\s*Benar:\s*/, '').replace(/Benar:\s*/, '').replace(/❌|✔️/g, '').trim();
    } else if (currentMistake) {
      if (!currentMistake.wrong && trimmed.toLowerCase().includes('salah')) {
        currentMistake.wrong = trimmed;
      } else if (!currentMistake.correct && trimmed.toLowerCase().includes('benar')) {
        currentMistake.correct = trimmed;
      } else {
        currentMistake.explanation += (currentMistake.explanation ? ' ' : '') + trimmed;
      }
    }
  }
  if (currentMistake) mistakes.push(currentMistake);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#FFFDF0] via-[#FFF7ED] to-[#FEF3C7] rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-xl shadow-amber-500/10 mb-8"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-200/80">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
          <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider block">
            Peringatan Penting
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight leading-tight">
            {title || 'Kesalahan Umum Siswa'}
          </h3>
        </div>
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {mistakes.length > 0 ? (
          mistakes.map((m, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-amber-200/70 shadow-xs"
            >
              {m.title && (
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-3 flex items-start gap-2">
                  <span className="text-amber-600 font-black">#{idx + 1}</span>
                  <span>{m.title}</span>
                </h4>
              )}

              {/* Wrong vs Correct Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {/* SALAH / INCORRECT */}
                {m.wrong && (
                  <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 uppercase tracking-wider mb-1.5">
                      <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                        <X className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>Salah (Incorrect)</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-rose-950 line-through decoration-rose-400 leading-snug">
                      {m.wrong}
                    </p>
                  </div>
                )}

                {/* BENAR / CORRECT */}
                {m.correct && (
                  <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider mb-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>Benar (Correct)</span>
                    </div>
                    <p className="text-xs sm:text-sm font-black text-emerald-950 leading-snug">
                      {m.correct}
                    </p>
                  </div>
                )}
              </div>

              {m.explanation && (
                <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2.5 pt-2 border-t border-amber-100">
                  💡 {m.explanation}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-slate-700 text-sm whitespace-pre-line leading-relaxed font-medium">
            {lines.join('\n')}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Grid 2x2 Functions Card View
 */
function FunctionsGridView({ title, introText, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl shadow-purple-900/5 mb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-indigo-50">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
          {title}
        </h3>
      </div>

      {introText && (
        <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed mb-6">
          {introText}
        </p>
      )}

      {/* Grid 2x2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-white rounded-2xl p-5 border border-indigo-100/80 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.icon || '📌'}</span>
                <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base leading-tight">
                  {item.title}
                </h4>
              </div>
              {item.desc && (
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed mb-3">
                  {item.desc}
                </p>
              )}
            </div>

            {/* Examples inside card */}
            {item.examples && item.examples.length > 0 && (
              <div className="mt-2 space-y-2">
                {item.examples.map((ex, exIdx) => (
                  <ExampleQuoteBox key={exIdx} text={ex} label="Contoh Kalimat" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Formula Card View
 */
function FormulaCardView({ title, lines }) {
  // Parse lines into formula blocks & sub-patterns
  const blocks = [];
  let currentBlock = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.match(/^[A-Z]\.\s+/) || trimmed.includes('Kalimat Positif') || trimmed.includes('Kalimat Negatif') || trimmed.includes('Kalimat Tanya')) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        title: trimmed,
        rules: [],
        examples: []
      };
    } else if (currentBlock) {
      if (trimmed.startsWith('Contoh:') || trimmed.includes('Contoh:')) {
        currentBlock.examples.push(trimmed.replace(/^Contoh:\s*/, ''));
      } else {
        currentBlock.rules.push(trimmed);
      }
    } else {
      currentBlock = {
        title: 'Pola & Rumus Utama',
        rules: [trimmed],
        examples: []
      };
    }
  }
  if (currentBlock) blocks.push(currentBlock);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white rounded-3xl p-6 sm:p-8 border border-indigo-150 shadow-xl shadow-purple-900/5 mb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-indigo-100">
        <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
          <Binary className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="space-y-6">
        {blocks.map((block, idx) => (
          <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-indigo-100 shadow-xs">
            <h4 className="font-black text-indigo-900 text-base sm:text-lg mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>{block.title}</span>
            </h4>

            {/* Rules / Formula Diagrams */}
            <div className="space-y-2 mb-3">
              {block.rules.map((rule, rIdx) => {
                const cleanedRule = rule.replace(/^•\s*/, '').replace(/^[0-9]+\.\s*/, '');
                
                // If contains '+' or formula structure, visualize as Diagram
                if (cleanedRule.includes('+') || cleanedRule.includes('➔') || cleanedRule.includes('Verb')) {
                  return (
                    <div key={rIdx} className="my-2">
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-1">{cleanedRule}</p>
                      <FormulaDiagram formulaText={cleanedRule} />
                    </div>
                  );
                }

                return (
                  <p key={rIdx} className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{cleanedRule}</span>
                  </p>
                );
              })}
            </div>

            {/* Examples */}
            {block.examples.map((ex, exIdx) => (
              <ExampleQuoteBox key={exIdx} text={ex} />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Collapsible Accordion Section Component
 */
function CollapsibleSection({ title, iconEmoji, lines, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl shadow-purple-900/5 mb-8 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl flex-shrink-0 font-bold">
            {iconEmoji || '🔍'}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 leading-tight">
              {title}
            </h3>
            <span className="text-xs font-bold text-indigo-600/80">
              {isOpen ? 'Klik untuk menutup' : 'Klik untuk melihat detail'}
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 pt-2 border-t border-indigo-50"
          >
            <StandardLinesRenderer lines={lines} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Helper to render standard lines with formatted examples and lists
 */
function StandardLinesRenderer({ lines }) {
  return (
    <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2"></div>;

        if (trimmed.startsWith('Contoh:') || trimmed.includes('Contoh: "')) {
          const exText = trimmed.replace(/^Contoh:\s*/, '');
          return <ExampleQuoteBox key={idx} text={exText} />;
        }

        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          return (
            <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
              <p className="flex-1 font-semibold text-slate-800">{trimmed.replace(/^[•-]\s*/, '')}</p>
            </div>
          );
        }

        if (trimmed.match(/^[0-9]+\./)) {
          return (
            <div key={idx} className="font-extrabold text-indigo-950 mt-3 mb-1 text-base">
              {trimmed}
            </div>
          );
        }

        return <p key={idx}>{trimmed}</p>;
      })}
    </div>
  );
}

/**
 * Standard Card View
 */
function StandardCardView({ title, iconEmoji, lines }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl shadow-purple-900/5 mb-8"
    >
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-indigo-50">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
          {iconEmoji || '📌'}
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
          {title}
        </h3>
      </div>

      <StandardLinesRenderer lines={lines} />
    </motion.div>
  );
}

/**
 * Main Formatter Component
 */
export default function GrammarExplanationFormatter({ explanation }) {
  if (!explanation) return null;

  // Split into raw sections based on emoji headers (📌, 📊, 🔍, ⏰, ⚠️, ⚔️, ⚡, 🎯, 💡)
  const headerRegex = /^(📌|📊|🔍|⏰|⚠️|⚔️|⚡|🎯|💡)\s*(.*)/;
  const lines = explanation.split('\n');
  const sections = [];
  let currentSec = null;

  for (let line of lines) {
    const match = line.match(headerRegex);
    if (match) {
      if (currentSec) sections.push(currentSec);
      currentSec = {
        emoji: match[1],
        title: match[2].trim(),
        lines: []
      };
    } else {
      if (currentSec) {
        currentSec.lines.push(line);
      } else {
        currentSec = {
          emoji: '📌',
          title: 'Penjelasan Utama',
          lines: [line]
        };
      }
    }
  }
  if (currentSec) sections.push(currentSec);

  return (
    <div className="w-full space-y-6">
      {sections.map((sec, idx) => {
        const titleUpper = sec.title.toUpperCase();

        // 1. WARNING CARD (Kesalahan Umum)
        if (sec.emoji === '⚠️' || titleUpper.includes('KESALAHAN UMUM') || titleUpper.includes('MISTAKES')) {
          return <WarningMistakesCard key={idx} title={sec.title} lines={sec.lines} />;
        }

        // 2. FORMULA & PATTERN CARD (Must check BEFORE functions to avoid stealing formula bullets)
        if (sec.emoji === '📊' || titleUpper.includes('RUMUS') || titleUpper.includes('POLA KALIMAT')) {
          return <FormulaCardView key={idx} title={sec.title} lines={sec.lines} />;
        }

        // 3. FUNCTIONS GRID VIEW ("Fungsi Utama", "Empat Fungsi", etc.)
        if (titleUpper.includes('FUNGSI') || sec.lines.some(l => l.includes('Fungsi Utama'))) {
          // Parse function items
          const items = [];
          let introText = '';
          let currentItem = null;

          for (let l of sec.lines) {
            const tr = l.trim();
            if (!tr) continue;

            if (tr.startsWith('•') || tr.startsWith('-')) {
              if (currentItem) items.push(currentItem);

              // Extract title, desc, examples
              const colonIdx = tr.indexOf(':');
              let itemTitle = 'Fungsi';
              let itemDesc = '';

              if (colonIdx !== -1) {
                itemTitle = tr.substring(0, colonIdx).replace(/^[•-]\s*/, '').trim();
                itemDesc = tr.substring(colonIdx + 1).trim();
              } else {
                itemTitle = tr.replace(/^[•-]\s*/, '').trim();
              }

              // Icon mapping based on title keywords
              let icon = '📌';
              const titleLower = itemTitle.toLowerCase();
              if (titleLower.includes('kebiasaan') || titleLower.includes('rutinitas') || titleLower.includes('habit')) icon = '🔄';
              else if (titleLower.includes('fakta') || titleLower.includes('kebenaran') || titleLower.includes('truth')) icon = '🌍';
              else if (titleLower.includes('permanen') || titleLower.includes('situation')) icon = '🏢';
              else if (titleLower.includes('jadwal') || titleLower.includes('timetable') || titleLower.includes('schedule')) icon = '📅';
              else if (titleLower.includes('sekarang') || titleLower.includes('now')) icon = '⚡';
              else if (titleLower.includes('rencana') || titleLower.includes('future')) icon = '🎯';
              else if (titleLower.includes('pengalaman') || titleLower.includes('experience')) icon = '🏆';
              else if (titleLower.includes('berubah') || titleLower.includes('changing')) icon = '📈';

              currentItem = {
                title: itemTitle,
                desc: itemDesc,
                icon: icon,
                examples: []
              };
            } else if (tr.startsWith('Contoh:') || tr.includes('Contoh:')) {
              const exStr = tr.replace(/^Contoh:\s*/, '');
              const exList = exStr.split(' / ').map(e => e.trim());
              if (currentItem) {
                currentItem.examples.push(...exList);
              }
            } else if (!currentItem) {
              introText += (introText ? '\n' : '') + tr;
            }
          }
          if (currentItem) items.push(currentItem);

          if (items.length > 0) {
            return (
              <FunctionsGridView
                key={idx}
                title={sec.title}
                introText={introText}
                items={items}
              />
            );
          }
        }

        // 4. ACCORDION COLLAPSIBLE CARD (for long rule sections like Aturan -ing / -ed / Irregular Verbs)
        if (sec.emoji === '🔍' || titleUpper.includes('ATURAN') || titleUpper.includes('IRREGULAR VERBS') || sec.lines.length > 15) {
          return (
            <CollapsibleSection
              key={idx}
              title={sec.title}
              iconEmoji={sec.emoji}
              lines={sec.lines}
              defaultOpen={idx === 0 || sec.emoji === '🔍'}
            />
          );
        }

        // 5. STANDARD CARD
        return (
          <StandardCardView
            key={idx}
            title={sec.title}
            iconEmoji={sec.emoji}
            lines={sec.lines}
          />
        );
      })}
    </div>
  );
}
