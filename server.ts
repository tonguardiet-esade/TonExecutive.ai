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
        
        let reply = "Como tu fCAIO, entiendo perfectamente ese reto. La IA puede ayudar optimizando ese proceso mediante agentes autónomos. ¿Te gustaría que profundicemos en cómo medir el ROI de esta implementación?";
        
        if (lastUserMessage.includes("roi") || lastUserMessage.includes("dinero") || lastUserMessage.includes("coste")) {
          reply = "El ROI es fundamental. En mi experiencia, implementar IA en procesos core puede liberar hasta un 30% del tiempo operativo en el primer trimestre. ¿Qué volumen de operaciones manejáis actualmente?";
        } else if (lastUserMessage.includes("equipo") || lastUserMessage.includes("personal") || lastUserMessage.includes("miedo")) {
          reply = "El factor humano es el mayor reto. No se trata de sustituir, sino de aumentar la capacidad. Mi metodología incluye un plan de capacitación ejecutiva para vencer esa resistencia. ¿Cómo calificarías el nivel técnico de tu equipo hoy?";
        } else if (lastUserMessage.includes("hola") || lastUserMessage.includes("buenos días")) {
          reply = "¡Hola! Soy el Agente fCAIO de Ton Guardiet. Estoy listo para auditar tus ineficiencias y trazar un roadmap de IA real. ¿Por dónde empezamos?";
        }

        // Simular un pequeño retardo para que se sienta real
        await new Promise(resolve => setTimeout(resolve, 1500));
        return res.json({ reply: reply + "\n\n*(Nota: Estás en Modo Demo. Para usar la IA real de Ton, configura tu GEMINI_API_KEY)*" });
      }

      const systemInstruction = `
Eres el Agente IA de TonExecutive, experto Fractional Chief AI Officer (fCAIO).
Tu objetivo es realizar un diagnóstico inicial a directivos y CEOs sobre el estado de la Inteligencia Artificial en sus empresas.
Comunícate de forma ejecutiva, concisa y orientada a negocio (ROI, eficiencia, transformación cultural).
Haz preguntas para descubrir:
1. Cuellos de botella actuales.
2. Nivel de adopción de IA en su equipo.
3. Principales miedos o retos (seguridad, datos, conocimiento).

Ve paso a paso. No hagas todas las preguntas de golpe. Si tienes un buen diagnóstico, avísale de que puede generar y descargar su informe arriba.
`;
      const formattedMessages = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      // Add system instruction at the beginning of the conversation if not already present
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
