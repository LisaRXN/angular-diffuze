import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../../../core/models/property.model';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {

  router = inject(Router)

  @Input() property!: Property


  get surface_price(): number {
    return this.property.living_space ? this.property.selling_price! / this.property.living_space : 0;
  }
  
  navigateTo(){
    this.router.navigate([`property/${this.property.id}`])
  }
}
