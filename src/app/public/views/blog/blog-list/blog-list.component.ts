import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrerenderService } from '../../../../core/services/prerender.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="blog-list-container">
      <h1>Blog Articles</h1>
      <div *ngFor="let article of articles">
        <h2>{{ article.title }}</h2>
        <a [routerLink]="['/blog', article.id]">Lire la suite</a>
      </div>
    </div>
  `,
  styles: [
    `
      .blog-list-container {
        padding: 2rem;
      }
    `,
  ],
})
export class BlogListComponent {
  articles: any[] = [];

  constructor(private prerenderService: PrerenderService) {}

  ngOnInit() {
    this.prerenderService.getArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    );
  }
}
