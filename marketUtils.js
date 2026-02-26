// Generador de órdenes aleatorias
export const generateRandomOrder = (currentPrice, marketId) => {
  const side = Math.random() > 0.5 ? 'buy' : 'sell';
  const size = Math.floor(Math.random() * 500) + 50; // 50-550 shares
  const priceVariation = (Math.random() - 0.5) * 0.05; // ±5% variation
  const price = Math.max(0.01, Math.min(0.99, currentPrice + priceVariation));
  
  return {
    id: `order_${Date.now()}_${Math.random()}`,
    marketId,
    side,
    price: parseFloat(price.toFixed(2)),
    size,
    timestamp: Date.now()
  };
};

// Función para calcular nueva probabilidad basada en órdenes
export const calculateNewPrice = (currentPrice, orders, lastOrderSide) => {
  // Simulación simple: órdenes de compra (buy) aumentan precio, sell lo disminuyen
  const buyOrders = orders.filter(o => o.side === 'buy').length;
  const sellOrders = orders.filter(o => o.side === 'sell').length;
  
  const pressure = (buyOrders - sellOrders) * 0.001; // Presión de mercado
  let newPrice = currentPrice + pressure;
  
  // Agregar variación basada en última orden
  if (lastOrderSide === 'buy') {
    newPrice += 0.002;
  } else if (lastOrderSide === 'sell') {
    newPrice -= 0.002;
  }
  
  // Mantener entre 0.01 y 0.99
  return Math.max(0.01, Math.min(0.99, newPrice));
};

// Calcular shares basado en inversión y precio
export const calculateShares = (amount, price) => {
  return parseFloat((amount / price).toFixed(2));
};

// Calcular ganancia potencial
export const calculatePotentialWin = (shares, currentPrice, side) => {
  const winPrice = side === 'yes' ? (1 - currentPrice) : currentPrice;
  return parseFloat((shares * winPrice).toFixed(2));
};

// Formatear moneda
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Formatear porcentaje
export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Calcular P&L (profit and loss)
export const calculatePnL = (invested, currentValue) => {
  const pnl = currentValue - invested;
  const pnlPercent = invested > 0 ? ((pnl / invested) * 100) : 0;
  
  return {
    pnl: parseFloat(pnl.toFixed(2)),
    pnlPercent: parseFloat(pnlPercent.toFixed(2))
  };
};
