const fs = require('fs');

// Gera um arquivo de 100MB
const fileSize = 100 * 1024 * 1024; // 100MB
const buffer = Buffer.alloc(fileSize, 'a'); // Gera um buffer preenchido com 'a'

fs.writeFileSync('arquivo.txt', buffer);

console.log('done');