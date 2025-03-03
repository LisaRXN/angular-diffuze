import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SEO_CONFIG } from './seo.config';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly baseUrl = 'https://www.diffuze.fr';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  updateSeoTags(config: SeoConfig): void {
    // Définir le titre de la page
    this.title.setTitle(config.title);

    // Définir les balises meta de base
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Définir les balises Open Graph
    this.meta.updateTag({
      property: 'og:title',
      content: config.ogTitle || config.title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: config.ogDescription || config.description,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: config.ogUrl || `${this.baseUrl}${this.router.url}`,
    });

    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }

    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Définir les balises Twitter Card
    this.meta.updateTag({
      name: 'twitter:card',
      content: config.twitterCard || 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: config.twitterTitle || config.ogTitle || config.title,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        config.twitterDescription || config.ogDescription || config.description,
    });

    if (config.twitterImage) {
      this.meta.updateTag({
        name: 'twitter:image',
        content: config.twitterImage,
      });
    }

    // Définir l'URL canonique
    if (config.canonicalUrl) {
      let linkElement = this.getLinkElementByRel('canonical');
      if (linkElement) {
        linkElement.setAttribute('href', config.canonicalUrl);
      } else {
        this.createCanonicalLink(config.canonicalUrl);
      }
    } else {
      this.createCanonicalLink(`${this.baseUrl}${this.router.url}`);
    }
  }

  private getLinkElementByRel(rel: string): HTMLLinkElement | null {
    return document.querySelector(`link[rel='${rel}']`);
  }

  private createCanonicalLink(url: string): void {
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  updateDynamicSeoTags(
    config: Partial<SeoConfig>,
    baseRoute: string = '/blog'
  ): void {
    // Récupérer la configuration de base pour ce type de route
    const baseConfig = SEO_CONFIG[baseRoute] || SEO_CONFIG['/'];

    // Fusionner avec les données dynamiques
    const mergedConfig: SeoConfig = {
      ...baseConfig,
      ...config,
    };

    // Appliquer la configuration fusionnée
    this.updateSeoTags(mergedConfig);
  }
}
