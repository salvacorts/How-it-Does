import { Component } from '@angular/core';
import { ReviewsService } from '../services/reviewsService';


@Component({
   selector: 'search',
   templateUrl: '../templates/search.html',
   styleUrls: ['../styles/search.css'],
})

/** Controller for Search view */
export class SearchController {
   constructor(public reviewsService: ReviewsService) {}

   /**
    * Call Search from Reviews Service
    * @param inputValue item to search for
    */
   public Search(inputValue: string) {
      this.reviewsService.Search(inputValue)
   }
}