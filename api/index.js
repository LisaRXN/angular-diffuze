// La méthode d'importation originale n'est pas correcte
// Voici une version corrigée :
const { app } = require("../dist/diffuze/server/server.mjs");

// Exportez l'application pour que Vercel puisse l'utiliser
module.exports = app;
