import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrerenderService } from '../../../../core/services/prerender.service';
import { combineLatest, fromEvent, map, Subscription, switchMap } from 'rxjs';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { ArticleGateway } from '../../../../core/ports/article.gateway';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  templateUrl: './blog-list.component.html',
  styles: [
    `
      .blog-list-container {
        padding: 2rem;
      }
    `,
  ],
})
export class BlogListComponent implements OnInit {
  articles: any[] = [];
  type: any = {};

  constructor(
    private route: ActivatedRoute,
    private articleGateway: ArticleGateway
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = +params['id'];
          return combineLatest([
            this.articleGateway.getArticlesByType(id),
            this.articleGateway
              .getArticleTypes()
              .pipe(map((types) => types.filter((type) => type.id === id))),
          ]);
        })
      )
      .subscribe({
        next: ([articles, type]) => {
          this.articles = articles;
          this.type = type[0];
        },
        error: (error) => console.error('Erreur:', error),
      });
  }
}
