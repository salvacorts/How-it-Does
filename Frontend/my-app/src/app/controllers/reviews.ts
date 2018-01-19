import { Component } from '@angular/core';

@Component({
  selector: 'reviews',
  templateUrl: '../templates/reviews.html',
  styleUrls: ['../styles/reviews.css']
})

export class Reviews {
  public reviews : Array<Review> = [];

  constructor() {
    this.reviews.push(new Review("Salva", "Amazon", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Salva", "Amazon", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Salva", "Amazon", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Salva", "Amazon", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Salva", "Amazon", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Salva", "Amazon", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
    this.reviews.push(new Review("Blanca", "Ebay", "Hello <br> World"));
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