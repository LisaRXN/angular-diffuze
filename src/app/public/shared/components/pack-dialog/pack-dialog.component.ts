import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
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
  selector: 'app-pack-dialog',
  imports: [MatIconModule, MatDialogTitle, MatDialogClose, MatDialogContent, MatButtonModule],
  templateUrl: './pack-dialog.component.html',
  styleUrl: './pack-dialog.component.scss'
})
export class PackDialogComponent {

  partners:Partner[] = partnersDetails.filter(partner => partner.id > 4)

}
