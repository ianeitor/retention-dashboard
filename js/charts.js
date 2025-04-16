// Gráfico de Retención Mejorado
const ctx = document.getElementById('retentionChart').getContext('2d');
const retentionChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Tasa de retención (%)',
      data: [65, 68, 70, 74, 72],
      borderWidth: 3,
      fill: true,
      backgroundColor: 'rgba(90, 120, 255, 0.15)',
      borderColor: '#5a78ff',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#5a78ff',
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});

// Gráfico Clientes Nuevos vs Recurrentes
const ctxClients = document.getElementById('clientsChart').getContext('2d');
const clientsChart = new Chart(ctxClients, {
  type: 'bar',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Clientes nuevos',
        data: [120, 150, 170, 160, 180],
        backgroundColor: '#34c38f',
        borderRadius: 6
      },
      {
        label: 'Clientes recurrentes',
        data: [300, 320, 340, 330, 360],
        backgroundColor: '#ff9f43',
        borderRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
