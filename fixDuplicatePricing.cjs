const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

// The block I injected:
const badBlock = `    pricingPage: {
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
`;

if (content.indexOf(badBlock) !== -1) {
    content = content.replace(badBlock, '');
    fs.writeFileSync('src/translations.ts', content);
    console.log("Removed duplicated pricingPage");
} else {
    console.log("Not found");
}
