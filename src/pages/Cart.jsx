import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { Trash2 } from 'lucide-react';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-beige-100/30">
        <h2 className="text-2xl font-serif text-slate-900 mb-4 tracking-widest uppercase">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8 font-light">Discover our fine jewelry collections.</p>
        <button 
          onClick={() => navigate('/products')} 
          className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 tracking-widest text-sm uppercase transition-colors shadow-sm"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-slate-900 mb-12 tracking-widest uppercase border-b border-beige-200 pb-4">Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map(item => (
              <div key={item.cartId} className="flex gap-6 border border-beige-200 p-4 relative bg-white">
                <div className="w-32 h-40 bg-beige-100 shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2 pr-8">
                  <div>
                    <h3 className="font-serif text-lg text-slate-900 mb-1 leading-snug">{item.name}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{item.category}</p>
                    <p className="text-xs text-slate-600 space-x-4">
                      <span>Purity: <span className="text-slate-900 font-medium">{item.goldType}</span></span>
                      <span>Size: <span className="text-slate-900 font-medium">{item.size}</span></span>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-beige-200 w-28 h-10 bg-white">
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-gold-600 transition-colors"
                      >-</button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        readOnly
                        className="w-12 h-full text-center text-slate-900 font-medium focus:outline-none bg-transparent"
                      />
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-gold-600 transition-colors"
                      >+</button>
                    </div>
                    <p className="font-medium text-gold-600">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.cartId)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-beige-50 border border-beige-200 p-8 sticky top-28">
              <h2 className="font-serif text-xl text-slate-900 mb-6 tracking-widest uppercase border-b border-beige-200 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="font-medium text-slate-900">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="italic">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-beige-200 pt-6 mb-8">
                <span className="font-medium text-slate-900 tracking-widest uppercase">Estimated Total</span>
                <span className="text-xl font-medium text-gold-600">{formatPrice(cartTotal)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white flex justify-center py-4 tracking-widest text-sm uppercase transition-colors shadow-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
