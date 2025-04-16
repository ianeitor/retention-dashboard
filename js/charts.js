// === Gráfico 1: Retención Mensual con Variación ===
const retentionCtx = document.getElementById('retentionChart').getContext('2d');
const retentionChart = new Chart(retentionCtx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Tasa de Retención (%)',
      data: [65, 68, 70, 74, 72],
      borderColor: '#5a78ff',
      backgroundColor: 'rgba(90, 120, 255, 0.2)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#fff',
      pointHoverRadius: 7
    }]
  },
  options: {
    plugins: {
      tooltip: { mode: 'index', intersect: false },
      legend: { labels: { color: '#ccc' } }
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { color: '#ccc' } },
      x: { ticks: { color: '#ccc' } }
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
        backgroundColor: 'rgba(90, 200, 255, 0.6)'
      },
      {
        label: 'Recurrentes',
        data: [85, 90, 102, 97, 105],
        backgroundColor: 'rgba(90, 120, 255, 0.8)'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: { mode: 'index', intersect: false },
      legend: { labels: { color: '#ccc' } }
    },
    scales: {
      x: { stacked: true, ticks: { color: '#ccc' } },
      y: { stacked: true, beginAtZero: true, ticks: { color: '#ccc' } }
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
      y: {
        beginAtZero: true,
        ticks: { color: '#ccc' }
      },
      x: {
        ticks: { color: '#ccc' }
      }
    }
  }
});

// === Mini evento para tabla de cohortes
document.addEventListener('DOMContentLoaded', () => {
  const cohortTable = document.getElementById('cohortTable');
  if (cohortTable) {
    cohortTable.addEventListener('click', () => {
      alert('Más análisis de cohortes disponible en versión extendida 🔍');
    });
  }
});
