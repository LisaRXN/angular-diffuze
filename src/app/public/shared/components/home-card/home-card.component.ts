import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  imports: [],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {

@Input() image:string = ""
@Input() title:string = ""
@Input() description:string = ""

}
