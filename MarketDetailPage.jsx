import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import PriceChart from '../components/PriceChart';
import LiveOrderBook from '../components/LiveOrderBook';
import ActivityFeed from '../components/ActivityFeed';
import { generateRandomOrder, calculateNewPrice } from '../utils/marketUtils';

const MarketDetailPage = ({ market, onNavigate, onBack, onPlaceOrder }) => {
  const [step, setStep] = useState(1);
  const [selectedSide, setSelectedSide] = useState(null);
  const [amount, setAmount] = useState('');
  
  // Estado para datos de mercado
  const [currentPrice, setCurrentPrice] = useState(market.yesPrice);
  const [priceHistory, setPriceHistory] = useState([
    { timestamp: Date.now() - 60000, price: market.yesPrice }
  ]);
  const [orders, setOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  
  // Estado para controlar simulación
  const [isSimulating, setIsSimulating] = useState(false);

  // Función para activar/desactivar simulación
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  // Simular órdenes solo cuando esté activo
  useEffect(() => {
    if (!isSimulating) return;

    const generateOrder = () => {
      const newOrder = generateRandomOrder(currentPrice, market.id);
      
      setOrders(prev => [...prev, newOrder]);
      setRecentOrders(prev => [newOrder, ...prev].slice(0, 20));
      
      // Actualizar precio basado en la orden
      const newPrice = calculateNewPrice(currentPrice, [...orders, newOrder], newOrder.side);
      setCurrentPrice(newPrice);
      
      // Agregar al historial de precios
      setPriceHistory(prev => {
        const updated = [...prev, { timestamp: Date.now(), price: newPrice }];
        return updated.slice(-50);
      });
    };

    // Primera orden inmediata
    const timeout = setTimeout(generateOrder, 1000);
    
    // Órdenes periódicas cada 2-5 segundos
    const interval = setInterval(generateOrder, Math.random() * 3000 + 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isSimulating, currentPrice, orders, market.id]);

  const handleSelectSide = (side) => {
    setSelectedSide(side);
    setStep(2);
  };

  const estimatedShares = amount && selectedSide 
    ? (parseFloat(amount) / (selectedSide === 'yes' ? currentPrice : (1 - currentPrice))).toFixed(2)
    : '0';

  const potentialWin = amount && selectedSide
    ? (parseFloat(estimatedShares) * (selectedSide === 'yes' ? (1 - currentPrice) : currentPrice)).toFixed(2)
    : '0';

  const handleConfirmOrder = () => {
    // Crear orden del usuario
    const userOrder = {
      id: `user_order_${Date.now()}`,
      marketId: market.id,
      side: selectedSide === 'yes' ? 'buy' : 'sell',
      price: currentPrice,
      size: parseFloat(estimatedShares),
      timestamp: Date.now(),
      isUserOrder: true
    };

    // Agregar a órdenes y afectar el precio
    setOrders(prev => [...prev, userOrder]);
    setRecentOrders(prev => [userOrder, ...prev].slice(0, 20));
    
    const newPrice = calculateNewPrice(currentPrice, [...orders, userOrder], userOrder.side);
    setCurrentPrice(newPrice);
    setPriceHistory(prev => [...prev, { timestamp: Date.now(), price: newPrice }].slice(-50));

    // Callback al parent
    onPlaceOrder(market.id, selectedSide, parseFloat(amount), currentPrice);
    
    // Volver a cuenta
    setTimeout(() => {
      onNavigate('cuenta');
    }, 500);
  };

  // Separar órdenes de compra y venta
  const buyOrders = orders
    .filter(o => o.side === 'buy')
    .sort((a, b) => b.price - a.price)
    .slice(0, 10);
    
  const sellOrders = orders
    .filter(o => o.side === 'sell')
    .sort((a, b) => a.price - b.price)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Volver</span>
        </button>

        {/* Info del mercado */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {market.title}
              </h1>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Volumen</div>
                  <div className="text-xl font-bold text-gray-900">
                    ${(market.volume / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Cierra</div>
                  <div className="text-xl font-bold text-gray-900">
                    {new Date(market.endDate).toLocaleDateString('es-EC', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Estado</div>
                  <div className="text-xl font-bold text-green-600 flex items-center justify-center space-x-1">
                    {isSimulating && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                    <span>{isSimulating ? 'En vivo' : 'Estático'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de simulación */}
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isSimulating 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isSimulating ? 'Detener simulación' : 'Activar simulación'}
            </button>
          </div>

          {!isSimulating && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                💡 <strong>Modo de prueba:</strong> Activa la simulación para ver cómo las órdenes afectan el precio en tiempo real
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de precio */}
          <div className="lg:col-span-2">
            <PriceChart priceHistory={priceHistory} currentPrice={currentPrice} />
          </div>

          {/* Libro de órdenes */}
          <div>
            <LiveOrderBook 
              buyOrders={buyOrders}
              sellOrders={sellOrders}
              currentPrice={currentPrice}
            />
          </div>
        </div>

        {/* Feed de actividad */}
        {recentOrders.length > 0 && (
          <div className="mb-6">
            <ActivityFeed recentOrders={recentOrders} />
          </div>
        )}

        {/* Paso 1: Seleccionar lado */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Paso 1: ¿Qué predices?
            </h2>
            <p className="text-gray-600 mb-6">
              Selecciona tu predicción
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectSide('yes')}
                className="border-2 border-gray-200 rounded-xl p-8 hover:border-red-600 hover:shadow-lg transition-all text-left group"
              >
                <div className="text-sm text-gray-500 mb-2">Apuesto que</div>
                <div className="text-2xl font-bold text-gray-900 mb-4">SÍ</div>
                <div className="text-sm text-gray-600 mb-4">
                  Si aciertas, ganas ${(1 - currentPrice).toFixed(2)} por cada dólar
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="text-xs text-gray-600 mb-1">Probabilidad actual</div>
                  <div className="text-3xl font-bold text-red-600">
                    {(currentPrice * 100).toFixed(1)}%
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSelectSide('no')}
                className="border-2 border-gray-200 rounded-xl p-8 hover:border-red-600 hover:shadow-lg transition-all text-left group"
              >
                <div className="text-sm text-gray-500 mb-2">Apuesto que</div>
                <div className="text-2xl font-bold text-gray-900 mb-4">NO</div>
                <div className="text-sm text-gray-600 mb-4">
                  Si aciertas, ganas ${currentPrice.toFixed(2)} por cada dólar
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Probabilidad actual</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {((1 - currentPrice) * 100).toFixed(1)}%
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Ingresar monto */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <button
              onClick={() => setStep(1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Cambiar predicción</span>
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Paso 2: ¿Cuánto quieres invertir?
            </h2>
            <p className="text-gray-600 mb-6">
              Tu predicción: <span className="font-bold text-red-600">{selectedSide === 'yes' ? 'SÍ' : 'NO'}</span>
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto a invertir (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              {/* Botones rápidos */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {['10', '50', '100', '500'].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Resumen */}
            {amount && parseFloat(amount) > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Inviertes</span>
                  <span className="font-bold text-gray-900">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recibes</span>
                  <span className="font-bold text-gray-900">{estimatedShares} shares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio actual</span>
                  <span className="font-bold text-red-600">{(currentPrice * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Si ganas</span>
                  <span className="font-bold text-green-600">+${potentialWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total si aciertas</span>
                  <span className="font-bold text-green-600">${(parseFloat(amount) + parseFloat(potentialWin)).toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Revisar y confirmar</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Paso 3: Confirmar */}
        {step === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <button
              onClick={() => setStep(2)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Modificar monto</span>
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Paso 3: Confirmar operación
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="text-sm text-gray-500 mb-2">Mercado</div>
              <div className="font-bold text-gray-900 mb-4">{market.title}</div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Tu predicción</div>
                  <div className={`text-2xl font-bold ${selectedSide === 'yes' ? 'text-red-600' : 'text-gray-900'}`}>
                    {selectedSide === 'yes' ? 'SÍ' : 'NO'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Monto</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${parseFloat(amount).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shares</span>
                  <span className="font-semibold text-gray-900">{estimatedShares}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio ejecución</span>
                  <span className="font-semibold text-red-600">{(currentPrice * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ganancia potencial</span>
                  <span className="font-semibold text-green-600">+${potentialWin}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Comisión (0.3%)</span>
                  <span className="font-semibold text-gray-900">${(parseFloat(amount) * 0.003).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {isSimulating && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  ⚠️ El precio puede cambiar antes de ejecutarse tu orden debido a la actividad del mercado
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
              >
                Confirmar apuesta
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDetailPage;
