import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, Sparkles } from 'lucide-react';

export const NotificationOverlay = React.memo(({ alerts }) => {
  // Navigation logic
  // Improved readability and maintainability without altering functionality
  return (
    <div className="absolute top-5 right-5 z-[1000] w-72 flex flex-col gap-3 pointer-events-auto max-h-[250px] overflow-y-auto no-scrollbar scroll-smooth pr-1">
      <AnimatePresence mode="popLayout" initial={false}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`p-3 rounded-2xl border backdrop-blur-xl flex items-start gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] shrink-0 group ${
                alert.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-slate-900/80 border-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 group-hover:scale-110 transition-transform ${alert.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-indigo-400'}`}>
                {alert.type === 'success' ? <CheckCircle2 size={14} /> : <Zap size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white leading-snug">{alert.text}</p>
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">{alert.time}</p>
                  {alert.type === 'success' && <Sparkles size={10} className="text-emerald-500/50" />}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-full self-end">
            <CheckCircle2 size={12} className="text-emerald-500/50" />
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest px-2">Flow Stable</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
