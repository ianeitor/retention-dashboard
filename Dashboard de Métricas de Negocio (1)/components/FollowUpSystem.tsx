import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { FileText, Download, Calendar, TrendingUp, Target, Lightbulb } from "lucide-react";

const monthlyReport = {
  month: "Julio 2025",
  period: "01/07/2025 - 31/07/2025",
  summary: {
    retentionRate: 68.4,
    previousMonth: 65.3,
    churnRate: 12.7,
    netRevenue: 2847392,
    activeCampaigns: 5,
    keyWins: 3,
    areasOfConcern: 2
  }
};

const monthlyNotes = [
  {
    date: "2025-07-15",
    type: "achievement",
    title: "Excelente resultado en campaña VIP",
    content: "La campaña VIP Exclusive superó todas las expectativas con un ROI del 1,247%. La segmentación por valor de compra histórico fue clave. Los clientes VIP respondieron muy bien a las ofertas exclusivas con descuentos del 15% en productos premium.",
    metrics: "ROI: 1,247% | Conversión: 37% | Revenue: $456,789",
    author: "María González - CRM Manager"
  },
  {
    date: "2025-07-12",
    type: "insight",
    title: "Patrón interesante en segmento 'About to Sleep'",
    content: "Detectamos que el 67% de los clientes en este segmento abandonan después de recibir 3+ emails de reactivación. Recomendamos cambiar la estrategia a canales más directos (SMS/WhatsApp) después del segundo email sin respuesta.",
    metrics: "Tasa de respuesta SMS: 23% vs Email: 8%",
    author: "Carlos Rodríguez - Data Analyst"
  },
  {
    date: "2025-07-08",
    type: "concern",
    title: "Incremento en churn de nuevos clientes",
    content: "El churn de clientes con menos de 60 días aumentó al 34% (+8% vs mes anterior). Identificamos que el problema está en el onboarding - muchos no completan la configuración inicial. Implementamos un call-to-action más agresivo en la welcome series.",
    metrics: "Churn nuevos clientes: 34% | Onboarding completion: 45%",
    author: "Ana Martínez - Product Manager"
  },
  {
    date: "2025-07-05",
    title: "Éxito en reactivación de clientes 'At Risk'",
    type: "achievement",
    content: "La campaña de reactivación telefónica para clientes 'At Risk' tuvo resultados sorprendentes. El 43% de los contactados realizaron una compra dentro de los 7 días. La clave fue el timing - llamar exactamente 21 días después de la última compra.",
    metrics: "Reactivación: 43% | Revenue recuperado: $234,561",
    author: "Pedro López - Sales Manager"
  },
  {
    date: "2025-07-02",
    type: "strategy",
    title: "Nueva estrategia para clientes 'Potential Loyalists'",
    content: "Implementamos un programa de referidos específico para este segmento. Por cada referido exitoso, ofrecemos 20% de descuento en la próxima compra. Early results muestran 28% de uptake en la primera semana.",
    metrics: "Programa referidos: 28% uptake | Referidos generados: 89",
    author: "Laura Fernández - Marketing Manager"
  }
];

const actionItems = [
  {
    priority: "Alta",
    action: "Optimizar flujo de onboarding para reducir churn de nuevos clientes",
    owner: "Ana Martínez",
    deadline: "2025-07-30",
    status: "En progreso"
  },
  {
    priority: "Media",
    action: "Expandir programa de referidos a segmento 'Loyal Customers'",
    owner: "Laura Fernández",
    deadline: "2025-08-15",
    status: "Planificado"
  },
  {
    priority: "Alta",
    action: "Desarrollar estrategia SMS para clientes 'About to Sleep'",
    owner: "Carlos Rodríguez",
    deadline: "2025-08-01",
    status: "En progreso"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "achievement":
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    case "concern":
      return <Target className="w-4 h-4 text-red-600" />;
    case "insight":
      return <Lightbulb className="w-4 h-4 text-blue-600" />;
    case "strategy":
      return <FileText className="w-4 h-4 text-purple-600" />;
    default:
      return <FileText className="w-4 h-4 text-gray-600" />;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "achievement":
      return <Badge className="bg-green-100 text-green-800">Logro</Badge>;
    case "concern":
      return <Badge className="bg-red-100 text-red-800">Preocupación</Badge>;
    case "insight":
      return <Badge className="bg-blue-100 text-blue-800">Insight</Badge>;
    case "strategy":
      return <Badge className="bg-purple-100 text-purple-800">Estrategia</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "text-red-600";
    case "Media":
      return "text-yellow-600";
    case "Baja":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

export function FollowUpSystem() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Reporte de Retención - {monthlyReport.month}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Exportar PDF
            </Button>
            <Badge variant="outline">{monthlyReport.period}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Resumen</TabsTrigger>
            <TabsTrigger value="notes">Anotaciones</TabsTrigger>
            <TabsTrigger value="actions">Acciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            {/* Métricas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Retención</p>
                <p className="text-lg font-bold text-green-600">{monthlyReport.summary.retentionRate}%</p>
                <p className="text-xs text-muted-foreground">
                  +{(monthlyReport.summary.retentionRate - monthlyReport.summary.previousMonth).toFixed(1)}% vs mes anterior
                </p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Churn Rate</p>
                <p className="text-lg font-bold text-red-600">{monthlyReport.summary.churnRate}%</p>
                <p className="text-xs text-muted-foreground">-2.3% vs mes anterior</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Net Revenue</p>
                <p className="text-lg font-bold">${monthlyReport.summary.netRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.3% vs mes anterior</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Campañas</p>
                <p className="text-lg font-bold">{monthlyReport.summary.activeCampaigns}</p>
                <p className="text-xs text-muted-foreground">4 exitosas</p>
              </div>
            </div>

            {/* Resumen ejecutivo */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Resumen Ejecutivo</h4>
              <p className="text-sm text-blue-700">
                Julio 2025 fue un mes excepcional para retención. Logramos incrementar la tasa de retención al 68.4% (+3.1% vs junio), 
                impulsado principalmente por el éxito de la campaña VIP y las mejoras en el segmento 'At Risk'. 
                La principal preocupación es el incremento del churn en nuevos clientes, pero ya tenemos un plan de acción en marcha.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-green-800">Principales Logros</h4>
                <ul className="text-sm space-y-1">
                  <li>• ROI récord en campaña VIP: 1,247%</li>
                  <li>• Reactivación exitosa del 43% de clientes 'At Risk'</li>
                  <li>• Implementación exitosa de programa de referidos</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-red-800">Áreas de Mejora</h4>
                <ul className="text-sm space-y-1">
                  <li>• Churn de nuevos clientes: 34% (+8%)</li>
                  <li>• Baja tasa de onboarding completion: 45%</li>
                  <li>• Necesidad de diversificar canales de reactivación</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Anotaciones del Mes ({monthlyNotes.length})</h4>
              <Button size="sm">
                <FileText className="w-4 h-4 mr-1" />
                Nueva Anotación
              </Button>
            </div>

            <div className="space-y-4">
              {monthlyNotes.map((note, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(note.type)}
                      <h5 className="font-medium">{note.title}</h5>
                      {getTypeBadge(note.type)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {note.date}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {note.content}
                  </p>
                  
                  <div className="p-3 bg-gray-50 rounded text-xs">
                    <p className="font-medium">Métricas clave:</p>
                    <p>{note.metrics}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Por: {note.author}</p>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Área para nueva anotación */}
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <h5 className="font-medium mb-2">Agregar Nueva Anotación</h5>
              <Textarea 
                placeholder="Describe insights, resultados, preocupaciones o estrategias del mes..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm">Guardar Anotación</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Acciones de Seguimiento</h4>
              <Button size="sm">
                <Target className="w-4 h-4 mr-1" />
                Nueva Acción
              </Button>
            </div>

            <div className="space-y-3">
              {actionItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="secondary">{item.status}</Badge>
                      </div>
                      <p className="font-medium">{item.action}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Responsable: {item.owner}</span>
                        <span>Deadline: {item.deadline}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de acciones */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Pendientes</p>
                <p className="text-lg font-bold text-red-600">2</p>
                <p className="text-xs text-muted-foreground">Alta prioridad</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">En Progreso</p>
                <p className="text-lg font-bold text-yellow-600">2</p>
                <p className="text-xs text-muted-foreground">On track</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Completadas</p>
                <p className="text-lg font-bold text-green-600">8</p>
                <p className="text-xs text-muted-foreground">Este mes</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}