import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-white/10 rounded-[32px] p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6 text-red-500">
          <AlertTriangle size={32} />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">Delete Account?</h3>
        <p className="text-sm text-white/40 mb-8 leading-relaxed">
          This will permanently delete your account and all associated data. This action cannot be undone.
        </p>
        
        <div className="w-full flex flex-col gap-3">
          <button 
            disabled={loading}
            onClick={onConfirm}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Permanently Delete Account"}
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-white/5 text-white/40 font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl hover:bg-white/10 transition-all font-outfit"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
