import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReviewsService, CardKind } from '../services/reviewsService';

@Component({
   selector: 'tabs',
   templateUrl: '../templates/tabs.html',
   styleUrls: ['../styles/tabs.css'],
})

export class TabsController {
   public cardKind = CardKind; // Permite usar el enumerado para llamar a <cards> en el html

   constructor(public reviewsService: ReviewsService, public dialog: MatDialog) {}

   public ArrayFromTags() {
      return Array.from(this.reviewsService.classified_tags.keys())
   }

   public OpenTagsDialog() {
      let dialogRef = this.dialog.open(TagsDialog, {
         width: "400px",
         data: {}
      });
   }
}


@Component({
   selector: 'dialog-overview-example-dialog',
   templateUrl: '../templates/dialogs/about-tags.html',
   styleUrls: ['../styles/tabs.css'],
})
export class TagsDialog {

   constructor(public dialogRef: MatDialogRef <TagsDialog>,
               @Inject(MAT_DIALOG_DATA) public data: any) {}

   onNoClick(): void {
      this.dialogRef.close();
   }
}