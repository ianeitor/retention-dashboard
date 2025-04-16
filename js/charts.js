// === Gráfico 1: Retención Mensual con Variación ===
const retentionCtx = document.getElementById('retentionChart').getContext('2d');
const retentionChart = new Chart(retentionCtx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Tasa de Retención (%)',
      data: [65, 68, 70, 74, 72],
      borderColor: '#1c4e80',
      backgroundColor: 'rgba(28, 78, 128, 0.2)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  },
  options: {
    plugins: {
      tooltip: { mode: 'index', intersect: false },
      legend: { labels: { color: '#333' } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#333' } },
      x: { ticks: { color: '#333' } }
    }
  }
});

// === Gráfico 2: Nuevos vs Recurrentes ===
const newVsReturningCtx = document.getElementById('newVsReturningChart').getContext('2d');
const newVsReturningChart = new Chart(newVsReturningCtx, {
  type: 'bar',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Nuevos',
        data: [120, 135, 110, 145, 130],
        backgroundColor: 'rgba(28, 160, 220, 0.6)'
      },
      {
        label: 'Recurrentes',
        data: [85, 90, 102, 97, 105],
        backgroundColor: 'rgba(28, 78, 128, 0.8)'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: { mode: 'index', intersect: false },
      legend: { labels: { color: '#333' } }
    },
    scales: {
      x: { stacked: true, ticks: { color: '#333' } },
      y: { stacked: true, beginAtZero: true, ticks: { color: '#333' } }
    }
  }
});

// === Gráfico 3: Churn Alert - Clientes Inactivos ===
const churnCtx = document.getElementById('churnChart').getContext('2d');
const churnChart = new Chart(churnCtx, {
  type: 'bar',
  data: {
    labels: ['30-60 días', '60-90 días', '+90 días'],
    datasets: [{
      label: 'Clientes inactivos',
      data: [80, 64, 104],
      backgroundColor: ['#f39c12', '#e67e22', '#e74c3c']
    }]
  },
  options: {
    plugins: {
      tooltip: { mode: 'index', intersect: false },
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#333' } },
      x: { ticks: { color: '#333' } }
    }
  }
});
