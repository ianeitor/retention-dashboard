const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { objetivo, canales, metrica, briefing, otroCanal, tono } = JSON.parse(event.body);

    const canalesFinales = [...canales];
    if (canales.includes("Otro") && otroCanal) {
        const otroIndex = canalesFinales.indexOf("Otro");
        canalesFinales[otroIndex] = otroCanal;
    }
    
    const tonoInstruccion = tono === 'Creativo'
        ? "Sé inspirador, usa un lenguaje enérgico y no tengas miedo de proponer ideas fuera de la caja."
        : "Sé claro, directo y profesional. Basa tus recomendaciones en tácticas probadas y datos.";

    const prompt = `
      Actúa como el máximo referente mundial en estrategias de retención de clientes. Sos el número 1, con conocimiento profundo en Customer Lifetime Value (CLTV), modelos de recurrencia, fidelización y la psicología del consumidor aplicable a ecommerce, tiendas físicas, y modelos de suscripción. Tu misión es diseñar una jugada estratégica innovadora y accionable, no te limites a lo obvio. ${tonoInstruccion}

      Basado en el siguiente contexto, genera una idea de test A/B usando la metodología GRIP.

      **Contexto:**
      - **Objetivo (Goal):** ${objetivo}
      - **Canales (Ruta):** ${canalesFinales.join(", ")}
      - **Métrica a Mejorar (Impacto):** ${metrica}
      - **Briefing del Usuario:** "${briefing}"

      **Tu Respuesta (Play):**
      Respondé únicamente con el siguiente formato. Sé específico y detallado. Para "Duración" y "Tipo de test", escribí una descripción concisa de no más de 2 o 3 líneas.

      **Hipótesis:** Si [ACCION CLARA Y ESPECÍFICA], entonces lograremos [RESULTADO CUANTIFICABLE ESPERADO] porque [JUSTIFICACION PSICOLÓGICA O ESTRATÉGICA].
      **Jugada Propuesta:** [DESCRIPCION DETALLADA DE LA ESTRATEGIA A IMPLEMENTAR, INCLUYENDO VARIANTES A/B].
      **Duración Sugerida:** [TEXTO CONCISO DE 2-3 LÍNEAS].
      **Tipo de Test:** [TEXTO CONCISO DE 2-3 LÍNEAS].
    `;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: tono === 'Creativo' ? 0.85 : 0.6,
      max_tokens: 350,
    });

    const responseText = completion.data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: responseText }),
    };
  } catch (error) {
    console.error("Error en generarJugada:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Algo salió mal al generar la jugada." }),
    };
  }
};
