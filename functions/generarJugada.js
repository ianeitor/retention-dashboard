const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { objetivo, canales, metrica, briefing } = body;

    const prompt = `
Actuá como un estratega de marketing digital experto en retención.

Tenés que generar una idea de test A/B para mejorar un objetivo de marketing usando la metodología GRIP (Goal, Ruta, Impacto, Play).

Usá los siguientes datos:

- Objetivo: ${objetivo}
- Canales seleccionados: ${canales.join(", ")}
- Métrica clave a mover: ${metrica}
- Descripción libre del usuario: "${briefing}"

Respondé en el siguiente formato claro, profesional y visual:

🎯 Objetivo:  
💡 Jugada propuesta:  
🧪 Hipótesis:  
📊 Métrica a seguir:  
⏳ Duración sugerida:  
🧬 Tipo de test:
    `;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const responseText = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ result: responseText }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Algo salió mal al generar la jugada." }),
    };
  }
};
