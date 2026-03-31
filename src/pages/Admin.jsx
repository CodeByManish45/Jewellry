import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/products';
import { Plus, Edit2, Trash2, Package, Search, Image as ImageIcon, Save, X } from 'lucide-react';
import { formatPrice } from '../utils/pricing';

export const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('inventory');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      baseWeight: parseFloat(formData.baseWeight) || 0,
      images: formData.images.split(',').map(img => img.trim()).filter(img => img),
    };

    if (editingId) {
      updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      addProduct(productData);
      setActiveTab('inventory');
    }
    resetForm();
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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FCFBFA] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 tracking-widest uppercase mb-2">Jewelry Management</h1>
            <p className="text-slate-500 font-light tracking-wide">Administrator portal for inventory and collection curation.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-sm border border-slate-200 shadow-sm">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Inventory
            </button>
            <button 
              onClick={() => { setActiveTab('add'); resetForm(); }}
              className={`px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
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
              <div className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Showing {filteredProducts.length} of {products.length} Items
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
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
                          <div className="w-12 h-12 bg-slate-100 shrink-0">
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{product.name}</div>
                            <div className="text-xs text-slate-400 font-light truncate max-w-[200px]">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                          <span className="text-sm text-slate-600 font-medium">{product.stock} units</span>
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
                            onClick={() => { if(window.confirm('Delete this product?')) deleteProduct(product.id) }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-serif text-lg italic">
                        No products found in our records.
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
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-serif text-lg tracking-widest uppercase text-slate-900">
                  {editingId ? 'Modify Product Details' : 'Register New Piece'}
                </h2>
                {editingId && (
                  <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Product Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50" 
                        placeholder="e.g., Majestic Diamond Tiara"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required 
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50"
                      >
                        <option value="">Select Boutique</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Price (Base)</label>
                        <input 
                          type="number" 
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required 
                          className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50" 
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Initial Stock</label>
                        <input 
                          type="number" 
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required 
                          className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50" 
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visuals & Specs */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                        <ImageIcon className="w-3 h-3 text-gold-600" />
                        Image URLs (Comma Separated)
                      </label>
                      <textarea 
                        name="images"
                        value={formData.images}
                        onChange={handleInputChange}
                        required 
                        rows="3"
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50"
                        placeholder="https://image1.jpg, https://image2.jpg..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Gold Weight (Estimated Grams)</label>
                      <input 
                        type="number" 
                        name="baseWeight"
                        value={formData.baseWeight}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50" 
                        placeholder="Optional"
                      />
                    </div>

                    <div className="p-4 bg-gold-50/30 border border-gold-100 rounded-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-800 mb-1">Luxury Specifications</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed italic">
                        New products will automatically include Standard, Small, and Large size options and offer selections in 18k and 22k Gold/Diamond karats.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required 
                    rows="4" 
                    className="w-full border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all bg-slate-50/50"
                    placeholder="Describe the craftsmanship and inspiration behind this piece..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="px-8 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-3 text-xs font-semibold uppercase tracking-widest transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingId ? 'Update Collection' : 'Add to Collection'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
