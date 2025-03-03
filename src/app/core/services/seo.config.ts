import { SeoConfig } from '../services/seo.service';

export interface RouteSeoConfig {
  [route: string]: SeoConfig;
}

export const SEO_CONFIG: RouteSeoConfig = {
  '/': {
    title: 'DiffuZe. Immobilier - Accueil',
    description:
      "Page d'accueil de DiffuZe. Immobilier - Diffusez vos annonces immobilières sans abonnement",
    keywords:
      'immobilier, annonces, diffusion, sans abonnement, vente, location',
    ogTitle: 'DiffuZe. Immobilier - Accueil',
    ogDescription:
      "Découvrez nos services professionnels de diffusion d'annonces immobilières",
    ogImage: 'https://www.diffuze.fr/assets/img/photo/banniere.jpg',
  },
  '/service': {
    title: 'Nos Services - DiffuZe. Immobilier',
    description:
      "Découvrez nos services de diffusion d'annonces immobilières sans abonnement",
    keywords: 'services immobiliers, diffusion annonces, sans abonnement',
    ogTitle: 'Nos Services - DiffuZe. Immobilier',
    ogDescription:
      'Services professionnels pour diffuser vos annonces immobilières',
  },
  '/blog': {
    title: 'Blog Immobilier - DiffuZe. Immobilier',
    description: "Conseils, actualités et guides sur l'immobilier",
    keywords: 'blog immobilier, conseils immobiliers, actualités immobilières',
    ogTitle: 'Blog Immobilier - DiffuZe',
    ogDescription: "Découvrez nos articles sur l'immobilier",
  },
  // Ajoutez d'autres routes selon vos besoins
};
