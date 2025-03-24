import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { map, of, switchMap, combineLatest } from 'rxjs';
import { PropertyGateway } from '../../../core/ports/property.gateway';
import { Property } from '../../../core/models/property.model';
import { environment } from '../../../../environments/environment';
import { CapitalizePipe } from '../../../pipes/capitalize/capitalize.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { AdCardComponent } from '../annonces/components/ad-card/ad-card.component';
import { ContactDetails } from '../../../core/models/contactDetails';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-annonce-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    CapitalizePipe,
    GoogleMap,
    MapAdvancedMarker,
    AdCardComponent,
  ],
  templateUrl: './annonce-detail.component.html',
  styleUrl: './annonce-detail.component.scss',
})
export class AnnonceDetailComponent {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  private route = inject(ActivatedRoute);
  private propertyGateway = inject(PropertyGateway);
  private sanitizer = inject(DomSanitizer)
  baseUrl = environment.publicURL;
  loading: boolean = false;
  submitted: boolean = false;
  isMessageOpen: boolean = false;
  property!: Property;
  similarProperties: Property[] = [];
  filters = {
    localization: [''],
    propertyType: '',
    transactionType: '',
    maxPrice: '',
  };
  isCarouselStart = true;
  isCarouselEnd = false;

  cityScanToken = 'YHszkGLePsRYQTf1dI9UqY2eufBzLs2phZwYa9a8Ort6yr-jvxYpz0tE_U5UyCnLjjWNn_PTB_P0pMm8nkue0l0yq93jsbHH7fYQZQpN3lemt2LlAP_j1c78dEhYLFyxZlMoeUeDB0GUZVu5xW0boLKmbQ'
  cityScanApiKey = environment.cityScanApiKey
  url = `https://location-insight.cityscan.fr/${this.cityScanApiKey}/${this.cityScanToken}`;
  safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

  mapCenter = { lat: 48.8566, lng: 2.3522 };
  zoom: number = 12;
  mapOptions: any = {
    mapType: 'satellite',
    heading: 90,
    tilt: 45,
  };

  contactForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl<string>('Bonjour,\nJe souhaiterais avoir plus de renseignements sur ce bien.\nCordialement.', {
      validators: [Validators.required],
    }),
    propertyId: new FormControl<number>(0, { nonNullable: true }),
  });



  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.carousel) return;
      this.checkScrollPosition();
      this.carousel.nativeElement.addEventListener('scroll', () =>
        this.checkScrollPosition()
      );
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) =>
          this.propertyGateway.fetchPropertyById(params['id'])
        ),
        switchMap((property: Property) => {
          this.loading = false;
          this.property = property;
          this.mapCenter = { lat: parseFloat(property.addressForm.latitude), lng: parseFloat(property.addressForm.longitude) };
          this.contactForm.patchValue({ propertyId: this.property.id });
          this.filters.propertyType = property.property_type;
          this.filters.localization.push(property.addressForm.city);
          this.filters.transactionType = property.transaction_type;
          return this.propertyGateway.fetchFilteredProperties(this.filters);
        })
      )
      .subscribe(
        (fetchAdResponse) =>
          (this.similarProperties = fetchAdResponse.properties
            .filter((property) => property.id != this.property.id)
            .slice(0, 3))
      );
  }

  onSubmitContact() {
    this.submitted = true;
    if (this.contactForm.valid) {
      const contactDetails = this.contactForm.getRawValue();
      console.log(contactDetails);
      this.propertyGateway
        .sendPropertyInquiry(contactDetails)
        .subscribe((data) => {
          console.log(data);
          this.resetForm();
          // if (data.status == 200) this.showSuccessNotif();
          // else this.showErrorNotif();
        });
    } else {
      return;
    }
  }

  resetForm() {
    this.contactForm.reset({
      lastName: '',
      firstName: '',
      phone: '',
      email: '',
      message: '',
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

  get sellingPrice(): number {
    return Number(this.property.selling_price.replace(/\s/g, ""));
  }
  get rentingPrice(): number {
    return Number(this.property.rent_by_month.replace(/\s/g, ""));
  }

}
