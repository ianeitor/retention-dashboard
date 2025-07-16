import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, Users, Zap, Crown, Heart, AlertTriangle } from "lucide-react";

const segments = [
  {
    name: "Champions",
    description: "Mejores clientes - compran frecuentemente y gastaron mucho recientemente",
    customers: 1247,
    percentage: 18.2,
    value: "Alto",
    trend: "up",
    icon: Crown,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    recommendations: [
      "Programa VIP exclusivo",
      "Early access a productos",
      "Descuentos personalizados"
    ]
  },
  {
    name: "Loyal Customers",
    description: "Gastan bien y compran regularmente",
    customers: 892,
    percentage: 13.1,
    value: "Alto",
    trend: "up",
    icon: Heart,
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
    recommendations: [
      "Programa de lealtad",
      "Recomendaciones personalizadas",
      "Cross-selling dirigido"
    ]
  },
  {
    name: "Potential Loyalists",
    description: "Clientes recientes con buen potencial de valor",
    customers: 1654,
    percentage: 24.3,
    value: "Medio-Alto",
    trend: "up",
    icon: TrendingUp,
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    recommendations: [
      "Onboarding mejorado",
      "Ofertas de upselling",
      "Contenido educativo"
    ]
  },
  {
    name: "New Customers",
    description: "Compraron recientemente por primera vez",
    customers: 1832,
    percentage: 26.9,
    value: "Medio",
    trend: "stable",
    icon: Users,
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    recommendations: [
      "Campaña de bienvenida",
      "Tutorial de productos",
      "Soporte proactivo"
    ]
  },
  {
    name: "Promising",
    description: "Nuevos clientes que gastaron una cantidad considerable",
    customers: 743,
    percentage: 10.9,
    value: "Medio-Alto",
    trend: "up",
    icon: Zap,
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    recommendations: [
      "Seguimiento personalizado",
      "Ofertas exclusivas",
      "Invitación a eventos"
    ]
  },
  {
    name: "At Risk",
    description: "Fueron buenos clientes pero no han comprado últimamente",
    customers: 456,
    percentage: 6.7,
    value: "Bajo",
    trend: "down",
    icon: AlertTriangle,
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    recommendations: [
      "Campaña de reactivación",
      "Descuentos especiales",
      "Encuesta de satisfacción"
    ]
  }
];

const insights = [
  {
    title: "Oportunidad de Crecimiento",
    description: "El 51.2% de clientes están en segmentos de crecimiento (Potential Loyalists + New Customers)",
    value: "51.2%",
    trend: "positive",
    action: "Implementar campaña de nurturing para convertir en Loyal Customers"
  },
  {
    title: "Retención Crítica",
    description: "456 clientes en riesgo representan oportunidad de recuperar $1.2M en revenue",
    value: "$1.2M",
    trend: "warning",
    action: "Ejecutar campaña de win-back en próximos 15 días"
  },
  {
    title: "Champions Activos",
    description: "El 18.2% de Champions genera el 42% del revenue total",
    value: "42%",
    trend: "positive",
    action: "Expandir programa VIP y referidos"
  }
];

export function RFMAnalysis() {
  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-primary)' }}>
                <Users className="w-5 h-5 text-white" />
              </div>
              Análisis RFM
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Segmentación de clientes por Recencia, Frecuencia y Valor Monetario
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            6,824 clientes analizados
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Segmentos principales */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Segmentos de Clientes
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {segments.map((segment, index) => {
              const IconComponent = segment.icon;
              return (
                <div
                  key={segment.name}
                  className="group relative p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-card/50 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${segment.color} shadow-sm`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{segment.customers.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{segment.percentage}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm">{segment.name}</h5>
                      <Badge 
                        variant={segment.trend === 'up' ? 'default' : segment.trend === 'down' ? 'destructive' : 'secondary'}
                        className="text-xs px-2 py-0"
                      >
                        {segment.value}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {segment.description}
                    </p>
                    
                    <Progress value={segment.percentage} className="h-2" />
                    
                    {/* Recomendaciones - visible al hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3 space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Acciones recomendadas:</p>
                      <ul className="text-xs space-y-0.5">
                        {segment.recommendations.slice(0, 2).map((rec, i) => (
                          <li key={i} className="text-muted-foreground flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-primary"></div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights clave */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-2"></div>
            Insights Clave y Acciones Recomendadas
          </h4>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={insight.title}
                className="p-4 rounded-lg border border-border/50 bg-gradient-to-r from-muted/20 to-transparent hover:from-muted/30 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{insight.title}</h5>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`text-lg font-bold ${
                      insight.trend === 'positive' ? 'text-green-600' : 
                      insight.trend === 'warning' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {insight.value}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-primary/5 rounded-lg border-l-2 border-primary">
                  <p className="text-xs text-primary font-medium">
                    💡 Acción recomendada: {insight.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de resumen */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">Clientes de Alto Valor</p>
            <p className="text-lg font-semibold text-green-600">31.3%</p>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">En Crecimiento</p>
            <p className="text-lg font-semibold text-blue-600">51.2%</p>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full w-1/2"></div>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">En Riesgo</p>
            <p className="text-lg font-semibold text-orange-600">6.7%</p>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full w-1/12"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}