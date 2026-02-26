import React from 'react';
import { DollarSign, Clock, Users } from 'lucide-react';

const MarketCard = ({ market, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-red-600 transition-all cursor-pointer"
    >
      <h3 className="font-bold text-gray-900 mb-4 line-clamp-2">
        {market.title}
      </h3>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Probabilidad SÍ</div>
          <div className="text-2xl font-bold text-red-600">
            {(market.yesPrice * 100).toFixed(1)}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">Probabilidad NO</div>
          <div className="text-2xl font-bold text-gray-900">
            {((1 - market.yesPrice) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4" />
          <span>${(market.volume / 1000).toFixed(0)}k</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>
            {new Date(market.endDate).toLocaleDateString('es-EC', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
