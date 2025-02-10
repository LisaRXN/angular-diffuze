import { SitemapStream, streamToPromise } from 'sitemap';
import { Request, Response } from 'express';

interface UrlData {
  url: string;
  changefreq: string;
  priority: number;
  lastmod: string;
}

async function fetchUrls(): Promise<UrlData[]> {
  const response = await fetch('http://data.barnabe-immo.fr/api/seo/urls');
  return response.json();
}

async function sitemapHandler(req: Request, res: Response): Promise<void> {
  try {
    const urls = await fetchUrls();

    const sitemapStream = new SitemapStream({
      hostname: 'https://www.barnabe-immo.fr',
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
