import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthLayout } from '../components/Auth/AuthLayout';

export const RecoveryScreen = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return setError('Please enter your email');
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (err) {
      setError('Failed to reset password. Please check your email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Account Recovery"
      footer={
        <button onClick={onSwitch} className="flex items-center justify-center gap-2 text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs font-bold uppercase tracking-widest transition-colors w-full">
          <ArrowLeft size={14} /> Back to Sign In
        </button>
      }
    >
      <form onSubmit={handleReset} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
            {error}
          </div>
        )}
        
        {message && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-[10px] font-black uppercase tracking-widest text-center">
            {message}
          </div>
        )}

        <div className="space-y-1.5 flex flex-col">
          <label className="text-[9px] font-black text-slate-500 dark:text-white/40 uppercase tracking-[0.2em] ml-2 transition-colors">Registered Email</label>
          <div className="relative flex items-center">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white text-sm font-bold focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-white/30"
              placeholder="name@company.com"
            />
            <Mail className="absolute left-4 text-slate-400 dark:text-white/20 transition-colors" size={18} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Send Reset Link</>}
        </button>
      </form>
    </AuthLayout>
  );
};
