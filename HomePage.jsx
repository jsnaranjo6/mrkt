import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import MarketCard from '../components/MarketCard';

const HomePage = ({ categories, markets, onNavigate, onSelectCategory }) => {
  const featuredMarkets = Object.values(markets).flat().filter(m => m.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero sencillo */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Predice el futuro
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Invierte en tus conocimientos. Gana con tus predicciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('explorar')}
                className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Explorar mercados</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías principales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>

      {/* Mercados destacados */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Mercados destacados</h2>
            <button
              onClick={() => onNavigate('explorar')}
              className="text-red-600 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMarkets.map(market => (
              <MarketCard
                key={market.id}
                market={market}
                onClick={() => onNavigate('market', market)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
