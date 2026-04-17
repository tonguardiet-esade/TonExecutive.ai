import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Euro, Zap, ArrowRight, Info, ShieldCheck, X, Loader2, CheckCircle2, AlertCircle as AlertIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EfficiencyCalculator: React.FC<{ t: any }> = ({ t }) => {
  const tc = t.home.calculator;
  const [expedientes, setExpedientes] = useState(20);
  const [tiempoManual, setTiempoManual] = useState(40);
  const [externaliza, setExternaliza] = useState(false);
  
  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'rate-limit'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Lógica de cálculo
  const horasAhorradas = Math.round((tiempoManual * 0.85) * expedientes);
  const diasLiberados = Math.round(horasAhorradas / 8);
  const ahorroEconomico = externaliza ? expedientes * 2500 : 0;

  const handleOpenModal = () => {
    setShowModal(true);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage(tc.modal.error);
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const payload = {
        email,
        expedientes_anuales: expedientes,
        horas_por_pliego: tiempoManual,
        horas_ahorradas: horasAhorradas,
        dias_liberados: diasLiberados,
        externaliza_consultoria: externaliza
      };

      // Ejecución de Edge Function
      // La función se encarga de la inserción en la tabla y el envío del email
      const secretKey = import.meta.env.VITE_FUNCTION_SECRET_KEY;

      const { data, error: invokeError } = await supabase.functions.invoke('Informe-personalizado-TonExecutive', {
        body: payload,
        headers: {
          'x-custom-auth': secretKey
        }
      });

      if (invokeError) {
        if (invokeError.status === 429) {
          setStatus('rate-limit');
          setIsLoading(false);
          return;
        }
        throw invokeError;
      }

      if (data && data.success === false) {
        throw new Error(data.message || tc.modal.error);
      }

      setStatus('success');
      setTimeout(() => {
        setShowModal(false);
        setEmail('');
      }, 3000);

    } catch (err: any) {
      console.error('Error processing report:', err);
      setStatus('error');
      setErrorMessage(err.message || tc.modal.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Componente para animación de conteo
  const CountUp = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
      let start = displayValue;
      const end = value;
      if (start === end) return;

      const duration = 500; // ms
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (outQuad)
        const easeProgress = progress * (2 - progress);
        
        const current = Math.floor(start + (end - start) * easeProgress);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
        }
      };

      requestAnimationFrame(animate);
    }, [value]);

    return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-950">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            {tc.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            {tc.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Panel Izquierdo: Controles */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl"
          >
            <div className="space-y-10">
              {/* Slider 1: Expedientes */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-white font-bold flex items-center gap-2">
                    {tc.expedientesLabel}
                    <Info className="w-4 h-4 text-zinc-500" />
                  </label>
                  <span className="text-cyan-400 font-mono text-xl font-bold bg-cyan-400/10 px-4 py-1 rounded-lg border border-cyan-400/20">
                    {expedientes}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="200" 
                  value={expedientes} 
                  onChange={(e) => setExpedientes(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-zinc-500 font-medium">
                  <span>1</span>
                  <span>100</span>
                  <span>200</span>
                </div>
              </div>

              {/* Slider 2: Tiempo Manual */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-white font-bold flex items-center gap-2">
                    {tc.tiempoLabel}
                    <Info className="w-4 h-4 text-zinc-500" />
                  </label>
                  <span className="text-cyan-400 font-mono text-xl font-bold bg-cyan-400/10 px-4 py-1 rounded-lg border border-cyan-400/20">
                    {tiempoManual}h
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  value={tiempoManual} 
                  onChange={(e) => setTiempoManual(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-zinc-500 font-medium">
                  <span>10h</span>
                  <span>45h</span>
                  <span>80h</span>
                </div>
                <p className="text-xs text-zinc-500 italic">
                  {tc.tiempoDesc}
                </p>
              </div>

              {/* Toggle: Externalización */}
              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-cyan-400/30 transition-colors">
                <div className="space-y-1">
                  <span className="text-white font-bold block">{tc.externalizaLabel}</span>
                  <span className="text-xs text-zinc-500">{tc.externalizaDesc}</span>
                </div>
                <button 
                  onClick={() => setExternaliza(!externaliza)}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${externaliza ? 'bg-cyan-500' : 'bg-zinc-700'}`}
                >
                  <motion.div 
                    animate={{ x: externaliza ? 26 : 4 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Panel Derecho: Resultados */}
          <div className="grid gap-6">
            {/* Card 1: Horas Ahorradas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Clock className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-zinc-400 font-medium mb-1">{tc.horasRecuperadasTitle}</h4>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    <CountUp value={horasAhorradas} suffix="h" />
                  </div>
                  <p className="text-sm text-cyan-400/80 mt-2 font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {tc.horasRecuperadasDesc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Días Laborales */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative p-8 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Calendar className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-zinc-400 font-medium mb-1">{tc.diasLiberadosTitle}</h4>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    <CountUp value={diasLiberados} suffix={` ${tc.diasLiberadosTitle.split(' ').pop()}`} />
                  </div>
                  <p className="text-sm text-emerald-400/80 mt-2 font-medium">
                    {tc.diasLiberadosDesc.replace('{meses}', Math.round(diasLiberados / 22).toString())}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Ahorro Económico (Solo si externaliza) */}
            <AnimatePresence>
              {externaliza && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 20 }}
                  className="group relative p-8 rounded-[2.5rem] bg-blue-600/10 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Euro className="w-7 h-7 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-blue-300 font-medium mb-1">{tc.ahorroConsultoriaTitle}</h4>
                      <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        <CountUp value={ahorroEconomico} suffix="€" />
                      </div>
                      <p className="text-sm text-blue-300/80 mt-2 font-medium flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> {tc.ahorroConsultoriaDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenModal}
              className="mt-4 w-full py-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xl shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 group transition-all"
            >
              {tc.cta}
              <ArrowRight className="w-6 h-6 group-hover:tranzinc-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Modal: Informe Personalizado */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isLoading && setShowModal(false)}
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-3 text-zinc-400 hover:text-white transition-all z-50 rounded-full hover:bg-white/10"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-8">
                    <Zap className="w-8 h-8 text-cyan-400" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                    {tc.modal.title}
                  </h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    {tc.modal.desc}
                  </p>

                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <p className="text-emerald-400 font-bold text-lg">
                        {tc.modal.successTitle}
                      </p>
                      <p className="text-emerald-400/70 text-sm mt-1">
                        {tc.modal.successDesc}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-300 ml-1">{tc.modal.emailLabel}</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={tc.modal.emailPlaceholder}
                          disabled={isLoading}
                          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-zinc-600 disabled:opacity-50"
                        />
                      </div>

                      {status === 'rate-limit' && (
                        <div className="flex items-center gap-2 text-amber-400 text-sm font-medium bg-amber-400/10 p-4 rounded-xl border border-amber-400/20">
                          <AlertIcon className="w-4 h-4 shrink-0" />
                          {tc.modal.rateLimit}
                        </div>
                      )}

                      {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm font-medium bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                          <AlertIcon className="w-4 h-4 shrink-0" />
                          {errorMessage}
                        </div>
                      )}

                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 rounded-2xl bg-white text-zinc-950 font-black text-lg shadow-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            {tc.modal.btnLoading}
                          </>
                        ) : (
                          <>
                            {tc.modal.btn}
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm max-w-2xl mx-auto italic">
            {tc.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EfficiencyCalculator;
