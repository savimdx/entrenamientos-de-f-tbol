import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  Trophy,
  ShieldCheck,
  Clock,
  BookOpen,
  Sparkles,
  Download,
  Check,
  Plus,
  Minus,
  HelpCircle,
  Lock,
  Flame,
  Award,
  TrendingUp,
  Smile,
  ShieldAlert,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Custom components
import HeaderBanner from './components/HeaderBanner';
import PurchaseModal from './components/PurchaseModal';
import NotificationToast from './components/NotificationToast';

// Static Data
import {
  HERO_BULLETS,
  RECEIVE_CARDS,
  BENEFITS,
  BONUSES,
  TESTIMONIALS,
  FAQS
} from './data';

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Ignored
    }
  }
};

const PRODUCT_IMAGES = [
  "https://i.postimg.cc/bwF1v7Xq/Screenshot-20260629-155455-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/4xFp3DCx/Screenshot-20260629-155510-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/L80jscd6/Screenshot-20260629-155544-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/Bnw2vrWv/Screenshot-20260629-155603-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/XYD9vRMq/Screenshot-20260629-155646-Adobe-Acrobat.jpg"
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes in seconds

  useEffect(() => {
    const storedTime = safeLocalStorage.getItem('urgency_timer_30m');
    const now = Math.floor(Date.now() / 1000);
    
    if (storedTime) {
      const expiration = parseInt(storedTime, 10);
      const remaining = expiration - now;
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        const newExpiration = now + 1800;
        safeLocalStorage.setItem('urgency_timer_30m', newExpiration.toString());
        setTimeLeft(1800);
      }
    } else {
      const newExpiration = now + 1800;
      safeLocalStorage.setItem('urgency_timer_30m', newExpiration.toString());
      setTimeLeft(1800);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const now = Math.floor(Date.now() / 1000);
          safeLocalStorage.setItem('urgency_timer_30m', (now + 1800).toString());
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    // If we're clicking to open checkout
    e.preventDefault();
    setIsModalOpen(true);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* SECCIÓN O: Sticky Countdown Banner */}
      <HeaderBanner timeLeft={timeLeft} />

      {/* Background soccer pitch abstract shapes overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/30 via-white to-white pointer-events-none -z-10" />

      {/* --- SECCIÓN 1: HERO --- */}
      <header className="relative py-8 md:py-14 lg:py-16 px-4 border-b border-slate-100 overflow-hidden">
        {/* Subtle glowing lights */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
          
          {/* Urgent Tagline */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 
            Biblioteca Digital Premium 2026
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none">
            +1000 Sesiones de <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600">
              Entrenamientos de Fútbol
            </span> <br />
            Listas para Aplicar
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Ahorra horas de planificación y mejora el rendimiento de tus jugadores con más de 1000 sesiones, ejercicios y metodologías estructuradas listas para usar hoy mismo.
          </p>

          {/* User Requested Image */}
          <div className="my-4 flex justify-center">
            <img 
              src="https://i.ibb.co/C54MLCH6/Chat-GPT-Image-17-de-jun-de-2026-10-01-30-removebg-preview.png" 
              alt="Chat-GPT-Image-17-de-jun-de-2026-10-01-30" 
              className="max-w-full sm:max-w-xl h-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Credibility checklist bullets */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left pt-2">
            {HERO_BULLETS.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>



        </div>
      </header>


      {/* --- SECCIÓN 2: ¿QUÉ VAS A RECIBIR? --- */}
      <section className="py-10 md:py-12 px-4 bg-slate-50/40 relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              Biblioteca Completa
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              ¿Qué recibirás al registrarte hoy?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un repertorio infinito de ejercicios y planificación futbolística detallada, diseñado meticulosamente por entrenadores federados para llevar tu juego al siguiente nivel.
            </p>
          </div>

          {/* Grid of 6 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECEIVE_CARDS.map((card, idx) => (
              <div
                key={card.id}
                className="bg-white border border-slate-200 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between items-center text-center group relative overflow-hidden"
              >
                {/* Visual Accent glow line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col items-center w-full">
                  {/* Tag on top */}
                  <div className="flex justify-center items-center mb-5 w-full">
                    <span className={`text-[8px] px-2.5 py-1 rounded font-black uppercase tracking-wider border ${card.accent}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 w-full flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-mono font-bold">
                  <span>✓</span> <span>CONTENIDO COMPROBADO</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- SECCIÓN 3: ¿POR QUÉ NUESTRO MÉTODO ES EL MEJOR? (Transformation) --- */}
      <section className="py-10 md:py-12 px-4 border-t border-b border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box (Text & Hook) */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
                La Transformación Real
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                La diferencia entre un entrenador improvisado y uno profesional
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                El 92% de los entrenadores pierden hasta 6 horas semanales buscando ejercicios sueltos en internet. Con este manual estructurado, tendrás un método científico que mejora el desempeño táctico desde el primer día.
              </p>

              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-3 max-w-sm mx-auto lg:mx-0">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  🏅
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800">Avalado por Profesionales</p>
                  <p className="text-[10px] text-slate-500">Creado con directores metodológicos de academias federadas.</p>
                </div>
              </div>
            </div>

            {/* Right Box (Benefits grid list) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((benefit, idx) => (
                <div key={benefit.id} className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-bold font-mono mb-3">
                      0{idx + 1}
                    </div>
                    <h4 className="text-sm font-black text-slate-800 tracking-tight">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-normal">
                      {benefit.description}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-[9px] text-emerald-600 font-mono font-semibold">
                    <TrendingUp className="w-3 h-3" /> PRÁCTICO E INMEDIATO
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>



      {/* --- SECCIÓN 4: BONOS EXCLUSIVOS (SOLO HOY) --- */}
      <section className="py-10 md:py-12 px-4 bg-gradient-to-b from-white to-emerald-50/20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest font-mono shadow-md">
              <Flame className="w-3.5 h-3.5 fill-current" /> SÚPER REGALOS DE ACCESO INMEDIATO
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Recibe hoy estos 5 Bonos Exclusivos (100% Gratis)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Solo por adquirir la biblioteca de entrenamientos el día de hoy, te llevas de regalo cinco manuales metodológicos adicionales valorados en <strong className="text-amber-600">$153.00 USD</strong>.
            </p>
          </div>

          {/* Bonuses layout */}
          <div className="flex flex-wrap justify-center gap-8">
            {BONUSES.map((bonus) => (
              <div
                key={bonus.id}
                className="bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between p-5 relative group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)]"
              >
                <div>
                  {/* Image container on top */}
                  {bonus.image ? (
                    <div className="flex items-center justify-center mb-5 h-[320px] overflow-hidden">
                      <img 
                        src={bonus.image} 
                        alt={bonus.title} 
                        className="max-h-full w-auto object-contain transform transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center mb-5 h-[240px] text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner mb-3">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-600 font-bold uppercase mb-1">
                        MANUAL METODOLÓGICO #{bonus.number}
                      </span>
                      <span className="text-xs text-slate-500 max-w-[180px] leading-snug">
                        Guía interactiva digital lista para usar
                      </span>
                    </div>
                  )}

                  {/* Title and Badge Row */}
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-1">
                      {bonus.number}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-snug">
                      {bonus.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-3 pl-0">
                    {bonus.description}
                  </p>
                </div>

                {/* Pricing / original value breakdown in footer */}
                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold tracking-wider uppercase font-sans">VALOR ORIGINAL</span>
                    <span className="text-sm font-bold text-red-500 line-through">${bonus.originalPrice} USD</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-600 block font-bold tracking-wider uppercase font-sans">HOY PARA TI</span>
                    <span className="text-base font-extrabold text-emerald-600 uppercase tracking-tight">¡GRATIS!</span>
                  </div>
                </div>
              </div>
            ))}
          </div>



        </div>
      </section>


      {/* --- SECCIÓN 6: MUESTRA DEL PRODUCTO (PRODUCT SAMPLES) --- */}
      <section className="py-10 md:py-12 px-4 bg-[#f8fafc] border-t border-b border-slate-100 overflow-hidden" id="muestra">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-widest font-mono shadow-sm">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>MUESTRA DEL PRODUCTO</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-center text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            Echa un Vistazo por <span className="text-emerald-600">Dentro del Material</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
            Visualiza en primicia la calidad excepcional, la maquetación profesional y el contenido detallado de las sesiones que transformarán tus entrenamientos.
          </p>

          {/* Infinite Scroll Area */}
          <div className="relative overflow-hidden w-full py-4">
            {/* Gradient overlay left/right for elegant fades */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First track */}
              <div className="flex gap-6">
                {PRODUCT_IMAGES.map((imgUrl, idx) => (
                  <div
                    key={`track1-${idx}`}
                    className="w-[240px] sm:w-[320px] h-[340px] sm:h-[450px] shrink-0 border border-slate-200/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden bg-white transition-all duration-300 transform hover:-translate-y-1.5 flex items-center justify-center p-2"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Página de muestra ${idx + 1}`} 
                      className="w-full h-full object-contain bg-white rounded-lg select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate track for seamless infinite scroll */}
              <div className="flex gap-6">
                {PRODUCT_IMAGES.map((imgUrl, idx) => (
                  <div
                    key={`track2-${idx}`}
                    className="w-[240px] sm:w-[320px] h-[340px] sm:h-[450px] shrink-0 border border-slate-200/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden bg-white transition-all duration-300 transform hover:-translate-y-1.5 flex items-center justify-center p-2"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Página de muestra ${idx + 1} - copia`} 
                      className="w-full h-full object-contain bg-white rounded-lg select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>


      {/* --- SECCIÓN 7: TESTIMONIOS (PRUEBA SOCIAL) --- */}
      <section className="py-10 md:py-12 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              Comunidad de Éxito
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Testimonios reales de entrenadores transformados
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Únete a cientos de entrenadores que están implementando esta biblioteca de entrenamientos con gran éxito.
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="relative overflow-hidden w-full py-4">
            {/* Gradient overlay left/right for elegant fades */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First track */}
              <div className="flex gap-6">
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={`track1-${testimonial.id}`}
                    className="w-[280px] sm:w-[350px] shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between relative shadow-md"
                  >
                    <div>
                      {/* Star Rating */}
                      <div className="flex gap-1 mb-4 text-amber-400">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Profile detail */}
                    <div className="border-t border-slate-200 pt-4 mt-6 flex items-center gap-3">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover border border-emerald-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-600 font-mono text-sm">
                          {testimonial.name[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{testimonial.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{testimonial.role}</p>
                        <span className="inline-block bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded mt-1">
                          {testimonial.achievement}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate track for seamless infinite scroll */}
              <div className="flex gap-6">
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={`track2-${testimonial.id}`}
                    className="w-[280px] sm:w-[350px] shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between relative shadow-md"
                  >
                    <div>
                      {/* Star Rating */}
                      <div className="flex gap-1 mb-4 text-amber-400">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Profile detail */}
                    <div className="border-t border-slate-200 pt-4 mt-6 flex items-center gap-3">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover border border-emerald-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-600 font-mono text-sm">
                          {testimonial.name[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{testimonial.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{testimonial.role}</p>
                        <span className="inline-block bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded mt-1">
                          {testimonial.achievement}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* --- SECCIÓN 5: OFERTA ESPECIAL (Special pricing pitch) --- */}
      <section id="oferta" className="py-10 md:py-12 px-4 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* 1. Urgency timer as a red badge centered above the title */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#e10606] text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_24px_rgba(225,6,6,0.25)] select-none">
              <Clock className="w-5 h-5 text-white shrink-0" />
              <span className="flex items-center gap-2">
                <span>¡Atención! Esta oferta expira en:</span>
                <span className="font-mono bg-black/20 px-2 py-0.5 rounded text-white font-black min-w-[4.5rem] text-center tracking-wider tabular-nums inline-block">
                  {formatTime(timeLeft)}
                </span>
              </span>
            </div>
          </div>

          {/* 2. Main section title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight max-w-2xl mx-auto mb-6 text-center tracking-tight">
            ¡Elige hoy mismo el plan de entrenamiento más completo del mercado!
          </h2>

          {/* 3. The card with orange border */}
          <div className="bg-white border-2 border-orange-500 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(249,115,22,0.12)] relative">
            
            {/* OFERTA ESPECIAL overlap badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-black text-[10px] sm:text-xs uppercase px-5 py-1.5 rounded-full tracking-widest shadow-md">
              OFERTA ESPECIAL
            </div>

            <div className="text-center space-y-1 mb-8 pt-4">
              <h3 className="text-2xl sm:text-3xl font-black text-orange-600 uppercase tracking-wide">
                PLAN PREMIUM COMPLETO
              </h3>
              <p className="text-xs sm:text-sm text-orange-500 font-semibold italic">
                Producto principal + 5 bonificaciones tácticas exclusivas
              </p>
            </div>

            {/* Product image */}
            <div className="flex justify-center mb-8">
              <img
                src="https://i.postimg.cc/J0p6ppg1/Chat-GPT-Image-17-de-jun-de-2026-10-01-30-removebg-preview.png"
                alt="Pack Metodológico Fútbol"
                referrerPolicy="no-referrer"
                className="max-w-xs sm:max-w-sm h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Checklist of what is included */}
            <div className="max-w-md mx-auto space-y-3.5 mb-8 text-left text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>+1000 Sesiones de Entrenamientos de Fútbol</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bono 1: 100 Ejercicios para Desarrollar la Velocidad en el Fútbol (Valorizado en $29)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bono 2: 100 Ejercicios con Balón para Desarrollar la Resistencia (Valorizado en $35)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bono 3: 60 Ejercicios Físicos con Sólo un Pequeño Equipamiento (Valorizado en $24)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bono 4: 50 Ejercicios Físicos con Balón en Fútbol (Valorizado en $20)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Bono 5: Manual Completo de Entrenamientos de Fútbol (Valorizado en $45)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Acceso prioritario 24/7 a soporte técnico premium</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Acceso vitalicio de por vida a la bóveda VIP de recursos</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Actualizaciones gratuitas</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 shrink-0 stroke-[3.5] mt-0.5" />
                <span>Garantía de 7 días</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-slate-100 max-w-md mx-auto my-6" />

            {/* Price section */}
            <div className="text-center space-y-1.5 mb-6">
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-500">
                <span>Antes <span className="text-red-500 font-extrabold line-through">$155</span></span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  90% DTO.
                </span>
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-6xl sm:text-7xl font-black text-orange-500 font-mono tracking-tight">$9.90</span>
                <span className="text-xl sm:text-2xl font-extrabold text-orange-500 ml-1.5 font-mono">USD</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold">
                (Puede pagar en su moneda local)
              </p>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-slate-100 max-w-md mx-auto my-6" />

            {/* CTA Button */}
            <div className="max-w-md mx-auto space-y-4">
              <a
                href="https://pay.hotmart.com/P106371037H?off=xm591rtn&checkoutMode=10"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-4 px-8 rounded-xl sm:rounded-2xl text-sm sm:text-base uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center"
              >
                QUIERO ACCEDER AHORA
              </a>
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-4 flex items-center justify-center gap-1.5">
                <span>🔥</span> Oferta por tiempo limitado
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* --- SECCIÓN 9: PREGUNTAS FRECUENTES (FAQ) --- */}
      <section className="py-10 md:py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          
          {/* Garantía Destacada */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mb-8 shadow-sm">
            <ShieldCheck className="w-12 h-12 text-amber-500 flex-shrink-0 animate-pulse" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">7 Días de Garantía de Satisfacción</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Pruébalo sin riesgos. Si no cumple tus expectativas, te devolvemos el 100% de tu dinero de forma inmediata.
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-3 mb-6">
            <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              Soporte al Entrenador
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-sm text-slate-600">
              ¿Tienes dudas sobre la Biblioteca Digital? Aquí tienes respuestas rápidas para resolverlas.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-60 opacity-100 border-t border-slate-200/40 p-5' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box below FAQs */}
          <div className="mt-8 text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="https://pay.hotmart.com/P106371037H?off=xm591rtn&checkoutMode=10"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:-translate-y-0.5 group border border-emerald-400 text-center"
              >
                QUIERO ACCEDER AHORA
              </a>
            </div>
            <div className="space-y-1.5 pt-2">
              <p className="text-sm md:text-base text-slate-600 font-medium">
                ¿Tienes más dudas? Ponte en contacto con nuestro soporte en:
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 tracking-tight break-all">
                contacto@entrenamientosdefutbol.online
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* --- SECCIÓN 10: FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold tracking-tight text-slate-900 uppercase text-sm">
              ENTRENAMIENTOS DE FÚTBOL
            </span>
          </div>

          <div className="h-[1px] bg-slate-200 my-4" />

          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} Entrenamientos de Fútbol. Todos los derechos reservados. Versión 2026.
          </p>

        </div>
      </footer>

      {/* Checkout Simulator Dialog Portal Modal */}
      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Floating social proof notification toast */}
      <NotificationToast />
    </div>
  );
}
