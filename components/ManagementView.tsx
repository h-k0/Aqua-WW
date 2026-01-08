
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { User, UserRole, Outlet, Agent } from '../types';
import { Plus, Search, MoreVertical, Trash2, Edit2, Shield, UserPlus, Store } from 'lucide-react';

interface ManagementViewProps {
  type: 'users' | 'outlets' | 'agents';
}

const ManagementView: React.FC<ManagementViewProps> = ({ type }) => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, [type]);

  const loadData = () => {
    setItems(db.getAll(type === 'users' ? 'users' : type === 'outlets' ? 'outlets' : 'agents'));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this?')) {
      db.delete(type === 'users' ? 'users' : type === 'outlets' ? 'outlets' : 'agents', id);
      loadData();
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    db.create(type === 'users' ? 'users' : type === 'outlets' ? 'outlets' : 'agents', {
      ...formData,
      id: Math.random().toString(36).substr(2, 9)
    });
    setIsModalOpen(false);
    setFormData({});
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">{type} Management</h2>
          <p className="text-slate-500 text-sm">Create and manage your {type} database.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          {type === 'users' ? <UserPlus size={18} /> : <Store size={18} />} Add New
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder={`Search ${type}...`}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-4 focus:ring-blue-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Details</th>
              {type === 'users' && <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Role</th>}
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.filter(i => (i.name || i.ownerName)?.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {(item.name || item.ownerName || '?').charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.name || item.ownerName}</p>
                      <p className="text-xs text-slate-500">{item.email || item.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{item.township || item.address || item.factoryId || 'N/A'}</p>
                </td>
                {type === 'users' && (
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100">
                      {item.role}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    ><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900">Add New {type.slice(0, -1)}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 font-bold text-2xl">&times;</button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {type === 'users' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                    <select required onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
                      <option value="">Select Role</option>
                      <option value={UserRole.FACTORY_ADMIN}>Factory Admin</option>
                      <option value={UserRole.AGENT}>Agent</option>
                      <option value={UserRole.DELIVERY_MAN}>Delivery Man</option>
                    </select>
                  </div>
                </>
              )}

              {type === 'outlets' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Outlet Name</label>
                    <input required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Riverside Store" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Owner Name</label>
                    <input required onChange={e => setFormData({...formData, ownerName: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Sam" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Address</label>
                    <textarea required onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="123 Riverside Dr." rows={2} />
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-colors">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementView;
