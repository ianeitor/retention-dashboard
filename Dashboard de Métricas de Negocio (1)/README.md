# 📊 Dashboard de Métricas de Retención

Dashboard moderno y avanzado para análisis de retención de clientes con métricas CLTV, análisis RFM, seguimiento de campañas y sistema de administración completo.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format)

## ✨ Características

### 📈 Análisis Completo
- **CLTV (Customer Lifetime Value)** - Métricas detalladas con comparación año a año
- **Análisis RFM** - Segmentación por Recencia, Frecuencia y Valor Monetario
- **Análisis de Recurrencia** - Patrones de compra y retención de clientes
- **Resultados de Campañas** - Tracking completo de performance de marketing

### 🔧 Funcionalidades Avanzadas
- **Panel de Administración** - Interfaz para subir y gestionar datos
- **Integración Supabase** - Backend completo con base de datos en tiempo real
- **Sistema de Notificaciones** - Alertas automáticas para métricas críticas
- **Exportación de Reportes** - Generación de reportes en PDF y Excel
- **Importación CSV** - Carga masiva de datos desde archivos CSV

### 🎨 Diseño Moderno
- **Interfaz Responsiva** - Optimizada para desktop, tablet y móvil
- **Animaciones Suaves** - Efectos visuales modernos y transiciones
- **Tema Oscuro/Claro** - Soporte completo para ambos modos
- **Componentes Reutilizables** - Biblioteca completa de UI components

## 🚀 Tecnologías

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS v4, Radix UI
- **Backend:** Supabase (PostgreSQL, Edge Functions, Auth, Storage)
- **Gráficos:** Recharts
- **Iconos:** Lucide React
- **Deployment:** Vercel

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm, yarn o pnpm
- Cuenta de Supabase (gratis)
- Cuenta de Vercel (gratis)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/dashboard-metricas-retencion.git
cd dashboard-metricas-retencion
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Supabase

1. Ve a [Supabase](https://supabase.com) y crea un nuevo proyecto
2. Ve a Settings > API y copia las siguientes variables:
   - `Project URL`
   - `anon` key
   - `service_role` key
3. Ve a Settings > Database y copia la `Connection string`

### 4. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.tu-proyecto.supabase.co:5432/postgres

NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

El dashboard estará disponible en [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy en Vercel

### Método 1: Deploy automático
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/dashboard-metricas-retencion)

### Método 2: CLI de Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Configurar variables en Vercel
1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Agrega todas las variables de `.env.local`

## 📊 Estructura del Proyecto

```
├── components/              # Componentes React
│   ├── ui/                 # Componentes de UI base (shadcn)
│   ├── AdminPanel.tsx      # Panel de administración
│   ├── CLTVMetrics.tsx     # Métricas CLTV
│   ├── RFMAnalysis.tsx     # Análisis RFM
│   └── ...                 # Otros componentes
├── hooks/                  # Custom React hooks
├── styles/                 # Estilos CSS
├── supabase/              # Configuración Supabase
│   └── functions/         # Edge Functions
├── utils/                 # Utilidades y helpers
├── App.tsx               # Componente principal
├── next.config.js        # Configuración Next.js
└── package.json          # Dependencias
```

## 🔑 Funcionalidades Principales

### Dashboard Principal
- **Métricas en tiempo real** con KPIs principales
- **Gráficos interactivos** con Recharts
- **Segmentación RFM** con insights accionables
- **Análisis de recurrencia** y retención

### Panel de Administración
- **Subida de datos CLTV** con formularios dinámicos
- **Gestión de campañas** con métricas completas
- **Importación CSV** con plantillas automáticas
- **Historial de uploads** con seguimiento completo

### Sistema Backend
- **Base de datos PostgreSQL** con Supabase
- **Edge Functions** para APIs serverless
- **Autenticación** y gestión de usuarios
- **Storage** para archivos y reportes

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 📈 Personalización

### Agregar nuevas métricas
1. Crear componente en `/components/`
2. Agregar endpoint en `/supabase/functions/server/index.tsx`
3. Incluir en `App.tsx`

### Modificar estilos
- Editar variables CSS en `/styles/globals.css`
- Usar clases de Tailwind en componentes
- Personalizar tema en `next.config.js`

### Configurar Supabase
- Tablas: Se crean automáticamente via KV store
- Edge Functions: Están en `/supabase/functions/`
- Auth: Configurar en Supabase Dashboard

## 🔧 Troubleshooting

### Error de conexión Supabase
- Verificar variables de entorno
- Confirmar que el proyecto Supabase esté activo
- Revisar logs en Vercel Functions

### Problemas de build
```bash
npm run type-check  # Verificar errores TypeScript
npm run lint        # Verificar problemas ESLint
```

### Performance
- El dashboard usa React.memo para optimización
- Lazy loading para componentes pesados
- Edge caching con Vercel

## 🤝 Contribuir

1. Fork del proyecto
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🙋‍♂️ Soporte

- **Issues:** [GitHub Issues](https://github.com/tu-usuario/dashboard-metricas-retencion/issues)
- **Documentación:** [Wiki del proyecto](https://github.com/tu-usuario/dashboard-metricas-retencion/wiki)
- **Email:** soporte@dashboard-analytics.com

---

⭐ **¡No olvides dar una estrella si este proyecto te ayuda!**