const fs = require('fs');

function replaceColors(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content
    .replace(/blue-50/g, 'emerald-50')
    .replace(/blue-100/g, 'emerald-100')
    .replace(/blue-200/g, 'emerald-200')
    .replace(/blue-300/g, 'emerald-300')
    .replace(/blue-400/g, 'emerald-400')
    .replace(/blue-500/g, 'emerald-500')
    .replace(/blue-600/g, 'emerald-600')
    .replace(/blue-700/g, 'emerald-700')
    .replace(/blue-800/g, 'emerald-800')
    .replace(/blue-900/g, 'emerald-900')
    .replace(/blue-950/g, 'emerald-950')
    // and let's add BrainCircuit replacing FileText in the logo
    .replace(/<FileText/g, '<BrainCircuit')
    // Update hardcoded Logo text if it's there
    .replace(/<span className="text-emerald-600 dark:text-emerald-400">Pliego<\/span>/g, '<span className="text-slate-900 dark:text-white">Ton</span>')
    .replace(/<span className="text-green-500 dark:text-green-400">Fácil\.ai<\/span>/g, '<span className="text-emerald-600 dark:text-emerald-500">Executive.ai</span>')
    // Update footer logo details
    .replace(/<CheckCheck className="w-3 h-3 text-white" strokeWidth=\{3\} \/>/g, '')
    .replace(/<div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full px-0\.5">/g, '');

  fs.writeFileSync(filePath, content);
}

replaceColors('src/App.tsx');
