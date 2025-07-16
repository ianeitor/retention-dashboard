import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Mail, MessageSquare, Smartphone, Users, TrendingUp, TrendingDown, Minus, Eye, MoreHorizontal } from "lucide-react";

const campaignsData = [
  {
    id: 1,
    name: "Summer Sale 2025",
    type: "Email",
    status: "Activa",
    sent: 12500,
    opened: 5250,
    clicked: 2100,
    converted: 630,
    revenue: 189000,
    roi: 4.2,
    trend: "up",
    progress: 78
  },
  {
    id: 2,
    name: "VIP Exclusive Access",
    type: "Email",
    status: "Activa",
    sent: 3200,
    opened: 2720,
    clicked: 1904,
    converted: 952,
    revenue: 476000,
    roi: 7.8,
    trend: "up",
    progress: 95
  },
  {
    id: 3,
    name: "Mobile App Push",
    type: "Push",
    status: "Completada",
    sent: 8900,
    opened: 3560,
    clicked: 1424,
    converted: 284,
    revenue: 71000,
    roi: 2.1,
    trend: "down",
    progress: 100
  },
  {
    id: 4,
    name: "Retargeting Social",
    type: "Social",
    status: "Pausada",
    sent: 15600,
    opened: 4680,
    clicked: 936,
    converted: 187,
    revenue: 56100,
    roi: 1.8,
    trend: "down",
    progress: 45
  },
  {
    id: 5,
    name: "SMS Flash Sale",
    type: "SMS",
    status: "Activa",
    sent: 5400,
    opened: 5076,
    clicked: 2538,
    converted: 761,
    revenue: 152200,
    roi: 6.3,
    trend: "up",
    progress: 89
  }
];

const summaryData = [
  { metric: "Total Enviados", value: "45.6K", color: "#6366f1" },
  { metric: "Tasa Apertura", value: "47.2%", color: "#8b5cf6" },
  { metric: "Tasa Conversión", value: "5.9%", color: "#06b6d4" },
  { metric: "ROI Promedio", value: "4.4x", color: "#10b981" }
];

const getIcon = (type: string) => {
  switch (type) {
    case "Email": return Mail;
    case "SMS": return MessageSquare;
    case "Push": return Smartphone;
    case "Social": return Users;
    default: return Mail;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up": return <TrendingUp className="w-3 h-3 text-green-500" />;
    case "down": return <TrendingDown className="w-3 h-3 text-red-500" />;
    default: return <Minus className="w-3 h-3 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Activa": return "bg-green-100 text-green-700 border-green-200";
    case "Pausada": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Completada": return "bg-blue-100 text-blue-700 border-blue-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export function CampaignResults() {
  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ background: 'var(--gradient-success)' }}>
                <Mail className="w-5 h-5 text-white" />
              </div>
              Resultados de Campañas
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Performance y métricas de marketing
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Ver Todas
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Métricas de resumen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <div 
              key={item.metric}
              className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-muted/20 to-transparent border border-border/50 hover:shadow-md transition-all duration-300"
            >
              <div 
                className="w-8 h-8 rounded-full mx-auto flex items-center justify-center"
                style={{ backgroundColor: item.color + '20', border: `1px solid ${item.color}30` }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
              <div>
                <p className="font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.metric}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de revenue por campaña */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Revenue por Campaña
          </h4>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={campaignsData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                labelFormatter={(label) => `Campaña: ${label}`}
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#revenueGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de campañas mejorada */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-2"></div>
            Detalle de Campañas
          </h4>
          
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium">Campaña</TableHead>
                  <TableHead className="text-center">Métricas</TableHead>
                  <TableHead className="text-center">Revenue</TableHead>
                  <TableHead className="text-center">ROI</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignsData.map((campaign, index) => {
                  const IconComponent = getIcon(campaign.type);
                  const openRate = ((campaign.opened / campaign.sent) * 100).toFixed(1);
                  const conversionRate = ((campaign.converted / campaign.sent) * 100).toFixed(1);
                  
                  return (
                    <TableRow 
                      key={campaign.id} 
                      className="hover:bg-muted/20 transition-colors animate-slide-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg bg-primary/10">
                            <IconComponent className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{campaign.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {campaign.type}
                              </Badge>
                              {getTrendIcon(campaign.trend)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Enviados:</span>
                            <span className="font-medium">{campaign.sent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Apertura:</span>
                            <span className="font-medium">{openRate}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Conversión:</span>
                            <span className="font-medium">{conversionRate}%</span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <p className="font-bold text-green-600">
                            ${campaign.revenue.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.converted} conv.
                          </p>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-lg">
                            {campaign.roi.toFixed(1)}x
                          </span>
                          <Badge 
                            variant={campaign.roi >= 3 ? "default" : campaign.roi >= 2 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {campaign.roi >= 3 ? "Excelente" : campaign.roi >= 2 ? "Bueno" : "Bajo"}
                          </Badge>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <div className="space-y-2">
                          <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </Badge>
                          {campaign.status === "Activa" && (
                            <div className="space-y-1">
                              <Progress value={campaign.progress} className="h-1" />
                              <span className="text-xs text-muted-foreground">
                                {campaign.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Insights de performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-3">
            <h5 className="font-medium text-sm">Top Performers</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100">
                <span className="text-xs">VIP Exclusive Access</span>
                <Badge variant="default" className="text-xs">ROI 7.8x</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-100">
                <span className="text-xs">SMS Flash Sale</span>
                <Badge variant="default" className="text-xs">ROI 6.3x</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium text-sm">Necesitan Atención</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
                <span className="text-xs">Retargeting Social</span>
                <Badge variant="destructive" className="text-xs">ROI 1.8x</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                <span className="text-xs">Mobile App Push</span>
                <Badge variant="secondary" className="text-xs">ROI 2.1x</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}