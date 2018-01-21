import { Component, Injectable } from '@angular/core';


@Component({
   selector: 'search',
   templateUrl: '../templates/search.html',
   styleUrls: ['../styles/search.css'],
})


@Injectable() // Singleton
export class ReviewsService {
   public great_reviews: Array<Review> = [];
   public good_reviews: Array<Review> = [];
   public patchy_reviews: Array<Review> = [];
   public bad_reviews: Array<Review> = [];
   public crap_reviews: Array<Review> = [];

   public currentItem: string;

   constructor() {
      this.great_reviews.push(new Review("Blanca", "Ebay", "This ultrasharp is a great size and resolution for working with code and documents, and works well for 1080p video too, displaying it at full resolution without scaling! The anti glare coating works great and isn't as distracting as the u2412m, and the stand is well built and adjusts easily. Color is very accurate, and the thin bezels make the monitor and your content look really great."));
      this.great_reviews.push(new Review("Blanca", "Ebay", "This ultrasharp is a great size and resolution for working with code and documents, and works well for 1080p video too, displaying it at full resolution without scaling! The anti glare coating works great and isn't as distracting as the u2412m, and the stand is well built and adjusts easily. Color is very accurate, and the thin bezels make the monitor and your content look really great."));
      this.great_reviews.push(new Review("Blanca", "Ebay", "Mine came in perfect condition despite some reviewers' poor experiences. I am using this as an extended display with my older Dell SX2210b, which is still dear to me. I chose Dell for the value and love the plethora of usb ports and different display connections built in. The outside dimensions of the U2415 are not much larger than those of the SX2210, yet the display looks so much larger due to the much thinner bezel."));
      this.great_reviews.push(new Review("Blanca", "Ebay", "Mine came in perfect condition despite some reviewers' poor experiences. I am using this as an extended display with my older Dell SX2210b, which is still dear to me. I chose Dell for the value and love the plethora of usb ports and different display connections built in. The outside dimensions of the U2415 are not much larger than those of the SX2210, yet the display looks so much larger due to the much thinner bezel."));
      this.great_reviews.push(new Review("Blanca", "Ebay", "Blank Screen - Works perfect now. I am adding to my hp-2408h and it is just as good if not better. Great graphics and text.<br>Just wanted to give others like me that dont read directions a heads up. If you connect the computer hdmi cable to monitor and get a blank screen you have to change the input. It is set to display port input originally.<br>Dont be like me, I was ready to put it back in the box but decided to read the manual as a last resort..hahahah.<br>In case you still dont want to read the manual here is a screen shot of the insturctions."));
      
      this.good_reviews.push(new Review("Salva", "Amazon", "I use this on my Mac, along with a secondary screen.  There's a lot of screen real estate, and the color is good.  The on/off switch in the lower right corner is white, but doesn't distract while you're using it.<br><br>It also raises and lowers to a comfortable viewing height, unlike a lot of monitors that are just stuck in one place.<br><br>The reason I bought this in the first place is that at the time i bought it  was one of the few monitors in this price range that had a screen height greater than 1080.  This screen height is 1200, and since I use this screen to program, I like having the extra height."));
      this.good_reviews.push(new Review("Blanca", "Ebay", "Blank Screen - Works perfect now. I am adding to my hp-2408h and it is just as good if not better. Great graphics and text.<br>Just wanted to give others like me that dont read directions a heads up. If you connect the computer hdmi cable to monitor and get a blank screen you have to change the input. It is set to display port input originally.<br>Dont be like me, I was ready to put it back in the box but decided to read the manual as a last resort..hahahah.<br>In case you still dont want to read the manual here is a screen shot of the insturctions."));
      this.good_reviews.push(new Review("Blanca", "Ebay", "Great monitor for the price.  I've had nothing but good luck with Dell display reliability, so I expect the same from this product.  I needed to add another monitor to my setup for an intense project, and this fit the bill.  Good brightness and contrast.  There is some light bleed, but there will be with an edge-lit monitor.  It's well controlled and not invasive.<br><br>I still prefer my Asus PA248 to this, but that's a more expensive product.<br><br>I find the controls non-intuitive, but they work just fine and once adjusted, I rarely touch them.  It's crisp, clear, and bright.  Just what I needed and it didn't break the bank."));
      
      this.patchy_reviews.push(new Review("Salva", "Amazon", "I use this on my Mac, along with a secondary screen.  There's a lot of screen real estate, and the color is good.  The on/off switch in the lower right corner is white, but doesn't distract while you're using it.<br><br>It also raises and lowers to a comfortable viewing height, unlike a lot of monitors that are just stuck in one place.<br><br>The reason I bought this in the first place is that at the time i bought it  was one of the few monitors in this price range that had a screen height greater than 1080.  This screen height is 1200, and since I use this screen to program, I like having the extra height."));
      this.patchy_reviews.push(new Review("Blanca", "Ebay", "Great monitor for the price.  I've had nothing but good luck with Dell display reliability, so I expect the same from this product.  I needed to add another monitor to my setup for an intense project, and this fit the bill.  Good brightness and contrast.  There is some light bleed, but there will be with an edge-lit monitor.  It's well controlled and not invasive.<br><br>I still prefer my Asus PA248 to this, but that's a more expensive product.<br><br>I find the controls non-intuitive, but they work just fine and once adjusted, I rarely touch them.  It's crisp, clear, and bright.  Just what I needed and it didn't break the bank."));
      this.patchy_reviews.push(new Review("Salva", "Amazon", "The Monitor is Excellent.  There was an early problem with the delivery.  The box the monitor came in was crushed on a bottom corner. This transferred to the monitor and the monitor was damaged.  DELL is apparently trying to use CARDBOARD ...to replace molded Styrofoam, ..trying to go Green.  Cardboard in this case was deficient.<br><br>Amazon took care of the problem and I had a new monitor five days later...the damaged one picked up at the same time.<br><br>If you are NOT up to date on HOW to hook up a NEW monitor to your system. The DELL instructions will not help. ZERO.  I had to call my computer guy to find out how to do it.  My Video card has an HDMI socket. The new monitor has an HDMI socket. Get an HDMI cable and connect the monitor and the computer.  The cables included DO NOT include an HDMI cable.  The instructions do not tell you how to make the monitor recognize the computer.  An INVISIBLE button on the lower right bezel on the monitor will get you to the HDMI cable  ..recognition...or one of the other cables.  Use only ONE Cable."));
      
      this.bad_reviews.push(new Review("Blanca", "Ebay", "Awesome monitor.  Solid. Clear. Sharp. Bright. thin bezel. Expensive stand.  Great price and value.  It's almost free compared to prices for the junk out there.  Uses all connections.  Very few 16:10 out there - this one and a NEC, which is more money, (OK) and thick bezel (also OK but nice to avoid).  Happy to work two of this caliber.  Might need another.  I hope to never be forced to go back to 16:9 again - much less efficient use of space. Tested this next to the Dell U2515 (16:9) 1440.  Very surprised to see the clarity of text on the U2415 1200 considerably better than the 1440 on the 25 actually.  Was thinking about doing 4K for text sharpness so put in the graphics card for a multi 4K setup.  Multi U2415 at 1200 is the program now.  I was shooting for the Mac High Res look for text resolution.  As it is, Word docs did not look as good on the 1440 as I tested as they do on this 1200.  So, U2415 is the go to. Higher and higher res might not be supported by the application in use.?.  I'm glad I checked it out. Too much work though."));
      this.bad_reviews.push(new Review("Blanca", "Ebay", "Awesome monitor.  Solid. Clear. Sharp. Bright. thin bezel. Expensive stand.  Great price and value.  It's almost free compared to prices for the junk out there.  Uses all connections.  Very few 16:10 out there - this one and a NEC, which is more money, (OK) and thick bezel (also OK but nice to avoid).  Happy to work two of this caliber.  Might need another.  I hope to never be forced to go back to 16:9 again - much less efficient use of space. Tested this next to the Dell U2515 (16:9) 1440.  Very surprised to see the clarity of text on the U2415 1200 considerably better than the 1440 on the 25 actually.  Was thinking about doing 4K for text sharpness so put in the graphics card for a multi 4K setup.  Multi U2415 at 1200 is the program now.  I was shooting for the Mac High Res look for text resolution.  As it is, Word docs did not look as good on the 1440 as I tested as they do on this 1200.  So, U2415 is the go to. Higher and higher res might not be supported by the application in use.?.  I'm glad I checked it out. Too much work though."));
      this.bad_reviews.push(new Review("Blanca", "Ebay", "This ultrasharp is a great size and resolution for working with code and documents, and works well for 1080p video too, displaying it at full resolution without scaling! The anti glare coating works great and isn't as distracting as the u2412m, and the stand is well built and adjusts easily. Color is very accurate, and the thin bezels make the monitor and your content look really great."));
      
      // this.crap_reviews.push(new Review("Salva", "Amazon", "The Monitor is Excellent.  There was an early problem with the delivery.  The box the monitor came in was crushed on a bottom corner. This transferred to the monitor and the monitor was damaged.  DELL is apparently trying to use CARDBOARD ...to replace molded Styrofoam, ..trying to go Green.  Cardboard in this case was deficient.<br><br>Amazon took care of the problem and I had a new monitor five days later...the damaged one picked up at the same time.<br><br>If you are NOT up to date on HOW to hook up a NEW monitor to your system. The DELL instructions will not help. ZERO.  I had to call my computer guy to find out how to do it.  My Video card has an HDMI socket. The new monitor has an HDMI socket. Get an HDMI cable and connect the monitor and the computer.  The cables included DO NOT include an HDMI cable.  The instructions do not tell you how to make the monitor recognize the computer.  An INVISIBLE button on the lower right bezel on the monitor will get you to the HDMI cable  ..recognition...or one of the other cables.  Use only ONE Cable."));
   }

}


export class Review {
   public author: string;
   public origin: string;
   public text: string;
   public avatar: string

   constructor(author: string, origin: string, text: string) {
      this.author = author;
      this.origin = origin;
      this.text = text;

      let rnd = Math.floor(Math.random() * 10000) 
      this.avatar = "https://www.gravatar.com/avatar/" + rnd + "?d=identicon";
   }

   public GetFormatedText() {
      return this.text.split("<br>");
   }
}