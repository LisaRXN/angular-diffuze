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
import { GoogleMapsModule } from '@angular/google-maps';
import { AdCardComponent } from '../annonces/components/ad-card/ad-card.component';
import { ContactDetails } from '../../../core/models/contactDetails';
import {
  DomSanitizer,
  Meta,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { PhoneNumberPipe } from '../../../pipes/phoneNumber/phone-number.pipe';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-annonce-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    RouterLink,
    CapitalizePipe,
    AdCardComponent,
    PhoneNumberPipe
  ],
  templateUrl: './annonce-detail.component.html',
  styleUrl: './annonce-detail.component.scss',
})
export class AnnonceDetailComponent {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  private route = inject(ActivatedRoute);
  private propertyGateway = inject(PropertyGateway);
  private sanitizer = inject(DomSanitizer);
  private seoService = inject(SeoService);

  baseUrl = environment.publicURL;
  adUrl!: string;
  adTitle = 'Découvrez cette annonce !';
  loading: boolean = false;
  submitted: boolean = false;
  isMessageOpen: boolean = false;
  showSuccessNotif: boolean = false;
  showErrorNotif: boolean = false;
  isLinkCopied: boolean = false;
  isContactVisible: boolean = false;
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

  cityScanToken!: string;
  cityScanApiKey = environment.cityScanApiKey;
  safeUrl!: SafeResourceUrl

  mapCenter = { lat: 48.8566, lng: 2.3522 };
  zoom: number = 12;
  mapOptions: any = {
    mapType: 'satellite',
    heading: 90,
    tilt: 45,
  };

  contactForm: FormGroup = new FormGroup({
    clientName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    clientPhone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    clientEmail: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl<string>(
      'Bonjour,\nJe souhaiterais avoir plus de renseignements sur ce bien.\nCordialement.',
      {
        validators: [Validators.required],
      }
    ),
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
    console.log('Composant chargé');

    this.route.params
      .pipe(
        switchMap((params) =>
          this.propertyGateway.fetchPropertyById(params['id'])
        ),
        switchMap((property: Property | null) => {
          if (!property) {
            throw new Error('Propriété introuvable');
          }
          this.loading = false;
          this.property = property;
          if (
            property &&
            property.valuation &&
            property.valuation.token !== undefined
          ) {
            this.cityScanToken = property.valuation.cityscan_id_address;
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://location-insight.cityscan.fr/${this.cityScanApiKey}/${this.cityScanToken}`
            );
          }
          this.mapCenter = {
            lat: parseFloat(property.addressForm.latitude) + 0.3 * 0.001,
            lng: parseFloat(property.addressForm.longitude) - 0.3 * 0.001,
          };
          this.contactForm.patchValue({ propertyId: this.property.id });
          this.filters.propertyType = property.property_type;
          this.filters.localization.push(property.addressForm.city);
          this.filters.transactionType = property.transaction_type;

          this.adUrl = typeof window !== 'undefined' ? window.location.href : '';
          this.seoService.updateDynamicSeoTags({
            title: `Annonce immobilière - ${property.addressForm.city}`,
            description: this.stripHtml(property.description).substring(0, 160),
            ogTitle: `Annonce immobilière - ${property.addressForm.city}`,
            ogDescription: this.stripHtml(property.description).substring(
              0,
              160
            ),
            ogImage: `${this.baseUrl}${property.media.images[0].photo_path}`,
            ogUrl: `${this.adUrl}`,
          });

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
      this.propertyGateway
        .sendPropertyInquiry(contactDetails)
        .subscribe((data) => {
          console.log(data);
          this.resetForm();
          this.submitted = false;
          this.showSuccessNotif = data.success;
          this.showErrorNotif = !data.success;
        });
    } else {
      return;
    }
  }

  contactFormError() {
    return this.submitted &&
      (this.contactForm.get('clientEmail')?.hasError('required') ||
        this.contactForm.get('clientName')?.hasError('required') ||
        this.contactForm.get('clientPhone')?.hasError('required'))
      ? 'Complétez les informations manquantes.'
      : null;
  }
  emailError() {
    return this.submitted &&
      this.contactForm.get('clientEmail')?.hasError('email')
      ? "L'email n'est pas valide"
      : null;
  }

  resetForm() {
    this.contactForm.reset({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      message:
        'Bonjour,\nJe souhaiterais avoir plus de renseignements sur ce bien.\nCordialement.',
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
    return this.property?.selling_price ? Number(this.property.selling_price.replace(/\s/g, '')) : 0;
  }
  get rentingPrice(): number {
    return this.property?.rent_by_month ? Number(this.property.rent_by_month.replace(/\s/g, '')) : 0;
  }
  

  copy() {
    navigator.clipboard.writeText(this.adUrl).then(() => {
      this.isLinkCopied = true;
    });
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  // Fonction utilitaire pour supprimer les balises HTML
  private stripHtml(html: string | undefined): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  }

  generatePDF() {
    window.print();
}

}
