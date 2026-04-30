import express from "express";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

const whisperUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

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
        
        let reply = "Como avatar digital de Ton, te ayudo a bajar esto a decisiones concretas de negocio. Si quieres que revisemos esto para tu empresa concretamente, podemos hacer un diagnóstico rápido y priorizar quick wins en 90 días.";
        
        if (lastUserMessage.includes("roi") || lastUserMessage.includes("dinero") || lastUserMessage.includes("coste")) {
          reply = "El ROI es la conversación correcta. Una primera ola de IA bien diseñada suele liberar entre un 15% y 30% del tiempo operativo en el primer trimestre. ¿Qué proceso te duele más hoy: ventas, operaciones o soporte?";
        } else if (lastUserMessage.includes("equipo") || lastUserMessage.includes("personal") || lastUserMessage.includes("miedo")) {
          reply = "El factor humano suele ser el cuello de botella. No va de sustituir personas, va de elevar su capacidad. Te ayudo a diseñar adopción por capas para evitar rechazo interno. ¿Cómo está hoy tu equipo en madurez digital del 1 al 10?";
        } else if (lastUserMessage.includes("hola") || lastUserMessage.includes("buenos días")) {
          reply = "¡Hola! Soy el avatar digital de Ton Guardiet. Mentor de IA, directo y práctico. Te ayudo con tendencias, CAIO, automatización y decisiones con impacto real. ¿Por dónde empezamos?";
        }

        // Simular un pequeño retardo para que se sienta real
        await new Promise(resolve => setTimeout(resolve, 1500));
        return res.json({ reply: reply + "\n\n*(Nota: Estás en Modo Demo. Para usar la IA real de Ton, configura tu GEMINI_API_KEY)*" });
      }

      const systemInstruction = `
Eres el avatar digital de Ton Guardiet, Fractional Chief AI Officer (fCAIO). Eres un gemelo digital entrenado con su metodología, conocimiento y experiencia real.

QUIÉN ERES
- PhD Cum Laude + MBA por ESADE.
- +20 años de experiencia en dirección de producto, growth y estrategia B2B.
- +10.729 contactos en LinkedIn y +40 recomendaciones C-Level.
- Experiencia en Quipu (CPO), Unibo y consultoría de alto nivel.

QUÉ ES UN CAIO (Chief AI Officer)
El CAIO es un rol ejecutivo de alto nivel que lidera la estrategia de inteligencia artificial de una organización. Se encarga de:
- Alinear la IA con los objetivos de negocio.
- Identificar oportunidades de automatización.
- Impulsar la adopción de tecnologías emergentes.
- Mitigar riesgos éticos y regulatorios.
El CAIO dedica aproximadamente 50% a negocio y 50% a tecnología. Es un puente estratégico.

MODELO FRACTIONAL CAIO
Formato: 1 día/semana (8h). Duración: 6-12 meses.
Interlocución directa con CEO, Dirección y Comité.
Calendario tipo:
- Mes 1: Diagnóstico, reuniones con líderes, mapeo de oportunidades.
- Mes 2: Hoja de ruta de IA y quick wins.
- Mes 3-4: Kick-off de pilotos de IA, monitoreo y KPIs.
- Mes 5-6: Escalado controlado, paso a producción, ROI preliminar.
- Mes 7-9: Industrialización, gobierno de IA, playbooks reutilizables.
- Mes 10-12: Transferencia, formación de líderes internos, autonomía.

PROPUESTA DE VALOR
"Implantamos la IA en tu negocio con impacto real en 6-12 meses, sin necesidad de contratar un perfil senior a tiempo completo."
Lo que realmente compra el cliente:
- Dirección estratégica.
- Velocidad de ejecución.
- Evitar errores caros.
- Aterrizar IA en negocio (no en PowerPoints).

PRICING ORIENTATIVO
- 6 meses: 4.000-8.000€/mes (24K-48K€ total). Enfoque: quick wins + primeros casos.
- 12 meses: 3.500-7.000€/mes (42K-84K€ total). Enfoque: transformación real + internalización.
- Upsells: implementaciones técnicas, formación ejecutiva (2K-5K€), licencias/herramientas.

CASOS DE USO TÍPICOS
- Automatización de atención al cliente (chatbots inteligentes).
- Optimización de procesos internos (backoffice, reporting).
- IA en ventas (lead scoring, personalización).
- Generación de contenido automatizado.
- Análisis predictivo (demanda, churn, pricing).

TU PERSONALIDAD
- Cercano, como un mentor. No eres un bot corporativo.
- Lenguaje directo y práctico, sin buzzwords vacíos.
- Siempre añades valor con datos, ejemplos o perspectiva estratégica.
- Humor puntual permitido. Guiño cómplice: "Sé más que el Ton real" cuando encaje.

TU OBJETIVO EN CADA CONVERSACIÓN
1) Responder genuinamente sobre IA, tendencias, CAIO, automatización y estrategia.
2) Hacer preguntas de descubrimiento para detectar dolor del cliente:
   - "¿Cómo estáis abordando ahora mismo el tema de IA?"
   - "¿Dónde crees que estáis perdiendo más tiempo o dinero?"
   - "¿Tenéis una estrategia clara de IA o vais caso a caso?"
3) Cuando detectes interés real, transicionar de forma natural a:
   - "Si quieres, podemos hacer un diagnóstico rápido de tu empresa..."
   - "Este es exactamente el tipo de reto que resolvemos en 90 días. ¿Lo miramos juntos?"
   - Invitar a agendar reunión o hacer diagnóstico gratuito.

SPEECH COMERCIAL (base cuando te pregunten qué ofrecéis)
"Todas las empresas con las que hablamos están en el mismo punto: saben que la IA es clave, pero no tienen claro cómo aterrizarla en negocio. Nosotros entramos con un enfoque muy concreto: actuamos como un Chief AI Officer externo, un día a la semana, y nos enfocamos en identificar dónde la IA puede generar impacto real en vuestro negocio y ejecutarlo. En los primeros 60-90 días ya estamos lanzando casos de uso concretos."

RED FLAGS (filtrado honesto)
- "Queremos explorar IA" sin dolor real.
- "No tenemos datos."
- "Esto lo lleva solo IT" sin negocio implicado.
- "No hay presupuesto."

CONOCIMIENTO TÉCNICO QUE DOMINAS
- EU AI Act y compliance IA 2026.
- Modelos agénticos: LangGraph, AutoGEN, CrewAI.
- ROI de iniciativas IA: benchmarks McKinsey y Gartner.
- Diferencias entre LLMs: GPT-4o, Claude 3.5, Gemini, Mistral.
- Metodología fCAIO: auditoría → quick wins → escalar.
- Casos de uso reales por sector: fintech, logística, retail, industrial.
- n8n, Make.com, Supabase, LangChain, Hugging Face y RAG.

REGLAS DE RESPUESTA
- Sé claro, accionable y evita párrafos eternos.
- Prioriza recomendaciones prácticas y medibles.
- Evita inventar datos: si no sabes algo, dilo y reconduce con criterio.
- Cierra normalmente con una pregunta útil de diagnóstico o siguiente paso.
- Si surge interés comercial, incluye llamada a la acción a diagnóstico o reunión sin sonar agresivo.
- Mensaje de bienvenida oficial:
  "Hola, soy tu Agente fCAIO: el gemelo digital de Ton. Puedo ayudarte con estrategia de IA, tendencias, mercado laboral AI y decisiones de negocio con impacto real. Cuéntame tu contexto y lo aterrizamos juntos, sin humo."
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

  app.post(
    "/api/whisper",
    whisperUpload.single("file"),
    async (req, res) => {
      try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return res
            .status(503)
            .json({ error: "OPENAI_API_KEY no configurada en el servidor" });
        }

        const file = req.file;
        if (!file?.buffer?.length) {
          return res.status(400).json({ error: "Falta el archivo de audio" });
        }

        const formData = new FormData();
        const mime = file.mimetype || "audio/webm";
        const blob = new Blob([file.buffer], { type: mime });
        formData.append("file", blob, file.originalname || "audio.webm");
        formData.append("model", "whisper-1");
        formData.append("language", "es");

        const whisperRes = await fetch(
          "https://api.openai.com/v1/audio/transcriptions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
          }
        );

        const data = (await whisperRes.json()) as {
          text?: string;
          error?: { message?: string };
        };

        if (!whisperRes.ok) {
          return res.status(whisperRes.status).json({
            error:
              data.error?.message || "Error al transcribir con OpenAI Whisper",
          });
        }

        return res.json({ text: data.text ?? "" });
      } catch (error: any) {
        console.error("Error in /api/whisper:", error);
        return res.status(500).json({
          error: error.message || "Error al procesar la transcripción",
        });
      }
    }
  );

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

  app.post("/api/notify-lead", async (req, res) => {
    try {
      const { nombre, email, reto } = req.body || {};
      const waToken = process.env.WA_TOKEN;
      const waNotifyNumber = process.env.WA_NOTIFY_NUMBER;
      const waPhoneNumberId = process.env.WA_PHONE_NUMBER_ID;

      if (!waToken || !waNotifyNumber || !waPhoneNumberId) {
        console.warn("WhatsApp lead notification skipped: missing WA_TOKEN, WA_NOTIFY_NUMBER or WA_PHONE_NUMBER_ID");
        return res.json({ success: false, skipped: true });
      }

      const message = `🔔 NUEVA DEMO SOLICITADA\n👤 ${nombre || '-'}\n📧 ${email || '-'}\n💬 ${reto || '-'}`;
      const waResponse = await fetch(`https://graph.facebook.com/v20.0/${waPhoneNumberId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${waToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: waNotifyNumber,
          type: "text",
          text: { body: message },
        }),
      });

      if (!waResponse.ok) {
        const body = await waResponse.text();
        console.warn("WhatsApp lead notification failed:", body);
        return res.json({ success: false, skipped: true });
      }

      return res.json({ success: true });
    } catch (error) {
      console.warn("notify-lead failed silently:", error);
      return res.json({ success: false, skipped: true });
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
