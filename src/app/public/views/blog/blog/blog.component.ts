import { Component, inject, model, OnInit, signal } from '@angular/core';
import { PrerenderService } from '../../../../core/services/prerender.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime, filter, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { ArticleGateway } from '../../../../core/ports/article.gateway';
import { Article } from '../../../../core/models/article.models';
import { toObservable } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink, FormsModule, ArticleCardComponent, NgOptimizedImage],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  private articleGateway = inject(ArticleGateway)
  types: any[] = [];
  selectedType = this.types;
  articles: Article[][] = [];
  
  search = signal(''); 
  
  search$: Observable<Article[]> = toObservable(this.search).pipe(
    debounceTime(300),
    filter(search => search.length >= 3),
    switchMap(search => this.articleGateway.getFilteredArticles(search))
  )

  isSearching$:Observable<boolean> = toObservable(this.search).pipe(
    map(search => search.trim().length >= 3)
  );


  ngOnInit() {

    forkJoin([
      this.articleGateway.getArticleTypes(),
      this.articleGateway.getLastArticlesByType(),
    ]).subscribe({
      next: ([types, articles]) => {
        this.types = types;
        this.selectedType = types;
        this.articles = articles;
      },
      error: (error) => console.error('Erreur lors du chargement :', error),
    });
  }

  selectType(id: number) {
    return (this.selectedType = this.types.filter((type) => type.id === id));
  }

  getSlugCategory(id: number): string | undefined {
    return this.articleGateway.getSlugCategory(id);
  }
}
