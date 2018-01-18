import { Component } from '@angular/core';

@Component({
  selector: 'reviews',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public reviews : Array<Review> = [];

  constructor() {
    var text = `
Great monitor for the price. I've had nothing but good luck with Dell display reliability, so I expect the same from this
product. I needed to add another monitor to my setup for an intense project, and this fit the bill. Good brightness and
contrast. There is some light bleed, but there will be with an edge-lit monitor. It's well controlled and not invasive.
<br>
<br>I still prefer my Asus PA248 to this, but that's a more expensive product.
<br>
<br>I find the controls non-intuitive, but they work just fine and once adjusted, I rarely touch them. It's crisp, clear, and
bright. Just what I needed and it didn't break the bank.
`;
    this.reviews.push(new Review("Salva", "Amazon", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Salva", "Amazon", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Salva", "Amazon", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
    this.reviews.push(new Review("Blanca", "Ebay", text));
  }
}


class Review {
  public author: string;
  public origin: string;
  public text: string;

  constructor(author: string, origin: string, text: string) {
    this.author = author;
    this.origin = origin;
    this.text = text;
  }

  public GetFormatedText() {
    return this.text.split("<br>");
  }
}