import React from 'react';
import { ChevronRight, DollarSign, Clock } from 'lucide-react';
import { Trophy } from 'lucide-react';

const ExplorePage = ({ selectedCategory, categories, markets, onNavigate, onBack }) => {
  const categoryData = categories.find(c => c.id === selectedCategory);
  const categoryMarkets = markets[selectedCategory] || [];
  const Icon = categoryData?.icon || Trophy;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Volver a categorías</span>
        </button>

        {/* Header de categoría */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{categoryData?.name}</h1>
              <p className="text-gray-600">{categoryMarkets.length} mercados activos</p>
            </div>
          </div>
        </div>

        {/* Lista de mercados */}
        <div className="space-y-4">
          {categoryMarkets.map(market => (
            <div
              key={market.id}
              onClick={() => onNavigate('market', market)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-red-600 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex-1 pr-4">
                  {market.title}
                </h3>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="text-xs text-gray-600 mb-1">SÍ</div>
                  <div className="text-2xl font-bold text-red-600">
                    {(market.yesPrice * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ${market.yesPrice.toFixed(2)} por share
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">NO</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {((1 - market.yesPrice) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ${(1 - market.yesPrice).toFixed(2)} por share
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Vol: ${(market.volume / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Cierra: {new Date(market.endDate).toLocaleDateString('es-EC')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
