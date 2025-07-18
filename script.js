const appState = {
  currentStep: "welcome",
  data: {
    objetivo: null,
    canales: [],
    metrica: null,
    briefing: ""
  },
  isGenerating: false
};

function goToStep(step) {
  document.querySelectorAll(".step").forEach((el) => el.classList.add("hidden"));
  document.getElementById(step).classList.remove("hidden");
  appState.currentStep = step;
}

function nextStep() {
  const steps = ["welcome", "goal", "channels", "metrics", "briefing", "loadingScreen", "result"];
  const index = steps.indexOf(appState.currentStep);
  if (index < steps.length - 2) {
    goToStep(steps[index + 1]);
  }
}

function prevStep() {
  const steps = ["welcome", "goal", "channels", "metrics", "briefing", "loadingScreen", "result"];
  const index = steps.indexOf(appState.currentStep);
  if (index > 0) {
    goToStep(steps[index - 1]);
  }
}

// Iniciar (botón "Empezar")
document.getElementById("startBtn").addEventListener("click", () => {
  goToStep("goal");
});

// Objetivo
document.querySelectorAll(".goal-option").forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".goal-option").forEach((btn) => btn.classList.remove("selected"));
    el.classList.add("selected");
    appState.data.objetivo = el.dataset.goal;
    updateMetricOptions(el.dataset.goal);
  });
});

// Canales
document.querySelectorAll(".channel-option").forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("selected");
    const value = el.dataset.channel;
    const index = appState.data.canales.indexOf(value);
    if (index === -1) {
      appState.data.canales.push(value);
    } else {
      appState.data.canales.splice(index, 1);
    }
  });
});

// Métricas dinámicas según objetivo
function updateMetricOptions(goal) {
  const metricSelect = document.getElementById("metric");
  metricSelect.innerHTML = "";

  let options = [];
  switch (goal) {
    case "Activación":
      options = ["Tasa de primer compra", "Clicks", "Conversión"];
      break;
    case "Recompra":
      options = ["% de recompra", "Ticket medio", "Frecuencia"];
      break;
    case "Reactivación":
      options = ["Tasa de retorno", "Recencia", "Engagement"];
      break;
    case "Fidelización":
      options = ["LTV", "NPS", "Frecuencia"];
      break;
    default:
      options = ["Engagement", "Conversión"];
  }

  options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    metricSelect.appendChild(option);
  });
}

// Guardar métrica
document.getElementById("metric").addEventListener("change", (e) => {
  appState.data.metrica = e.target.value;
});

// Briefing
document.getElementById("briefing").addEventListener("input", (e) => {
  appState.data.briefing = e.target.value;
  document.getElementById("charCount").textContent = `${e.target.value.length}/280`;
});

// Botón generar jugada (con IA real)
async function generatePlay() {
  appState.isGenerating = true;
  showScreen("loadingScreen");

  const response = await fetch("/.netlify/functions/generarJugada", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appState.data)
  });

  const result = await response.json();
  document.getElementById("resultRaw").textContent = result.result || "No se pudo generar la jugada.";
  goToStep("result");

  appState.isGenerating = false;
}

function showScreen(screenId) {
  document.querySelectorAll(".step").forEach((el) => el.classList.add("hidden"));
  document.getElementById(screenId).classList.remove("hidden");
}

// Botones navegación
document.getElementById("generateBtn").addEventListener("click", generatePlay);
document.querySelectorAll(".next-btn").forEach((btn) => btn.addEventListener("click", nextStep));
document.querySelectorAll(".prev-btn").forEach((btn) => btn.addEventListener("click", prevStep));
