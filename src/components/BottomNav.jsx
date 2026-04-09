import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map, Utensils, Ticket } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'queue', icon: Utensils, label: 'Queues' },
  { id: 'ticket', icon: Ticket, label: 'Ticket' },
];

export const BottomNav = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[450px] z-50">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 px-6 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/15">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative p-3 transition-all duration-300"
            >
              <div className={cn(
                "relative z-10 transition-all duration-300",
                isActive ? "text-indigo-400 scale-125 translate-y-[-2px]" : "text-white/30 hover:text-white/60"
              )}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="active-tab-glow"
                  className="absolute inset-0 bg-indigo-500/15 rounded-2xl blur-md"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
