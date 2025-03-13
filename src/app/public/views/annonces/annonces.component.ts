import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  signal,
  ViewChild,
  viewChildren,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { PropertyGateway } from '../../../core/ports/property.gateway';
import { AdCardComponent } from './components/ad-card/ad-card.component';
import { Ad } from '../../../core/models/ad.models';

@Component({
  selector: 'app-annonces',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMap,
    MapAdvancedMarker,
    AdCardComponent,
  ],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
})
export class AnnoncesComponent implements OnInit, AfterViewInit {
  @ViewChild('addresstext') addresstext!: ElementRef;
  @ViewChild('propertiesContainer') propertiesContainer!: ElementRef;
  propertyGateway = inject(PropertyGateway);
  properties$!: Observable<Ad[]>;
  properties: Ad[] = [];
  displayedPproperties: Ad[] = [];
  selectedProperty: Ad | null = null;

  markersRef = viewChildren(MapAdvancedMarker);
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  mapCenter = signal({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
  zoom = signal(5);
  place: any;
  location = signal('');
  type = signal('');
  budget = signal('');

  search = computed(() => {
    this.location(), this.type(), this.budget();
  });

  sortingType: string = 'recent';

  filters: any = {
    hasHouse: false,
    hasApartment: false,
    budgetMin: null,
    budgetMax: null,
    roomMin: 0,
    bedroomMin: 0,
    surfaceMin: null,
    surfaceMax: null,
    others: {
      hasElevator: false,
      hasBalcony: false,
      hasTerrace: false,
      hasParking: false,
      hasBox: false,
      hasBasement: false,
    },
    location: [],
  };

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.propertyGateway.getPaidAds().subscribe((properties) => {
      this.properties = properties;
      this.displayedPproperties = properties;
      console.log(properties);
    });
    this.changeSortingType();
  }

  ngAfterViewInit() {
    const scrollDiv = this.propertiesContainer.nativeElement;
    scrollDiv.addEventListener('mouseover', () => {
      document.body.style.overflow = 'hidden';
    });

    scrollDiv.addEventListener('mouseleave', () => {
      document.body.style.overflow = '';
    });

    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
      console.error("Google Maps API n'est pas encore chargée !");
      return;
    }
    this.getPlaceAutocomplete();
  }

  clearSelected() {
    this.selectedProperty = null;
  }

  displayOnMap(property: Ad) {
    if (this.selectedProperty == null) {
      this.selectedProperty = property;
    } else if (this.selectedProperty.id != property.id) {
      this.selectedProperty = property;
    } else {
      this.selectedProperty = null;
    }
  }

  getPosition(property: any) {
    const pos = {
      lat: parseFloat(property.latitude),
      lng: parseFloat(property.longitude),
    };
    return pos;
  }

  countValidBiens() {
    let count = 0;
    this.displayedPproperties.forEach((property) => {
    count++;
    })
    return count;
  }

  clearPlace() {
    this.mapCenter.set({ lat: 48.8566, lng: 2.3522 });
    this.zoom.set(5);
  }

  goToPlace(property: Ad) {
    if (property.latitude && property.longitude) {
      this.mapCenter.set({
        lat: property.latitude,
        lng: property.longitude,
      });
      this.zoom.set(6);
    }
  }


  changeSortingType() {
    if (this.sortingType == 'recent') {
      this.properties.sort((a, b) => {
        return (
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
        );
      });
    } else if (this.sortingType == 'expensive') {
      this.properties.sort((a, b) => {
        const priceA = a.selling_price
          ? parseFloat(a.selling_price.replace(/\s/g, ''))
          : 0;
        const priceB = b.selling_price
          ? parseFloat(b.selling_price.replace(/\s/g, ''))
          : 0;
        return priceB - priceA;
      });
    } else if (this.sortingType == 'cheap') {
      this.properties.sort((a, b) => {
        const priceA = a.selling_price
          ? parseFloat(a.selling_price.replace(/\s/g, ''))
          : 0;
        const priceB = b.selling_price
          ? parseFloat(b.selling_price.replace(/\s/g, ''))
          : 0;
        return priceA - priceB;
      });
    } else if (this.sortingType == 'big') {
      this.properties.sort((a, b) => {
        return (b.living_space ?? 0) - (a.living_space ?? 0);
      });
    } else if (this.sortingType == 'small') {
      this.properties.sort((a, b) => {
        return (a.living_space ?? 0) - (b.living_space ?? 0);
      });
    }
  }

  private getPlaceAutocomplete() {
    const options = {
      componentRestrictions: { country: 'FR' },
    };
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      options
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        this.place = autocomplete.getPlace();

        //verify result
        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }
        this.filters.location.push(this.place.name);
        this.updateDisplayedProperties();
      });
    });
  }

  checkPrice(property: Ad) {
    const min = this.filters.budgetMin ? this.filters.budgetMin : 0;
    const max = this.filters.budgetMax ? this.filters.budgetMax : 300000000;

    if (property.selling_price !=undefined && property.selling_price >= min && property.selling_price <= max) {
      return true;
    }else{
      return false
    }
  }

  checkType(property: Ad) {
    if (!this.filters.hasHouse && !this.filters.hasApartment) {
      return true;
    } else if (
      (this.filters.hasHouse && property.property_type == 'maison') ||
      (this.filters.hasApartment && property.property_type == 'appartement')
    ) {
      return true;
    }else{
      return false
    }
  }

  checkLocation(property: Ad) {
    if (this.filters.location.length == 0) {
      return true;
    } else {
    }
    for (let i = 0; i < this.filters.location.length; i++) {
      if (property.city == this.filters.location[i]) {
        return true;
      }
    }
    return false;
  }

  updateDisplayedProperties() {
    this.displayedPproperties = [];
    this.properties.forEach((property) => {
      if (this.checkLocation(property)) {
        this.displayedPproperties.push(property);
      }
    });
    localStorage.setItem('filters', JSON.stringify(this.filters));
  }
}
