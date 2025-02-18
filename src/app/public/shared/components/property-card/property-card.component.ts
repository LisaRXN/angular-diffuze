import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  imports: [],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent implements OnInit {

  router = inject(Router)

  id:number = 0
  @Input() image:string = ""
  @Input() property_type: string = ""
  @Input() city: string = ""
  @Input() street: string = ""
  @Input() living_space: number = 0
  @Input() room: number = 0
  floor: number = 0
  @Input() selling_price: number = 0

  formatted_price:string = ""
  surface_price: number = 0
  formatted_surface_price:string = ""
  
  ngOnInit(): void {
    this.formatted_price = this.selling_price.toLocaleString('fr-FR')
    this.surface_price = Math.round(this.selling_price / this.living_space)
    this.formatted_surface_price = this.surface_price.toLocaleString('fr-FR')
  }

  navigateTo(){
    this.router.navigate([`property/${this.id}`])
  }
}
