import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../../../core/models/article.models';

@Component({
  selector: 'app-article-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {

  @Input() article!:Article
  @Input() bg:string = 'white'

}
