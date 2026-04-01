import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatedButton } from '../components/AnimatedButton';
import { Loader2, Mail, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-beige-50 min-h-screen flex items-center justify-center pt-28 pb-12 px-4 italic-font-fix">
      <div className="bg-white p-8 sm:p-12 w-full max-w-md border border-beige-200 shadow-xl rounded-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full border border-gold-500 bg-gold-50 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <LogIn className="text-gold-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif text-slate-900 tracking-widest uppercase mb-2">Welcome Back</h1>
          <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">Enter your credentials to access the boutique</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold transition-colors group-focus-within:text-gold-600">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-beige-200 pl-8 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                placeholder="email@example.com" 
              />
            </div>
          </div>
          
          <div className="relative group">
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold transition-colors group-focus-within:text-gold-600">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-beige-200 pl-8 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                placeholder="••••••••" 
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Link to="/forgot-password" size="sm" className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-gold-600 transition-colors font-medium">Forgot Password?</Link>
          </div>
          
          <AnimatedButton 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 tracking-[0.2em] text-xs uppercase transition-all shadow-lg flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In
                <LogIn className="w-3 h-3 text-white/50 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </AnimatedButton>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Don't have an account?</p>
          <Link 
            to="/signup"
            className="inline-block text-[11px] tracking-[0.2em] uppercase text-gold-600 font-bold border-b border-gold-600 hover:text-slate-900 hover:border-slate-900 transition-all pb-1"
          >
            Create Collective Account
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-beige-100 flex flex-col items-center gap-2">
           <span className="text-[9px] text-slate-300 uppercase tracking-[0.3em]">Demo Access</span>
           <div className="flex gap-4">
             <span className="text-[8px] text-slate-400 uppercase tracking-wider">Admin: admin@sumitjewellers.com / admin123</span>
           </div>
        </div>
      </div>
    </div>
  );
};
