import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Reviews } from './controllers/reviews';
import { Tabs } from './controllers/tabs';
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
    Reviews, Tabs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [Tabs]
})
export class AppModule { }
