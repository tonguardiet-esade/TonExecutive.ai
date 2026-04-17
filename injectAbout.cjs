const fs = require('fs');

const appFile = 'src/App.tsx';
let content = fs.readFileSync(appFile, 'utf8');

const renderAboutCode = `
  const renderAbout = () => {
    // If translations are missing (e.g. for other languages yet to be added), falback to ES
    const ab = t.about || {
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
      <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
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
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                {ab.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-emerald-600 dark:text-emerald-400 mb-6">
                {ab.subtitle}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {ab.intro}
              </p>
              <div className="mt-8 flex gap-4 justify-center md:justify-start">
                 <a href="https://www.linkedin.com/in/tonguardiet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-xl hover:bg-[#004182] transition-colors shadow-lg font-medium">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                 </a>
                 <button onClick={() => { setCurrentPage('contacto'); window.scrollTo(0,0); }} className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg font-medium">
                    <Mail className="w-5 h-5" /> Contactar
                 </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Column: BIO and Skills */}
            <div className="md:col-span-1 space-y-10">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <User className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  {ab.profile}
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 relative z-10">
                  {ab.content.map((p, i) => (
                    <p key={i} className="leading-relaxed text-sm">{p}</p>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">{ab.skillsGroup1}</h4>
                  <div className="flex flex-wrap gap-2">
                    {ab.skills1.map((skill, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">{ab.skillsGroup2}</h4>
                  <div className="flex flex-wrap gap-2">
                    {ab.skills2.map((skill, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Experience */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-emerald-500" />
                {ab.experienceTitle}
              </h3>
              
              <div className="space-y-6">
                {ab.experiences.map((exp, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">{exp.company}</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full text-xs font-medium text-slate-500 whitespace-nowrap">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
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
`;

content = content.replace('const renderMetodologia = () => {', renderAboutCode + '\n\n  const renderMetodologia = () => {');
content = content.replace(
  "{currentPage === 'home' && renderHome()}",
  "{currentPage === 'home' && renderHome()}\n        {currentPage === 'sobre-mi' && renderAbout()}"
);

fs.writeFileSync(appFile, content);
