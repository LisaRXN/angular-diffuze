import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { alertFilters, Filters } from '../../../../../core/models/ad.models';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AlertGateway } from '../../../../../core/ports/alert.gateway';

@Component({
  selector: 'app-alert-dialog',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
})
export class AlertDialogComponent implements AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('alerttext') alerttext!: ElementRef<HTMLInputElement>;
  @Input() filters!: Filters;
  place: any;

  alertForm: FormGroup = new FormGroup({
    hasType: new FormControl('', Validators.required),
    budgetMin: new FormControl(null, [Validators.required]),
    budgetMax: new FormControl(null, [Validators.required]),
    roomMin: new FormControl(0, Validators.required),
    bedroomMin: new FormControl(0, Validators.required),
    surfaceMin: new FormControl(null, Validators.required),
    surfaceMax: new FormControl(null, Validators.required),
    others: new FormGroup({
      hasElevator: new FormControl(false),
      hasBalcony: new FormControl(false),
      hasTerrace: new FormControl(false),
      hasParking: new FormControl(false),
      hasBox: new FormControl(false),
      hasBasement: new FormControl(false),
    }),
    locations: new FormControl([], Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  private alertGateway = inject(AlertGateway);
  private ngZone = inject(NgZone);

  ngAfterViewInit() {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API non chargé.');
      return;
    }
    this.getPlaceAutocomplete();
  }

  onSubmitAlert() {
    const filters: alertFilters = this.alertForm.getRawValue();
    this.alertGateway
      .createAlert(this.alertForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
        this.resetForm();
        this.closeModal();
        // this.alertCheckbox.nativeElement.checked = false;
        // if (data.status == 200) this.showSuccessNotif();
        // else this.showErrorNotif();
      });
  }

  resetForm() {
    this.alertForm.reset({
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
      locations: [],
    });
  }
  incrementRooms() {
    if (this.filters.roomMin < 5) {
      this.filters.roomMin++;
    }
  }

  decrementRooms() {
    if (this.filters.roomMin > 1) {
      this.filters.roomMin--;
    }
  }
  incrementBedrooms() {
    if (this.filters.bedroomMin < 5) {
      this.filters.bedroomMin++;
    }
  }

  decrementBedrooms() {
    if (this.filters.bedroomMin > 1) {
      this.filters.bedroomMin--;
    }
  }

  openModal() {
    this.modalRef.nativeElement.showModal();
  }

  closeModal() {
    this.modalRef.nativeElement.close();
  }
  removeLocation(index: number) {
    const array = this.alertForm.get('locations')?.value;
    array.splice(index, 1);
    this.alertForm.get('locations')?.setValue(array);
  }

  getPlaceAutocomplete() {
    console.log(
      '🔍 Initialisation Google Maps sur:',
      this.alerttext.nativeElement
    );

    if (!this.alerttext.nativeElement) {
      return;
    }

    const options = {
      componentRestrictions: { country: 'FR' },
    };

    const autocomplete = new google.maps.places.Autocomplete(
      this.alerttext.nativeElement,
      options
    );

    setTimeout(() => {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer && this.modalRef) {
        this.modalRef.nativeElement.appendChild(pacContainer);
      }
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = autocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        let locations = this.alertForm.get('locations')?.value;
        locations.push(this.place.name);
        this.alertForm.get('locations')?.setValue(locations);
        this.alerttext.nativeElement.value = '';
      });
    });
  }
}
