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

  constructor(public reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviews = this.reviewsService.classified_reviews.get(this.kind);   
  }

  public Overflow(element: HTMLDivElement, review: Review): boolean {
    // If its still not rendered on DOM
    if (element.clientHeight == 0) return false
    
    if (review.Expansible == undefined) {
      review.Expansible = element.clientHeight < element.scrollHeight
    }
    
    return review.Expansible
  }

  public FormatText(text: string): string[] {
    return text.split("\n")
  }
}