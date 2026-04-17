const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

content = content.replace(/PliegoFácil\.ai/g, 'TonExecutive.ai');
content = content.replace(/PliegoFácil/g, 'TonExecutive');
content = content.replace(/Pliegofácil/g, 'TonExecutive');
content = content.replace(/Pliegofacil/g, 'TonExecutive');
content = content.replace(/pliegoFacil/g, 'tonExecutive');
content = content.replace(/pliegofacil/g, 'tonexecutive');

fs.writeFileSync('src/translations.ts', content);
