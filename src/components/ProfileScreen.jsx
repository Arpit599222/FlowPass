import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Save, Camera, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ProfileScreen = () => {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [password, setPassword] = useState(""); // Simplified: enter new to change
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate() {
    try {
      setLoading(true);
      setMessage("");
      
      const updates = { displayName };
      if (password) {
        updates.password = password;
      }
      
      await updateUserProfile(updates);
      setMessage("Profile updated successfully!");
      setPassword(""); // Clear password field after save
    } catch (err) {
      setMessage("Failed to update profile.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-8 pb-32 pt-6 items-center">
      <div className="w-full">
        <h2 className="text-3xl font-outfit font-black text-white">Your Profile</h2>
        <p className="text-white/40 text-sm">Security & personalization</p>
      </div>

      <div className="w-full flex flex-col gap-6">
        {/* User Stats Card */}
        <div className="glass-card p-10 flex flex-col items-center gap-4 relative overflow-hidden bg-indigo-500/5">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl shadow-indigo-500/20">
              <img 
                src={currentUser?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full border-4 border-[#0a0c18] group-hover:scale-110 transition-transform">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">{currentUser?.displayName || "Stadium Guest"}</h3>
            <div className="flex items-center gap-1.5 justify-center text-indigo-400">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Account</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <User size={120} />
          </div>
        </div>

        {/* Edit Fields */}
        <div className="flex flex-col gap-4">
          <div className="glass-card p-6 flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Full Name</label>
            <div className="flex items-center gap-3">
              <User size={18} className="text-indigo-400" />
              <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-medium"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">New Password</label>
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-indigo-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-medium"
                placeholder="•••••••• (leave blank to keep)"
              />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col gap-2 bg-white/[0.01] opacity-60">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Email (Login ID)</label>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-white/40" />
              <span className="text-white/80">{currentUser?.email}</span>
            </div>
          </div>
        </div>

        {message && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center text-[11px] font-bold py-3 px-4 rounded-2xl border ${message.includes("successfully") ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
          >
            {message}
          </motion.p>
        )}

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={handleUpdate}
            className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Update Security Settings"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="w-full bg-white/5 border border-white/10 text-white/40 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all font-outfit"
          >
            <LogOut size={18} />
            Secure Logout
          </motion.button>
        </div>
      </div>
    </div>
  );
};
