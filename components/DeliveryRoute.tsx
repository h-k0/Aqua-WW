
import React, { useState } from 'react';
// Import the Truck icon from lucide-react to resolve the 'Cannot find name' error.
import { MapPin, Phone, CheckCircle2, Navigation, ShoppingBag, RotateCcw, Truck } from 'lucide-react';

const DeliveryRoute: React.FC = () => {
  const [dayStarted, setDayStarted] = useState(false);
  const [stops, setStops] = useState([
    { id: 'S1', name: 'Sunshine Grocery', address: 'Block 4, North Hills', waterDue: 20, bottlesReturn: 15, status: 'pending' },
    { id: 'S2', name: 'Mini Mart East', address: 'Plot 12, Riverside', waterDue: 50, bottlesReturn: 45, status: 'pending' },
    { id: 'S3', name: 'City Fresh', address: 'Central Market St.', waterDue: 15, bottlesReturn: 10, status: 'pending' },
  ]);

  const markCompleted = (id: string) => {
    setStops(stops.map(s => s.id === id ? {...s, status: 'completed'} : s));
  };

  if (!dayStarted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <Truck size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Good Morning, Mike!</h2>
        <p className="text-gray-500 mb-8 max-w-xs">You have 12 stops planned for today's route. Please start your day to view the map.</p>
        <button 
          onClick={() => setDayStarted(true)}
          className="bg-blue-600 text-white w-full max-w-xs py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Start Day
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center sticky top-4 z-10">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Active Route</p>
          <p className="font-black text-gray-900">NORTH-A-01</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-blue-600">{stops.filter(s => s.status === 'completed').length}/{stops.length}</p>
          <p className="text-xs text-gray-500">Stops Left</p>
        </div>
      </div>

      <div className="space-y-4">
        {stops.map((stop, idx) => (
          <div key={stop.id} className={`p-4 rounded-2xl border transition-all ${
            stop.status === 'completed' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-blue-100 shadow-sm'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{stop.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} className="text-gray-400" /> {stop.address}
                  </p>
                </div>
              </div>
              <button className="p-2 bg-blue-50 text-blue-600 rounded-full">
                <Phone size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50/50 p-3 rounded-xl flex items-center gap-3">
                <ShoppingBag size={20} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Deliver</p>
                  <p className="font-bold text-gray-900">{stop.waterDue} Bottles</p>
                </div>
              </div>
              <div className="bg-orange-50/50 p-3 rounded-xl flex items-center gap-3">
                <RotateCcw size={20} className="text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="font-bold text-gray-900">{stop.bottlesReturn} Empties</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Navigation size={18} /> Navigate
              </button>
              {stop.status !== 'completed' && (
                <button 
                  onClick={() => markCompleted(stop.id)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} /> Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold mt-8">
        End Day & Submit Summary
      </button>
    </div>
  );
};

export default DeliveryRoute;
