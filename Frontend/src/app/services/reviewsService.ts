import { Component, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser, Review, GetAvailibleParsers, Tag } from '../parsers/parser'

export { Review } from '../parsers/parser';

const THRESHOLD = 0.5

/** Service to interact with reviews */
@Injectable() // Singleton
export class ReviewsService {
   /** Average rating for `current_item` */
   public average_rating: number;
   /** Current searched item */
   public current_item: string;
   /** Indicates if this is still searching */
   public searching: boolean = false;
   /** Reviews classified by its category and tags */
   public classified_tags = new Map <Tag, Map<CardKind, Array<Review>>>();
   /** Reviews classified by its category */
   public classified_reviews: Map<CardKind, Array<Review>> = new Map([
      [CardKind.great, new Array<Review>()],
      [CardKind.good, new Array<Review>()],
      [CardKind.patchy, new Array<Review>()],
      [CardKind.bad, new Array<Review>()],
      [CardKind.crap, new Array<Review>()]
   ]);
   
   /** Number of already processed_parsers */
   private processed_parsers: number;
   /** Availible parsers to retrieve reviews from */
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

   /**
    * It will retrieve reviews for `item` by using the API.
    * For each review, it will classify it.
    * @see https://codecraft.tv/courses/angular/http/http-with-promises/
    * @param item    Item to search for.
    */
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

      // Clear all tags
      this.classified_tags.forEach((value) => {
         value.forEach((array) => {
            array.length = 0;
         })
      }) 

      // Retrieve reviews from API for each availible parser
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
   
   /**
    * This function will classify each review of reviews by it kind and its tags.
    * @param reviews Array of reviews to classify
    */
   private async ClassifyReviews(reviews: Review[]) {
      var rating_sum = 0;

      for (let review of reviews) {     
         const category = this.GetCategoryFromRating(review.Rating)
         this.classified_reviews.get(category).push(review)
         rating_sum += review.Rating;
         review.Expanded = false;

         // If no avatar is provided, generate one randomly from gravatar
         if (!review.Avatar) {
            let rand = Math.floor(Math.random()*100000)+1
            review.Avatar = `https://www.gravatar.com/avatar/${rand}?d=identicon`
         }

         // Classify Tags. Data sctucture like:
         //    - Map:
         //       - Key: Tag including score which will be the average
         //       - Value: Map of:
         //          - Key: Category as CardKind
         //          - Value: Array of pointers to reviews
         for (let tag of review.Tags) {
            var added = false;

            if (tag.Score < THRESHOLD && tag.Score > -THRESHOLD) continue

            // For each value, key pair, if tag equals to the key,
            // update its score and add this review to the array that
            // match to the category of this review.
            this.classified_tags.forEach(
               (value, key) => {
                  if (key.Name.toLowerCase() == tag.Name.toLowerCase()) {
                     key.Score = (key.Score + review.Rating) / 2

                     var array = value.get(category)
                     if (!array) array = new Array<Review>()
                     array.push(review)

                     added = true
                     // TODO: Add break here
                  }
               })

            // If tag didnt exists on classified_tags, then create it and add the review to it.
            if (!added) {
               this.classified_tags.set(tag, new Map<CardKind, Array<Review>>([
                  [category, new Array<Review>(review)]
               ]))
            }
         }
      }

      // calculate average rating
      // TODO: https://math.stackexchange.com/a/106720
      var average = rating_sum / reviews.length;
      this.average_rating = (this.average_rating + average) / 2;
   }

   /**
    * Get category by its rating:
    *    [5, 4.5] = Great
    *    (4.5, 4] = Good
    *     (4, 3]  = Patchy
    *     (3, 1]  = Bad
    *     (1, 0]  = Crap 
    * @param rating 
    * 
    * @returns category corresponding to rating
    */
   public GetCategoryFromRating(rating: number = this.average_rating): CardKind {
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