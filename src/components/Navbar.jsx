import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, LogOut, Settings, LayoutDashboard, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Wedding', path: '/wedding' },
    { name: 'Collections', path: '/products' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm border-b border-beige-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="Sumit Jewellers" 
                className="w-12 h-12 object-cover rounded-full border border-gold-500/20 shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-widest text-slate-900 uppercase leading-tight font-semibold">Sumit</span>
              <span className="text-[8px] tracking-[0.2em] text-gold-600 uppercase font-medium">Jewellers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-gold-600 ${isActive ? 'text-gold-600 font-bold' : 'text-slate-500'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center space-x-6 relative">
            <div className="relative flex items-center">
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="absolute right-8 top-1/2 -translate-y-1/2 w-48 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search boutique..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-white border border-beige-200 px-4 py-1.5 text-xs focus:outline-none focus:border-gold-500 rounded-sm shadow-sm transition-all"
                  />
                </form>
              )}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-slate-500 hover:text-gold-600 transition-colors"
                type="button"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 font-bold text-xs group-hover:bg-gold-500 group-hover:text-white transition-all shadow-sm">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-gold-600 transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Flipkart-style Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-4 w-52 bg-white border border-beige-100 shadow-xl z-20 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-beige-50 bg-slate-50">
                          <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                          <p className="text-xs font-bold text-slate-900 truncate uppercase">{user.name}</p>
                          <p className="text-[10px] text-gold-600 font-medium">Role: {user.role?.toUpperCase()}</p>
                        </div>

                        <div className="py-2">
                          {isAdmin && (
                            <Link 
                              to="/admin" 
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-slate-600 hover:bg-beige-50 hover:text-gold-600 transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </Link>
                          )}
                          <Link 
                            to="/profile" 
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-slate-600 hover:bg-beige-50 hover:text-gold-600 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          <Link 
                            to="/profile?tab=orders" 
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-slate-600 hover:bg-beige-50 hover:text-gold-600 transition-colors"
                          >
                            <List className="w-4 h-4" />
                            Orders
                          </Link>
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-slate-900 text-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-slate-800 shadow-md hidden sm:block"
              >
                Login
              </Link>
            )}

            <Link to="/cart" className="text-slate-500 hover:text-gold-600 transition-colors relative p-1">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-500 focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-beige-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `text-xs tracking-widest uppercase py-2 transition-colors ${isActive ? 'text-gold-600 font-bold' : 'text-slate-500'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              <div className="pt-4 border-t border-beige-50">
                {user ? (
                  <div className="space-y-4 pt-2">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Account Overview</p>
                    {isAdmin && (
                      <Link to="/admin" onClick={toggleMenu} className="flex items-center gap-3 text-xs tracking-widest uppercase text-slate-600 font-bold">
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/profile" onClick={toggleMenu} className="flex items-center gap-3 text-xs tracking-widest uppercase text-slate-600 font-bold">
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 text-xs tracking-widest uppercase text-red-500 font-bold">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={toggleMenu} className="w-full bg-slate-900 text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center shadow-md">
                    Sign In to Boutique
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
