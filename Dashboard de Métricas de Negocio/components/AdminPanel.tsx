import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Upload, FileText, Download, Database, Settings } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApiClient } from "../hooks/useApiClient";
import { AdminGuide } from "./AdminGuide";

interface CLTVData {
  currentMonth: {
    cltv: number;
    avgPurchase: number;
    frequency: number;
    lifespan: number;
  };
  monthlyTrend: Array<{
    month: string;
    cltv: number;
    avgPurchase: number;
    frequency: number;
    lifespan: number;
  }>;
  yoyComparison: Array<{
    period: string;
    cltv: number;
    avgPurchase: number;
    frequency: number;
    lifespan: number;
  }>;
}

interface CampaignData {
  campaigns: Array<{
    id: number;
    name: string;
    type: string;
    status: string;
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
    roi: number;
    trend: string;
    progress: number;
  }>;
  summary: {
    totalSent: number;
    openRate: number;
    conversionRate: number;
    avgROI: number;
  };
}

export function AdminPanel() {
  const { apiCall } = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [dataType, setDataType] = useState('customers');
  const [uploadHistory, setUploadHistory] = useState([]);

  // Estados para formularios
  const [cltvFormData, setCLTVFormData] = useState<CLTVData>({
    currentMonth: { cltv: 0, avgPurchase: 0, frequency: 0, lifespan: 0 },
    monthlyTrend: [],
    yoyComparison: []
  });

  const [campaignFormData, setCampaignFormData] = useState<CampaignData>({
    campaigns: [],
    summary: { totalSent: 0, openRate: 0, conversionRate: 0, avgROI: 0 }
  });

  // Subir datos CLTV
  const handleCLTVUpload = async () => {
    setIsLoading(true);
    try {
      const result = await apiCall('/upload/cltv', {
        method: 'POST',
        body: cltvFormData
      });

      if (result.success) {
        toast.success("Datos CLTV subidos correctamente");
        // Limpiar formulario
        setCLTVFormData({
          currentMonth: { cltv: 0, avgPurchase: 0, frequency: 0, lifespan: 0 },
          monthlyTrend: [],
          yoyComparison: []
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Error al subir datos CLTV", {
        description: error instanceof Error ? error.message : "Error desconocido"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Subir datos de campañas
  const handleCampaignUpload = async () => {
    setIsLoading(true);
    try {
      const result = await apiCall('/upload/campaigns', {
        method: 'POST',
        body: campaignFormData
      });

      if (result.success) {
        toast.success("Datos de campañas subidos correctamente");
        setCampaignFormData({
          campaigns: [],
          summary: { totalSent: 0, openRate: 0, conversionRate: 0, avgROI: 0 }
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Error al subir datos de campañas", {
        description: error instanceof Error ? error.message : "Error desconocido"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Subir CSV
  const handleCSVUpload = async () => {
    if (!csvData.trim()) {
      toast.error("Por favor ingresa datos CSV");
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiCall('/upload/csv', {
        method: 'POST',
        body: { csvData, dataType }
      });

      if (result.success) {
        toast.success("CSV subido correctamente", {
          description: result.message
        });
        setCsvData('');
        fetchUploadHistory();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Error al subir CSV", {
        description: error instanceof Error ? error.message : "Error desconocido"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener historial de uploads
  const fetchUploadHistory = async () => {
    try {
      const result = await apiCall('/uploads/history');
      if (result.success) {
        setUploadHistory(result.data);
      }
    } catch (error) {
      console.error('Error fetching upload history:', error);
    }
  };

  // Agregar campaña al formulario
  const addCampaign = () => {
    const newCampaign = {
      id: Date.now(),
      name: '',
      type: 'Email',
      status: 'Activa',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      roi: 0,
      trend: 'stable',
      progress: 0
    };
    setCampaignFormData(prev => ({
      ...prev,
      campaigns: [...prev.campaigns, newCampaign]
    }));
  };

  // Agregar entrada mensual para CLTV
  const addMonthlyEntry = () => {
    const newEntry = {
      month: '',
      cltv: 0,
      avgPurchase: 0,
      frequency: 0,
      lifespan: 0
    };
    setCLTVFormData(prev => ({
      ...prev,
      monthlyTrend: [...prev.monthlyTrend, newEntry]
    }));
  };

  // Generar plantilla CSV
  const generateCSVTemplate = (type: string) => {
    const templates = {
      customers: 'id,name,email,segment,lastPurchase,totalSpent,frequency\n1,Juan Pérez,juan@email.com,VIP,2025-07-15,2500,12\n2,María López,maria@email.com,Regular,2025-07-10,850,6',
      campaigns: 'name,type,status,sent,opened,clicked,converted,revenue,roi\nSummer Sale,Email,Activa,10000,4200,1800,450,125000,485\nVIP Exclusive,Email,Activa,2500,2100,1400,890,350000,1200',
      transactions: 'id,customerId,amount,date,product,category\n1,123,299.99,2025-07-15,Producto A,Electrónicos\n2,456,149.50,2025-07-14,Producto B,Ropa'
    };
    
    const template = templates[type] || '';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantilla_${type}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Sube y gestiona los datos del dashboard</p>
        </div>
        <Button onClick={fetchUploadHistory} variant="outline">
          <Database className="w-4 h-4 mr-2" />
          Actualizar Historial
        </Button>
      </div>

      <AdminGuide />

      <Tabs defaultValue="cltv" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cltv">CLTV</TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="csv">CSV</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        {/* Tab CLTV */}
        <TabsContent value="cltv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subir Datos CLTV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>CLTV Actual</Label>
                  <Input
                    type="number"
                    value={cltvFormData.currentMonth.cltv}
                    onChange={(e) => setCLTVFormData(prev => ({
                      ...prev,
                      currentMonth: { ...prev.currentMonth, cltv: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                </div>
                <div>
                  <Label>Compra Promedio</Label>
                  <Input
                    type="number"
                    value={cltvFormData.currentMonth.avgPurchase}
                    onChange={(e) => setCLTVFormData(prev => ({
                      ...prev,
                      currentMonth: { ...prev.currentMonth, avgPurchase: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                </div>
                <div>
                  <Label>Frecuencia</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={cltvFormData.currentMonth.frequency}
                    onChange={(e) => setCLTVFormData(prev => ({
                      ...prev,
                      currentMonth: { ...prev.currentMonth, frequency: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                </div>
                <div>
                  <Label>Vida Útil (meses)</Label>
                  <Input
                    type="number"
                    value={cltvFormData.currentMonth.lifespan}
                    onChange={(e) => setCLTVFormData(prev => ({
                      ...prev,
                      currentMonth: { ...prev.currentMonth, lifespan: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h4 className="font-medium">Tendencia Mensual</h4>
                <Button onClick={addMonthlyEntry} variant="outline" size="sm">
                  Agregar Mes
                </Button>
              </div>

              {cltvFormData.monthlyTrend.map((entry, index) => (
                <div key={index} className="grid grid-cols-5 gap-2">
                  <Input
                    placeholder="Mes"
                    value={entry.month}
                    onChange={(e) => {
                      const newTrend = [...cltvFormData.monthlyTrend];
                      newTrend[index].month = e.target.value;
                      setCLTVFormData(prev => ({ ...prev, monthlyTrend: newTrend }));
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="CLTV"
                    value={entry.cltv}
                    onChange={(e) => {
                      const newTrend = [...cltvFormData.monthlyTrend];
                      newTrend[index].cltv = parseFloat(e.target.value) || 0;
                      setCLTVFormData(prev => ({ ...prev, monthlyTrend: newTrend }));
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Compra Avg"
                    value={entry.avgPurchase}
                    onChange={(e) => {
                      const newTrend = [...cltvFormData.monthlyTrend];
                      newTrend[index].avgPurchase = parseFloat(e.target.value) || 0;
                      setCLTVFormData(prev => ({ ...prev, monthlyTrend: newTrend }));
                    }}
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Frecuencia"
                    value={entry.frequency}
                    onChange={(e) => {
                      const newTrend = [...cltvFormData.monthlyTrend];
                      newTrend[index].frequency = parseFloat(e.target.value) || 0;
                      setCLTVFormData(prev => ({ ...prev, monthlyTrend: newTrend }));
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Vida Útil"
                    value={entry.lifespan}
                    onChange={(e) => {
                      const newTrend = [...cltvFormData.monthlyTrend];
                      newTrend[index].lifespan = parseFloat(e.target.value) || 0;
                      setCLTVFormData(prev => ({ ...prev, monthlyTrend: newTrend }));
                    }}
                  />
                </div>
              ))}

              <Button onClick={handleCLTVUpload} disabled={isLoading}>
                <Upload className="w-4 h-4 mr-2" />
                {isLoading ? 'Subiendo...' : 'Subir Datos CLTV'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Campañas */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subir Datos de Campañas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Campañas</h4>
                <Button onClick={addCampaign} variant="outline" size="sm">
                  Agregar Campaña
                </Button>
              </div>

              {campaignFormData.campaigns.map((campaign, index) => (
                <div key={campaign.id} className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input
                      value={campaign.name}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].name = e.target.value;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select
                      value={campaign.type}
                      onValueChange={(value) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].type = value;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="SMS">SMS</SelectItem>
                        <SelectItem value="Push">Push</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select
                      value={campaign.status}
                      onValueChange={(value) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].status = value;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activa">Activa</SelectItem>
                        <SelectItem value="Pausada">Pausada</SelectItem>
                        <SelectItem value="Completada">Completada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Enviados</Label>
                    <Input
                      type="number"
                      value={campaign.sent}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].sent = parseFloat(e.target.value) || 0;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Abiertos</Label>
                    <Input
                      type="number"
                      value={campaign.opened}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].opened = parseFloat(e.target.value) || 0;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Clicks</Label>
                    <Input
                      type="number"
                      value={campaign.clicked}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].clicked = parseFloat(e.target.value) || 0;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Conversiones</Label>
                    <Input
                      type="number"
                      value={campaign.converted}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].converted = parseFloat(e.target.value) || 0;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Revenue</Label>
                    <Input
                      type="number"
                      value={campaign.revenue}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].revenue = parseFloat(e.target.value) || 0;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ROI (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={campaign.roi}
                      onChange={(e) => {
                        const newCampaigns = [...campaignFormData.campaigns];
                        newCampaigns[index].roi = parseFloat(e.target.value) || 0;
                        setCampaignFormData(prev => ({ ...prev, campaigns: newCampaigns }));
                      }}
                    />
                  </div>
                </div>
              ))}

              <Button onClick={handleCampaignUpload} disabled={isLoading}>
                <Upload className="w-4 h-4 mr-2" />
                {isLoading ? 'Subiendo...' : 'Subir Datos de Campañas'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab CSV */}
        <TabsContent value="csv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subir Datos CSV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Label>Tipo de Datos</Label>
                  <Select value={dataType} onValueChange={setDataType}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customers">Clientes</SelectItem>
                      <SelectItem value="campaigns">Campañas</SelectItem>
                      <SelectItem value="transactions">Transacciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => generateCSVTemplate(dataType)} 
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Plantilla
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Datos CSV</Label>
                <Textarea
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  placeholder="Pega aquí tus datos CSV o arrastra el archivo..."
                  className="min-h-48 font-mono text-sm"
                />
              </div>

              <Button onClick={handleCSVUpload} disabled={isLoading || !csvData.trim()}>
                <Upload className="w-4 h-4 mr-2" />
                {isLoading ? 'Subiendo...' : 'Subir CSV'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Historial */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              {uploadHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No hay uploads registrados
                </p>
              ) : (
                <div className="space-y-4">
                  {uploadHistory.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{upload.dataType}</h4>
                        <p className="text-sm text-muted-foreground">
                          {upload.recordCount} registros - {new Date(upload.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}