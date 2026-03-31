import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const OBSIDIAN_PRODUCTS = [
  {
    id: 'obs-1',
    name: 'Midnight Signet Ring',
    brand: 'Vanguard Elite',
    price: 1250,
    originalPrice: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIyeXql7WLZpe1qjmeHyW6mOIen4xSdlehc-ZYuAiYhFOh30GwyvwoV49NfY8KGESt3--XdyVLyH3XvXj9EqfO93kPFCGPeYr9ZunVnGpeP8jrzSUjrafZe6vTw-eThn8lczekulgjIyWUl-_UQyxfsZ1Pkq7JpTokyL7MA37JUELRnFoKAQLEKBi5PTwZ1lft9MUK8dR_7V2LzDNYQswFmwXapq031gRmb-y4gi-3cH6LcNNO6fdy32cDI2KJjN_Q8TVFFZ612Qxb',
    tag: 'New',
    tagColor: 'bg-primary text-on-primary-fixed',
    type: 'Rings',
    material: '24K Solid Gold'
  },
  {
    id: 'obs-2',
    name: 'Sterling Curb Link',
    brand: 'Obsidian Original',
    price: 890,
    originalPrice: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKKc9UVHLwucdBF8BVHGBe5-K_XEQObJOZgBV8Jq0ZGZJ5stqeMYanRBmHeBJj42K2rfcZuQFEqFaM71vZqdK8zA8HRP4BHkNSBQu1z2F6-KpNX5dWg7F_jIn7mau1R0EDXkINnM3nlcI-BQoL3RfVAaYpkkwf5rSMaoUlHueU2vBmG4_hYEMUduqTVZlwz3o7yFt-L6lNlAznYznvliMOx3gGcseHbYrPqozQr9JV0wpscUJxhdP67Ru5MIQ57m2Ns7HSRWQucEIX',
    tag: null,
    type: 'Neck Chains',
    material: '925 Sterling Silver'
  },
  {
    id: 'obs-3',
    name: 'Obsidian Inset Band',
    brand: 'Elite Artisans',
    price: 2040,
    originalPrice: 2400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0eWo53r5ZWOXgFQKVU03AOEOVWoSyHeIMOQaXxkgCyo3UB2oeMtMOQoZaqRpTDpUI6Oo6LSk7Ndq3PvguBbswUE-egrRK5y8xv5qd3RKiK32PP5ov00ZbmMbD7fich9Tt_dqaikLw_Y-exVCzdRwG1Rov3DgDpovLsAIU-Y1dBVfwc1f5VtfKj4x1rkNdC5jTFJ23wtF5cN93pLHGOQKyMnDvMMLmgbWria03SklDOUXl_AcrLKDNsizgOHcErCaktoP5k1OMAzw0',
    tag: '-15%',
    tagColor: 'bg-error-container text-on-error-container',
    type: 'Rings',
    material: 'Brushed Obsidian'
  },
  {
    id: 'obs-4',
    name: 'Architectural Gold Band',
    brand: 'Vanguard Elite',
    price: 1550,
    originalPrice: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvpmqcT8y3DpLu_hJf-E0F387g64_JTt_Ktlw7higwgjYtk7gbDwr8KJT3xyRU_ZEbpdOjrSm4gR32XdPywgyku7ydUvHKz7-xFYAOOdREs_hqWLAATM3NIV0_8RRDaB8dgvK4cQ1fjesNWk1qKNvhb0r4O9XKUu3Hde-oYPrA3PeBQJsa8_qQYVysKXJfrTnLnXAPQ0nk15E6gthk58qvuAlANoEZILBrR8ZMCQykwWUxlecTDeUBwi5gOhHICERSKXQqmaLvMJT0',
    tag: null,
    type: 'Rings',
    material: '24K Solid Gold'
  },
  {
    id: 'obs-5',
    name: 'Industrial Steel Link',
    brand: 'Obsidian Original',
    price: 450,
    originalPrice: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVA7iPVgSkJzk_1poy2C-tiStXlfIXA4EoKM2wGZIThkcu9UnAsZ6_1B_ibiveqzAOd2cPQyqZmawYMzGO6ZQseNArUb21pdYObkYf8B9yqzE18i1Rh6TEi3iHjWv3sxXmQ1CMn8wCc6wdbmIP-SpbsqCJqAOr2pmjRkq_MsjBgp_on8WAfUG2zPuzX7FAuUObkJQC-WHDvXh8_O_-NkgD7KDhc1oNs2xFCIzMbOtiol03jj25y3UNuJ0sjbjgP66zo5kw0haEZ9en',
    tag: null,
    type: 'Bracelets',
    material: 'Stainless Steel'
  },
  {
    id: 'obs-6',
    name: 'Brushed Onyx Signet',
    brand: 'Vanguard Elite',
    price: 1980,
    originalPrice: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZZaAFYPHr72z8oIIbGacE1qaWOApcnbRGrSCvMAi3JqIozmUQB-HaTKbcgrOCpbWWSbmH7Ry1g1pdfpOWInVZE3BTyYuAr5exAy4h8N5mgs0vKkksWz8iM0ASHnSO05Q_tEGyWglvpaopF7f3nJePrYJNJcyvdHhKkD-slxrV-VOx2mtGr3K9lvqAI7MTnwN48yTqTLjIcSMN5ohopgjzONbVvjLeVIHeQau0j8azCjPAIQAY2C7kKsjooHNhiLE1lmpV-btLT9PB',
    tag: null,
    type: 'Rings',
    material: 'Brushed Obsidian'
  }
];

export const Men = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All Collection');
  const [sortOption, setSortOption] = useState('New Arrivals');
  const [priceMax, setPriceMax] = useState(5000);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent product detail navigation
    addToCart({
      id: product.id,
      name: product.name,
      images: [product.image],
    }, 1, product.material, 'Standard', product.price);
  };

  const filteredProducts = useMemo(() => {
    let result = [...OBSIDIAN_PRODUCTS];

    if (activeCategory !== 'All Collection') {
      result = result.filter(p => p.type === activeCategory);
    }

    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    result = result.filter(p => p.price <= priceMax);

    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      // Mock 'Best Sellers' and 'New Arrivals' by original order for now
      default:
        break;
    }

    return result;
  }, [activeCategory, sortOption, priceMax, selectedMaterials, selectedBrand]);

  return (
    <div className="bg-background text-on-surface font-body overflow-x-hidden selection:bg-primary/30 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[530px] md:h-[707px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Hero Image" 
            className="w-full h-full object-cover opacity-50 grayscale-[0.3]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ9JGs5G_XXTCZrLbsabir_e90wEUqCnIBKAUJKSByjsdGbzTHZDCOU93lyU0YyLbfMHl8FIz4lKeDiaCRs0Zpm5WGEgUUN8KRbPzajQDW2vvt0oGzGOcG6clYMk7UGhsMe-ppR0VqcH5HMgfWd2shHd4CfABOApnon-oHkVbH2_fOTjbdT44w5AuF9lFRqZ7QxzFuTgl0RSvC7WBtKkKFpyLzrty4Ve6DIDpDK5FQ7wT9nJoSGxloX44VlZ3PzpyHXNRmSD9Um2MB"
          />
          <div className="absolute inset-0 bg-linear-to-b from-surface-container-lowest/80 via-transparent to-surface-container-lowest/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl text-center">
            <span className="font-label text-primary uppercase tracking-[0.4em] text-[0.85rem] mb-6 block drop-shadow-md">Est. 2024 — Curated Excellence</span>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-on-surface leading-[0.9] mb-8 drop-shadow-2xl">
              Premium Men's <br/><span className="text-primary italic">Collection</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Elevate Your Style with Luxury Accessories. Handcrafted pieces designed for the modern connoisseur of fine craftsmanship.
            </p>
            {/* No buttons as per user request */}
          </div>
        </div>
      </section>

      {/* Collection Workspace */}
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 shrink-0 space-y-12">
          <div>
            <h3 className="font-headline text-on-surface text-lg font-semibold mb-6 uppercase tracking-wider">Refine By</h3>
            
            {/* Material Filter */}
            <div className="mb-10">
              <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Material</span>
              <div className="space-y-3">
                {['24K Solid Gold', '925 Sterling Silver', 'Brushed Obsidian', 'Stainless Steel'].map(mat => (
                  <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="w-4 h-4 rounded-sm bg-surface-container-high border-outline-variant text-primary focus:ring-primary/20" 
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-10">
              <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Price Range</span>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between mt-2 text-[0.75rem] text-on-surface-variant">
                <span>$100</span>
                <span>${priceMax.toLocaleString()}{priceMax === 5000 && '+'}</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <span className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-4 block">Brand</span>
              <div className="space-y-3">
                {['Obsidian Original', 'Vanguard Elite'].map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="w-4 h-4 bg-surface-container-high border-outline-variant text-primary focus:ring-primary/20" 
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">{brand}</span>
                  </label>
                ))}
                {selectedBrand && (
                  <button onClick={() => setSelectedBrand(null)} className="text-xs text-primary underline mt-2">Clear Brand</button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Canvas */}
        <div className="flex-1">
          {/* Filter Section Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-outline-variant/15 pb-8">
            <div className="flex flex-wrap gap-4">
              {['All Collection', 'Rings', 'Bracelets', 'Neck Chains'].map(cat => (
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
                onClick={() => navigate(`/product/${product.id.split('-')[1] || "1"}`)}
              >
                <div className="relative aspect-3/4 bg-surface-container-low overflow-hidden border border-transparent transition-all duration-500 gold-glow">
                  <img 
                    alt={product.name} 
                    src={product.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4">
                      <span className={`${product.tagColor} text-[0.65rem] font-bold px-3 py-1 uppercase tracking-widest`}>
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex flex-col gap-3">
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full gold-gradient text-on-primary-fixed py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-lg shadow-primary/10 transition-all"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id.split('-')[1] || "1"}`); }}
                    className="w-full border border-primary/30 text-on-surface py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary-fixed transition-all backdrop-blur-md"
                  >
                    Details
                  </button>
                </div>
                
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <p className="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-widest mb-1">{product.brand}</p>
                    <h4 className="text-on-surface font-semibold text-lg">{product.name}</h4>
                  </div>
                  <div className="text-right">
                    {product.originalPrice && (
                      <p className="text-on-surface-variant line-through text-xs">${product.originalPrice.toLocaleString()}</p>
                    )}
                    <p className="text-primary font-bold">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-on-surface-variant">
                No products match your selected filters. Let's try adjusting them.
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="mt-20 flex flex-col items-center">
              <div className="w-full h-px bg-outline-variant/15 mb-10">
                <div className="w-1/3 h-full bg-primary mx-auto"></div>
              </div>
              <button className="group flex flex-col items-center gap-3">
                <span className="font-label text-on-surface-variant uppercase tracking-[0.3em] text-[0.7rem] group-hover:text-primary transition-colors">Load More</span>
                <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-sm group-hover:text-primary">expand_more</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Signature Editorial Section */}
      <section className="bg-surface-container-lowest py-24 my-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-surface-container-low overflow-hidden">
              <img 
                alt="Craftsmanship" 
                className="w-full h-full object-cover mix-blend-lighten" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWkAm9RKn2voIjOLDR5WJFlgrr2D_7pmGvbndm4TE8u8s5vm4r-KwtvBVHUOzjAm1jv82OyoPrm2ErTIIdQwS2rg-KkYZOW29uaKrwTkXOiW1hWCA_ea5m_C6Drid5RC9m_EaHdt5G-Tfk2r5MJWt6E29A_HKi4kIZjbLOBJQzvJ-DhWQH28zRd_UthvEaK5k_PuwY5IyJHWc8xO56XCiUdmRZZlJILAHkCIeuiid8qqCpGjM__yqObDbwPA2ukaYFJbbZq3L8t0ba"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-l border-t border-primary/20 hidden lg:block"></div>
          </div>
          <div className="space-y-6">
            <span className="font-label text-primary uppercase tracking-[0.2em]">The Obsidian Standard</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface">Meticulously Crafted <br/>For The Bold</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Each piece in our collection undergoes a rigorous selection process. We source the finest materials and partner with master artisans to ensure every link, band, and pendant meets the obsidian standard of luxury.
            </p>
            <a className="inline-block border-b-2 border-primary pb-1 text-primary font-bold tracking-widest text-sm hover:text-on-surface hover:border-on-surface transition-all" href="#">READ OUR STORY</a>
          </div>
        </div>
      </section>
      
      
    </div>
  );
};
