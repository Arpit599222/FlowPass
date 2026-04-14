import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Share2 } from 'lucide-react';

export const TicketCard = React.memo(({ matchName, venue, area, section, row, seat, gateStatus }) => {
  return (
    <motion.section
      aria-label="Ticket details"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5 }}
      className="w-full max-w-sm flex flex-col group relative"
    >
      {/* Top Part: Branding & Primary Info */}
      <div className="bg-indigo-600 rounded-t-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Match Day</p>
              <h3 className="text-2xl font-outfit font-black leading-tight uppercase">{matchName}</h3>
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-2 bg-white/10 px-3 py-1 rounded-full inline-block">
                {gateStatus || 'System Online'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Area</p>
              <h3 className="text-4xl font-outfit font-black">{area}</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-indigo-500/30 pt-6">
            <div>
              <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-[0.15em] mb-1">Section</p>
              <p className="font-black text-lg">{section}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-[0.15em] mb-1">Row</p>
              <p className="font-black text-lg">{row}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-[0.15em] mb-1">Seat</p>
              <p className="font-black text-lg">{seat}</p>
            </div>
          </div>
        </div>
        
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-10" 
        />
      </div>

      {/* Modern Perforation */}
      <div className="relative h-6 bg-white dark:bg-slate-900 flex items-center justify-between px-0 overflow-hidden border-x border-slate-200 dark:border-white/5 transition-colors">
        <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#05070a] border border-slate-200 dark:border-white/5 transition-colors" />
        <div className="w-full border-t border-dashed border-slate-300 dark:border-white/10 mx-6 transition-colors" />
        <div className="absolute right-0 translate-x-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#05070a] border border-slate-200 dark:border-white/5 transition-colors" />
      </div>

      {/* Bottom Part: Validation & Controls */}
      <div className="bg-white dark:bg-slate-900 border-x border-b border-slate-200 dark:border-white/5 rounded-b-[40px] p-10 flex flex-col items-center transition-colors shadow-xl">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative p-4 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl mb-8 group/qr"
        >
          <div className="w-44 h-44 bg-black rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="grid grid-cols-6 gap-1 w-[80%] h-[80%] opacity-40 group-hover/qr:opacity-90 transition-opacity">
              {[...Array(36)].map((_, i) => (
                <div key={i} className={`${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'} rounded-sm`} />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-2 rounded-xl">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                  <QrCode size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Pass Verified</span>
        </div>

        <div className="flex gap-4 w-full">
          <button className="flex-1 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white transition-all text-[9px] font-black uppercase tracking-widest outline-none">
            <Download size={14} /> Offline
          </button>
          <button className="flex-1 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white transition-all text-[9px] font-black uppercase tracking-widest outline-none">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>
    </motion.section>
  );
});
