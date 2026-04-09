import React from 'react';
import { motion } from 'framer-motion';

export const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#05070a] flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.h1 
            className="text-6xl font-outfit font-black tracking-tighter text-white z-10 relative"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(99, 102, 241, 0)",
                "0 0 40px rgba(99, 102, 241, 0.4)",
                "0 0 20px rgba(99, 102, 241, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FlowPass
          </motion.h1>
          
          {/* Animated rings around logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 border-2 border-indigo-500 rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">
            Apex Stadium Solutions
          </p>
          
          {/* Loading Indicator */}
          <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-indigo-500"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] -z-10"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600 rounded-full blur-[120px] -z-10"
      />
    </div>
  );
};
