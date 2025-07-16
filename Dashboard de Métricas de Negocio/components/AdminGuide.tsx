import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, Upload, FileText, Database, Download, AlertCircle } from "lucide-react";
import { useState } from "react";

export function AdminGuide() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Guía de Uso del Panel de Administración
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium">CLTV</h4>
            <p className="text-sm text-muted-foreground">Sube métricas de valor de vida del cliente</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium">Campañas</h4>
            <p className="text-sm text-muted-foreground">Gestiona datos de campañas de marketing</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium">CSV</h4>
            <p className="text-sm text-muted-foreground">Importa datos masivos desde archivos CSV</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-medium">Historial</h4>
            <p className="text-sm text-muted-foreground">Revisa uploads anteriores</p>
          </div>
        </div>

        <div className="space-y-3">
          <Collapsible open={openSections.includes('cltv')} onOpenChange={() => toggleSection('cltv')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span>📊 Cómo subir datos CLTV</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections.includes('cltv') ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-3 pl-6">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium">Datos del mes actual</p>
                    <p className="text-sm text-muted-foreground">Ingresa CLTV, compra promedio, frecuencia y vida útil del cliente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium">Tendencia mensual</p>
                    <p className="text-sm text-muted-foreground">Agrega datos históricos mes por mes para mostrar evolución</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium">Confirmar y subir</p>
                    <p className="text-sm text-muted-foreground">Revisa los datos y haz clic en "Subir Datos CLTV"</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.includes('campaigns')} onOpenChange={() => toggleSection('campaigns')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span>📧 Cómo subir datos de campañas</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections.includes('campaigns') ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-3 pl-6">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium">Agregar campañas</p>
                    <p className="text-sm text-muted-foreground">Usa "Agregar Campaña" para crear nuevas entradas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium">Completar métricas</p>
                    <p className="text-sm text-muted-foreground">Llena nombre, tipo, enviados, abiertos, clicks, conversiones, revenue y ROI</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium">Validar y subir</p>
                    <p className="text-sm text-muted-foreground">Verifica que todos los campos estén completos antes de subir</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.includes('csv')} onOpenChange={() => toggleSection('csv')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span>📄 Cómo usar importación CSV</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections.includes('csv') ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-3 pl-6">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium">Seleccionar tipo de datos</p>
                    <p className="text-sm text-muted-foreground">Elige entre Clientes, Campañas o Transacciones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium">Descargar plantilla</p>
                    <p className="text-sm text-muted-foreground">Haz clic en "Descargar Plantilla" para obtener el formato correcto</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium">Pegar datos CSV</p>
                    <p className="text-sm text-muted-foreground">Copia y pega tus datos CSV en el área de texto</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800">Consejos importantes</p>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  <li>• Siempre descarga la plantilla CSV antes de importar datos</li>
                  <li>• Revisa que los números estén en formato correcto (usa punto para decimales)</li>
                  <li>• Los datos se procesarán automáticamente al subirlos</li>
                  <li>• Puedes revisar el historial de uploads en la pestaña correspondiente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}