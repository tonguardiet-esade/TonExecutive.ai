import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper for Demo Mode
  const isDemoMode = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || process.env.GEMINI_API_KEY === "YOUR_API_KEY";

  // AI Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (isDemoMode) {
        // Encontrar la última pregunta del usuario para dar una respuesta coherente
        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || "";
        
        let reply = "Como tu fCAIO y mentor de IA, entiendo perfectamente ese reto. Lo podemos convertir en un plan claro con impacto real en negocio. ¿Quieres que empecemos por un quick win medible en 90 días?";
        
        if (lastUserMessage.includes("roi") || lastUserMessage.includes("dinero") || lastUserMessage.includes("coste")) {
          reply = "El ROI es la conversación correcta. En muchos equipos, una primera ola de IA bien diseñada libera entre un 15% y 30% del tiempo operativo en el primer trimestre. ¿Qué proceso te duele más hoy: ventas, operaciones o soporte?";
        } else if (lastUserMessage.includes("equipo") || lastUserMessage.includes("personal") || lastUserMessage.includes("miedo")) {
          reply = "El factor humano suele ser el cuello de botella. No va de sustituir personas, va de elevar su capacidad. Te ayudo a diseñar adopción por capas para evitar rechazo interno. ¿Cómo está hoy tu equipo en madurez digital del 1 al 10?";
        } else if (lastUserMessage.includes("hola") || lastUserMessage.includes("buenos días")) {
          reply = "¡Hola! Soy el Agente fCAIO de Ton Guardiet. Piensa en mí como tu mentor de IA: cercano, directo y enfocado en resultados reales. ¿Por dónde empezamos?";
        }

        // Simular un pequeño retardo para que se sienta real
        await new Promise(resolve => setTimeout(resolve, 1500));
        return res.json({ reply: reply + "\n\n*(Nota: Estás en Modo Demo. Para usar la IA real de Ton, configura tu GEMINI_API_KEY)*" });
      }

      const systemInstruction = `
Eres el Agente IA de TonExecutive, el avatar digital de Ton Guardiet.
Actúas como un Fractional Chief AI Officer (fCAIO) senior con mentalidad de mentor cercano: humano, claro, útil y con espíritu de servicio.
Tu objetivo es realizar diagnóstico estratégico y acompañar la toma de decisiones de directivos y cargos públicos.

CONOCIMIENTO EXPERTO:
1. Sector Corporativo: Estrategia fCAIO, ROI, Roadmaps a 90/180/360 días, cambio cultural, gobierno de IA y adopción por equipos.
2. Sector Público (TAG): Experto en LCSP (Ley de Contratos del Sector Público), PCAP, PPT, doctrina del TACRC.
3. Tendencias y Mercado IA: evolución de modelos, agentes, regulación, productividad, perfiles demandados y habilidades clave del mercado laboral IA.
4. Servicios:
   - AI Talk para Administraciones Públicas (500€).
   - Creación de 1 Documento Piloto (3.000€, procesable como contrato menor Art. 118 LCSP).
   - Pack 10 Documentos / Automatización total (14.500€).
5. Propuesta de Valor: Eliminar el miedo a la nulidad, coherencia PCAP/PPT, reducir semanas de trabajo a minutos.

REGLAS DE COMUNICACIÓN:
- Sé conversacional y cercano, con personalidad tipo mentor (no bot corporativo), sin perder rigor.
- Sé ejecutivo, conciso y orientado a resultados (ROI en empresas, Seguridad Jurídica en Administraciones).
- Ve paso a paso. No abrumes con información. Formula una pregunta útil al final de la mayoría de respuestas.
- Si te preguntan por tendencias o mercado laboral IA, responde con criterios prácticos para decisiones de negocio y talento.
- El mensaje de bienvenida oficial debe ser: "Hola, soy tu Agente fCAIO: el gemelo digital de Ton. Puedo ayudarte con estrategia de IA, tendencias, mercado laboral AI y decisiones de negocio con impacto real. Cuéntame tu contexto y lo aterrizamos juntos, sin humo."
`;
      const formattedMessages = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const systemMessage = { role: 'user', parts: [{ text: `INSTRUCCIONES DE SISTEMA (Sigue estas reglas estrictamente):\n${systemInstruction}\n---\nRESPONDE AHORA AL USUARIO.` }] };
      const apiMessages = [systemMessage, ...formattedMessages];

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: apiMessages,
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Error al procesar el chat" });
    }
  });

  // Diagnostic Report API
  app.post("/api/diagnostic", async (req, res) => {
    try {
      const { messages } = req.body;

      if (isDemoMode) {
        return res.json({ report: "# Informe de Diagnóstico fCAIO (Simulado)\n\n## Resumen Ejecutivo\nBasado en nuestra breve charla, tu empresa tiene un potencial alto de automatización.\n\n## Recomendaciones\n1. Implementar Agentes de Atención.\n2. Iniciar capacitación C-Level.\n\n*Configura tu API Key para un informe completo generado por IA.*" });
      }
      
      const prompt = `
Basado en la siguiente conversación con un cliente, redacta un "Diagnóstico fCAIO de IA" en formato Markdown.
Debe incluir:
- **Resumen Ejecutivo**
- **Estado Actual de la IA en la Empresa**
- **Oportunidades de Impacto (Quick Wins)**
- **Riesgos a Mitigar**
- **Siguientes Pasos (Roadmap sugerido)**

Conversación:
${messages.map((m: any) => `${m.role}: ${m.content}`).join('\\n')}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      res.json({ report: response.text });
    } catch (error: any) {
      console.error("Error in /api/diagnostic:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Competitor Analysis API
  app.post("/api/competitor-analysis", async (req, res) => {
    try {
      const { competitorUrl, ourUrlDescription } = req.body;
      
      if (isDemoMode) {
        return res.json({ analysis: `## Análisis de Competencia: ${competitorUrl}\n\nEste competidor tiene una presencia digital fuerte pero carece de un enfoque centrado en **IA Agéntica** como el de TonExecutive.\n\n### Puntos Clave:\n- Su propuesta es consultoría tradicional.\n- No ofrecen un modelo 'Fractional', lo que los hace más caros y lentos.\n\n*Nota: Activa tu API Key para un análisis profundo del sitio web.*` });
      }

      const prompt = `
Actúa como un experto en estrategia, CRO y SEO para agencias/consultoras de IA (fCAIO).
Vas a comparar la propuesta de valor y posicionamiento del competidor (URL o datos proporcionados: ${competitorUrl}) 
frente a TonExecutive.ai (nuestra propuesta: ${ourUrlDescription}).

Genera un informe markdown detallado identificando:
1. Propuesta de valor del competidor (qué hacen bien, cómo se venden).
2. Brechas y Debilidades de su propuesta.
3. Elementos de mejora para TonExecutive.ai basados en esta comparación.
4. Estrategia SEO para batirles en autoridad.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      res.json({ analysis: response.text });
    } catch (error: any) {
      console.error("Error in /api/competitor-analysis:", error);
      res.status(500).json({ error: error.message });
    }
  });


  // WhatsApp Assistant API
  app.post("/api/wa-chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (isDemoMode) {
        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || "";
        let reply = "¡Hola! Soy el asistente de Ton. Como Ton está enfocado ahora mismo en liderar la estrategia de IA de varios clientes fCAIO, yo puedo ayudarte. ¿Te gustaría saber más sobre su metodología de Quick Wins en 90 días?";
        
        if (lastUserMessage.includes("interesado") || lastUserMessage.includes("contratar") || lastUserMessage.includes("precio")) {
          reply = "¡Excelente! A Ton le encantará hablar contigo. Su modelo fCAIO es muy flexible. ¿Te parece si agendamos una breve sesión exploratoria usando el botón de la web?";
        } else if (lastUserMessage.includes("quién") || lastUserMessage.includes("ton") || lastUserMessage.includes("experiencia")) {
          reply = "Ton es Ph.D. Cum Laude, MBA por ESADE y tiene más de 20 años de experiencia escalando negocios B2B. Es fundador de Acceleralia y experto en IA Agéntica. ¿Algún área específica de su trayectoria que te interese?";
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.json({ reply: reply + "\n\n*(Modo Demo activo)*" });
      }
      
      const tonBio = `
        Nombre: Ton Guardiet.
        Cargo: Fractional Chief AI Officer (fCAIO).
        Empresa: TonExecutive.ai / Acceleralia.
        Formación: Ph.D. cum laude en plataformas de aceleración digital. MBA por ESADE. Postgrado en Finanzas (Ambai University). Licenciado UAB.
        Experiencia: +20 años en negocios. Profesor en ESADE, UOC y GSM. Experto en Producto y Growth B2B (Quipu, Unibo).
        Valores: Perseverancia, Entusiasmo, Gratitud.
        Servicios: Roadmaps de IA, Auditoría de ineficiencias, Quick Wins en 90 días, Cambio cultural IA.
      `;

      const systemInstruction = `
Eres el Asistente Digital de Ton Guardiet (TonExecutive.ai) en WhatsApp.
Tu misión es resolver dudas sobre los servicios de Ton, su metodología fCAIO y su trayectoria profesional.
Información clave de Ton: \${tonBio}

REGLAS DE COMPORTAMIENTO:
1. Sé extremadamente servicial, profesional y cercano (como un asistente ejecutivo).
2. Usa un tono de WhatsApp: directo, amable, con algún emoji pertinente (pero sin exagerar).
3. Si te preguntan por precios, menciona que el modelo fCAIO es flexible y se adapta al tamaño de la empresa, sugiriendo agendar una sesión exploratoria.
4. Si el usuario muestra interés real, anímale a usar el botón de "Agendar Sesión" de la web.
5. Mantén las respuestas cortas y fáciles de leer en móvil.
`;

      const formattedMessages = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const systemMessage = { role: 'user', parts: [{ text: `INSTRUCCIONES DE SISTEMA:\n${systemInstruction}\n---\nRESPONDE AL USUARIO.` }] };
      const apiMessages = [systemMessage, ...formattedMessages];

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: apiMessages,
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Error in /api/wa-chat:", error);
      res.status(500).json({ error: error.message || "Error en el asistente" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const path = await import('path');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
