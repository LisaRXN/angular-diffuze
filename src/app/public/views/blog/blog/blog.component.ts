import { Component, model, signal } from '@angular/core';
import { PrerenderService } from '../../../../core/services/prerender.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ArticleCardComponent } from '../components/article-card/article-card.component';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink, FormsModule, ArticleCardComponent],
  templateUrl: './blog.component.html',
})
export class BlogComponent {

  types: any[] = [];
  selectedType: any = []
  articlesByType: any = [];

  search = signal<string>('')

  constructor(private prerenderService: PrerenderService) {}

  ngOnInit(){

    this.prerenderService.getArticleTypes().subscribe({
      next: (types) => {
        this.types = types;
        this.selectedType = types;

        types.forEach((type) => {
          this.prerenderService.getArticlesByType(type.id).subscribe({
            next: (articles) => {
              this.articlesByType[type.id] = articles;
            },
            error: (err) => console.error(`Erreur pour le type ${type.id}:`, err)
          });
        });
      },
      error: (error) => console.error('Erreur lors de la récupération des articles:', error)
    });
  }
  

  selectType(id:number){
    return this.selectedType = this.types.filter( type => type.id === id )
  }

  getArticlesByType(type_id:number){
    this.prerenderService.getArticlesByType(type_id).subscribe({
      next: (articles) => {
        this.articlesByType = articles;
      },
      error: (err) => console.error('Erreur lors de la récupération des articles par type:', err)
    });
  }

  

}
