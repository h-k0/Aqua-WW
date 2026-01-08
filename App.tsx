
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';
import { db } from './services/db';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProductionPlan from './components/ProductionPlan';
import DeliveryRoute from './components/DeliveryRoute';
import CustomerOrdering from './components/CustomerOrdering';
import ManagementView from './components/ManagementView';
import { Settings, Users as UsersIcon, ChevronDown, Rocket } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(true);

  // Initialize DB once on start
  useEffect(() => {
    // db is initialized on import
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    // Overhaul: Customers go straight to ordering, not dashboard
    if (user.role === UserRole.PUBLIC_CUSTOMER) {
      setActiveTab('orders');
    } else if (user.role === UserRole.DELIVERY_MAN) {
      setActiveTab('route');
    } else {
      setActiveTab('dashboard');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 border border-white/20">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-6 transform -rotate-6">
              <Rocket className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">AquaFlow</h1>
            <p className="text-slate-400 mt-2 font-medium">Multi-Factory Ecosystem</p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Login as Profile</p>
            {db.getAll<User>('users').map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full group bg-slate-50 hover:bg-blue-600 border border-slate-100 p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 transform active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-blue-600 group-hover:text-blue-600 transition-all shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-800 group-hover:text-white transition-colors">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-blue-100 transition-colors uppercase tracking-widest">{user.role}</p>
                </div>
                <ChevronDown className="ml-auto opacity-0 group-hover:opacity-100 -rotate-90 text-white transition-all" size={20} />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400">Powered by Gemini AI Engine</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard role={currentUser.role} />;
      case 'production':
        return <ProductionPlan />;
      case 'delivery':
      case 'route':
        return <DeliveryRoute />;
      case 'orders':
        return <CustomerOrdering />;
      case 'factories':
        return <div className="p-12 text-center text-slate-400 font-medium">Factory Management Module (CRUD) Coming Soon</div>;
      case 'inventory':
        return <div className="p-12 text-center text-slate-400 font-medium">Real-time Stock Ledger Coming Soon</div>;
      case 'users':
        return <ManagementView type="users" />;
      case 'outlets':
        return <ManagementView type="outlets" />;
      default:
        return <Dashboard role={currentUser.role} />;
    }
  };

  return (
    <>
      <Layout 
        user={currentUser} 
        onLogout={() => setCurrentUser(null)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </Layout>

      {showRoleSwitcher && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md bg-opacity-95">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Settings size={12} /> Live Simulation
              </span>
              <button onClick={() => setShowRoleSwitcher(false)} className="text-slate-500 hover:text-white">&times;</button>
            </div>
            <div className="flex flex-wrap gap-2 max-w-[200px]">
              {db.getAll<User>('users').map(u => (
                <button 
                  key={u.id}
                  onClick={() => handleLogin(u)}
                  className={`text-[9px] px-2 py-1 rounded-md font-black transition-all uppercase tracking-tighter ${
                    currentUser.id === u.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {u.role.replace('Public', '')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
