import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('featured');
  const [priceRange, setPriceRange] = useState('All');

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);
  const handlePriceChange = (e) => setPriceRange(e.target.value);

  // Filter Logic
  let filteredProducts = products.filter(p => {
    let matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    
    // Use the price from the product object or calculate it
    const goldRate = 6700;
    let price = p.price || (p.baseWeight * goldRate);
    let matchPrice = true;
    if (priceRange === 'under-100k') matchPrice = price < 100000;
    if (priceRange === '100k-500k') matchPrice = price >= 100000 && price <= 500000;
    if (priceRange === 'above-500k') matchPrice = price > 500000;

    let matchSearch = true;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      matchSearch = p.name.toLowerCase().includes(searchLower) || 
                    (p.description && p.description.toLowerCase().includes(searchLower)) ||
                    p.category.toLowerCase().includes(searchLower);
    }

    return matchCat && matchPrice && matchSearch;
  });

  // Sort Logic
  if (sortOrder === 'low-high') {
    filteredProducts.sort((a, b) => a.baseWeight - b.baseWeight);
  } else if (sortOrder === 'high-low') {
    filteredProducts.sort((a, b) => b.baseWeight - a.baseWeight);
  }

  return (
    <div className="bg-beige-100/30 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-slate-900 tracking-widest uppercase mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Collections'}
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white p-6 border border-beige-200 sticky top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-beige-200">
                <SlidersHorizontal className="w-5 h-5 text-gold-600" />
                <h3 className="font-serif text-lg tracking-widest uppercase text-slate-900">Filters</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4 block">Category</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="category" value="All" checked={selectedCategory === 'All'} onChange={handleCategoryChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700 group-hover:text-gold-600 transition-colors">All Collections</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="category" value={cat} checked={selectedCategory === cat} onChange={handleCategoryChange} className="accent-gold-500 w-4 h-4" />
                      <span className="text-sm text-slate-700 group-hover:text-gold-600 transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4 block">Price Range</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" value="All" checked={priceRange === 'All'} onChange={handlePriceChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700 group-hover:text-gold-600 transition-colors">All Prices</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" value="under-100k" checked={priceRange === 'under-100k'} onChange={handlePriceChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700 group-hover:text-gold-600 transition-colors">Under ₹1,00,000</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" value="100k-500k" checked={priceRange === '100k-500k'} onChange={handlePriceChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700 group-hover:text-gold-600 transition-colors">₹1,00,000 - ₹5,00,000</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" value="above-500k" checked={priceRange === 'above-500k'} onChange={handlePriceChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700 group-hover:text-gold-600 transition-colors">Above ₹5,00,000</span>
                  </label>
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sorting */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 border border-beige-200">
              <span className="text-sm text-slate-500 tracking-widest uppercase">{filteredProducts.length} Products</span>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest text-slate-500 uppercase">Sort By:</span>
                <select 
                  value={sortOrder} 
                  onChange={handleSortChange}
                  className="bg-transparent text-sm text-slate-900 font-medium focus:outline-none cursor-pointer uppercase tracking-wider"
                >
                  <option value="featured">Featured</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white border border-beige-200">
                <p className="text-slate-500 font-serif text-xl">No products matched your criteria.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setPriceRange('All'); }}
                  className="mt-6 text-gold-600 tracking-widest uppercase text-sm border-b border-gold-600 pb-1 hover:text-gold-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
