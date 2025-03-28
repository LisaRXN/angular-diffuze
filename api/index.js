export default async function handler(req, res) {
  try {
    const { handleVercelRequest } = await import(
      "../dist/diffuze/server/server.mjs"
    );
    if (handleVercelRequest) {
      return handleVercelRequest(req, res);
    } else {
      const { app } = await import("../dist/diffuze/server/server.mjs");
      return app.handle(req, res);
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).send(`Erreur: ${error.message}`);
  }
}
