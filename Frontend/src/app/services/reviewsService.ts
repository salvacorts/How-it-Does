import { Component, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser, Review, GetAvailibleParsers } from '../parsers/parser'
export { Review } from '../parsers/parser';


@Injectable() // Singleton
export class ReviewsService {
   public average_rating: number;
   public current_item: string;
   public searching: boolean = false;
   public processed_parsers: number;
   public classified_reviews: Map<CardKind, Array<Review>> = new Map([
      [CardKind.great, new Array<Review>()],
      [CardKind.good, new Array<Review>()],
      [CardKind.patchy, new Array<Review>()],
      [CardKind.bad, new Array<Review>()],
      [CardKind.crap, new Array<Review>()]
   ]);

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

      // NOTE: Add custom parsers here
   }

   public Search(item: string) {
      this.current_item = item;
      this.average_rating = 0;
      
      // Enable progress bar
      this.processed_parsers = 0;
      this.searching = true;

      // Clear all the arrays
      this.classified_reviews.forEach((reviews: Array<Review>) => {
         reviews.length = 0
      })

      
      // Retrieve reviews from API
      // REF: https://codecraft.tv/courses/angular/http/http-with-promises/
      for (let parser of this.parsers) {
         parser.RetrieveReviews(item).then(
            reviews => {
               this.ClassifyReviews(reviews);
               this.processed_parsers++
               if (this.parsers.length == this.processed_parsers) this.searching = false;
            }
         );
      }
   }
   
   private async ClassifyReviews(reviews: Review[]) {
      var rating_sum = 0;

      for (let review of reviews) {     
         const category = this.GetCategoryFromRating(review.Rating)
         this.classified_reviews.get(category).push(review)
         rating_sum += review.Rating;
      }

      // calculate average rating
      // TODO: https://math.stackexchange.com/a/106720
      var average = rating_sum / reviews.length;
      this.average_rating = (this.average_rating + average) / 2;
   }

   public GetCategoryFromRating(rating: number = this.average_rating) {
      var category: CardKind;

      // Get the category based on review rating
      if (rating >= 4.5) category = CardKind.great;
      else if (rating < 4.5 && rating >= 4) category = CardKind.good;
      else if (rating < 4 && rating >= 3) category = CardKind.patchy;
      else if (rating < 3 && rating >= 1) category = CardKind.bad;
      else category = CardKind.crap;

      return category;
   }
}

export enum CardKind {
   great = "great",
   good = "good",
   patchy = "patchy",
   bad = "bad",
   crap = "crap"
}