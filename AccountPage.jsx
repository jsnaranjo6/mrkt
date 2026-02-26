import React from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AccountPage = ({ user, userPositions, markets, onNavigate }) => {
  // Calcular totales
  const totalInvested = userPositions.reduce((sum, p) => sum + p.invested, 0);
  
  const totalCurrent = userPositions.reduce((sum, p) => {
    // Obtener precio actual del mercado
    const market = Object.values(markets).flat().find(m => m.id === p.marketId);
    if (!market) return sum + p.currentValue;
    
    const currentPrice = p.outcome === 'SÍ' ? market.yesPrice : (1 - market.yesPrice);
    return sum + (p.shares * currentPrice);
  }, 0);
  
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent = totalInvested > 0 ? ((totalPnL / totalInvested) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi cuenta</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Balance disponible</div>
            <div className="text-3xl font-bold text-gray-900">
              ${user.balance.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Disponible para invertir
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Total invertido</div>
            <div className="text-3xl font-bold text-gray-900">
              ${totalInvested.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              En {userPositions.length} posiciones
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Ganancia/Pérdida</div>
            <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
            <div className={`text-xs mt-2 flex items-center ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-1" />
              )}
              {totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Resumen patrimonial */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen patrimonial</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Balance disponible</span>
              <span className="font-semibold text-gray-900">${user.balance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Valor en posiciones</span>
              <span className="font-semibold text-gray-900">${totalCurrent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 pt-3">
              <span className="font-bold text-gray-900">Patrimonio total</span>
              <span className="font-bold text-gray-900">
                ${(user.balance + totalCurrent).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Posiciones activas */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Posiciones activas</h2>

          {userPositions.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tienes posiciones activas
              </h3>
              <p className="text-gray-600 mb-6">
                Comienza a predecir en los mercados para ver tus posiciones aquí
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Explorar mercados
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userPositions.map(position => {
                // Calcular valores actuales
                const market = Object.values(markets).flat().find(m => m.id === position.marketId);
                const currentPrice = market 
                  ? (position.outcome === 'SÍ' ? market.yesPrice : (1 - market.yesPrice)) 
                  : position.currentPrice;
                const currentValue = position.shares * currentPrice;
                const pnl = currentValue - position.invested;
                const pnlPercent = ((pnl / position.invested) * 100);
                
                return (
                  <div 
                    key={position.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">
                          {position.marketTitle}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                            position.outcome === 'SÍ' 
                              ? 'bg-red-50 text-red-600 border border-red-200' 
                              : 'bg-gray-100 text-gray-900 border border-gray-200'
                          }`}>
                            {position.outcome}
                          </span>
                          <span className="text-sm text-gray-500">
                            {position.shares.toFixed(2)} shares @ ${position.avgPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-xl font-bold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                        </div>
                        <div className={`text-sm flex items-center justify-end ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {pnl >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    {/* Detalles de la posición */}
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500 mb-1">Invertido</div>
                          <div className="font-semibold text-gray-900">
                            ${position.invested.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Valor actual</div>
                          <div className="font-semibold text-gray-900">
                            ${currentValue.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Precio entrada</div>
                          <div className="font-semibold text-gray-900">
                            {(position.avgPrice * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Precio actual</div>
                          <div className="font-semibold text-red-600">
                            {(currentPrice * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center justify-end mt-3 space-x-2">
                      <button
                        onClick={() => {
                          const market = Object.values(markets).flat().find(m => m.id === position.marketId);
                          if (market) onNavigate('market', market);
                        }}
                        className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Ver mercado
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Estadísticas adicionales */}
        {userPositions.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-1">Posiciones ganadoras</div>
              <div className="text-2xl font-bold text-green-600">
                {userPositions.filter(p => {
                  const market = Object.values(markets).flat().find(m => m.id === p.marketId);
                  if (!market) return false;
                  const currentPrice = p.outcome === 'SÍ' ? market.yesPrice : (1 - market.yesPrice);
                  const currentValue = p.shares * currentPrice;
                  return currentValue > p.invested;
                }).length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                de {userPositions.length} totales
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-1">Mejor posición</div>
              <div className="text-2xl font-bold text-green-600">
                {(() => {
                  const bestPosition = userPositions.reduce((best, p) => {
                    const market = Object.values(markets).flat().find(m => m.id === p.marketId);
                    if (!market) return best;
                    const currentPrice = p.outcome === 'SÍ' ? market.yesPrice : (1 - market.yesPrice);
                    const currentValue = p.shares * currentPrice;
                    const pnlPercent = ((currentValue - p.invested) / p.invested) * 100;
                    return pnlPercent > best ? pnlPercent : best;
                  }, -Infinity);
                  return bestPosition === -Infinity ? '0.00' : `+${bestPosition.toFixed(2)}`;
                })()}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Ganancia porcentual
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-1">Total apostado</div>
              <div className="text-2xl font-bold text-gray-900">
                ${(totalInvested + user.balance).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Capital inicial
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
