import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Clock, Thermometer } from 'lucide-react';

export const NavigationScreen = () => {
  const [showPath, setShowPath] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPath(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-32 pt-6 h-full min-h-[85vh]">
      <div className="px-2">
        <h2 className="text-2xl font-outfit font-bold">Live Navigation</h2>
        <p className="text-white/40 text-sm">Optimal path to Section 104, Row 12</p>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative glass-card min-h-[400px] overflow-hidden bg-white/5 border-none p-0">
        <svg 
          viewBox="0 0 400 500" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.2))' }}
        >
          {/* Outer Stadium Ring */}
          <path 
            d="M50 150 Q200 100 350 150 Q400 300 350 450 Q200 500 50 450 Q0 300 50 150Z" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="30"
          />
          
          {/* Seating Tiers */}
          <path 
            d="M80 180 Q200 140 320 180 Q350 300 320 420 Q200 460 80 420 Q50 300 80 180Z" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="20"
          />

          {/* Heatmap Pulsing Zones */}
          <g>
            <circle cx="330" cy="220" r="25" fill="#ef4444" fillOpacity="0.2">
              <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="70" cy="300" r="20" fill="#f59e0b" fillOpacity="0.2">
              <animate attributeName="r" values="20;30;20" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="450" r="15" fill="#10b981" fillOpacity="0.1">
              <animate attributeName="r" values="15;25;15" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* User Location */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <circle cx="200" cy="480" r="8" fill="#6366f1" className="glow-indigo" />
            <circle cx="200" cy="480" r="12" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" values="8;20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
            </circle>
          </motion.g>

          {/* Navigation Path */}
          {showPath && (
            <motion.path
              d="M200 480 Q250 480 280 450 T320 380 T330 280 T310 200"
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeDasharray="200"
              initial={{ strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          )}

          {/* Target Location */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, type: "spring" }}
          >
            <circle cx="310" cy="200" r="6" fill="#a855f7" />
            <path d="M310 200 L310 180 M305 185 L310 180 L315 185" stroke="#a855f7" strokeWidth="2" fill="none" />
          </motion.g>
        </svg>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> High Crowd
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Clear Path
          </div>
        </div>

        {/* Floating Stats Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-6 right-6 glass-card p-4 flex justify-between items-center shadow-indigo-500/20 shadow-xl border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Navigation size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">4 min to ETA</p>
              <p className="text-xs text-white/40">320m through Gate 4</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-emerald-400">
                <Clock size={12} />
                <span className="text-xs font-bold">Fast</span>
              </div>
              <p className="text-[10px] text-white/30 uppercase">Status</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
