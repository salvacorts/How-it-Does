import { Component } from '@angular/core';
import { ReviewsService } from '../services/reviewsService';


@Component({
   selector: 'search',
   templateUrl: '../templates/search.html',
   styleUrls: ['../styles/search.css'],
})

export class SearchController {
   constructor(private reviewsService: ReviewsService) {}

   Search(inputValue: string) {
      this.reviewsService.currentItem = inputValue;
   }
}