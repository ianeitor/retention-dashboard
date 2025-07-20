// Estado global de la aplicación
let appState = {
    isDark: true,
    currentStep: 'nameScreen',
    isGenerating: false,
    data: {
        name: '',
        objetivo: '',
        canales: [],
        metrica: '',
        briefing: '',
        otroCanal: '',
        tono: 'Profesional',
        esfuerzo: 'Medio',
        estacionalidad: ''
    },
    generatedPlay: null,
    history: []
};

const metricsByGoal = {
    'Activación': [
        {
            id: 'Tasa de primer compra',
            name: 'Tasa de primer compra',
            description: 'Porcentaje de usuarios que realizan su primera compra.',
            detail: 'Mide la conversión de nuevos usuarios a compradores. Esencial para validar la adquisición y el "aha moment".',
            benchmark: '2-8%'
        },
        {
            id: 'Tasa de click',
            name: 'Tasa de click (CTR)',
            description: 'Clicks en llamadas a la acción clave del onboarding.',
            detail: 'Indica el engagement inicial y si los usuarios entienden los siguientes pasos a dar.',
            benchmark: '15-25%'
        },
        {
            id: 'Tiempo en onboarding',
            name: 'Tiempo en onboarding',
            description: 'Duración promedio del proceso hasta la activación.',
            detail: 'Un tiempo más corto suele indicar un flujo más eficiente y menos fricción.',
            benchmark: '< 5 min'
        },
        {
            id: 'Conversión de registro',
            name: 'Conversión de registro',
            description: 'De visitante a usuario registrado.',
            detail: 'Mide la efectividad de la propuesta de valor inicial y el formulario de registro.',
            benchmark: '1-5%'
        }
    ],
    'Recompra': [
        {
            id: '% de recompra',
            name: '% de recompra',
            description: 'Porcentaje de clientes que compran por segunda vez.',
            detail: 'Una de las métricas más importantes para medir la retención temprana y la salud del negocio.',
            benchmark: '20-40%'
        },
        {
            id: 'Días entre compras',
            name: 'Días entre compras',
            description: 'Tiempo promedio entre transacciones de un mismo cliente.',
            detail: 'Ayuda a entender el ciclo de vida del cliente y a optimizar el timing de las comunicaciones.',
            benchmark: '30-90 días'
        },
        {
            id: 'Valor promedio de recompra',
            name: 'Valor promedio de recompra',
            description: 'AOV de la segunda compra en adelante.',
            detail: 'Indica si los clientes recurrentes gastan más, un signo de confianza y satisfacción.',
            benchmark: '+20% vs 1ra'
        },
        {
            id: 'Frecuencia de compra',
            name: 'Frecuencia de compra',
            description: 'Número de transacciones por cliente en un período.',
            detail: 'Aumentar la frecuencia es clave para maximizar el Customer Lifetime Value (LTV).',
            benchmark: '2-5x/año'
        }
    ],
    'Reactivación': [
        {
            id: '% de retorno',
            name: '% de retorno',
            description: 'Usuarios inactivos que vuelven a realizar una acción de valor.',
            detail: 'Mide directamente la efectividad de tus campañas de win-back para recuperar clientes.',
            benchmark: '5-15%'
        },
        {
            id: 'Tasa de apertura a inactivos',
            name: 'Tasa de apertura a inactivos',
            description: 'Open rate en campañas de reactivación.',
            detail: 'El primer paso para recuperar a un cliente es lograr que al menos vea tu mensaje.',
            benchmark: '10-20%'
        },
        {
            id: 'Tasa de click en reactivación',
            name: 'Tasa de click en reactivación',
            description: 'CTR específico de campañas win-back.',
            detail: 'Indica si la oferta o el mensaje de reactivación es lo suficientemente atractivo para actuar.',
            benchmark: '2-8%'
        },
        {
            id: 'Tiempo de reactivación',
            name: 'Tiempo de reactivación',
            description: 'Días desde la campaña hasta la recompra.',
            detail: 'Mide la velocidad con la que puedes "despertar" a los usuarios dormidos.',
            benchmark: '7-30 días'
        }
    ],
    'Fidelización': [
        {
            id: 'Uso de beneficios',
            name: 'Uso de beneficios',
            description: 'Activación de recompensas, puntos o descuentos exclusivos.',
            detail: 'Mide el engagement real con tu programa de lealtad, más allá de la simple inscripción.',
            benchmark: '40-70%'
        },
        {
            id: 'LTV (Customer Lifetime Value)',
            name: 'Customer Lifetime Value',
            description: 'El valor total que un cliente aporta durante toda su relación contigo.',
            detail: 'La métrica reina de la retención. Mide el impacto a largo plazo de tus estrategias.',
            benchmark: '3-5x CAC'
        },
        {
            id: 'NPS (Net Promoter Score)',
            name: 'Net Promoter Score',
            description: 'Mide la probabilidad de que tus clientes te recomienden.',
            detail: 'Un indicador clave de la lealtad y la satisfacción general. Los promotores son tus mejores clientes.',
            benchmark: '> 50'
        },
        {
            id: 'Tasa de retención mensual',
            name: 'Tasa de retención mensual',
            description: 'Porcentaje de usuarios que siguen activos mes a mes.',
            detail: 'Fundamental para modelos de suscripción o productos de uso frecuente. Se analiza por cohortes.',
            benchmark: '80%+ M1'
        }
    ]
};

function downloadPlayAsPDF() {
    const { jsPDF } = window.jspdf;
    const content = document.getElementById('jugada-pdf');
    const objective = appState.generatedPlay.objetivo;
    const today = new Date().toLocaleDateString('es-ES');

    html2canvas(content, { 
        backgroundColor: appState.isDark ? "#1E1E1E" : "#FFFFFF",
        scale: 2
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // Header
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(24);
        pdf.setTextColor(appState.isDark ? 250 : 14);
        pdf.text("Ficha de Estrategia GRIP", pdfWidth / 2, 20, { align: "center" });
        pdf.setFontSize(12);
        pdf.setTextColor(150);
        pdf.text(`Campaña para ${appState.data.name} - Generado el ${today}`, pdfWidth / 2, 28, { align: "center" });

        // Add the generated play as an image
        pdf.addImage(imgData, 'PNG', 15, 40, pdfWidth - 30, pdfHeight);

        // Footer
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text("Generado con GRIP Express por Ukelele Growth Marketing", pdfWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: "center" });

        pdf.save(`GRIP_Ficha_${objective}_${appState.data.name}.pdf`);
    });
}


function updateHistory() {
    if (appState.generatedPlay) {
        // Use a deep copy to avoid reference issues
        const playToSave = JSON.parse(JSON.stringify(appState.generatedPlay));
        appState.history.unshift(playToSave);
        if (appState.history.length > 3) {
            appState.history.pop();
        }
    }
}

function populateHistory() {
    const historyCard = document.getElementById('historyCard');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    if (appState.history.length > 0) {
        historyCard.style.display = 'block';
        appState.history.forEach((play, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `<strong>${play.objetivo}</strong>${play.hipotesis.substring(0, 80)}...`;
            item.onclick = () => {
                appState.generatedPlay = play;
                populateResult();
                // Scroll to top to see the result
                window.scrollTo(0, 0);
            };
            historyList.appendChild(item);
        });
    } else {
        historyCard.style.display = 'none';
    }
}

const loadingTexts = [
    "Analizando tu objetivo...",
    "Consultando modelos de IA...",
    "Buscando la mejor hipótesis...",
    "Cruzando información de canales...",
    "Diseñando la jugada perfecta...",
    "Dándole el toque final..."
];
let loadingInterval;

function startLoadingAnimation() {
    let i = 0;
    const loadingTextElement = document.getElementById('loadingText');
    loadingTextElement.textContent = loadingTexts[0];
    loadingInterval = setInterval(() => {
        i++;
        loadingTextElement.textContent = loadingTexts[i % loadingTexts.length];
    }, 1500);
}

function stopLoadingAnimation() {
    clearInterval(loadingInterval);
    document.getElementById('loadingText').textContent = "Generando jugada...";
}

const briefingQuestions = [
    {
        question: "¿Cuál es el segmento principal de tu audiencia?",
        key: "audiencia",
        options: ["Nuevos usuarios", "Compradores recurrentes", "Usuarios inactivos", "Clientes VIP"]
    },
    {
        question: "¿Qué incentivo principal planeas usar?",
        key: "incentivo",
        options: ["Descuento %", "Envío gratis", "Puntos de lealtad", "Acceso anticipado", "Sin incentivo"]
    },
    {
        question: "¿Hay alguna limitación de tiempo?",
        key: "timing",
        options: ["Oferta de fin de semana", "Campaña de 15 días", "Evento estacional", "Sin límite de tiempo"]
    }
];

function openBriefingBuilder() {
    const modal = document.getElementById('briefingBuilderModal');
    const content = document.getElementById('briefingBuilderContent');
    content.innerHTML = `<h2>Asistente de Briefing</h2><p>Respondé estas preguntas para crear un brief detallado en segundos, ${appState.data.name}.</p>`;
    
    briefingQuestions.forEach((q, index) => {
        const step = document.createElement('div');
        step.className = 'builder-step';
        step.innerHTML = `<h4>${index + 1}. ${q.question}</h4>`;
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'builder-options';
        q.options.forEach(opt => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'builder-option';
            optionBtn.textContent = opt;
            optionBtn.onclick = () => {
                optionsDiv.querySelectorAll('.builder-option').forEach(btn => btn.classList.remove('selected'));
                optionBtn.classList.add('selected');
            };
            optionsDiv.appendChild(optionBtn);
        });
        step.appendChild(optionsDiv);
        content.appendChild(step);
    });

    const generateBtn = document.createElement('button');
    generateBtn.className = 'btn-primary';
    generateBtn.style.marginTop = '1rem';
    generateBtn.textContent = 'Generar Briefing';
    generateBtn.onclick = generateBriefingFromBuilder;
    content.appendChild(generateBtn);

    modal.style.display = 'block';
}

function closeBriefingBuilder() {
    document.getElementById('briefingBuilderModal').style.display = 'none';
}

function generateBriefingFromBuilder() {
    let briefing = `El objetivo es ${appState.data.objetivo}. `;
    const steps = document.querySelectorAll('.builder-step');
    steps.forEach((step, index) => {
        const selectedOption = step.querySelector('.builder-option.selected');
        if (selectedOption) {
            briefing += `Para la pregunta '${briefingQuestions[index].question}', la respuesta es '${selectedOption.textContent}'. `;
        }
    });

    const briefingText = document.getElementById('briefingText');
    briefingText.value = briefing.trim();
    briefingText.dispatchEvent(new Event('input'));
    closeBriefingBuilder();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
    appState.currentStep = screenId;
    updateProgressIndicator();
    
    const footer = document.querySelector('.footer');
    if (['welcomeScreen', 'resultScreen'].includes(screenId)) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
}

function updateProgressIndicator() {
    const progressIndicator = document.getElementById('progressIndicator');
    const steps = document.querySelectorAll('.step');
    const connectors = document.querySelectorAll('.step-connector');

    const showProgress = !['nameScreen', 'welcomeScreen', 'resultScreen', 'loadingScreen'].includes(appState.currentStep);
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
            stepCircle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.75rem; height: 0.75rem;"><polyline points="20,6 9,17 4,12"></polyline></svg>`;
        } else if (stepNumber === currentStepNumber) {
            step.classList.add('active');
            stepCircle.innerHTML = stepNumber;
        } else {
            stepCircle.innerHTML = stepNumber;
        }
    });
    connectors.forEach((connector, index) => {
        connector.classList.toggle('active', index + 1 < currentStepNumber);
    });
}

function updateButtonState(buttonId, isEnabled) {
    const button = document.getElementById(buttonId);
    if (button) button.disabled = !isEnabled;
}

function toggleTheme() {
    appState.isDark = !appState.isDark;
    document.body.classList.toggle('dark', appState.isDark);
    document.getElementById('themeIcon').innerHTML = appState.isDark 
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
        : '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
}

function goToStep(stepId) {
    showScreen(stepId);
}

function initNameStep() {
    const nameInput = document.getElementById('nameInput');
    const nextBtn = document.getElementById('nameNextBtn');
    nameInput.addEventListener('input', () => {
        updateButtonState('nameNextBtn', nameInput.value.trim().length > 0);
    });
    nextBtn.addEventListener('click', () => {
        appState.data.name = nameInput.value.trim();
        personalizeTexts();
        goToStep('welcomeScreen');
    });
}

function personalizeTexts() {
    const name = appState.data.name;
    document.getElementById('welcomeTitle').innerHTML = `Hola ${name}, decime qué querés <span class="gradient-text">mover</span>`;
    document.getElementById('goalTitle').innerHTML = `${name}, ¿qué querés lograr?`;
    document.getElementById('channelsTitle').innerHTML = `Ok, ${name}. ¿Por dónde querés jugar <br><span class="gradient-text">esta jugada?</span>`;
    document.getElementById('metricsTitle').innerHTML = `Perfecto, ${name}. ¿Qué métrica querés <span class="gradient-text">mover?</span>`;
    document.getElementById('briefingTitle').innerHTML = `Último paso, ${name}. Contame lo que querés <span class="gradient-text">lograr</span>`;
    document.getElementById('resultTitle').innerHTML = `¡${name}, tu <span class="gradient-text">estrategia</span> está lista!`;
}

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
    const otherChannelInput = document.getElementById('otherChannelInput');
    document.querySelectorAll('.channel-card').forEach(card => {
        card.addEventListener('click', () => {
            const channel = card.getAttribute('data-channel');
            card.classList.toggle('selected');
            if (appState.data.canales.includes(channel)) {
                appState.data.canales = appState.data.canales.filter(c => c !== channel);
            } else {
                appState.data.canales.push(channel);
            }
            if (channel === 'Otro') {
                otherChannelInput.style.display = card.classList.contains('selected') ? 'block' : 'none';
                if(card.classList.contains('selected')) otherChannelInput.focus();
            }
            updateButtonState('channelsNextBtn', appState.data.canales.length > 0);
        });
    });
    otherChannelInput.addEventListener('input', () => {
        appState.data.otroCanal = otherChannelInput.value;
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
        metricCard.setAttribute('title', metric.detail);
        metricCard.innerHTML = `
            <div class="selection-checkmark">✓</div>
            <div class="metric-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5M3 21v-5h5M21 3v5h-5M21 21v-5h-5"></path></svg></div>
            <div class="metric-content">
                <h3>${metric.name}</h3><p>${metric.description}</p>
                <div class="metric-benchmark">
                    <span>Benchmark <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>
                    <span title="Los benchmarks son promedios de la industria y pueden variar.">${metric.benchmark}</span>
                </div>
            </div>`;
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
    
    document.querySelectorAll('.btn-tone[data-effort]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-tone[data-effort]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.data.esfuerzo = btn.getAttribute('data-effort');
        });
    });

    document.getElementById('seasonalityInput').addEventListener('input', (e) => {
        appState.data.estacionalidad = e.target.value;
    });
}

async function generatePlay() {
    if (appState.isGenerating) return;
    appState.isGenerating = true;
    goToStep('loadingScreen');
    startLoadingAnimation();
    try {
        const response = await fetch("/.netlify/functions/generarJugada", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appState.data)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor (${response.status}): ${errorText}`);
        }
        const data = await response.json();
        if (data.error) throw new Error(`Error de la IA: ${data.error}`);
        
        appState.generatedPlay = parseAIResponse(data.result);
        
        // Call updateHistory *before* populating the result to save the pristine AI response
        updateHistory();
        
        populateResult();
        populateHistory();
        goToStep('resultScreen');

    } catch (error) {
        console.error("Error detallado en generatePlay:", error);
        alert(`Ocurrió un error: ${error.message}`);
        goToStep('briefingScreen');
    } finally {
        appState.isGenerating = false;
        stopLoadingAnimation();
    }
}

function parseAIResponse(responseText) {
    const play = {};
    const patterns = {
        hipotesis: /^(\*\*| *)Hipótesis:(\*\*| *)/i,
        jugada: /^(\*\*| *)Jugada Propuesta:(\*\*| *)/i,
        justificacion: /^(\*\*| *)Justificación Estratégica:(\*\*| *)/i,
        proximosPasos: /^(\*\*| *)Próximos Pasos:(\*\*| *)/i,
        duracion: /^(\*\*| *)Duración Sugerida:(\*\*| *)/i,
        tipo: /^(\*\*| *)Tipo de Test:(\*\*| *)/i
    };

    const lines = responseText.split('\n');
    let currentKey = null;
    
    lines.forEach(line => {
        let matched = false;
        for (const [key, pattern] of Object.entries(patterns)) {
            if (pattern.test(line)) {
                play[key] = line.replace(pattern, '').trim();
                currentKey = key;
                matched = true;
                break;
            }
        }
        if (!matched && currentKey && line.trim()) {
            play[currentKey] += '\n' + line.trim();
        }
    });

    return {
        objetivo: appState.data.objetivo,
        hipotesis: play.hipotesis || "No se pudo generar una hipótesis.",
        jugada: play.jugada || "No se pudo generar una jugada.",
        justificacion: play.justificacion || "La IA no proveyó una justificación.",
        proximosPasos: play.proximosPasos || "- Definir segmentos\n- Crear variantes\n- Configurar tracking",
        metrica: appState.data.metrica,
        duracion: play.duracion || "14-21 días",
        tipo: play.tipo || "A/B Simple"
    };
}

function populateResult() {
    const play = appState.generatedPlay;
    if (!play) return;
    document.getElementById('resultObjective').textContent = play.objetivo;
    document.getElementById('resultHypothesis').innerHTML = play.hipotesis.replace(/\n/g, '<br>');
    document.getElementById('resultPlay').innerHTML = play.jugada.replace(/\n/g, '<br>');
    document.getElementById('resultJustification').innerHTML = play.justificacion.replace(/\n/g, '<br>');
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
        badge.textContent = (canal === 'Otro' && appState.data.otroCanal) ? appState.data.otroCanal : canal;
        channelsBadges.appendChild(badge);
    });

    const nextStepsList = document.getElementById('nextStepsList');
    nextStepsList.innerHTML = '';
    play.proximosPasos.split('\n').forEach(stepText => {
        if(stepText.trim()){
            const step = document.createElement('div');
            step.className = 'next-step';
            step.innerHTML = `<div class="step-bullet"></div><span>${stepText.replace(/^- /, '')}</span>`;
            nextStepsList.appendChild(step);
        }
    });

    const celebrationBadge = document.getElementById('celebrationBadge');
    const celebrationText = document.getElementById('celebrationText');
    celebrationBadge.classList.add('celebrate');
    celebrationText.textContent = `¡Ya estás haciendo growth retention, ${appState.data.name}!`;
    setTimeout(() => {
        celebrationBadge.classList.remove('celebrate');
    }, 2500);
}

function resetWizard() {
    appState.data.objetivo = '';
    appState.data.canales = [];
    appState.data.metrica = '';
    appState.data.briefing = '';
    appState.data.otroCanal = '';
    appState.generatedPlay = null;
    
    document.querySelectorAll('.goal-card, .channel-card, .metric-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('briefingText').value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('otherChannelInput').style.display = 'none';
    
    updateButtonState('goalNextBtn', false);
    updateButtonState('channelsNextBtn', false);
    updateButtonState('metricsNextBtn', false);
    updateButtonState('generateBtn', false);
    
    goToStep('goalScreen');
}

function setupEnterKeyNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'TEXTAREA' || activeElement.id === 'otherChannelInput') {
                return; // Don't navigate if user is typing in a textarea
            }
            e.preventDefault();
            switch(appState.currentStep) {
                case 'nameScreen':
                    if(!document.getElementById('nameNextBtn').disabled) document.getElementById('nameNextBtn').click();
                    break;
                case 'goalScreen':
                    if(!document.getElementById('goalNextBtn').disabled) document.getElementById('goalNextBtn').click();
                    break;
                case 'channelsScreen':
                    if(!document.getElementById('channelsNextBtn').disabled) document.getElementById('channelsNextBtn').click();
                    break;
                case 'metricsScreen':
                    if(!document.getElementById('metricsNextBtn').disabled) document.getElementById('metricsNextBtn').click();
                    break;
                case 'briefingScreen':
                     if(!document.getElementById('generateBtn').disabled) document.getElementById('generateBtn').click();
                    break;
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark');
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    initNameStep();

    document.getElementById('startButton').addEventListener('click', () => goToStep('goalScreen'));
    document.getElementById('goalNextBtn').addEventListener('click', () => goToStep('channelsScreen'));
    document.getElementById('channelsBackBtn').addEventListener('click', () => goToStep('goalScreen'));
    document.getElementById('channelsNextBtn').addEventListener('click', () => { initMetricsStep(); goToStep('metricsScreen'); });
    document.getElementById('metricsBackBtn').addEventListener('click', () => goToStep('channelsScreen'));
    document.getElementById('metricsNextBtn').addEventListener('click', () => goToStep('briefingScreen'));
    document.getElementById('briefingBackBtn').addEventListener('click', () => goToStep('metricsScreen'));
    document.getElementById('generateBtn').addEventListener('click', generatePlay);
    document.getElementById('createAnotherBtn').addEventListener('click', resetWizard);
    document.getElementById('downloadBtn').addEventListener('click', downloadPlayAsPDF);
    document.getElementById('shareBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btnText = document.getElementById('shareBtnText');
            const originalText = btnText.textContent;
            btnText.textContent = '¡Enlace copiado!';
            setTimeout(() => {
                btnText.textContent = originalText;
            }, 2000);
        });
    });

    document.querySelectorAll('#progressSteps .step').forEach(stepEl => {
        stepEl.addEventListener('click', () => {
            const stepNumber = parseInt(stepEl.getAttribute('data-step'));
            const stepMap = ['goalScreen', 'channelsScreen', 'metricsScreen', 'briefingScreen'];
            if (stepEl.classList.contains('completed')) {
                // If on metrics screen, re-init it as it depends on goal
                if(stepMap[stepNumber - 1] === 'metricsScreen') initMetricsStep();
                goToStep(stepMap[stepNumber - 1]);
            }
        });
    });

    document.querySelectorAll('.btn-tone[data-tone]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-tone[data-tone]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.data.tono = btn.getAttribute('data-tone');
        });
    });

    document.getElementById('openBriefingBuilderBtn').addEventListener('click', (e) => {
        e.preventDefault();
        openBriefingBuilder();
    });
    document.getElementById('closeBriefingBuilderBtn').addEventListener('click', closeBriefingBuilder);
    
    initGoalStep();
    initChannelsStep();
    initBriefingStep();
    setupEnterKeyNavigation();
    
    goToStep('welcomeScreen');
});
