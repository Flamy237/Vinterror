/**
 * scripts/patch-mindar.js
 *
 * Remplace le require('fs') de MindAR par un objet vide compatible browser.
 * Exécuté automatiquement après chaque `npm install` via le hook "postinstall".
 * Fonctionne sur Windows, Mac et Linux.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'mind-ar',
  'dist',
  'mindar-image-three.prod.js'
);

if (!fs.existsSync(filePath)) {
  console.log('[patch-mindar] Fichier MindAR introuvable, skip.');
  process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf8');

const ORIGINAL = `const e = require("fs");`;
const PATCHED  = `const e = { readFileSync: () => new Uint8Array() };`;

if (content.includes(PATCHED)) {
  console.log('[patch-mindar] Déjà patché, rien à faire.');
  process.exit(0);
}

if (!content.includes(ORIGINAL)) {
  console.warn('[patch-mindar] Pattern introuvable — version de MindAR différente ?');
  process.exit(0);
}

content = content.replace(ORIGINAL, PATCHED);
fs.writeFileSync(filePath, content, 'utf8');
console.log('[patch-mindar] ✅ MindAR patché avec succès.');
