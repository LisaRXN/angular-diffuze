import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HomeCardComponent } from '../../shared/components/home-card/home-card.component';

@Component({
  selector: 'app-home',
  imports: [HomeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Accueil - FrontPro');
    this.meta.addTags([
      { name: 'description', content: "Page d'accueil de FrontPro" },
      { property: 'og:title', content: 'FrontPro - Accueil' },
      {
        property: 'og:description',
        content: 'Découvrez nos services professionnels',
      },
    ]);
  }
}
