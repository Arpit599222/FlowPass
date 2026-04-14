import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map, Utensils, Ticket } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'queue', icon: Utensils, label: 'Queues' },
  { id: 'ticket', icon: Ticket, label: 'Ticket' },
];

export const BottomNav = React.memo(({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[450px] z-50 transition-all duration-200">
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-full p-2 px-6 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative p-3 transition-all duration-200 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 group"
            >
              <div className={`relative z-10 transition-all duration-300 ${
                isActive 
                  ? "text-indigo-500 dark:text-indigo-400 scale-125 translate-y-[-4px] drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                  : "text-slate-400 hover:text-slate-900 dark:text-white/30 dark:hover:text-white"
              }`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="active-tab-glow"
                  className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl"
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                />
              )}

              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,1)]"
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
});
