import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ImageGallery } from '../components/ImageGallery';
import { formatPrice, calcPrice } from '../utils/pricing';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  
  const product = products.find(p => p.id === id);
  
  const [goldType, setGoldType] = useState('22k');
  const [size, setSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-beige-100/30">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-slate-900 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/products')} className="text-gold-600 tracking-widest uppercase text-sm border-b border-gold-600 pb-1">
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  // Size multiplier (Larger = heavier = more cost)
  const sizeMultiplier = {
    'Small': 0.95,
    'Standard': 1,
    'Large': 1.1,
  };

  const finalWeight = product.baseWeight * sizeMultiplier[size];
  const finalPrice = calcPrice(finalWeight, goldType);

  const handleAddToCart = () => {
    addToCart(product, quantity, goldType, size, finalPrice);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs tracking-widest uppercase text-slate-500 mb-8 flex items-center gap-2">
          <span className="cursor-pointer hover:text-gold-600 transition-colors" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-gold-600 transition-colors" onClick={() => navigate('/products')}>Collections</span>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div>
             <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-2">{product.name}</h1>
            <p className="text-sm tracking-widest text-slate-500 uppercase mb-6">{product.category}</p>
            
            <p className="text-3xl text-gold-600 font-medium mb-8">
              {formatPrice(finalPrice)}
            </p>

            <p className="text-slate-600 font-light leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="border-t border-b border-beige-200 py-8 mb-10 space-y-8">
              {/* Gold Type Selection */}
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-slate-900 uppercase mb-4">Gold Purity</h4>
                <div className="flex flex-wrap gap-4">
                  {['18k', '22k', '24k'].map(type => (
                    <button
                      key={type}
                      onClick={() => setGoldType(type)}
                      className={`px-6 py-2 border transition-all ${goldType === type ? 'border-gold-500 bg-gold-50 text-gold-700 font-medium' : 'border-beige-200 text-slate-600 hover:border-gold-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-slate-900 uppercase mb-4">Size Variant</h4>
                <div className="flex flex-wrap gap-4">
                  {['Small', 'Standard', 'Large'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-6 py-2 border transition-all ${size === s ? 'border-gold-500 bg-gold-50 text-gold-700 font-medium' : 'border-beige-200 text-slate-600 hover:border-gold-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-slate-900 uppercase mb-4">Quantity</h4>
                <div className="flex items-center border border-beige-200 w-32 bg-white">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-gold-600 transition-colors"
                  >-</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    readOnly
                    className="w-12 h-10 text-center text-slate-900 focus:outline-none bg-transparent font-medium"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-gold-600 transition-colors"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 tracking-widest text-sm uppercase transition-colors flex justify-center items-center border ${isAdded ? 'bg-green-50 text-green-700 border-green-500' : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-900'}`}
              >
                {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button 
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-4 tracking-widest text-sm uppercase transition-colors"
              >
                Buy Now
              </button>
            </div>
            
            <div className="mt-8 text-xs text-slate-500 space-y-3 font-medium uppercase tracking-wider">
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> Insured & Secure Shipping</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> Certified Authenticity</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> 14-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
