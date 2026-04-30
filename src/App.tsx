import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
/* SQL sugerido (si la tabla no existe):
create table if not exists public.leads (
  id bigserial primary key,
  nombre text not null,
  email text not null,
  reto text not null,
  fecha timestamptz not null default now(),
  origen text not null default 'demo_modal'
);
*/
import WhatsAppChat, { notifyNewLead } from './components/WhatsAppChat';
import AgentCAIO from './pages/AgentCAIO';
import { 
  ArrowRight, 
  CircleCheck as CheckCircle2, 
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
  FilePen as FileEdit,
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
  PlayCircle,
  Target,
  Sparkles,
  GraduationCap,
  LayoutGrid,
  Quote,
  Star,
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
  CircleCheck as CheckCircle,
  RefreshCw,
  Award,
  Settings,
  Files,
  BrainCircuit,
  Search,
  Menu,
  Calculator,
  Filter,
  ListChecks,
  BarChart3,
  Tag,
  CheckSquare,
  FileSearch,
  Send,
  AlertCircle,
  Hourglass,
  AlertTriangle,
  Cpu,
  BookOpen,
  Fingerprint,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { translations } from './translations';
import { TecnicoContratacion } from './pages/TecnicoContratacion';
import { PricingServices } from './pages/PricingServices';
import EfficiencyCalculator from './components/EfficiencyCalculator';
import { supabase } from './lib/supabase';
import OrbCanvas from './components/OrbCanvas';
import MagneticButton from './components/MagneticButton';
import BentoCard from './components/BentoCard';
import GeometricVideoMask from './components/GeometricVideoMask';
import AnimatedGradientText from './components/AnimatedGradientText';

function useCountUp(target: number, duration: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return value;
}

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
    if (path === '/informe') return 'informe';
    if (path === '/legal') return 'legal';
    if (path === '/privacy') return 'privacy';
    if (path === '/cookies') return 'cookies';
    return 'home';
  });
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [expandedMod, setExpandedMod] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [activeStoryTag, setActiveStoryTag] = useState<string>('Todos');
  const [activeTrendCategory, setActiveTrendCategory] = useState<string>('Todas');
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (currentPage === 'home' && videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video auto-play blocked or error:", err));
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document title
  useEffect(() => {
    document.title = 'TonExecutive.ai | Fractional Chief AI Officer para empresas B2B';
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : 
                 currentPage === 'tecnico-contratacion' ? '/soluciones/tecnico-contratacion' : 
                 currentPage === 'preus-i-serveis' ? '/preus-i-serveis' :
                 currentPage === 'noticias' ? '/casos-de-exito' :
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
      else if (path === '/informe') setCurrentPage('informe');
      else if (path === '/agent') setCurrentPage('agent');
      else if (path === '/legal') setCurrentPage('legal');
      else if (path === '/privacy') setCurrentPage('privacy');
      else if (path === '/cookies') setCurrentPage('cookies');
      else if (path === '/casos-de-exito' || path === '/noticias') setCurrentPage('noticias');
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
  const [contactTopic, setContactTopic] = useState('');

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoFullName, setDemoFullName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoChallenge, setDemoChallenge] = useState('');
  const [demoStatus, setDemoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [demoErrorMessage, setDemoErrorMessage] = useState('');
  const [showDemoConfetti, setShowDemoConfetti] = useState(false);
  const [demoSubmittedName, setDemoSubmittedName] = useState('');
  const [diagnosisStep, setDiagnosisStep] = useState(1);
  const [diagEmployees, setDiagEmployees] = useState('');
  const [diagAiState, setDiagAiState] = useState('');
  const [diagBlocker, setDiagBlocker] = useState('');
  const [diagOwner, setDiagOwner] = useState('');
  const [diagEmail, setDiagEmail] = useState('');
  const [diagIdentity, setDiagIdentity] = useState('');
  const [diagConsent, setDiagConsent] = useState(false);
  const [diagStatus, setDiagStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  const scrollToSection = (id: string) => {
    const attempt = () => {
      const node = document.getElementById(id);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (currentPage !== 'home' && currentPage !== 'sobre-mi') {
      setTimeout(attempt, 120);
    } else {
      attempt();
    }
  };

  const goToDiagnosis = () => {
    if (currentPage !== 'home') setCurrentPage('home');
    setTimeout(() => scrollToSection('diagnostico'), 140);
  };

  const goToReportFocus = () => {
    setCurrentPage('informe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToContent = () => {
    if (currentPage !== 'home') setCurrentPage('home');
    setTimeout(() => scrollToSection('contenido-semanal'), 140);
  };

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
      try {
        await supabase.from('leads').insert({
          nombre: demoFullName,
          email: demoEmail,
          reto: demoChallenge,
          fecha: new Date().toISOString(),
          origen: 'demo_modal',
        });
      } catch (leadError) {
        console.warn('No se pudo guardar el lead en Supabase:', leadError);
      }

      const secretKey = import.meta.env.VITE_FUNCTION_SECRET_KEY;
      const emailBody = `Hola ${demoFullName}, hemos recibido tu solicitud. Ton revisará tu caso y te enviará un enlace de Calendly personalizado en menos de 24h.<br/><br/>Calendly: <a href="https://calendly.com/tonguardiet">https://calendly.com/tonguardiet</a>`;
      const emailPayload = {
        fullName: demoFullName,
        email: demoEmail,
        reto: demoChallenge,
        subject: '¡Demo reservada! Ton te confirma en 24h',
        html: emailBody,
        origen: 'demo_modal',
      };

      const { error: invokeError } = await supabase.functions.invoke('enviar-demo', {
        body: emailPayload,
        headers: secretKey ? { 'x-custom-auth': secretKey } : undefined,
      });
      if (invokeError) {
        console.warn('No se pudo enviar el email de confirmación:', invokeError.message);
      }

      await notifyNewLead(demoFullName, demoEmail, demoChallenge);

      setDemoSubmittedName(demoFullName);
      setDemoStatus('success');
      setShowDemoConfetti(true);
      setTimeout(() => setShowDemoConfetti(false), 1600);
      setDemoFullName('');
      setDemoEmail('');
      setDemoChallenge('');
      
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
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const t = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 40);
    return () => window.clearTimeout(t);
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
      {/* ── HERO SECTION — REVOLUCIÓN ── */}
      <section className="relative overflow-hidden min-h-[100dvh] flex items-center bg-zinc-950">
        {/* Grid dot texture */}
        <div className="absolute inset-0 bg-grid-brand opacity-30 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-8 items-center">

            {/* LEFT: Text */}
            <div className="flex flex-col gap-7">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-emerald-500/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-emerald-400 w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Your fCAIO
              </motion.div>

              {/* MASSIVE heading */}
              <AnimatedGradientText as="h1" className="text-[clamp(3.2rem,9vw,7rem)]" delay={0.1}>
                Your<br />fCAIO.
              </AnimatedGradientText>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-lg"
              >
                Sin los costes de uno. Implanto la IA en tu negocio con impacto real en{' '}
                <span className="text-emerald-400 font-semibold">90 días</span>.
                1 día/semana. Resultados desde el día 1.
              </motion.p>

              {/* Authority block */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.35 }}
                className="grid sm:grid-cols-3 gap-2 max-w-2xl"
              >
                {[
                  '+10.700 contactos directivos en LinkedIn',
                  'PhD Cum Laude',
                  'MBA ESADE',
                ].map((cred) => (
                  <span key={cred} className="text-xs text-zinc-200 font-semibold bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                    {cred}
                  </span>
                ))}
              </motion.div>

              {/* CTAs — Magnetic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42 }}
                className="flex flex-col sm:flex-row items-start gap-4 pt-1"
              >
                <MagneticButton
                  onClick={goToReportFocus}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm shadow-2xl shadow-emerald-500/30"
                >
                  Informe gratuito
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton
                  onClick={() => setShowDemoModal(true)}
                  className="bg-white/6 hover:bg-white/12 text-white border border-white/15 font-semibold text-sm"
                >
                  Agenda demo
                </MagneticButton>
              </motion.div>
            </div>

            {/* RIGHT: Video in geometric mask */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center w-full h-[580px] animate-float"
            >
              <GeometricVideoMask videoSrc="/videoTonExecutiveAI/250328 Video sentado.mp4" />
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedHeroStats />

      {/* SOCIAL PROOF / TRUST BAR */}
      <section className="py-8 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-widest text-zinc-500 uppercase mb-6">
            {t.home.complianceTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{t.home.compliance1}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{t.home.compliance2}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>{t.home.compliance3}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-center rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-4 md:p-6 overflow-hidden">
            <div className="rounded-[1.5rem] overflow-hidden border border-zinc-700 h-56 md:h-64 bg-zinc-950 flex items-center justify-center">
              <img
                src="/250629 Oxfam_TonGuardiet_Marzo25_01.jpg"
                alt="Ton Guardiet acompañando decisiones estratégicas"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>
            <div className="px-2 md:px-4">
              <p className="text-xs font-black tracking-widest uppercase text-emerald-400 mb-3">Confianza Ejecutiva</p>
              <p className="text-zinc-200 text-lg leading-relaxed">
                Acompañamiento cercano, criterio técnico y ejecución enfocada en resultados medibles para comité y operaciones.
              </p>
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

      {/* ── SERVICIOS BENTO — IA EXPLICABLE ── */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="mb-14">
            <AnimatedGradientText as="h2" className="text-4xl md:text-6xl" delay={0}>
              {t.home.authoritySecurity.title}
            </AnimatedGradientText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base text-zinc-400 mt-4 max-w-xl"
            >
              {t.home.authoritySecurity.subtitle}
            </motion.p>
          </div>

          {/* BENTO GRID — services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">

            {/* Card 0 — Justification (tall, spans 2 rows on lg) */}
            <BentoCard className="lg:row-span-2 p-8 flex flex-col justify-between min-h-[260px]" delay={0}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-auto">
                <BookOpen className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="mt-8">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3">01</p>
                <h3 className="text-xl font-black text-white tracking-tight mb-3">
                  {t.home.authoritySecurity.blocks['justification' as keyof typeof t.home.authoritySecurity.blocks].title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t.home.authoritySecurity.blocks['justification' as keyof typeof t.home.authoritySecurity.blocks].desc}
                </p>
              </div>
            </BentoCard>

            {/* Card 1 — Anti-Hallucination */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={0.08} glowColor="rgba(6,182,212,0.2)">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="mt-6">
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3">02</p>
                <h3 className="text-xl font-black text-white tracking-tight mb-3">
                  {t.home.authoritySecurity.blocks['antiHallucination' as keyof typeof t.home.authoritySecurity.blocks].title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t.home.authoritySecurity.blocks['antiHallucination' as keyof typeof t.home.authoritySecurity.blocks].desc}
                </p>
              </div>
            </BentoCard>

            {/* Card 2 — Traceability */}
            <BentoCard className="p-8 flex flex-col justify-between" delay={0.14}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="mt-6">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3">03</p>
                <h3 className="text-xl font-black text-white tracking-tight mb-3">
                  {t.home.authoritySecurity.blocks['traceability' as keyof typeof t.home.authoritySecurity.blocks].title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t.home.authoritySecurity.blocks['traceability' as keyof typeof t.home.authoritySecurity.blocks].desc}
                </p>
              </div>
            </BentoCard>

            {/* Card 3 — Quote / paragraph, spans 2 cols */}
            <BentoCard className="md:col-span-1 lg:col-span-2 p-8 flex flex-col justify-between bento-glow" delay={0.2} glowColor="rgba(16,185,129,0.15)">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-emerald-500/30"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {t.home.authoritySecurity.verificationTag}
                </motion.div>
                {/* Scanning line */}
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
              </div>
              <blockquote className="border-l-2 border-emerald-500 pl-5 text-zinc-300 text-sm leading-relaxed font-medium italic mb-6">
                {t.home.authoritySecurity.paragraph}
              </blockquote>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t.home.authoritySecurity.tooltip}
              </div>
            </BentoCard>
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

      {(t as any).home?.weeklyContent && (
        <section id="contenido-semanal" className="py-24 bg-zinc-100/60 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                {(t as any).home.weeklyContent.title}
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {(t as any).home.weeklyContent.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-10">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 }}
                className="lg:col-span-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs font-black tracking-widest uppercase">
                    {(t as any).home.weeklyContent.videoBadge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mt-4 mb-3 leading-tight">
                    {(t as any).home.weeklyContent.videoTitle}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                    {(t as any).home.weeklyContent.videoDesc}
                  </p>
                  <div className="w-full h-56 md:h-72 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 relative overflow-hidden mb-5">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/30 via-zinc-900 to-black" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white/85" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                      {(t as any).home.weeklyContent.videoDuration}
                    </span>
                    <a
                      href="https://www.linkedin.com/in/tonguardiet/recent-activity/all/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A66C2] text-white text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      {(t as any).home.weeklyContent.videoCta} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="lg:col-span-1 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-6 md:p-7 flex flex-col"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-black tracking-widest uppercase w-fit">
                  {(t as any).home.weeklyContent.postBadge}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mt-4 mb-3 leading-tight">
                  {(t as any).home.weeklyContent.postTitle}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">
                  {(t as any).home.weeklyContent.postDesc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {((t as any).home.weeklyContent.postTags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/tonguardiet/recent-activity/all/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#0A66C2] dark:text-blue-400 hover:gap-3 transition-all"
                >
                  {(t as any).home.weeklyContent.postCta} <ArrowRight className="w-4 h-4" />
                </a>
              </motion.article>
            </div>

            <div className="text-center">
              <a
                href="https://www.linkedin.com/in/tonguardiet/recent-activity/all/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {(t as any).home.weeklyContent.sectionCta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {(t as any).home?.latestNoCommitmentItems && (
        <section className="py-10 bg-zinc-950/60 border-y border-zinc-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-black text-white mb-2">{(t as any).home.latestNoCommitmentTitle}</h3>
            <p className="text-zinc-400 text-sm mb-6">{(t as any).home.latestNoCommitmentDesc}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {((t as any).home.latestNoCommitmentItems || []).map((item: any, idx: number) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 hover:border-emerald-500/40 transition-all group"
                >
                  <p className="text-white font-bold mb-2">{item.title}</p>
                  <span className="text-emerald-400 text-sm font-semibold inline-flex items-center gap-2">
                    {item.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {(t as any).home?.funnelSteps && (
        <section className="py-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-black tracking-widest uppercase text-emerald-400 mb-4">
              {(t as any).home.funnelTitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {((t as any).home.funnelSteps || []).map((step: string, i: number) => (
                <div key={step} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-3 text-center">
                  <p className="text-[11px] font-black text-emerald-400 mb-1">Fase {i + 1}</p>
                  <p className="text-xs text-zinc-200 font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <EfficiencyCalculator t={t} />

      <section id="diagnostico" className="py-24 bg-[#0B1120] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black tracking-widest uppercase">
                {(t as any).home?.diagnostic?.badge || '🎁 GRATUITO · Sin compromiso'}
              </span>
              <h2 className="mt-5 text-3xl md:text-5xl font-black tracking-tight">
                {(t as any).home?.diagnostic?.title || '¿Dónde está tu empresa en la curva de adopción de IA?'}
              </h2>
              <p className="mt-5 text-zinc-300 leading-relaxed text-lg">
                {(t as any).home?.diagnostic?.subtitle || 'En 5 preguntas y 2 minutos, Ton analiza tu situación y te envía un informe personalizado de madurez agéntica y ROI potencial.'}
              </p>
              <div className="mt-8 space-y-3 text-sm text-zinc-300">
                {((t as any).home?.diagnostic?.includes || [
                  '✓ Evaluación de madurez IA (0-100)',
                  '✓ Top 3 quick wins para tu sector',
                  '✓ Estimación de ROI potencial en 90 días',
                  '✓ Revisión personal de Ton (si aplica)',
                ]).map((line: string) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mt-7 text-emerald-300 font-semibold">
                {(t as any).home?.diagnostic?.proof || 'Ya lo han recibido +50 directivos de empresas B2B'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-8"
            >
              {diagStatus === 'success' ? (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-black text-emerald-400 mb-3">¡Diagnóstico enviado!</h3>
                  <p className="text-zinc-300">Ton revisará tu caso en menos de 48h.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-zinc-400 mb-2">
                      <span>{diagnosisStep}/5</span>
                      <span>{Math.round((diagnosisStep / 5) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{ width: `${(diagnosisStep / 5) * 100}%` }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={diagnosisStep}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      className="space-y-4"
                    >
                      {diagnosisStep === 1 && (
                        <>
                          <p className="text-white font-bold">¿Cuántos empleados tiene tu empresa?</p>
                          {['1-10', '11-50', '51-250', '+250'].map((o) => (
                            <button key={o} onClick={() => setDiagEmployees(o)} className={`w-full text-left px-4 py-3 rounded-xl border transition ${diagEmployees === o ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-emerald-500/40'}`}>{o}</button>
                          ))}
                        </>
                      )}
                      {diagnosisStep === 2 && (
                        <>
                          <p className="text-white font-bold">¿Cuál es tu situación actual con la IA?</p>
                          {['No la usamos', 'ChatGPT puntual', 'Estrategia en marcha', 'Agentes desplegados'].map((o) => (
                            <button key={o} onClick={() => setDiagAiState(o)} className={`w-full text-left px-4 py-3 rounded-xl border transition ${diagAiState === o ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-emerald-500/40'}`}>{o}</button>
                          ))}
                        </>
                      )}
                      {diagnosisStep === 3 && (
                        <>
                          <p className="text-white font-bold">¿Cuál es tu mayor bloqueo?</p>
                          {['No sé por dónde empezar', 'Pilotos sin ROI', 'Falta talento', 'Resistencia del equipo'].map((o) => (
                            <button key={o} onClick={() => setDiagBlocker(o)} className={`w-full text-left px-4 py-3 rounded-xl border transition ${diagBlocker === o ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-emerald-500/40'}`}>{o}</button>
                          ))}
                        </>
                      )}
                      {diagnosisStep === 4 && (
                        <>
                          <p className="text-white font-bold">¿Tienes responsable de IA?</p>
                          {['No', 'Alguien parcialmente', 'CTO lo supervisa', 'Rol dedicado'].map((o) => (
                            <button key={o} onClick={() => setDiagOwner(o)} className={`w-full text-left px-4 py-3 rounded-xl border transition ${diagOwner === o ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-emerald-500/40'}`}>{o}</button>
                          ))}
                        </>
                      )}
                      {diagnosisStep === 5 && (
                        <>
                          <p className="text-white font-bold">Tus datos para enviar el informe</p>
                          <input value={diagEmail} onChange={(e) => setDiagEmail(e.target.value)} type="email" required placeholder="Email corporativo" className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-emerald-500" />
                          <input value={diagIdentity} onChange={(e) => setDiagIdentity(e.target.value)} type="text" required placeholder="Nombre y empresa" className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-emerald-500" />
                          <label className="flex items-start gap-3 text-sm text-zinc-300">
                            <input type="checkbox" checked={diagConsent} onChange={(e) => setDiagConsent(e.target.checked)} className="mt-1" />
                            <span>Acepto recibir el informe por email y la política de privacidad</span>
                          </label>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {diagStatus === 'error' && (
                    <p className="text-rose-300 text-sm mt-4">No se pudo enviar ahora mismo. Vuelve a intentarlo en unos minutos.</p>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setDiagnosisStep((s) => Math.max(1, s - 1))}
                      disabled={diagnosisStep === 1 || diagStatus === 'loading'}
                      className="px-4 py-2 rounded-lg text-zinc-300 disabled:opacity-40"
                    >
                      Anterior
                    </button>

                    {diagnosisStep < 5 ? (
                      <button
                        type="button"
                        onClick={() => setDiagnosisStep((s) => Math.min(5, s + 1))}
                        disabled={
                          (diagnosisStep === 1 && !diagEmployees) ||
                          (diagnosisStep === 2 && !diagAiState) ||
                          (diagnosisStep === 3 && !diagBlocker) ||
                          (diagnosisStep === 4 && !diagOwner)
                        }
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold disabled:opacity-40"
                      >
                        Siguiente
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          if (!diagEmail || !diagIdentity || !diagConsent) return;
                          setDiagStatus('loading');
                          try {
                            await supabase.from('diagnosticos').insert({
                              empleados: diagEmployees,
                              situacion_ia: diagAiState,
                              bloqueo: diagBlocker,
                              responsable_ia: diagOwner,
                              email: diagEmail,
                              identidad: diagIdentity,
                              consentimiento: diagConsent,
                              created_at: new Date().toISOString(),
                            });
                            setDiagStatus('success');
                          } catch (e) {
                            console.error(e);
                            setDiagStatus('error');
                          }
                        }}
                        disabled={!diagEmail || !diagIdentity || !diagConsent || diagStatus === 'loading'}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold disabled:opacity-40"
                      >
                        {diagStatus === 'loading' ? 'Enviando...' : 'Recibir mi diagnóstico gratuito →'}
                      </button>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );

  const AnimatedHeroStats = () => {
    const statsRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(statsRef, { once: true, margin: '-80px' });

    const linkedInCount = useCountUp(isInView ? 10729 : 0, 2200);
    const recommendations = useCountUp(isInView ? 40 : 0, 1800);
    const days = useCountUp(isInView ? 90 : 0, 1600);
    const arr = useCountUp(isInView ? 400 : 0, 2000);

    return (
      <section className="py-16 bg-zinc-950">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-black tracking-widest uppercase text-emerald-400 mb-2">
              Resultados que avalan a Ton
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Autoridad y tracción real en números
            </h3>
          </div>
          {/* Bento grid — desktop: 4 cols, 2 rows; mobile: 2 cols */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px] lg:auto-rows-[180px]">

            {/* Card 0 — LinkedIn: wide 2col */}
            <BentoCard className="col-span-2 lg:col-span-2 p-7 flex flex-col justify-between bento-glow" delay={0}>
              <Linkedin className="w-7 h-7 text-emerald-400/50" />
              <div>
                <p className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  {linkedInCount.toLocaleString('es-ES')}+
                </p>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mt-1">
                  Contactos directivos LinkedIn
                </p>
              </div>
            </BentoCard>

            {/* Card 1 — Recomendaciones */}
            <BentoCard className="col-span-1 p-7 flex flex-col justify-between" delay={0.08}>
              <Star className="w-6 h-6 text-emerald-400/50" />
              <div>
                <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">+{recommendations}</p>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mt-1">Recomend. C-Level</p>
              </div>
            </BentoCard>

            {/* Card 2 — Days */}
            <BentoCard className="col-span-1 p-7 flex flex-col justify-between" delay={0.14} glowColor="rgba(52,211,153,0.2)">
              <Clock className="w-6 h-6 text-emerald-400/50" />
              <div>
                <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">&lt;{days}d</p>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mt-1">Para resultados</p>
              </div>
            </BentoCard>

            {/* Card 3 — ARR: full width */}
            <BentoCard className="col-span-2 lg:col-span-4 p-7 flex items-center justify-between bento-glow" delay={0.2} glowColor="rgba(16,185,129,0.18)">
              <div>
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-2">ARR máximo logrado</p>
                <p className="text-5xl lg:text-7xl font-black text-white tracking-tighter">{arr}%</p>
              </div>
              <div className="hidden md:flex items-end gap-2 h-16">
                {[40, 55, 45, 70, 60, 85, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-4 rounded-t-sm bg-gradient-to-t from-emerald-600 to-emerald-400"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{ alignSelf: 'flex-end' }}
                  />
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>
    );
  };

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
    const ab = (t as any).about;

    const stats = [
      { label: 'Experiencia', value: '+20 Años', icon: <Briefcase className="w-5 h-5" />, color: 'bg-blue-600' },
      { label: 'Autoridad', value: '+40', sub: 'Recomendaciones C-Level', icon: <Star className="w-5 h-5 fill-current" />, color: 'bg-amber-500' },
      { label: 'Red', value: '+10.700', sub: 'Contactos directivos', icon: <Linkedin className="w-5 h-5" />, color: 'bg-[#0A66C2]' },
      { label: 'Casos', value: '8+', sub: 'Sectores con casos reales', icon: <Rocket className="w-5 h-5" />, color: 'bg-emerald-600' }
    ];

    return (
      <div className="py-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen overflow-hidden selection:bg-emerald-500/30">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Main Hero Bento Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
            
            {/* Main Bio Card (Ph.D + Intro) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-center ring-1 ring-zinc-200/50 dark:ring-white/5"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20">
                    Ph.D. CUM LAUDE
                  </span>
                  <span className="px-5 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-500/20">
                    MBA ESADE
                  </span>
                  <span className="px-5 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-black uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                    FRACTIONAL CAIO
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 mb-10">
                  <div className="sm:col-start-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 mb-2">{ab.positioning?.coreLabel || 'Posicion Core'}</p>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {(ab.positioning?.core || []).map((item: string) => (
                        <span key={item} className="px-2.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-500/30 whitespace-nowrap">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-start-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400 mb-2">{ab.positioning?.differentiationLabel || 'Diferenciacion'}</p>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {(ab.positioning?.differentiation || []).map((item: string) => (
                        <span key={item} className="px-2.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-[11px] font-bold border border-cyan-500/30 whitespace-nowrap">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-start-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-2">{ab.positioning?.impactLabel || 'Impacto'}</p>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {(ab.positioning?.impact || []).map((item: string) => (
                        <span key={item} className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-500/30 whitespace-nowrap">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-start-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400 mb-2">{ab.positioning?.purposeLabel || 'Proposito'}</p>
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {(ab.positioning?.purpose || []).map((item: string) => (
                        <span key={item} className="px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-bold border border-violet-500/30 whitespace-nowrap">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-7xl font-black text-zinc-950 dark:text-white mb-5 tracking-tighter leading-[0.9]">
                  {ab.title || 'El fCAIO que necesita tu empresa'}
                </h1>
                <h2 className="text-base md:text-xl font-semibold text-zinc-600 dark:text-zinc-300 mb-8 tracking-wide">
                  {ab.subtitle || 'PhD Cum Laude · MBA ESADE · +20 años en dirección de producto y estrategia de IA'}
                </h2>
                
                <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-10 max-w-2xl">
                  {ab.intro}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="https://www.linkedin.com/in/tonguardiet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#0A66C2] text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-500/20 font-bold group">
                    <Linkedin className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
                    Conectar
                  </a>
                  <a href={`tel:${(t as any).contact.phoneValue}`} className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 font-bold group">
                    <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {(t as any).contact.phoneValue}
                  </a>
                  <button onClick={() => setCurrentPage('contacto')} className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl font-bold group">
                    <Mail className="w-6 h-6 group-hover:-rotate-12 transition-transform" />
                    Iniciar Diagnóstico
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Profile Image Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-4 rounded-[2.5rem] overflow-hidden shadow-2xl relative group bg-zinc-100 dark:bg-zinc-900 border border-emerald-200/70 dark:border-emerald-500/30"
            >
              <div className="absolute inset-0 bg-emerald-400/15 dark:bg-emerald-500/10 blur-3xl scale-110 pointer-events-none"></div>
              <img 
                src="/250629 Oxfam_TonGuardiet_Marzo25_01.jpg"
                alt="Ton Guardiet, mentor en estrategia de IA"
                className="relative w-full h-full object-cover object-[center_20%] transition-all duration-700 scale-100 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"></div>
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-300/30 backdrop-blur-md text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Disponible para colaborar
                </span>
              </div>
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-white font-extrabold text-2xl tracking-tight">Ton Guardiet</p>
                <p className="text-emerald-200 font-semibold text-sm">Mentor en estrategia de IA y ejecución de alto impacto</p>
              </div>
            </motion.div>

          </div>

          {/* Professional Snapshot */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
              <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-widest px-4">Liderazgo en Contexto</h3>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 rounded-[2.5rem] overflow-hidden aspect-[16/10] relative group shadow-xl border-4 border-white dark:border-zinc-900"
              >
                <img
                  src="/250629 Oxfam_TonGuardiet_Marzo25_02.jpg"
                  alt="Ton Guardiet en sesión estratégica con equipo directivo"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg"
              >
                <p className="text-xs font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">Credibilidad Operativa</p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  La propuesta de Ton combina visión estratégica con implementación real: menos presentaciones, más impacto en negocio.
                </p>
                <button
                  onClick={() => setActiveQuote("No implemento herramientas, rediseño culturas ganadoras.")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-3 transition-all"
                >
                  Ver enfoque <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Key Stats Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-[2.5rem] shadow-xl text-center group"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform`}>
                  {stat.icon}
                </div>
                <h4 className="text-3xl font-black text-zinc-950 dark:text-white mb-1 tracking-tighter">{stat.value}</h4>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Deep Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-start">
            
            {/* Academic & Strategic Pillar */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-emerald-500/5 border border-emerald-500/20 p-10 rounded-[3rem] shadow-inner">
                  <GraduationCap className="w-10 h-10 text-emerald-500 mb-6" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">{ab.educationTitle || 'Formación de Alto Nivel'}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                    PhD Cum Laude especializado en plataformas de aceleración y MBA por ESADE. Una base académica sólida para liderar la transformación digital compleja.
                  </p>
               </div>
               <div className="bg-blue-500/5 border border-blue-500/20 p-10 rounded-[3rem] shadow-inner">
                  <LayoutGrid className="w-10 h-10 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Visión 360º</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                    Experiencia en Producto, Growth y Estrategia B2B en compañías como Quipu y Unibo. Entiendo el negocio desde adentro.
                  </p>
               </div>
               <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl">
                  <Quote className="w-10 h-10 text-emerald-500 mb-6" />
                  <p className="text-zinc-300 italic leading-relaxed text-lg mb-6">
                    "Mi pasión es la aceleración empresarial y la intraemprededuría corporativa. No implementamos solo tecnología, creamos cultura de crecimiento."
                  </p>
               </div>
            </div>

          </div>

          {/* Timeline Experience Section */}
          <div className="mb-32 relative">
            <h3 className="text-4xl font-black text-zinc-950 dark:text-white mb-16 text-center tracking-tighter">TRAYECTORIA DE <span className="text-emerald-500">ALTO IMPACTO</span></h3>
            
            <div className="space-y-12">
              {ab.experiences.map((exp: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-8 items-start group"
                >
                  <div className="md:w-1/4 pt-2">
                    <span className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-black text-zinc-500 uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                      {exp.period}
                    </span>
                  </div>
                  <div className="md:w-3/4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-10 rounded-[2.5rem] shadow-xl group-hover:border-emerald-500/30 transition-all relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-black text-zinc-950 dark:text-white mb-2 tracking-tight">{exp.role}</h4>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-6 text-sm uppercase tracking-widest">{exp.company}</p>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="contenido" className="mb-32">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-black text-zinc-950 dark:text-white tracking-tight mb-4">
                {(ab.contentStrategy?.title || 'Mi presencia en el ecosistema IA')}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                {(ab.contentStrategy?.subtitle || 'Contenido semanal con intención, no por cumplir.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(ab.contentStrategy?.cards || []).map((card: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white text-lg font-black mb-3">
                    {idx === 0 ? <PlayCircle className="w-5 h-5 text-rose-500" /> : idx === 1 ? <FileText className="w-5 h-5 text-blue-500" /> : <BrainCircuit className="w-5 h-5 text-emerald-500" />}
                    <span>{card.title}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">{card.desc}</p>
                  {card.href ? (
                    <a href={card.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-3 transition-all">
                      {card.cta} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button onClick={() => setCurrentPage('agente')} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-3 transition-all">
                      {card.cta} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-emerald-500/5 dark:bg-emerald-900/10 p-8 md:p-10">
              <p className="text-lg font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-6">
                {(ab.contentStrategy?.communitiesTitle || 'Comunidades donde publico')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(ab.contentStrategy?.communities || []).map((community: any, idx: number) => (
                  <div key={community?.name || idx} className="rounded-2xl border border-zinc-200/80 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center shrink-0">
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-800 dark:text-zinc-100">{community?.name || community}</p>
                        {community?.summary && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{community.summary}</p>
                        )}
                      </div>
                    </div>
                    {community?.members && (
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{community.members}</p>
                    )}
                    {community?.activity && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{community.activity}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Proof / LinkedIn Recommendations Badge */}
          <div className="bg-gradient-to-br from-zinc-900 to-black p-10 md:p-20 rounded-[4rem] text-center shadow-3xl relative overflow-hidden mb-32 border border-zinc-800">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase">{ab.recommendations.title}</h3>
              <p className="text-zinc-400 text-lg mb-16 max-w-2xl mx-auto">
                {ab.recommendations.subtitle}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {ab.recommendations.list.map((rec: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="bg-zinc-800/60 border border-zinc-700 p-8 rounded-[2rem] relative group"
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" />
                    <p className="text-zinc-300 italic mb-6 relative z-10 leading-relaxed text-sm md:text-base">
                      "{rec.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border border-emerald-300/30 shadow-lg shadow-emerald-500/30">
                        <span className="text-white text-sm font-black tracking-wide">
                          {rec.initials || 'TG'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm tracking-tight">{rec.author}</p>
                        <div className="flex gap-0.5 mt-1">
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-emerald-500 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    {ab.recommendations.verifiedLabel && (
                      <p className="mt-4 text-xs text-emerald-500 dark:text-emerald-400 font-medium">
                        {ab.recommendations.verifiedLabel}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
              {ab.recommendations.ctaLabel && ab.recommendations.ctaUrl && (
                <a
                  href={ab.recommendations.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {ab.recommendations.ctaLabel} →
                </a>
              )}
            </div>
          </div>

          {/* Inspiring Entities — 8 referencias estratégicas (solo list) */}
          {ab.inspiringEntities && (ab.inspiringEntities.list as any[] | undefined)?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 pb-40 overflow-hidden"
            >
              <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white mb-4 tracking-tight uppercase">
                  {ab.inspiringEntities.title}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  {ab.inspiringEntities.subtitle}
                </p>
                <div className="w-24 h-1.5 bg-emerald-500 mx-auto mt-8 rounded-full" />
              </div>

              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {(ab.inspiringEntities.list as any[]).map((entity: { name: string; logo: string | null; desc: string }, idx: number) => (
                    <motion.div
                      key={`entity-${entity.name}-${idx}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(idx * 0.05, 0.35) }}
                      className="flex flex-col h-full rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                    >
                      {entity.logo ? (
                        <div className="mb-4 h-[4.5rem] flex items-center justify-center">
                          <img
                            src={`/entidades/${entity.logo}`}
                            alt={entity.name}
                            className="max-h-14 w-auto max-w-[85%] object-contain dark:opacity-95"
                          />
                        </div>
                      ) : (
                        <div
                          className="mb-4 min-h-[4.5rem] w-full flex items-center justify-center gap-2.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-3.5"
                          role="img"
                          aria-label={entity.name}
                        >
                          <Globe className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                          <span className="text-left text-sm font-bold text-white leading-snug">
                            {entity.name}
                          </span>
                        </div>
                      )}
                      {!!entity.logo && (
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight mb-2 line-clamp-2">
                          {entity.name}
                        </h3>
                      )}
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-1 mt-auto">
                        {entity.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}

        </div>
      </div>
    );
  };


  const renderMetodologia = () => {
    const ml = (t as any).methodologyLanding || (translations as any).ES.methodologyLanding;
    const phaseIcons = [Compass, Target, Rocket, TrendingUp, Settings, GraduationCap];

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1D4ED8] dark:text-emerald-400 mb-6">
              {ml.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {ml.subtitle}
            </p>
          </div>

          <div className="mb-14 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 md:p-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-black tracking-widest uppercase mb-4">
              Plan de ejecución
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-2">{ml.phasesTitle}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{ml.phasesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {ml.phases.map((phase: any, i: number) => {
              const Icon = phaseIcons[i] || Compass;
              return (
                <motion.div
                  key={phase.month}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{phase.month}</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{phase.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{phase.deliverables}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mb-14 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-2">{ml.pricingTitle}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{ml.pricingSubtitle}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {ml.pricingOptions.map((option: any) => (
                <div key={option.name} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/70">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">{option.name}</p>
                  <h4 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">{option.monthly}</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 font-semibold">{option.total}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-14">
            <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 md:p-8">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">{ml.useCasesTitle}</h3>
              <ul className="space-y-3">
                {ml.useCases.map((useCase: string) => (
                  <li key={useCase} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 md:p-8">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">{ml.successConditionsTitle}</h3>
              <ul className="space-y-3">
                {ml.successConditions.map((condition: string) => (
                  <li key={condition} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderReportForm = () => {
    const rf = (t as any).reportForm || translations.ES.reportForm;
    if (!rf) return <div className="py-20 text-center">Loading form...</div>;
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      setStatus('loading');
      // Simulate API call
      setTimeout(() => setStatus('success'), 1500);
    };

    return (
      <div className="py-10 md:py-14 bg-zinc-950 min-h-screen">
        {!rf ? (
          <div className="text-center text-zinc-500">Loading translations...</div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-zinc-800/60 relative overflow-hidden"
            >
              {/* Contenido del formulario... */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <div className="relative z-10 text-center mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 mb-4">
                  Modo foco (5-10 min)
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-zinc-950 dark:text-white mb-6 tracking-tighter">
                  {rf.title}
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  {rf.subtitle}
                </p>
              </div>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                    <CheckCheck className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{rf.success}</h2>
                  <button onClick={() => setCurrentPage('home')} className="text-emerald-600 font-bold hover:underline">Volver al inicio</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.name}</label>
                      <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.email}</label>
                      <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-zinc-900 dark:text-white" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.company}</label>
                      <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.role}</label>
                      <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all text-zinc-900 dark:text-white" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.sector}</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer text-zinc-900 dark:text-white">
                        {rf.options.sectors.map((o: string) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.size}</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer text-zinc-900 dark:text-white">
                        {rf.options.sizes.map((o: string) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.aiState}</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer text-zinc-900 dark:text-white">
                      {rf.options.aiStates.map((o: string) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.goal}</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer text-zinc-900 dark:text-white">
                        {rf.options.goals.map((o: string) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">{rf.fields.interest}</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer text-zinc-900 dark:text-white">
                        {rf.options.interests.map((o: string) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-6 mt-8 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : rf.submit}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  const renderContacto = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
            <div className="relative">
              <img
                src="/2110 Foto Ton 6.jpg"
                alt="Ton Guardiet"
                className="w-full h-[360px] md:h-[460px] object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-2xl font-bold tracking-tight">Ton Guardiet</p>
                <p className="text-emerald-200 font-medium">Fractional Chief AI Officer</p>
              </div>
            </div>
            <div className="p-8 md:p-10 space-y-5">
              <p className="text-zinc-700 dark:text-zinc-300 font-semibold">Respondo en menos de 24h</p>
              <a href={`mailto:${t.contact.emailValue}`} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>{t.contact.emailValue}</span>
              </a>
              <a href={`tel:${t.contact.phoneValue}`} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span>{t.contact.phoneValue}</span>
              </a>
              <a href="https://www.linkedin.com/in/tonguardiet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Linkedin className="w-5 h-5 text-emerald-500" />
                <span>linkedin.com/in/tonguardiet</span>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
              Agenda una conversación directa
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              Déjame nombre, email y reto principal. Te respondo con próximos pasos claros.
            </p>

            <form className="space-y-7" onSubmit={handleContactSubmit}>
              {contactStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-xl text-center mb-6"
                >
                  <p className="text-red-800 font-medium">{contactErrorMessage}</p>
                </motion.div>
              )}

              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400"
                placeholder="Nombre"
              />

              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400"
                placeholder={t.contact.email}
              />

              <textarea
                required
                rows={5}
                value={contactComment}
                onChange={(e) => setContactComment(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] dark:bg-zinc-800 border-none text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all placeholder:text-zinc-400 resize-none"
                placeholder={t.contact.comment}
              />

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
                    onClick={() => { setCurrentPage('privacy'); window.scrollTo(0, 0); }}
                    className="text-[#1D4ED8] hover:underline font-medium"
                  >
                    {t.contact.privacyLink}
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={contactStatus === 'loading' || !contactPrivacy || contactCountdown > 0}
                className="w-full bg-[#10B981] hover:bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {contactStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t.contact.loading}
                  </>
                ) : contactCountdown > 0 ? (
                  (t.contact.wait || 'Espera {seconds} segundos...').replace('{seconds}', contactCountdown.toString())
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje a Ton
                  </>
                )}
              </button>

              {contactStatus === 'success' && (
                <p className="text-center text-green-600 font-medium animate-bounce">
                  {t.contact.success}
                </p>
              )}
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              {[
                '10.729 contactos en LinkedIn',
                '+40 recomendaciones C-Level',
                'Respuesta en < 24h'
              ].map((stat) => (
                <div key={stat} className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-center">
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200">{stat}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Agente CAIO Embedded Section */}
      <div className="w-full mt-12 mb-24 border-t border-zinc-200 dark:border-zinc-800 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-emerald-500">Agente CAIO</span>
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Interactúa con nuestro Chief AI Officer virtual para resolver cualquier duda al instante.
          </p>
        </div>
        <AgentCAIO
          onBookMeeting={() => setShowDemoModal(true)}
          onFreeDiagnosis={goToDiagnosis}
          showCompetitorTab={false}
          disableInitialAutoScroll={true}
        />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-xl md:max-w-2xl rounded-[2rem] md:rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-white via-zinc-50 to-emerald-50/40 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
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

            {/* Form */}
            <div className="p-6 md:p-10 relative">
              {showDemoConfetti && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="absolute left-[30%] top-[10%] h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping [animation-delay:120ms]" />
                  <span className="absolute left-[55%] top-[16%] h-2 w-2 rounded-full bg-blue-400 animate-ping [animation-delay:220ms]" />
                  <span className="absolute left-[75%] top-[12%] h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping [animation-delay:320ms]" />
                  <span className="absolute left-[88%] top-[24%] h-2 w-2 rounded-full bg-lime-400 animate-ping [animation-delay:420ms]" />
                </div>
              )}
              <div className="max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
                  Sesion estratégica
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1D4ED8] mb-3">
                  Agenda Demo
                </h2>
                <p className="text-zinc-600 mb-7 leading-relaxed">
                  Cuéntame tu contexto y preparamos una sesión enfocada a tu reto real de IA.
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
                    <p className="text-green-800 font-bold text-xl mb-2">¡Perfecto, {demoSubmittedName || 'gracias'}! Ton te contactará en menos de 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700 ml-1">
                        Nombre
                      </label>
                      <input
                        required
                        type="text"
                        value={demoFullName}
                        onChange={(e) => setDemoFullName(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/70 border border-zinc-200 focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900"
                      />
                      </div>
                      <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700 ml-1">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/70 border border-zinc-200 focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900"
                      />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700 ml-1">
                        ¿Cuál es tu mayor reto con IA ahora mismo?
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={demoChallenge}
                        onChange={(e) => setDemoChallenge(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/70 border border-zinc-200 focus:bg-white focus:border-[#1D4ED8] focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-zinc-900 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button 
                        disabled={demoStatus === 'loading'}
                        type="submit"
                        className="w-full bg-[#10B981] text-white py-4 rounded-2xl font-bold text-lg md:text-xl hover:bg-[#059669] transition-all duration-300 shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {demoStatus === 'loading' ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            {t.contact.loading}
                          </>
                        ) : (
                          'Reservar mi demo gratuita →'
                        )}
                      </button>
                      <p className="text-xs text-zinc-500 text-center mt-2">
                        Sin compromiso · 30 min · Zoom o presencial
                      </p>
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

  const renderNoticias = () => {
    const news = (t as any).newsPage;
    if (!news) return null;
    const storyTags = [
      'Todos',
      'AI Strategy',
      'Agentic AI',
      'ROI Impact',
      'AI Automation',
      'AI Audit',
      'AI Training',
      'AI Architecture'
    ];

    const looksAnonymous = (c: string) => /\b(Anónimo|anònim|anonymous)\b/i.test(c || '');

    const allStories = (news.successStories.stories || []).map((story: any) => ({
      ...story,
      company: looksAnonymous(story.company) ? story.company : `${story.company} (Anónimo)`,
      tag: story.tag || (story.type === 'caio' ? 'AI Strategy' : 'Agentic AI'),
      keyResult: story.keyResult || '—',
    }));
    const filteredStories = activeStoryTag === 'Todos'
      ? allStories
      : allStories.filter((story: any) => story.tag === activeStoryTag);
    const trendCategories = news.trends?.categories || [];
    const selectedTrendCategory =
      activeTrendCategory === 'Todas'
        ? null
        : trendCategories.find((category: any) => category.name === activeTrendCategory) || trendCategories[0];
    const isExternalUrl = (value?: string) => {
      if (!value) return false;
      try {
        const parsed = new URL(value);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
      } catch {
        return false;
      }
    };
    const trendDisplayItems =
      activeTrendCategory === 'Todas'
        ? [
            ...(news.trends?.items || []),
            ...trendCategories.flatMap((category: any) => category.items || [])
          ]
        : [
            ...(selectedTrendCategory?.items || []),
            ...(news.trends?.items || []).filter(
              (i: { categoryName?: string }) => i.categoryName === selectedTrendCategory?.name
            )
          ];

    return (
      <div className="py-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
        {/* Hero Section */}
        <div className="bg-[#1D4ED8] dark:bg-emerald-900 py-20 px-4 sm:px-6 lg:px-8 text-center -mt-20 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto pt-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {news.hero.title}
            </h1>
            <p className="text-xl text-blue-100 dark:text-emerald-100/80 leading-relaxed font-light">
              {news.hero.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Casos de Éxito - CAIO & Fractional */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold tracking-wide uppercase text-sm mb-4">
                <Target className="w-4 h-4" /> Casos de Éxito
              </span>
              <div className="grid md:grid-cols-2 gap-12 mt-8 text-left">
                {/* CAIO */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">{news.successStories.caioTitle}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-8">{news.successStories.caioSubtitle}</p>
                </div>
                {/* Fractional */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">{news.successStories.fractionalTitle}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-8">{news.successStories.fractionalSubtitle}</p>
                </div>
              </div>
            </div>

            <div className="mb-12 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg bg-zinc-900">
              <img
                src={news.successStories.sectionBanner}
                alt=""
                className="w-full h-[320px] md:h-[380px] object-cover object-center"
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {storyTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveStoryTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide border transition-all ${
                    activeStoryTag === tag
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredStories.map((story: any, idx: number) => (
                  <motion.div
                    layout
                    key={story.id || `${story.title}-${story.company}-${idx}`}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="bg-white dark:bg-zinc-800 rounded-[2rem] border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={story.image}
                        alt={story.company}
                        className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-emerald-500/95 backdrop-blur text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {story.tag}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-4 gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide">{story.company}</span>
                        <span className="text-zinc-400 dark:text-zinc-500 text-xs font-medium whitespace-nowrap">{story.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                        {story.desc}
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-6">
                        {news.successStories.keyResultLabel}: <span className="font-extrabold">{story.keyResult}</span>
                      </p>
                      <button onClick={() => setSelectedStory(story)} className="mt-auto text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        {news.successStories.readMore} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Línea Separadora */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent mb-24"></div>

          {/* Tendencias y Mercado Laboral */}
          <div>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-bold tracking-wide uppercase text-sm mb-4">
                <Activity className="w-4 h-4" /> Insights
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-6">
                {news.trends.title}
              </h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                {news.trends.subtitle}
              </p>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto text-center leading-relaxed mb-10">
              {news.trends.intro}
            </p>

            <div className="mb-8 -mx-2 px-2 overflow-x-auto">
              <div className="flex gap-3 min-w-max">
                <button
                  onClick={() => setActiveTrendCategory('Todas')}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold border transition-all ${
                    activeTrendCategory === 'Todas'
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  Todas
                </button>
                {trendCategories.map((category: any) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveTrendCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold border transition-all ${
                      activeTrendCategory === category.name
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25'
                        : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {trendDisplayItems.map((trend: any, idx: number) => (
                  <motion.div
                    layout
                    key={`${activeTrendCategory || 'trends'}-${trend.title}-${idx}`}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    className="bg-white dark:bg-zinc-800/80 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-6 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                        {trend.tag || selectedTrendCategory?.name}
                      </span>
                      <span className="text-zinc-400 text-xs font-medium">
                        {trend.date}
                      </span>
                      {trend.source && (
                        <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                          {trend.source}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                      {trend.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {trend.summary}
                    </p>
                    <div className="mt-auto">
                      {isExternalUrl(trend.link) ? (
                        <a
                          href={trend.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#1D4ED8] dark:text-blue-400 font-bold text-sm hover:gap-3 transition-all"
                        >
                          {news.trends.readAnalysis} <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-zinc-400 dark:text-zinc-500 font-bold text-sm cursor-not-allowed">
                          {news.trends.readAnalysis}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderStoryModal = () => {
    const newsPage = (t as any).newsPage;
    const sMod = newsPage?.successStories;
    const caseModal = sMod?.caseModal;
    return (
    <AnimatePresence>
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
            className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl h-[min(90vh,920px)] rounded-2xl overflow-hidden shadow-2xl flex flex-col border ${
              selectedStory.details
                ? 'bg-zinc-950 border-zinc-800'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
            } shadow-black/40`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedStory(null);
              }}
              className={`absolute top-4 right-4 z-50 p-2.5 rounded-full transition-all active:scale-90 ${
                selectedStory.details
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-emerald-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {selectedStory.details ? (
              <div className="w-full h-full overflow-y-auto p-6 md:p-10 text-zinc-200">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 font-bold tracking-wide uppercase">
                    {selectedStory.tag}
                  </span>
                  {selectedStory.company && <span className="font-medium text-zinc-400">{selectedStory.company}</span>}
                  {selectedStory.date && <span className="text-zinc-500">{selectedStory.date}</span>}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight pr-10">
                  {selectedStory.title}
                </h2>
                {selectedStory.role && (
                  <p className="text-sm text-emerald-500/90 font-bold mb-4 uppercase tracking-wider">{selectedStory.role}</p>
                )}
                {selectedStory.image && (
                  <div className="w-full aspect-[16/9] max-h-56 md:max-h-64 rounded-xl overflow-hidden mb-6 border border-zinc-800 ring-1 ring-zinc-800/80">
                    <img src={selectedStory.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8 border-b border-zinc-800/80 pb-6">
                  {selectedStory.desc}
                </p>

                <div className="space-y-8">
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-emerald-500">
                      <Building2 className="w-5 h-5 shrink-0" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">{caseModal?.context}</h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{selectedStory.details.context}</p>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-3 text-emerald-500">
                      <ListChecks className="w-5 h-5 shrink-0" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">{caseModal?.whatTonDid}</h3>
                    </div>
                    <ul className="space-y-2.5 pl-0">
                      {selectedStory.details.actions.map((a: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-snug">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-3 text-emerald-500">
                      <BarChart3 className="w-5 h-5 shrink-0" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">{caseModal?.results}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedStory.details.results.map(
                        (r: { value: string; label: string }, i: number) => (
                          <div
                            key={i}
                            className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-center"
                          >
                            <p className="text-xl md:text-2xl font-black text-emerald-400 leading-none mb-1.5">
                              {r.value}
                            </p>
                            <p className="text-[11px] md:text-xs text-zinc-500 leading-tight font-medium">
                              {r.label}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </section>

                  <section className="rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-5">
                    <div className="flex items-center gap-2 mb-3 text-emerald-500/80">
                      <Quote className="w-4 h-4" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{caseModal?.testimonial}</h3>
                    </div>
                    <p className="text-zinc-200 italic text-sm leading-relaxed mb-3 border-l-2 border-emerald-500/50 pl-4">
                      {selectedStory.details.testimonial.quote}
                    </p>
                    <p className="text-xs text-zinc-500 font-bold tracking-wide pl-1">
                      {selectedStory.details.testimonial.author}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-3 text-emerald-500">
                      <Tag className="w-4 h-4" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">{caseModal?.stack}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.details.techTags.map((tt: string) => (
                        <span
                          key={tt}
                          className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300"
                        >
                          {tt}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto p-6 md:p-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold tracking-wide text-xs mb-6 uppercase">
                  {selectedStory.tag || 'Insight'}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                  {selectedStory.title}
                </h2>
                {selectedStory.date && (
                  <p className="text-sm text-zinc-500 mb-6">{selectedStory.date}</p>
                )}
                <div className="prose prose-sm md:prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                  <p className="leading-relaxed text-base md:text-lg">{selectedStory.desc || selectedStory.summary}</p>
                  <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-5 text-sm md:text-base text-emerald-800 dark:text-emerald-200 leading-relaxed not-prose">
                    <span className="font-bold block mb-2 text-emerald-800/90 dark:text-emerald-300/90">
                      {sMod?.insightsTitle}:
                    </span>
                    {sMod?.insightsDesc}
                  </div>
                  {selectedStory.link && (
                    <a
                      href={selectedStory.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 bg-[#1D4ED8] hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-bold"
                    >
                      {newsPage.readExternal} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
  };

  const pageSeo = (() => {
    if (currentPage === 'sobre-mi') {
      return {
        title: 'Ton Guardiet — Fractional CAIO | TonExecutive.ai',
        description: 'PhD Cum Laude, MBA ESADE. +20 años liderando producto y estrategia IA en empresas B2B. Conoce la metodología fCAIO.',
        keywords: 'ton guardiet, fractional chief ai officer, fcaio, estrategia ia b2b, chief ai officer barcelona'
      };
    }

    if (currentPage === 'noticias') {
      return {
        title: 'Casos de Éxito — fCAIO en acción | TonExecutive.ai',
        description: 'Casos reales de implementación de IA en empresas: reducción de costes, automatización y escalado. Sin teoría, solo resultados.',
        keywords: 'casos de exito ia, fractional caio casos, automatizacion empresa, roi ia b2b'
      };
    }

    if (currentPage === 'contacto') {
      return {
        title: 'Agenda tu Diagnóstico de IA Gratuito | TonExecutive.ai',
        description: '30 minutos para evaluar el potencial de IA en tu empresa. Sin compromiso. Ton Guardiet, Fractional Chief AI Officer.',
        keywords: 'diagnostico ia gratuito, agenda demo ia, contratar chief ai officer externo, consultor ia empresa'
      };
    }

    return {
      title: 'Fractional Chief AI Officer | TonExecutive.ai Barcelona',
      description: 'Ton Guardiet, fCAIO. Implanta IA en tu empresa B2B en 90 días. 1 día/semana. Diagnóstico gratuito.',
      keywords: 'fractional chief ai officer, CAIO externo, consultor IA empresa, chief ai officer España'
    };
  })();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ton Guardiet',
    jobTitle: 'Fractional Chief AI Officer',
    url: 'https://tonexecutive.ai/',
    sameAs: ['https://www.linkedin.com/in/tonguardiet/']
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TonExecutive.ai',
    url: 'https://tonexecutive.ai/',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barcelona',
      addressCountry: 'ES'
    }
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fractional CAIO Services',
    serviceType: 'Fractional Chief AI Officer',
    provider: {
      '@type': 'Organization',
      name: 'TonExecutive.ai',
      url: 'https://tonexecutive.ai/'
    },
    areaServed: 'ES'
  };

  const isFocusMode = currentPage === 'informe';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-300 selection:bg-green-200 dark:selection:bg-green-900 flex flex-col">
      {!isFocusMode && <OrbCanvas />}
      <Helmet>
        <title>{pageSeo.title}</title>
        <meta name="description" content={pageSeo.description} />
        <meta name="keywords" content={pageSeo.keywords} />
        <meta name="robots" content="index, follow, max-snippet:-1" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      
      {/* NAVBAR */}
      {!isFocusMode && <nav
        className={`sticky top-0 z-50 w-full backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-zinc-950/95 shadow-sm'
            : 'bg-white/80 dark:bg-zinc-950/80'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <div className={`transition-transform duration-300 ${scrolled ? 'scale-[0.94]' : 'scale-100'} origin-left`}>
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center ml-12 gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            <button onClick={() => setCurrentPage('home')} className={`relative whitespace-nowrap hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors pb-1 ${currentPage === 'home' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.home}{currentPage === 'home' && (<motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />)}</button>
            <button onClick={() => setCurrentPage('sobre-mi')} className={`relative whitespace-nowrap hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors pb-1 ${currentPage === 'sobre-mi' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{(t.nav as any).about || 'Sobre Mí'}{currentPage === 'sobre-mi' && (<motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />)}</button>
            <button onClick={() => setCurrentPage('metodologia')} className={`relative whitespace-nowrap hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors pb-1 ${currentPage === 'metodologia' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.methodology}{currentPage === 'metodologia' && (<motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />)}</button>
            <button onClick={() => setCurrentPage('noticias')} className={`relative whitespace-nowrap hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors pb-1 ${currentPage === 'noticias' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{(t.nav as any).news || 'Casos de Éxito'}{currentPage === 'noticias' && (<motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />)}</button>
            <button onClick={() => setCurrentPage('contacto')} className={`relative whitespace-nowrap hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors pb-1 ${currentPage === 'contacto' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.nav.contact}{currentPage === 'contacto' && (<motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />)}</button>
          </div>

          <div className="flex items-center ml-8 gap-4">
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
              onClick={goToReportFocus}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              {t.nav.login || 'Acceder'}
            </button>
          </div>
        </div>
      </nav>}

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'noticias' && renderNoticias()}
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
        {currentPage === 'informe' && renderReportForm()}
        {currentPage === 'tecnico-contratacion' && (
          <TecnicoContratacion 
            t={t} 
            onBookDemo={() => setShowDemoModal(true)} 
          />
        )}
        {currentPage === 'agente' && (
          <AgentCAIO
            onBookMeeting={() => setShowDemoModal(true)}
            onFreeDiagnosis={goToDiagnosis}
          />
        )}
      </main>

      {/* FOOTER */}
      {!isFocusMode && <footer className="bg-zinc-950 py-12 border-t border-zinc-800 mt-auto">
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
      </footer>}
      {!isFocusMode && renderDemoModal()}
      {!isFocusMode && renderStoryModal()}
      
      {/* Quote Overlay */}
      <AnimatePresence>
        {activeQuote && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveQuote(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] shadow-2xl border border-emerald-500/20 max-w-2xl text-center relative"
            >
              <button className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600"><X className="w-6 h-6" /></button>
              <Quote className="w-12 h-12 text-emerald-500/20 mx-auto mb-6" />
              <p className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight italic tracking-tight">
                "{activeQuote}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">T</div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest text-xs">Ton Guardiet</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {!isFocusMode && <WhatsAppChat />}
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
