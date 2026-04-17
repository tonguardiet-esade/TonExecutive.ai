const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/prose-slate/g, 'prose-zinc');
fs.writeFileSync('src/App.tsx', content);
