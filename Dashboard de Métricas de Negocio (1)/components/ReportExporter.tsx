import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Download, FileText, Settings } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useReportData } from "../hooks/useApiClient";

interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  sections: {
    header: boolean;
    cltv: boolean;
    recurrence: boolean;
    rfm: boolean;
    campaigns: boolean;
    followUp: boolean;
  };
  dateRange: {
    start: string;
    end: string;
  };
  includeCharts: boolean;
  includeRawData: boolean;
}

const defaultOptions: ExportOptions = {
  format: 'pdf',
  sections: {
    header: true,
    cltv: true,
    recurrence: true,
    rfm: true,
    campaigns: true,
    followUp: true,
  },
  dateRange: {
    start: '2025-07-01',
    end: '2025-07-31',
  },
  includeCharts: true,
  includeRawData: false,
};

export function ReportExporter() {
  const [options, setOptions] = useState<ExportOptions>(defaultOptions);
  const [isOpen, setIsOpen] = useState(false);
  const { exportReport } = useReportData();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const result = await exportReport(options);
      
      if (result.success) {
        const reportData = result.data;
        
        toast.success("Reporte exportado exitosamente", {
          description: `El archivo ${reportData.fileName} (${(reportData.size / 1024).toFixed(1)} MB) se ha generado correctamente.`,
          action: {
            label: "Descargar",
            onClick: () => {
              console.log("Descargando archivo:", reportData.fileName);
              toast.info("Descarga iniciada");
            }
          }
        });
        
        setIsOpen(false);
      } else {
        throw new Error(result.error || 'Error al generar reporte');
      }
    } catch (error) {
      console.error('Error exporting report:', error);
      toast.error("Error al exportar reporte", {
        description: error instanceof Error ? error.message : "Intente nuevamente en unos momentos."
      });
    } finally {
      setIsExporting(false);
    }
  };

  const updateSection = (section: keyof ExportOptions['sections'], value: boolean) => {
    setOptions(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: value
      }
    }));
  };

  const presetConfigs = {
    executive: {
      name: "Resumen Ejecutivo",
      sections: { header: true, cltv: true, recurrence: true, rfm: false, campaigns: true, followUp: true },
      includeCharts: true,
      includeRawData: false
    },
    technical: {
      name: "Reporte Técnico",
      sections: { header: true, cltv: true, recurrence: true, rfm: true, campaigns: true, followUp: false },
      includeCharts: true,
      includeRawData: true
    },
    campaigns: {
      name: "Solo Campañas",
      sections: { header: true, cltv: false, recurrence: false, rfm: false, campaigns: true, followUp: true },
      includeCharts: false,
      includeRawData: true
    }
  };

  const applyPreset = (preset: keyof typeof presetConfigs) => {
    const config = presetConfigs[preset];
    setOptions(prev => ({
      ...prev,
      sections: config.sections,
      includeCharts: config.includeCharts,
      includeRawData: config.includeRawData
    }));
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Download className="w-4 h-4 mr-2" />
        Exportar Reporte
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Exportar Reporte de Retención
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Configuraciones predefinidas */}
            <div className="space-y-3">
              <Label>Configuraciones Predefinidas</Label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(presetConfigs).map(([key, config]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(key as keyof typeof presetConfigs)}
                    className="justify-start"
                  >
                    {config.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Formato de exportación */}
            <div className="space-y-2">
              <Label>Formato de Exportación</Label>
              <Select 
                value={options.format} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, format: value as 'pdf' | 'excel' | 'csv' }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF (Recomendado)</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rango de fechas */}
            <div className="space-y-2">
              <Label>Rango de Fechas</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Desde</Label>
                  <Input
                    type="date"
                    value={options.dateRange.start}
                    onChange={(e) => setOptions(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Hasta</Label>
                  <Input
                    type="date"
                    value={options.dateRange.end}
                    onChange={(e) => setOptions(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Secciones a incluir */}
            <div className="space-y-3">
              <Label>Secciones a Incluir</Label>
              <div className="space-y-2">
                {Object.entries(options.sections).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => updateSection(key as keyof ExportOptions['sections'], checked as boolean)}
                    />
                    <Label htmlFor={key} className="text-sm">
                      {key === 'header' && 'Encabezado y KPIs'}
                      {key === 'cltv' && 'Análisis CLTV'}
                      {key === 'recurrence' && 'Análisis de Recurrencia'}
                      {key === 'rfm' && 'Análisis RFM'}
                      {key === 'campaigns' && 'Resultados de Campañas'}
                      {key === 'followUp' && 'Reporte de Seguimiento'}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="space-y-3">
              <Label>Opciones Adicionales</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeCharts"
                    checked={options.includeCharts}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeCharts: checked as boolean }))}
                  />
                  <Label htmlFor="includeCharts" className="text-sm">
                    Incluir gráficos y visualizaciones
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeRawData"
                    checked={options.includeRawData}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeRawData: checked as boolean }))}
                  />
                  <Label htmlFor="includeRawData" className="text-sm">
                    Incluir datos tabulares detallados
                  </Label>
                </div>
              </div>
            </div>

            {/* Botón de exportación */}
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="w-full"
            >
              {isExporting ? (
                <>
                  <Settings className="w-4 h-4 mr-2 animate-spin" />
                  Generando reporte...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Reporte
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}