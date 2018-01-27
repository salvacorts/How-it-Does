import { Component } from '@angular/core';
import { ReviewsService, CardKind } from '../services/reviewsService';

@Component({
   selector: 'tabs',
   templateUrl: '../templates/tabs.html',
   styleUrls: ['../styles/tabs.css'],
})

export class TabsController {
   public cardKind = CardKind; // Permite usar el enumerado para llamar a <cards> en el html

   constructor(private reviewsService: ReviewsService) {}
}