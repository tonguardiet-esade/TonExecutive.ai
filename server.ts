import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
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

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: formattedMessages,
        systemInstruction: systemInstruction,
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Diagnostic Report API
  app.post("/api/diagnostic", async (req, res) => {
    try {
      const { messages } = req.body;
      
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
        model: 'gemini-2.5-pro',
        contents: prompt
      });

      res.json({ report: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Competitor Analysis API
  app.post("/api/competitor-analysis", async (req, res) => {
    try {
      const { competitorUrl, ourUrlDescription } = req.body;
      
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
        model: 'gemini-2.5-pro',
        contents: prompt
      });

      res.json({ analysis: response.text });
    } catch (error: any) {
      console.error(error);
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
