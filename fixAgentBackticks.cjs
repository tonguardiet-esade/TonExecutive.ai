const fs = require('fs');

let content = fs.readFileSync('src/pages/AgentCAIO.tsx', 'utf8');

// Replace escaped backticks with real backticks
content = content.replace(/\\\`flex/g, '`flex');
content = content.replace(/start'}\\\`/g, "start'}`");

content = content.replace(/className={\\\`/g, "className={`");
content = content.replace(/\\`}/g, "`}");

content = content.replace(/className=\{\\\`(.*?)\\\`\}/g, "className={`$1`}");
content = content.replace(/\\\`/g, "`"); // Just unescape all that might be there...

fs.writeFileSync('src/pages/AgentCAIO.tsx', content);
