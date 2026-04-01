import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export const Navbar = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
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
    <nav className="fixed w-full bg-transparent backdrop-blur-md z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="Sumit Jewellers" 
                className="w-14 h-14 object-contain shadow-2xl drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-widest text-slate-900 uppercase leading-tight font-semibold">Sumit Jewellers</span>
              <span className="text-[9px] tracking-[0.2em] text-gold-600 uppercase font-medium">Fine Hallmark Jewelry</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase transition-colors duration-200 hover:text-gold-500 ${isActive ? 'text-gold-500 font-medium' : 'text-slate-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 relative">
            <div className="relative flex items-center">
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="absolute right-8 top-1/2 -translate-y-1/2 w-48 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-white border border-beige-300 px-4 py-1.5 text-sm focus:outline-none focus:border-gold-500 rounded-full shadow-md transition-all"
                  />
                </form>
              )}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-slate-600 hover:text-gold-500 transition-colors relative z-10 p-1 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <Link to="/login" className="text-slate-600 hover:text-gold-500 transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="text-slate-600 hover:text-gold-500 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gold-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-600 focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-beige-200 shadow-lg">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase py-2 transition-colors ${isActive ? 'text-gold-500 font-medium' : 'text-slate-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/login" onClick={toggleMenu} className="text-sm tracking-widest uppercase text-slate-600 py-2 sm:hidden border-t mt-2 pt-4">
              Sign In / Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
