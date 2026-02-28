import React from 'react';
import { TrendingUp, User, Wallet } from 'lucide-react';

const Header = ({ user, onNavigate }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PredicEC</span>
          </div>

          {/* User section */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Wallet className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-gray-900">
                  ${user.balance.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => onNavigate('cuenta')}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:inline text-gray-900">{user.name}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
