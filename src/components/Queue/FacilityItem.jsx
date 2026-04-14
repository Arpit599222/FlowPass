import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Droplets, Info } from 'lucide-react';

export const FacilityItem = React.memo(({ 
  name, 
  type, 
  waitTime, 
  recommended, 
  priceRange = '$$', 
  isLoading 
}) => {
  const Icon = type === 'food' ? Utensils : type === 'cafe' ? Coffee : Droplets;
  const statusColor = waitTime < 10 ? 'text-emerald-400' : waitTime < 20 ? 'text-yellow-400' : 'text-red-400';
  const barColor = waitTime < 10 ? 'bg-emerald-500' : waitTime < 20 ? 'bg-yellow-500' : 'bg-red-500';

  if (isLoading) {
    return (
      <div className="glass-card p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-2xl skeleton" />
            <div className="space-y-2">
              <div className="w-24 h-4 skeleton" />
              <div className="w-12 h-2 skeleton opacity-50" />
            </div>
          </div>
          <div className="w-16 h-8 skeleton rounded-xl" />
        </div>
        <div className="w-full h-1.5 skeleton rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card p-4 transition-all duration-300 overflow-hidden relative group ${
        recommended ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-lg">
          Recommended
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <div className={`p-3 rounded-2xl transition-all ${recommended ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10'}`}>
            <Icon size={20} className={recommended ? 'text-white' : 'text-indigo-400'} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">{name}</h4>
            <div className="flex items-center gap-2 mt-1">
               <p className="text-slate-500 dark:text-white/30 text-[8px] uppercase tracking-[0.2em] font-black">{priceRange}</p>
               <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/10" />
               <p className="text-slate-500 dark:text-white/30 text-[8px] uppercase tracking-[0.2em] font-black">{type}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-outfit font-black ${statusColor} drop-shadow-sm`}>
            {waitTime} <span className="text-xs font-bold opacity-60">min</span>
          </p>
          <p className="text-[9px] text-slate-400 dark:text-white/20 font-black uppercase tracking-tighter mt-0.5">Est. wait time</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-slate-200 dark:bg-white/5 rounded-full h-1.5 my-auto overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (waitTime / 30) * 100)}%` }}
            className={`h-full ${barColor} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
          />
        </div>
        <button className="text-slate-400 dark:text-white/20 hover:text-indigo-500 dark:hover:text-indigo-400 p-1 transition-colors" aria-label={`More info about ${name}`}>
          <Info size={16} />
        </button>
      </div>
    </motion.div>
  );
});
