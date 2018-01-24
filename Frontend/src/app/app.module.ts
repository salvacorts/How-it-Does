import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsService } from './services/reviewsService';
import { CardsController } from './controllers/cards';
import { TabsController } from './controllers/tabs';
import { SearchController } from './controllers/search'
import { ResultsController } from './controllers/results'
import { 
  MatInputModule, 
  MatButtonModule, 
  MatSelectModule, 
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatTabsModule
 } from '@angular/material';

@NgModule({
  declarations: [ 
    TabsController, 
    CardsController, 
    SearchController, 
    ResultsController,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [ReviewsService, HttpClientModule],
  bootstrap: [SearchController, ResultsController, TabsController]
})
export class AppModule { }
