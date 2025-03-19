import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { PrerenderService } from './core/services/prerender.service';
import { ArticleGateway } from './core/ports/article.gateway';
import { sitemapHandler } from '../../sitemapHandler';
export const serverRoutes: ServerRoute[] = [
  {
    path: '', // Page d'accueil
    renderMode: RenderMode.Prerender, // SSG - Généré statiquement
  },
  {
    path: 'notre-offre',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'nos-partenaires',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'blog/:url', // Articles de blog en SSG avec paramètres
    renderMode: RenderMode.Prerender, // SSG avec paramètres dynamiques
    async getPrerenderParams() {
      const articleGateway = inject(ArticleGateway);
      const articleIds = await articleGateway.getArticleUrls();
      return articleIds.map((url) => ({ url }));
    },
    fallback: PrerenderFallback.Server, // Si l'article n'existe pas en SSG, utiliser SSR
  },
  {
    path: 'dashboard', // Dashboard en CSR (rendu côté client)
    renderMode: RenderMode.Client, // CSR - Rendu côté client uniquement
  },
  {
    path: '**', // Toutes les autres routes en SSR
    renderMode: RenderMode.Server,
  },
];
