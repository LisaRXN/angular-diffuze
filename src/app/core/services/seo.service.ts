import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SEO_CONFIG } from './seo.config';
import { isPlatformBrowser } from '@angular/common';

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
  structuredData?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly baseUrl = 'https://www.diffuze.fr';
  private isBrowser: boolean;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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

    // Ajouter les données structurées si elles existent
    if (config.structuredData && this.isBrowser) {
      this.addStructuredData(config.structuredData);
    }
  }

  private getLinkElementByRel(rel: string): HTMLLinkElement | null {
    if (!this.isBrowser) return null;
    return document.querySelector(`link[rel='${rel}']`);
  }

  private createCanonicalLink(url: string): void {
    if (!this.isBrowser) return;

    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  private addStructuredData(data: any): void {
    if (!this.isBrowser) return;

    // Supprimer les anciennes données structurées si elles existent
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    existingScripts.forEach((script) => script.remove());

    // Ajouter les nouvelles données structurées
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
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
