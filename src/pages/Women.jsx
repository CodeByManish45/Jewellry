import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryBanner } from '../components/CategoryBanner';

export const Women = () => {
  const { products } = useProducts();
  const womenProducts = products.filter(p => p.category === 'Women');

  return (
    <div className="bg-white min-h-screen pb-20">
      <CategoryBanner 
        title="Women's Collection" 
        description="Elegant iterations of classic luxury. Explore exquisite pieces designed to celebrate her grace." 
        imageStr="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2000"
      />
      
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex justify-between items-center mb-8 border-b border-beige-200 pb-4">
          <p className="text-sm text-slate-500 tracking-widest uppercase">{womenProducts.length} Items</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {womenProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
