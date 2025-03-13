import { Component, EventEmitter, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Ad, Filters } from '../../../../../core/models/ad.models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-filters-dialog',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss',
})
export class FiltersDialogComponent {
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @Input() filters!: Filters;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

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
    this.close.emit(); 

  }

  closeModalByClick(event: Event) {
    if (event.target === this.modalRef.nativeElement) {
      this.closeModal();
    }
  }

  removeFilters() {
    this.filters = {
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
  }
}
