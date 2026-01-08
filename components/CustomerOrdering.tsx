
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, MapPin, Clock, CreditCard, Search, ChevronRight, Star } from 'lucide-react';
import { db } from '../services/db';
import { Product } from '../types';

const CustomerOrdering: React.FC = () => {
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);
  const [deliveryDay, setDeliveryDay] = useState('Tomorrow');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProducts(db.getAll<Product>('products'));
  }, []);

  const updateQty = (id: string, delta: number) => {
    const existing = cart.find(c => c.id === id);
    if (existing) {
      const newQty = Math.max(0, existing.qty + delta);
      if (newQty === 0) {
        setCart(cart.filter(c => c.id !== id));
      } else {
        setCart(cart.map(c => c.id === id ? {...c, qty: newQty} : c));
      }
    } else if (delta > 0) {
      setCart([...cart, {id, qty: delta}]);
    }
  };

  const total = cart.reduce((sum, item) => {
    const p = products.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="p-4 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={18} className="text-blue-600" />
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Deliver to</p>
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
              Home • Flat 12B, North Heights <ChevronRight size={14} />
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search water types, sizes..."
            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1">Stay Hydrated!</h3>
            <p className="text-blue-100 text-sm mb-4">Get 10% off on your first 5 orders of 20L bottles.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-xs">Claim Discount</button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
            <ShoppingCart size={120} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {['All Products', 'Big Bottles', 'Small Packs', 'Refills', 'Dispensers'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border ${i === 0 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 text-gray-600 shadow-sm'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-lg font-black text-gray-900">Available Products</h2>
          {filteredProducts.map(product => {
            const item = cart.find(c => c.id === product.id);
            return (
              <div key={product.id} className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-24 h-24 bg-blue-50 rounded-xl overflow-hidden shrink-0">
                  <img src={`https://picsum.photos/seed/${product.id}/200`} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{product.name}</h3>
                      <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] text-yellow-700 font-bold">
                        <Star size={10} fill="currentColor" /> 4.9
                      </div>
                    </div>
                    <p className="text-blue-600 font-black text-lg mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-end">
                    {item ? (
                      <div className="flex items-center gap-3 bg-blue-50 px-2 py-1.5 rounded-xl border border-blue-100">
                        <button onClick={() => updateQty(product.id, -1)} className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600 border border-blue-100">
                          <Minus size={14} />
                        </button>
                        <span className="font-black text-sm w-4 text-center text-blue-700">{item.qty}</span>
                        <button onClick={() => updateQty(product.id, 1)} className="w-7 h-7 rounded-lg bg-blue-600 text-white shadow-md flex items-center justify-center">
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateQty(product.id, 1)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-200"
                      >
                        <Plus size={14} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Timing */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Schedule Delivery</h3>
          <div className="grid grid-cols-3 gap-2">
            {['Today', 'Tomorrow', 'Monday'].map(day => (
              <button 
                key={day}
                onClick={() => setDeliveryDay(day)}
                className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  deliveryDay === day ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-500'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
            <Clock size={18} className="text-blue-600" />
            <p className="text-xs text-gray-600 font-medium">Standard slot: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)] z-50 max-w-md mx-auto rounded-t-3xl">
          <div className="flex justify-between items-center mb-4 px-2">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Grand Total</p>
              <p className="text-2xl font-black text-slate-900">${total.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-600">{cart.reduce((a, b) => a + b.qty, 0)} Items</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
            <CreditCard size={20} /> View Cart & Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerOrdering;
