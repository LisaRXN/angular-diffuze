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
import { Advantages } from '../../../../../core/models/property.model';

@Component({
  selector: 'app-alert-dialog',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
})
export class AlertDialogComponent implements AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('alerttext') alerttext!: ElementRef<HTMLInputElement>;
  @ViewChild('alertLocationContainer')
  alertLocationContainerRef!: ElementRef<HTMLInputElement>;
  place: any;
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
    this.submitted = true; // Active l'affichage des erreurs
    if (this.alertForm.valid) {
      this.submitted = false;
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
    }else{
      return
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
  incrementRooms() {
    const room = this.alertForm.get('room');
    if (room && room.value < 5) {
      room.setValue(room.value + 1, { emitEvent: false });
    }
  }

  decrementRooms() {
    const room = this.alertForm.get('room');
    if (room && room.value > 1) {
      room.setValue(room.value - 1, { emitEvent: false });
    }
  }
  incrementBedrooms() {
    const bedroom = this.alertForm.get('bedroom');
    if (bedroom && bedroom.value < 5) {
      bedroom.setValue(bedroom.value + 1, { emitEvent: false });
    }
  }

  decrementBedrooms() {
    const bedroom = this.alertForm.get('bedroom');
    if (bedroom && bedroom.value > 1) {
      bedroom.setValue(bedroom.value - 1, { emitEvent: false });
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
