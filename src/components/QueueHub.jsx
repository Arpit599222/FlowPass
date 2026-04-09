import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Droplets, Info, CheckCircle2, ChevronRight } from 'lucide-react';

const FacilityItem = ({ name, type, waitTime, status, recommended, priceRange }) => {
  const Icon = type === 'food' ? Utensils : type === 'cafe' ? Coffee : Droplets;
  const statusColor = waitTime < 10 ? 'text-emerald-400' : waitTime < 20 ? 'text-yellow-400' : 'text-red-400';

  return (
    <motion.div
      layout
      className={`glass-card p-4 transition-all duration-500 overflow-hidden relative ${
        recommended ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10'
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
          Recommended
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <div className={`p-3 rounded-2xl ${recommended ? 'bg-indigo-500' : 'bg-white/5'} transition-colors duration-500`}>
            <Icon size={20} className={recommended ? 'text-white' : 'text-white/60'} />
          </div>
          <div>
            <h4 className="font-bold text-white">{name}</h4>
            <p className="text-white/30 text-xs uppercase tracking-widest font-bold">{priceRange || '$$'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-outfit font-black ${statusColor}`}>
            {waitTime} <span className="text-xs font-normal text-white/40">min</span>
          </p>
          <p className="text-[10px] text-white/30 truncate">Est. wait time</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-white/5 rounded-full h-1 my-auto overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (waitTime / 30) * 100)}%` }}
            className={`h-full ${statusColor.replace('text-', 'bg-')}`}
          />
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <Info size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export const QueueHub = () => {
  return (
    <div className="flex flex-col gap-6 pb-32 pt-6">
      <div className="px-2">
        <h2 className="text-2xl font-outfit font-bold">Smart Queues</h2>
        <p className="text-white/40 text-sm">Real-time wait times for nearby facilities</p>
      </div>

      {/* Suggestion Card */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-indigo-300">
            <CheckCircle2 size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Smart Suggestion</span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight mb-2">
            "Stall B" is much faster than "Stall A" right now.
          </h3>
          <p className="text-white/60 text-sm mb-4">You can save approximately 14 minutes by walking 2 minutes further.</p>
          <button className="bg-white text-indigo-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:bg-indigo-50 transition-colors">
            Take Me There <ChevronRight size={16} />
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col gap-4 px-1">
        <FacilityItem 
          name="Victory Tacos" 
          type="food" 
          waitTime={22} 
          priceRange="$$"
        />
        <FacilityItem 
          name="Apex Brews" 
          type="cafe" 
          waitTime={5} 
          recommended={true}
          priceRange="$"
        />
        <FacilityItem 
          name="The Pitstop" 
          type="food" 
          waitTime={12} 
          priceRange="$$$"
        />
        <FacilityItem 
          name="Hydration Point" 
          type="rest" 
          waitTime={2} 
          priceRange="Free"
        />
      </div>
    </div>
  );
};
