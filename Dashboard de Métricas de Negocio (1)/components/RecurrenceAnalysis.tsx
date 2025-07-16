import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Repeat, UserPlus } from "lucide-react";

const overviewData = [
  { name: "Clientes Recurrentes", value: 68.4, customers: 4789, color: "#6366f1" },
  { name: "Nuevas Adquisiciones", value: 31.6, customers: 2213, color: "#8b5cf6" }
];

const monthlyTrendData = [
  { month: "Ene", recurrent: 65.2, newAcquisition: 34.8, retention: 82.1 },
  { month: "Feb", recurrent: 66.8, newAcquisition: 33.2, retention: 84.3 },
  { month: "Mar", recurrent: 67.1, newAcquisition: 32.9, retention: 85.7 },
  { month: "Abr", recurrent: 68.9, newAcquisition: 31.1, retention: 87.2 },
  { month: "May", recurrent: 69.3, newAcquisition: 30.7, retention: 88.5 },
  { month: "Jun", recurrent: 68.4, newAcquisition: 31.6, retention: 86.9 },
  { month: "Jul", recurrent: 68.4, newAcquisition: 31.6, retention: 87.1 }
];

const segmentAnalysis = [
  { segment: "VIP", recurrentRate: 94.2, retentionRate: 96.8, churnRate: 3.2, trend: "up" },
  { segment: "Premium", recurrentRate: 78.5, retentionRate: 84.1, churnRate: 15.9, trend: "up" },
  { segment: "Standard", recurrentRate: 62.3, retentionRate: 74.2, churnRate: 25.8, trend: "stable" },
  { segment: "Nuevos", recurrentRate: 28.7, retentionRate: 45.3, churnRate: 54.7, trend: "down" }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.name}: {entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RecurrenceAnalysis() {
  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-secondary)' }}>
                <Repeat className="w-5 h-5 text-white" />
              </div>
              Análisis de Recurrencia
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Patrones de compra y retención de clientes
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            7,002 clientes activos
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto">
              <Repeat className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">68.4%</p>
              <p className="text-xs text-blue-600/80">Tasa Recurrencia</p>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-green-600">31.6%</p>
              <p className="text-xs text-green-600/80">Nuevas Adquisiciones</p>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">87.1%</p>
              <p className="text-xs text-purple-600/80">Retención</p>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">12.9%</p>
              <p className="text-xs text-orange-600/80">Churn Rate</p>
            </div>
          </div>
        </div>

        {/* Gráfico de distribución mejorado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Distribución de Ventas
            </h4>
            
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={overviewData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {overviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                            <p className="font-medium text-sm">{data.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {data.value}% • {data.customers.toLocaleString()} clientes
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Centro del gráfico con información */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-lg font-bold">7.0K</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
            
            {/* Leyenda personalizada */}
            <div className="space-y-2">
              {overviewData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-sm">{item.value}%</span>
                    <p className="text-xs text-muted-foreground">
                      {item.customers.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tendencia mensual mejorada */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2"></div>
              Evolución Mensual
            </h4>
            
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorRecurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="recurrent"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRecurrent)"
                  name="Recurrentes"
                />
                <Area
                  type="monotone"
                  dataKey="newAcquisition"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNew)"
                  name="Nuevos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Análisis por segmento */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-3"></div>
            Análisis por Segmento
          </h4>
          
          <div className="space-y-3">
            {segmentAnalysis.map((segment, index) => (
              <div
                key={segment.segment}
                className="p-4 rounded-lg border border-border/50 bg-gradient-to-r from-card to-muted/20 hover:shadow-md transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {segment.segment}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${
                        segment.trend === 'up' ? 'text-green-500' : 
                        segment.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {segment.trend === 'up' ? 'Mejorando' : 
                         segment.trend === 'down' ? 'Declinando' : 'Estable'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Recurrencia</span>
                      <span className="text-sm font-medium">{segment.recurrentRate}%</span>
                    </div>
                    <Progress value={segment.recurrentRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Retención</span>
                      <span className="text-sm font-medium">{segment.retentionRate}%</span>
                    </div>
                    <Progress value={segment.retentionRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Churn</span>
                      <span className="text-sm font-medium text-destructive">{segment.churnRate}%</span>
                    </div>
                    <Progress value={segment.churnRate} className="h-2 [&>div]:bg-destructive" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}