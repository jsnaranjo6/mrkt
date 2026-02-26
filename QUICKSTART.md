# 🚀 Guía de Inicio Rápido - PredicEC

## Instalación en 3 Pasos

### 1️⃣ Instalar Dependencias
```bash
cd frontend
npm install
```

### 2️⃣ Iniciar el Servidor
```bash
npm run dev
```

### 3️⃣ Abrir en el Navegador
La aplicación se abrirá automáticamente en: **http://localhost:3000**

---

## 🎯 Prueba la Aplicación

### Flujo de Prueba Completo:

1. **Registro**
   - Usa cualquier email (ejemplo@test.com)
   - Contraseña: cualquiera
   - Nombre: Tu nombre

2. **Explorar**
   - Click en "Deportes" o cualquier categoría
   - Selecciona: "Bitcoin superará $150,000 en 2026"

3. **Activar Simulación**
   - Click en "Activar simulación"
   - Observa el gráfico moverse
   - Ve el libro de órdenes llenarse
   - Mira el feed de actividad

4. **Hacer una Apuesta**
   - Paso 1: Selecciona "SÍ"
   - Paso 2: Ingresa $100 (o usa botón rápido)
   - Paso 3: Confirma
   - **Ve cómo tu orden mueve el precio** 📈

5. **Ver Portfolio**
   - Click en tu nombre (esquina superior derecha)
   - Ve tu balance actualizado
   - Mira tu posición con P&L en vivo

---

## 🎨 Características Destacadas

### ✅ Simulación de Mercado en Vivo
- Órdenes aleatorias cada 2-5 segundos
- Precio se actualiza con cada orden
- Gráfico dibujado en Canvas (alta performance)
- Libro de órdenes con bids/asks

### ✅ Trading Paso a Paso
- Proceso guiado (sin confusión)
- Calculadora de ganancias en vivo
- Confirmación antes de ejecutar

### ✅ Portfolio Dinámico
- P&L se actualiza en tiempo real
- Estadísticas completas
- Posiciones ganadoras vs perdedoras

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ver build de producción
npm run preview

# Linting
npm run lint
```

---

## 📦 Estructura del Código

```
src/
├── components/      # Componentes reutilizables
├── pages/          # Páginas principales
├── data/           # Datos y constantes
├── utils/          # Funciones utilitarias
├── App.jsx         # Orquestador principal
└── main.jsx        # Entry point
```

---

## ❓ Resolución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ocupado
Edita `vite.config.js` y cambia el puerto:
```js
server: {
  port: 3001  // o cualquier otro puerto
}
```

### Tailwind no funciona
```bash
npm install -D tailwindcss postcss autoprefixer
```

---

## 🎯 Próximos Pasos

Una vez que hayas probado el frontend:

1. ✅ **Frontend completo** (ya está listo)
2. 🔴 **Crear backend** (Express + WebSocket)
3. 🔴 **Conectar frontend ↔ backend**
4. 🔴 **Base de datos** (PostgreSQL)
5. 🔴 **Deploy** (Vercel + Railway)

---

**¿Listo para empezar?** → `npm install && npm run dev` 🚀
