
const ctx = document.getElementById('retentionChart').getContext('2d');
const retentionChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Tasa de retención',
      data: [65, 68, 70, 74, 72],
      borderWidth: 2,
      fill: false,
      borderColor: '#5a78ff',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});
