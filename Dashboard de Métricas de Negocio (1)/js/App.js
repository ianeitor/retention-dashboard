// Mock data para el dashboard
const mockData = {
  cltv: {
    average: 1847,
    yearOverYear: 12.5,
    breakdown: {
      averagePurchaseValue: 340,
      purchaseFrequency: 3.2,
      averageLifetime: 18
    },
    monthlyData: [
      { month: 'Ene', value: 1640 },
      { month: 'Feb', value: 1720 },
      { month: 'Mar', value: 1680 },
      { month: 'Abr', value: 1780 },
      { month: 'May', value: 1820 },
      { month: 'Jun', value: 1847 },
      { month: 'Jul', value: 1847 }
    ]
  },
  recurrence: {
    recurringPercentage: 67.3,
    newCustomerPercentage: 32.7,
    monthlyData: [
      { month: 'Ene', recurring: 62, new: 38 },
      { month: 'Feb', recurring: 64, new: 36 },
      { month: 'Mar', recurring: 65, new: 35 },
      { month: 'Abr', recurring: 66, new: 34 },
      { month: 'May', recurring: 68, new: 32 },
      { month: 'Jun', recurring: 67, new: 33 }
    ]
  },
  rfm: {
    segments: [
      { name: 'Campeones', count: 1205, percentage: 17.1, color: '#10b981' },
      { name: 'Leales', count: 982, percentage: 14.0, color: '#6366f1' },
      { name: 'Potencial', count: 756, percentage: 10.8, color: '#8b5cf6' },
      { name: 'Nuevos', count: 623, percentage: 8.9, color: '#06b6d4' },
      { name: 'En Riesgo', count: 445, percentage: 6.3, color: '#f59e0b' },
      { name: 'Perdidos', count: 334, percentage: 4.8, color: '#ef4444' }
    ]
  },
  campaigns: [
    {
      name: 'Email Retención Q2',
      type: 'Email',
      sent: 12500,
      opened: 4375,
      clicked: 875,
      converted: 158,
      revenue: 67420,
      cost: 2850,
      status: 'Activa'
    },
    {
      name: 'SMS Reactivación',
      type: 'SMS',
      sent: 3200,
      opened: 2880,
      clicked: 576,
      converted: 96,
      revenue: 28800,
      cost: 1280,
      status: 'Completada'
    }
  ]
};

// Hook para API calls (versión mock)
function useApiClient() {
  const [isLoading, setIsLoading] = React.useState(false);

  const apiCall = React.useCallback(async (endpoint, options = {}) => {
    setIsLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Retornar datos mock basados en el endpoint
      switch (endpoint) {
        case '/init-data':
          return { success: true, data: mockData };
        case '/check-alerts':
          return { success: true, alerts: [] };
        default:
          return { success: true, data: mockData };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { apiCall, isLoading };
}

// Componente Card
function Card({ className = '', children, ...props }) {
  return React.createElement('div', {
    className: `card ${className}`,
    ...props
  }, children);
}

function CardHeader({ className = '', children, ...props }) {
  return React.createElement('div', {
    className: `card-header ${className}`,
    ...props
  }, children);
}

function CardContent({ className = '', children, ...props }) {
  return React.createElement('div', {
    className: `card-content ${className}`,
    ...props
  }, children);
}

function CardTitle({ className = '', children, ...props }) {
  return React.createElement('h3', {
    className: `card-title ${className}`,
    ...props
  }, children);
}

// Componente Button
function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = variant === 'ghost' ? 'btn-ghost' : 
                     variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  
  return React.createElement('button', {
    className: `${baseClass} ${variantClass} ${sizeClass} ${className}`,
    ...props
  }, children);
}

// Componente Badge
function Badge({ className = '', variant = 'secondary', children, ...props }) {
  return React.createElement('span', {
    className: `badge badge-${variant} ${className}`,
    ...props
  }, children);
}

// Componente Skeleton
function Skeleton({ className = '', ...props }) {
  return React.createElement('div', {
    className: `skeleton ${className}`,
    ...props
  });
}

// Iconos simplificados (usando emoji como fallback)
const Icons = {
  CalendarDays: () => '📅',
  TrendingUp: () => '📈',
  Users: () => '👥',
  DollarSign: () => '💰',
  Settings: () => '⚙️',
  Sparkles: () => '✨',
  RefreshCw: () => '🔄',
  AlertCircle: () => '⚠️',
  ArrowLeft: () => '←',
  Bell: () => '🔔',
  Download: () => '⬇️',
  Upload: () => '⬆️',
  FileText: () => '📄',
  Target: () => '🎯',
  TrendingDown: () => '📉',
  Clock: () => '⏰',
  CheckCircle: () => '✅',
  XCircle: () => '❌',
  BarChart: () => '📊',
  PieChart: () => '🥧',
  Activity: () => '📊'
};

// Componente DashboardHeader
function DashboardHeader({ onAdminClick }) {
  return React.createElement('div', { className: 'space-y-4' }, [
    React.createElement('div', { 
      key: 'header',
      className: 'flex items-center justify-between' 
    }, [
      React.createElement('div', { key: 'title' }, [
        React.createElement('h1', { 
          key: 'h1',
          className: 'text-3xl font-bold' 
        }, 'Dashboard de Métricas'),
        React.createElement('p', { 
          key: 'p',
          className: 'text-muted-foreground' 
        }, 'Análisis completo de rendimiento de clientes - Julio 2025')
      ]),
      React.createElement('div', { 
        key: 'actions',
        className: 'flex items-center gap-4' 
      }, [
        onAdminClick && React.createElement(Button, {
          key: 'admin',
          onClick: onAdminClick,
          variant: 'secondary',
          size: 'sm',
          className: 'hover-lift'
        }, [
          React.createElement('span', { key: 'icon' }, Icons.Settings()),
          ' Admin'
        ]),
        React.createElement(Badge, {
          key: 'badge',
          variant: 'secondary',
          className: 'px-3 py-1'
        }, [
          React.createElement('span', { key: 'icon' }, Icons.CalendarDays()),
          ' Último actualización: 16 Jul 2025'
        ])
      ])
    ]),
    
    // KPIs principales
    React.createElement('div', {
      key: 'kpis',
      className: 'grid grid-cols-1 md:grid-cols-4 gap-4'
    }, [
      React.createElement(Card, {
        key: 'revenue',
        className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50'
      }, [
        React.createElement(CardContent, { 
          key: 'content',
          className: 'p-4' 
        }, [
          React.createElement('div', {
            key: 'inner',
            className: 'flex items-center justify-between'
          }, [
            React.createElement('div', { key: 'data' }, [
              React.createElement('p', {
                key: 'label',
                className: 'text-sm text-muted-foreground'
              }, 'Revenue Total'),
              React.createElement('p', {
                key: 'value',
                className: 'text-2xl font-bold'
              }, '$2.4M')
            ]),
            React.createElement('div', {
              key: 'icon',
              className: 'p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500'
            }, React.createElement('span', { 
              style: { color: 'white' } 
            }, Icons.DollarSign()))
          ]),
          React.createElement('div', {
            key: 'trend',
            className: 'mt-2 flex items-center gap-1'
          }, [
            React.createElement('span', {
              key: 'trend-icon',
              style: { color: '#10b981' }
            }, Icons.TrendingUp()),
            React.createElement('span', {
              key: 'trend-text',
              className: 'text-xs',
              style: { color: '#10b981' }
            }, '+12.5% vs mes anterior')
          ])
        ])
      ]),
      
      // Repetir patrón para otros KPIs...
      React.createElement(Card, {
        key: 'customers',
        className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50',
        style: { animationDelay: '150ms' }
      }, [
        React.createElement(CardContent, { 
          key: 'content',
          className: 'p-4' 
        }, [
          React.createElement('div', {
            key: 'inner',
            className: 'flex items-center justify-between'
          }, [
            React.createElement('div', { key: 'data' }, [
              React.createElement('p', {
                key: 'label',
                className: 'text-sm text-muted-foreground'
              }, 'Clientes Activos'),
              React.createElement('p', {
                key: 'value',
                className: 'text-2xl font-bold'
              }, '7,024')
            ]),
            React.createElement('div', {
              key: 'icon',
              className: 'p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500'
            }, React.createElement('span', { 
              style: { color: 'white' } 
            }, Icons.Users()))
          ]),
          React.createElement('div', {
            key: 'trend',
            className: 'mt-2 flex items-center gap-1'
          }, [
            React.createElement('span', {
              key: 'trend-icon',
              style: { color: '#3b82f6' }
            }, Icons.TrendingUp()),
            React.createElement('span', {
              key: 'trend-text',
              className: 'text-xs',
              style: { color: '#3b82f6' }
            }, '+8.3% nuevos clientes')
          ])
        ])
      ]),
      
      React.createElement(Card, {
        key: 'cltv',
        className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50',
        style: { animationDelay: '300ms' }
      }, [
        React.createElement(CardContent, { 
          key: 'content',
          className: 'p-4' 
        }, [
          React.createElement('div', {
            key: 'inner',
            className: 'flex items-center justify-between'
          }, [
            React.createElement('div', { key: 'data' }, [
              React.createElement('p', {
                key: 'label',
                className: 'text-sm text-muted-foreground'
              }, 'CLTV Promedio'),
              React.createElement('p', {
                key: 'value',
                className: 'text-2xl font-bold'
              }, '$1,847')
            ]),
            React.createElement('div', {
              key: 'icon',
              className: 'p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500'
            }, React.createElement('span', { 
              style: { color: 'white' } 
            }, Icons.TrendingUp()))
          ]),
          React.createElement('div', {
            key: 'trend',
            className: 'mt-2 flex items-center gap-1'
          }, [
            React.createElement('span', {
              key: 'trend-icon',
              style: { color: '#8b5cf6' }
            }, Icons.TrendingUp()),
            React.createElement('span', {
              key: 'trend-text',
              className: 'text-xs',
              style: { color: '#8b5cf6' }
            }, '+6.5% incremento')
          ])
        ])
      ]),
      
      React.createElement(Card, {
        key: 'retention',
        className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/10 border-border/50',
        style: { animationDelay: '450ms' }
      }, [
        React.createElement(CardContent, { 
          key: 'content',
          className: 'p-4' 
        }, [
          React.createElement('div', {
            key: 'inner',
            className: 'flex items-center justify-between'
          }, [
            React.createElement('div', { key: 'data' }, [
              React.createElement('p', {
                key: 'label',
                className: 'text-sm text-muted-foreground'
              }, 'Tasa Retención'),
              React.createElement('p', {
                key: 'value',
                className: 'text-2xl font-bold'
              }, '87.1%')
            ]),
            React.createElement('div', {
              key: 'icon',
              className: 'p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500'
            }, React.createElement('span', { 
              style: { color: 'white' } 
            }, Icons.Target()))
          ]),
          React.createElement('div', {
            key: 'trend',
            className: 'mt-2 flex items-center gap-1'
          }, [
            React.createElement('span', {
              key: 'trend-icon',
              style: { color: '#f97316' }
            }, Icons.TrendingUp()),
            React.createElement('span', {
              key: 'trend-text',
              className: 'text-xs',
              style: { color: '#f97316' }
            }, '+2.1% mejora')
          ])
        ])
      ])
    ])
  ]);
}

// Componente CLTVMetrics simplificado
function CLTVMetrics() {
  return React.createElement(Card, {
    className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/20'
  }, [
    React.createElement(CardHeader, { key: 'header' }, [
      React.createElement(CardTitle, { 
        key: 'title',
        className: 'flex items-center gap-2'
      }, [
        React.createElement('span', { key: 'icon' }, Icons.DollarSign()),
        'CLTV (Customer Lifetime Value)'
      ])
    ]),
    React.createElement(CardContent, { key: 'content' }, [
      React.createElement('div', { 
        key: 'metrics',
        className: 'space-y-4' 
      }, [
        React.createElement('div', {
          key: 'main-metric',
          className: 'text-center p-6 bg-gradient-to-r from-primary/5 to-chart-2/5 rounded-lg'
        }, [
          React.createElement('div', {
            key: 'value',
            className: 'text-4xl font-bold text-primary mb-2'
          }, '$1,847'),
          React.createElement('p', {
            key: 'label',
            className: 'text-muted-foreground'
          }, 'CLTV Promedio'),
          React.createElement('div', {
            key: 'change',
            className: 'flex items-center justify-center gap-1 mt-2'
          }, [
            React.createElement('span', { 
              key: 'icon',
              style: { color: '#10b981' } 
            }, Icons.TrendingUp()),
            React.createElement('span', {
              key: 'text',
              style: { color: '#10b981' }
            }, '+12.5% vs año anterior')
          ])
        ]),
        
        React.createElement('div', {
          key: 'breakdown',
          className: 'grid grid-cols-3 gap-4'
        }, [
          React.createElement('div', {
            key: 'purchase-value',
            className: 'text-center p-4 bg-muted/50 rounded-lg'
          }, [
            React.createElement('div', {
              key: 'value',
              className: 'text-2xl font-bold'
            }, '$340'),
            React.createElement('p', {
              key: 'label',
              className: 'text-sm text-muted-foreground'
            }, 'Valor Promedio Compra')
          ]),
          React.createElement('div', {
            key: 'frequency',
            className: 'text-center p-4 bg-muted/50 rounded-lg'
          }, [
            React.createElement('div', {
              key: 'value',
              className: 'text-2xl font-bold'
            }, '3.2'),
            React.createElement('p', {
              key: 'label',
              className: 'text-sm text-muted-foreground'
            }, 'Frecuencia Compra')
          ]),
          React.createElement('div', {
            key: 'lifetime',
            className: 'text-center p-4 bg-muted/50 rounded-lg'
          }, [
            React.createElement('div', {
              key: 'value',
              className: 'text-2xl font-bold'
            }, '18'),
            React.createElement('p', {
              key: 'label',
              className: 'text-sm text-muted-foreground'
            }, 'Meses Promedio')
          ])
        ])
      ])
    ])
  ]);
}

// Componente RecurrenceAnalysis simplificado
function RecurrenceAnalysis() {
  return React.createElement(Card, {
    className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/20'
  }, [
    React.createElement(CardHeader, { key: 'header' }, [
      React.createElement(CardTitle, { 
        key: 'title',
        className: 'flex items-center gap-2'
      }, [
        React.createElement('span', { key: 'icon' }, Icons.Activity()),
        'Análisis de Recurrencia'
      ])
    ]),
    React.createElement(CardContent, { key: 'content' }, [
      React.createElement('div', { 
        key: 'metrics',
        className: 'space-y-6' 
      }, [
        React.createElement('div', {
          key: 'percentages',
          className: 'grid grid-cols-2 gap-4'
        }, [
          React.createElement('div', {
            key: 'recurring',
            className: 'text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg'
          }, [
            React.createElement('div', {
              key: 'value',
              className: 'text-3xl font-bold text-green-600'
            }, '67.3%'),
            React.createElement('p', {
              key: 'label',
              className: 'text-sm text-green-700'
            }, 'Clientes Recurrentes')
          ]),
          React.createElement('div', {
            key: 'new',
            className: 'text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg'
          }, [
            React.createElement('div', {
              key: 'value',
              className: 'text-3xl font-bold text-blue-600'
            }, '32.7%'),
            React.createElement('p', {
              key: 'label',
              className: 'text-sm text-blue-700'
            }, 'Nuevos Clientes')
          ])
        ]),
        
        React.createElement('div', {
          key: 'chart-placeholder',
          className: 'h-48 bg-muted/30 rounded-lg flex items-center justify-center'
        }, [
          React.createElement('div', {
            key: 'chart-content',
            className: 'text-center text-muted-foreground'
          }, [
            React.createElement('span', { 
              key: 'icon',
              className: 'text-4xl' 
            }, Icons.BarChart()),
            React.createElement('p', { 
              key: 'text',
              className: 'mt-2' 
            }, 'Gráfico de Tendencia de Recurrencia')
          ])
        ])
      ])
    ])
  ]);
}

// Componente RFMAnalysis simplificado
function RFMAnalysis() {
  const segments = mockData.rfm.segments;
  
  return React.createElement(Card, {
    className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/20'
  }, [
    React.createElement(CardHeader, { key: 'header' }, [
      React.createElement(CardTitle, { 
        key: 'title',
        className: 'flex items-center gap-2'
      }, [
        React.createElement('span', { key: 'icon' }, Icons.PieChart()),
        'Análisis RFM - Segmentación de Clientes'
      ])
    ]),
    React.createElement(CardContent, { key: 'content' }, [
      React.createElement('div', { 
        key: 'segments',
        className: 'space-y-4' 
      }, [
        React.createElement('div', {
          key: 'segments-grid',
          className: 'grid grid-cols-2 lg:grid-cols-3 gap-4'
        }, segments.map((segment, index) => 
          React.createElement('div', {
            key: segment.name,
            className: 'p-4 rounded-lg border',
            style: { 
              borderColor: segment.color + '40',
              backgroundColor: segment.color + '08'
            }
          }, [
            React.createElement('div', {
              key: 'header',
              className: 'flex items-center gap-2 mb-2'
            }, [
              React.createElement('div', {
                key: 'dot',
                className: 'w-3 h-3 rounded-full',
                style: { backgroundColor: segment.color }
              }),
              React.createElement('h4', {
                key: 'name',
                className: 'font-semibold'
              }, segment.name)
            ]),
            React.createElement('div', {
              key: 'stats',
              className: 'space-y-1'
            }, [
              React.createElement('p', {
                key: 'count',
                className: 'text-lg font-bold'
              }, segment.count.toLocaleString()),
              React.createElement('p', {
                key: 'percentage',
                className: 'text-sm text-muted-foreground'
              }, `${segment.percentage}% del total`)
            ])
          ])
        )),
        
        React.createElement('div', {
          key: 'insights',
          className: 'mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg'
        }, [
          React.createElement('h4', {
            key: 'title',
            className: 'font-semibold text-blue-900 mb-2'
          }, 'Insights Clave'),
          React.createElement('div', {
            key: 'list',
            className: 'space-y-1 text-sm text-blue-800'
          }, [
            React.createElement('p', { key: '1' }, '• Los Campeones representan el 17.1% y generan el 45% del revenue'),
            React.createElement('p', { key: '2' }, '• Clientes En Riesgo necesitan campañas de retención inmediatas'),
            React.createElement('p', { key: '3' }, '• 31.1% de clientes están en segmentos de alto valor (Campeones + Leales)')
          ])
        ])
      ])
    ])
  ]);
}

// Componente CampaignResults simplificado
function CampaignResults() {
  const campaigns = mockData.campaigns;
  
  return React.createElement(Card, {
    className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/20'
  }, [
    React.createElement(CardHeader, { key: 'header' }, [
      React.createElement(CardTitle, { 
        key: 'title',
        className: 'flex items-center gap-2'
      }, [
        React.createElement('span', { key: 'icon' }, Icons.Target()),
        'Resultados de Campañas'
      ])
    ]),
    React.createElement(CardContent, { key: 'content' }, [
      React.createElement('div', { 
        key: 'campaigns',
        className: 'space-y-4' 
      }, campaigns.map((campaign, index) => 
        React.createElement('div', {
          key: campaign.name,
          className: 'p-4 border border-border rounded-lg space-y-3'
        }, [
          React.createElement('div', {
            key: 'header',
            className: 'flex items-center justify-between'
          }, [
            React.createElement('div', { key: 'info' }, [
              React.createElement('h4', {
                key: 'name',
                className: 'font-semibold'
              }, campaign.name),
              React.createElement('p', {
                key: 'type',
                className: 'text-sm text-muted-foreground'
              }, campaign.type)
            ]),
            React.createElement(Badge, {
              key: 'status',
              className: campaign.status === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }, campaign.status)
          ]),
          
          React.createElement('div', {
            key: 'metrics',
            className: 'grid grid-cols-2 lg:grid-cols-4 gap-4'
          }, [
            React.createElement('div', {
              key: 'sent',
              className: 'text-center'
            }, [
              React.createElement('div', {
                key: 'value',
                className: 'font-bold'
              }, campaign.sent.toLocaleString()),
              React.createElement('p', {
                key: 'label',
                className: 'text-xs text-muted-foreground'
              }, 'Enviados')
            ]),
            React.createElement('div', {
              key: 'opened',
              className: 'text-center'
            }, [
              React.createElement('div', {
                key: 'value',
                className: 'font-bold'
              }, campaign.opened.toLocaleString()),
              React.createElement('p', {
                key: 'label',
                className: 'text-xs text-muted-foreground'
              }, 'Abiertos')
            ]),
            React.createElement('div', {
              key: 'clicked',
              className: 'text-center'
            }, [
              React.createElement('div', {
                key: 'value',
                className: 'font-bold'
              }, campaign.clicked.toLocaleString()),
              React.createElement('p', {
                key: 'label',
                className: 'text-xs text-muted-foreground'
              }, 'Clicks')
            ]),
            React.createElement('div', {
              key: 'converted',
              className: 'text-center'
            }, [
              React.createElement('div', {
                key: 'value',
                className: 'font-bold'
              }, campaign.converted.toLocaleString()),
              React.createElement('p', {
                key: 'label',
                className: 'text-xs text-muted-foreground'
              }, 'Conversiones')
            ])
          ]),
          
          React.createElement('div', {
            key: 'performance',
            className: 'flex justify-between items-center pt-2 border-t border-border'
          }, [
            React.createElement('div', { key: 'revenue' }, [
              React.createElement('span', {
                key: 'label',
                className: 'text-sm text-muted-foreground'
              }, 'Revenue: '),
              React.createElement('span', {
                key: 'value',
                className: 'font-semibold text-green-600'
              }, `$${campaign.revenue.toLocaleString()}`)
            ]),
            React.createElement('div', { key: 'roi' }, [
              React.createElement('span', {
                key: 'label',
                className: 'text-sm text-muted-foreground'
              }, 'ROI: '),
              React.createElement('span', {
                key: 'value',
                className: 'font-semibold text-primary'
              }, `${(campaign.revenue / campaign.cost).toFixed(1)}x`)
            ])
          ])
        ])
      ))
    ])
  ]);
}

// Componente FollowUpSystem simplificado
function FollowUpSystem() {
  return React.createElement(Card, {
    className: 'hover-lift animate-fade-in bg-gradient-to-br from-card to-muted/20'
  }, [
    React.createElement(CardHeader, { key: 'header' }, [
      React.createElement(CardTitle, { 
        key: 'title',
        className: 'flex items-center gap-2'
      }, [
        React.createElement('span', { key: 'icon' }, Icons.FileText()),
        'Reporte Mensual de Retención - Julio 2025'
      ])
    ]),
    React.createElement(CardContent, { key: 'content' }, [
      React.createElement('div', { 
        key: 'report',
        className: 'space-y-4' 
      }, [
        React.createElement('div', {
          key: 'summary',
          className: 'p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg'
        }, [
          React.createElement('h4', {
            key: 'title',
            className: 'font-semibold text-green-900 mb-2'
          }, '📈 Resumen del Mes'),
          React.createElement('p', {
            key: 'text',
            className: 'text-sm text-green-800'
          }, 'Julio mostró resultados excepcionales con un crecimiento del 12.5% en CLTV y mejora del 2.1% en retención. Las campañas de email obtuvieron ROI de 23.7x.')
        ]),
        
        React.createElement('div', {
          key: 'actions',
          className: 'p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg'
        }, [
          React.createElement('h4', {
            key: 'title',
            className: 'font-semibold text-blue-900 mb-2'
          }, '🎯 Acciones Implementadas'),
          React.createElement('div', {
            key: 'list',
            className: 'space-y-1 text-sm text-blue-800'
          }, [
            React.createElement('p', { key: '1' }, '• Lanzamiento de campaña de reactivación vía SMS'),
            React.createElement('p', { key: '2' }, '• Segmentación refinada de clientes en riesgo'),
            React.createElement('p', { key: '3' }, '• Programa de lealtad para clientes campeones')
          ])
        ]),
        
        React.createElement('div', {
          key: 'insights',
          className: 'p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg'
        }, [
          React.createElement('h4', {
            key: 'title',
            className: 'font-semibold text-purple-900 mb-2'
          }, '💡 Insights Clave'),
          React.createElement('div', {
            key: 'list',
            className: 'space-y-1 text-sm text-purple-800'
          }, [
            React.createElement('p', { key: '1' }, '• Los clientes de edad 25-34 muestran mayor CLTV (+23%)'),
            React.createElement('p', { key: '2' }, '• Productos de categoría Premium tienen 67% más retención'),
            React.createElement('p', { key: '3' }, '• Viernes y sábados son los días con mayor conversión')
          ])
        ]),
        
        React.createElement('div', {
          key: 'next-steps',
          className: 'p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg'
        }, [
          React.createElement('h4', {
            key: 'title',
            className: 'font-semibold text-orange-900 mb-2'
          }, '🚀 Próximos Pasos'),
          React.createElement('div', {
            key: 'list',
            className: 'space-y-1 text-sm text-orange-800'
          }, [
            React.createElement('p', { key: '1' }, '• Implementar chat en vivo para clientes premium'),
            React.createElement('p', { key: '2' }, '• A/B testing en emails con ofertas personalizadas'),
            React.createElement('p', { key: '3' }, '• Análisis predictivo para identificar churn temprano')
          ])
        ])
      ])
    ])
  ]);
}

// Componente AdminPanel simplificado
function AdminPanel() {
  const [activeTab, setActiveTab] = React.useState('cltv');
  
  return React.createElement('div', {
    className: 'space-y-6'
  }, [
    React.createElement('div', {
      key: 'header',
      className: 'text-center'
    }, [
      React.createElement('h2', {
        key: 'title',
        className: 'text-2xl font-bold mb-2'
      }, 'Panel de Administración'),
      React.createElement('p', {
        key: 'subtitle',
        className: 'text-muted-foreground'
      }, 'Gestiona los datos del dashboard')
    ]),
    
    React.createElement('div', {
      key: 'tabs',
      className: 'flex gap-2 p-1 bg-muted rounded-lg'
    }, [
      React.createElement(Button, {
        key: 'cltv-tab',
        variant: activeTab === 'cltv' ? 'primary' : 'ghost',
        size: 'sm',
        onClick: () => setActiveTab('cltv')
      }, 'Datos CLTV'),
      React.createElement(Button, {
        key: 'campaigns-tab',
        variant: activeTab === 'campaigns' ? 'primary' : 'ghost',
        size: 'sm',
        onClick: () => setActiveTab('campaigns')
      }, 'Campañas'),
      React.createElement(Button, {
        key: 'csv-tab',
        variant: activeTab === 'csv' ? 'primary' : 'ghost',
        size: 'sm',
        onClick: () => setActiveTab('csv')
      }, 'Importar CSV')
    ]),
    
    React.createElement(Card, {
      key: 'content'
    }, [
      React.createElement(CardContent, {
        key: 'card-content',
        className: 'p-6'
      }, [
        activeTab === 'cltv' && React.createElement('div', {
          key: 'cltv-content',
          className: 'space-y-4'
        }, [
          React.createElement('h3', {
            key: 'title',
            className: 'font-semibold'
          }, 'Actualizar Datos CLTV'),
          React.createElement('p', {
            key: 'description',
            className: 'text-muted-foreground'
          }, 'En modo demostración - Los cambios son temporales')
        ]),
        
        activeTab === 'campaigns' && React.createElement('div', {
          key: 'campaigns-content',
          className: 'space-y-4'
        }, [
          React.createElement('h3', {
            key: 'title',
            className: 'font-semibold'
          }, 'Gestionar Campañas'),
          React.createElement('p', {
            key: 'description',
            className: 'text-muted-foreground'
          }, 'Agrega y edita campañas de marketing')
        ]),
        
        activeTab === 'csv' && React.createElement('div', {
          key: 'csv-content',
          className: 'space-y-4'
        }, [
          React.createElement('h3', {
            key: 'title',
            className: 'font-semibold'
          }, 'Importar desde CSV'),
          React.createElement('p', {
            key: 'description',
            className: 'text-muted-foreground'
          }, 'Carga datos masivos desde archivos CSV')
        ])
      ])
    ])
  ]);
}

// Componente principal App
function App() {
  const { apiCall, isLoading } = useApiClient();
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [initError, setInitError] = React.useState(null);
  const [showFallback, setShowFallback] = React.useState(false);
  const [showAdmin, setShowAdmin] = React.useState(false);

  // Inicializar datos al cargar la aplicación
  React.useEffect(() => {
    const initializeData = async () => {
      try {
        const result = await apiCall('/init-data', { method: 'POST' });
        
        if (result.success) {
          setIsInitialized(true);
          console.log("Dashboard inicializado con datos mock");
        } else {
          throw new Error(result.error || 'Error al inicializar datos');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
        setInitError(errorMessage);
        console.log('Usando datos de demostración:', errorMessage);
        
        // Mostrar datos de fallback después de 1 segundo
        setTimeout(() => {
          setShowFallback(true);
          setIsInitialized(true);
        }, 1000);
      }
    };

    initializeData();
  }, [apiCall]);

  const handleRetry = () => {
    setInitError(null);
    setShowFallback(false);
    setIsInitialized(false);
    window.location.reload();
  };

  // Mostrar estado de carga inicial
  if ((isLoading && !isInitialized) || (!isInitialized && !showFallback && !initError)) {
    return React.createElement('div', {
      className: 'min-h-screen bg-background p-6'
    }, [
      React.createElement('div', {
        key: 'container',
        className: 'max-w-7xl mx-auto space-y-6'
      }, [
        React.createElement('div', {
          key: 'loading',
          className: 'text-center text-muted-foreground animate-pulse-slow'
        }, [
          React.createElement('div', {
            key: 'content',
            className: 'flex items-center justify-center gap-2 mb-2'
          }, [
            React.createElement('span', {
              key: 'icon',
              className: 'text-primary'
            }, Icons.Sparkles()),
            React.createElement('p', { key: 'text' }, 'Cargando Dashboard...')
          ])
        ])
      ])
    ]);
  }

  // Panel de administración
  if (showAdmin) {
    return React.createElement('div', {
      className: 'min-h-screen bg-background'
    }, [
      React.createElement('div', {
        key: 'admin-container',
        className: 'p-6'
      }, [
        React.createElement('div', {
          key: 'admin-header',
          className: 'flex items-center gap-4 mb-6'
        }, [
          React.createElement(Button, {
            key: 'back-button',
            onClick: () => setShowAdmin(false),
            variant: 'ghost',
            size: 'sm',
            className: 'hover-lift'
          }, [
            React.createElement('span', { key: 'icon' }, Icons.ArrowLeft()),
            ' Volver al Dashboard'
          ]),
          showFallback && React.createElement('div', {
            key: 'demo-notice',
            className: 'flex-1 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg animate-fade-in'
          }, [
            React.createElement('div', {
              key: 'notice-content',
              className: 'flex items-center gap-2'
            }, [
              React.createElement('span', {
                key: 'icon',
                style: { color: '#2563eb' }
              }, Icons.Sparkles()),
              React.createElement('span', {
                key: 'text',
                style: { color: '#1e40af' }
              }, 'Modo demostración: Los datos se almacenarán temporalmente')
            ])
          ])
        ]),
        React.createElement(AdminPanel, { key: 'admin-panel' })
      ])
    ]);
  }

  // Dashboard principal
  return React.createElement('div', {
    className: 'min-h-screen bg-background p-6'
  }, [
    React.createElement('div', {
      key: 'main-container',
      className: 'max-w-7xl mx-auto space-y-6'
    }, [
      showFallback && React.createElement('div', {
        key: 'demo-banner',
        className: 'mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl animate-fade-in'
      }, [
        React.createElement('div', {
          key: 'banner-content',
          className: 'flex items-center justify-between'
        }, [
          React.createElement('div', {
            key: 'banner-info',
            className: 'flex items-center gap-3'
          }, [
            React.createElement('div', {
              key: 'banner-icon',
              className: 'w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'
            }, React.createElement('span', {
              style: { color: '#2563eb' }
            }, Icons.Sparkles())),
            React.createElement('div', { key: 'banner-text' }, [
              React.createElement('p', {
                key: 'main-text',
                style: { color: '#1e40af' }
              }, 'Modo demostración: Mostrando datos ficticios.'),
              React.createElement('p', {
                key: 'sub-text',
                className: 'text-xs',
                style: { color: '#2563eb' }
              }, 'Conexión con backend no disponible.')
            ])
          ]),
          React.createElement(Button, {
            key: 'retry-button',
            variant: 'ghost',
            size: 'sm',
            onClick: handleRetry,
            style: { color: '#2563eb' }
          }, [
            React.createElement('span', { key: 'icon' }, Icons.RefreshCw()),
            ' Reconectar'
          ])
        ])
      ]),
      
      React.createElement(DashboardHeader, {
        key: 'header',
        onAdminClick: () => setShowAdmin(true)
      }),
      
      // Primera fila - CLTV y Recurrencia
      React.createElement('div', {
        key: 'row1',
        className: 'grid grid-cols-1 lg:grid-cols-2 gap-8'
      }, [
        React.createElement(CLTVMetrics, { key: 'cltv' }),
        React.createElement(RecurrenceAnalysis, { key: 'recurrence' })
      ]),

      // Segunda fila - RFM
      React.createElement('div', {
        key: 'row2',
        className: 'grid grid-cols-1 gap-8'
      }, [
        React.createElement(RFMAnalysis, { key: 'rfm' })
      ]),

      // Tercera fila - Campañas y Follow-up
      React.createElement('div', {
        key: 'row3',
        className: 'grid grid-cols-1 xl:grid-cols-2 gap-8'
      }, [
        React.createElement(CampaignResults, { key: 'campaigns' }),
        React.createElement(FollowUpSystem, { key: 'followup' })
      ]),

      // Footer
      React.createElement('div', {
        key: 'footer',
        className: 'text-center py-8 mt-12 border-t border-border/50'
      }, [
        React.createElement('div', {
          key: 'footer-content',
          className: 'flex items-center justify-center gap-2 text-muted-foreground'
        }, [
          React.createElement('span', { key: 'icon' }, Icons.Sparkles()),
          React.createElement('p', {
            key: 'text',
            className: 'text-sm'
          }, 'Dashboard de Métricas de Retención • Julio 2025')
        ])
      ])
    ])
  ]);
}

// Exportar componente
window.App = App;