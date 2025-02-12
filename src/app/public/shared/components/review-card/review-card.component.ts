import { Component } from '@angular/core';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {

  client: string = "Orpi"
  review: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus mauris ut velit interdum, in cursus nulla efficitur. Nam rutrum felis lacus, non sagittis purus hendrerit vitae. Phasellus vel dapibus nunc. Etiam ornare dolor ac risus eleifend, eu egestas turpis condimentum."

  //Logic pour fetcher les derniers avis
  
}
