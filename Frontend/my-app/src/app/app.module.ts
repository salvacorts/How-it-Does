import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReviewsController } from './controllers/reviews';
import { TabsController } from './controllers/tabs';
import { SearchController } from './controllers/search'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    ReviewsController, TabsController, SearchController
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [SearchController, TabsController]
})
export class AppModule { }
