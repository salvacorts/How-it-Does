import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ReviewsService, Review, CardKind } from '../services/reviewsService';
import { trigger, animate, state, transition, style } from '@angular/animations';
import { Tag } from '../parsers/parser'

@Component({
  selector: 'cards',
  templateUrl: '../templates/cards.html',
  styleUrls: ['../styles/cards.css'],
})

/** Cards view controller */
export class CardsController implements OnChanges {
  /** Category common to this Cards */
  @Input() public kind: CardKind;
  /** Current Tag */
  @Input() public tag: Tag | undefined;
  /** Reviews */
  public reviews: Array<Review>;

  constructor(public reviewsService: ReviewsService) {}

  /** 
   * Called by angular when view is rendered on DOM. 
   * Retrieves reviews from Reviews service according to kind attribute 
   */
  ngOnInit() {
    this.ngOnChanges()  
  }

  /** 
   * Called when change on members
   */
  ngOnChanges() {
    this.reviews = this.reviewsService.GetReviewsForCategory(this.kind)
  }

  IconFromKind() {
    var icon = this.kind.valueOf().toLowerCase()

    return `/assets/images/emoji/${icon}.png`
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
    
    if (review.expansible == undefined) {
      review.expansible = element.clientHeight < element.scrollHeight
    }
    
    return review.expansible
  }
}