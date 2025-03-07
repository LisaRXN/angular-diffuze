import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrerenderService } from '../../../../core/services/prerender.service';
import { Article } from '../../../../core/models/article.models';
import { combineLatest, switchMap, tap } from 'rxjs';
import { ArticleGateway } from '../../../../core/ports/article.gateway';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private articleGateway: ArticleGateway
  ) {}

  article!: Article;
  types: any[] = [];
  articleType: any;
  otherTypes: any[] = [];

  ngOnInit() {
    combineLatest([
      this.articleGateway.getArticleTypes(),
      this.route.params.pipe(
        switchMap((params) =>
          this.articleGateway.getArticleByUrl(params['slug'])
        )
      ),
    ]).subscribe(([types, article]) => {
      this.types = types;
      this.article = article;
      this.articleType = types.find((type) => type.id === article.type_article);
      this.otherTypes = types.filter(
        (type) => type.id !== this.articleType?.id
      );
      this.seoService.updateDynamicSeoTags({
        title: `${article.article_title} - DiffuZe Blog`,
        description: this.stripHtml(article.article_description).substring(
          0,
          160
        ),
        ogTitle: article.article_title,
        ogDescription: this.stripHtml(article.article_description).substring(
          0,
          160
        ),
        ogImage: article.article_preview,
        canonicalUrl: `https://www.diffuze.fr/blog/${article.url}`,
        structuredData: {
          '@type': 'BlogPosting',
          headline: article.page_title,
          description: this.stripHtml(article.article_description).substring(
            0,
            160
          ),
          image: article.article_preview,
          url: `https://www.diffuze.fr/blog/${article.url}`,
          datePublished: article.creation_date || new Date().toISOString(),
          dateModified:
            article.update_date ||
            article.creation_date ||
            new Date().toISOString(),
          author: {
            '@type': 'Person',
            name: article.author,
          },
          publisher: {
            '@id': 'https://www.diffuze.fr/',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.diffuze.fr/blog/${article.url}`,
          },
          articleSection: this.articleType?.name || 'Blog',
        },
      });
    });
  }
  // Fonction utilitaire pour supprimer les balises HTML
  private stripHtml(html: string | undefined): string {
    if (!html) return '';

    // Éviter l'utilisation de document qui n'est pas disponible côté serveur
    return html.replace(/<[^>]*>/g, '');
  }
}
