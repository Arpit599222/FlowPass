import React from 'react';
import { motion } from 'framer-motion';

export const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#05070a] text-slate-900 dark:text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-outfit font-black tracking-tighter text-slate-900 dark:text-white mb-2"
          >
            {title}
          </motion.h1>
          <p className="text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">{subtitle}</p>
        </div>

        <div className="glass-card p-8 bg-white/60 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl">
          {children}
        </div>

        {footer && (
          <div className="mt-8 text-center text-slate-600 dark:text-white/30">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
};
