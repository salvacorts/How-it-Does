import { Component } from '@angular/core';
import { ReviewsService, Review } from '../services/reviewsService';

@Component({
   selector: 'results',
   templateUrl: '../templates/results.html',
   styleUrls: ['../styles/results.css'],
})

/** Results view controller */
export class ResultsController {
   constructor(public reviewsService: ReviewsService) {}
}