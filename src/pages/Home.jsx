import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/pricing';

export const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-beige-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            src="/GOLD.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 uppercase tracking-widest leading-tight">
            Elegance <span className="text-gold-500 italic lowercase tracking-normal px-2">in every</span> Detail
          </h1>
          <p className="text-lg md:text-xl text-beige-200 mb-10 font-light tracking-wide max-w-2xl mx-auto">
            Discover our curated collection of fine jewelry, designed for moments that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 tracking-widest uppercase text-sm transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              to="/wedding"
              className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 tracking-widest uppercase text-sm transition-colors"
            >
              Bridal Exclusive
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Highlights */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-slate-900 mb-4 tracking-wider uppercase">Shop by Category</h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category} to={`/${category.toLowerCase()}`} className="group relative h-96 overflow-hidden block">
              <img 
                src={
                  category === 'Men' ? 'https://images.unsplash.com/photo-1622398925373-3f9cb6ce3b2e?auto=format&fit=crop&q=80&w=800' :
                  category === 'Women' ? 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800' :
                  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800'
                } 
                alt={category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-2xl font-serif text-white tracking-widest uppercase mb-2">{category}</h3>
                <span className="text-gold-400 text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white border-t border-beige-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4 tracking-wider uppercase">Featured Pieces</h2>
              <div className="w-16 h-0.5 bg-gold-500"></div>
            </div>
            <Link to="/products" className="hidden sm:block text-sm tracking-widest uppercase text-slate-600 hover:text-gold-500 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group cursor-pointer">
                <div className="relative aspect-4/5 overflow-hidden bg-beige-100 mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                  />
                  {product.category === 'Wedding' && (
                    <div className="absolute top-4 left-4 bg-gold-500 text-white text-[10px] uppercase tracking-widest px-2 py-1">
                      Premium
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-slate-900 mb-1 group-hover:text-gold-600 transition-colors">{product.name}</h4>
                  <p className="text-sm text-slate-500 tracking-widest uppercase mb-2">{product.category}</p>
                  <p className="text-gold-600 font-medium">From {formatPrice(product.baseWeight * 6700)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="text-sm tracking-widest uppercase text-gold-600 hover:text-gold-700 transition-colors border-b border-gold-600 pb-1">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
