import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { PrerenderService } from './core/services/prerender.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // Page d'accueil
    renderMode: RenderMode.Prerender, // SSG - Généré statiquement
  },
  {
    path: 'profil', // Page profil en SSR (données utilisateur dynamiques)
    renderMode: RenderMode.Server, // SSR - Rendu côté serveur
  },
  {
    path: 'blog/:id', // Articles de blog en SSG avec paramètres
    renderMode: RenderMode.Prerender, // SSG avec paramètres dynamiques
    async getPrerenderParams() {
      const prerenderService = inject(PrerenderService);
      const articleIds = await prerenderService.getArticleIds();
      return articleIds.map((id) => ({ id }));
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
