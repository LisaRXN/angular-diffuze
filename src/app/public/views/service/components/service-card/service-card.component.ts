import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PartnersDialogComponent } from '../../../../shared/components/partners-dialog/partners-dialog.component';


interface Service {
  id: string;
  image:string;
  backGroundColor:string;
  textColor:string;
  text:{ text1: string; number: string, text2:string };
  klarna?:string;
  description:{text:string, img?:string}[];
}

@Component({
  selector: 'app-service-card',
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {

  private readonly dialog = inject(MatDialog)
  @Input() service!: Service;
  
    openDialog(){
      const dialogRef = this.dialog.open(PartnersDialogComponent, {
        width: '80%',      
        height: '70%',     
        maxWidth: '800px', 
      })
    }

}
