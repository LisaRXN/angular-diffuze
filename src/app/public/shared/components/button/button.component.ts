import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  router = inject(Router)
  
  @Input() page:string = ""
  @Input() text:string = "Déposer une annonce"
  @Input() backgroundColor:string = ""
  @Input() color:string = "mygrey1"

  navigateTo(page:string){
    this.router.navigate([page])
  }

}
