import React from 'react';

const LiveOrderBook = ({ buyOrders, sellOrders, currentPrice }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-4">Libro de Órdenes</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Órdenes de venta */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase">
            Vender (Ask)
          </div>
          <div className="space-y-1">
            {sellOrders.slice(0, 8).map((order, idx) => (
              <div 
                key={idx}
                className="flex justify-between text-sm py-1 px-2 rounded bg-red-50 border border-red-100"
              >
                <span className="font-semibold text-red-600">
                  {(order.price * 100).toFixed(1)}%
                </span>
                <span className="text-gray-600">{order.size}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Órdenes de compra */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase">
            Comprar (Bid)
          </div>
          <div className="space-y-1">
            {buyOrders.slice(0, 8).map((order, idx) => (
              <div 
                key={idx}
                className="flex justify-between text-sm py-1 px-2 rounded bg-green-50 border border-green-100"
              >
                <span className="font-semibold text-green-600">
                  {(order.price * 100).toFixed(1)}%
                </span>
                <span className="text-gray-600">{order.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <div className="text-xs text-gray-500">Spread</div>
        <div className="text-lg font-bold text-gray-900">
          {sellOrders.length > 0 && buyOrders.length > 0 
            ? ((sellOrders[0].price - buyOrders[0].price) * 100).toFixed(2)
            : '0.00'}%
        </div>
      </div>
    </div>
  );
};

export default LiveOrderBook;
