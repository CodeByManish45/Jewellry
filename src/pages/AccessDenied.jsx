import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 sm:p-12 border border-beige-200 shadow-lg text-center"
      >
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-serif text-slate-900 tracking-widest uppercase mb-4">Access Denied</h1>
        
        <p className="text-slate-500 text-sm tracking-wider leading-relaxed mb-8">
          YOU DO NOT HAVE THE NECESSARY PERMISSIONS TO VIEW THIS EXCLUSIVE AREA. 
          THIS PORTAL IS RESERVED FOR ADMINISTRATORS ONLY.
        </p>

        <div className="space-y-4">
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-slate-800 shadow-md"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-3 bg-white border border-beige-200 text-slate-600 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-beige-50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-beige-100">
           <p className="text-[10px] text-slate-400 uppercase tracking-widest">
             Sumit Jewellers &bull; Secure Administrative Access
           </p>
        </div>
      </motion.div>
    </div>
  );
};
