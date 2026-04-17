const fs = require('fs');

let content = fs.readFileSync('src/pages/TecnicoContratacion.tsx', 'utf8');

content = content
  .replace(/blue-100/g, 'emerald-100')
  .replace(/blue-300/g, 'emerald-300')
  .replace(/blue-400/g, 'emerald-400')
  .replace(/blue-500/g, 'emerald-500')
  .replace(/blue-700/g, 'emerald-700')
  .replace(/blue-800/g, 'emerald-800')
  .replace(/blue-900/g, 'emerald-900')
  .replace(/#1D4ED8/g, '#059669') // Replacing the hardcoded blue with emerald-600
  .replace(/brand-blue/g, 'brand-emerald'); // replacing the custom css var usage if any

fs.writeFileSync('src/pages/TecnicoContratacion.tsx', content);
