import { SitemapStream } from "sitemap";
import { streamToPromise } from "sitemap";
import express from "express";

async function fetchUrls() {
  try {
    const staticUrls = [
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
        url: "/annonces",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/blog",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/nos-partenaires",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/conditions-generales",
        changefreq: "monthly",
        priority: 0.1,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/protection-des-donnees",
        changefreq: "monthly",
        priority: 0.1,
        lastmod: new Date().toISOString(),
      },
      // Ajoutez d'autres URLs statiques ici
    ];

    const dynamicResponse = await fetch(
      "https://data.barnabe-immo.fr/api/seo/urls/pro"
    );
    const dynamicUrls = await dynamicResponse.json();

    return [...staticUrls, ...dynamicUrls];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return [];
  }
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
