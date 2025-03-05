import { Component, ElementRef, ViewChild } from '@angular/core';
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
  imports: [],
  templateUrl: './pack-dialog.component.html',
  styleUrl: './pack-dialog.component.scss'
})
export class PackDialogComponent {

  partners:Partner[] = partnersDetails.filter(partner => partner.id > 5)

    @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  
    openModal() {
      this.modalRef.nativeElement.showModal();
      console.log('partners', this.partners)
    }
  
    closeModal() {
      this.modalRef.nativeElement.close();
    }

    closeModalByClick(event: Event) {
      if (event.target === this.modalRef.nativeElement) {
      this.closeModal();
      }
    }
  

}
