import { Component, Inject } from '@angular/core';
import { ReviewsService, CardKind } from '../services/reviewsService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tag } from '../parsers/parser'

@Component({
   selector: 'tabs',
   templateUrl: '../templates/tabs.html',
   styleUrls: ['../styles/tabs.css'],
})

/** Controller for Tabs view */
export class TabsController {
   /** Allows to use CardKind objects on the view */
   public cardKind = CardKind;
   public currentTabIndex = 0;

   constructor(public reviewsService: ReviewsService, public dialog: MatDialog) {}

   /** 
    * Get array of tags keys to iterate over them 
    * 
    * @returns Array of Tags
    */
   public ArrayFromTags() {
      return Array.from(this.reviewsService.classified_tags.keys())
   }

   public ToggleTag(tag: Tag) {
      var newTag: Tag | undefined

      if (this.reviewsService.current_tag != tag && this.reviewsService.current_tag != undefined) newTag = tag
      else if (this.reviewsService.current_tag == undefined) newTag = tag
      else newTag = undefined

      this.reviewsService.current_tag = newTag
   }

   /** Open dialog about Tags instructions */
   public OpenTagsDialog() {
      let dialogRef = this.dialog.open(TagsDialog, {
         width: "650px",
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