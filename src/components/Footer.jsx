import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-beige-100 pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full border border-gold-500 flex items-center justify-center">
                <span className="text-gold-500 font-serif font-bold text-2xl leading-none">A</span>
              </div>
              <span className="font-serif text-3xl tracking-widest uppercase text-white">Aura</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Exquisite craftsmanship and timeless designs. Discover our collection of premium jewelry tailored for your every special moment.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wider mb-6 text-gold-400">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/men" className="hover:text-gold-400 transition-colors">Men's Collection</Link></li>
              <li><Link to="/women" className="hover:text-gold-400 transition-colors">Women's Collection</Link></li>
              <li><Link to="/wedding" className="hover:text-gold-400 transition-colors">Bridal Jewelry</Link></li>
              <li><Link to="/products" className="hover:text-gold-400 transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wider mb-6 text-gold-400">Help & Info</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Jewelry Care</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wider mb-6 text-gold-400">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Email: contact@aurajewelry.com</li>
              <li>Phone: +1 (800) 123-4567</li>
              <li>Mon - Fri | 9 AM - 6 PM EST</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Aura Jewelry. All rights reserved.</p>
          <div className="flex gap-4">
             <Link to="/admin" className="hover:text-gold-400 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
