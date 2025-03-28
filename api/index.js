export default async function handler(req, res) {
  try {
    // Importer le module
    const serverModule = await import("../dist/diffuze/server/server.mjs");

    // Utiliser AngularAppEngine
    if (serverModule.AngularAppEngine) {
      const engine = new serverModule.AngularAppEngine();

      // Adapter la requête pour l'engine
      // L'URL doit être une URL complète
      const host = req.headers.host || "localhost";
      const protocol = req.headers["x-forwarded-proto"] || "https";
      const originalUrl = req.url || "/";

      // Créer une URL valide
      const url = new URL(originalUrl, `${protocol}://${host}`);

      // Adapter la requête pour l'engine
      const adaptedReq = {
        ...req,
        url: url.toString(),
        protocol: protocol,
        get: (name) => req.headers[name.toLowerCase()],
        headers: req.headers,
      };

      // Traiter la requête adaptée
      const response = await engine.handle(adaptedReq);

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
    // Journaliser l'erreur avec plus de détails
    console.error("Erreur lors du traitement de la requête:", error);
    console.error("URL demandée:", req.url);
    console.error("En-têtes:", JSON.stringify(req.headers));

    res.status(500).send(`Erreur serveur: ${error.message}`);
  }
}
