/**
 * Casos de éxito — imágenes Unsplash por tema, contenido detallado (modal) por idioma.
 * Importado en translations.ts para newsPage.successStories.stories
 */

export type CaseStudyDetails = {
  context: string;
  actions: string[];
  results: { value: string; label: string }[];
  testimonial: { quote: string; author: string };
  techTags: string[];
};

export type CaseStudyEntry = {
  id: string;
  type: 'caio' | 'fractional';
  company: string;
  date: string;
  image: string;
  title: string;
  desc: string;
  keyResult: string;
  tag: string;
  role?: string;
  details: CaseStudyDetails;
};

/* URLs Unsplash (tema) — alineado con títulos (compartido EN/CA) */
export const caseStudyImages = {
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
  meeting: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
  teamOps: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  onboard: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
  factory: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80',
  hr: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
  training: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
  logistics: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
  legal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
  startup: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
} as const;

const IMG = caseStudyImages;

export const sectionBanner =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=520&fit=crop';

export const successCaseStudiesES: CaseStudyEntry[] = [
  {
    id: 'ag-autonomos-2025',
    type: 'caio',
    company: 'Grupo manufacturero · cadenas multi-almacén (Anónimo)',
    date: 'Marzo 2025',
    image: IMG.warehouse,
    title: 'Implementación de Agentes Autónomos',
    desc: 'Optimización de la cadena de suministro con agentes y revisión humana: menos errores de previsión y tareas de picking más coherentes entre plantas.',
    keyResult: '35% reducción de errores de stock (piloto) + ROI positivo en 90 días',
    tag: 'Agentic AI',
    details: {
      context:
        'Sector industrial con 500+ empleados, planta central y múltiples almacenes. Desajustes entre previsión, pedidos reales y picking manual que no escalaría con crecimiento previsto 2025.',
      actions: [
        'Assessment y mapa de datos de 2 semanas: ERP, WMS y cuello de stock.',
        'Selección de stack: orquestación con LangChain, conectores certificados e interfaces seguras a sistemas heredados.',
        'Despliegue de agente piloto de aviso de reorden y alineación pick–pack con supervisión de planta.',
        'Formación al equipo: guardrails, protocolos de escalado y gobierno con KPIs de incertidumbre y precisión por SKU.',
      ],
      results: [
        { value: '35%', label: 'reducción errores de stock (ámbito piloto)' },
        { value: '<90 días', label: 'ROI piloto claramente positivo' },
        { value: '2 FTE', label: 'puestos reorientados a planificación y proveedores' },
      ],
      testimonial: {
        quote:
          'Por fin teníamos cifras y reglas de escalado documentadas, no otra hoja con promesas de "IA": el almacén bajó de incidencias a la tercera semana.',
        author: 'Dir. Operaciones · (Anónimo)',
      },
      techTags: ['LangChain', 'GPT-4o', 'n8n', 'Python / APIs ERP–WMS'],
    },
  },
  {
    id: 'roadmap-ia-2025',
    type: 'caio',
    company: 'Scale-up Tech B2B (Anónimo)',
    date: 'Febrero 2025',
    image: IMG.meeting,
    title: 'Roadmap IA 2025',
    desc: 'Plan de transición a modelo AI-first con prioridades, presupuestos técnicos y fases con hitos alineados con el comité.',
    keyResult: '5 iniciativas priorizadas, secuencia de 12 meses aprobada por comité en 1 mes',
    tag: 'AI Strategy',
    details: {
      context:
        'B2B SaaS en crecimiento acelerado (120+ FTE) con múltiples "piloto" aislados y riesgo de deuda de integración. El board pide una sola hoja de ruta defendible con ROI.',
      actions: [
        'Talleres de alineación con ventas, producto y finanzas (2 semanas).',
        'Criterio de selectión de casos: impacto, datos disponibles, riesgo, ventana a mercado.',
        'Definición de fases, dependencias, partners y carga interna; sin cajas negras: trazabilidad y ownership.',
        'Lanzamiento de 2 "quick wins" técnicamente sólidos y medibles, resto en backlog con umbrales explícitos.',
      ],
      results: [
        { value: '5', label: 'líneas estratégicas priorizadas con owner y fecha' },
        { value: '1 mes', label: 'del inicio a la firma de prioridades con el comité' },
        { value: '100%', label: 'criterios de éxito por fase aprobados' },
      ],
      testimonial: {
        quote:
          'Necesitábamos dejar de sumar pruebas aisladas; el roadmap vinculó negocio y cifras, y al equipo de ingeniería le dio aire para ejecutar con orden.',
        author: 'CPO · (Anónimo)',
      },
      techTags: ['Miro / Notion', 'Roadmaps versionados', 'Gobernanza datos', 'OKRs IA'],
    },
  },
  {
    id: 'reestructuracion-ai-driven',
    type: 'fractional',
    company: 'Grupo logístico internacional (Anónimo)',
    role: 'Fractional COO (IA)',
    date: 'Enero 2025',
    image: IMG.teamOps,
    title: 'Reestructuración Operativa AI-Driven',
    desc: 'Rediseño de flujos y cuellos con IA en el núcleo operativo: márgenes y plazos medibles, sin reemplazar al equipo, sino priorizando decisiones humanas críticas.',
    keyResult: 'Margen bruto +12% en 2 trimestres; menos retrabajos y reprogramaciones de reparto',
    tag: 'ROI Impact',
    details: {
      context:
        'Operador 3PL con 200+ FTE, competencia por precio, presión de plazos y márgenes. Integraciones legacy y datos inconsistentes en parte de flotas y aduanas.',
      actions: [
        'Mapa de proceso end-to-end: booking → picking → excepciones, con riesgo y dolor cuantificados.',
        'Selección de módulos RPA + LLM con umbral de confianza; human-in-the-loop en excepciones A/B.',
        'Piloto en 2 corredores de transporte: monitorización, rebalanceo y alerta temprana con métricas diarias.',
        'Formación a mando de línea: cuándo confiar, cuándo escalar y cierre de bucle con feedback a modelo.',
      ],
      results: [
        { value: '12%', label: 'mejora de margen (consolidada en T2)' },
        { value: '30%', label: 'reducción reprogramaciones críticas (piloto)' },
        { value: '1 trimestre', label: 'al plan de sostenimiento sin consultor adicional' },
      ],
      testimonial: {
        quote:
          'Fue un cambio de criterio, no de carné: hoy el despacho sabe leer su propio "semáforo" de excepciones, no adivina.',
        author: 'Responsable de flota y despacho · (Anónimo)',
      },
      techTags: ['Azure OpenAI', 'n8n', 'MLOps básico', 'Integración TMS'],
    },
  },
  {
    id: 'onboarding-ia-2026',
    type: 'caio',
    company: 'Fintech B2B (Anónimo)',
    date: 'Abril 2026',
    image: IMG.onboard,
    title: 'Automatización de onboarding con IA',
    desc: 'Funnel comercial y operacional unificado: agentes por fase, SLAs y handoff claro a cuentas con menos fricción manual.',
    keyResult: 'Tiempo hasta primer valor: –42% vs. tramo 2024',
    tag: 'AI Automation',
    details: {
      context: 'B2B con ciclo de venta largo, compliance KYC/AML, muchos PDF y correos. Equipo de CS saturado; churn temprano por mala puesta en marcha.',
      actions: [
        'Inventario de 12 "momentos" del onboarding y tasa de abandono por fase (2 semanas).',
        'Diseño de 3 micro-agentes: verificación, datos producto, kick-off, con caja de razonamiento y logs.',
        'RAG certificado sobre playbooks internas + cita de fuente obligatoria.',
        'Formación comercial-CS: borradores, revisión y cierre; métrica unificada (TTV, tasa recontacto, NPS).',
      ],
      results: [
        { value: '42%', label: 'reducción tiempo a primer valor' },
        { value: '–28%', label: 'tickets repetitivos a CS en 60 días' },
        { value: '0', label: 'cierres bloqueados por faltas de documento típicas' },
      ],
      testimonial: {
        quote:
          'Los comerciales dejaron de pedir a CS el mismo playbook: el agente cita sección, ellos afinan, el cliente siente celeridad y control.',
        author: 'Head of CS · (Anónimo)',
      },
      techTags: ['RAG híbrido', 'GPT-4o', 'n8n', 'Auditoría logs'],
    },
  },
  {
    id: 'roadmap-dire',
    type: 'caio',
    company: 'Industria y componentes (Anónimo)',
    date: 'Marzo 2026',
    image: IMG.factory,
    title: 'Roadmap IA para equipo directivo',
    desc: 'Prioridades y secuencia para 12–18 meses, con gobierno, presupuestos técnicos y riesgo industrial explícito.',
    keyResult: '5 iniciativas estratégicas lanzadas en T1; presupuestos aprobados',
    tag: 'AI Strategy',
    details: {
      context:
        'Fábrica y planta internacional, sensibilidad a indisponibilidad, certificaciones y ciberriesgo. Dirección pide hoja de ruta sin "piloto eterno" en I+D.',
      actions: [
        'Census de riesgo–oportunidad por planta, datos OT/IT, y requisito regulatorio.',
        'Fases: quick wins, core productivo, escala, con criterio de corte (coste, seguridad, talento).',
        'Alineación comité: owners, capping de CAPEX, partners y criterio de reorientación 2027.',
        'Célula con operations + IT: dos pilotos con línea clara a producción si bolsas se cumplen.',
      ],
      results: [
        { value: '5', label: 'líneas estratégicas en marcha (T1)' },
        { value: '1', label: 'governance único: comité y planta' },
        { value: 'Claro', label: 'mapa riesgo → mitigación para OT' },
      ],
      testimonial: {
        quote:
          'Era la primera vez que fábrica, IT y comité leían el mismo riesgo en euros y días, no en diapositivas genéricas de IA.',
        author: 'Director de Planta · (Anónimo)',
      },
      techTags: ['Gobernanza', 'Hojas de ruta versionadas', 'Partners OT', 'Ciberseg. industrial'],
    },
  },
  {
    id: 'agente-rrhh',
    type: 'fractional',
    company: 'Retail 200+ FTE (Anónimo)',
    date: 'Febrero 2026',
    image: IMG.hr,
    title: 'Agente conversacional interno para RRHH',
    desc: 'Asistente interno para políticas, bajas, onboarding dudas y códigos, con ruta a RRHH en casos sensibles y registro de consultas.',
    keyResult: '55% menos tickets de rutina; tiempo de respuesta 1h → minutos (casos 1er nivel)',
    tag: 'Agentic AI',
    details: {
      context: 'Grupo con políticas nacionales, tiendas, incertidumbre frecuente en bajas y nóminas, sobrecarga en un RRHH de ~12 personas.',
      actions: [
        'Categoría de dudas y tasa de desvío: qué requiere persona, qué es FAQ verificable.',
        'RAG con fuentes aprobadas, citas, versión; sin respuesta si baja de umbral de similitud.',
        'Escala a persona con contexto, idioma, ticket y registro; feedback para mejorar RAG sin PII excesivo.',
        'Taller a managers: cómo y cuándo delegar; canal seguro a laborales.',
      ],
      results: [
        { value: '55%', label: 'tickets de rutina internos' },
        { value: 'Min.', label: '1er contacto informativo en casos 1er nivel' },
        { value: '100%', label: 'respuestas con fuente interna' },
      ],
      testimonial: {
        quote:
          'Bajó el "WhatsApp a RRHH" para dudas repetidas; los casos duros suben con resumen, no a frío.',
        author: 'Directora de Personas · (Anónimo)',
      },
      techTags: ['RAG', 'Embeddings + ACL', 'GPT-4o', 'Ticketing (API)'],
    },
  },
  {
    id: 'dd-manda',
    type: 'caio',
    company: 'Private equity (Anónimo)',
    date: 'Enero 2026',
    image: IMG.finance,
    title: 'Due diligence tecnológica en M&A',
    desc: 'Caja negra a tablero: deuda de datos, riesgo modelo, arquitectura y posibles sinergias o costes de integración.',
    keyResult: '3 operaciones: riesgos estructurales acotados pre-cierre, cláusula de ajuste en 1 caso',
    tag: 'AI Audit',
    details: {
      context:
        'Cartera en industrial y servicios; targets con claims de "IA" en oferta, stack heterogéneo, contratos nube y riesgo IP/datos poco claro.',
      actions: [
        'Cuestionario técnico, revisiones a código/config descriptivas (no caja negra completa) y acceso a métricas de uso reales si existen.',
        'Puntuación de riesgo (datos, modelos, personnel, deuda) y pro forma de inversión para integrar vs. reemplazar.',
        'Escenarios: mantener, migrar, desmontar, con rango de coste y plazo; sin "big bang".',
        'Comité: findings en lenguaje de riesgo y dinero, no buzzwords.',
      ],
      results: [
        { value: '3', label: 'diligencias con riesgo material documentado' },
        { value: '1', label: 'renegociación ajuste por hallazgo IA/datos' },
        { value: '100%', label: 'dictamen reutilizable para futuras adquisiciones' },
      ],
      testimonial: {
        quote: 'Era un checklist que hablaba de euros y no de "hype"; el fund defendió con números la rebaja pedida al target.',
        author: 'Partner · (Anónimo)',
      },
      techTags: ['Rúbricas riesgo', 'Diligencia datos', 'Legal–tech', 'Hojas de cierre'],
    },
  },
  {
    id: 'clevel-genai',
    type: 'fractional',
    company: 'Aseguradora (Anónimo)',
    date: 'Diciembre 2025',
    image: IMG.training,
    title: 'Formación C-Level en IA generativa',
    desc: 'Módulos intensivos, casos del sector y decisiones: qué aprobar, qué no, y bajo qué condiciones, con riesgo y marco básico.',
    keyResult: 'Nuevo comité IA de gobierno + plan 9 meses aprobado; menos disparidad en criterio',
    tag: 'AI Training',
    details: {
      context: 'Cartera B2B2C, comité diverso, presión reguladora, muchos "proveedores genéricos" ofreciendo IA. Necesidad de lenguaje común y criterio de aprobación.',
      actions: [
        '4 sesiones ejecutivas, casos de uso anónimos del sector, sesgos, incidentes, proveedor vs. caja propia.',
        "Marco: human-in-the-loop, datos personales, continuidad, tercerización, umbrales de riesgo.",
        'Hoja viva: qué aprobar en 0–3–9 meses; owners y revisión con auditoría y legal.',
        "Simulacro: decisión en vivo ante incidente; feedback del chair.",
      ],
      results: [
        { value: '6 s.', label: 'sesiones, asistencia >90% c-level' },
        { value: '1', label: 'governance formal comité IA' },
        { value: '9m', label: 'plan aprobado con entregable por fase' },
      ],
      testimonial: {
        quote:
          'Nos bajó el ruido de "hay que poner un chatbot" y subió la pregunta: ¿bajo qué riesgo y dato lo hacemos sostenible.',
        author: 'CEO · (Anónimo)',
      },
      techTags: ['NIST-style guardrails (adaptado)', 'DPA', 'Caso práctico sector', 'Seguimiento trimestral'],
    },
  },
  {
    id: 'llm-costes-ops',
    type: 'caio',
    company: 'Logística (Anónimo)',
    date: 'Noviembre 2025',
    image: IMG.logistics,
    title: 'Reducción costes operativos con LLMs',
    desc: 'Backoffice, documentos y tareas de coordinación: automatizaciones con control de calidad, sin sustituir la supervisión humana estratégica.',
    keyResult: 'Ahorro operativo consolidado ~35% (ámbito reingeniería + asistentes tácitos)',
    tag: 'ROI Impact',
    details: {
      context: 'Red logística 150+ FTE, documentación, incidencias y re-trabajos, variación de tarifas y márgenes. Objetivo: ahorro medible, no "demos" de un día.',
      actions: [
        'Cálculo TCO: horas, reproceso, riesgo de error, por proceso.',
        "Patrones: extracción, resumen, clasificación, con plantillas y cita de orígen.",
        'Estratificación: qué tarea va a asistente, a flujo, o sigue 100% humano (sobre todo negociación o litigio).',
        "Control de calidad, muestras A/B y cierre: métrica semanal, rebalanceo de carga a personas.",
      ],
      results: [
        { value: '35%', label: 'proyección ahorro coste (ámbito piloto ampliado)' },
        { value: '2', label: 'FTE tareas repetitivas reasignados' },
        { value: '90d', label: 'ROI positivo en cesta priorizada' },
      ],
      testimonial: {
        quote:
          'Bajó el papeo duplicado en incidencias; lo que faltó lo vimos a los 3 días en el tablero, no al cierre de mes.',
        author: 'Dir. finanzas operativas · (Anónimo)',
      },
      techTags: ['LLM para extracción', 'Plantillas y validación', 'Orquestación', 'KPIs semanales'],
    },
  },
  {
    id: 'rag-corp',
    type: 'caio',
    company: 'Legal / corporate aff. (Anónimo)',
    date: 'Octubre 2025',
    image: IMG.legal,
    title: 'Implementación RAG corporativo',
    desc: 'Búsqueda y respuestas con trazabilidad: fuentes, versión, jurisdicción, con caja de riesgo si la consulta toca límite.',
    keyResult: '+31% en precisión documental (consulta compleja con benchmark interno pre-RAG)',
    tag: 'AI Architecture',
    details: {
      context: 'Cientos de miles de documentos, varias jurisdicciones, riesgo de contradicción y uso sin fuente. Equipo legal pide velocidad, no caja negra.',
      actions: [
        'Cartera: priorización, deduplicado, y ACL por materia/rol; logging de acceso (no retención indebida).',
        'Pipeline: chunking, reranking, cita mínima obligatoria, negación con umbral explícito.',
        'Eval: conjunto interno, recall y precisión, revisiones con abogados; feedback a índice.',
        'Uso: draft + revisión, nunca cierre; formación riesgo y "modelo 2 pasos" en contratos.',
      ],
      results: [
        { value: '+31%', label: 'precisión vs. búsqueda híbrida 2023' },
        { value: '0', label: "respuestas aceptadas sin cita en modo 'strict': cero" },
        { value: '24/7', label: '1er nivel de consulta; legal revisa en D+1' },
      ],
      testimonial: {
        quote:
          'Cada cláusula citada con versión: el cuello de botella pasó a ser nuestro proceso de revisión, no la búsqueda de texto.',
        author: 'Responsable legal y compliance · (Anónimo)',
      },
      techTags: ['RAG híbrido', 'Re-rank', 'Citas obligatorias', 'Acceso por rol'],
    },
  },
  {
    id: 'scaleup-saas',
    type: 'fractional',
    company: 'SaaS B2B (Anónimo)',
    date: 'Septiembre 2025',
    image: IMG.startup,
    title: 'Estrategia AI-first para scale-up SaaS',
    desc: 'Reposicionar producto y GTM: agentes en el core, sin promesas vana; pipeline y retención con criterio medible.',
    keyResult: 'Pipeline comercial +28% en 2T (segmento ICP priorizado) + reactivación retenida',
    tag: 'AI Strategy',
    details: {
      context:
        'SaaS ~80 FTE, competencia creciente, márgenes presionados. Equipo creyendo que "basta con añadir IA al pitch" sin cambiar activación, soporte ni entrega de valor.',
      actions: [
        'Mapeo ICP y journey: dónde la IA añade defensa vs. mera commodity.',
        '2 agentes: uno en SDR/qualif (bajo riesgo), otro en adopción producto (RAG+acciones) con caja de riesgo.',
        'Alineación revenue + producto: pricing, empaquetado y mensajes coherentes, no "hero slide".',
        'Cultura de experimentación: hipótesis, métricas, kill switch y revisión bimensual con founder.',
      ],
      results: [
        { value: '28%', label: 'uplift pipeline comercial en 2T (ICP afinado)' },
        { value: '19%', label: 'reducción tiempo a primer valor de prueba (módulo piloto)' },
        { value: '1', label: "steering quincenal: revops + producto + fCAIO" },
      ],
      testimonial: {
        quote:
          'Dejamos de poner "IA" en el hero y empezamos a poner en qué fase ahorraba 20 min al usuario; se notó en comité y en demos.',
        author: 'Co-founder y Head of GTM · (Anónimo)',
      },
      techTags: ['LangChain / Agentes', 'GTM con datos', 'Product analytics', 'Experimentación'],
    },
  },
];
