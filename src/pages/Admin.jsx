import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/products';
import { Plus, Edit2, Trash2, Package, Search, Image as ImageIcon, Save, X, Loader2 } from 'lucide-react';
import { formatPrice } from '../utils/pricing';
import toast from 'react-hot-toast';

export const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading: initialLoading } = useProducts();
  const [activeTab, setActiveTab] = useState('inventory');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: '',
    baseWeight: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      images: '',
      baseWeight: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      baseWeight: parseFloat(formData.baseWeight) || 0,
      images: formData.images.split(',').map(img => img.trim()).filter(img => img),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, productData);
        toast.success('Collection item updated meticulously.');
        setEditingId(null);
      } else {
        await addProduct(productData);
        toast.success('New masterpiece added to collection.');
        setActiveTab('inventory');
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to update registry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      images: product.images.join(', '),
      baseWeight: product.baseWeight?.toString() || '',
    });
    setEditingId(product.id);
    setActiveTab('add');
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you wish to remove this piece from the registry?')) return;
    
    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success('Product successfully removed from registry.');
    } catch (error) {
      toast.error('Deletion failed. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-beige-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gold-600 mb-4" />
        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400">Synchronizing Boutique Inventory...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBFA] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 tracking-widest uppercase mb-2">Jewelry Management</h1>
            <p className="text-slate-500 font-light tracking-wide text-xs uppercase">Administrator portal for inventory and collection curation.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-sm border border-slate-200 shadow-sm">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Inventory
            </button>
            <button 
              onClick={() => { setActiveTab('add'); resetForm(); }}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {editingId ? 'Edit Product' : 'Add New Item'}
            </button>
          </div>
        </div>

        {/* Inventory View */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Search and Filters Bar */}
            <div className="bg-white p-4 border border-slate-200 flex flex-col sm:flex-row justify-between gap-4 items-center shadow-sm">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products by name or category..." 
                  className="w-full pl-10 pr-4 py-2 text-sm border-b border-transparent focus:border-gold-500 focus:outline-none transition-all bg-slate-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Showing {filteredProducts.length} of {products.length} Masterpieces
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Info</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 shrink-0 border border-beige-100">
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="max-w-[250px]">
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-tight truncate">{product.name}</div>
                            <div className="text-[10px] text-slate-400 font-medium truncate italic">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gold-50 text-[9px] font-bold text-gold-700 uppercase tracking-widest border border-gold-100">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 tracking-tight">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : product.stock > 0 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`}></span>
                          <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">{product.stock} units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-slate-400 hover:text-gold-600 hover:bg-gold-50 transition-all rounded-sm"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm relative"
                            disabled={deletingId === product.id}
                            title="Delete Product"
                          >
                            {deletingId === product.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center text-slate-300 font-serif text-lg italic">
                        NO MASTERPIECES FOUND IN OUR RECORDS.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit View */}
        {activeTab === 'add' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 shadow-xl overflow-hidden rounded-sm">
              <div className="bg-slate-900 px-8 py-5 flex justify-between items-center">
                <h2 className="font-serif text-lg tracking-[0.2em] uppercase text-white">
                  {editingId ? 'Modify Piece Details' : 'Register New Masterpiece'}
                </h2>
                {editingId && (
                  <button onClick={resetForm} className="text-white/60 hover:text-white transition-colors">
                    <X className="w-6 h-6 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Basic Info */}
                  <div className="space-y-6">
                    <div className="relative group">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Product Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="w-full border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                        placeholder="e.g., Majestic Diamond Tiara"
                      />
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Category Boutique</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required 
                        className="w-full border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900 appearance-none"
                      >
                        <option value="">Select Boutique</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-2">
                      <div className="relative group">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Base Price ($)</label>
                        <input 
                          type="number" 
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required 
                          className="w-full border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                          placeholder="0.00"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Initial Stock</label>
                        <input 
                          type="number" 
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required 
                          className="w-full border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visuals & Specs */}
                  <div className="space-y-6">
                    <div className="relative group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2 transition-colors group-focus-within:text-gold-600">
                        <ImageIcon className="w-3 h-3 text-gold-600" />
                        Image URLs (Comma Separated)
                      </label>
                      <textarea 
                        name="images"
                        value={formData.images}
                        onChange={handleInputChange}
                        required 
                        rows="3"
                        className="w-full border border-slate-100 p-4 text-sm focus:outline-none focus:border-gold-500 transition-all bg-slate-50/50 rounded-sm"
                        placeholder="https://image1.jpg, https://image2.jpg..."
                      ></textarea>
                    </div>

                    <div className="relative group">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-gold-600">Pure Gold Weight (Grams)</label>
                      <input 
                        type="number" 
                        name="baseWeight"
                        value={formData.baseWeight}
                        onChange={handleInputChange}
                        className="w-full border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-gold-500 transition-all bg-transparent text-slate-900" 
                        placeholder="Weight in grams"
                      />
                    </div>

                    <div className="p-5 bg-gold-50 border border-gold-100 rounded-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-800 mb-2">Automated Specifications</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed italic font-medium">
                        Registry will auto-generate Standard/Small/Large options and provide 18k/22k Karat selections for all new pieces added.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Artistic Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required 
                    rows="4" 
                    className="w-full border border-slate-100 p-5 text-sm focus:outline-none focus:border-gold-500 transition-all bg-slate-50/50 rounded-sm"
                    placeholder="Describe the craftsmanship and royal inspiration..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-6 pt-10 border-t border-slate-50">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    Discard Changes
                  </button>
                  <AnimatedButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center gap-3 disabled:opacity-70 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                        Updating Collection...
                      </>
                    ) : (
                      <>
                        <Save className="w-3 h-3 text-white/50 group-hover:scale-110 transition-transform" />
                        {editingId ? 'Seal Changes in Registry' : 'Enter into Grand Collection'}
                      </>
                    )}
                  </AnimatedButton>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
