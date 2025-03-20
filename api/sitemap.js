import { SitemapStream } from "sitemap";
import { streamToPromise } from "sitemap";
import express from "express";

// Fonction pour récupérer les URLs (à adapter selon votre logique existante)
async function fetchUrls() {
  // Vous pouvez importer cette fonction depuis votre fichier sitemapHandler.ts
  // ou recréer la logique ici
  return [
    {
      url: "/",
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/notre-offre",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/nos-partenaires",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/blog",
      changefreq: "daily",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    // Ajoutez d'autres URLs statiques ici
  ];
}

// Handler pour le sitemap
async function sitemapHandler(req, res) {
  try {
    const urls = await fetchUrls();

    const sitemapStream = new SitemapStream({
      hostname: "https://www.diffuze.fr",
    });

    // Écrire les URLs dans le stream
    urls.forEach((url) => {
      sitemapStream.write({
        url: url.url,
        changefreq: url.changefreq,
        priority: url.priority,
        lastmod: url.lastmod,
      });
    });
    sitemapStream.end();

    // Obtenir le XML
    const sitemapXML = await streamToPromise(sitemapStream);

    res.header("Content-Type", "application/xml");
    res.send(sitemapXML.toString());
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}

// Créer une application Express minimaliste
const app = express();
app.get("/sitemap.xml", sitemapHandler);

export default app;
