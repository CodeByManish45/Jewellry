import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/pricing';

export const Women = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filter only Women's products
  const womenProducts = useMemo(() => products.filter(p => p.category === 'Women'), [products]);

  const [activeCategory, setActiveCategory] = useState('All Collection');
  const [sortOption, setSortOption] = useState('New Arrivals');
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const categories = ['All Collection', 'Nathiya', 'Locket', 'Necklace'];

  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const price = product.price || (product.baseWeight * 6700);
    addToCart(product, 1, '18K Gold', 'Standard', price);
  };

  const filteredProducts = useMemo(() => {
    let result = [...womenProducts];

    if (activeCategory !== 'All Collection') {
      result = result.filter(p => p.type === activeCategory);
    }

    if (selectedMaterials.length > 0) {
      // For now, assuming materials might be in description or we just mock it for consistency with Men's page
      // In a real app we'd have a material property.
      // result = result.filter(p => selectedMaterials.includes(p.material));
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
  }, [womenProducts, activeCategory, sortOption, priceMax, selectedMaterials]);

  return (
    <div className="bg-background text-on-surface font-body overflow-x-hidden selection:bg-primary/30 min-h-screen">
      {/* Hero Section - Matching Men's Design */}
      <section className="relative h-[530px] md:h-[707px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Women's Collection Hero" 
            className="w-full h-full object-cover opacity-60" 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2000"
          />
          <div className="absolute inset-0 bg-linear-to-b from-surface-container-lowest/80 via-transparent to-surface-container-lowest/80"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl text-center">
            <span className="font-label text-primary uppercase tracking-[0.4em] text-[0.85rem] mb-6 block drop-shadow-md">EST. 2024 — CURATED EXCELLENCE</span>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-on-surface leading-[0.9] mb-8 drop-shadow-2xl">
              Premium Women's <br/><span className="text-primary italic">Collection</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Elevate Your Grace with Luxury Jewelry. Handcrafted pieces designed for the modern woman who appreciates fine craftsmanship and heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Workspace */}
      <section className="bg-surface-container-lowest py-20">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 shrink-0 space-y-12">
            <div>
              <h3 className="font-headline text-on-surface text-lg font-semibold mb-6 uppercase tracking-wider">Refine By</h3>
              
              {/* Material Filter */}
              <div className="mb-10">
                <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Material</span>
                <div className="space-y-3">
                  {['24K Solid Gold', '18K Hallmark Gold', '925 Sterling Silver', 'Rose Gold'].map(mat => (
                    <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded-sm bg-surface-container-high border-outline-variant text-primary focus:ring-primary/20" 
                        onChange={() => toggleMaterial(mat)}
                      />
                      <span className="text-on-surface group-hover:text-primary transition-colors">{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-10">
                <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Price Range</span>
                <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between mt-2 text-[0.75rem] text-on-surface">
                  <span>₹1,000</span>
                  <span>₹{priceMax.toLocaleString()}+</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-10">
                <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Brand</span>
                <div className="space-y-3">
                  {['Obsidian Original', 'Vanguard Elite'].map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="brand"
                        className="w-4 h-4 bg-surface-container-high border-outline-variant text-primary focus:ring-primary/20" 
                        onChange={() => setSelectedBrand(brand)}
                      />
                      <span className="text-on-surface group-hover:text-primary transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Canvas */}
          <div className="flex-1">
            {/* Filter Section Controls (Sub-navigation) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-outline-variant/15 pb-8">
              <div className="flex flex-wrap gap-4">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'border-primary text-primary bg-primary/5' 
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
                  <div className="relative aspect-3/4 bg-surface-container-low overflow-hidden border border-transparent transition-all duration-500 gold-glow">
                    <img 
                      alt={product.name} 
                      src={product.images[0]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {product.type === 'Nathiya' && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-on-primary-fixed text-[0.65rem] font-bold px-3 py-1 uppercase tracking-widest">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex flex-col gap-3">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-primary text-on-primary-fixed py-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110"
                    >
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <p className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-1">{product.type}</p>
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
      </div>
    </section>

      {/* Signature Editorial Section */}
      <section className="bg-surface-container-lowest py-24 my-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-surface-container-low overflow-hidden">
              <img 
                alt="Craftsmanship" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1599643478514-4a4e0f69a509?auto=format&fit=crop&q=80&w=800"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-l border-t border-primary/20 hidden lg:block"></div>
          </div>
          <div className="space-y-6">
            <span className="font-label text-primary uppercase tracking-[0.2em]">The Heritage Collection</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface">Elegance Redefined <br/>For Her</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Our women's collection is a testament to timeless grace. From the intricate filigree of our Nathiyas to the bold statement of our necklaces, every piece is designed to celebrate your unique story.
            </p>
            <button className="inline-block border-b-2 border-primary pb-1 text-primary font-bold tracking-widest text-sm hover:text-on-surface hover:border-on-surface transition-all">READ OUR STORY</button>
          </div>
        </div>
      </section>
    </div>
  );
};
