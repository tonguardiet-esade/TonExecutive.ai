const fs = require('fs');

const files = [
  'src/App.tsx',
  'src/pages/PricingServices.tsx',
  'src/pages/TecnicoContratacion.tsx',
  'src/components/EfficiencyCalculator.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/slate-/g, 'zinc-');
    fs.writeFileSync(file, content);
  }
});

let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace(/slate-700/g, 'zinc-700');
fs.writeFileSync('src/index.css', cssContent);

