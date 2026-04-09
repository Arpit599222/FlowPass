import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { NavigationScreen } from './components/NavigationScreen';
import { QueueHub } from './components/QueueHub';
import { TicketScreen } from './components/TicketScreen';
import { LoginScreen } from './components/LoginScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SplashScreen } from './components/SplashScreen';

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '5%' : '-5%',
    opacity: 0,
    filter: 'blur(10px)'
  }),
  animate: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)'
  },
  exit: (direction) => ({
    x: direction < 0 ? '5%' : '-5%',
    opacity: 0,
    filter: 'blur(10px)'
  }),
};

const tabOrder = ['home', 'map', 'queue', 'ticket', 'profile'];

function AppContent() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [direction, setDirection] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (newTab) => {
    const prevIndex = tabOrder.indexOf(activeTab);
    const nextIndex = tabOrder.indexOf(newTab);
    setDirection(nextIndex > prevIndex ? 1 : -1);
    setActiveTab(newTab);

    if (window.navigator?.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  if (showSplash) return <SplashScreen />;

  if (!currentUser) return <LoginScreen />;

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard key="home" onNavigate={handleTabChange} />;
      case 'map': return <NavigationScreen key="map" />;
      case 'queue': return <QueueHub key="queue" />;
      case 'ticket': return <TicketScreen key="ticket" />;
      case 'profile': return <ProfileScreen key="profile" />;
      default: return <Dashboard key="home" onNavigate={handleTabChange} />;
    }
  };

  return (
    /* The App Root is now the primary scroll-locked viewport */
    <div className="h-[100dvh] w-full bg-[#05070a] overflow-hidden flex flex-col items-center relative">
      <div className="w-full h-full max-w-md md:max-w-4xl lg:max-w-6xl relative flex flex-col">
        
        {/* Scrollable Container - This is where all scrolling happens */}
        <div className="flex-1 w-full relative overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                filter: { duration: 0.2 }
              }}
              /* Large padding-bottom to clear the floating nav bar */
              className="w-full px-6 pt-6 pb-48"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Floating Nav - Anchored to the bottom of the viewport */}
        <div className="fixed bottom-10 left-0 right-0 flex justify-center px-6 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        </div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
