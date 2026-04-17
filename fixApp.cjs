const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// replace the typescript typing for t.methodology
content = content.replace('const tm = t.methodology;', 'const tm = t.methodology as any;');

fs.writeFileSync('src/App.tsx', content);

let translations = fs.readFileSync('src/translations.ts', 'utf8');
translations = translations.replace(/1320,5.*multiple properties/g, ''); // just to clear any residual duplicates in my head, I need to check line 1320 in CA
