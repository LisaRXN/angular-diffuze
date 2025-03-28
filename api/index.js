export default async function handler(req, res) {
  const { app } = await import("../dist/diffuze/server/server.mjs");

  // Utilisez la méthode handle de l'application Express
  return app.handle(req, res);
}
