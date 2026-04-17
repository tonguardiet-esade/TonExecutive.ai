const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

// The exact string to replace is where ES `pricingPage` ends and leaked EN `tags` begins:
const targetString = `      faq3A: 'Todos los repositorios, datos, propmts corporativos quedan bajo propiedad exclusiva de tu empresa.'
    },
    tags: {
      new: 'New',`;

const replacementString = `      faq3A: 'Todos los repositorios, datos, propmts corporativos quedan bajo propiedad exclusiva de tu empresa.'
    }
  },
  EN: {
    nav: {
      home: 'Home',
      methodology: 'Methodology',
      contact: 'Contact',
      about: 'About Me',
      solutions: 'Solutions',
      pricing: 'Pricing',
      requests: 'Requests',
      openTool: 'Book Demo',
      logout: 'Logout',
      bookDemo: 'Book Meeting',
      login: 'Login'
    },
    about: {
      title: "About Me",
      subtitle: "Ton Guardiet",
      profile: "Profile",
      intro: "Intro",
      content: ["Content 1", "Content 2"],
      experienceTitle: "Experience",
      experiences: [],
      skillsGroup1: "Skills 1",
      skills1: [],
      skillsGroup2: "Skills 2",
      skills2: []
    },
    home: {
      badge: 'Badge',
      title1: 'Title 1',
      title2: 'Title 2',
      subtitle: 'Subtitle',
      b2gTitle: 'B2G Title',
      b2gDesc: 'B2G Desc',
      b2gBtn: 'Btn',
      trustedBy: 'Trusted',
      impactBadge: 'Badge',
      impactTitle: 'Impact',
      impact1Val: '1',
      impact1Title: 'T',
      impact1Desc: 'D',
      impact2Val: '2',
      impact2Title: 'T',
      impact2Desc: 'D',
      impact3Val: '3',
      impact3Title: 'T',
      impact3Desc: 'D',
      platformBadge: 'PB',
      complianceTitle: 'CT',
      compliance1: 'C1',
      compliance2: 'C2',
      compliance3: 'C3',
      challengeSolution: {
        title: 'T', challengeTitle: 'CT', challengeItems: [], solutionTitle: 'ST', solutionItems: []
      },
      syncBadge: 'SB',
      syncTitle: 'ST',
      syncDesc: 'SD',
      card1Title: 'C1T', card1Desc: 'C1D',
      card2Title: 'C2T', card2Desc: 'C2D',
      card3Title: 'C3T', card3Desc: 'C3D',
      engineeringTitle: 'ET', engineeringDesc: 'ED',
      engCard1Title: 'E1T', engCard1Desc: 'E1D',
      engCard2Title: 'E2T', engCard2Desc: 'E2D',
      engCard3Title: 'E3T', engCard3Desc: 'E3D',
      docTitle: 'DT', docDesc: 'DD',
      docCard1Title: 'D1T', docCard1Desc: 'D1D',
      docCard2Title: 'D2T', docCard2Desc: 'D2D',
      docCard3Title: 'D3T', docCard3Desc: 'D3D',
      mockupTitle: 'MT', mockupItem1: 'M1', mockupItem2: 'M2', mockupItem3: 'M3', mockupBtn: 'MB',
      syncSectionTitle: 'SST', syncSectionDesc: 'SSD',
      step1Title: 'S1T', step1Desc: 'S1D',
      step2Title: 'S2T', step2Desc: 'S2D',
      step3Title: 'S3T', step3Desc: 'S3D',
      traceabilityBadge: 'TB', traceabilityTitle: 'TT', traceabilityDesc: 'TD',
      mockup2Title: 'M2T', mockup2Cpv: 'M2C', mockup2Text: 'M2Tx', mockup2Tooltip: 'M2To', mockupTooltip: 'MT',
      authoritySecurity: {
        title: 'T', subtitle: 'S', blocks: {
          justification: { title: 'T', desc: 'D' },
          compliance: { title: 'T', desc: 'D' },
          traceability: { title: 'T', desc: 'D' },
          antiHallucination: { title: 'T', desc: 'D' }
        },
        verificationTag: 'VT', paragraph: 'P', tooltip: 'T'
      },
      calculator: {
        title: 'T', subtitle: 'S',
        expedientesLabel: 'EL', tiempoLabel: 'TL', tiempoDesc: 'TD',
        externalizaLabel: 'EL', externalizaDesc: 'ED',
        horasRecuperadasTitle: 'HRT', horasRecuperadasDesc: 'HRD',
        diasLiberadosTitle: 'DLT', diasLiberadosDesc: 'DLD',
        ahorroConsultoriaTitle: 'ACT', ahorroConsultoriaDesc: 'ACD',
        cta: 'CTA', footer: 'F',
        modal: {
          title: 'T', desc: 'D', emailLabel: 'E', emailPlaceholder: 'P', btn: 'B', btnLoading: 'L', successTitle: 'ST', successDesc: 'SD', rateLimit: 'RL', error: 'E'
        }
      }
    },
    methodology: {
      badge: 'MB', title: 'MT', subtitle: 'Subtitle', accessBtn: 'Btn', mods: []
    },
    pricingPage: {
      title: 'T', subtitle: 'S', phasesTitle: 'PT', phasesSubtitle: 'PS', phase1Title: 'P1', phase1Desc: 'P1D',
      phase2Title: 'P2', phase2Desc: 'P2D', phase3Title: 'P3', phase3Desc: 'P3D', phase4Title: 'P4', phase4Desc: 'P4D',
      pricingTitle: 'PT', pricingSubtitle: 'PS', quickTitle: 'QT', quickLabel: 'QL', quickPrice: 'QP',
      quickFeature1: 'Q1', quickFeature2: 'Q2', quickFeature3: 'Q3', quickBtn: 'QB',
      plan1Title: 'P1T', plan1Label: 'P1L', plan1Price: 'P1P', plan1Feature1: 'F1', plan1Feature2: 'F2', plan1Feature3: 'F3', plan1Btn: 'B',
      plan2Title: 'P2T', plan2Label: 'P2L', plan2Price: 'P2P', plan2Feature1: 'F1', plan2Feature2: 'F2', plan2Feature3: 'F3', plan2Btn: 'B',
      plan3Title: 'P3T', plan3Label: 'P3L', plan3Price: 'P3P', plan3Feature1: 'F1', plan3Feature2: 'F2', plan3Feature3: 'F3', plan3Btn: 'B',
      contactTitle: 'CT', contactSubtitle: 'CS', contactBtn: 'CB',
      trustTitle: 'TT', trust1: 'T1', trust1Sub: 'TS', trust2: 'T2', trust2Sub: 'TS', trust3: 'T3', trust3Sub: 'TS', trust4: 'T4', trust4Sub: 'TS',
      featuresTitle: 'FT', featuresSubtitle: 'FS', f1T: '1', f1D: '2', f2T: '3', f2D: '4', f3T: '5', f3D: '6',
      faqTitle: 'FT', faqSubtitle: 'FS', faq1Q: 'Q1', faq1A: 'A1', faq2Q: 'Q2', faq2A: 'A2', faq3Q: 'Q3', faq3A: 'A3'
    },
    tags: {
      new: 'New',`;

if (content.indexOf(targetString) !== -1) {
    content = content.replace(targetString, replacementString);
    fs.writeFileSync('src/translations.ts', content);
    console.log("Replaced successfully and restored boundary between ES and EN!");
} else {
    console.log("Target string not found!");
}
