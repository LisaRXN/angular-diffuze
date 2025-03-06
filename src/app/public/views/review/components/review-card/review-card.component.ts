import { Component, Input } from '@angular/core';


interface Review {
  id:number,
  agency:string;
  text?:string,
  image:string,
  date?:string
}

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})

export class ReviewCardComponent {

  @Input() review!:Review

}
