import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { Article } from '../models/article.models';
import { Type } from '../models/article.models';

export abstract class ArticleGateway {
  private articles: Article[] = [];

  // Méthode utilisée par app.routes.server.ts
  async getArticleIds(): Promise<number[]> {
    return this.articles.map((article) => article.id);
  }
  // Méthode utilisée par app.routes.server.ts
  async getArticleUrls(): Promise<string[]> {
    return this.articles.map((article) => article.url);
  }

  abstract getArticles(): Observable<Article[]>;

  abstract getArticleById(id: string): Observable<Article>;

  abstract getArticleByUrl(url: string): Observable<Article>;

  abstract getArticleTypes(): Observable<Type[]>;

  abstract getArticlesByType(type_id: number): Observable<Article[]>;

  abstract getLastArticlesByType(): Observable<Article[][]>;
}
