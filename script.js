let appState = {
  isDark: true,
  step: "welcome",
  objetivo: null,
  canales: [],
  metrica: null,
  briefing: "",
  generated: null,
};

function goToStep(stepId) {
  document.querySelectorAll(".step").forEach((el) => el.classList.add("hidden"));
  document.getElementById(`step-${stepId}`).classList.remove("hidden");
  appState.step = stepId;
  window.scrollTo(0, 0);
}

document.getElementById("startBtn").addEventListener("click", () => {
  goToStep("goal");
});

document.querySelectorAll(".goal-option").forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".goal-option").forEach((e) => e.classList.remove("selected"));
    el.classList.add("selected");
    appState.objetivo = el.getAttribute("data-goal");
  });
});

document.getElementById("btn-goal").addEventListener("click", () => {
  if (!appState.objetivo) {
    alert("Seleccioná un objetivo para continuar.");
    return;
  }
  goToStep("channel");
});

document.querySelectorAll(".channel-option").forEach((el) => {
  el.addEventListener("click", () => {
    const canal = el.getAttribute("data-channel");
    if (appState.canales.includes(canal)) {
      appState.canales = appState.canales.filter((c) => c !== canal);
      el.classList.remove("selected");
    } else {
      appState.canales.push(canal);
      el.classList.add("selected");
    }
  });
});

document.getElementById("btn-channel").addEventListener("click", () => {
  if (appState.canales.length === 0) {
    alert("Seleccioná al menos un canal.");
    return;
  }
  goToStep("metric");
  updateMetrics();
});

function updateMetrics() {
  const metricas = {
    Activación: ["Tasa de primer compra", "Clicks", "Conversión"],
    Recompra: ["% de recompra", "Ticket medio", "Frecuencia"],
    Reactivación: ["Tasa de retorno", "Recencia", "Engagement"],
    Fidelización: ["LTV", "NPS", "Frecuencia"],
  };
  const opciones = metricas[appState.objetivo] || [];
  const select = document.getElementById("select-metric");
  select.innerHTML = "";
  opciones.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    select.appendChild(opt);
  });
  appState.metrica = opciones[0] || null;
}

document.getElementById("select-metric").addEventListener("change", (e) => {
  appState.metrica = e.target.value;
});

document.getElementById("btn-metric").addEventListener("click", () => {
  if (!appState.metrica) {
    alert("Seleccioná una métrica para continuar.");
    return;
  }
  goToStep("briefing");
});

document.getElementById("input-briefing").addEventListener("input", (e) => {
  appState.briefing = e.target.value;
  document.getElementById("char-count").textContent = `${appState.briefing.length}/280`;
});

document.getElementById("btn-briefing").addEventListener("click", () => {
  goToStep("result");
  generatePlay();
});

document.getElementById("btn-reset").addEventListener("click", () => {
  location.reload();
});

// ✅ Generar jugada con IA
async function generatePlay() {
  document.getElementById("resultRaw").textContent = "Generando jugada...";
  try {
    const response = await fetch("/.netlify/functions/generarJugada", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        objetivo: appState.objetivo,
        canales: appState.canales,
        metrica: appState.metrica,
        briefing: appState.briefing
      })
    });

    const result = await response.json();
    appState.generated = result.result || "No se pudo generar la jugada.";
    document.getElementById("resultRaw").textContent = appState.generated;

  } catch (error) {
    console.error("Error al generar jugada con IA:", error);
    appState.generated = "Ocurrió un error al generar la jugada.";
    document.getElementById("resultRaw").textContent = appState.generated;
  }
}
