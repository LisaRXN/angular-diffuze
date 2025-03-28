export default async function handler(req, res) {
  const { app } = await import("../dist/diffuze/server/server.mjs");
  return app.handle(req, res);
}
