import { Component, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PartnersDialogComponent } from '../../../../shared/components/partners-dialog/partners-dialog.component';
import { PackDialogComponent } from '../../../../shared/components/pack-dialog/pack-dialog.component';


interface Service {
  id: string;
  image:string;
  backGroundColor:string;
  textColor:string;
  text:{ text1: string; number: string, ttc?:string, text2:string };
  klarna?:string;
  description:{text:string, img?:string}[];
}

@Component({
  selector: 'app-service-card',
  imports: [CommonModule, PartnersDialogComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {

  @Input() service!: Service;
  
    @ViewChild(PartnersDialogComponent) dialogComponent!: PartnersDialogComponent;
    openModal() {
      if (this.dialogComponent) {
        this.dialogComponent.openModal();
      } else {
        console.error('modalComponent est undefined');
      }
    }

}
