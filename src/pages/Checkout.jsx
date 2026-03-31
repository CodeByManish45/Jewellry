import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';

export const Checkout = () => {
  const { cartTotal, cartItems } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert('Mock order placed successfully! Your exquisite jewelry is on the way.');
    navigate('/');
  };

  return (
    <div className="bg-beige-100/30 min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-slate-900 mb-12 tracking-widest uppercase text-center">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 border border-beige-200 shadow-sm">
            <h2 className="font-serif text-xl tracking-widest uppercase mb-6 border-b border-beige-200 pb-4 text-slate-900">Shipping Details</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">First Name</label>
                  <input type="text" required className="w-full border border-beige-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-beige-50/50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Last Name</label>
                  <input type="text" required className="w-full border border-beige-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-beige-50/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                <input type="email" required className="w-full border border-beige-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-beige-50/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Shipping Address</label>
                <input type="text" required className="w-full border border-beige-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-beige-50/50" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">City</label>
                  <input type="text" required className="w-full border border-beige-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-beige-50/50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">ZIP / Postal Code</label>
                  <input type="text" required className="w-full border border-beige-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-beige-50/50" />
                </div>
              </div>
              <div className="pt-8 mt-4">
                <button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-white flex justify-center py-4 tracking-widest text-sm uppercase transition-colors shadow-sm">
                  Complete Purchase
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 tracking-wide font-light">All transactions are secure and encrypted.</p>
              </div>
            </form>
          </div>

          {/* Checkout Summary */}
          <div className="bg-slate-50 p-8 border border-slate-200 self-start">
             <h2 className="font-serif text-xl tracking-widest uppercase mb-6 border-b border-slate-200 pb-4 text-slate-900">In Your Bag</h2>
             <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold-500">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-sm pb-4 border-b border-slate-200/50 last:border-0 last:pb-0">
                    <img src={item.images[0]} alt="" className="w-16 h-20 object-cover mix-blend-multiply bg-white border border-slate-100" />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-medium text-slate-900 mb-1">{item.name}</p>
                      <p className="text-slate-500 text-xs mb-1">Qty: {item.quantity} | {item.goldType}</p>
                      <p className="text-gold-600 font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between items-center bg-slate-100 p-4 rounded-sm mt-4">
               <span className="font-semibold text-slate-900 tracking-widest uppercase text-sm">Total to Pay</span>
               <span className="text-xl font-bold text-gold-600">{formatPrice(cartTotal)}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
