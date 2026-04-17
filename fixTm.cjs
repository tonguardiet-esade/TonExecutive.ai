const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/const tm = t.methodology as any;/g, 'const tm: any = t.methodology;');
content = content.replace(/const tm = t\.methodology;/g, 'const tm: any = t.methodology;');

fs.writeFileSync('src/App.tsx', content);
