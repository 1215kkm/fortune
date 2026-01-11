const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');
const basePath = '/fortune';

// Read index.html
let html = fs.readFileSync(indexPath, 'utf8');

// Fix paths - add basePath prefix to absolute paths
html = html.replace(/href="\//g, `href="${basePath}/`);
html = html.replace(/src="\//g, `src="${basePath}/`);

// Write back
fs.writeFileSync(indexPath, html);

console.log('Fixed paths in index.html for GitHub Pages');
