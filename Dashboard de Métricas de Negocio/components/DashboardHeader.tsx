import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CalendarDays, TrendingUp, Users, DollarSign, Settings } from "lucide-react";
import { NotificationSystem } from "./NotificationSystem";
import { ReportExporter } from "./ReportExporter";

export function DashboardHeader({ onAdminClick }: { onAdminClick?: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Métricas</h1>
          <p className="text-muted-foreground">
            Análisis completo de rendimiento de clientes - Julio 2025
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationSystem />
          <ReportExporter />
          {onAdminClick && (
            <Button onClick={onAdminClick} variant="outline" size="sm" className="hover-lift">
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          )}
          <Badge variant="secondary" className="px-3 py-1">
            <CalendarDays className="w-4 h-4 mr-2" />
            Último actualización: 16 Jul 2025
          </Badge>
        </div>
      </div>

      {/* Métricas rápidas con diseño moderno */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Total</p>
                <p className="text-2xl font-bold">$2.4M</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+12.5% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50" style={{ animationDelay: '150ms' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clientes Activos</p>
                <p className="text-2xl font-bold">7,024</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-blue-500">+8.3% nuevos clientes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CLTV Promedio</p>
                <p className="text-2xl font-bold">$1,847</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-purple-500">+6.5% incremento</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50" style={{ animationDelay: '450ms' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa Retención</p>
                <p className="text-2xl font-bold">87.1%</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-orange-500">+2.1% mejora</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}