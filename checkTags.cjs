const fs = require('fs');

let content = fs.readFileSync('src/translations.ts', 'utf8');

// I will just completely replace the injected `pricingPage` and its following `tags:` array because EN already HAS tags, errors, solutions!
// Wait! EN ALREADY HAD tags, errors, solutions!
// Let me verify if EN has `tags`, `errors`, `solutions` further down!

let match = content.match(/tags: \{/g);
console.log("Number of tags: {", match ? match.length : 0);

// Let's just remove the junk I injected into EN that was duplicated.
