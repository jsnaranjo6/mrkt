# PredicEC - Frontend

Plataforma de predicción de mercados para Ecuador.

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx       # Navegación y usuario
│   │   ├── PriceChart.jsx   # Gráfico de precios (canvas)
│   │   ├── MarketCard.jsx   # Tarjeta de mercado
│   │   ├── LiveOrderBook.jsx # Libro de órdenes en vivo
│   │   ├── ActivityFeed.jsx # Feed de actividad
│   │   └── CategoryCard.jsx # Tarjeta de categoría
│   │
│   ├── pages/               # Páginas principales
│   │   ├── OnboardingPage.jsx  # Registro de usuarios
│   │   ├── HomePage.jsx        # Página principal
│   │   ├── ExplorePage.jsx     # Explorar por categoría
│   │   ├── MarketDetailPage.jsx # Detalle y trading
│   │   └── AccountPage.jsx     # Portfolio del usuario
│   │
│   ├── data/                # Datos y constantes
│   │   └── constants.js     # Categorías y mercados iniciales
│   │
│   ├── utils/               # Funciones utilitarias
│   │   └── marketUtils.js   # Cálculos de mercado y órdenes
│   │
│   ├── App.jsx              # Componente raíz (PENDIENTE)
│   └── main.jsx             # Entry point (PENDIENTE)
│
├── public/
│   └── index.html           # HTML base (PENDIENTE)
│
└── package.json             # Dependencias (PENDIENTE)
```

## ✅ Componentes Creados

### Componentes Base (6/6) ✅
- ✅ **Header**: Navegación, logo, balance de usuario
- ✅ **PriceChart**: Gráfico en tiempo real con canvas
- ✅ **MarketCard**: Tarjeta reutilizable para mostrar mercados
- ✅ **LiveOrderBook**: Libro de órdenes (bids y asks)
- ✅ **ActivityFeed**: Feed de órdenes recientes
- ✅ **CategoryCard**: Selector de categorías

### Páginas (5/5) ✅
- ✅ **OnboardingPage**: Flujo de registro (2 pasos)
- ✅ **HomePage**: Landing con categorías y destacados
- ✅ **ExplorePage**: Lista de mercados por categoría
- ✅ **MarketDetailPage**: Trading con pasos, gráfico, libro de órdenes
- ✅ **AccountPage**: Portfolio con P&L en tiempo real

### Utilidades (2/2) ✅
- ✅ **constants.js**: Categorías y datos iniciales de mercados
- ✅ **marketUtils.js**: Funciones para cálculos de precio, P&L, formato

### Setup (7/7) ✅
- ✅ **App.jsx**: Orquestador principal con estado global
- ✅ **main.jsx**: Entry point de React
- ✅ **index.html**: HTML base
- ✅ **package.json**: Dependencias
- ✅ **vite.config.js**: Configuración de Vite
- ✅ **tailwind.config.js**: Configuración de Tailwind
- ✅ **postcss.config.js**: Configuración de PostCSS

## 🔄 Estado Actual

### ✅ FRONTEND COMPLETO (100%)
- [x] Todos los componentes base
- [x] Todas las páginas principales
- [x] Utilidades y cálculos
- [x] Configuración completa de build
- [x] Estado global y navegación

### Pendiente (Fase 2)
- [ ] Hooks personalizados (useMarketData, useWebSocket)
- [ ] Integración con backend (API client)
- [ ] Testing unitario
- [ ] Optimizaciones de performance

## 🎯 Próximos Pasos

### Opción A: Completar Frontend
1. Crear MarketDetailPage.jsx (con simulación de órdenes)
2. Crear AccountPage.jsx (portfolio dinámico)
3. Crear App.jsx (estado global, routing)
4. Crear configuración de build (Vite/Next.js)

### Opción B: Empezar Backend
1. Setup de Express.js
2. Configuración de WebSocket
3. Simulador de órdenes del lado del servidor
4. API REST básica

## 📦 Dependencias Necesarias

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.9",
    "tailwindcss": "^3.3.0"
  }
}
```

## 🔧 Setup e Instalación

### Requisitos previos
- Node.js 18+ instalado
- npm o yarn

### Pasos de instalación

```bash
# 1. Navegar a la carpeta del proyecto
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# El proyecto se abrirá automáticamente en http://localhost:3000
```

### Scripts disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview de build de producción
npm run preview

# Linting
npm run lint
```

## 🎮 Cómo Usar la Aplicación

### Flujo completo de usuario:

1. **Registro** (OnboardingPage)
   - Ingresa email y contraseña
   - Completa tu nombre
   - Recibes $1,000 de saldo demo

2. **Explorar** (HomePage)
   - Ve las 5 categorías principales
   - Navega por mercados destacados
   - Click en cualquier categoría para ver más

3. **Seleccionar Mercado** (ExplorePage)
   - Lista completa de mercados por categoría
   - Ve probabilidades SÍ/NO en tiempo real
   - Click en mercado para tradear

4. **Tradear** (MarketDetailPage)
   - **Activar simulación** para ver mercado en vivo
   - Paso 1: Selecciona SÍ o NO
   - Paso 2: Ingresa monto ($10, $50, $100, $500)
   - Paso 3: Confirma tu apuesta
   - Ve cómo tu orden afecta el precio

5. **Ver Portfolio** (AccountPage)
   - Balance disponible
   - Posiciones activas
   - Ganancia/Pérdida total
   - Estadísticas detalladas

## 🔧 Setup (Cuando esté completo)

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build
```

## 🎨 Stack Tecnológico

- **React 18**: UI Library
- **Tailwind CSS**: Estilos
- **Lucide React**: Iconos
- **Canvas API**: Gráficos de precio
- **Vite**: Build tool (recomendado)

## 📝 Notas de Diseño

- Color principal: **Rojo (#DC2626)**
- Diseño: **Minimalista, limpio, por pasos**
- Sin emojis: **Solo iconos profesionales**
- Mobile-first: **Responsive en todos los componentes**
- Flujo guiado: **Un objetivo por pantalla**

---

**Estado del Proyecto**: 🟢 Frontend completo y funcional (100%)

### Características Implementadas:
✅ Registro de usuarios con flujo por pasos  
✅ Navegación por categorías  
✅ Trading con proceso guiado (3 pasos)  
✅ Gráfico de precios en tiempo real (Canvas)  
✅ Libro de órdenes dinámico  
✅ Simulación de mercado activable  
✅ Portfolio con P&L en vivo  
✅ Diseño responsive mobile-first  
✅ Color principal: Rojo (#DC2626)  
✅ Sin emojis, solo iconos profesionales  

### Próximo Paso:
🔴 Crear backend para persistencia de datos

