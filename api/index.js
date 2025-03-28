export default async function handler(req, res) {
  try {
    // Importer le module
    const serverModule = await import("../dist/diffuze/server/server.mjs");

    // Utiliser AngularAppEngine
    if (serverModule.AngularAppEngine) {
      const engine = new serverModule.AngularAppEngine();

      // Traiter la requête avec l'engine Angular
      const response = await engine.handle(req);

      // Si une réponse est retournée, on l'envoie
      if (response) {
        // Transférer les en-têtes
        if (response.headers) {
          for (const [key, value] of response.headers.entries()) {
            res.setHeader(key, value);
          }
        }

        // Définir le statut et envoyer le corps
        return res.status(response.status || 200).send(response.body);
      }
    }

    // Si nous arrivons ici, aucune réponse n'a été générée
    res.status(404).send("Page non trouvée");
  } catch (error) {
    console.error("Erreur lors du traitement de la requête:", error);
    res.status(500).send(`Erreur serveur: ${error.message}`);
  }
}
