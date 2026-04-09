import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Calendar, MapPin, Armchair, ChevronUp } from 'lucide-react';

export const TicketScreen = () => {
  return (
    <div className="flex flex-col gap-8 pb-32 pt-6 items-center">
      <div className="w-full px-2 self-start">
        <h2 className="text-2xl font-outfit font-bold">Your Digital Pass</h2>
        <p className="text-white/40 text-sm">Valid for Tonight's Match</p>
      </div>

      {/* Ticket Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm flex flex-col"
      >
        {/* Top Part */}
        <div className="bg-indigo-600 rounded-t-[40px] p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Match Day</p>
                <h3 className="text-2xl font-outfit font-black">STORM VS<br/>TITANS</h3>
              </div>
              <div className="text-right">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Gate</p>
                <h3 className="text-4xl font-outfit font-black">G4</h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-indigo-500/50 pt-6">
              <div>
                <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-widest mb-1">Section</p>
                <p className="font-bold">104</p>
              </div>
              <div>
                <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-widest mb-1">Row</p>
                <p className="font-bold">12</p>
              </div>
              <div>
                <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-widest mb-1">Seat</p>
                <p className="font-bold">42</p>
              </div>
            </div>
          </div>
          
          {/* Decorative rings */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute top-20 left-0 -ml-10 w-20 h-20 bg-indigo-400/20 rounded-full blur-2xl" />
        </div>

        {/* Perforation Line */}
        <div className="relative h-6 bg-white flex items-center justify-between px-0 overflow-hidden">
          <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--color-stadium-dark)]" />
          <div className="w-full border-t-2 border-dashed border-slate-200 mx-6" />
          <div className="absolute right-0 translate-x-1/2 w-6 h-6 rounded-full bg-[var(--color-stadium-dark)]" />
        </div>

        {/* Bottom Part (QR Code) */}
        <div className="bg-white rounded-b-[40px] p-10 flex flex-col items-center">
          <div className="relative p-4 bg-white rounded-3xl border-2 border-slate-100 shadow-xl mb-6">
            <div className="w-48 h-48 bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Mock QR Content */}
              <div className="grid grid-cols-6 gap-1 w-[80%] h-[80%] opacity-90">
                {[...Array(36)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'} rounded-sm transition-colors duration-1000`}
                    style={{ animationDelay: `${i * 20}ms` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-2 rounded-lg shadow-lg">
                  <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                    <QrCode size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Tap to Enlarge</p>
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 text-[10px] font-black uppercase">Ready for Scan</span>
          </div>
        </div>
      </motion.div>

      {/* Usage Tooltip */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center gap-2 text-white/30 mt-4"
      >
        <ChevronUp size={20} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Entry Instructions</span>
      </motion.div>
    </div>
  );
};
