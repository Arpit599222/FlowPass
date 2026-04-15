import React, { useCallback } from 'react';
import { motion } from 'framer-motion';

const PRESET_AVATARS = [
  { id: 'av1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { id: 'av2', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: 'av3', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Tech' },
  { id: 'av4', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cyber' },
  { id: 'av5', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=Minimal1' },
  { id: 'av6', url: 'https://api.dicebear.com/7.x/shapes/svg?seed=Minimal2' }
];

const AvatarOption = React.memo(({ preset, currentUrl, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(preset.url);
  }, [onSelect, preset.url]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden transition-all duration-300 border-2 ${currentUrl === preset.url ? 'border-indigo-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
    >
      <img src={preset.url} alt="Avatar option" className="w-full h-full object-cover bg-white/5" />
    </button>
  );
});

export const AvatarPicker = React.memo(({ currentUrl, onSelect }) => {
  // Optimized rendering to reduce unnecessary re-renders
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full flex justify-center gap-3 overflow-x-auto py-2 no-scrollbar"
    >
      {PRESET_AVATARS.map((preset) => (
        <AvatarOption 
          key={preset.id} 
          preset={preset} 
          currentUrl={currentUrl} 
          onSelect={onSelect} 
        />
      ))}
    </motion.div>
  );
});
