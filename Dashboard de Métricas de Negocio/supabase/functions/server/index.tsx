import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));
app.use('*', logger(console.log));

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Rutas para métricas CLTV
app.get('/make-server-34a574a2/metrics/cltv', async (c) => {
  try {
    const cltvData = await kv.get('cltv_metrics') || {
      currentMonth: { cltv: 1247, avgPurchase: 164, frequency: 2.8, lifespan: 22 },
      monthlyTrend: [
        { month: "Ene", cltv: 1087, avgPurchase: 145, frequency: 2.3, lifespan: 18 },
        { month: "Feb", cltv: 1134, avgPurchase: 152, frequency: 2.4, lifespan: 19 },
        { month: "Mar", cltv: 1089, avgPurchase: 148, frequency: 2.2, lifespan: 17 },
        { month: "Abr", cltv: 1198, avgPurchase: 159, frequency: 2.6, lifespan: 20 },
        { month: "May", cltv: 1245, avgPurchase: 162, frequency: 2.7, lifespan: 21 },
        { month: "Jun", cltv: 1247, avgPurchase: 164, frequency: 2.8, lifespan: 22 },
      ],
      yoyComparison: [
        { period: "2023", cltv: 987, avgPurchase: 132, frequency: 2.1, lifespan: 16 },
        { period: "2024", cltv: 1089, avgPurchase: 148, frequency: 2.3, lifespan: 18 },
        { period: "2025", cltv: 1247, avgPurchase: 164, frequency: 2.8, lifespan: 22 },
      ]
    };

    return c.json({ success: true, data: cltvData });
  } catch (error) {
    console.log('Error fetching CLTV metrics:', error);
    return c.json({ success: false, error: 'Failed to fetch CLTV metrics' }, 500);
  }
});

// Rutas para análisis de recurrencia
app.get('/make-server-34a574a2/metrics/recurrence', async (c) => {
  try {
    const recurrenceData = await kv.get('recurrence_metrics') || {
      overview: {
        recurrentRate: 68.4,
        newAcquisitionRate: 31.6,
        retentionRate: 68.4,
        churnRate: 12.7
      },
      monthlyTrend: [
        { month: "Ene", recurrentes: 65.2, nuevos: 34.8 },
        { month: "Feb", recurrentes: 66.1, nuevos: 33.9 },
        { month: "Mar", recurrentes: 67.3, nuevos: 32.7 },
        { month: "Abr", recurrentes: 68.9, nuevos: 31.1 },
        { month: "May", recurrentes: 69.2, nuevos: 30.8 },
        { month: "Jun", recurrentes: 68.4, nuevos: 31.6 },
      ],
      segmentAnalysis: [
        { segment: "VIP", recurrentes: 89.3, nuevos: 10.7, revenue: 45.2 },
        { segment: "Premium", recurrentes: 76.8, nuevos: 23.2, revenue: 32.1 },
        { segment: "Regular", recurrentes: 58.2, nuevos: 41.8, revenue: 18.5 },
        { segment: "Nuevos", recurrentes: 12.1, nuevos: 87.9, revenue: 4.2 }
      ]
    };

    return c.json({ success: true, data: recurrenceData });
  } catch (error) {
    console.log('Error fetching recurrence metrics:', error);
    return c.json({ success: false, error: 'Failed to fetch recurrence metrics' }, 500);
  }
});

// Rutas para análisis RFM
app.get('/make-server-34a574a2/metrics/rfm', async (c) => {
  try {
    const rfmData = await kv.get('rfm_analysis') || {
      segments: [
        { segment: "Champions", recency: 4.8, frequency: 4.9, monetary: 4.7, count: 1247, revenue: 847392, color: "#22c55e" },
        { segment: "Loyal Customers", recency: 4.2, frequency: 4.3, monetary: 4.1, count: 2834, revenue: 634821, color: "#3b82f6" },
        { segment: "Potential Loyalists", recency: 4.1, frequency: 3.2, monetary: 3.4, count: 1892, revenue: 324718, color: "#8b5cf6" },
        { segment: "New Customers", recency: 4.6, frequency: 1.8, monetary: 2.1, count: 2147, revenue: 234567, color: "#06b6d4" },
        { segment: "At Risk", recency: 1.8, frequency: 3.9, monetary: 4.2, count: 1247, revenue: 234561, color: "#dc2626" },
        { segment: "Cannot Lose Them", recency: 1.2, frequency: 4.8, monetary: 4.9, count: 634, revenue: 187432, color: "#b91c1c" },
        { segment: "Hibernating", recency: 1.1, frequency: 1.2, monetary: 1.8, count: 2847, revenue: 98765, color: "#6b7280" },
      ]
    };

    return c.json({ success: true, data: rfmData });
  } catch (error) {
    console.log('Error fetching RFM analysis:', error);
    return c.json({ success: false, error: 'Failed to fetch RFM analysis' }, 500);
  }
});

// Rutas para campañas
app.get('/make-server-34a574a2/campaigns', async (c) => {
  try {
    const campaignsData = await kv.get('campaigns_data') || {
      campaigns: [
        {
          id: 1,
          name: "Summer Sale 2025",
          type: "Email",
          status: "Activa",
          sent: 15847,
          opened: 6892,
          clicked: 2847,
          converted: 847,
          revenue: 247392,
          roi: 485.2,
          trend: "up",
          progress: 85
        },
        {
          id: 2,
          name: "VIP Exclusive",
          type: "Email",
          status: "Activa",
          sent: 2134,
          opened: 1847,
          clicked: 1234,
          converted: 789,
          revenue: 456789,
          roi: 1247.3,
          trend: "up",
          progress: 90
        }
      ],
      summary: {
        totalSent: 35809,
        openRate: 41.2,
        conversionRate: 8.7,
        avgROI: 551.6
      }
    };

    return c.json({ success: true, data: campaignsData });
  } catch (error) {
    console.log('Error fetching campaigns data:', error);
    return c.json({ success: false, error: 'Failed to fetch campaigns data' }, 500);
  }
});

// Rutas para notificaciones
app.get('/make-server-34a574a2/notifications', async (c) => {
  try {
    const notifications = await kv.get('notifications') || [];
    return c.json({ success: true, data: notifications });
  } catch (error) {
    console.log('Error fetching notifications:', error);
    return c.json({ success: false, error: 'Failed to fetch notifications' }, 500);
  }
});

app.post('/make-server-34a574a2/notifications', async (c) => {
  try {
    const body = await c.req.json();
    const { type, title, message, metadata } = body;

    const notification = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      actionable: type === 'urgent' || type === 'warning',
      metadata
    };

    const notifications = await kv.get('notifications') || [];
    notifications.unshift(notification);

    // Mantener solo las últimas 50 notificaciones
    if (notifications.length > 50) {
      notifications.splice(50);
    }

    await kv.set('notifications', notifications);

    return c.json({ success: true, data: notification });
  } catch (error) {
    console.log('Error creating notification:', error);
    return c.json({ success: false, error: 'Failed to create notification' }, 500);
  }
});

// Marcar notificación como leída
app.patch('/make-server-34a574a2/notifications/:id/read', async (c) => {
  try {
    const id = c.req.param('id');
    const notifications = await kv.get('notifications') || [];
    
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );

    await kv.set('notifications', updatedNotifications);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error marking notification as read:', error);
    return c.json({ success: false, error: 'Failed to mark notification as read' }, 500);
  }
});

// Rutas para anotaciones del reporte
app.get('/make-server-34a574a2/report/notes', async (c) => {
  try {
    const notes = await kv.get('report_notes') || [];
    return c.json({ success: true, data: notes });
  } catch (error) {
    console.log('Error fetching report notes:', error);
    return c.json({ success: false, error: 'Failed to fetch report notes' }, 500);
  }
});

app.post('/make-server-34a574a2/report/notes', async (c) => {
  try {
    const body = await c.req.json();
    const { type, title, content, metrics, author } = body;

    const note = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      type,
      title,
      content,
      metrics,
      author,
      createdAt: new Date().toISOString()
    };

    const notes = await kv.get('report_notes') || [];
    notes.unshift(note);

    await kv.set('report_notes', notes);

    return c.json({ success: true, data: note });
  } catch (error) {
    console.log('Error creating report note:', error);
    return c.json({ success: false, error: 'Failed to create report note' }, 500);
  }
});

// Rutas para acciones de seguimiento
app.get('/make-server-34a574a2/report/actions', async (c) => {
  try {
    const actions = await kv.get('action_items') || [];
    return c.json({ success: true, data: actions });
  } catch (error) {
    console.log('Error fetching action items:', error);
    return c.json({ success: false, error: 'Failed to fetch action items' }, 500);
  }
});

app.post('/make-server-34a574a2/report/actions', async (c) => {
  try {
    const body = await c.req.json();
    const { priority, action, owner, deadline } = body;

    const actionItem = {
      id: crypto.randomUUID(),
      priority,
      action,
      owner,
      deadline,
      status: "Pendiente",
      createdAt: new Date().toISOString()
    };

    const actions = await kv.get('action_items') || [];
    actions.unshift(actionItem);

    await kv.set('action_items', actions);

    return c.json({ success: true, data: actionItem });
  } catch (error) {
    console.log('Error creating action item:', error);
    return c.json({ success: false, error: 'Failed to create action item' }, 500);
  }
});

// Endpoint para simular alertas automáticas
app.post('/make-server-34a574a2/check-alerts', async (c) => {
  try {
    // Simular verificación de métricas críticas
    const cltvData = await kv.get('cltv_metrics');
    const recurrenceData = await kv.get('recurrence_metrics');
    
    const alerts = [];

    // Verificar churn rate crítico
    if (recurrenceData?.overview?.churnRate > 15) {
      alerts.push({
        type: 'urgent',
        title: 'Churn Rate Crítico',
        message: `Churn rate alcanzó ${recurrenceData.overview.churnRate}% - requiere acción inmediata`,
        metadata: {
          metric: 'churn_rate',
          value: recurrenceData.overview.churnRate,
          threshold: 15
        }
      });
    }

    // Verificar segmento At Risk
    const rfmData = await kv.get('rfm_analysis');
    const atRiskSegment = rfmData?.segments?.find(s => s.segment === "At Risk");
    if (atRiskSegment && atRiskSegment.count > 1000) {
      alerts.push({
        type: 'warning',
        title: 'Segmento At Risk en Crecimiento',
        message: `${atRiskSegment.count} clientes en riesgo - incremento significativo`,
        metadata: {
          metric: 'at_risk_customers',
          value: atRiskSegment.count,
          threshold: 1000
        }
      });
    }

    // Crear notificaciones para las alertas
    for (const alert of alerts) {
      const notification = {
        id: crypto.randomUUID(),
        ...alert,
        timestamp: new Date().toISOString(),
        read: false,
        actionable: true
      };

      const notifications = await kv.get('notifications') || [];
      notifications.unshift(notification);
      await kv.set('notifications', notifications);
    }

    return c.json({ success: true, alerts: alerts.length });
  } catch (error) {
    console.log('Error checking alerts:', error);
    return c.json({ success: false, error: 'Failed to check alerts' }, 500);
  }
});

// Endpoint para generar reporte PDF (simulado)
app.post('/make-server-34a574a2/export/report', async (c) => {
  try {
    const body = await c.req.json();
    const { format, sections, dateRange, includeCharts, includeRawData } = body;

    // Simular generación del reporte
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reportData = {
      id: crypto.randomUUID(),
      format,
      sections,
      dateRange,
      includeCharts,
      includeRawData,
      generatedAt: new Date().toISOString(),
      fileName: `reporte_retencion_${dateRange.start}_${dateRange.end}.${format}`,
      size: Math.floor(Math.random() * 5000) + 1000 // KB
    };

    // Guardar información del reporte generado
    const reports = await kv.get('generated_reports') || [];
    reports.unshift(reportData);
    
    // Mantener solo los últimos 20 reportes
    if (reports.length > 20) {
      reports.splice(20);
    }
    
    await kv.set('generated_reports', reports);

    return c.json({ success: true, data: reportData });
  } catch (error) {
    console.log('Error generating report:', error);
    return c.json({ success: false, error: 'Failed to generate report' }, 500);
  }
});

// ============= ENDPOINTS PARA SUBIR DATOS =============

// Subir datos CLTV
app.post('/make-server-34a574a2/upload/cltv', async (c) => {
  try {
    const body = await c.req.json();
    const { currentMonth, monthlyTrend, yoyComparison } = body;

    const cltvData = {
      currentMonth: currentMonth || { cltv: 0, avgPurchase: 0, frequency: 0, lifespan: 0 },
      monthlyTrend: monthlyTrend || [],
      yoyComparison: yoyComparison || [],
      lastUpdated: new Date().toISOString()
    };

    await kv.set('cltv_metrics', cltvData);

    return c.json({ success: true, message: 'CLTV data uploaded successfully' });
  } catch (error) {
    console.log('Error uploading CLTV data:', error);
    return c.json({ success: false, error: 'Failed to upload CLTV data' }, 500);
  }
});

// Subir datos de recurrencia
app.post('/make-server-34a574a2/upload/recurrence', async (c) => {
  try {
    const body = await c.req.json();
    const { overview, monthlyTrend, segmentAnalysis } = body;

    const recurrenceData = {
      overview: overview || { recurrentRate: 0, newAcquisitionRate: 0, retentionRate: 0, churnRate: 0 },
      monthlyTrend: monthlyTrend || [],
      segmentAnalysis: segmentAnalysis || [],
      lastUpdated: new Date().toISOString()
    };

    await kv.set('recurrence_metrics', recurrenceData);

    return c.json({ success: true, message: 'Recurrence data uploaded successfully' });
  } catch (error) {
    console.log('Error uploading recurrence data:', error);
    return c.json({ success: false, error: 'Failed to upload recurrence data' }, 500);
  }
});

// Subir datos RFM
app.post('/make-server-34a574a2/upload/rfm', async (c) => {
  try {
    const body = await c.req.json();
    const { segments } = body;

    const rfmData = {
      segments: segments || [],
      lastUpdated: new Date().toISOString()
    };

    await kv.set('rfm_analysis', rfmData);

    return c.json({ success: true, message: 'RFM data uploaded successfully' });
  } catch (error) {
    console.log('Error uploading RFM data:', error);
    return c.json({ success: false, error: 'Failed to upload RFM data' }, 500);
  }
});

// Subir datos de campañas
app.post('/make-server-34a574a2/upload/campaigns', async (c) => {
  try {
    const body = await c.req.json();
    const { campaigns, summary } = body;

    const campaignsData = {
      campaigns: campaigns || [],
      summary: summary || { totalSent: 0, openRate: 0, conversionRate: 0, avgROI: 0 },
      lastUpdated: new Date().toISOString()
    };

    await kv.set('campaigns_data', campaignsData);

    return c.json({ success: true, message: 'Campaign data uploaded successfully' });
  } catch (error) {
    console.log('Error uploading campaign data:', error);
    return c.json({ success: false, error: 'Failed to upload campaign data' }, 500);
  }
});

// Subir datos desde CSV
app.post('/make-server-34a574a2/upload/csv', async (c) => {
  try {
    const body = await c.req.json();
    const { csvData, dataType } = body;

    // Procesar datos CSV según el tipo
    let processedData;
    
    switch (dataType) {
      case 'customers':
        processedData = processCustomerCSV(csvData);
        break;
      case 'campaigns':
        processedData = processCampaignCSV(csvData);
        break;
      case 'transactions':
        processedData = processTransactionCSV(csvData);
        break;
      default:
        throw new Error('Tipo de datos no soportado');
    }

    // Guardar los datos procesados
    const uploadRecord = {
      id: crypto.randomUUID(),
      dataType,
      recordCount: processedData.length,
      uploadedAt: new Date().toISOString(),
      processedData
    };

    const uploads = await kv.get('csv_uploads') || [];
    uploads.unshift(uploadRecord);
    
    // Mantener solo los últimos 10 uploads
    if (uploads.length > 10) {
      uploads.splice(10);
    }
    
    await kv.set('csv_uploads', uploads);

    return c.json({ 
      success: true, 
      message: `CSV uploaded successfully. ${processedData.length} records processed.`,
      data: uploadRecord
    });
  } catch (error) {
    console.log('Error uploading CSV:', error);
    return c.json({ success: false, error: error.message || 'Failed to upload CSV' }, 500);
  }
});

// Obtener historial de uploads
app.get('/make-server-34a574a2/uploads/history', async (c) => {
  try {
    const uploads = await kv.get('csv_uploads') || [];
    return c.json({ success: true, data: uploads });
  } catch (error) {
    console.log('Error fetching upload history:', error);
    return c.json({ success: false, error: 'Failed to fetch upload history' }, 500);
  }
});

// Funciones auxiliares para procesar CSV
function processCustomerCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  const customers = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const customer = {};
    
    headers.forEach((header, index) => {
      customer[header.trim()] = values[index]?.trim() || '';
    });
    
    customers.push(customer);
  }

  return customers;
}

function processCampaignCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  const campaigns = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const campaign = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || '';
      
      // Convertir números automáticamente
      if (header.includes('sent') || header.includes('opened') || header.includes('clicked') || 
          header.includes('converted') || header.includes('revenue') || header.includes('roi')) {
        campaign[header.trim()] = parseFloat(value) || 0;
      } else {
        campaign[header.trim()] = value;
      }
    });
    
    campaigns.push(campaign);
  }

  return campaigns;
}

function processTransactionCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  const transactions = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const transaction = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || '';
      
      // Convertir números y fechas automáticamente
      if (header.includes('amount') || header.includes('price') || header.includes('total')) {
        transaction[header.trim()] = parseFloat(value) || 0;
      } else if (header.includes('date') || header.includes('time')) {
        transaction[header.trim()] = new Date(value).toISOString();
      } else {
        transaction[header.trim()] = value;
      }
    });
    
    transactions.push(transaction);
  }

  return transactions;
}

// Inicializar datos por defecto
app.post('/make-server-34a574a2/init-data', async (c) => {
  try {
    // Verificar si ya existen datos
    const existingData = await kv.get('cltv_metrics');
    if (existingData) {
      return c.json({ success: true, message: 'Data already exists' });
    }

    // Inicializar datos por defecto
    const defaultData = {
      cltv_metrics: {
        currentMonth: { cltv: 1247, avgPurchase: 164, frequency: 2.8, lifespan: 22 },
        monthlyTrend: [
          { month: "Ene", cltv: 1087, avgPurchase: 145, frequency: 2.3, lifespan: 18 },
          { month: "Feb", cltv: 1134, avgPurchase: 152, frequency: 2.4, lifespan: 19 },
          { month: "Mar", cltv: 1089, avgPurchase: 148, frequency: 2.2, lifespan: 17 },
          { month: "Abr", cltv: 1198, avgPurchase: 159, frequency: 2.6, lifespan: 20 },
          { month: "May", cltv: 1245, avgPurchase: 162, frequency: 2.7, lifespan: 21 },
          { month: "Jun", cltv: 1247, avgPurchase: 164, frequency: 2.8, lifespan: 22 },
        ],
        yoyComparison: [
          { period: "2023", cltv: 987, avgPurchase: 132, frequency: 2.1, lifespan: 16 },
          { period: "2024", cltv: 1089, avgPurchase: 148, frequency: 2.3, lifespan: 18 },
          { period: "2025", cltv: 1247, avgPurchase: 164, frequency: 2.8, lifespan: 22 },
        ]
      },
      notifications: [
        {
          id: crypto.randomUUID(),
          type: 'warning',
          title: 'Segmento At Risk en Crecimiento',
          message: '1,247 clientes en segmento "At Risk" - incremento del 15% esta semana.',
          timestamp: new Date().toISOString(),
          read: false,
          actionable: true,
          metadata: {
            metric: 'at_risk_customers',
            value: 1247,
            threshold: 1000
          }
        }
      ]
    };

    // Guardar todos los datos por defecto
    for (const [key, value] of Object.entries(defaultData)) {
      await kv.set(key, value);
    }

    return c.json({ success: true, message: 'Default data initialized' });
  } catch (error) {
    console.log('Error initializing data:', error);
    return c.json({ success: false, error: 'Failed to initialize data' }, 500);
  }
});

Deno.serve(app.fetch);