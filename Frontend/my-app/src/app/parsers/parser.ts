import { HttpClient } from '@angular/common/http';

export class Parser {
   private url: string;

   constructor(provider: string, protected http: HttpClient) {
      this.url = `https://api.website.com/${provider}/`;
   }

   // REF: https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
   public async RetrieveReviews(pattern: string) {
      pattern = pattern.replace(" ", "+");

      console.log(this.url + pattern);

      return await this.http.get<Review[]>(this.url + pattern).toPromise();
   }
}


// REF: https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
export interface Review {
   origin: string;
   author: string;
   avatar: string;
   rating: number;
   text: string;
}