const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/'https:\/\/home-pliegof-cial-51572141211\.us-west1\.run\.app\/'/g, "'#'");
fs.writeFileSync('src/App.tsx', content);
