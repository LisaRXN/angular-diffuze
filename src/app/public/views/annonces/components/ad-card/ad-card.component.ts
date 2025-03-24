import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { Property } from '../../../../../core/models/property.model';
import { Ad } from '../../../../../core/models/ad.models';

@Component({
  selector: 'app-ad-card',
  imports: [CommonModule],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss'
})
export class AdCardComponent implements AfterViewInit  {

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
}

