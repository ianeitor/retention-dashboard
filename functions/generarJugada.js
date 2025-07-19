const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { objetivo, canales, metrica, briefing, otroCanal, tono, esfuerzo, estacionalidad, name } = JSON.parse(event.body);

    const canalesFinales = [...canales];
    if (canales.includes("Otro") && otroCanal) {
        const otroIndex = canalesFinales.indexOf("Otro");
        canalesFinales[otroIndex] = otroCanal;
    }
    
    const tonoInstruccion = tono === 'Creativo'
        ? "Sé inspirador, usá un lenguaje enérgico y no tengas miedo de proponer ideas fuera de la caja. Sorprendé a nuestro usuario."
        : "Sé claro, directo y profesional. Basa tus recomendaciones en tácticas probadas, datos y lógica estratégica. El usuario confía en tu expertise.";

    const prompt = `
      Actúa como el máximo referente mundial en estrategias de retención de clientes para un cliente llamado ${name}. Sos el número 1, con conocimiento profundo en Customer Lifetime Value (CLTV), modelos de recurrencia, fidelización y la psicología del consumidor aplicable a ecommerce, tiendas físicas, y modelos de suscripción. Tu misión es diseñar una jugada estratégica innovadora, accionable y personalizada. No te limites a lo obvio. ${tonoInstruccion}

      Basado en el siguiente contexto, genera una idea de test A/B usando la metodología GRIP.

      **Contexto del Negocio:**
      - **Nombre del Estratega:** ${name}
      - **Objetivo (Goal):** ${objetivo}
      - **Canales a Utilizar (Ruta):** ${canalesFinales.join(", ")}
      - **Métrica Principal a Mejorar (Impacto):** ${metrica}
      - **Nivel de Esfuerzo disponible para implementar:** ${esfuerzo}
      - **Contexto de Estacionalidad (si aplica):** ${estacionalidad || "No especificado"}
      - **Briefing del Usuario (su idea inicial):** "${briefing}"

      **Tu Respuesta (Play):**
      Debes responder ÚNICAMENTE con el siguiente formato, siendo específico y detallado. No incluyas ninguna introducción o conclusión fuera de este formato.

      **Hipótesis:** Si [ACCION CLARA Y ESPECÍFICA], entonces lograremos [RESULTADO CUANTIFICABLE ESPERADO EN LA MÉTRICA '${metrica}'] porque [JUSTIFICACION PSICOLÓGICA O ESTRATÉGICA CONVINCENTE].

      **Jugada Propuesta:** [DESCRIPCIÓN DETALLADA DE LA ESTRATEGIA A IMPLEMENTAR. Describe claramente la variante A (Control) y la variante B (Test). Para cada canal en '${canalesFinales.join(", ")}', detalla específicamente qué rol cumplirá en esta jugada (ej: 'En el Email, enviaremos...', 'En In-App, mostraremos un banner...'). Adapta la complejidad de la jugada al nivel de esfuerzo '${esfuerzo}'.]

      **Justificación Estratégica:** [Explica en un párrafo por qué esta jugada es la más inteligente para ${name} en este momento. Conecta el objetivo, los canales y el briefing. Demuestra tu expertise y dale confianza.]

      **Próximos Pasos:** [Crea una checklist accionable y específica de 3 a 5 puntos para que ${name} pueda empezar a implementar esta jugada. Deben ser pasos concretos, no genéricos.]

      **Duración Sugerida:** [Recomienda un período de tiempo para correr el test y explica brevemente por qué (ej: '14 días para capturar dos ciclos de compra semanales').]

      **Tipo de Test:** [Define el tipo de test (ej: 'A/B Simple', 'Test Multivariante') y justifica brevemente por qué es el adecuado para esta situación.]
    `;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: tono === 'Creativo' ? 0.85 : 0.6,
      max_tokens: 800,
    });

    const responseText = completion.data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: responseText }),
    };
  } catch (error) {
    console.error("Error en generarJugada:", error);
    // Provide a more detailed error message in the response body for debugging
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Algo salió mal al generar la jugada.", details: errorMessage }),
    };
  }
};
