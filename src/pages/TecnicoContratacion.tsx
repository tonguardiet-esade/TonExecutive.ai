import { 
  Shield, 
  AlertTriangle, 
  FileCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  FileText,
  History,
  AlertCircle,
  Scale,
  Gavel,
  BookOpen,
  Fingerprint,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export function TecnicoContratacion({ t, onBookDemo }: { t: any, onBookDemo: () => void }) {
  const ts = t.solutions;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20"
    >
      {/* 1. Encabezado de Impacto (Hero Detallado) */}
      <section className="bg-[#059669] text-white py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/50 via-emerald-800 to-[#059669]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {ts.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {ts.heroDesc}
          </p>
          <button 
            onClick={onBookDemo}
            className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-500/20 inline-flex items-center gap-3 hover:-tranzinc-y-1"
          >
            {ts.footerBtn}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. Bloque de "Puntos de Dolor" (Grid de Tarjetas) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Tarjeta A */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border-t-4 border-red-500 hover:-tranzinc-y-1 transition-transform">
            <AlertTriangle className="text-red-500 w-12 h-12 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{ts.painPoints[0].title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {ts.painPoints[0].desc}
            </p>
          </div>

          {/* Tarjeta B */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border-t-4 border-orange-500 hover:-tranzinc-y-1 transition-transform">
            <FileCheck className="text-orange-500 w-12 h-12 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{ts.painPoints[1].title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {ts.painPoints[1].desc}
            </p>
          </div>

          {/* Tarjeta C */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border-t-4 border-amber-500 hover:-tranzinc-y-1 transition-transform">
            <Zap className="text-amber-500 w-12 h-12 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{ts.painPoints[2].title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {ts.painPoints[2].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Matriz de Soluciones (Sección Comparativa) */}
      <section className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 mb-4">
              {ts.essentialTitle}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {ts.essentialDesc}
            </p>
          </div>

          <div className="space-y-6">
            {/* Solución 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-7 h-7 text-[#059669] dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{ts.essentialItems[0].title}</h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {ts.essentialItems[0].desc}
                </p>
              </div>
            </div>

            {/* Solución 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-700 transition-colors">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-[#10B981] dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{ts.essentialItems[1].title}</h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {ts.essentialItems[1].desc}
                </p>
              </div>
            </div>

            {/* Solución 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-7 h-7 text-[#059669] dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{ts.essentialItems[2].title}</h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {ts.essentialItems[2].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IA Explicable: Legal Workbench */}
      <section className="py-24 bg-zinc-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-brand opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {ts.legalExplainable.title}
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              {ts.legalExplainable.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {ts.legalExplainable.cards.map((card: any, i: number) => (
              <div key={i} className="bg-zinc-800/50 border border-zinc-700 p-8 rounded-3xl hover:border-emerald-500/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {i === 0 && <BookOpen className="w-6 h-6 text-emerald-400" />}
                  {i === 1 && <Scale className="w-6 h-6 text-emerald-400" />}
                  {i === 2 && <Fingerprint className="w-6 h-6 text-emerald-400" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Audit View: Legal Workbench */}
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-[4rem] opacity-50"></div>
            <div className="relative bg-[#0f172a] border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Toolbar */}
              <div className="bg-zinc-800/50 px-8 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-4">
                    Legal Workbench v4.0.2
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                    {ts.legalExplainable.auditView.status}
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
                {/* Left: Technical Clause */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <FileText className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                      {ts.legalExplainable.auditView.clauseTitle}
                    </h4>
                  </div>
                  <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 font-serif italic text-lg text-zinc-300 leading-relaxed relative">
                    <span className="absolute -left-2 top-4 text-4xl text-zinc-700 opacity-50">"</span>
                    {ts.legalExplainable.auditView.clauseText}
                    <span className="absolute -right-2 bottom-4 text-4xl text-zinc-700 opacity-50">"</span>
                  </div>
                </div>

                {/* Right: Legal Justification */}
                <div className="p-8 md:p-12 bg-zinc-900/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Gavel className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                      {ts.legalExplainable.auditView.justificationTitle}
                    </h4>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                        <span className="text-[10px] font-black text-zinc-400">BOE</span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {ts.legalExplainable.auditView.justificationText}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-zinc-800">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        <span>Expediente Administrativo: 2024/0042</span>
                        <span>Seguridad Jurídica: 100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Flujo de Trabajo del TAG (Antes vs Ahora) */}
      <section className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-zinc-900 dark:text-white mb-16">
            {ts.workflowTitle}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 relative">
            <div className="absolute top-1/2 left-1/2 -tranzinc-x-1/2 -tranzinc-y-1/2 hidden md:block">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-zinc-400" />
              </div>
            </div>

            {/* Antes */}
            <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 opacity-60">
              <h3 className="text-xl font-bold text-zinc-500 mb-8 uppercase tracking-widest text-center">
                {ts.workflowBeforeTitle}
              </h3>
              <ul className="space-y-6">
                {ts.workflowBeforeItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-500">
                    <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ahora */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/5 to-emerald-500/5 border-2 border-brand-emerald/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-brand opacity-5"></div>
              <h3 className="text-xl font-bold text-brand-emerald mb-8 uppercase tracking-widest text-center relative z-10">
                {ts.workflowAfterTitle}
              </h3>
              <ul className="space-y-6 relative z-10">
                {ts.workflowAfterItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-900 dark:text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. El "Gancho" de Venta (Banner de Cierre) */}
      <section className="py-24 bg-zinc-900 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-zinc-900 to-zinc-950"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Shield className="w-10 h-10 text-[#10B981]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
            {ts.footerTitle}
          </h2>
          <p className="text-xl text-zinc-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {ts.footerDesc}
          </p>
        </div>
      </section>
    </motion.div>
  );
}
