import { Component, Input } from '@angular/core';
import { ReviewsService, Review, CardKind } from '../services/reviewsService';

@Component({
  selector: 'cards',
  templateUrl: '../templates/cards.html',
  styleUrls: ['../styles/cards.css'],
})


export class CardsController {
  @Input() public kind: CardKind;
  public reviews: Array<Review>;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviews = this.reviewsService.classified_reviews.get(this.kind);
  }
}