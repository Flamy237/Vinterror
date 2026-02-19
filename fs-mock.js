// Mock vide du module Node.js 'fs' pour le browser.
// MindAR utilise require('fs') uniquement en environnement Node.js.
// Ce fichier vide satisfait Turbopack sans rien casser côté browser.
module.exports = {};
