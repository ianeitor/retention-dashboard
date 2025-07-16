# 📊 Dashboard de Métricas de Retención - Versión Estática

Dashboard moderno y completo para análisis de retención de clientes. **Esta es la versión estática** que funciona directamente en cualquier hosting sin necesidad de configuración adicional.

![Dashboard Demo](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format)

## 🚀 Instalación Rápida

### Opción 1: Subir carpeta directamente
1. **Descargar el proyecto** como ZIP
2. **Extraer** todos los archivos
3. **Subir** la carpeta completa a tu hosting
4. **Abrir** `index.html` en el navegador

### Opción 2: GitHub Pages
1. **Fork** este repositorio
2. Ir a **Settings** > **Pages**
3. Seleccionar **Deploy from a branch**
4. Elegir **main branch**
5. Tu dashboard estará en `https://tu-usuario.github.io/dashboard-metricas-retencion`

### Opción 3: Netlify
1. **Arrastrar** la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. Tu dashboard estará listo en segundos

### Opción 4: Vercel
1. **Instalar** Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto: `vercel --prod`
3. Seguir las instrucciones

## ✨ Características

### 📈 Métricas Completas
- **CLTV (Customer Lifetime Value)** - Valor promedio, frecuencia, tiempo de vida
- **Análisis RFM** - Segmentación por Recencia, Frecuencia y Valor Monetario  
- **Recurrencia** - Análisis de clientes recurrentes vs nuevos
- **Campañas** - Tracking de performance y ROI

### 🎨 Diseño Moderno
- **Responsive** - Funciona en desktop, tablet y móvil
- **Animaciones suaves** - Efectos visuales modernos
- **Gradientes** - Diseño contemporáneo
- **Hover effects** - Interacciones fluidas

### 📊 Funcionalidades
- **Datos de demostración** - Dashboard completamente funcional
- **Panel de administración** - Interfaz para gestión
- **Gráficos interactivos** - Visualizaciones de datos
- **Modo responsive** - Adaptación automática

## 📁 Estructura del Proyecto

```
├── index.html              # Archivo principal
├── styles/
│   └── styles.css          # CSS compilado con Tailwind
├── js/
│   └── App.js              # JavaScript con todos los componentes
├── assets/                 # Imágenes y recursos
│   ├── favicon.ico
│   ├── manifest.json
│   └── og-image.png
├── config.json            # Configuración del proyecto
└── README-STATIC.md       # Esta documentación
```

## 🔧 Personalización

### Cambiar datos del dashboard
Edita el objeto `mockData` en `/js/App.js`:

```javascript
const mockData = {
  cltv: {
    average: 1847,          // CLTV promedio
    yearOverYear: 12.5,     // Crecimiento YoY
    // ... más datos
  },
  // ... otros datos
};
```

### Modificar colores y estilos
Edita las variables CSS en `/styles/styles.css`:

```css
:root {
  --primary: #6366f1;      /* Color principal */
  --chart-1: #6366f1;      /* Color gráfico 1 */
  --chart-2: #8b5cf6;      /* Color gráfico 2 */
  /* ... más variables */
}
```

### Agregar nuevas métricas
1. Actualiza `mockData` con los nuevos datos
2. Crea un nuevo componente en `/js/App.js`
3. Agrega el componente al layout principal

## 🌐 Hostings Compatibles

### ✅ Funciona perfectamente
- **GitHub Pages** - Gratis
- **Netlify** - Gratis hasta 100GB
- **Vercel** - Gratis para proyectos personales
- **Railway** - Plan gratuito disponible
- **Surge.sh** - Hosting estático simple
- **Firebase Hosting** - Plan Spark gratuito

### ✅ Hostings tradicionales
- **cPanel/WHM** - Cualquier hosting compartido
- **Apache/Nginx** - Servidores propios
- **S3 + CloudFront** - AWS hosting estático

## 📱 Compatibilidad

### Navegadores
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

## 🔧 Solución de Problemas

### El dashboard no carga
1. **Verificar** que `index.html` esté en la raíz
2. **Confirmar** que todos los archivos están presentes
3. **Revisar** la consola del navegador (F12)

### Los estilos no se ven bien
1. **Verificar** que `styles/styles.css` existe
2. **Confirmar** que las rutas son correctas
3. **Limpiar** caché del navegador (Ctrl+F5)

### Los componentes no funcionan
1. **Verificar** que `js/App.js` está cargando
2. **Confirmar** conexión a internet (CDN de React)
3. **Revisar** errores en consola

## 🚀 Deployment en 1 Minuto

### GitHub Pages
```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Dashboard inicial"
git remote add origin https://github.com/tu-usuario/dashboard-metricas.git
git push -u origin main

# 2. Activar Pages en Settings > Pages
```

### Netlify CLI
```bash
# 1. Instalar CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod --dir=.
```

### Vercel CLI
```bash
# 1. Instalar CLI  
npm install -g vercel

# 2. Deploy
vercel --prod
```

## 📊 Datos de Demostración

El dashboard incluye **datos ficticios completos**:

- **7,024** clientes activos
- **$2.4M** revenue total  
- **$1,847** CLTV promedio
- **87.1%** tasa de retención
- **6 segmentos RFM** con distribución realista
- **2 campañas** con métricas completas

## 🎯 Casos de Uso

### Para demostraciones
- **Presentaciones** a clientes
- **Portfolios** de desarrolladores
- **Prototipos** rápidos

### Para desarrollo
- **Base** para dashboard real
- **Plantilla** para proyectos similares
- **Referencia** de diseño

### Para aprendizaje
- **Estudio** de componentes React
- **Análisis** de CSS moderno
- **Ejemplos** de UX/UI

## 📞 Soporte

- **Issues:** [GitHub Issues](https://github.com/tu-usuario/dashboard-metricas/issues)
- **Email:** soporte@dashboard.com
- **Docs:** [Wiki del proyecto](https://github.com/tu-usuario/dashboard-metricas/wiki)

---

**¡Listo para usar!** 🎉 Simplemente abre `index.html` y empieza a explorar.