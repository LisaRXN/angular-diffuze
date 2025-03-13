import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import { Router, RouterLink } from '@angular/router';
import { PropertyGateway } from '../../../core/ports/property.gateway';
import { Property } from '../../../core/models/property.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PartnersDialogComponent } from '../../shared/components/partners-dialog/partners-dialog.component';
import { NumberCardComponent } from './components/number-card/number-card.component';
import reviewsDetails from '../../../../assets/data/reviews.json';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PropertyCardComponent,
    RouterLink,
    PartnersDialogComponent,
    NumberCardComponent,
  ],
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
  propertyGateway = inject(PropertyGateway);
  properties$!: Observable<Property[]>;
  properties: Property[] = [];
  isDialogOpen: boolean = false;
  isCarouselStart = true;
  isCarouselEnd = false;
  hasStartedAnimation: boolean = false;
  reviews = reviewsDetails;

  @ViewChild(PartnersDialogComponent) dialogComponent!: PartnersDialogComponent;
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  @ViewChildren(NumberCardComponent)
  numberCards!: QueryList<NumberCardComponent>;
  @ViewChild('numbers') numbersRef!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.hasStartedAnimation || typeof window === 'undefined') return;

    const numberElement = this.numbersRef.nativeElement;
    const windowHeight = window.innerHeight;

    if (
      numberElement &&
      window.scrollY > numberElement.offsetTop - windowHeight
    ) {
      this.numberCards.forEach((card) => card.startCount());
      this.hasStartedAnimation = true;
    }
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.onScroll();
    }
  }

  ngOnInit() {
    this.propertyGateway.fetchLastProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  navigateToProperty(property: Property) {
    this.router.navigate(['property', property.id]);
  }

  openModal() {
    if (this.dialogComponent) {
      this.dialogComponent.openModal();
    } else {
      console.error('modalComponent est undefined');
    }
  }
}
