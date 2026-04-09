import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Lock, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginScreen = () => {
  const { login, resetAllAccounts } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      return setError("Please enter a valid email address.");
    }
    if (password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setError(err.message || "Incorrect password or account error.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#05070a] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm glass-card p-10 flex flex-col items-center text-center gap-10 border-indigo-500/20 shadow-indigo-500/10 relative z-10"
      >
        <div>
          <h1 className="text-4xl font-outfit font-black tracking-tighter text-white mb-2 underline decoration-indigo-500 decoration-4 underline-offset-8">
            FlowPass
          </h1>
          <p className="text-white/40 text-[10px] mt-8 font-bold uppercase tracking-[0.4em]">Secure Smart Entry</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Email Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={16} className="text-indigo-400 opacity-50 group-focus-within:opacity-100 transition-opacity" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none focus:border-indigo-500/30 focus:bg-white/[0.06] transition-all font-medium text-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={16} className="text-indigo-400 opacity-50 group-focus-within:opacity-100 transition-opacity" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white/20 outline-none focus:border-indigo-500/30 focus:bg-white/[0.06] transition-all font-medium text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/20 hover:text-white/60 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#fff' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-white/5 transition-all mt-4"
          >
            {loading ? "Authenticating..." : "Join Smart Arena"}
            <ArrowRight size={18} />
          </motion.button>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-[11px] font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20"
            >
              {error}
            </motion.p>
          )}
        </form>

        <div className="pt-4 border-t border-white/5 w-full flex flex-col gap-4">
          <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.2em] leading-relaxed">
            First time? Any password sets your account.
          </p>
          <button 
            onClick={resetAllAccounts}
            className="flex items-center gap-2 text-[10px] font-bold text-white/10 hover:text-indigo-400 transition-colors mx-auto uppercase tracking-widest"
          >
            <RotateCcw size={12} /> Reset App Data
          </button>
        </div>
      </motion.div>
      
      {/* Background Decorative Effects */}
      <div className="fixed top-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] -z-10" />
    </div>
  );
};
