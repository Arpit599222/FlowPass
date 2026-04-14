import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = React.memo(({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  status, 
  statusColor = 'emerald', 
  progress, 
  className = "" 
}) => {
  const baseColors = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    indigo: 'bg-indigo-500/20 text-indigo-400',
  };

  const barColors = {
    emerald: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    amber: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    indigo: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]',
  };

  return (
    <div className={`glass-card p-6 md:p-8 flex flex-col justify-between h-full min-h-[160px] ${className}`}>
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${value ? 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10' : baseColors[statusColor]}`}>
          <Icon size={20} className={value ? 'text-slate-500 dark:text-white/60' : ''} />
        </div>
        {status && (
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${baseColors[statusColor]}`}>
            {status}
          </span>
        )}
        {subtitle && !status && (
          <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">
            {subtitle}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-[11px] font-bold text-slate-500 dark:text-white/30 uppercase tracking-[0.2em] mb-2">{title}</h4>
        {value ? (
          <div className="flex justify-between items-baseline">
            <p className="text-3xl font-black text-slate-900 dark:text-white font-outfit uppercase">{value}</p>
            {progress && <p className="text-sm text-indigo-500 dark:text-indigo-400 font-bold">{progress}</p>}
          </div>
        ) : (
          <>
            <p className="text-2xl font-bold text-slate-700 dark:text-white mb-3">{subtitle}</p>
            {progress !== undefined && (
              <div className="h-2 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={`h-full ${barColors[statusColor]}`}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});
