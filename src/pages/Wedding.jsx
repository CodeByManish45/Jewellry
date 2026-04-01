import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/pricing';

export const Wedding = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filter only Wedding products
  const weddingProducts = useMemo(() => products.filter(p => p.category === 'Wedding'), [products]);

  const [activeCategory, setActiveCategory] = useState('All Collection');
  const [sortOption, setSortOption] = useState('New Arrivals');
  const [priceMax, setPriceMax] = useState(100000);

  const categories = ['All Collection', 'Choker', 'Haar', 'Set'];

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const price = product.price || (product.baseWeight * 6700);
    addToCart(product, 1, '22K Gold', 'Standard', price);
  };

  const filteredProducts = useMemo(() => {
    let result = [...weddingProducts];

    if (activeCategory !== 'All Collection') {
      result = result.filter(p => p.type === activeCategory || p.name.includes(activeCategory));
    }

    result = result.filter(p => {
      const price = p.price || (p.baseWeight * 6700);
      return price <= priceMax;
    });

    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => (a.price || a.baseWeight * 6700) - (b.price || b.baseWeight * 6700));
        break;
      case 'Price: High to Low':
        result.sort((a, b) => (b.price || b.baseWeight * 6700) - (a.price || a.baseWeight * 6700));
        break;
      default:
        break;
    }

    return result;
  }, [weddingProducts, activeCategory, sortOption, priceMax]);

  return (
    <div className="bg-background text-on-surface font-body overflow-x-hidden selection:bg-primary/30 min-h-screen">
      {/* Hero Section - Matching Men's/Women's Design */}
      <section className="relative h-[530px] md:h-[707px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Wedding Collection Hero" 
            className="w-full h-full object-cover opacity-60" 
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=2000"
          />
          <div className="absolute inset-0 bg-linear-to-b from-surface-container-lowest/80 via-transparent to-surface-container-lowest/80"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl text-center">
            <span className="font-label text-primary uppercase tracking-[0.4em] text-[0.85rem] mb-6 block drop-shadow-md">EST. 2024 — MATRIMONIAL ELEGANCE</span>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-on-surface leading-[0.9] mb-8 drop-shadow-2xl">
              Bridal Exclusive <br/><span className="text-primary italic">Collection</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Heritage Artistry for Your Special Day. Adorn yourself in our lavish bridal jewelry curations that celebrate tradition and luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Workspace */}
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 shrink-0 space-y-12">
          <div>
            <h3 className="font-headline text-on-surface text-lg font-semibold mb-6 uppercase tracking-wider">Refine By</h3>
            
            {/* Price Filter */}
            <div className="mb-10">
              <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Price Range</span>
              <input 
                type="range" 
                min="5000" 
                max="500000" 
                step="1000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between mt-2 text-[0.75rem] text-on-surface-variant">
                <span>₹5,000</span>
                <span>₹{priceMax.toLocaleString()}{priceMax === 500000 && '+'}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Canvas */}
        <div className="flex-1">
          {/* Sub-navigation Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-outline-variant/15 pb-8">
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
                    activeCategory === cat 
                      ? 'border-primary text-primary' 
                      : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-on-surface-variant text-sm whitespace-nowrap">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-surface-container-low border-none text-on-surface text-sm font-semibold focus:ring-0 cursor-pointer px-3 py-1 rounded"
              >
                <option>New Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Sellers</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-3/4 bg-surface-container-low overflow-hidden border border-transparent transition-all duration-500 hover:border-primary/30 shadow-md">
                  <img 
                    alt={product.name} 
                    src={product.images[0]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-on-primary-fixed text-[0.65rem] font-bold px-3 py-1 uppercase tracking-widest">
                      Wedding
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col gap-3">
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-linear-to-r from-gold-500 to-gold-600 text-white py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-lg transition-all"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                    className="w-full border border-primary/30 text-on-surface py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all backdrop-blur-md"
                  >
                    Details
                  </button>
                </div>
                
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h4 className="text-on-surface font-semibold text-lg leading-tight">{product.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold">{formatPrice(product.price || product.baseWeight * 6700)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-on-surface-variant">
                No products match your selected filters.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
