import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Zap, Utensils, Ticket, ArrowUpRight, Signal, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ActionButton = ({ icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="glass-card p-4 md:p-6 flex flex-col items-center justify-center gap-2 w-full border-none shadow-none bg-white/[0.04] glass-card-hover"
  >
    <Icon className="text-indigo-400 group-hover:text-indigo-300" size={24} />
    <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest">{label}</span>
  </motion.button>
);

export const Dashboard = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group relative"
          >
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center">
                <User size={20} className="text-indigo-400" />
              </div>
            )}
          </motion.button>
          <div>
            <h1 className="text-xl md:text-2xl font-outfit font-black tracking-tight text-white leading-none">
              Hello, {currentUser?.displayName?.split(' ')[0] || 'Guest'}
            </h1>
            <p className="text-white/30 text-xs md:text-sm mt-1 uppercase tracking-widest font-bold">Smart Pass Active</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3.5 rounded-2xl bg-white/5 border border-white/10 relative"
        >
          <Bell size={20} className="text-white/60" />
          <div className="absolute top-3.5 right-3.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#05070a]" />
        </motion.button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Smart Path Card - Full Width on all screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 glass-card p-6 md:p-8 bg-indigo-500/10 border-indigo-500/30 overflow-hidden relative group"
        >
          <div className="flex gap-6 items-start relative z-10">
            <div className="p-4 bg-indigo-500 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Zap size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-white">Smart Route Strategy Active</h3>
              <p className="text-white/60 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                We've detected heavy congestion near the main concourse. Your personalized route through **Gate 4 Corridor** is currently saving you an average of 12 minutes.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigate('map')}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                >
                  NAVIGATE NOW <ArrowUpRight size={14} />
                </button>
                <div className="bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center">
                  Confidence Score: 98%
                </div>
              </div>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-colors duration-500" />
        </motion.div>

        {/* 2. Crowd Level Card */}
        <div className="glass-card p-6 md:p-8 flex flex-col justify-between h-full min-h-[160px]">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Signal size={20} className="text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-widest">
              Stable
            </span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Current Density</h4>
            <p className="text-2xl font-bold text-white mb-3">Moderate Flow</p>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* 3. Closest Gate Card */}
        <div className="glass-card p-6 md:p-8 flex flex-col justify-between h-full min-h-[160px]">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <MapPin size={20} className="text-white/60" />
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">G4 SOUTH</span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Nearest Gateway</h4>
            <div className="flex justify-between items-baseline">
              <p className="text-3xl font-black text-white font-outfit uppercase">Gate 4</p>
              <p className="text-sm text-indigo-400 font-bold">350m</p>
            </div>
          </div>
        </div>

        {/* 4. Mini Insights / Weather (Added for Desktop Balance) */}
        <div className="glass-card p-6 md:p-8 flex flex-col justify-between h-full min-h-[160px] md:col-span-2 lg:col-span-1 border-dashed border-white/5 bg-transparent">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Bell size={20} className="text-amber-400" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Info</span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Smart Info</h4>
            <p className="text-sm font-medium text-white/60 leading-tight">
              Food stall wait times are currently 15% lower than average.
            </p>
          </div>
        </div>
      </div>

      {/* Action Sections - Always centered regardless of device */}
      <div className="pt-4">
        <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-6 text-center">Quick Navigation</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton 
            icon={MapPin} 
            label="Find My Seat" 
            onClick={() => onNavigate('map')}
          />
          <ActionButton 
            icon={Utensils} 
            label="Order Food" 
            onClick={() => onNavigate('queue')}
          />
          <ActionButton 
            icon={Ticket} 
            label="View Ticket" 
            onClick={() => onNavigate('ticket')}
          />
          <ActionButton 
            icon={Bell} 
            label="View Alerts" 
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
