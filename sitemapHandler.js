import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import path from "path";

async function fetchUrls() {
  try {
    // Routes statiques
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
    ];

    // Récupérer les URLs dynamiques
    const dynamicResponse = await fetch(
      "https://data.barnabe-immo.fr/api/seo/urls/pro"
    );
    const dynamicUrls = await dynamicResponse.json();

    // Combiner les URLs
    return [...staticUrls, ...dynamicUrls];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des URLs pour le sitemap:",
      error
    );
    return [];
  }
}

async function generateSitemap() {
  try {
    console.log("Génération du sitemap...");
    const urls = await fetchUrls();
    console.log(`${urls.length} URLs récupérées`);

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

    // Créer le dossier public s'il n'existe pas
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Écrire le fichier sitemap.xml
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(sitemapPath, sitemapXML.toString());

    console.log(`Sitemap généré avec succès : ${sitemapPath}`);
  } catch (error) {
    console.error("Échec de la génération du sitemap:", error);
    process.exit(1);
  }
}

// Exécuter directement la génération du sitemap
generateSitemap();
