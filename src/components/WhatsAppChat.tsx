import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, ChevronDown, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export async function notifyNewLead(nombre: string, email: string, reto: string) {
  try {
    const res = await fetch('/api/notify-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, reto }),
    });

    if (!res.ok) {
      console.warn('No se pudo notificar el lead por WhatsApp.');
    }
  } catch (error) {
    console.warn('Notificación WhatsApp omitida:', error);
  }
}

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: '¡Hola! 👋 Soy el asistente digital de Ton. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/wa-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: 'error-' + Date.now(),
        role: 'agent',
        content: 'Lo siento, no he podido conectar con el asistente. Por favor, inténtalo de nuevo en unos momentos o usa el formulario de contacto.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-emerald-500/20"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-emerald-700 flex items-center justify-center">
                  <img src="/ton-guardiet.png" alt="Ton Guardiet" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Ton Guardiet</h4>
                  <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    En línea (Asistente IA)
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#E5DDD5] dark:bg-[#111b21] relative"
              style={{ 
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundBlendMode: 'overlay',
                backgroundSize: '400px'
              }}
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 text-[10px] py-1 px-3 rounded-lg mx-auto w-fit text-center mb-4 uppercase tracking-tighter font-bold shadow-sm backdrop-blur-sm">
                Las respuestas son generadas por IA
              </div>
              
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-xl relative shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#dcf8c6] dark:bg-[#005c4b] text-zinc-900 dark:text-white rounded-tr-none' 
                      : 'bg-white dark:bg-[#202c33] text-zinc-900 dark:text-white rounded-tl-none'
                  }`}>
                    <p className="text-[13px] leading-relaxed">{m.content}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] opacity-60">{m.timestamp}</span>
                      {m.role === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#202c33] px-4 py-2 rounded-xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe un mensaje"
                className="flex-1 bg-white dark:bg-[#2a3942] border-none rounded-full px-4 py-2.5 text-sm outline-none shadow-sm text-zinc-900 dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-[#075E54] hover:bg-[#128C7E] active:scale-95 text-white p-3 rounded-full shadow-lg transition-all disabled:opacity-50"
                aria-label="Enviar"
              >
                <Send className="w-5 h-5 fill-current" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group"
        aria-label="Toggle WhatsApp chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <MessageCircle className="w-8 h-8 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
           <span className="absolute right-full mr-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-500/20">
             ¿Hablamos?
           </span>
        )}
      </motion.button>
    </div>
  );
}
