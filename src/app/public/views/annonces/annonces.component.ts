import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  signal,
  ViewChild,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { PropertyGateway } from '../../../core/ports/property.gateway';
import { AdCardComponent } from './components/ad-card/ad-card.component';
import { Ad, Filters } from '../../../core/models/ad.models';
import { FiltersDialogComponent } from './components/filters-dialog/filters-dialog.component';

@Component({
  selector: 'app-annonces',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMap,
    MapAdvancedMarker,
    AdCardComponent,
    FiltersDialogComponent,
  ],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
})
export class AnnoncesComponent implements OnInit, AfterViewInit {
  @ViewChild(FiltersDialogComponent) dialogComponent!: FiltersDialogComponent;

  @ViewChild('addresstext') addresstext!: ElementRef;
  @ViewChild('propertiesContainer') propertiesContainer!: ElementRef;
  propertyGateway = inject(PropertyGateway);
  properties$!: Observable<Ad[]>;
  properties: Ad[] = [];
  displayedPproperties: Ad[] = [];
  selectedProperty: Ad | null = null;
  hoveredPropertyId: number = 0;

  markersRef = viewChildren(MapAdvancedMarker);
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  mapCenter = signal({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
  zoom = signal(5);
  place: any;
  isDialogOpen: boolean = false;

  sortingType: string = 'recent';

  filters: Filters = {
    hasType: '',
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

    this.getPlaceAutocomplete();
  }

  openModal() {
    if (this.dialogComponent) {
      this.dialogComponent.openModal();
    } else {
      console.error('modalComponent est undefined');
    }
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
    });
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
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API non chargé');
      return;
    }
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
      const newCenter = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      };
      // Recentre la map
      this.mapCenter.set(newCenter);
      this.zoom.set(12);
    });
  }

  checkPrice(property: Ad) {
    const min = this.filters.budgetMin ? Number(this.filters.budgetMin) : 0;
    const max = this.filters.budgetMax
      ? Number(this.filters.budgetMax)
      : 300000000;

    if (
      Number(property.selling_price) != undefined &&
      Number(property.selling_price) >= min &&
      Number(property.selling_price) <= max
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkSurface(property: Ad) {
    const min = this.filters.surfaceMin ? this.filters.surfaceMin : 0;
    const max = this.filters.surfaceMax ? this.filters.surfaceMax : 1000000;

    if (property.living_space >= min && property.living_space <= max) {
      return true;
    } else {
      return false;
    }
  }

  checkRooms(property: Ad) {
    if (property.room >= this.filters.roomMin) {
      return true;
    } else {
      return false;
    }
  }

  checkBedrooms(property: Ad) {
    if (property.bedroom >= this.filters.bedroomMin) {
      return true;
    } else {
      return false;
    }
  }

  checkType(property: Ad) {
    if (this.filters.hasType === '') {
      return true;
    } else if (this.filters.hasType === property.property_type) {
      return true;
    } else {
      return false;
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

  checkCriterias(property: Ad) {
    const criterias = this.filters.others;

    let elevatorFilter = true;
    let balconyFilter = true;
    let terraceFilter = true;
    let parkingFilter = true;
    let boxFilter = true;
    let basementFilter = true;

    if (
      !criterias.hasElevator &&
      !criterias.hasBalcony &&
      !criterias.hasTerrace &&
      !criterias.hasParking &&
      !criterias.hasBox &&
      !criterias.hasBasement
    ) {
      return true;
    }
    if (criterias.hasElevator) {
      if (property.has_elevator) elevatorFilter = true;
      else elevatorFilter = false;
    }
    if (criterias.hasBalcony) {
      if (property.has_balcony) balconyFilter = true;
      else balconyFilter = false;
    }
    if (criterias.hasTerrace) {
      if (property.has_terrace) terraceFilter = true;
      else terraceFilter = false;
    }
    if (criterias.hasParking) {
      if (property.has_parking) parkingFilter = true;
      else parkingFilter = false;
    }
    if (criterias.hasBox) {
      if (property.has_box) boxFilter = true;
      else boxFilter = false;
    }
    if (criterias.hasBasement) {
      if (property.has_cellar) basementFilter = true;
      else basementFilter = false;
    } else {
      return false;
    }
    return (
      elevatorFilter &&
      balconyFilter &&
      terraceFilter &&
      parkingFilter &&
      boxFilter &&
      basementFilter
    );
  }

  removeLocation() {
    this.filters.location = [];
    this.mapCenter = signal({ lat: 48.8566, lng: 2.3522 });
    this.zoom = signal(5);
    this.updateDisplayedProperties();
  }

  updateDisplayedProperties() {
    this.displayedPproperties = [];
    this.properties.forEach((property) => {
      if (
        this.checkLocation(property) &&
        this.checkType(property) &&
        this.checkPrice(property) &&
        this.checkSurface(property) &&
        this.checkRooms(property) &&
        this.checkBedrooms(property) &&
        this.checkCriterias(property)
      ) {
        this.displayedPproperties.push(property);
      }
    });

    localStorage.setItem('filters', JSON.stringify(this.filters));
  }
}
