export default async function handler(req, res) {
  try {
    const serverModule = await import("../dist/diffuze/server/server.mjs");

    // Récupérer le premier export qui semble être une application Express
    const keys = Object.keys(serverModule);
    let expressApp = null;

    for (const key of keys) {
      const potentialApp = serverModule[key];
      // Vérifier si c'est une application Express (a une méthode handle)
      if (potentialApp && typeof potentialApp.handle === "function") {
        expressApp = potentialApp;
        break;
      }
    }

    if (expressApp) {
      return expressApp.handle(req, res);
    } else {
      // Aucune application Express trouvée
      res
        .status(500)
        .send(
          `Exports disponibles: ${JSON.stringify(
            keys
          )}, mais aucun n'est une application Express`
        );
    }
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send(`Erreur: ${error.message}`);
  }
}
