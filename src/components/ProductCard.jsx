import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/pricing';

export const ProductCard = ({ product }) => {
  // Use the price from the product object (set by Admin)
  const basePrice = product.price || (product.baseWeight * 6700);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden bg-beige-100 mb-4 rounded-sm">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-top object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          <span className="bg-white/95 backdrop-blur-sm text-slate-900 px-6 py-3 text-xs font-semibold tracking-widest uppercase shadow-sm">
            Quick View
          </span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-serif text-lg text-slate-900 mb-1 leading-snug">{product.name}</h3>
        <p className="text-gold-600 font-medium">{formatPrice(basePrice)}</p>
      </div>
    </Link>
  );
};
