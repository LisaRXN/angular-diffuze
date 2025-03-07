import { SitemapStream, streamToPromise } from 'sitemap';
import { Request, Response } from 'express';

interface UrlData {
  url: string;
  changefreq: string;
  priority: number;
  lastmod: string;
}

async function fetchUrls(): Promise<UrlData[]> {
  try {
    // Routes statiques
    const staticUrls: UrlData[] = [
      {
        url: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/notre-offre',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/blog',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/nos-partenaires',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/conditions-generales',
        changefreq: 'monthly',
        priority: 0.1,
        lastmod: new Date().toISOString(),
      },
      {
        url: '/protection-des-donnees',
        changefreq: 'monthly',
        priority: 0.1,
        lastmod: new Date().toISOString(),
      },
    ];

    // Récupérer les URLs dynamiques (articles, propriétés, etc.)
    const dynamicResponse = await fetch(
      'http://data.barnabe-immo.fr/api/seo/urls/pro'
    );
    const dynamicUrls: UrlData[] = await dynamicResponse.json();

    // Combiner les URLs statiques et dynamiques
    return [...staticUrls, ...dynamicUrls];
  } catch (error) {
    console.error('Error fetching URLs for sitemap:', error);
    return [];
  }
}

async function sitemapHandler(req: Request, res: Response): Promise<void> {
  try {
    const urls = await fetchUrls();

    const sitemapStream = new SitemapStream({
      hostname: 'https://www.diffuze.fr',
    });

    // Écrire directement les URLs dans le stream
    urls.forEach((url) => {
      sitemapStream.write({
        url: url.url,
        changefreq: url.changefreq,
        priority: url.priority,
        lastmod: url.lastmod,
      });
    });
    sitemapStream.end();

    // Obtenir le XML directement du sitemapStream
    const sitemapXML = await streamToPromise(sitemapStream);

    res.header('Content-Type', 'application/xml');
    res.send(sitemapXML.toString());
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}

export { sitemapHandler };
