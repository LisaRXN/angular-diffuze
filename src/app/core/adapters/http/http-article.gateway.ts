import { map, Observable } from 'rxjs';
import { Article, Type } from '../../models/article.models';
import { ArticleGateway } from '../../ports/article.gateway';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface FetchArticlesResponse {
  succes: boolean;
  data: any[];
  pagination: any;
}

export class HttpArticleGateway extends ArticleGateway {
  http = inject(HttpClient);

  override getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.prodURL + '/articles/');
  }

  override getArticleUrls(): Promise<any[]> {
    return this.http
      .get<any[]>(environment.prodURL + '/articles/pro-urls')
      .toPromise() as Promise<any[]>;
  }

  override getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(environment.prodURL + '/articles/' + id);
  }

  override getArticleByUrl(url: string): Observable<Article> {
    return this.http.get<Article>(environment.prodURL + '/articles/' + url);
  }

  override getArticleTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(
      environment.prodURL + '/articles/articles/types'
    );
  }

  override getArticlesByType(type_id: number): Observable<Article[]> {
    return this.http
      .get<FetchArticlesResponse>(
        environment.prodURL + `/articles/pro/${type_id}/1/10`
      )
      .pipe(map((response) => response.data));
  }

  override getLastArticlesByType(): Observable<Article[][]> {
    return this.http
      .get<FetchArticlesResponse>(environment.prodURL + '/articles/pro/0/1/1')
      .pipe(map((response) => response.data));
  }

  override getSlugCategory(id: number): string {
    return this.categories[id];
  }

  override getIdCategory(slug: string): number {
    const category = Object.entries(this.categories).find(
      ([key, value]) => value === slug
    );
    return category ? parseInt(category[0]) : 1;
  }

  override getFilteredArticles(search: string): Observable<Article[]> {
    const cleanedSearch = encodeURIComponent(search.trim().toLowerCase());
    return this.http
    .get<Article[]>(`https://data.barnabe-immo.fr/api/articles/search?search=${cleanedSearch}&for=pro`)
  }
}