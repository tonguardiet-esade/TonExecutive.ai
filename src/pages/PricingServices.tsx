import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Star, Sparkles, Building2, Target, Zap, HelpCircle, ChevronDown, ChevronUp, Briefcase, GraduationCap, BarChart3, Calendar, Cpu } from 'lucide-react';

export function PricingServices({ t, onBookDemo, onContactClick }: { t: any, onBookDemo: () => void, onContactClick: () => void }) {
  const tp = t.pricingPage;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = (tp.faq1Q && tp.faq2Q && tp.faq3Q) ? [
    { q: tp.faq1Q, a: tp.faq1A },
    { q: tp.faq2Q, a: tp.faq2A },
    { q: tp.faq3Q, a: tp.faq3A }
  ] : [
    { q: '¿Cuál es la diferencia entre un fCAIO y una consultora tecnológica?', a: 'Actúo bajo tus mismos intereses, ayuda a contratar y evalúa proveedores.' },
    { q: '¿A qué tamaño de empresas ayudas?', a: 'Suelo colaborar con empresas B2B, SaaS y Fintech en fase de tracción.' },
    { q: '¿Garantizas la propiedad intelectual de lo que se desarrolla?', a: 'Todos los repositorios, datos, propmts corporativos quedan bajo propiedad exclusiva de tu empresa.'}
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-grid-brand opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-brand" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] dark:opacity-[0.03] pointer-events-none">
        <Cpu className="w-[500px] h-[500px] text-emerald-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 inline-block">
                {tp.title || 'Planes y Retainer Módulos'}
              </span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-2xl mx-auto">
              {tp.subtitle || 'Modelos de acompañamiento diseñados para empresas B2B y SaaS que no necesitan un directivo a tiempo completo.'}
            </p>
          </motion.div>
        </div>

        {/* Fases del Servei */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{tp.phasesTitle || 'Modalidades de Intervención'}</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">{tp.phasesSubtitle || 'Cómo nos asociamos para generar crecimiento'}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-neutral-600 dark:text-neutral-300" />,
                title: tp.phase1Title || '1. Asesoramiento',
                desc: tp.phase1Desc || 'Mentoría y consultoría estratégica para Founders y C-Levels.'
              },
              {
                icon: <Zap className="w-8 h-8 text-emerald-500" />,
                title: tp.phase2Title || '2. Auditoría Operativa',
                desc: tp.phase2Desc || 'Fase de descubrimiento para auditar flujos de trabajo.'
              },
              {
                icon: <Briefcase className="w-8 h-8 text-neutral-600 dark:text-neutral-300" />,
                title: tp.phase3Title || '3. Quick Wins',
                desc: tp.phase3Desc || 'Despliegues rápidos de agentes y flujos de automatización.'
              },
              {
                icon: <Star className="w-8 h-8 text-emerald-500" />,
                title: tp.phase4Title || '4. Fractional Leader',
                desc: tp.phase4Desc || 'Adopción del rol formal de fCAIO a largo plazo.'
              }
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-brand p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                <div className="mb-6 bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                  {phase.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">{phase.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{tp.pricingTitle || 'Planes'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Quick Session */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{tp.quickTitle || 'Diagnóstico'}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">{tp.quickLabel || 'Inicio'}</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-zinc-900 dark:text-white">{tp.quickPrice || '0€'}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[tp.quickFeature1 || 'Evaluación de madurez', tp.quickFeature2 || 'Mapeo Pain-Point', tp.quickFeature3 || 'Validación viability'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => window.open('https://calendly.com/eric-martinez-acceleralia/30min', '_blank')} className="w-full py-4 px-6 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold transition-all text-center">
                {tp.quickBtn || 'Agendar'}
              </button>
            </motion.div>

            {/* Plan 1 (Featured) */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-emerald-600 to-teal-800 text-white rounded-[2.5rem] p-8 border border-emerald-500 shadow-2xl relative flex flex-col transform md:-translate-y-8 z-10"
            >
              <div className="absolute top-0 right-0 bg-white text-emerald-900 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-[2rem] rounded-tr-[2.5rem]">
                {tp.plan1Label || 'Recomendado'}
              </div>
              <h3 className="text-2xl font-bold mb-2 pt-4">{tp.plan1Title || 'Retainer Executive'}</h3>
              <p className="text-emerald-200 text-sm mb-6">{tp.plan1Label || 'fCAIO'}</p>
              <div className="mb-8">
                <span className="text-5xl font-black">{tp.plan1Price || 'A Medida'}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[tp.plan1Feature1 || '1-2 días semana', tp.plan1Feature2 || 'Dirección de Roadmap', tp.plan1Feature3 || 'Gobernanza'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-emerald-50">{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={onContactClick} 
                className="w-full py-4 px-6 rounded-2xl bg-white text-emerald-900 font-black hover:bg-emerald-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center"
              >
                {tp.plan1Btn || 'Solicitar Reunión'}
              </button>
            </motion.div>

            {/* Plan 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col relative overflow-hidden"
            >
               <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{tp.plan2Title || 'Auditoría & Plan'}</h3>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">{tp.plan2Label || 'Proyecto Cerrado'}</p>
               <div className="mb-8">
                 <span className="text-5xl font-black text-zinc-900 dark:text-white">{tp.plan2Price || 'Desde 2.5k€'}</span>
               </div>
               <ul className="space-y-4 mb-8 flex-grow">
                 {[tp.plan2Feature1 || 'Due Diligence', tp.plan2Feature2 || 'Casos de Uso', tp.plan2Feature3 || 'Diseño de Arquitectura'].map((f, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{f}</span>
                   </li>
                 ))}
               </ul>
               <button onClick={onContactClick} className="w-full py-4 px-6 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold transition-all text-center">
                 {tp.plan2Btn || 'Iniciar Auditoría'}
               </button>
            </motion.div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{tp.faqTitle || 'Preguntas Frecuentes'}</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="glass-brand rounded-2xl overflow-hidden border-emerald-500/10"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-emerald-500/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-zinc-900 dark:text-white">{faq.q}</span>
                  </div>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-emerald-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-emerald-500/10">
                        <div className="mt-4">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
