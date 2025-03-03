import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../../../core/models/property.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent {
  router = inject(Router);
  @Input() property!: Property;
  baseUrl = environment.publicURL;

  get selling_price_number() {
    return this.property.selling_price
      ? parseFloat(this.property.selling_price.replace(/\s/g, ''))
      : 0;
  }

  get surface_price(): number {
    return this.property.living_space
      ? this.selling_price_number / this.property.living_space
      : 0;
  }

  navigateTo() {
    this.router.navigate([`property/${this.property.id}`]);
  }
}
