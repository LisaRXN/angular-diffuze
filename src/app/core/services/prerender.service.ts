import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrerenderService {
  // Simulons une base de données d'articles
  private articles = [
    {
      id: '1',
      title: 'Article 1',
      content:
        "Contenu 1 de l'article 1 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '2',
      title: 'Article 2',
      content:
        "Contenu 2 de l'article 2 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '3',
      title: 'Article 3',
      content:
        "Contenu 3 de l'article 3 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '4',
      title: 'Article 4',
      content:
        "Contenu 4 de l'article 4 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '5',
      title: 'Article 5',
      content:
        "Contenu 5 de l'article 5 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  constructor() {}

  // Méthode utilisée par app.routes.server.ts
  async getArticleIds(): Promise<string[]> {
    return this.articles.map((article) => article.id);
  }

  // Méthode pour récupérer tous les articles
  getArticles(): Observable<any[]> {
    // En production, remplacer par un vrai appel API
    return from([this.articles]);
  }

  // Méthode pour récupérer un article spécifique
  getArticleById(id: string): Observable<any> {
    // En production, remplacer par un vrai appel API
    const article = this.articles.find((a) => a.id === id);
    return from([article]);
  }
}
