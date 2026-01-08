
import React, { useState } from 'react';
import { getSmartProductionPlan } from '../services/geminiService';
import { Sparkles, Loader2, Check, Printer } from 'lucide-react';

const ProductionPlan: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setLoading(true);
    // Mock historical data
    const historicalData = {
      avgDaily: 450,
      peaks: ['Monday', 'Friday'],
      outOfStockEvents: 2,
      lastThreeDays: [420, 510, 390]
    };
    
    const result = await getSmartProductionPlan("Everest Springs", historicalData);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Production Planning</h2>
          <p className="text-gray-500">Manage daily batches and optimize inventory with AI.</p>
        </div>
        <button 
          onClick={generatePlan}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          Generate AI Plan
        </button>
      </div>

      {plan && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 text-indigo-700 font-bold mb-4">
            <Sparkles size={20} />
            AI Recommendations for Tomorrow
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.recommendations.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm">
                <p className="font-bold text-gray-900">{item.productName}</p>
                <p className="text-3xl font-black text-indigo-600 my-2">{item.suggestedQuantity} Units</p>
                <p className="text-xs text-gray-500 leading-relaxed italic">"{item.reasoning}"</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors">
                  Create Batch
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-100/50 rounded-xl">
            <p className="text-sm text-indigo-800 font-medium">Summary: <span className="font-normal">{plan.summary}</span></p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Today's Active Batches</h3>
          <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Printer size={16} /> Print Sheet
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Batch ID</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Target Qty</th>
              <th className="px-6 py-4">Produced</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              {id: 'B-101', product: '20L Drinking Water', target: 500, current: 500, status: 'Completed'},
              {id: 'B-102', product: '5L Refill Pack', target: 200, current: 155, status: 'In Progress'},
              {id: 'B-103', product: '20L Drinking Water', target: 300, current: 0, status: 'Confirmed'},
            ].map(batch => (
              <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono font-medium">{batch.id}</td>
                <td className="px-6 py-4 font-semibold">{batch.product}</td>
                <td className="px-6 py-4">{batch.target}</td>
                <td className="px-6 py-4">{batch.current}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    batch.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    batch.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {batch.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionPlan;
