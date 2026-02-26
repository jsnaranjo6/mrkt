import React from 'react';
import { ChevronRight } from 'lucide-react';

const CategoryCard = ({ category, onSelect }) => {
  const Icon = category.icon;
  
  return (
    <button
      onClick={() => onSelect(category.id)}
      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition-all group text-left"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
          <Icon className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
      <p className="text-sm text-gray-500">{category.count} mercados</p>
    </button>
  );
};

export default CategoryCard;
