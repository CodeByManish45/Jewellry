import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryBanner } from '../components/CategoryBanner';

export const Wedding = () => {
  const { products } = useProducts();
  const weddingProducts = products.filter(p => p.category === 'Wedding');

  return (
    <div className="bg-white min-h-screen pb-20">
      <CategoryBanner 
        title="Bridal Exclusive" 
        description="Heritage artistry meeting matrimonial elegance. Adorn yourself in our lavish bridal jewelry curations." 
        imageStr="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=2000"
      />
      
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex justify-between items-center mb-8 border-b border-beige-200 pb-4">
          <p className="text-sm text-slate-500 tracking-widest uppercase">{weddingProducts.length} Items</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {weddingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
