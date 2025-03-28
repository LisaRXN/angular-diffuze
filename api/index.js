export default async function handler(req, res) {
  try {
    // Importer correctement le module
    const serverModule = await import("../dist/diffuze/server/server.mjs");

    // Utiliser correctement l'application Express
    if (serverModule.app) {
      // L'application express a une méthode handle
      return serverModule.app.handle(req, res);
    } else if (serverModule.reqHandler) {
      // Utiliser le gestionnaire de requêtes exporté
      return serverModule.reqHandler(req, res);
    } else {
      res.status(500).send("Configuration serveur incorrecte");
    }
  } catch (error) {
    console.error("Erreur d'importation:", error);
    res.status(500).send(`Erreur serveur: ${error.message}`);
  }
}
