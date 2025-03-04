import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { PropertyGateway } from '../../../core/ports/property.gateway';
import { Property } from '../../../core/models/property.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PartnersDialogComponent } from '../../shared/components/partners-dialog/partners-dialog.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PropertyCardComponent, RouterLink, PartnersDialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Accueil - DiffuZe. Immobilier');
    this.meta.addTags([
      { name: 'description', content: "Page d'accueil de DiffuZe. Immobilier" },
      { property: 'og:title', content: 'DiffuZe. Immobilier - Accueil' },
      {
        property: 'og:description',
        content: 'Découvrez nos services professionnels',
      },
    ]);
  }

  router = inject(Router);
  private readonly dialog = inject(MatDialog);
  propertyGateway = inject(PropertyGateway);
  properties$!: Observable<Property[]>;
  isDialogOpen:boolean = false 
  properties: Property[] = [];
  isCarouselStart = true;
  isCarouselEnd = false;

  
  ngOnInit() {
    this.propertyGateway.fetchLastProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  ngAfterViewInit() {
    this.checkScrollPosition();
    this.carousel.nativeElement.addEventListener('scroll', () => this.checkScrollPosition());
  }

  checkScrollPosition() {
    const carousel = this.carousel.nativeElement;
    this.isCarouselStart = carousel.scrollLeft === 0;
    this.isCarouselEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
  }

  prevSlide() {
    const carousel = this.carousel.nativeElement;
    carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
  }
  
  nextSlide() {
    const carousel = this.carousel.nativeElement;
    carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
  }

  navigateToProperty(property: Property) {
    this.router.navigate(['property', property.id]);
  }

  @ViewChild(PartnersDialogComponent) dialogComponent!: PartnersDialogComponent;
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  openModal() {
    if (this.dialogComponent) {
      this.dialogComponent.openModal();
    } else {
      console.error('modalComponent est undefined');
    }
  }
  
}
