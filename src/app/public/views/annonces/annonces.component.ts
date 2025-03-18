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
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
import {
  FetchAdResponse,
  PropertyGateway,
} from '../../../core/ports/property.gateway';
import { AdCardComponent } from './components/ad-card/ad-card.component';
import { Ad, Filters } from '../../../core/models/ad.models';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { Advantages, Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-annonces',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMap,
    MapAdvancedMarker,
    AdCardComponent,
    AlertDialogComponent,
  ],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
})
export class AnnoncesComponent implements OnInit, AfterViewInit {
  @ViewChild(AlertDialogComponent) alertDialogComponent!: AlertDialogComponent;
  @ViewChild('addresstext') addresstext!: ElementRef<HTMLInputElement>;
  @ViewChild('filtertext') filtertext!: ElementRef<HTMLInputElement>;
  @ViewChild('propertiesContainer') propertiesContainer!: ElementRef;
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

  propertyGateway = inject(PropertyGateway);
  properties$!: Observable<Property[]>;
  properties: Property[] = [];
  displayedProperties: Property[] = [];
  selectedProperty: Property | null = null;
  hoveredPropertyId: number = 0;
  totalPages: number = 1;
  totalItems: number = 0;
  locations: string[] = [];

  currentPage = signal(1);
  localization = signal<string[]>([]);
  propertyType = signal('');
  transactionType = signal('selling');
  minPrice = signal(0);
  maxPrice = signal(Infinity);
  minSurface = signal(0);
  maxSurface = signal(Infinity);

  search = computed(() => ({
    page: this.currentPage(),
    localization: this.localization(),
    propertyType: this.propertyType(),
    transactionType: this.transactionType(),
    minPrice: this.minPrice(),
    maxPrice: this.maxPrice(),
    minSurface: this.minSurface(),
    maxSurface: this.maxSurface(),
  }));

  filteredProperties$: Observable<FetchAdResponse> = toObservable(
    this.search
  ).pipe(
    debounceTime(300),
    switchMap((filters) =>
      this.propertyGateway.fetchFilteredProperties(filters)
    )
  );

  markersRef = viewChildren(MapAdvancedMarker);
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  mapCenter = signal({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
  zoom = signal(5);
  place: any;
  isDialogOpen: boolean = false;

  sortingType: string = 'recent';

  filters = {
    room: 1,
    bedroom: 1,
  };

  advantages: Advantages = {
    has_balcony: false,
    has_box: false,
    has_cellar: false,
    has_elevator: false,
    has_parking: false,
    has_terrace: false,
  };

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.filteredProperties$.subscribe((fetchAdResponse) => {
      this.properties = fetchAdResponse.properties;
      this.displayedProperties = fetchAdResponse.properties;
      this.totalPages = fetchAdResponse.pagination.totalPages;
      this.totalItems = fetchAdResponse.pagination.totalItems;
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

  openAlertModal() {
    if (this.alertDialogComponent) {
      this.alertDialogComponent.openModal();
    } else {
      console.error('alertDialogComponent est undefined');
    }
  }

  clearSelected() {
    this.selectedProperty = null;
  }

  displayOnMap(property: Property) {
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
      lat: parseFloat(property.addressForm?.latitude),
      lng: parseFloat(property.addressForm?.longitude),
    };
    return pos;
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

    const filterAutoComplete = new google.maps.places.Autocomplete(
      this.filtertext.nativeElement,
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
        this.localization.update((currentLocations) => [
          ...currentLocations,
          this.place.name,
        ]);
        this.addresstext.nativeElement.value = '';
        this.currentPage.set(1);

      });
      const newCenter = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      };
      // Recentre la map
      this.mapCenter.set(newCenter);
      this.zoom.set(12);

    });

    filterAutoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        this.place = autocomplete.getPlace();

        //verify result
        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }
        this.localization.update((currentLocations) => [
          ...currentLocations,
          this.place.name,
        ]);
      });

      setTimeout(() => {
        const pacContainer = document.querySelectorAll('.pac-container');
        if (pacContainer && this.modalRef) {
          this.modalRef.nativeElement.appendChild(pacContainer[1]);
        }
      }, 300);
      const newCenter = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      };
      // Recentre la map
      this.mapCenter.set(newCenter);
      this.zoom.set(12);
    });
  }

  checkRooms(property: Property) {
    if (property.room >= this.filters.room) {
      return true;
    } else {
      return false;
    }
  }

  checkBedrooms(property: Property) {
    if (property.bedroom >= this.filters.bedroom) {
      return true;
    } else {
      return false;
    }
  }

  checkCriterias(property: Property) {
    const criterias = this.advantages;
    let elevatorFilter = true;
    let balconyFilter = true;
    let terraceFilter = true;
    let parkingFilter = true;
    let boxFilter = true;
    let basementFilter = true;

    if (
      !criterias.has_elevator &&
      !criterias.has_balcony &&
      !criterias.has_terrace &&
      !criterias.has_parking &&
      !criterias.has_box &&
      !criterias.has_cellar
    ) {
      return true;
    }
    if (criterias.has_elevator) {
      if (property.advantages.has_elevator) elevatorFilter = true;
      else elevatorFilter = false;
    }
    if (criterias.has_balcony) {
      if (property.advantages.has_balcony) balconyFilter = true;
      else balconyFilter = false;
    }
    if (criterias.has_terrace) {
      if (property.advantages.has_terrace) terraceFilter = true;
      else terraceFilter = false;
    }
    if (criterias.has_parking) {
      if (property.advantages.has_parking) parkingFilter = true;
      else parkingFilter = false;
    }
    if (criterias.has_box) {
      if (property.advantages.has_box) boxFilter = true;
      else boxFilter = false;
    }
    if (criterias.has_cellar) {
      if (property.advantages.has_cellar) basementFilter = true;
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

  removeLocation(index: number) {
    this.localization.set(this.localization().filter((_, i) => i !== index));
  }

  updateDisplayedProperties() {
    this.displayedProperties = this.displayedProperties.filter(
      (property) =>
        this.checkRooms(property) &&
        this.checkBedrooms(property) &&
        this.checkCriterias(property)
    );
    //   localStorage.setItem('filters', JSON.stringify(this.filters));
  }

  incrementRooms() {
    if (this.filters.room < 5) this.filters.room++;
  }
  decrementRooms() {
    if (this.filters.room > 1) this.filters.room--;
  }
  incrementBedrooms() {
    if (this.filters.bedroom < 5) this.filters.bedroom++;
  }

  decrementBedrooms() {
    if (this.filters.bedroom > 1) this.filters.bedroom--;
  }

  openModal() {
    this.modalRef.nativeElement.showModal();
  }

  closeModal() {
    this.updateDisplayedProperties();
    this.modalRef.nativeElement.close();
  }

  closeModalByClick(event: Event) {
    if (event.target === this.modalRef.nativeElement) {
      this.closeModal();
    }
  }

  removeFilters() {
    this.localization.set([]);
    this.propertyType.set('');
    this.transactionType.set('');
    this.minPrice.set(0);
    this.maxPrice.set(Infinity);
    this.minSurface.set(0);
    this.maxSurface.set(Infinity);
    (this.filters = {
      room: 1,
      bedroom: 1,
    }),
      (this.advantages = {
        has_elevator: false,
        has_balcony: false,
        has_terrace: false,
        has_parking: false,
        has_box: false,
        has_cellar: false,
      });
  }

  previousPage() {
    const scrollDiv = this.propertiesContainer.nativeElement;
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      scrollDiv.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  nextPage() {
    const scrollDiv = this.propertiesContainer.nativeElement;
    if (this.currentPage() < this.totalPages) {
      this.currentPage.set(this.currentPage() + 1);
      scrollDiv.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
