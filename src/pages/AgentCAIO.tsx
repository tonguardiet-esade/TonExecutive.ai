import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, Mic, MicOff, Send, Download, Calendar, Loader2, Volume2, Sparkles, Plus, Search, ArrowRight, X, BarChart3 } from 'lucide-react';
import Markdown from 'react-markdown';

export default function AgentCAIO() {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([
    {
      role: 'agent',
      content: 'Hola. Soy el Agente fCAIO de Ton Guardiet. Estoy aquí para realizarte un diagnóstico estratégico preliminar. ¿Cuál es el mayor reto operativo que enfrenta tu negocio hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'competitor'>('chat');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recognition, setRecognition] = useState<any>(null);

  const suggestions = [
    "¿Cómo calculo el ROI de la IA?",
    "¿Qué es un Quick Win de 90 días?",
    "Retos de seguridad en modelos RAG",
    "Metodología fCAIO vs Consultoría"
  ];

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

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;
    
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: textToSend }]);
    setIsGenerating(true);

    try {
      const chatContext = [...messages, { role: 'user', content: textToSend }];
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

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancelar cualquier voz que esté hablando
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 0.9; // Un tono un poco más grave/ejecutivo
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
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

  const handleAnalyzeCompetitor = async () => {
    if (!competitorUrl) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/competitor-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          competitorUrl, 
          ourUrlDescription: "TonExecutive.ai ofrece servicios de Fractional CAIO centrados en implementar IA con ROI real y enfoque agéntico para B2B." 
        }),
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (error) {
      console.error(error);
      setAnalysisResult("Error al analizar el competidor.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 overflow-hidden selection:bg-emerald-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-8 group">
             {/* Animated Brain Icon */}
             <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/50"
                >
                  <BrainCircuit className="w-10 h-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div>
                </motion.div>
             </div>
             <div>
                <h1 className="text-4xl font-black text-white tracking-tighter">
                  AGENT <span className="text-emerald-500">CAIO</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p className="text-zinc-500 font-medium text-sm tracking-widest uppercase">Digital Governance Twin</p>
                </div>
             </div>
          </div>

          <div className="flex items-center bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-xl">
             <button 
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 \${activeTab === 'chat' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               <Sparkles className="w-4 h-4" /> IA Diagnostic
             </button>
             <button 
                onClick={() => setActiveTab('competitor')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 \${activeTab === 'competitor' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               <Search className="w-4 h-4" /> Competitor Analyzer
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main App Container */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {activeTab === 'chat' ? (
              <div className="bg-zinc-900/30 backdrop-blur-3xl border border-zinc-800 rounded-[2.5rem] h-[650px] flex flex-col shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth scrollbar-hide">
                  {messages.map((m, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex flex-col gap-2 max-w-[85%] \${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-6 py-4 rounded-3xl shadow-xl backdrop-blur-md \${
                          m.role === 'user' 
                            ? 'bg-emerald-500 text-white rounded-tr-sm ring-1 ring-emerald-400/50' 
                            : 'bg-zinc-800 text-zinc-100 rounded-tl-sm ring-1 ring-zinc-700/50'
                        }`}>
                          {m.role === 'agent' ? (
                            <div className="prose prose-invert prose-emerald max-w-none prose-p:leading-relaxed">
                              <Markdown>{m.content}</Markdown>
                            </div>
                          ) : (
                            <p className="text-[15px] leading-relaxed font-medium">{m.content}</p>
                          )}
                        </div>
                        {m.role === 'agent' && (
                          <button 
                            onClick={() => speakText(m.content)}
                            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-emerald-400 transition-colors"
                            title="Escuchar respuesta"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isGenerating && (
                    <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="bg-zinc-800/80 backdrop-blur-md p-6 rounded-3xl rounded-tl-sm flex items-center gap-3 ring-1 ring-zinc-700/50">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions Bar */}
                <div className="px-8 pb-4 flex flex-wrap gap-2">
                   {suggestions.map((s, i) => (
                     <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className="px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-bold text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                     >
                       {s}
                     </button>
                   ))}
                </div>

                {/* Input Controls */}
                <div className="p-6 bg-zinc-900/80 backdrop-blur-3xl border-t border-zinc-800/50 shadow-2xl">
                  <div className="max-w-3xl mx-auto flex items-center gap-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-2 focus-within:border-emerald-500/50 transition-colors shadow-inner">
                    {recognition && (
                      <button
                        onClick={toggleRecording}
                        className={`p-4 rounded-xl transition-all duration-300 \${isRecording ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' : 'bg-zinc-900 text-zinc-500 hover:text-emerald-400'}`}
                      >
                        {isRecording ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
                      </button>
                    )}
                    
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Discuss strategy with your fCAIO..."
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-600 px-2 font-medium text-[15px]"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={(!input.trim() && !isRecording) || isGenerating}
                      className="p-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-30"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/30 backdrop-blur-3xl border border-zinc-800 rounded-[2.5rem] p-10 min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
                <div className="relative">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Search className="w-8 h-8 text-blue-400" />
                    Strategic Benchmarking
                  </h2>
                  <p className="text-zinc-400 mb-8 max-w-xl text-lg leading-relaxed">
                    Compara tu empresa con cualquier competidor global. El Agente CAIO analizará sus brechas digitales y encontrará ángulos para batirlos con IA.
                  </p>

                  <div className="space-y-6 max-w-2xl">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Competitor URL or Description</label>
                       <div className="flex gap-4">
                        <input
                          type="text"
                          value={competitorUrl}
                          onChange={(e) => setCompetitorUrl(e.target.value)}
                          placeholder="https://competitor.com"
                          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder-zinc-700 focus:border-blue-500/50 outline-none transition-all shadow-inner"
                        />
                        <button
                          onClick={handleAnalyzeCompetitor}
                          disabled={!competitorUrl || isAnalyzing}
                          className="px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                        >
                          {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />}
                          Analyze
                        </button>
                       </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {analysisResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 p-8 rounded-[2rem] bg-zinc-950/50 border border-zinc-800 relative group"
                      >
                         <div className="absolute top-4 right-4 text-zinc-800 text-6xl font-black select-none group-hover:scale-110 transition-transform duration-700">REPORT</div>
                         <div className="prose prose-invert prose-blue max-w-none relative z-10">
                           <Markdown>{analysisResult}</Markdown>
                         </div>
                         <button 
                            onClick={() => setAnalysisResult('')}
                            className="absolute -top-3 -right-3 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition"
                         >
                           <X className="w-4 h-4 text-white" />
                         </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tools and Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Actions Card */}
            <div className="p-8 rounded-[2rem] bg-zinc-900 shadow-2xl border border-zinc-800 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
               <h4 className="text-lg font-bold text-white mb-6">Strategic Output</h4>
               <div className="space-y-4">
                  <button
                    onClick={handleDownloadDiagnostic}
                    disabled={isSynthesizing || messages.length < 3}
                    className="w-full group/btn relative flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all shadow-inner overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-emerald-500/10 rounded-xl">
                          {isSynthesizing ? <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" /> : <Download className="w-5 h-5 text-emerald-500" />}
                       </div>
                       <div className="text-left">
                          <p className="text-sm font-bold text-zinc-100">AI Report</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">PDF / Markdown</p>
                       </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-700 group-hover/btn:text-emerald-500 group-hover/btn:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => window.open('https://calendly.com/tonguardiet', '_blank')}
                    className="w-full group/btn relative flex items-center justify-between p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                  >
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white/20 rounded-xl">
                          <Calendar className="w-5 h-5" />
                       </div>
                       <div className="text-left">
                          <p className="text-sm font-bold">Book Strategy</p>
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">1:1 With Ton</p>
                       </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-1 transition-all" />
                  </button>
               </div>
            </div>

            {/* Quick Stats / Info */}
            <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 shadow-inner">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500 rounded-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest">Why Diagnostic?</h4>
               </div>
               <ul className="space-y-4">
                  {[
                    "Benchmarking de ineficiencias",
                    "Mapa de calor de automatización",
                    "Cálculo de ROI estimado",
                    "Roadmap crítico de 90 días"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                       <Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                       <span className="text-zinc-400 text-sm">{item}</span>
                    </li>
                  ))}
               </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
