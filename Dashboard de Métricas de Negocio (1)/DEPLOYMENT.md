# 🚀 Guía de Deployment

## Preparación del Proyecto

### 1. Configuración de Supabase

1. **Crear proyecto en Supabase:**
   - Ve a [Supabase](https://supabase.com)
   - Crea un nuevo proyecto
   - Anota el nombre del proyecto y región

2. **Obtener credenciales:**
   - Ve a Settings > API
   - Copia: `URL`, `anon key`, `service_role key`
   - Ve a Settings > Database
   - Copia: `Connection string`

3. **Configurar Edge Functions:**
   ```bash
   # Instalar Supabase CLI
   npm install -g supabase
   
   # Login a Supabase
   supabase login
   
   # Conectar al proyecto
   supabase link --project-ref YOUR_PROJECT_REF
   
   # Deploy functions
   supabase functions deploy
   ```

### 2. Variables de Entorno

Configura estas variables en tu archivo `.env.local`:

```env
# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.tu-proyecto.supabase.co:5432/postgres

# Next.js públicas
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Deploy en Vercel

### Método 1: GitHub + Vercel (Recomendado)

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/dashboard-metricas-retencion.git
   git push -u origin main
   ```

2. **Conectar con Vercel:**
   - Ve a [Vercel](https://vercel.com)
   - Click "New Project"
   - Importa tu repositorio de GitHub
   - Configura variables de entorno

3. **Variables en Vercel:**
   - Ve a Settings > Environment Variables
   - Agrega todas las variables de `.env.local`
   - Marca las que son "Production", "Preview" y "Development"

### Método 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Configurar variables (una por una)
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_DB_URL
```

### 3. Configuración Post-Deploy

1. **Verificar deployment:**
   - Visita tu URL de Vercel
   - Verifica que el dashboard carga
   - Prueba la conexión con Supabase

2. **Configurar dominio personalizado:**
   - Ve a Settings > Domains en Vercel
   - Agrega tu dominio
   - Configura DNS según instrucciones

## Deploy en Netlify

### 1. Preparar build

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build local
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### 2. Configurar variables
```bash
netlify env:set SUPABASE_URL "https://tu-proyecto.supabase.co"
netlify env:set SUPABASE_ANON_KEY "tu-anon-key"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "tu-service-key"
netlify env:set SUPABASE_DB_URL "tu-db-url"
```

## Deploy en Railway

### 1. Conectar repositorio
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar proyecto
railway link
```

### 2. Configurar variables
```bash
railway variables set SUPABASE_URL=https://tu-proyecto.supabase.co
railway variables set SUPABASE_ANON_KEY=tu-anon-key
railway variables set SUPABASE_SERVICE_ROLE_KEY=tu-service-key
railway variables set SUPABASE_DB_URL=tu-db-url
```

### 3. Deploy
```bash
railway up
```

## Troubleshooting

### Error: "Cannot connect to Supabase"
- Verifica que las variables de entorno estén correctas
- Confirma que el proyecto Supabase esté activo
- Revisa los logs de Edge Functions

### Error: "Build failed"
```bash
# Limpiar cache
rm -rf .next node_modules
npm install
npm run build
```

### Error: "Function timeout"
- Las Edge Functions tienen límite de 30 segundos
- Optimiza queries a la base de datos
- Usa paginación para datasets grandes

### Error: "Environment variables not found"
- Asegúrate de que estén configuradas en la plataforma
- Verifica nombres exactos (case-sensitive)
- Reinicia el deployment después de agregar variables

## Monitoreo

### Logs de Vercel
```bash
vercel logs
```

### Logs de Supabase
- Ve a Dashboard > Logs
- Filtra por Edge Functions
- Revisa errores de API

### Performance
- Usa Vercel Analytics
- Configura Supabase monitoring
- Implementa Sentry para error tracking

## Mantenimiento

### Actualizar dependencias
```bash
npm update
npm audit fix
```

### Backup de datos
```bash
# Exportar datos de Supabase
supabase db dump --file backup.sql
```

### Rollback
```bash
# Vercel
vercel rollback [deployment-url]

# Git
git revert [commit-hash]
git push
```

## Seguridad

### Variables sensibles
- Nunca commitees archivos `.env`
- Usa solo variables necesarias en el frontend
- Rota keys periódicamente

### RLS (Row Level Security)
```sql
-- Habilitar RLS en Supabase
ALTER TABLE kv_store_34a574a2 ENABLE ROW LEVEL SECURITY;

-- Crear política
CREATE POLICY "Allow authenticated access" ON kv_store_34a574a2
FOR ALL USING (auth.role() = 'authenticated');
```

### Headers de seguridad
Ya configurados en `next.config.js` y `vercel.json`

---

¿Problemas? [Crear issue](https://github.com/tu-usuario/dashboard-metricas-retencion/issues)