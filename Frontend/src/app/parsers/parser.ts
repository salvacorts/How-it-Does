import { HttpClient } from '@angular/common/http';

const apiURL = "http://192.168.1.37:8080";

export class Parser {
   private url: string;

   constructor(provider: string, protected http: HttpClient) {
      this.url = `${apiURL}/${provider}/`;
   }

   // REF: https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
   // REF: https://www.w3schools.com/jsref/jsref_replace.asp
   public async RetrieveReviews(pattern: string) {
      pattern = pattern.replace(/ /g, "+");

      return await this.http.get<Review[]>(this.url + pattern).toPromise();
   }
}

export async function GetAvailibleParsers(http: HttpClient) {
   return await http.get<string[]>(apiURL + "/availible").toPromise();
}

// REF: https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
export interface Review {
   Origin: string;
   Author: string;
   Avatar: string;
   Rating: number;
   Text: string;
   Tags: Tag[];
}

export interface Tag {
   value: string;
   score: number;
}