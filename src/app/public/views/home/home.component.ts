import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HomeCardComponent } from '../../shared/components/home-card/home-card.component';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { HowCardComponent } from "../../shared/components/how-card/how-card.component";
import { PropertyCardComponent } from "../../shared/components/property-card/property-card.component";
import { ReviewCardComponent } from "../../shared/components/review-card/review-card.component";
import { Router } from '@angular/router';

interface Property {
  id:number
  image:string
  property_type: string
  city: string
  street: string
  living_space: number 
  room: number
  floor: number
  selling_price: number
}

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

  router = inject(Router)

  properties: Property[] = [
    {
      id: 1,
      image: "assets/img/photo/property.png",
      property_type: "Appartement",
      city: "Paris",
      street: "Rue Martel",
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: 465000
    },
    {
      id: 2,
      image: "assets/img/photo/property.png",
      property_type: "Appartement",
      city: "Paris",
      street: "Rue Martel",
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: 465000
    },
    {
      id: 3,
      image: "assets/img/photo/property.png",
      property_type: "Appartement",
      city: "Paris",
      street: "Rue Martel",
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: 465000
    }
  ]

  navigateToProperty(property:Property){
    this.router.navigate(['property', property.id])
  }

}
