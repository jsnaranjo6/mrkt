import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ActivityFeed = ({ recentOrders }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-4">Actividad Reciente</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {recentOrders.slice(0, 10).map((order) => (
          <div 
            key={order.id}
            className="flex items-center justify-between text-sm py-2 px-3 rounded bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              {order.side === 'buy' ? (
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600" />
              )}
              <span className={order.side === 'buy' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {order.side === 'buy' ? 'COMPRA' : 'VENTA'}
              </span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {(order.price * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">
                {order.size} shares
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
