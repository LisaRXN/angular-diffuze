// Utilisez dynamic import pour plus de compatibilité
let app;

async function initApp() {
  try {
    const serverModule = await import("./dist/diffuze/server/server.mjs");
    app = serverModule.app;
    return app;
  } catch (error) {
    console.error("Erreur lors du chargement de l'application:", error);
    throw error;
  }
}

// Exporter une fonction qui gère les requêtes
module.exports = async (req, res) => {
  if (!app) {
    try {
      app = await initApp();
    } catch (error) {
      return res
        .status(500)
        .send("Erreur lors de l'initialisation de l'application");
    }
  }
  return app(req, res);
};
