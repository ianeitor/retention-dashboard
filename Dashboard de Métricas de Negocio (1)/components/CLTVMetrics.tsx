import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Clock, Target } from "lucide-react";

const currentMonthData = {
  cltv: 1847,
  avgPurchase: 186,
  frequency: 4.2,
  lifespan: 28.5
};

const monthlyTrendData = [
  { month: "Ene", cltv: 1654, avgPurchase: 165, frequency: 3.8, lifespan: 26.2 },
  { month: "Feb", cltv: 1698, avgPurchase: 172, frequency: 3.9, lifespan: 26.8 },
  { month: "Mar", cltv: 1723, avgPurchase: 175, frequency: 4.0, lifespan: 27.1 },
  { month: "Abr", cltv: 1765, avgPurchase: 179, frequency: 4.1, lifespan: 27.6 },
  { month: "May", cltv: 1798, avgPurchase: 182, frequency: 4.1, lifespan: 28.0 },
  { month: "Jun", cltv: 1823, avgPurchase: 184, frequency: 4.2, lifespan: 28.3 },
  { month: "Jul", cltv: 1847, avgPurchase: 186, frequency: 4.2, lifespan: 28.5 }
];

const yoyComparison = [
  { period: "Q1 2024", cltv: 1521, avgPurchase: 152, frequency: 3.5, lifespan: 24.8, change: "+21.4%" },
  { period: "Q2 2024", cltv: 1687, avgPurchase: 168, frequency: 3.8, lifespan: 26.4, change: "+9.5%" },
  { period: "Q3 2024", cltv: 1734, avgPurchase: 174, frequency: 4.0, lifespan: 27.2, change: "+6.5%" },
  { period: "Q1 2025", cltv: 1715, avgPurchase: 171, frequency: 3.9, lifespan: 27.8, change: "+12.8%" },
  { period: "Q2 2025", cltv: 1847, avgPurchase: 186, frequency: 4.2, lifespan: 28.5, change: "+9.5%" }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="text-xs">
            <span style={{ color: entry.color }}>
              {entry.name}: ${entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CLTVMetrics() {
  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-primary)' }}>
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              Métricas CLTV
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Customer Lifetime Value y componentes
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Julio 2025
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Métricas principales del mes actual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">${currentMonthData.cltv}</p>
              <p className="text-xs text-blue-600/80">CLTV Promedio</p>
              <Badge variant="secondary" className="text-xs mt-1">+6.5%</Badge>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-green-600">${currentMonthData.avgPurchase}</p>
              <p className="text-xs text-green-600/80">Compra Promedio</p>
              <Badge variant="secondary" className="text-xs mt-1">+1.1%</Badge>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">{currentMonthData.frequency}x</p>
              <p className="text-xs text-purple-600/80">Frecuencia</p>
              <Badge variant="secondary" className="text-xs mt-1">+2.4%</Badge>
            </div>
          </div>
          
          <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">{currentMonthData.lifespan}m</p>
              <p className="text-xs text-orange-600/80">Vida Útil</p>
              <Badge variant="secondary" className="text-xs mt-1">+0.7%</Badge>
            </div>
          </div>
        </div>

        {/* Evolución mensual sin línea de tendencia */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Evolución Mensual CLTV
          </h4>
          
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="cltv" 
                fill="url(#cltvGradient)"
                radius={[4, 4, 0, 0]}
                name="CLTV"
              />
              <defs>
                <linearGradient id="cltvGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparación año a año */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-2"></div>
            Comparación Año a Año
          </h4>
          
          <div className="space-y-3">
            {yoyComparison.map((period, index) => (
              <div
                key={period.period}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-gradient-to-r from-card to-muted/20 hover:shadow-md transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <Badge variant="outline" className="text-xs min-w-fit">
                    {period.period}
                  </Badge>
                  
                  <div className="grid grid-cols-4 gap-4 flex-1">
                    <div className="text-center">
                      <p className="text-sm font-medium">${period.cltv}</p>
                      <p className="text-xs text-muted-foreground">CLTV</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">${period.avgPurchase}</p>
                      <p className="text-xs text-muted-foreground">Compra Avg</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{period.frequency}x</p>
                      <p className="text-xs text-muted-foreground">Frecuencia</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{period.lifespan}m</p>
                      <p className="text-xs text-muted-foreground">Vida Útil</p>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  variant={period.change.includes('+') ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {period.change}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Insights de componentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-3">
            <h5 className="font-medium text-sm">Drivers de Crecimiento</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Frecuencia de Compra</span>
                <div className="flex items-center gap-2">
                  <Progress value={84} className="w-16 h-2" />
                  <span className="text-xs font-medium">+2.4%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Valor Promedio</span>
                <div className="flex items-center gap-2">
                  <Progress value={76} className="w-16 h-2" />
                  <span className="text-xs font-medium">+1.1%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Vida Útil</span>
                <div className="flex items-center gap-2">
                  <Progress value={68} className="w-16 h-2" />
                  <span className="text-xs font-medium">+0.7%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium text-sm">Oportunidades</h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                Aumentar frecuencia de compra en segmento Standard
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1 h-1 rounded-full bg-chart-2"></div>
                Cross-selling para incrementar ticket promedio
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1 h-1 rounded-full bg-chart-3"></div>
                Programas de fidelización para extender vida útil
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}