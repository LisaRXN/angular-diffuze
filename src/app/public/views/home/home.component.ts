import { Component, inject, OnInit } from '@angular/core';
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
  imports: [CommonModule, PropertyCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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

  properties: Property[] = [];

  ngOnInit() {
    this.propertyGateway.fetchLastProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  navigateToProperty(property: Property) {
    this.router.navigate(['property', property.id]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PartnersDialogComponent, {
      width: '80%',
      height: '70%',
      maxWidth: '800px',
    });
  }
}
