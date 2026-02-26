import React, { useRef, useEffect } from 'react';

const PriceChart = ({ priceHistory, currentPrice }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || priceHistory.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configuración
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // Encontrar min/max para escala
    const prices = priceHistory.map(p => p.price);
    const minPrice = Math.min(...prices) * 0.95;
    const maxPrice = Math.max(...prices) * 1.05;
    const priceRange = maxPrice - minPrice;
    
    // Dibujar grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Líneas horizontales
    for (let i = 0; i <= 5; i++) {
      const y = padding + (graphHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Labels de precio
      const price = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${(price * 100).toFixed(0)}%`, padding - 10, y + 4);
    }
    
    // Dibujar línea de precio
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    priceHistory.forEach((point, index) => {
      const x = padding + (graphWidth / (priceHistory.length - 1)) * index;
      const y = padding + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Dibujar área bajo la línea
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(220, 38, 38, 0.1)';
    ctx.fill();
    
    // Punto actual
    if (priceHistory.length > 0) {
      const lastPoint = priceHistory[priceHistory.length - 1];
      const x = width - padding;
      const y = padding + graphHeight - ((lastPoint.price - minPrice) / priceRange) * graphHeight;
      
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
  }, [priceHistory, currentPrice]);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Precio en tiempo real</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-500">En vivo</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300}
        className="w-full"
      />
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">Precio actual</div>
        <div className="text-3xl font-bold text-red-600">
          {(currentPrice * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
