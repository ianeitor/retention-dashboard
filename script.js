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

// Plantillas de jugadas
const playTemplates = {
    'Activación': {
        hipotesis: 'Si optimizamos el onboarding en {canales} con mensajes personalizados, entonces aumentará la tasa de activación',
        jugada: 'Crear un flow de activación multicanal con secuencia automatizada de 7 días. Incluir tutorial interactivo, incentivos progresivos y recordatorios contextuales.',
        getType: (canales) => canales.length === 1 ? 'A/B Simple' : canales.length <= 3 ? 'Test Multicanal' : 'Test de Cohortes'
    },
    'Recompra': {
        hipotesis: 'Si enviamos triggers de recompra personalizados vía {canales} basados en comportamiento histórico, entonces aumentará la frecuencia de compra',
        jugada: 'Implementar sistema de retargeting inteligente con ventanas temporales optimizadas. Personalizar ofertas según historial de compra y preferencias.',
        getType: (canales) => canales.length === 1 ? 'A/B Simple' : canales.length <= 3 ? 'Test Multivariable' : 'Test de Cohortes'
    },
    'Reactivación': {
        hipotesis: 'Si diseñamos una secuencia de reactivación escalonada en {canales} con incentivos progresivos, entonces recuperaremos usuarios dormidos',
        jugada: 'Crear campaña de win-back con 3 oleadas: recordatorio sutil, oferta especial y última oportunidad. Segmentar por tiempo de inactividad.',
        getType: (canales) => canales.length === 1 ? 'A/B Simple' : canales.length <= 3 ? 'Test Multivariable' : 'Test de Cohortes'
    },
    'Fidelización': {
        hipotesis: 'Si implementamos un programa de fidelización gamificado en {canales} con recompensas relevantes, entonces aumentará el LTV y retención',
        jugada: 'Diseñar sistema de puntos con niveles, desafíos semanales y recompensas exclusivas. Incluir elementos sociales y logros compartibles.',
        getType: (canales) => canales.length === 1 ? 'A/B Simple' : canales.length <= 3 ? 'Test Multivariable' : 'Test de Ecosistema'
    }
};

// Utilidades
function showScreen(screenId) {
    // Ocultar todas las screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    // Mostrar la screen solicitada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
    
    // Actualizar progress indicator
    updateProgressIndicator();
}

function updateProgressIndicator() {
    const progressIndicator = document.getElementById('progressIndicator');
    const steps = document.querySelectorAll('.step');
    const connectors = document.querySelectorAll('.step-connector');
    
    // Mostrar/ocultar progress indicator
    const showProgress = !['welcome', 'result', 'loading'].includes(appState.currentStep);
    progressIndicator.style.display = showProgress ? 'block' : 'none';
    
    if (!showProgress) return;
    
    // Mapear steps a números
    const stepNumbers = {
        goal: 1,
        channels: 2,
        metrics: 3,
        briefing: 4
    };
    
    const currentStepNumber = stepNumbers[appState.currentStep] || 0;
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepCircle = step.querySelector('.step-circle');
        const stepLabel = step.querySelector('.step-label');
        
        // Limpiar clases
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStepNumber) {
            // Paso completado
            step.classList.add('completed');
            stepCircle.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.75rem; height: 0.75rem;">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
        } else if (stepNumber === currentStepNumber) {
            // Paso actual
            step.classList.add('active');
            stepCircle.innerHTML = stepNumber;
        } else {
            // Paso futuro
            stepCircle.innerHTML = stepNumber;
        }
    });
    
    // Actualizar conectores
    connectors.forEach((connector, index) => {
        const stepNumber = index + 1;
        if (stepNumber < currentStepNumber) {
            connector.classList.add('active');
        } else {
            connector.classList.remove('active');
        }
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
    
    // Actualizar icono
    const themeIcon = document.getElementById('themeIcon');
    if (appState.isDark) {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
    }
}

// Funciones de navegación
function goToStep(step) {
    appState.currentStep = step;
    showScreen(step + 'Screen');
}

function nextStep() {
    const stepOrder = ['welcome', 'goal', 'channels', 'metrics', 'briefing', 'result'];
    const currentIndex = stepOrder.indexOf(appState.currentStep);
    if (currentIndex < stepOrder.length - 1) {
        goToStep(stepOrder[currentIndex + 1]);
    }
}

function prevStep() {
    const stepOrder = ['welcome', 'goal', 'channels', 'metrics', 'briefing', 'result'];
    const currentIndex = stepOrder.indexOf(appState.currentStep);
    if (currentIndex > 0) {
        goToStep(stepOrder[currentIndex - 1]);
    }
}

// Funciones para cada paso
function initGoalStep() {
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach(card => {
        card.addEventListener('click', () => {
            const goal = card.getAttribute('data-goal');
            
            // Limpiar selección anterior
            goalCards.forEach(c => c.classList.remove('selected'));
            
            // Seleccionar nueva opción
            card.classList.add('selected');
            appState.data.objetivo = goal;
            
            // Habilitar botón continuar
            updateButtonState('goalNextBtn', true);
        });
    });
}

function initChannelsStep() {
    const channelCards = document.querySelectorAll('.channel-card');
    channelCards.forEach(card => {
        card.addEventListener('click', () => {
            const channel = card.getAttribute('data-channel');
            
            // Toggle selección
            if (appState.data.canales.includes(channel)) {
                // Quitar selección
                appState.data.canales = appState.data.canales.filter(c => c !== channel);
                card.classList.remove('selected');
            } else {
                // Agregar selección
                appState.data.canales.push(channel);
                card.classList.add('selected');
            }
            
            // Actualizar indicador de canales seleccionados
            updateChannelsIndicator();
            
            // Habilitar/deshabilitar botón continuar
            updateButtonState('channelsNextBtn', appState.data.canales.length > 0);
        });
    });
}

function updateChannelsIndicator() {
    const count = appState.data.canales.length;
    // Aquí podrías actualizar un indicador visual si lo tuvieras
    console.log(`${count} canales seleccionados`);
}

function initMetricsStep() {
    const goalContext = document.getElementById('goalContext');
    const metricsGrid = document.getElementById('metricsGrid');
    
    // Actualizar contexto
    goalContext.textContent = appState.data.objetivo;
    
    // Generar métricas basadas en el objetivo
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
            // Limpiar selección anterior
            document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('selected'));
            
            // Seleccionar nueva opción
            metricCard.classList.add('selected');
            appState.data.metrica = metric.id;
            
            // Habilitar botón continuar
            updateButtonState('metricsNextBtn', true);
        });
        
        metricsGrid.appendChild(metricCard);
    });
}

function initBriefingStep() {
    const briefingText = document.getElementById('briefingText');
    const charCount = document.getElementById('charCount');
    const exampleBtns = document.querySelectorAll('.example-btn');
    
    // Actualizar contador de caracteres
    briefingText.addEventListener('input', () => {
        const length = briefingText.value.length;
        charCount.textContent = length;
        
        // Habilitar/deshabilitar botón generar
        updateButtonState('generateBtn', length >= 10);
        
        // Actualizar estado
        appState.data.briefing = briefingText.value;
    });
    
    // Ejemplos clickeables
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const example = btn.getAttribute('data-example');
            briefingText.value = example;
            briefingText.dispatchEvent(new Event('input'));
        });
    });
}

async function generatePlay() {
    appState.isGenerating = true;
    
    // Mostrar pantalla de loading
    showScreen('loadingScreen');
    
    // Simular tiempo de generación
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generar jugada basada en los datos
    const template = playTemplates[appState.data.objetivo];
    const canalesText = appState.data.canales.join(' y ');
    const duracionBase = appState.data.canales.length <= 2 ? '14-21 días' : '21-30 días';
    
    appState.generatedPlay = {
        objetivo: appState.data.objetivo,
        hipotesis: template.hipotesis.replace('{canales}', canalesText),
        jugada: template.jugada,
        metrica: appState.data.metrica,
        duracion: duracionBase,
        tipo: template.getType(appState.data.canales)
    };
    
    // Mostrar resultado
    populateResult();
    goToStep('result');
    
    appState.isGenerating = false;
}

function populateResult() {
    const play = appState.generatedPlay;
    
    // Llenar datos principales
    document.getElementById('resultObjective').textContent = play.objetivo;
    document.getElementById('resultHypothesis').textContent = play.hipotesis;
    document.getElementById('resultPlay').textContent = play.jugada;
    document.getElementById('resultMetric').textContent = play.metrica;
    document.getElementById('resultDuration').textContent = play.duracion;
    document.getElementById('resultType').textContent = play.tipo;
    
    // Llenar resumen
    document.getElementById('summaryObjective').textContent = appState.data.objetivo;
    document.getElementById('summaryMetric').textContent = appState.data.metrica;
    document.getElementById('summaryBriefing').textContent = `"${appState.data.briefing}"`;
    
    // Llenar badges de canales
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
    
    // Limpiar formularios
    document.querySelectorAll('.goal-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.channel-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.metric-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('briefingText').value = '';
    document.getElementById('charCount').textContent = '0';
    
    // Deshabilitar botones
    updateButtonState('goalNextBtn', false);
    updateButtonState('channelsNextBtn', false);
    updateButtonState('metricsNextBtn', false);
    updateButtonState('generateBtn', false);
    
    // Volver al primer paso
    goToStep('goal');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema
    document.body.classList.add('dark');
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Welcome screen
    document.getElementById('startButton').addEventListener('click', () => {
        goToStep('goal');
    });
    
    // Navigation buttons
    document.getElementById('goalNextBtn').addEventListener('click', () => {
        goToStep('channels');
    });
    
    document.getElementById('channelsBackBtn').addEventListener('click', () => {
        goToStep('goal');
    });
    
    document.getElementById('channelsNextBtn').addEventListener('click', () => {
        initMetricsStep();
        goToStep('metrics');
    });
    
    document.getElementById('metricsBackBtn').addEventListener('click', () => {
        goToStep('channels');
    });
    
    document.getElementById('metricsNextBtn').addEventListener('click', () => {
        goToStep('briefing');
    });
    
    document.getElementById('briefingBackBtn').addEventListener('click', () => {
        goToStep('metrics');
    });
    
    document.getElementById('generateBtn').addEventListener('click', generatePlay);
    
    // Result screen
    document.getElementById('createAnotherBtn').addEventListener('click', resetWizard);
    
    document.getElementById('downloadBtn').addEventListener('click', () => {
        alert('Funcionalidad de descarga próximamente');
    });
    
    document.getElementById('shareBtn').addEventListener('click', () => {
        alert('Funcionalidad de compartir próximamente');
    });
    
    // Inicializar steps
    initGoalStep();
    initChannelsStep();
    initBriefingStep();
    
    // Mostrar pantalla inicial
    showScreen('welcomeScreen');
});