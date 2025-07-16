import { useEffect, useState } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { CLTVMetrics } from "./components/CLTVMetrics";
import { RecurrenceAnalysis } from "./components/RecurrenceAnalysis";
import { RFMAnalysis } from "./components/RFMAnalysis";
import { CampaignResults } from "./components/CampaignResults";
import { FollowUpSystem } from "./components/FollowUpSystem";
import { AdminPanel } from "./components/AdminPanel";
import { useApiClient } from "./hooks/useApiClient";
import { Card, CardContent } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";
import { Button } from "./components/ui/button";
import { RefreshCw, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner@2.0.3";

export default function App() {
  const { apiCall, isLoading } = useApiClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Inicializar datos al cargar la aplicación
  useEffect(() => {
    const initializeData = async () => {
      try {
        const result = await apiCall('/init-data', { method: 'POST' });
        
        if (result.success) {
          setIsInitialized(true);
          toast.success("Dashboard conectado con Supabase");
          
          // Configurar verificación periódica de alertas cada 2 minutos
          const alertInterval = setInterval(async () => {
            await apiCall('/check-alerts', { method: 'POST' });
          }, 120000);

          return () => clearInterval(alertInterval);
        } else {
          throw new Error(result.error || 'Error al inicializar datos');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
        setInitError(errorMessage);
        console.log('API no disponible, mostrando datos de demostración:', errorMessage);
        
        // Mostrar datos de fallback después de 3 segundos
        setTimeout(() => {
          setShowFallback(true);
          setIsInitialized(true);
          toast.info("Mostrando datos de demostración", {
            description: "La conexión con el servidor no está disponible"
          });
        }, 3000);
      }
    };

    initializeData();
  }, [apiCall]);

  const handleRetry = () => {
    setInitError(null);
    setShowFallback(false);
    setIsInitialized(false);
    window.location.reload();
  };

  // Mostrar estado de carga inicial
  if ((isLoading && !isInitialized) || (!isInitialized && !showFallback && !initError)) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header skeleton con efectos modernos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64 shimmer" />
                <Skeleton className="h-4 w-96 shimmer" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-8 w-24 shimmer" />
                <Skeleton className="h-8 w-32 shimmer" />
                <Skeleton className="h-8 w-48 shimmer" />
              </div>
            </div>
            
            {/* KPIs skeleton con gradientes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="hover-lift bg-gradient-to-br from-card to-muted/20">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 shimmer" />
                      <Skeleton className="h-8 w-20 shimmer" />
                      <Skeleton className="h-3 w-16 shimmer" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Content skeleton con animaciones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="hover-lift bg-gradient-to-br from-card to-muted/20 animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-48 shimmer" />
                    <Skeleton className="h-64 w-full shimmer" />
                    <div className="grid grid-cols-3 gap-4">
                      <Skeleton className="h-4 w-full shimmer" />
                      <Skeleton className="h-4 w-full shimmer" />
                      <Skeleton className="h-4 w-full shimmer" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center text-muted-foreground animate-pulse-slow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p>Conectando con Supabase...</p>
            </div>
            {!showFallback && initError && (
              <p className="text-sm mt-2">Si la conexión falla, mostraremos datos de demostración</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error de inicialización solo si no hay fallback
  if (initError && !showFallback && !isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full hover-lift bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Error al cargar el dashboard</h2>
              <p className="text-muted-foreground">
                No se pudo conectar con el servidor de datos.
              </p>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{initError}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleRetry} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Panel de administración
  if (showAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setShowAdmin(false)} 
              variant="ghost" 
              size="sm"
              className="hover-lift"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            {showFallback && (
              <div className="flex-1 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    <strong>Modo demostración:</strong> Los datos se almacenarán temporalmente
                  </span>
                </div>
              </div>
            )}
          </div>
          <AdminPanel />
        </div>
      </div>
    );
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {showFallback && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Modo demostración:</strong> Mostrando datos ficticios.
                  </p>
                  <p className="text-xs text-blue-600">
                    La conexión con Supabase no está disponible.
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRetry}
                className="text-blue-600 hover:bg-blue-100"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Reconectar
              </Button>
            </div>
          </div>
        )}
        
        <DashboardHeader onAdminClick={() => setShowAdmin(true)} />
        
        {/* Primera fila - CLTV y Recurrencia con espaciado moderno */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CLTVMetrics />
          <RecurrenceAnalysis />
        </div>

        {/* Segunda fila - RFM con efecto de aparición */}
        <div className="grid grid-cols-1 gap-8">
          <RFMAnalysis />
        </div>

        {/* Tercera fila - Campañas y Follow-up con diseño mejorado */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <CampaignResults />
          <FollowUpSystem />
        </div>

        {/* Footer con gradiente sutil */}
        <div className="text-center py-8 mt-12 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <p className="text-sm">Dashboard de Métricas de Retención • Julio 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}