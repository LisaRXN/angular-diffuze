import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  imports: [],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {

  router = inject(Router)

  id:number = 0
  image:string = "assets/img/photo/property.png"
  property_type: string ="Appartement"
  city: string = "Paris"
  street: string = "Rue Martel"
  living_space: number = 40
  room: number = 2
  floor: number = 2
  selling_price: number = 465000
  formatted_price:string = this.selling_price.toLocaleString('fr-FR')
  surface_price: number = Math.round(this.selling_price / this.living_space)
  formatted_surface_price: string = this.surface_price.toLocaleString('fr-FR')
  
  navigateTo(){
    this.router.navigate([`property/${this.id}`])
  }
}
