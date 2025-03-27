import { Component, inject, model, OnInit, signal } from '@angular/core';
import { PrerenderService } from '../../../../core/services/prerender.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { ArticleGateway } from '../../../../core/ports/article.gateway';
import { Article } from '../../../../core/models/article.models';


@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink, FormsModule, ArticleCardComponent, NgOptimizedImage],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  types: any[] = [];
  selectedType = this.types;
  articles: Article[][] = [];
  search = signal<string>('');

  constructor(private articleGateway: ArticleGateway) {}

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
