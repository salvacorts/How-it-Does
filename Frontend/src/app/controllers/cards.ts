import { Component, Input } from '@angular/core';
import { ReviewsService, Review } from '../services/reviewsService';

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
    if (this.kind == CardKind.great) this.reviews = this.reviewsService.great_reviews;
    else if (this.kind == CardKind.good) this.reviews = this.reviewsService.good_reviews;
    else if (this.kind == CardKind.patchy) this.reviews = this.reviewsService.patchy_reviews;
    else if (this.kind == CardKind.bad) this.reviews = this.reviewsService.bad_reviews;
    else if (this.kind == CardKind.crap) this.reviews = this.reviewsService.crap_reviews;
  }
}

export enum CardKind {
  great = "great", 
  good = "good",
  patchy = "patchy",
  bad = "bad",
  crap = "crap"
}