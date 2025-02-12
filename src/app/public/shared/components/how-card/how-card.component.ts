import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-card',
  imports: [CommonModule],
  templateUrl: './how-card.component.html',
  styleUrl: './how-card.component.scss'
})
export class HowCardComponent {

  router = inject(Router)
  page:string = ""

  @Input() number: string = ""
  @Input() title: string = ""
  @Input() checks: string[] = []
  @Input() text: string = ""
  @Input() image: string = ""
  @Input() left: boolean = false

  navigateTo(page:string){
    this.router.navigate([page])
  }
  

}
