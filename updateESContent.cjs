const fs = require('fs');

let t = fs.readFileSync('src/translations.ts', 'utf8');

t = t.replace(/solutions: \{[\s\S]*?contact: \{/, `solutions: {
      heroTitle: 'Servicios de Transformación y Estrategia IA',
      heroDesc: 'Soluciones estructuradas para auditar, diseñar y ejecutar estrategias de Inteligencia Artificial que impactan directamente en tu cuenta de resultados.',
      painPoints: [
        { title: 'Incertidumbre Tecnológica', desc: 'Evalúo el Hype y propongo sólo tecnología probada que se alinea con tus KPIs empresariales.' },
        { title: 'Falta de Talento Especializado', desc: 'Actúo como tu líder de IA interno sin los altos costes de un directivo a tiempo completo.' },
        { title: 'Ejecución Estancada', desc: 'Paso de la estrategia a resultados rápidos mediante Quick Wins en procesos críticos.' }
      ],
      essentialTitle: 'Líneas de Servicio',
      essentialDesc: 'Intervenciones precisas como Fractional CAIO para tu empresa B2B.',
      essentialItems: [
        { title: 'C-Level Advisory & Strategy', desc: 'Asesoramiento directo a Founders y C-Levels para validar modelos de negocio basados en IA.' },
        { title: 'Auditoría y Quick Wins', desc: 'Análisis de ineficiencias internas y despliegue rápido de agentes y automatizaciones (90 días).' },
        { title: 'Due Diligence Tecnológica', desc: 'Auditoría en procesos de M&A y evaluación de arquitecturas de IA de terceros.' }
      ],
      footerTitle: 'Lo que realmente obtienes es DIRECCIÓN ESTRATÉGICA.',
      footerDesc: 'Un enfoque 100% agnóstico a la tecnología, centrado en el impacto real y el crecimiento sostenible.',
      footerBtn: 'Agendar Exploratoria',
      auditTitle: 'IA COMO MOTOR DE CRECIMIENTO',
      auditText: 'Alineamos las capacidades de la IA generativa con tus objetivos de Product-Led Growth y retención.',
      auditAlertTitle: 'El enfoque correcto:',
      auditAlertText: 'No implementar "IA por tener IA". Implementar IA para reducir costes de adquisición, mejorar la conversión y escalar la rentabilidad.',
      complianceTitle: 'SEGURIDAD Y ESCALABILIDAD',
      complianceBadge1: 'Arquitecturas agnósticas (LLMs Locales / Nube)',
      complianceBadge2: 'Privacidad absoluta de los datos corporativos',
      complianceBadge3: 'Capacitación del equipo interno',
      workflowTitle: 'Nivelando el impacto',
      workflowBeforeTitle: 'Sin Dirección de IA',
      workflowBeforeItems: [
        'Experimentos sin retorno (ROI)',
        'Silos de datos y pérdida de eficiencia',
        'Dependencia de proveedores externos'
      ],
      workflowAfterTitle: 'Con tu fCAIO',
      workflowAfterItems: [
        'Roadmap estructurado y priorizado',
        'Adopción tecnológica fluida',
        'Ventaja competitiva medible'
      ],
      legalExplainable: {
        title: "Modelos Seguros y Éticos de Inteligencia Artificial",
        subtitle: "No dejamos nada al azar. Aseguramos que la tecnología se adopta de manera responsable y en cumplimiento con la normativa europea.",
        cards: [
          {
            title: "Auditoría de Datos",
            desc: "Evaluamos el riesgo de implementar IA abierta asegurando la privacidad de tu know-how empresarial."
          },
          {
            title: "Cumplimiento (AI Act)",
            desc: "Alineados con la futura regulación europea, clasificando los riesgos e impactos de los modelos utilizados en tu startup."
          },
          {
            title: "Sesgo y Rendimiento",
            desc: "Evalúo la precisión, las alucinaciones y la viabilidad técnica de cada agente de IA antes de que interactúe con tus clientes corporativos."
          }
        ],
        auditView: {
          clauseTitle: "Caso de Estudio Analizado",
          clauseText: "Automatización de procesos de conciliación bancaria PSD2 y validación OCR mediante Modelos Fundacionales segmentados...",
          justificationTitle: "Impacto en Negocio",
          justificationText: "Reducción del 80% en los tiempos de verificación humana, incrementando la escalabilidad del producto y logrando retornos en menos de 6 meses.",
          status: "Validado (+400% ARR)"
        }
      }
    },
    contact: {`);

t = t.replace(/pricingPage: \{[\s\S]*?tags: \{/, `pricingPage: {
      title: 'Planes y Retainer Módulos',
      subtitle: 'Flexibilidad total. Modelos de acompañamiento diseñados para empresas B2B y SaaS que no necesitan un directivo a tiempo completo.',
      phasesTitle: 'Modalidades de Intervención',
      phasesSubtitle: 'Cómo nos asociamos para generar crecimiento sostenido',
      phase1Title: '1. Asesoramiento Directivo',
      phase1Desc: 'Mentoría y consultoría estratégica para Founders y C-Levels. Sesiones periódicas de alineamiento y gobernanza.',
      phase2Title: '2. Auditoría Operativa',
      phase2Desc: 'Fase de descubrimiento (3-4 semanas) para auditar flujos de trabajo, identificar ineficiencias y construir el Roadmap IA.',
      phase3Title: '3. Ejecución de Quick Wins',
      phase3Desc: 'Despliegues rápidos de agentes y flujos de automatización para resolver el "pain" principal de la operativa.',
      phase4Title: '4. Fractional Leader',
      phase4Desc: 'Adopción del rol formal de fCAIO a largo plazo (ej. 1 o 2 días/semana) liderando el equipo tech y de producto.',
      pricingTitle: 'Estructura de Precios',
      pricingSubtitle: 'Modelos adaptados a la intensidad que necesita tu compañía',
      quickTitle: 'Sesión Diagnóstica',
      quickLabel: 'Ideal para primera toma de contacto',
      quickPrice: '0€',
      quickFeature1: 'Evaluación de madurez tecnológica',
      quickFeature2: 'Mapeo de tu Pain-Point principal',
      quickFeature3: 'Validación de viability',
      quickBtn: 'Agendar ahora',
      plan1Title: 'Retainer Executive',
      plan1Label: 'fCAIO - C-Level Desk',
      plan1Price: 'A medida',
      plan1Feature1: '1-2 días por semana',
      plan1Feature2: 'Dirección del Roadmap IA',
      plan1Feature3: 'Gobernanza y selección de proveedores',
      plan1Btn: 'Solicitar Reunión',
      plan2Title: 'Auditoría & Plan de Choque',
      plan2Label: 'Proyecto Cerrado',
      plan2Price: 'A medida',
      plan2Feature1: 'Due Diligence técnica y operativa',
      plan2Feature2: 'Priorización de Casos de Uso (ROI)',
      plan2Feature3: 'Diseño de Arquitectura',
      plan2Btn: 'Iniciar Auditoría',
      plan3Title: 'Ejecución y Despliegue',
      plan3Label: 'Implementación Quick Wins',
      plan3Price: 'A medida',
      plan3Feature1: 'Desarrollo de Agentes y Prompts',
      plan3Feature2: 'Integración vía API o Local',
      plan3Feature3: 'Capacitación a equipos',
      plan3Btn: 'Cotizar Proyecto',
      contactTitle: '¿Tienes un reto concreto de Crecimiento o IA?',
      contactSubtitle: 'Cuéntame el cuello de botella de tu startup B2B y evaluaremos si tiene una solución técnica viable.',
      contactBtn: 'Contactar de forma directa',
      trustTitle: 'LIDERANDO PRODUCTO Y CRECIMIENTO EN',
      trust1: 'Unibo Neobroker',
      trust1Sub: 'Head of Product',
      trust2: 'Quipu / Sila',
      trust2Sub: 'PM B2B Growth',
      trust3: 'Consultoría B2B',
      trust3Sub: 'Asesoramiento',
      trust4: 'SaaS PLG',
      trust4Sub: 'Aceleración de Ingresos',
      featuresTitle: 'Por qué incorporar un Fractional CAIO',
      featuresSubtitle: 'El equilibrio perfecto entre experiencia directiva y coste acotado',
      f1T: 'Flexibilidad de Costes',
      f1D: 'Talento Senior sin comprometer masa salarial (sin seguros, sin indemnizaciones, tarifa plana o por horas).',
      f2T: 'Visión Objectiva',
      f2D: 'Aporto rigor desde la experiencia, sin estar contaminado por la política interna.',
      f3T: 'Cultura del Crecimiento',
      f3D: 'Enfoque centrado en OKRs, mejora de la retención y PLG. Transformo flujos.',
      faqTitle: 'Preguntas Frecuentes',
      faqSubtitle: 'Resuelvo tus dudas iniciales',
      faq1Q: '¿Cuál es la diferencia entre un fCAIO y una consultora tecnológica?',
      faq1A: 'Actúo bajo tus mismos intereses, ayuda a contratar y evalúa proveedores ("No bullshit").',
      faq2Q: '¿A qué tamaño de empresas ayudas?',
      faq2A: 'Suelo colaborar con empresas B2B, SaaS y Fintech en fase de tracción.',
      faq3Q: '¿Garantizas la propiedad intelectual de lo que se desarrolla?',
      faq3A: 'Todos los repositorios, datos, propmts corporativos quedan bajo propiedad exclusiva de tu empresa.'
    },
    tags: {`);

fs.writeFileSync('src/translations.ts', t);
