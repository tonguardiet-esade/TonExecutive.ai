const fs = require('fs');
let content = fs.readFileSync('src/translations.ts', 'utf8');
content = content.replace(/PliegoFacil\.ai/g, 'TonExecutive.ai')
                 .replace(/PliegoFacil\.SL/g, 'TonExecutive')
                 .replace(/PliegoFacil SL\.?/g, 'TonExecutive')
                 .replace(/PliegoFacil/g, 'TonExecutive')
                 .replace(/info@TonExecutive\.com/g, 'hola@tonexecutive.ai')
                 .replace(/info@pliegofacil\.ai/g, 'hola@tonexecutive.ai');
fs.writeFileSync('src/translations.ts', content);
