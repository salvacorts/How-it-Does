import { Component, Input } from '@angular/core';
import { ReviewsService, Review, CardKind } from '../services/reviewsService';
import { trigger, animate, state, transition, style } from '@angular/animations';

@Component({
  selector: 'cards',
  templateUrl: '../templates/cards.html',
  styleUrls: ['../styles/cards.css'],
})

/** Cards view controller */
export class CardsController {
  /** Category common to this Cards */
  @Input() public kind: CardKind;
  /** Reviews */
  public reviews: Array<Review>;

  constructor(public reviewsService: ReviewsService) {}

  /** 
   * Called by angular when view is rendered on DOM. 
   * Retrieves reviews from Reviews service according to kind attribute 
   */
  ngOnInit() {
    this.reviews = this.reviewsService.classified_reviews.get(this.kind);   
  }

  /**
   * Calculate if `review` text is overflowing or not in `element`. 
   * It also adds Expansible attribute to `review`
   * @param element DOM element to calculate overflow
   * @param review Review to get text from
   * 
   * @returns boolean idicanting if there is overflow or not
   */
  public Overflow(element: HTMLDivElement, review: Review): boolean {
    // If its still not rendered on DOM
    if (element.clientHeight == 0) return false
    
    if (review.Expansible == undefined) {
      review.Expansible = element.clientHeight < element.scrollHeight
    }
    
    return review.Expansible
  }
}