const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  // Asegurarse de que solo se procesen peticiones POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const { objetivo, canales, metrica, briefing } = body;

    // --- Prompt mejorado para la IA ---
    const prompt = `
      Actúa como un estratega de marketing digital experto en retención de clientes y growth marketing.
      Tu tarea es generar una idea de test A/B para una empresa, utilizando la metodología GRIP (Goal, Ruta, Impacto, Play).

      **Contexto del Test:**
      - **Objetivo Principal (Goal):** ${objetivo}
      - **Canales a Utilizar (Ruta):** ${canales.join(", ")}
      - **Métrica Clave a Mejorar (Impacto):** ${metrica}
      - **Descripción del Usuario (Briefing):** "${briefing}"

      **Tu Respuesta (Play):**
      Basado en el contexto, genera una "jugada" clara y accionable. Responde únicamente con el siguiente formato, reemplazando el texto de ejemplo con tu propuesta. Sé creativo, específico y profesional.

      **Hipótesis:** Si [ACCION PROPUESTA], entonces lograremos [RESULTADO ESPERADO] porque [JUSTIFICACION].
      **Jugada Propuesta:** [DESCRIPCION DETALLADA DE LA ESTRATEGIA O TEST A IMPLEMENTAR].
      **Duración Sugerida:** [EJ: 14-21 días].
      **Tipo de Test:** [EJ: A/B Simple, Test Multivariable, Test de Cohortes].
    `;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // Un poco menos de temperatura para respuestas más consistentes
      max_tokens: 250,
    });

    const responseText = completion.data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: responseText }),
    };
  } catch (error) {
    console.error("Error en la función de Netlify:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lo siento, algo salió mal al generar la jugada. Por favor, intentá de nuevo." }),
    };
  }
};
