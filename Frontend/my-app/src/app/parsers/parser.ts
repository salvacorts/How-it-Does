import { HttpClient } from '@angular/common/http';

export class Parser {
   private url: string = "http://api.website.com/";

   constructor(provider: string, protected http: HttpClient) {
      this.url += provider + "/";
   }

   // REF: https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
   public async RetrieveReviews(pattern: string) {
      pattern = pattern.replace(" ", "+");

      console.log(this.url + pattern);

      return await this.http.get<ParserResponse>(this.url + pattern).toPromise();
   }
}

// REF: https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
export interface ParserResponse {
   // TODO: Expand Reviews object architecture
   averageRating: number;
   origin: string;   
   greatReviews;
   goodReviews;
   patchyReviews;
   badReviews;
   crapReviews;
}