import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Package, MapPin, LogOut, User, ChevronRight, ShoppingBag, Loader2, CreditCard, Heart } from 'lucide-react';
import { AnimatedButton } from '../components/AnimatedButton';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Peacefully logged out of boutique.');
    navigate('/login');
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success('Shipping coordinates updated successfully.');
  };

  const dummyOrders = [
    { id: 'SJ-7721-D', date: 'March 24, 2026', status: 'Delivered', total: '$14,250.00', items: '2x Solitaire Diamond Rings' },
    { id: 'SJ-8942-P', date: 'February 12, 2026', status: 'Processing', total: '$3,850.00', items: '1x Gold Pendant Leaf' },
    { id: 'SJ-6531-S', date: 'January 05, 2026', status: 'Shipped', total: '$21,100.00', items: '1x Bridal Necklace Set' },
  ];

  const sidebarLinks = [
    { id: 'profile', label: 'My Registry', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'address', label: 'Boutique Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'payments', label: 'Saved Payments', icon: CreditCard },
  ];

  return (
    <div className="bg-beige-50/50 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-beige-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif text-slate-900 tracking-widest uppercase">Registry Dashboard</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[9px] bg-gold-600 text-white px-3 py-1 font-bold uppercase tracking-widest rounded-full shadow-sm shadow-gold-200">
               {user?.role} Membership
             </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-beige-100 shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col items-center gap-4 bg-slate-900 text-white">
                    <div className="w-16 h-16 rounded-full bg-gold-50 border-2 border-gold-400 flex items-center justify-center text-gold-600 font-serif font-bold text-2xl shadow-xl">
                        {user?.avatar || user?.name?.charAt(0)}
                    </div>
                    <div className="text-center">
                        <h3 className="text-sm font-bold tracking-widest uppercase">{user?.name}</h3>
                        <p className="text-[10px] text-white/50 italic tracking-wider">{user?.email}</p>
                    </div>
                </div>
                
                <nav className="p-2 space-y-1">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleTabChange(link.id)}
                            className={`w-full flex items-center justify-between px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                activeTab === link.id ? 'bg-beige-50 text-gold-700' : 'hover:bg-beige-50/50 text-slate-500'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <link.icon className={`w-4 h-4 ${activeTab === link.id ? 'text-gold-600' : 'text-slate-400'}`} />
                                <span>{link.label}</span>
                            </div>
                            <ChevronRight className={`w-3 h-3 ${activeTab === link.id ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                    ))}
                    
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border-t border-beige-50 mt-2 pt-4"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Terminate Session</span>
                    </button>
                </nav>
            </div>
            
            <div className="p-6 bg-gold-50/50 border border-gold-100/50 rounded-sm italic">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                   "Each piece in your collection is a testament to timeless elegance and royal heritage."
                </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-beige-100 shadow-xl min-h-[600px] p-8 sm:p-12 relative overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-beige-50/30 rounded-full blur-3xl -mr-32 -mt-32"></div>

                {activeTab === 'profile' && (
                  <div className="space-y-10">
                    <header className="border-b border-beige-100 pb-4">
                        <h2 className="text-xl font-serif text-slate-900 uppercase tracking-widest">My Registry</h2>
                    </header>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Full Registry Name</label>
                            <p className="text-sm text-slate-900 font-bold border-b border-beige-100 pb-2 uppercase tracking-tight">{user?.name}</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Registered Email</label>
                            <p className="text-sm text-slate-900 font-bold border-b border-beige-100 pb-2 tracking-tight">{user?.email}</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Membership Tier</label>
                            <p className="text-sm text-gold-600 font-bold border-b border-beige-100 pb-2 uppercase tracking-widest">{user?.role} Boutique Member</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Registry ID</label>
                            <p className="text-sm text-slate-900 font-bold border-b border-beige-100 pb-2 tracking-widest">#USR-{user?.id}</p>
                        </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-8">
                    <header className="flex justify-between items-end border-b border-beige-100 pb-4">
                        <h2 className="text-xl font-serif text-slate-900 uppercase tracking-widest">Order History</h2>
                    </header>

                    <div className="space-y-6">
                        {dummyOrders.map((order) => (
                          <div key={order.id} className="group border border-beige-100 p-6 hover:border-gold-300 hover:shadow-md transition-all rounded-sm flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-900 tracking-widest">{order.id}</span>
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border ${
                                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        order.status === 'Processing' ? 'bg-gold-50 text-gold-600 border-gold-100' :
                                        'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{order.date}</p>
                                <p className="text-[11px] text-slate-600 italic font-medium">{order.items}</p>
                            </div>
                            <div className="flex flex-col md:items-end justify-between gap-4">
                                <span className="text-lg font-serif text-slate-900 font-bold">{order.total}</span>
                                <button className="text-[10px] uppercase font-bold tracking-widest text-gold-600 hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-all pb-1">Review Pieces</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === 'address' && (
                  <div className="space-y-8">
                    <header className="border-b border-beige-100 pb-4">
                        <h2 className="text-xl font-serif text-slate-900 uppercase tracking-widest">Global Boutique Shipping</h2>
                    </header>

                    <form onSubmit={handleSaveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="md:col-span-2 relative group px-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Primary Contact Name</label>
                            <input type="text" defaultValue={user?.name} className="w-full border-b border-beige-100 py-3 text-sm focus:outline-none focus:border-gold-500 bg-transparent text-slate-900 transition-all" />
                        </div>
                        <div className="relative group px-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Boutique Phone Number</label>
                            <input type="tel" placeholder="+91 00000 00000" className="w-full border-b border-beige-100 py-3 text-sm focus:outline-none focus:border-gold-500 bg-transparent text-slate-900 transition-all" />
                        </div>
                        <div className="relative group px-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Postal Zone (Pin Code)</label>
                            <input type="text" placeholder="PIN" className="w-full border-b border-beige-100 py-3 text-sm focus:outline-none focus:border-gold-500 bg-transparent text-slate-900 transition-all" />
                        </div>
                        <div className="md:col-span-2 relative group px-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Palatial Address Coordinates (House / Building)</label>
                            <input type="text" placeholder="Suite / Floor / Landmark" className="w-full border-b border-beige-100 py-3 text-sm focus:outline-none focus:border-gold-500 bg-transparent text-slate-900 transition-all" />
                        </div>
                        <div className="md:col-span-2 relative group px-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">District / Region / City</label>
                            <input type="text" placeholder="Area / Sector / Street" className="w-full border-b border-beige-100 py-3 text-sm focus:outline-none focus:border-gold-500 bg-transparent text-slate-900 transition-all" />
                        </div>
                        <div className="md:col-span-2 flex justify-end pt-6">
                            <AnimatedButton 
                              type="submit" 
                              disabled={isSaving}
                              className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-4 tracking-[0.2em] text-[10px] font-bold uppercase transition-all shadow-xl shadow-slate-200 flex items-center gap-3 disabled:opacity-70"
                            >
                              {isSaving ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                                  Sealing Registry...
                                </>
                              ) : (
                                <>Seal Shipping Coordinates</>
                              )}
                            </AnimatedButton>
                        </div>
                    </form>
                  </div>
                )}
                
                {/* Fallback for other tabs */}
                {(activeTab === 'wishlist' || activeTab === 'payments') && (
                  <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-16 h-16 bg-beige-50 rounded-full flex items-center justify-center text-gold-400">
                        {activeTab === 'wishlist' ? <Heart className="w-8 h-8" /> : <CreditCard className="w-8 h-8" />}
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-serif text-slate-900 uppercase tracking-widest">Coming Soon to Boutique</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">This registry tier is currently being curated.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};
