import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrerenderService } from '../../../../core/services/prerender.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="blog-detail-container">
      <h1>Article de Blog</h1>
      <p>{{ article.content }}</p>
    </div>
  `,
  styles: [
    `
      .blog-detail-container {
        padding: 2rem;
      }
    `,
  ],
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private prerenderService: PrerenderService
  ) {}
  article: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // Chargez les données de l'article avec l'ID
      this.prerenderService.getArticleById(id).subscribe((article) => {
        this.article = article;
      });
      console.log(this.article);
    });
  }
}
