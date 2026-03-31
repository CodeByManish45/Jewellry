import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, authenticate here
    navigate('/admin'); // Redirecting to admin for demo purposes
  };

  return (
    <div className="bg-beige-100/30 min-h-[80vh] flex items-center justify-center pt-20 px-4">
      <div className="bg-white p-8 sm:p-12 w-full max-w-md border border-beige-200 shadow-sm">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-full border border-gold-500 bg-gold-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-gold-600 font-serif font-bold text-2xl leading-none">A</span>
          </div>
          <h1 className="text-2xl font-serif text-slate-900 tracking-widest uppercase">{isLogin ? 'Sign In' : 'Create Account'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Full Name</label>
              <input type="text" required className="w-full border-b border-beige-200 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent text-slate-900" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Email Address</label>
            <input type="email" required className="w-full border-b border-beige-200 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent text-slate-900" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Password</label>
            <input type="password" required className="w-full border-b border-beige-200 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent text-slate-900" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 tracking-widest text-sm uppercase transition-colors shadow-sm mt-4">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs tracking-widest uppercase text-slate-500 hover:text-gold-600 transition-colors"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign In"}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-6 pt-4 border-t border-beige-100 text-center">
             <span className="text-xs text-slate-400 italic">Hint: Sign in with any credentials to access the Admin Panel</span>
          </div>
        )}
      </div>
    </div>
  );
};
