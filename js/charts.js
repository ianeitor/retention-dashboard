const retentionCtx = document.getElementById('retentionChart').getContext('2d');
const retentionChart = new Chart(retentionCtx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Tasa de retención',
      data: [65, 68, 70, 74, 72],
      borderColor: '#5a78ff',
      backgroundColor: 'rgba(90, 120, 255, 0.2)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: '#ccc'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#ccc'
        }
      },
      x: {
        ticks: {
          color: '#ccc'
        }
      }
    }
  }
});

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
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: '#ccc'
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#ccc'
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: '#ccc'
        }
      }
    }
  }
});
