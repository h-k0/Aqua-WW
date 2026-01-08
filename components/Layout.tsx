
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  Factory, 
  Package, 
  Truck, 
  Users, 
  ShoppingCart, 
  LogOut,
  ChevronRight,
  Menu,
  Bell,
  MapPin,
  ClipboardList,
  Store,
  Grid
} from 'lucide-react';

interface LayoutProps {
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, children, onLogout, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid, roles: [UserRole.PLATFORM_ADMIN, UserRole.FACTORY_OWNER, UserRole.FACTORY_ADMIN, UserRole.AGENT] },
    { id: 'factories', label: 'Factories', icon: Factory, roles: [UserRole.PLATFORM_ADMIN] },
    { id: 'production', label: 'Production', icon: Package, roles: [UserRole.FACTORY_OWNER, UserRole.FACTORY_ADMIN] },
    { id: 'inventory', label: 'Inventory', icon: ClipboardList, roles: [UserRole.FACTORY_OWNER, UserRole.FACTORY_ADMIN, UserRole.AGENT] },
    { id: 'orders', label: 'Water Orders', icon: ShoppingCart, roles: [UserRole.FACTORY_OWNER, UserRole.FACTORY_ADMIN, UserRole.AGENT, UserRole.PUBLIC_CUSTOMER] },
    { id: 'delivery', label: 'Route Plan', icon: Truck, roles: [UserRole.FACTORY_ADMIN, UserRole.AGENT, UserRole.DELIVERY_MAN] },
    { id: 'users', label: 'Team', icon: Users, roles: [UserRole.FACTORY_OWNER, UserRole.AGENT] },
    { id: 'outlets', label: 'Outlets', icon: Store, roles: [UserRole.AGENT] },
  ].filter(item => item.roles.includes(user.role));

  // Special Case for Delivery Man
  if (user.role === UserRole.DELIVERY_MAN) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-xl font-black tracking-tight">AquaFlow Driver</h1>
          <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors"><LogOut size={20} /></button>
        </header>
        <main className="flex-1 p-4 pb-24 overflow-y-auto">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50 rounded-t-2xl">
          <button onClick={() => setActiveTab('route')} className={`flex flex-col items-center gap-1 py-1 transition-all ${activeTab === 'route' ? 'text-blue-600 font-bold scale-110' : 'text-gray-400'}`}>
            <MapPin size={22} />
            <span className="text-[10px]">Today's Route</span>
          </button>
          <button onClick={() => setActiveTab('delivered')} className={`flex flex-col items-center gap-1 py-1 transition-all ${activeTab === 'delivered' ? 'text-blue-600 font-bold scale-110' : 'text-gray-400'}`}>
            <ClipboardList size={22} />
            <span className="text-[10px]">History</span>
          </button>
        </nav>
      </div>
    );
  }

  // Special Case for Public Customer
  if (user.role === UserRole.PUBLIC_CUSTOMER) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white p-4 sticky top-0 z-50 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">A</div>
            <h1 className="text-lg font-black tracking-tighter text-slate-900">AquaFlow</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Bell size={20} /></button>
            <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><LogOut size={20} /></button>
          </div>
        </header>
        <main className="max-w-md mx-auto">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around p-3 z-50">
           <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center gap-1 py-1 ${activeTab === 'orders' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <ShoppingCart size={22} />
            <span className="text-[10px]">Order</span>
          </button>
          <button onClick={() => setActiveTab('orders-history')} className={`flex flex-col items-center gap-1 py-1 ${activeTab === 'orders-history' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <ClipboardList size={22} />
            <span className="text-[10px]">Orders</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 py-1 ${activeTab === 'profile' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <Users size={22} />
            <span className="text-[10px]">Account</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-2xl z-40`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/20 shrink-0">A</div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tighter">AquaFlow</span>}
        </div>
        
        <nav className="flex-1 mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={`shrink-0 transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
          >
            <LogOut size={20} className="shrink-0 group-hover:translate-x-1" />
            {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white h-16 border-b border-slate-100 flex items-center justify-between px-8 z-30 shadow-sm shadow-slate-100/50">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">{user.name}</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black shadow-sm">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
