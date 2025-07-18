const appState = {
  currentStep: 0,
  data: {
    objetivo: "",
    canales: [],
    metrica: "",
    briefing: ""
  },
  generatedPlay: {
    ia: ""
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("hidden", i !== index);
    });
    appState.currentStep = index;
  }

  nextButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index === steps.length - 2) {
        // Último paso antes de resultado
        fetchGenerarJugada();
        showStep(index + 1);
      } else {
        showStep(index + 1);
      }
    });
  });

  prevButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      showStep(appState.currentStep - 1);
    });
  });

  document.querySelectorAll(".goal-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      appState.data.objetivo = btn.dataset.goal;
      document.querySelectorAll(".goal-option").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      updateMetricOptions(btn.dataset.goal);
    });
  });

  document.querySelectorAll(".channel-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.channel;
      const index = appState.data.canales.indexOf(value);
      if (index === -1) {
        appState.data.canales.push(value);
        btn.classList.add("selected");
      } else {
        appState.data.canales.splice(index, 1);
        btn.classList.remove("selected");
      }
    });
  });

  function updateMetricOptions(goal) {
    const metricSelect = document.getElementById("metric");
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

    metricSelect.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
    appState.data.metrica = options[0];
  }

  document.getElementById("metric")?.addEventListener("change", (e) => {
    appState.data.metrica = e.target.value;
  });

  document.getElementById("briefing")?.addEventListener("input", (e) => {
    const text = e.target.value;
    appState.data.briefing = text;
    document.getElementById("charCount").textContent = `${text.length}/280`;
  });
});

// ✅ Función que llama a tu Netlify Function con OpenAI
async function fetchGenerarJugada() {
  try {
    const response = await fetch("/.netlify/functions/generarJugada", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appState.data)
    });

    const result = await response.json();
    appState.generatedPlay.ia = result.result || "No se pudo generar la jugada.";

    const resultEl = document.getElementById("resultRaw");
    if (resultEl) resultEl.textContent = appState.generatedPlay.ia;

  } catch (error) {
    console.error("Error al generar jugada con IA:", error);
    appState.generatedPlay.ia = "Error al generar jugada con IA.";
  }
}
