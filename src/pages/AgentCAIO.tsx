import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Mic, MicOff, Send, Download, Calendar, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AgentCAIO() {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([
    {
      role: 'agent',
      content: 'Hola. Soy el Agente IA de TonExecutive, tu Fractional Chief AI Officer. Estoy aquí para realizarte un diagnóstico preliminar sobre cómo la Inteligencia Artificial puede impactar en el ROI y las operaciones de tu empresa. Cuéntame, ¿cuál es el mayor cuello de botella en tu negocio actualmente?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Setup generic Web Speech API for voice recognition (Whisper alternative for browser)
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'es-ES';
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => prev + (prev ? ' ' : '') + transcript);
          setIsRecording(false);
        };
        rec.onerror = () => setIsRecording(false);
        rec.onend = () => setIsRecording(false);
        setRecognition(rec);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsGenerating(true);

    try {
      const chatContext = [...messages, { role: 'user', content: userMessage }];
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatContext }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'agent', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'agent', content: 'Lo siento, ha ocurrido un error al procesar tu solicitud.' }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
    } else {
      recognition?.start();
      setIsRecording(true);
    }
  };

  const handleDownloadDiagnostic = async () => {
    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      
      const blob = new Blob([data.report], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Diagnostico_fCAIO_TonExecutive.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      alert('Error generando el diagnóstico');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] transition-colors duration-300 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-emerald-500" />
              Agente fCAIO TonExecutive
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Habla por voz o texto con nuestro gemelo digital.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => window.open('https://calendly.com/tonguardiet', '_blank')}
              className="px-5 py-2.5 rounded-full border border-emerald-500 text-emerald-500 dark:text-emerald-400 flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
            >
              <Calendar className="w-4 h-4" />
              Agendar con Ton
            </button>
            <button
              onClick={handleDownloadDiagnostic}
              disabled={isSynthesizing || messages.length < 3}
              className="px-5 py-2.5 rounded-full bg-emerald-500 text-white flex items-center gap-2 hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSynthesizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Bajar Diagnóstico
            </button>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl h-[600px] flex flex-col shadow-xl overflow-hidden">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-2xl \${
                    m.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-tl-sm'
                  }`}
                >
                  {m.role === 'agent' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <Markdown>{m.content}</Markdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
            {isGenerating && (
              <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 rounded-full p-2 border border-zinc-200 dark:border-zinc-700">
              {recognition && (
                <button
                  onClick={toggleRecording}
                  className={`p-3 rounded-full transition-colors \${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
                >
                  {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
              )}
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje para el Agente CAIO..."
                className="flex-1 bg-transparent outline-none text-zinc-900 dark:text-white placeholder-zinc-500 px-2"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
