import { HttpClient } from '@angular/common/http';

/** Base API URL */
const apiURL = "http://35.202.235.70:8080"

/** 
 * Parser class. It might be extended for custom parser that doesnt require an API 
 * 
 * @see https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
*/
export class Parser {
   /** URL for the API including the provider */
   protected url: string;

   /**
    * @param provider Provider to retrieve reviews from (Eg: amazon)
    * @param http HTTP client service
    */
   constructor(provider: string, protected http: HttpClient) {
      this.url = `${apiURL}/${provider}/`;
   }
   
   /**
    * Retrieve reviews about the pattern
    * @param pattern Pattern to get reviews about
    * 
    * @returns Promise of an Array of reviews
    * 
    * @see https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
    */
   public async RetrieveReviews(pattern: string) {
      return await this.http.get<ReviewsCollection>(this.url + pattern).toPromise();
   }
}

/**
 * Get Availible parsers from API to parse reviews from them
 * @param http HTTP client service
 * 
 * @returns Promise of an Array of strings; each string will be an availible parser
 * 
 * @see https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
 */
export async function GetAvailibleParsers(http: HttpClient) {
   return await http.get<string[]>(apiURL + "/availible").toPromise();
}

/** Interface to deserialize JSON object from API */
export interface ReviewsCollection {
   /** Provider who gives the feedback */
   Origin: string;
   /** URL to the product reviewed */
   URL: string;
   /** Array of reviews */
   Reviews: Review[];
}
/** A review */
export interface Review {
   /** Name of the author of this review */
   Author: string;
   /** URL for the Avatar os this author */
   Avatar: string;
   /** Rating for the product given by the author of this review */
   Rating: number;
   /** Text of the review */
   Text: string;
   /** Array of Tags associated to this review */
   Tags: Tag[];
   
   /** URL to the product reviewed */
   productURL: string;
   /** Provider who gives the feedback (Eg, amazon) */
   origin: string;
   /** Indicates if this Review is expanded or not in the card */
   expanded: boolean;
   /** Indicates if this review is expansible */
   expansible: boolean | undefined;
}

/** A feature with an score */
export interface Tag {
   /** Feature associated to this tag (Eg, keyboard) */
   Name: string;
   /** Score for this feature */
   Score: number;
}