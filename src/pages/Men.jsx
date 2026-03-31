import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryBanner } from '../components/CategoryBanner';

export const Men = () => {
  const { products } = useProducts();
  const menProducts = products.filter(p => p.category === 'Men');

  return (
    <div className="bg-white min-h-screen pb-20">
      <CategoryBanner 
        title="Men's Collection" 
        description="Bold, timeless, and meticulously crafted. Discover jewelry that defines modern masculinity." 
        imageStr="https://images.unsplash.com/photo-1622398925373-3f9cb6ce3b2e?auto=format&fit=crop&q=80&w=2000"
      />
      
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex justify-between items-center mb-8 border-b border-beige-200 pb-4">
          <p className="text-sm text-slate-500 tracking-widest uppercase">{menProducts.length} Items</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {menProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
