import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HomeCardComponent } from '../../shared/components/home-card/home-card.component';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { HowCardComponent } from "../../shared/components/how-card/how-card.component";
import { PropertyCardComponent } from "../../shared/components/property-card/property-card.component";
import { ReviewCardComponent } from "../../shared/components/review-card/review-card.component";

@Component({
  selector: 'app-home',
  imports: [HomeCardComponent, ButtonComponent, HowCardComponent, PropertyCardComponent, ReviewCardComponent],
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
