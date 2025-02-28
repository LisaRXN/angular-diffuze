import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrerenderService } from '../../../../core/services/prerender.service';
import { Article } from '../../../../core/models/article.models';
import { combineLatest, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private prerenderService: PrerenderService
  ) {}

  article!: Article;
  types: any[] = [];
  articleType:any
  otherTypes:any[] = []

  ngOnInit() {
    combineLatest([
      this.prerenderService.getArticleTypes(),
      this.route.params.pipe(
        switchMap(params => this.prerenderService.getArticleById(params['id']))
      )
    ]).subscribe(
      ([types, article]) => {
        this.types = types;
        this.article = article;
        this.articleType = types.find(type => type.id === article.type_article);
        this.otherTypes = types.filter(type => type.id !== this.articleType?.id);
      },
    );
  }

}
