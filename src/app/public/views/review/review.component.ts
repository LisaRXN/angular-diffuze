import { Component } from '@angular/core';
import reviewsDetails from '../../../../assets/data/reviews.json'
import { ReviewCardComponent } from "./components/review-card/review-card.component";

@Component({
  selector: 'app-review',
  imports: [ReviewCardComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  reviews = reviewsDetails;
}
