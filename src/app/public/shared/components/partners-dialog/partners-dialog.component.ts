import { Component, Input } from '@angular/core';
import {MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import partnersDetails from '../../../../../assets/data/partners.json'

interface Partner {
  id:number,
  name:string,
  image:string,
  web:string,
  alt:string,
}

@Component({
  selector: 'app-partners-dialog',
  imports: [MatIconModule, MatDialogTitle, MatDialogClose, MatDialogContent, MatButtonModule],
  templateUrl: './partners-dialog.component.html',
  styleUrl: './partners-dialog.component.scss'
})
export class PartnersDialogComponent {

  partners:Partner[] = partnersDetails

}
