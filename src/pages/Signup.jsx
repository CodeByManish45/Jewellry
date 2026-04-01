import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatedButton } from '../components/AnimatedButton';
import { Loader2, Mail, Lock, UserPlus, UserCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    
    setIsSubmitting(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      toast.success('Your collection account is ready!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-beige-50 min-h-screen flex items-center justify-center pt-28 pb-12 px-4 italic-font-fix">
      <div className="bg-white p-8 sm:p-12 w-full max-w-md border border-beige-200 shadow-xl rounded-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full border border-gold-500 bg-gold-50 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UserPlus className="text-gold-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif text-slate-900 tracking-widest uppercase mb-2">Create Account</h1>
          <p className="text-[10px] text-slate-400 font-bold tracking-[0.15em] uppercase">Join the Sumit Jewellers Elite Collective</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold group-focus-within:text-gold-600 transition-colors">Full Name</label>
            <div className="relative">
              <UserCircle2 className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
              <input 
                name="name"
                type="text" 
                required 
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-beige-200 pl-8 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                placeholder="John Doe" 
              />
            </div>
          </div>
          
          <div className="relative group">
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold group-focus-within:text-gold-600 transition-colors">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
              <input 
                name="email"
                type="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-beige-200 pl-8 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                placeholder="email@example.com" 
              />
            </div>
          </div>
          
          <div className="relative group">
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold group-focus-within:text-gold-600 transition-colors">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
              <input 
                name="password"
                type="password" 
                required 
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-beige-200 pl-8 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                placeholder="••••••••" 
              />
            </div>
          </div>
          
          <div className="relative group">
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold group-focus-within:text-gold-600 transition-colors">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
              <input 
                name="confirmPassword"
                type="password" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-beige-200 pl-8 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                placeholder="••••••••" 
              />
            </div>
          </div>
          
          <AnimatedButton 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 tracking-[0.2em] text-xs font-bold uppercase transition-all shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                Processing Registry...
              </>
            ) : (
              <>
                Initialize Account
                <UserPlus className="w-3 h-3 text-white/50 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </AnimatedButton>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Already recognized by boutique?</p>
          <Link 
            to="/login"
            className="inline-block text-[11px] tracking-[0.2em] uppercase text-gold-600 font-bold border-b border-gold-600 hover:text-slate-900 hover:border-slate-900 transition-all pb-1"
          >
            Access Existing Account
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-beige-100 text-center">
           <p className="text-[9px] text-slate-400 uppercase tracking-widest font-light">
             Secured by &bull; Sumit Jewellers Systems
           </p>
        </div>
      </div>
    </div>
  );
};
