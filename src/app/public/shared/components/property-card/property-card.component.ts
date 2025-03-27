import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../../../core/models/property.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent implements AfterViewInit {
  router = inject(Router);
  @Input() property!: Property;
  @Input() smallCard: boolean = false

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  baseUrl = environment.publicURL;
  isCarouselStart = true;
  isCarouselEnd = false;


  ngAfterViewInit() {
    setTimeout(() => {
      this.checkScrollPosition();
      this.carousel.nativeElement.addEventListener('scroll', () =>
        this.checkScrollPosition()
      );
    });
  }
  

  checkScrollPosition() {
    const carousel = this.carousel.nativeElement;
    this.isCarouselStart = carousel.scrollLeft === 0;
    this.isCarouselEnd =
      carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
  }

  prevSlide() {
    const carousel = this.carousel.nativeElement;
    carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
  }

  nextSlide() {
    const carousel = this.carousel.nativeElement;
    carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
  }

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

  get sellingPrice(): number {
    return Number(this.property.selling_price.replace(/\s/g, ""));
  }
  get rentingPrice(): number {
    return Number(this.property.rent_by_month.replace(/\s/g, ""));
  }
}
