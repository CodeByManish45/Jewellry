import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-beige-100 pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Sumit Jewellers" 
                className="w-16 h-16 object-cover rounded-full border-2 border-gold-500/30"
              />
              <span className="font-serif text-3xl tracking-widest uppercase text-gold-500">Sumit Jewellers</span>
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
              <li>Email: contact@sumitjewellers.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Mon - Sat | 10 AM - 8 PM IST</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Sumit Jewellers. All rights reserved.</p>
          <div className="flex gap-4">
             <Link to="/admin" className="hover:text-gold-400 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
