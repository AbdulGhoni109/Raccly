import React from 'react';

/**
 * Reusable Background component with subtle, elegant cloud elements and soft ambient lighting.
 * Replaces love/flower emojis with gentle, non-intrusive clouds.
 */
export default function BackgroundClouds() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none select-none">
      {/* Soft Ambient Glowing Blobs */}
      <div className="absolute top-[-8%] left-[-5%] w-[420px] h-[420px] bg-[#A78BFA] rounded-full opacity-20 blur-[100px]" />
      <div className="absolute top-[30%] right-[-8%] w-[450px] h-[450px] bg-[#38BDF8] rounded-full opacity-15 blur-[110px]" />
      <div className="absolute bottom-[-8%] left-[10%] w-[500px] h-[500px] bg-[#C084FC] rounded-full opacity-15 blur-[120px]" />

      {/* Subtle Sunburst / Flowerline Art */}
      <svg className="absolute -top-12 -left-12 w-80 h-80 opacity-10 text-white stroke-current" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="20" strokeWidth="0.8" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="50" x2={50 + 38 * Math.cos((i * Math.PI) / 6)} y2={50 + 38 * Math.sin((i * Math.PI) / 6)} strokeWidth="0.6" />
        ))}
      </svg>

      {/* Cloud 1: Top Left Subtle Cloud */}
      <svg
        className="absolute top-[5%] left-[8%] w-48 h-28 opacity-15 text-white fill-current transform -rotate-3"
        viewBox="0 0 24 24"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* Cloud 2: Top Right Large Soft Cloud */}
      <svg
        className="absolute top-[12%] right-[6%] w-64 h-36 opacity-10 text-white fill-current transform rotate-2"
        viewBox="0 0 24 24"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* Cloud 3: Mid Left Floating Cloud */}
      <svg
        className="absolute top-[45%] left-[-2%] w-56 h-32 opacity-12 text-white fill-current transform rotate-6"
        viewBox="0 0 24 24"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* Cloud 4: Bottom Right Cloud */}
      <svg
        className="absolute bottom-[10%] right-[8%] w-52 h-30 opacity-12 text-white fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* Subtle floating sparkles */}
      <div className="absolute top-[18%] left-[25%] text-white/25 text-base">✨</div>
      <div className="absolute bottom-[22%] left-[18%] text-white/20 text-sm">✨</div>
      <div className="absolute top-[35%] right-[22%] text-white/25 text-sm">✨</div>
    </div>
  );
}
