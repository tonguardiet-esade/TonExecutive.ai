const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Find where `t` is defined
// const t = translations[language as keyof typeof translations] || translations.ES;
content = content.replace(
  'const t = translations[language as keyof typeof translations] || translations.ES;',
  'const t = (translations[language as keyof typeof translations] || translations.ES) as any;'
);

fs.writeFileSync('src/App.tsx', content);
