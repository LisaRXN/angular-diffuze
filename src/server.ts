// src/server.ts
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Déterminer les chemins de dossiers
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

// Créer l'application Express
const app = express();
const angularApp = new AngularNodeAppEngine();

// Liste des routes qui sont rendues côté client
// Ajoutez ici les futures routes en mode client
const clientSideRoutes = ['/annonces', '/dashboard'];

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle client-side rendered routes by serving the index.html
 * This middleware must be before the Angular rendering middleware
 */
clientSideRoutes.forEach((route) => {
  // Route exacte (ex: /annonces)
  app.get(route, (req, res) => {
    res.sendFile(resolve(browserDistFolder, 'index.html'));
  });

  // Sous-routes (ex: /annonces/*, /dashboard/*)
  app.get(`${route}/*`, (req, res) => {
    res.sendFile(resolve(browserDistFolder, 'index.html'));
  });
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);

/**
 * Export the Express app for compatibility
 */
export { app };
