import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  viewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  GoogleMap,
  MapAdvancedMarker,
  MapMarkerClusterer,
} from '@angular/google-maps';
import { debounceTime, map, Observable, switchMap, tap } from 'rxjs';
import {
  FetchAdResponse,
  PropertyGateway,
} from '../../../core/ports/property.gateway';
import { AdCardComponent } from './components/ad-card/ad-card.component';
import { Ad, alertFilters } from '../../../core/models/ad.models';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { Advantages, Property } from '../../../core/models/property.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertGateway } from '../../../core/ports/alert.gateway';
import { RouterLink, Router } from '@angular/router';
import { MapPricePipe } from '../../../pipes/mapPrice/map-price.pipe';
import { WindowService } from '../../../core/services/window.service';

@Component({
  selector: 'app-annonces',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMap,
    GoogleMapsModule,
    AdCardComponent,
    RouterLink,
    MapPricePipe,
  ],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
  animations: [
    trigger('slideIn', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [animate('300ms ease-out')]),
    ]),
  ],
})
export class AnnoncesComponent implements OnInit, AfterViewInit {
  @ViewChild(AlertDialogComponent) alertDialogComponent!: AlertDialogComponent;
  @ViewChild('addresstext') addresstext!: ElementRef<HTMLInputElement>;
  @ViewChild('alerttext') alerttext!: ElementRef<HTMLInputElement>;
  @ViewChild('filtertext') filtertext!: ElementRef<HTMLInputElement>;
  @ViewChild('propertiesContainer') propertiesContainer!: ElementRef;
  @ViewChild('modal') modalRef!: ElementRef;
  @ViewChild('alertCheckbox') alertCheckboxRef!: ElementRef<HTMLInputElement>;
  @ViewChild('filterCheckbox') filterCheckboxRef!: ElementRef<HTMLInputElement>;
  @ViewChild('mapContainer') mapContainerRef!: ElementRef;
  @ViewChildren('propertyCard') propertiesCardRef!: QueryList<AdCardComponent>;

  private alertGateway = inject(AlertGateway);
  private ngZone = inject(NgZone);
  private propertyGateway = inject(PropertyGateway);
  private WindowService = inject(WindowService);

  properties$!: Observable<Property[]>;
  properties: Property[] = [];
  displayedProperties: Property[] = [];
  selectedProperty: Property | null = null;
  hoveredPropertyId: number = 0;
  totalPages: number = 1;
  totalItems: number = 0;
  locations: string[] = [];
  sortingType: string = 'recent';

  currentPage = signal(1);
  localization = signal<string[]>([]);
  propertyType = signal('');
  transactionType = signal('selling');
  minPrice = signal(null);
  maxPrice = signal(null);
  minSurface = signal(null);
  maxSurface = signal(null);

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

  selectedFiltersCount = computed(() => {
    const filters = this.search();
    console.log(filters);
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (
        key !== 'page' &&
        key !== 'transactionType' &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        count++;
      }
    });
    return count;
  });

  filteredProperties$: Observable<FetchAdResponse> = toObservable(
    this.search
  ).pipe(
    debounceTime(300),
    tap(() => this.saveFilters()),
    switchMap((filters) =>
      this.propertyGateway.fetchFilteredProperties(filters)
    )
  );

  submitted = false;
  alertForm: FormGroup = new FormGroup({
    propertyType: new FormControl('', Validators.required),
    minPrice: new FormControl(null, [Validators.required]),
    maxPrice: new FormControl(null, [Validators.required]),
    room: new FormControl(1, Validators.required),
    bedroom: new FormControl(1, Validators.required),
    minSurface: new FormControl(null, Validators.required),
    maxSurface: new FormControl(null, Validators.required),
    advantages: new FormGroup({
      has_elevator: new FormControl(false),
      has_balcony: new FormControl(false),
      has_terrace: new FormControl(false),
      has_parking: new FormControl(false),
      has_box: new FormControl(false),
      has_cellar: new FormControl(false),
    }),
    locations: new FormControl([], Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  markersRef = viewChildren(MapAdvancedMarker);
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  mapCenter = signal({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
  zoom = signal(5);
  place: any;
  imagePath: string =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  iconConfig = {
    url: 'assets/img/icon/rectangle.png',
    scaledSize: new google.maps.Size(60, 30),
  };
  isDesktop: boolean = true;
  openMap: boolean = false;

  ngOnInit() {
    this.filteredProperties$.subscribe((fetchAdResponse) => {
      this.properties = fetchAdResponse.properties;
      this.displayedProperties = fetchAdResponse.properties;
      this.totalPages = fetchAdResponse.pagination.totalPages;
      this.totalItems = fetchAdResponse.pagination.totalItems;
    });

    this.loadFilters();
    this.changeSortingType();
    this.isDesktop = this.WindowService.isDesktop();
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

  ngOnDestroy() {
    document.body.style.overflow = '';
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
    // const propertyCardRef = this.propertiesCardRef
    //   .toArray()
    //   .find((element) => element.property.id === property.id);

    // setTimeout(() => {
    //   const propertyCardRef = this.propertiesCardRef
    //     .toArray()
    //     .find((element) => element.property.id === property.id);

    //   if (propertyCardRef?.carousel?.nativeElement) {
    //     propertyCardRef.carousel.nativeElement.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'start',
    //     });
    //   }
    // }, 50);
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
      types: [
        'locality',
        'sublocality',
        'postal_code',
        'administrative_area_level_2',
      ],
    };

    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      options
    );
    const alertAutocomplete = new google.maps.places.Autocomplete(
      this.alerttext.nativeElement,
      options
    );

    const filterAutoComplete = new google.maps.places.Autocomplete(
      this.filtertext.nativeElement,
      options
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = autocomplete.getPlace();

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
      this.mapCenter.set(newCenter);
      this.zoom.set(12);
    });

    alertAutocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = alertAutocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }
        let locations = this.alertForm.get('locations')?.value || [];
        if (!locations.includes(this.place.name)) {
          locations.push(this.place.name);
          this.alertForm.get('locations')?.setValue(locations);
        }
        this.alertForm.get('locations')?.setValue(locations);
        this.alerttext.nativeElement.value = '';
      });
    });

    filterAutoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = filterAutoComplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }
        this.localization.update((currentLocations) => [
          ...currentLocations,
          this.place.name,
        ]);
      });

      const newCenter = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      };
      this.mapCenter.set(newCenter);
      this.zoom.set(12);
    });
  }

  removeLocation(index: number) {
    this.localization.set(this.localization().filter((_, i) => i !== index));
    this.mapCenter.set({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
    this.zoom.set(5);
  }

  removeLocationInForm(index: number) {
    const array = this.alertForm.get('locations')?.value;
    array.splice(index, 1);
    this.alertForm.get('locations')?.setValue(array);
  }

  roomsForm(decrement = false) {
    const room = this.alertForm.get('room');
    if (decrement && room && room.value > 1)
      room.setValue(room.value - 1, { emitEvent: false });
    if (!decrement && room && room.value < 5)
      room.setValue(room.value + 1, { emitEvent: false });
  }
  bedroomsForm(decrement = false) {
    const bedroom = this.alertForm.get('bedroom');
    if (decrement && bedroom && bedroom.value > 1)
      bedroom.setValue(bedroom.value - 1, { emitEvent: false });
    if (!decrement && bedroom && bedroom.value < 5)
      bedroom.setValue(bedroom.value + 1, { emitEvent: false });
  }

  togglePropertyType(type: string) {
    if (this.propertyType() === type) {
      this.propertyType.set('');
    } else {
      this.propertyType.set(type);
    }
  }

  loadFilters() {
    const savedFilters = JSON.parse(localStorage.getItem('filters') || '{}');
    if (savedFilters.page) this.currentPage.set(savedFilters.page);
    if (savedFilters.localization)
      this.localization.set(savedFilters.localization);
    if (savedFilters.propertyType)
      this.propertyType.set(savedFilters.propertyType);
    if (savedFilters.transactionType)
      this.transactionType.set(savedFilters.transactionType);
    if (savedFilters.minPrice !== undefined)
      this.minPrice.set(savedFilters.minPrice);
    if (savedFilters.maxPrice !== undefined)
      this.maxPrice.set(savedFilters.maxPrice);
    if (savedFilters.minSurface !== undefined)
      this.minSurface.set(savedFilters.minSurface);
    if (savedFilters.maxSurface !== undefined)
      this.maxSurface.set(savedFilters.maxSurface);
  }

  saveFilters() {
    localStorage.setItem('filters', JSON.stringify(this.search()));
  }

  removeFilters() {
    this.localization.set([]);
    this.propertyType.set('');
    this.transactionType.set('');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.minSurface.set(null);
    this.maxSurface.set(null);

    localStorage.removeItem('filters');
  }

  onSubmitAlert() {
    this.submitted = true;
    if (this.alertForm.valid) {
      this.submitted = false;
      const filters: alertFilters = this.alertForm.getRawValue();
      this.alertGateway
        .createAlert(this.alertForm.getRawValue())
        .subscribe((data) => {
          console.log(data);
          this.resetForm();
          this.alertCheckboxRef.nativeElement.checked = false;
          // if (data.status == 200) this.showSuccessNotif();
          // else this.showErrorNotif();
        });
    } else {
      return;
    }
  }

  resetForm() {
    this.alertForm.reset({
      hasType: '',
      minPrice: null,
      maxrice: null,
      roomMin: 1,
      bedroomMin: 1,
      surfaceMin: null,
      surfaceMax: null,
      advantages: {
        has_balcony: false,
        has_box: false,
        has_cellar: false,
        has_elevator: false,
        has_parking: false,
        has_terrace: false,
      },
      locations: [],
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
