import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { Article, Categories } from '../models/article.models';
import { Type } from '../models/article.models';

export abstract class ArticleGateway {
  private articles: Article[] = [];

  categories: Categories = {
    1: 'guide-immo',
    2: 'acteurs-immo',
    3: 'actualite-immobiliere',
  };

  abstract getArticleUrls(): Promise<any[]>;

  abstract getArticles(): Observable<Article[]>;

  abstract getArticleById(id: string): Observable<Article>;

  abstract getArticleByUrl(url: string): Observable<Article>;

  abstract getArticleTypes(): Observable<Type[]>;

  abstract getArticlesByType(type_id: number): Observable<Article[]>;

  abstract getLastArticlesByType(): Observable<Article[][]>;

  abstract getSlugCategory(id: number): string;

  abstract getIdCategory(slug: string): number;

  abstract getFilteredArticles(search: string): Observable<Article[]>;
}
