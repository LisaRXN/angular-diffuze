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

}
