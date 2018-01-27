import { Component, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser, Review, GetAvailibleParsers } from '../parsers/parser'
export { Review } from '../parsers/parser';


@Injectable() // Singleton
export class ReviewsService {
   public average_rating: number;
   public current_item: string;
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

      // NOTE: Add new parsers here
   }

   public Search(item: string) {
      this.classified_reviews.forEach((reviews: Array<Review>) => {
         reviews.length = 0
      })

      
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
         var category: CardKind;

         rating_sum += rating;

         if (rating >= 4.5) category = CardKind.great;
         else if (rating < 4.5 && rating >= 4) category = CardKind.good;
         else if (rating < 4 && rating >= 3) category = CardKind.patchy;
         else if (rating < 3 && rating >= 1) category = CardKind.bad;
         else category = CardKind.crap;

         this.classified_reviews.get(category).push(review)
      }

      this.average_rating = rating_sum / reviews.length;
   }
}

export enum CardKind {
   great = "great",
   good = "good",
   patchy = "patchy",
   bad = "bad",
   crap = "crap"
}