const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/const tm: any = t\.methodology;/g, 'const tm: any = (t as any).methodology;');
content = content.replace(/const ts = t\.solutions;/g, 'const ts: any = (t as any).solutions;');

fs.writeFileSync('src/App.tsx', content);
