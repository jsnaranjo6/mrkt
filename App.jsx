import React, { useState } from 'react';
import Header from './components/Header';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import MarketDetailPage from './pages/MarketDetailPage';
import AccountPage from './pages/AccountPage';
import { categories, initialMarkets } from './data/constants';

function App() {
  // Estado global
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [user, setUser] = useState(null);
  const [markets, setMarkets] = useState(initialMarkets);
  const [userPositions, setUserPositions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);

  // Handlers de navegación
  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'market') {
      setSelectedMarket(data);
    }
    window.scrollTo(0, 0);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage('explorar');
  };

  const handlePlaceOrder = (marketId, side, amount, executionPrice) => {
    // Actualizar mercados
    const updatedMarkets = { ...markets };
    Object.keys(updatedMarkets).forEach(category => {
      const marketIndex = updatedMarkets[category].findIndex(m => m.id === marketId);
      if (marketIndex !== -1) {
        updatedMarkets[category][marketIndex].yesPrice = executionPrice;
        updatedMarkets[category][marketIndex].volume += amount;
      }
    });
    setMarkets(updatedMarkets);

    // Encontrar el mercado para el título
    const market = Object.values(markets).flat().find(m => m.id === marketId);
    
    // Crear nueva posición
    const shares = amount / executionPrice;
    const newPosition = {
      id: `pos_${Date.now()}`,
      marketId,
      marketTitle: market?.title || 'Mercado desconocido',
      category: selectedCategory,
      outcome: side === 'yes' ? 'SÍ' : 'NO',
      shares,
      avgPrice: executionPrice,
      currentPrice: executionPrice,
      invested: amount,
      currentValue: shares * executionPrice
    };

    setUserPositions(prev => [...prev, newPosition]);
    
    // Actualizar balance del usuario
    setUser(prev => ({
      ...prev,
      balance: prev.balance - amount
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - mostrar solo si no está en onboarding */}
      {currentPage !== 'onboarding' && (
        <Header user={user} onNavigate={handleNavigate} />
      )}

      {/* Páginas */}
      {currentPage === 'onboarding' && (
        <OnboardingPage onComplete={handleOnboardingComplete} />
      )}

      {currentPage === 'home' && (
        <HomePage
          categories={categories}
          markets={markets}
          onNavigate={handleNavigate}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {currentPage === 'explorar' && (
        <ExplorePage
          selectedCategory={selectedCategory}
          categories={categories}
          markets={markets}
          onNavigate={handleNavigate}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'market' && selectedMarket && (
        <MarketDetailPage
          market={selectedMarket}
          onNavigate={handleNavigate}
          onBack={() => setCurrentPage('explorar')}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentPage === 'cuenta' && (
        <AccountPage
          user={user}
          userPositions={userPositions}
          markets={markets}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
