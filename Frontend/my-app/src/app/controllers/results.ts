import { Component } from '@angular/core';
import { ReviewsService, Review } from '../services/reviewsService';

@Component({
   selector: 'results',
   templateUrl: '../templates/results.html',
   styleUrls: ['../styles/results.css'],
})


export class ResultsController {
   constructor(private reviewsService: ReviewsService) {}
}