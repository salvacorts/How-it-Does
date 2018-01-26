import { Component, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser, Review, GetAvailibleParsers } from '../parsers/parser'
export { Review } from '../parsers/parser';


@Injectable() // Singleton
export class ReviewsService {
   public great_reviews: Array<Review> = [];
   public good_reviews: Array<Review> = [];
   public patchy_reviews: Array<Review> = [];
   public bad_reviews: Array<Review> = [];
   public crap_reviews: Array<Review> = [];
   public average_rating: number;
   public current_item: string;

   private parsers: Array<Parser> = [];

   constructor(@Inject(HttpClient) http: HttpClient) {
      // Automatically get availible parsers from API and add them to parsers array
      GetAvailibleParsers(http).then(
         parsers => {
            for (let parser of parsers) {
               this.parsers.push(new Parser(parser, http));
            }
         }
      )

      // NOTE: Add new parsers here
   }

   public Search(item: string) {
      this.great_reviews.length = 0;
      this.good_reviews.length = 0;
      this.patchy_reviews.length = 0;
      this.bad_reviews.length = 0;
      this.crap_reviews.length = 0;
      this.current_item = item;
      
      // REF: https://codecraft.tv/courses/angular/http/http-with-promises/
      for (let parser of this.parsers) {
         parser.RetrieveReviews(item).then(
            reviews => {
               this.ClassifyReviews(reviews);
            }
         );
      }
   }
   
   private async ClassifyReviews(reviews: Review[]) {
      var rating_sum = 0;

      for (let review of reviews) {
         const rating = review.Rating;

         rating_sum += rating;

         if (rating >= 4.5) this.great_reviews.push(review);
         else if (rating < 4.5 && rating >= 4) this.good_reviews.push(review);
         else if (rating < 4 && rating >= 3) this.patchy_reviews.push(review);
         else if (rating < 3 && rating >= 1) this.bad_reviews.push(review);
         else this.bad_reviews.push(review);
      }

      this.average_rating = rating_sum / reviews.length;
   }
}