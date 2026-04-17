import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  Globe, 
  Clock, 
  PieChart, 
  Activity,
  FileText,
  CheckCheck,
  MapPin,
  Moon,
  Sun,
  ChevronDown,
  Calendar,
  FileEdit,
  Megaphone,
  Gavel,
  FileCheck,
  Stamp,
  Scale,
  Mail,
  Phone,
  Lock,
  User,
  Briefcase,
  Loader2,
  LogOut,
  ExternalLink,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
  X,
  Target,
  Sparkles,
  List,
  ChevronUp,
  Compass,
  Folder,
  Box,
  ThumbsUp,
  Rocket,
  ClipboardCheck,
  Zap,
  Shield,
  CheckCircle,
  RefreshCw,
  Award,
  Settings,
  Files,
  Calculator,
  Filter,
  ListChecks,
  CheckSquare,
  FileSearch,
  Send,
  AlertCircle,
  Hourglass,
  AlertTriangle,
  Cpu,
  BookOpen,
  Fingerprint,
  BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { translations } from './translations';
import { TecnicoContratacion } from './pages/TecnicoContratacion';
import { PricingServices } from './pages/PricingServices';
import AgentCAIO from './pages/AgentCAIO';
import EfficiencyCalculator from './components/EfficiencyCalculator';
import { supabase } from './lib/supabase';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'ES';
  });

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    if (path === '/soluciones/tecnico-contratacion') return 'tecnico-contratacion';
    if (path === '/metodologia') return 'metodologia';
    if (path === '/preus-i-serveis') return 'preus-i-serveis';
    if (path === '/contacto') return 'contacto';
    if (path === '/agent') return 'agent';
    if (path === '/legal') return 'legal';
    if (path === '/privacy') return 'privacy';
    if (path === '/cookies') return 'cookies';
    return 'home';
  });
  const [expandedMod, setExpandedMod] = useState<number | null>(null);

  // Update document title
  useEffect(() => {
    document.title = 'TonExecutive.ai';
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : 
                 currentPage === 'tecnico-contratacion' ? '/soluciones/tecnico-contratacion' : 
                 currentPage === 'preus-i-serveis' ? '/preus-i-serveis' :
                 `/${currentPage}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [currentPage]);

  // Handle popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/soluciones/tecnico-contratacion') setCurrentPage('tecnico-contratacion');
      else if (path === '/metodologia') setCurrentPage('metodologia');
      else if (path === '/contacto') setCurrentPage('contacto');
      else if (path === '/agent') setCurrentPage('agent');
      else if (path === '/legal') setCurrentPage('legal');
      else if (path === '/privacy') setCurrentPage('privacy');
      else if (path === '/cookies') setCurrentPage('cookies');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expandedMod !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedMod]);

  const [contactName, setContactName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactComment, setContactComment] = useState('');
  const [contactPrivacy, setContactPrivacy] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactErrorMessage, setContactErrorMessage] = useState('');
  const [contactCountdown, setContactCountdown] = useState(0);

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoFullName, setDemoFullName] = useState('');
  const [demoOrganization, setDemoOrganization] = useState('');
  const [demoPhoneNumber, setDemoPhoneNumber] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoStatus, setDemoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [demoErrorMessage, setDemoErrorMessage] = useState('');

  const t = translations[lang as keyof typeof translations] || translations['ES'];

  const getMapLanguage = (langCode: string) => {
    const map: Record<string, string> = {
      'ES': 'es',
      'EN': 'en',
      'CA': 'ca',
      'FR': 'fr',
      'DE': 'de',
      'PT': 'pt',
      'ZH': 'zh'
    };
    return map[langCode] || 'es';
  };

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Rate limit countdown timer
  useEffect(() => {
    if (contactCountdown <= 0) return;
    const timer = setInterval(() => {
      setContactCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [contactCountdown]);

  // Check for existing rate limit on mount
  useEffect(() => {
    const lastSubmit = localStorage.getItem('last_submit_time');
    if (lastSubmit) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmit)) / 1000);
      if (elapsed < 120) {
        setContactCountdown(120 - elapsed);
      }
    }
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 4. CONTROL DE FLUJO Y RATE LIMIT LOCAL
    const lastSubmit = localStorage.getItem('last_submit_time');
    if (lastSubmit) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmit)) / 1000);
      if (elapsed < 120) {
        setContactStatus('error');
        setContactErrorMessage(`Has enviado demasiadas consultas. Por favor, espera ${120 - elapsed} segundos.`);
        setContactCountdown(120 - elapsed);
        return;
      }
    }

    // UI/UX EXPECTATIONS: Deshabilitar botón y mostrar loading
    setContactStatus('loading');
    setContactErrorMessage('');
    
    try {
      // 2. CONSTRUCCIÓN DEL PAYLOAD (JSON)
      const formData = {
        first_name: contactName,
        last_name: contactLastName,
        email: contactEmail,
        phone: contactPhone,
        comment: contactComment
      };

      // 1. AUTENTICACIÓN Y HEADERS
      // Forzamos la clave correcta porque la variable de entorno parece estar contaminada con la Anon Key
      const secretKey = 'xT9_nP4kL2-vR8mY1_qW6zJ5-bC7hF3';
      
      const invokePromise = supabase.functions.invoke('Funcion-comentarios_pliegafacil', {
        body: formData,
        headers: {
          'x-custom-auth': secretKey
        }
      });

      // 3. RESILIENCIA Y TIMEOUT (Promise.race)
      const timeoutPromise = new Promise<any>((_, reject) => {
        setTimeout(() => reject(new Error('TIMEOUT_ERROR')), 15000);
      });

      const { data, error: invokeError } = await Promise.race([invokePromise, timeoutPromise]);

      if (invokeError) {
        const error: any = new Error(invokeError?.message?.toString() || "Error desconocido");
        error.status = invokeError?.status;
        throw error;
      }

      if (data && data.success === false) {
        throw new Error(data.message?.toString() || 'La operación no fue exitosa.');
      }

      // UI/UX EXPECTATIONS: Success, reset fields, show confirmation
      localStorage.setItem('last_submit_time', Date.now().toString());
      setContactCountdown(120);
      setContactStatus('success');
      setContactName('');
      setContactLastName('');
      setContactEmail('');
      setContactPhone('');
      setContactComment('');
      setContactPrivacy(false);
      
      setTimeout(() => setContactStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setContactStatus('error');
      
      // 5. MANEJO DE EXCEPCIONES
      const status = error?.status;
      const message = error?.message?.toString() || "Error desconocido";

      if (status === 429) {
        setContactErrorMessage("Límite de envíos alcanzado en el servidor. Reintentar en 2 min");
        localStorage.setItem('last_submit_time', Date.now().toString());
        setContactCountdown(120);
      } else if (status === 401) {
        setContactErrorMessage("Error de autenticación: Verifica la clave VITE_FUNCTION_SECRET_KEY");
      } else if (message === 'TIMEOUT_ERROR') {
        setContactErrorMessage("Tiempo de espera agotado: La función no respondió en 15 segundos.");
      } else {
        setContactErrorMessage(`Error inesperado: ${message}`);
      }
      
      setTimeout(() => setContactStatus('idle'), 10000);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoStatus('loading');
    setDemoErrorMessage('');
    try {
      const formData = {
        fullName: demoFullName,
        organization: demoOrganization,
        phoneNumber: demoPhoneNumber,
        email: demoEmail
      };

      // Llamada corregida usando supabase.functions.invoke con la cabecera secreta correcta
      // Forzamos la clave correcta porque la variable de entorno parece estar contaminada con la Anon Key
      const secretKey = 'xT9_nP4kL2-vR8mY1_qW6zJ5-bC7hF3';
      
      const invokePromise = supabase.functions.invoke('enviar-demo', {
        body: formData,
        headers: {
          'x-custom-auth': secretKey
        }
      });

      const timeoutPromise = new Promise<any>((_, reject) => {
        setTimeout(() => reject(new Error('TIMEOUT_ERROR')), 15000);
      });

      const { data, error: invokeError } = await Promise.race([invokePromise, timeoutPromise]);

      if (invokeError) {
        const error: any = new Error(invokeError?.message?.toString() || "Error desconocido");
        error.status = invokeError?.status;
        throw error;
      }

      setDemoStatus('success');
      setDemoFullName('');
      setDemoOrganization('');
      setDemoPhoneNumber('');
      setDemoEmail('');
      
      setTimeout(() => {
        setDemoStatus('idle');
        setShowDemoModal(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting demo form:', error);
      setDemoStatus('error');
      
      // Manejo 100% seguro de errores con optional chaining
      const status = error?.status;
      const message = error?.message?.toString() || "Error desconocido";
      
      let errorMessage = t.errors.unexpected;
      
      if (status === 401) {
        errorMessage = t.errors.auth;
      } else if (error?.message === 'TIMEOUT_ERROR') {
        errorMessage = t.errors.timeout;
      } else if (message && message !== "Error desconocido") {
        errorMessage = message;
      }
      
      setDemoErrorMessage(errorMessage);
      setTimeout(() => setDemoStatus('idle'), 8000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const Logo = () => (
    <button onClick={() => setCurrentPage('home')} className="flex items-center gap-1.5 focus:outline-none">
      <div className="relative flex items-center justify-center">
        <BrainCircuit className="w-8 h-8 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
      </div>
      <span className="font-bold text-2xl tracking-tight ml-1 text-zinc-900 dark:text-white">
        <span className="text-zinc-900 dark:text-white">Ton</span>
        <span className="text-emerald-600 dark:text-emerald-500">Executive.ai</span>
      </span>
    </button>
  );

  // --- VISTAS (PÁGINAS) ---

  const renderHome = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
      {/* HERO SECTION (Double Funnel) */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50/50 via-transparent to-emerald-50/50 dark:from-green-900/20 dark:via-zinc-950 dark:to-emerald-900/20 -z-10 transition-colors"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-4 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-green-500" />
            {t.home.badge}
          </motion.div>

          <div className="flex justify-center w-full mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium"
            >
              <BrainCircuit className="w-4 h-4" />
              {t.home.platformBadge}
            </motion.div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-5xl mx-auto leading-[1.1]"
          >
            {t.home.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-400 dark:to-green-400">{t.home.title2}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t.home.subtitle}
          </motion.p>
          
          {/* DOUBLE FUNNEL -> SINGLE FUNNEL FOR ADMINISTRATION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            {/* B2G Card */}
            <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-left hover:shadow-2xl hover:shadow-green-500/10 dark:hover:shadow-green-500/5 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 dark:bg-green-900/20 rounded-bl-full -z-10 transition-colors"></div>
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6">
                <Landmark className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{t.home.b2gTitle}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 min-h-[48px]">
                {t.home.b2gDesc}
              </p>
              <button onClick={() => setCurrentPage('contacto')} className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                {t.home.b2gBtn}
                <ArrowRight className="w-5 h-5 group-hover:tranzinc-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF / TRUST BAR */}
      <section className="py-8 bg-white dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-6">
            {t.home.complianceTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{t.home.compliance1}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{t.home.compliance2}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{t.home.compliance3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRAMITACIÓN IMPECABLE */}
      <section className="py-24 bg-[#0B1120] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-4">
              {t.home.docTitle}
            </h2>
            <p className="text-lg text-zinc-400">
              {t.home.docDesc}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Columna Izquierda: Características */}
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{t.home.docCard1Title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {t.home.docCard1Desc}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <FileSearch className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{t.home.docCard2Title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {t.home.docCard2Desc}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{t.home.docCard3Title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {t.home.docCard3Desc}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Columna Derecha: UI Mockup del Estado del Expediente */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-zinc-900/80 border border-zinc-700 rounded-2xl p-6 shadow-2xl">
                <div className="border-b border-zinc-700 pb-4 mb-6">
                  <h4 className="text-sm font-bold text-white">{t.home.mockupTitle}</h4>
                </div>
                
                <div className="space-y-4 mb-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700 hover:border-emerald-500/30 transition-colors cursor-default"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-zinc-300">{t.home.mockupItem1}</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700 hover:border-emerald-500/30 transition-colors cursor-default"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-zinc-300">{t.home.mockupItem2}</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 bg-orange-950/30 p-3 rounded-lg border border-orange-900/50 hover:border-orange-500/50 transition-colors cursor-pointer group relative"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </motion.div>
                    <span className="text-sm font-medium text-orange-400">{t.home.mockupItem3}</span>
                    
                    {/* Tooltip interactivo */}
                    <div className="absolute -top-10 left-1/2 -tranzinc-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-xs text-white px-3 py-1.5 rounded shadow-xl whitespace-nowrap pointer-events-none border border-zinc-700">
                      {t.home.mockupTooltip}
                      <div className="absolute -bottom-1 left-1/2 -tranzinc-x-1/2 w-2 h-2 bg-zinc-800 border-b border-r border-zinc-700 transform rotate-45"></div>
                    </div>
                  </motion.div>
                </div>

                <motion.button 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  disabled 
                  className="w-full bg-zinc-800 text-zinc-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {t.home.mockupBtn}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DESAFÍO VS SOLUCIÓN */}
      <section className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
              {t.home.challengeSolution.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* El Desafío */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="absolute top-8 right-8 opacity-10">
                <Hourglass className="w-24 h-24 text-zinc-900 dark:text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                {t.home.challengeSolution.challengeTitle}
              </h3>

              <ul className="space-y-6">
                {t.home.challengeSolution.challengeItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* La Solución */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-2xl shadow-emerald-500/20"
            >
              <div className="absolute top-8 right-8 opacity-20">
                <Zap className="w-24 h-24 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6" />
                {t.home.challengeSolution.solutionTitle}
              </h3>

              <ul className="space-y-6">
                {t.home.challengeSolution.solutionItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="mt-1.5 bg-white/20 p-1 rounded-full shrink-0">
                      <CheckCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90 font-bold leading-relaxed group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AUTORIDAD Y SEGURIDAD: IA EXPLICABLE */}
      <section className="py-16 bg-[#0B1120] relative overflow-hidden border-t border-zinc-800">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                {t.home.authoritySecurity.title}
              </h2>
              <p className="text-base text-zinc-400">
                {t.home.authoritySecurity.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Value Blocks (3 columns) */}
            <div className="lg:col-span-12 grid md:grid-cols-3 gap-6 mb-10">
              {[
                { 
                  key: 'justification', 
                  icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
                  color: 'emerald',
                  glow: 'bg-emerald-500/20'
                },
                { 
                  key: 'antiHallucination', 
                  icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
                  color: 'cyan',
                  glow: 'bg-cyan-500/20'
                },
                { 
                  key: 'traceability', 
                  icon: <Fingerprint className="w-6 h-6 text-emerald-400" />,
                  color: 'emerald',
                  glow: 'bg-emerald-500/20'
                }
              ].map((node, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", damping: 20 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative p-6 rounded-3xl bg-zinc-900/60 backdrop-blur-3xl border border-zinc-700 hover:border-${node.color}-500/50 transition-all duration-500 shadow-2xl flex flex-col justify-between min-h-[200px] overflow-hidden`}
                >
                  {/* Background Gradient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${node.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Icon Glow Effect */}
                  <div className={`absolute -top-6 -left-6 w-24 h-24 ${node.glow} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-${node.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-${node.color}-500/20 transition-all duration-500 border border-${node.color}-500/20 shadow-inner`}>
                      {node.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight leading-tight">
                      {t.home.authoritySecurity.blocks[node.key as keyof typeof t.home.authoritySecurity.blocks].title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-xs group-hover:text-zinc-200 transition-colors">
                      {t.home.authoritySecurity.blocks[node.key as keyof typeof t.home.authoritySecurity.blocks].desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom/Right side: Interactive Estrategia Paragraph */}
            <div className="lg:col-span-8 lg:col-start-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse delay-700"></div>

                <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-zinc-700 relative z-10 overflow-hidden group">
                  {/* Scanning Line Effect */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-20 pointer-events-none"
                  />

                  {/* Document Header Decor */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                    </div>
                    <div className="h-1.5 w-24 bg-zinc-800 rounded-full"></div>
                  </div>

                  {/* The Paragraph */}
                  <div className="space-y-4">
                    <div className="h-2.5 w-3/4 bg-zinc-800 rounded-full"></div>
                    <div className="h-2.5 w-full bg-zinc-800 rounded-full"></div>
                    
                    <div className="relative py-4 px-6 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-xl transition-all duration-500 group-hover:bg-emerald-500/10 cursor-default">
                      <p className="text-zinc-300 text-sm leading-relaxed font-medium italic">
                        {t.home.authoritySecurity.paragraph}
                      </p>
                      
                      {/* Verification Tag */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="absolute -right-4 -top-6 z-30"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-emerald-500 text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center gap-1.5 border border-emerald-400 whitespace-nowrap"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.home.authoritySecurity.verificationTag}
                        </motion.div>
                      </motion.div>

                      {/* AI Citation Tooltip Simulation */}
                      <div className="absolute -bottom-8 left-1/2 -tranzinc-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
                        <div className="bg-zinc-800 text-emerald-400 text-[10px] px-3 py-1.5 rounded-lg border border-emerald-500/30 font-mono shadow-xl whitespace-nowrap">
                          {t.home.authoritySecurity.tooltip}
                          <div className="absolute -top-1 left-1/2 -tranzinc-x-1/2 w-2 h-2 bg-zinc-800 border-t border-l border-emerald-500/30 transform rotate-45"></div>
                        </div>
                      </div>
                    </div>

                    <div className="h-2.5 w-5/6 bg-zinc-800 rounded-full"></div>
                    <div className="h-2.5 w-2/3 bg-zinc-800 rounded-full"></div>
                    <div className="h-2.5 w-full bg-zinc-800 rounded-full"></div>
                  </div>

                  {/* Bottom Decor */}
                  <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <div className="h-6 w-24 bg-zinc-800/50 rounded-lg border border-zinc-700"></div>
                    <div className="flex -space-x-1.5">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                          {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* UNA PLATAFORMA, TODO TU EQUIPO SINCRONIZADO */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-4">
              <Sparkles className="w-3 h-3" />
              {t.home.syncBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D4ED8] dark:text-emerald-400 mb-6">
              {t.home.syncTitle}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {t.home.syncDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1: Jurídico */}
            <div 
              onClick={() => {
                setCurrentPage('tecnico-contratacion');
                window.scrollTo(0, 0);
              }}
              className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:-tranzinc-y-2 transition-transform duration-300 border border-zinc-100 dark:border-zinc-700 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scale className="w-7 h-7 text-[#1D4ED8] dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-between">
                {t.home.card1Title}
                <ArrowRight className="w-5 h-5 text-[#1D4ED8] dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.home.card1Desc}
              </p>
            </div>

            {/* Tarjeta 2: Técnico */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:-tranzinc-y-2 transition-transform duration-300 border border-zinc-100 dark:border-zinc-700">
              <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-[#10B981] dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                {t.home.card2Title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.home.card2Desc}
              </p>
            </div>

            {/* Tarjeta 3: Administrativo */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:-tranzinc-y-2 transition-transform duration-300 border border-zinc-100 dark:border-zinc-700">
              <div className="w-14 h-14 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center mb-6">
                <Files className="w-7 h-7 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                {t.home.card3Title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.home.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INGENIERÍA DE PLIEGOS PARA UNIDADES PROMOTORAS */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D4ED8] dark:text-emerald-400 mb-4">
              {t.home.engineeringTitle}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {t.home.engineeringDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 hover:border-green-500 dark:hover:border-green-500 transition-colors">
              <Calculator className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                {t.home.engCard1Title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.home.engCard1Desc}
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 hover:border-green-500 dark:hover:border-green-500 transition-colors">
              <Filter className="w-8 h-8 text-[#1D4ED8] dark:text-emerald-400 mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                {t.home.engCard2Title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.home.engCard2Desc}
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 hover:border-green-500 dark:hover:border-green-500 transition-colors">
              <ListChecks className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                {t.home.engCard3Title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.home.engCard3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* SINCRONIZACIÓN TOTAL DEL EQUIPO */}
      <section className="py-24 bg-zinc-900 dark:bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900 to-zinc-950"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              {t.home.syncSectionTitle}
            </h2>
            <p className="text-lg text-zinc-300">
              {t.home.syncSectionDesc}
            </p>
          </div>

          {/* El "Hilo Dorado" de la Contratación */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
            {/* Línea conectora de fondo (solo visible en desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -tranzinc-y-1/2 z-0"></div>

            {/* Paso 1 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
              <div className="w-20 h-20 rounded-2xl bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Settings className="w-10 h-10 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.home.step1Title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed px-4">
                {t.home.step1Desc}
              </p>
            </div>

            {/* Flecha 1 */}
            <div className="hidden md:flex items-center justify-center relative z-10 text-zinc-600 animate-pulse">
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="md:hidden flex items-center justify-center text-zinc-600 animate-pulse my-2">
              <ArrowRight className="w-8 h-8 rotate-90" />
            </div>

            {/* Paso 2 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(29,78,216,0.2)]">
                <Scale className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.home.step2Title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed px-4">
                {t.home.step2Desc}
              </p>
            </div>

            {/* Flecha 2 */}
            <div className="hidden md:flex items-center justify-center relative z-10 text-zinc-600 animate-pulse">
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="md:hidden flex items-center justify-center text-zinc-600 animate-pulse my-2">
              <ArrowRight className="w-8 h-8 rotate-90" />
            </div>

            {/* Paso 3 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
              <div className="w-20 h-20 rounded-2xl bg-zinc-700/50 border border-zinc-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Files className="w-10 h-10 text-zinc-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.home.step3Title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed px-4">
                {t.home.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACTO MEDIBLE */}
      <section className="py-24 bg-zinc-900 dark:bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900 to-green-900/20 dark:from-emerald-900/20 dark:via-zinc-950 dark:to-green-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-green-400 uppercase">{t.home.impactBadge}</h2>
            <p className="text-3xl md:text-4xl font-bold mt-2">{t.home.impactTitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            <div className="text-center px-4">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-500 mb-4">{t.home.impact1Val}</div>
              <div className="text-xl font-medium text-zinc-300 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-emerald-400" /> {t.home.impact1Title}
              </div>
              <p className="mt-4 text-zinc-400 text-sm">{t.home.impact1Desc}</p>
            </div>
            <div className="text-center px-4 pt-12 md:pt-0">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-500 mb-4">{t.home.impact2Val}</div>
              <div className="text-xl font-medium text-zinc-300 flex items-center justify-center gap-2">
                <PieChart className="w-6 h-6 text-green-400" /> {t.home.impact2Title}
              </div>
              <p className="mt-4 text-zinc-400 text-sm">{t.home.impact2Desc}</p>
            </div>
            <div className="text-center px-4 pt-12 md:pt-0">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-green-300 mb-4">{t.home.impact3Val}</div>
              <div className="text-xl font-medium text-zinc-300 flex items-center justify-center gap-2">
                <Activity className="w-6 h-6 text-green-300" /> {t.home.impact3Title}
              </div>
              <p className="mt-4 text-zinc-400 text-sm">{t.home.impact3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <EfficiencyCalculator t={t} />
    </motion.div>
  );

  const renderSecuritySection = () => {
    const securityIcons = [
      <Globe className="w-8 h-8 text-emerald-500" />,
      <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      <Lock className="w-8 h-8 text-emerald-500" />,
      <RefreshCw className="w-8 h-8 text-emerald-500" />
    ];

    return (
      <div className="mt-32 mb-16">
        <div className="relative overflow-hidden bg-zinc-950 rounded-[3rem] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 p-12 md:p-16">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {(t as any).methodology.securitySection.title}
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  {(t as any).methodology.securitySection.subtitle}
                </p>
              </div>
              
              {/* Sovereign Cloud Seal */}
              <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl backdrop-blur-md">
                <Award className="w-6 h-6 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest">
                  {(t as any).methodology.securitySection.sealText}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(t as any).methodology.securitySection.points.map((point: any, i: number) => (
                <div key={i} className="group p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500">
                  <div className="mb-6 p-4 rounded-2xl bg-zinc-800/50 w-fit group-hover:scale-110 transition-transform duration-500">
                    {securityIcons[i]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 tracking-wide uppercase">
                    {point.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  const renderAbout = () => {
    // If translations are missing (e.g. for other languages yet to be added), falback to ES
    const ab = (t as any).about || {
      title: "Sobre Mí",
      subtitle: "Ton Guardiet - Fractional Chief AI Officer",
      profile: "Perfil Profesional",
      intro: "Liderando en la intersección entre Negocio, Producto e Inteligencia Artificial.",
      content: [
        "Soy experto en Producto y Crecimiento, especializado en la aplicación de IA Generativa. Durante los últimos 6 años, he diseñado e impulsado estrategias de tecnología y operaciones en startups B2B, logrando crecimientos anuales (ARR) superiores al 400%.",
        "Mi enfoque como Fractional Chief AI Officer asegura que la adopción de Inteligencia Artificial en tu empresa no sea un mero experimento, sino un motor de eficiencia, escalabilidad y resultados medibles."
      ],
      experienceTitle: "Trayectoria Destacada",
      experiences: [
        {
          role: "Head of Product & Growth",
          company: "Unibo Neobroker",
          period: "Mar 2023 - Presente",
          desc: "Desarrollo estratégico del producto B2B, automatización de procesos internos con IA, aumentando la captación de usuarios e integrando pasarelas de pago y datos a gran escala."
        },
        {
          role: "Product Manager | Crecimiento B2B",
          company: "Quipu | Sila",
          period: "Ene 2022 - Mar 2023",
          desc: "Definición y escalado de producto ERP, integraciones bancarias PSD2 y OCR para extracción de datos. Crecimiento excepcional en retención y activación de usuarios (ARR +400%)."
        },
        {
          role: "Consultor de Innovación",
          company: "Indie Hacker / Emprendedor",
          period: "Histórico",
          desc: "Lanzamiento y validación de PLGs basados en SaaS; optimización de embudos de ventas, e-commerce, y diseño de Growth Loops."
        }
      ],
      skillsGroup1: "Producto & Estrategia IA",
      skills1: ["AI Roadmaps", "Data Strategy", "Product-Led Growth (PLG)", "OKR Alignment", "Change Management"],
      skillsGroup2: "Tecnología & Operaciones B2B",
      skills2: ["SaaS & ERP", "Fintech (PSD2/KYB)", "Workflow Automation", "ROI Tracking", "API Integrations"]
    };

    return (
      <div className="py-20 bg-zinc-50 dark:bg-zinc-900 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl glass z-10">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D03AQE2cTExYpZngw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691236166540?e=1750204800&v=beta&t=t4I57z1FInLftINtX54FkIqL68x40Z5vQzUuXXE9qEw"
                alt="Ton Guardiet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                {ab.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-emerald-600 dark:text-emerald-400 mb-6">
                {ab.subtitle}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                {ab.intro}
              </p>
              <div className="mt-8 flex gap-4 justify-center md:justify-start">
                 <a href="https://www.linkedin.com/in/tonguardiet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-xl hover:bg-[#004182] transition-colors shadow-lg font-medium">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                 </a>
                 <button onClick={() => { setCurrentPage('contacto'); window.scrollTo(0,0); }} className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-lg font-medium">
                    <Mail className="w-5 h-5" /> Contactar
                 </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Column: BIO and Skills */}
            <div className="md:col-span-1 space-y-10">
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <User className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  {ab.profile}
                </h3>
                <div className="space-y-4 text-zinc-600 dark:text-zinc-300 relative z-10">
                  {ab.content.map((p, i) => (
                    <p key={i} className="leading-relaxed text-sm">{p}</p>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">{ab.skillsGroup1}</h4>
                  <div className="flex flex-wrap gap-2">
                    {ab.skills1.map((skill, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">{ab.skillsGroup2}</h4>
                  <div className="flex flex-wrap gap-2">
                    {ab.skills2.map((skill, i) => (
                      <span key={i} className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Experience */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-emerald-500" />
                {ab.experienceTitle}
              </h3>
              
              <div className="space-y-6">
                {ab.experiences.map((exp, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-800 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{exp.role}</h4>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">{exp.company}</div>
                      </div>
                      <div className="bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full text-xs font-medium text-zinc-500 whitespace-nowrap">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderMetodologia = () => {
    const icons = [
      <Compass className="w-8 h-8" />, 
      <Folder className="w-8 h-8" />, 
      <Megaphone className="w-8 h-8" />, 
      <Gavel className="w-8 h-8" />, 
      <Box className="w-8 h-8" />, 
      <ThumbsUp className="w-8 h-8" />, 
      <Rocket className="w-8 h-8" />, 
      <ClipboardCheck className="w-8 h-8" />
    ];

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1D4ED8] dark:text-emerald-400 mb-6">
              {(t as any).methodology.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {(t as any).methodology.subtitle}
            </p>
          </div>

          {/* Grid de Módulos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {(t as any).methodology.mods.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -12, scale: 1.02 }}
                onClick={() => mod.details && setExpandedMod(i)}
                className="group relative bg-white dark:bg-zinc-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer flex flex-col items-center text-center overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
                
                <div className="relative w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30 group-hover:rotate-6 transition-transform duration-500">
                  <div className="text-white">
                    {icons[i]}
                  </div>
                </div>
                <h3 className="relative text-xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">
                  {mod.name}
                </h3>
                <p className="relative text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                  {mod.desc}
                </p>

                {/* Botón Acceso al Módulo */}
                <div className="mt-8 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform tranzinc-y-4 group-hover:tranzinc-y-0">
                  <a 
                    href={(mod as any).link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-emerald-500/20"
                  >
                    <span>{(t as any).methodology.accessBtn || 'Acceder al módulo'}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:tranzinc-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal Central Grande (Fuera del loop para evitar bugs de hover/click) */}
          <AnimatePresence>
            {expandedMod !== null && (t as any).methodology.mods[expandedMod] && (
              <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" 
                onClick={() => setExpandedMod(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative border border-zinc-100 dark:border-zinc-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header del Modal */}
                  <div className="sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md z-10 px-8 md:px-12 py-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#10B981] flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                        {icons[expandedMod]}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-[#1D4ED8] dark:text-emerald-400">
                        {(t as any).methodology.mods[expandedMod].name}
                      </h3>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpandedMod(null);
                      }}
                      className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[#1D4ED8] hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-200 z-50"
                      aria-label="Close modal"
                    >
                      <X className="w-7 h-7" />
                    </button>
                  </div>

                  <div className="p-8 md:p-12 space-y-10">
                    {/* Propósito */}
                    <section>
                      <div className="flex items-center gap-3 text-[#10B981] font-bold mb-4">
                        <Target className="w-6 h-6" />
                        <span className="text-xl">{(t as any).methodology.purposeLabel}</span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                        {(t as any).methodology.mods[expandedMod].details?.purpose}
                      </p>
                    </section>

                    {/* Estadios / Etapas */}
                    <section>
                      <div className="flex items-center gap-3 text-[#1D4ED8] dark:text-emerald-400 font-bold mb-6">
                        <List className="w-6 h-6" />
                        <span className="text-xl">
                          {(t as any).methodology.mods[expandedMod].details?.stagesLabel || (t as any).methodology.stagesLabelDefault}
                        </span>
                      </div>
                      <div className="grid gap-4">
                        {(t as any).methodology.mods[expandedMod].details?.stages.map((stage: string, idx: number) => {
                          const [title, ...descParts] = stage.split(' - ');
                          const description = descParts.join(' - ');
                          return (
                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-colors">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold shrink-0 text-sm">
                                {idx + 1}
                              </span>
                              <div className="text-zinc-700 dark:text-zinc-300">
                                <span className="font-bold text-zinc-900 dark:text-white block mb-1">{title}</span>
                                <span className="text-sm leading-relaxed opacity-80">{description}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* Potencia de la IA */}
                    <section>
                      <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 font-bold mb-6">
                        <Sparkles className="w-6 h-6" />
                        <span className="text-xl">{(t as any).methodology.aiPowerLabel}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {(t as any).methodology.mods[expandedMod].details?.aiPower.map((ai: string, idx: number) => (
                          <div key={idx} className="bg-purple-50/50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/30 text-zinc-600 dark:text-zinc-400 flex items-start gap-4">
                            <Zap className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
                            <span className="text-sm leading-relaxed">{ai}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Seguridad */}
                    <section className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800/50">
                      <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300 font-bold mb-3">
                        <ShieldCheck className="w-6 h-6" />
                        <span className="text-xl">{(t as any).methodology.securityLabel}</span>
                      </div>
                      <p className="text-emerald-600/90 dark:text-emerald-300/80 text-lg leading-relaxed">
                        {(t as any).methodology.mods[expandedMod].details?.security}
                      </p>
                    </section>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Sección de Beneficios Inferior */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{(t as any).methodology.benefit1Title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{(t as any).methodology.benefit1Desc}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{(t as any).methodology.benefit2Title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{(t as any).methodology.benefit2Desc}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{(t as any).methodology.benefit3Title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{(t as any).methodology.benefit3Desc}</p>
              </div>
            </div>
          </div>
          {renderSecuritySection()}
        </div>
      </motion.div>
    );
  };

  const renderContacto = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="bg-[#1D4ED8] py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
          {t.contact.header}
        </h1>
        <button 
          onClick={() => setShowDemoModal(true)}
          className="bg-white text-[#1D4ED8] px-10 py-5 rounded-full font-bold text-xl hover:bg-[#10B981] hover:text-white active:bg-[#059669] active:scale-95 transition-all duration-300 shadow-xl"
        >
          {t.contact.requestDemo}
        </button>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info & Map */}
          <div className="space-y-12">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg h-[400px] relative group">
              <iframe 
                key={lang}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.464906598531!2d2.135447915423311!3d41.38913907926414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4987588373273%3A0x93b39c2653c3a11!2sAv.%20Diagonal%2C%20523%2C%20Les%20Corts%2C%2008029%20Barcelona!5e0!3m2!1s${getMapLanguage(lang)}!2s${getMapLanguage(lang)}!4v1712745000000!5m2!1s${getMapLanguage(lang)}!2s${getMapLanguage(lang)}`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 max-w-[240px] pointer-events-none">
                <p className="font-bold text-zinc-900 dark:text-white text-sm mb-1">TonExecutive.ai</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">{t.contact.address}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="pt-2">
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    {t.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="pt-2">
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    {t.contact.phoneValue}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="pt-2">
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    {t.contact.emailValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <h2 className="text-3xl font-bold text-[#1D4ED8] mb-10">
              {t.contact.formTitle}
            </h2>
            
            <form className="space-y-8" onSubmit={handleContactSubmit}>
              {contactStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-xl text-center mb-6"
                >
                  <p className="text-red-800 font-medium">{contactErrorMessage}</p>
                </motion.div>
              )}

              <div className="space-y-2">
                <input 
                  type="text" 
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400" 
                  placeholder={t.contact.name}
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="text" 
                  required
                  value={contactLastName}
                  onChange={(e) => setContactLastName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400" 
                  placeholder={t.contact.lastName}
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="email" 
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400" 
                  placeholder={t.contact.email}
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="tel" 
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400" 
                  placeholder={t.contact.phone}
                />
              </div>

              <div className="space-y-2">
                <textarea 
                  required
                  rows={4}
                  value={contactComment}
                  onChange={(e) => setContactComment(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400 resize-none" 
                  placeholder={t.contact.comment}
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="privacy"
                  required
                  checked={contactPrivacy}
                  onChange={(e) => setContactPrivacy(e.target.checked)}
                  className="w-5 h-5 rounded border-zinc-300 text-[#1D4ED8] focus:ring-[#1D4ED8]"
                />
                <label htmlFor="privacy" className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t.contact.privacyText}
                  <button 
                    type="button"
                    onClick={() => { setCurrentPage('privacy'); window.scrollTo(0,0); }}
                    className="text-[#1D4ED8] hover:underline font-medium"
                  >
                    {t.contact.privacyLink}
                  </button>
                </label>
              </div>

              <button 
                type="submit"
                disabled={contactStatus === 'loading' || !contactPrivacy || contactCountdown > 0}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {contactStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t.contact.loading}
                  </>
                ) : contactCountdown > 0 ? (
                  (t.contact.wait || 'Espera {seconds} segundos...').replace('{seconds}', contactCountdown.toString())
                ) : (
                  t.contact.submit
                )}
              </button>

              {contactStatus === 'success' && (
                <p className="text-center text-green-600 font-medium animate-bounce">
                  {t.contact.success}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderLegal = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
          >
            &larr; {t.legalPage.backToHome}
          </button>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            {t.legalPage.lastUpdated}
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 md:p-12 prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-8">{t.legalPage.title}</h1>
          
          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.idTitle}</h2>
          <p>{t.legalPage.idText1}</p>
          <p>{t.legalPage.idText2}</p>
          <p>{t.legalPage.idText3}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.legalPage.idPhone}</li>
            <li>{t.legalPage.idEmail}</li>
          </ul>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.hostingTitle}</h2>
          <p className="whitespace-pre-line">{t.legalPage.hostingText}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.usersTitle}</h2>
          <p>{t.legalPage.usersText1}</p>
          <p>{t.legalPage.usersText2}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.portalTitle}</h2>
          <p>{t.legalPage.portalText1}</p>
          <p>{t.legalPage.portalText2}</p>
          <p>{t.legalPage.portalText3}</p>
          <ul className="list-disc pl-5 space-y-2">
            {t.legalPage.portalList.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">{t.legalPage.portalText4}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.dataTitle}</h2>
          <p>{t.legalPage.dataText}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.intellectualTitle}</h2>
          <p>{t.legalPage.intellectualText1}</p>
          <p>{t.legalPage.intellectualText2}</p>
          <p>{t.legalPage.intellectualText3}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.exclusionTitle}</h2>
          <p>{t.legalPage.exclusionText1}</p>
          <ul className="list-[lower-alpha] pl-5 space-y-2">
            {t.legalPage.exclusionList.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">{t.legalPage.exclusionText2}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.modificationTitle}</h2>
          <p>{t.legalPage.modificationText1}</p>
          <p>{t.legalPage.modificationText2}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.linksTitle}</h2>
          <p>{t.legalPage.linksText}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.exclusionRightTitle}</h2>
          <p>{t.legalPage.exclusionRightText}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.generalTitle}</h2>
          <p>{t.legalPage.generalText}</p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{t.legalPage.lawTitle}</h2>
          <p>{t.legalPage.lawText}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
          >
            &larr; {t.legalPage.backToHome}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderPrivacy = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
          >
            &larr; {t.privacy.backToHome}
          </button>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            {t.privacy.lastUpdated}
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 md:p-12 prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-8">{t.privacy.title}</h1>
          
          {t.privacy.content.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4">{section.title}</h2>
              {section.paragraphs && section.paragraphs.map((p, pIndex) => (
                <p key={pIndex}>{p}</p>
              ))}
              {section.list && (
                <ul className="list-disc pl-5 space-y-1">
                  {section.list.map((item, lIndex) => (
                    <li key={lIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
            >
              &larr; {t.privacy.backToHome}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCookies = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
          >
            &larr; {t.cookies.backToHome}
          </button>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            {t.cookies.lastUpdated}
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 md:p-12 prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-8" data-i18n="cookies.title">{t.cookies.title}</h1>
          
          {(t.cookies.sections as any[]).map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-500 mt-8 mb-4" data-i18n={`cookies.sections.${index}.title`}>{section.title}</h2>
              {section.content && <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6" data-i18n={`cookies.sections.${index}.content`}>{section.content}</p>}
              
              {section.list && (
                <ul className="list-disc pl-5 space-y-2 mb-6 text-zinc-700 dark:text-zinc-300">
                  {(section.list as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.extraContent && <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">{section.extraContent}</p>}

              {section.types && (
                <div className="space-y-4 mb-6">
                  {(section.types as any[]).map((type, i) => (
                    <p key={i} className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">{type.name}</strong> {type.desc}
                    </p>
                  ))}
                </div>
              )}

              {section.links && (
                <ul className="list-disc pl-5 space-y-2 mb-6 text-zinc-700 dark:text-zinc-300">
                  {(section.links as any[]).map((link, i) => (
                    <li key={i}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {section.googleLinks && (
                <ul className="list-disc pl-5 space-y-2 mb-6 text-zinc-700 dark:text-zinc-300">
                  {(section.googleLinks as string[]).map((link, i) => (
                    <li key={i}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline break-all">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 italic">{section.footer}</p>}

              {section.cookieGroups && (section.cookieGroups as any[]).map((group, gIndex) => (
                <div key={gIndex} className="mt-8">
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">{group.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">{group.desc}</p>
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                          <th className="border border-zinc-200 dark:border-zinc-700 p-3 text-sm font-semibold text-left text-zinc-700 dark:text-zinc-300">{t.privacy.cookieTable.name}</th>
                          <th className="border border-zinc-200 dark:border-zinc-700 p-3 text-sm font-semibold text-left text-zinc-700 dark:text-zinc-300">{t.privacy.cookieTable.duration}</th>
                          <th className="border border-zinc-200 dark:border-zinc-700 p-3 text-sm font-semibold text-left text-zinc-700 dark:text-zinc-300">{t.privacy.cookieTable.desc}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(group.cookies as any[]).map((cookie, cIndex) => (
                          <tr key={cIndex} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-sm font-mono text-emerald-600 dark:text-emerald-400">{cookie.name}</td>
                            <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-sm text-zinc-600 dark:text-zinc-400">{cookie.duration}</td>
                            <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-sm text-zinc-600 dark:text-zinc-400">{cookie.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
            >
              &larr; {t.cookies.backToHome}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderDemoModal = () => (
    <AnimatePresence>
      {showDemoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemoModal(false)}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#F3F4F6] w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDemoModal(false);
              }}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#1D4ED8] transition-all shadow-sm active:scale-90"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Column: Image */}
            <div className="md:w-[40%] relative min-h-[300px] md:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                alt="Representative" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent md:hidden" />
            </div>

            {/* Right Column: Form */}
            <div className="md:w-[60%] p-8 md:p-16 bg-white">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1D4ED8] mb-4">
                  {t.demo.title}
                </h2>
                <p className="text-zinc-500 mb-10 leading-relaxed">
                  {t.demo.subtitle}
                </p>

                {demoStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-100 p-4 rounded-xl text-center mb-6"
                  >
                    <p className="text-red-800 font-medium">{demoErrorMessage}</p>
                  </motion.div>
                )}

                {demoStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-100 p-8 rounded-3xl text-center"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCheck className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-green-800 font-bold text-xl mb-2">{t.demo.success}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700 ml-1">
                          {t.demo.name}
                        </label>
                        <input 
                          required
                          type="text"
                          value={demoFullName}
                          onChange={(e) => setDemoFullName(e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-transparent focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700 ml-1">
                          {t.demo.web}
                        </label>
                        <input 
                          required
                          type="text"
                          value={demoOrganization}
                          onChange={(e) => setDemoOrganization(e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-transparent focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700 ml-1">
                        {t.demo.phone}
                      </label>
                      <input 
                        required
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={demoPhoneNumber}
                        onChange={(e) => setDemoPhoneNumber(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-transparent focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700 ml-1">
                        {t.demo.email}
                      </label>
                      <input 
                        required
                        type="email"
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-transparent focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900"
                      />
                    </div>

                    <div className="pt-4">
                      <div className="h-1 w-full bg-zinc-100 rounded-full mb-8 overflow-hidden">
                        <div className="h-full w-full bg-[#10B981]" />
                      </div>
                      
                      <button 
                        disabled={demoStatus === 'loading'}
                        type="submit"
                        className="w-full bg-[#10B981] text-white py-5 rounded-full font-bold text-xl hover:bg-[#059669] transition-all duration-300 shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {demoStatus === 'loading' ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            {t.contact.loading}
                          </>
                        ) : (
                          t.demo.submit
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-300 selection:bg-green-200 dark:selection:bg-green-900 flex flex-col">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${currentPage === 'home' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.home}</button>
            <button onClick={() => setCurrentPage('sobre-mi')} className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${currentPage === 'sobre-mi' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{(t.nav as any).about || 'Sobre Mí'}</button>
            <button onClick={() => setCurrentPage('metodologia')} className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${currentPage === 'metodologia' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.methodology}</button>
            <button onClick={() => setCurrentPage('tecnico-contratacion')} className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${currentPage === 'tecnico-contratacion' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.solutions}</button>
            <button onClick={() => setCurrentPage('agent')} className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${currentPage === 'agent' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>Agente CAIO</button>
            <button onClick={() => setCurrentPage('contacto')} className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${currentPage === 'contacto' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.contact}</button>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                {lang}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden py-1 z-50">
                  {['ES', 'EN', 'CA', 'FR', 'DE', 'PT', 'ZH'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLangMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => window.location.href = '#'} 
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              {t.nav.login || 'Acceder'}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'sobre-mi' && renderAbout()}
        {currentPage === 'metodologia' && renderMetodologia()}
        {currentPage === 'preus-i-serveis' && (
          <PricingServices 
            t={t} 
            onBookDemo={() => setShowDemoModal(true)} 
            onContactClick={() => setCurrentPage('contacto')}
          />
        )}
        {currentPage === 'contacto' && renderContacto()}
        {currentPage === 'legal' && renderLegal()}
        {currentPage === 'privacy' && renderPrivacy()}
        {currentPage === 'cookies' && renderCookies()}
        {currentPage === 'tecnico-contratacion' && (
          <TecnicoContratacion 
            t={t} 
            onBookDemo={() => setShowDemoModal(true)} 
          />
        )}
        {currentPage === 'agent' && <AgentCAIO />}
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-1.5 grayscale opacity-80">
            <div className="relative flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-xl tracking-tight ml-1 text-white">
              TonExecutive.ai
            </span>
          </div>
          <div className="text-zinc-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TonExecutive.ai. {t.footer.rights}
          </div>
          <div className="flex gap-6 text-sm text-zinc-400">
            <button 
              onClick={() => {
                setCurrentPage('legal');
                window.scrollTo(0, 0);
              }} 
              className="hover:text-white transition-colors"
            >
              {t.footer.legal}
            </button>
            <button 
              onClick={() => {
                setCurrentPage('privacy');
                window.scrollTo(0, 0);
              }} 
              className="hover:text-white transition-colors"
            >
              {t.footer.privacy}
            </button>
            <button 
              onClick={() => {
                setCurrentPage('cookies');
                window.scrollTo(0, 0);
              }} 
              className="hover:text-white transition-colors"
            >
              {t.footer.cookies}
            </button>
          </div>

          {/* SOCIAL MEDIA BUTTONS */}
          <div className="flex gap-4 items-center mt-6 md:mt-0">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-300" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
      {renderDemoModal()}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
