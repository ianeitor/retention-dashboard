// Estado global de la aplicación
let appState = {
    isDark: true,
    currentStep: 'welcome',
    isGenerating: false,
    data: {
        objetivo: '',
        canales: [],
        metrica: '',
        briefing: ''
    },
    generatedPlay: null
};

// Métricas por objetivo
const metricsByGoal = {
    'Activación': [
        {
            id: 'Tasa de primer compra',
            name: 'Tasa de primer compra',
            description: 'Porcentaje de usuarios que realizan su primera compra',
            detail: 'Conversión de nuevos usuarios a compradores',
            benchmark: '2-8%'
        },
        {
            id: 'Tasa de click',
            name: 'Tasa de click (CTR)',
            description: 'Clicks en llamadas a acción del onboarding',
            detail: 'Engagement con contenido de activación',
            benchmark: '15-25%'
        },
        {
            id: 'Tiempo en onboarding',
            name: 'Tiempo en onboarding',
            description: 'Duración promedio del proceso de activación',
            detail: 'Optimización del flujo de incorporación',
            benchmark: '< 5 min'
        },
        {
            id: 'Conversión de registro',
            name: 'Conversión de registro',
            description: 'De visitante a usuario registrado',
            detail: 'Efectividad del signup flow',
            benchmark: '1-5%'
        }
    ],
    'Recompra': [
        {
            id: '% de recompra',
            name: '% de recompra',
            description: 'Porcentaje de clientes que compran nuevamente',
            detail: 'Ratio de repeat customers',
            benchmark: '20-40%'
        },
        {
            id: 'Días entre compras',
            name: 'Días entre compras',
            description: 'Tiempo promedio entre transacciones',
            detail: 'Frecuencia de compra optimizada',
            benchmark: '30-90 días'
        },
        {
            id: 'Valor promedio de recompra',
            name: 'Valor promedio de recompra',
            description: 'AOV de la segunda compra en adelante',
            detail: 'Monetización de clientes existentes',
            benchmark: '+20% vs 1ra'
        },
        {
            id: 'Frecuencia de compra',
            name: 'Frecuencia de compra',
            description: 'Número de transacciones por período',
            detail: 'Incremento en purchase frequency',
            benchmark: '2-5x/año'
        }
    ],
    'Reactivación': [
        {
            id: '% de retorno',
            name: '% de retorno',
            description: 'Usuarios inactivos que vuelven a comprar',
            detail: 'Efectividad del win-back',
            benchmark: '5-15%'
        },
        {
            id: 'Apertura a inactivos',
            name: 'Apertura a inactivos',
            description: 'Open rate en campañas de reactivación',
            detail: 'Engagement con dormidos',
            benchmark: '10-20%'
        },
        {
            id: 'Click rate en reactivación',
            name: 'Click rate en reactivación',
            description: 'CTR específico de campañas win-back',
            detail: 'Interés generado en inactivos',
            benchmark: '2-8%'
        },
        {
            id: 'Tiempo de reactivación',
            name: 'Tiempo de reactivación',
            description: 'Días desde campaña hasta recompra',
            detail: 'Velocidad de reconversión',
            benchmark: '7-30 días'
        }
    ],
    'Fidelización': [
        {
            id: 'Uso de beneficios',
            name: 'Uso de beneficios',
            description: 'Activación de rewards y descuentos',
            detail: 'Engagement con programa de loyalty',
            benchmark: '40-70%'
        },
        {
            id: 'LTV',
            name: 'Customer Lifetime Value',
            description: 'Valor total del cliente a largo plazo',
            detail: 'ROI de retención vs adquisición',
            benchmark: '3-5x CAC'
        },
        {
            id: 'NPS',
            name: 'Net Promoter Score',
            description: 'Satisfacción y recomendación del cliente',
            detail: 'Lealtad y advocacy medibles',
            benchmark: '> 50'
        },
        {
            id: 'Retención mensual',
            name: 'Retención mensual',
            description: 'Usuarios activos mes a mes',
            detail: 'Cohort retention rate',
            benchmark: '80%+ M1'
        }
    ]
};

// Utilidades
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
    
    updateProgressIndicator();
}

function updateProgressIndicator() {
    const progressIndicator = document.getElementById('progressIndicator');
    const steps = document.querySelectorAll('.step');
    const connectors = document.querySelectorAll('.step-connector');
    
    const showProgress = !['welcome', 'resultScreen', 'loadingScreen'].includes(appState.currentStep);
    progressIndicator.style.display = showProgress ? 'block' : 'none';
    
    if (!showProgress) return;
    
    const stepNumbers = {
        goalScreen: 1,
        channelsScreen: 2,
        metricsScreen: 3,
        briefingScreen: 4
    };
    
    const currentStepNumber = stepNumbers[appState.currentStep] || 0;
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepCircle = step.querySelector('.step-circle');
        
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStepNumber) {
            step.classList.add('completed');
            stepCircle.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.75rem; height: 0.75rem;">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
        } else if (stepNumber === currentStepNumber) {
            step.classList.add('active');
            stepCircle.innerHTML = stepNumber;
        } else {
            stepCircle.innerHTML = stepNumber;
        }
    });
    
    connectors.forEach((connector, index) => {
        const stepNumber = index + 1;
        connector.classList.toggle('active', stepNumber < currentStepNumber);
    });
}

function updateButtonState(buttonId, isEnabled) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = !isEnabled;
    }
}

function toggleTheme() {
    appState.isDark = !appState.isDark;
    document.body.classList.toggle('dark', appState.isDark);
    
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.innerHTML = appState.isDark 
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
        : '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
}

// Funciones de navegación
function goToStep(stepId) {
    appState.currentStep = stepId;
    showScreen(stepId);
}

// Funciones para cada paso
function initGoalStep() {
    document.querySelectorAll('.goal-card').forEach(card => {
        card.addEventListener('click', () => {
            const goal = card.getAttribute('data-goal');
            document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            appState.data.objetivo = goal;
            updateButtonState('goalNextBtn', true);
        });
    });
}

function initChannelsStep() {
    document.querySelectorAll('.channel-card').forEach(card => {
        card.addEventListener('click', () => {
            const channel = card.getAttribute('data-channel');
            card.classList.toggle('selected');
            if (appState.data.canales.includes(channel)) {
                appState.data.canales = appState.data.canales.filter(c => c !== channel);
            } else {
                appState.data.canales.push(channel);
            }
            updateButtonState('channelsNextBtn', appState.data.canales.length > 0);
        });
    });
}

function initMetricsStep() {
    const goalContext = document.getElementById('goalContext');
    const metricsGrid = document.getElementById('metricsGrid');
    
    goalContext.textContent = appState.data.objetivo;
    const metrics = metricsByGoal[appState.data.objetivo] || [];
    
    metricsGrid.innerHTML = '';
    metrics.forEach(metric => {
        const metricCard = document.createElement('div');
        metricCard.className = 'metric-card';
        metricCard.setAttribute('data-metric', metric.id);
        metricCard.innerHTML = `
            <div class="metric-header">
                <div class="metric-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 3v5h5M3 21v-5h5M21 3v5h-5M21 21v-5h-5"></path>
                    </svg>
                </div>
                <div class="metric-selection"></div>
            </div>
            <div class="metric-content">
                <h3>${metric.name}</h3>
                <p>${metric.description}</p>
                <div class="metric-detail">${metric.detail}</div>
                <div class="metric-benchmark">
                    <span>Benchmark:</span>
                    <span>${metric.benchmark}</span>
                </div>
            </div>
        `;
        metricCard.addEventListener('click', () => {
            document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('selected'));
            metricCard.classList.add('selected');
            appState.data.metrica = metric.id;
            updateButtonState('metricsNextBtn', true);
        });
        metricsGrid.appendChild(metricCard);
    });
}

function initBriefingStep() {
    const briefingText = document.getElementById('briefingText');
    const charCount = document.getElementById('charCount');
    
    briefingText.addEventListener('input', () => {
        const length = briefingText.value.length;
        charCount.textContent = length;
        updateButtonState('generateBtn', length >= 10);
        appState.data.briefing = briefingText.value;
    });
    
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const example = btn.getAttribute('data-example');
            briefingText.value = example;
            briefingText.dispatchEvent(new Event('input'));
        });
    });
}

async function generatePlay() {
    if (appState.isGenerating) return;

    appState.isGenerating = true;
    goToStep('loadingScreen');
    
    try {
        const response = await fetch("/.netlify/functions/generarJugada", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appState.data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en el servidor');
        }

        const data = await response.json();
        appState.generatedPlay = parseAIResponse(data.result);
        
        populateResult();
        goToStep('resultScreen');

    } catch (error) {
        console.error("Error al generar jugada con IA:", error);
        alert(`Error: ${error.message}`);
        goToStep('briefingScreen'); 
    } finally {
        appState.isGenerating = false;
    }
}

function parseAIResponse(responseText) {
    const lines = responseText.split('\n');
    const play = {};

    lines.forEach(line => {
        if (line.startsWith('**Hipótesis:**')) {
            play.hipotesis = line.replace('**Hipótesis:**', '').trim();
        } else if (line.startsWith('**Jugada Propuesta:**')) {
            play.jugada = line.replace('**Jugada Propuesta:**', '').trim();
        } else if (line.startsWith('**Duración Sugerida:**')) {
            play.duracion = line.replace('**Duración Sugerida:**', '').trim();
        } else if (line.startsWith('**Tipo de Test:**')) {
            play.tipo = line.replace('**Tipo de Test:**', '').trim();
        }
    });
    
    return {
        objetivo: appState.data.objetivo,
        hipotesis: play.hipotesis || "No se pudo generar una hipótesis.",
        jugada: play.jugada || "No se pudo generar una jugada.",
        metrica: appState.data.metrica,
        duracion: play.duracion || "14 días",
        tipo: play.tipo || "A/B Simple"
    };
}

function populateResult() {
    const play = appState.generatedPlay;
    if (!play) return;

    document.getElementById('resultObjective').textContent = play.objetivo;
    document.getElementById('resultHypothesis').textContent = play.hipotesis;
    document.getElementById('resultPlay').textContent = play.jugada;
    document.getElementById('resultMetric').textContent = play.metrica;
    document.getElementById('resultDuration').textContent = play.duracion;
    document.getElementById('resultType').textContent = play.tipo;
    
    document.getElementById('summaryObjective').textContent = appState.data.objetivo;
    document.getElementById('summaryMetric').textContent = appState.data.metrica;
    document.getElementById('summaryBriefing').textContent = `"${appState.data.briefing}"`;
    
    const channelsBadges = document.getElementById('summaryChannels');
    channelsBadges.innerHTML = '';
    appState.data.canales.forEach(canal => {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = canal;
        channelsBadges.appendChild(badge);
    });
}

function resetWizard() {
    appState.data = {
        objetivo: '',
        canales: [],
        metrica: '',
        briefing: ''
    };
    appState.generatedPlay = null;
    
    document.querySelectorAll('.goal-card, .channel-card, .metric-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('briefingText').value = '';
    document.getElementById('charCount').textContent = '0';
    
    updateButtonState('goalNextBtn', false);
    updateButtonState('channelsNextBtn', false);
    updateButtonState('metricsNextBtn', false);
    updateButtonState('generateBtn', false);
    
    goToStep('goalScreen');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark');
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('startButton').addEventListener('click', () => goToStep('goalScreen'));
    
    // Botones de navegación
    document.getElementById('goalNextBtn').addEventListener('click', () => goToStep('channelsScreen'));
    document.getElementById('channelsBackBtn').addEventListener('click', () => goToStep('goalScreen'));
    document.getElementById('channelsNextBtn').addEventListener('click', () => {
        initMetricsStep();
        goToStep('metricsScreen');
    });
    document.getElementById('metricsBackBtn').addEventListener('click', () => goToStep('channelsScreen'));
    document.getElementById('metricsNextBtn').addEventListener('click', () => goToStep('briefingScreen'));
    document.getElementById('briefingBackBtn').addEventListener('click', () => goToStep('metricsScreen'));
    document.getElementById('generateBtn').addEventListener('click', generatePlay);
    
    // Botones de la pantalla de resultado
    document.getElementById('createAnotherBtn').addEventListener('click', resetWizard);
    document.getElementById('downloadBtn').addEventListener('click', () => alert('Funcionalidad de descarga próximamente'));
    document.getElementById('shareBtn').addEventListener('click', () => alert('Funcionalidad de compartir próximamente'));
    
    // Inicializar los pasos
    initGoalStep();
    initChannelsStep();
    initBriefingStep();
    
    goToStep('welcomeScreen');
});
