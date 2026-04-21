import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testAI() {
  console.log("Testing AI with model gemini-2.5-flash...");
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hola, responde con un breve saludo.' }] }],
    });
    console.log("Success! Response:", response.text);
  } catch (error) {
    console.error("AI Test Failed:", error);
  }
}

testAI();
