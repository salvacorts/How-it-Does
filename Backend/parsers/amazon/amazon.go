package amazon

import (
	"fmt"
	"math/rand"

	"../../reviews"
)

func GetReviews(pattern string) []reviews.Review {
	var revs []reviews.Review

	for i := 0; i < 20; i++ {
		review := reviews.Review{
			Rating: rand.Float32() + 4,
			Origin: "amazon",
			Author: "Tester",
			Avatar: fmt.Sprintf("https://www.gravatar.com/avatar/%d?d=identicon", rand.Intn(10000)),
			Text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis felis risus, non euismod elit lacinia faucibus. Vestibulum molestie vulputate mollis. Vivamus vitae nunc sem. Fusce eu accumsan arcu. Curabitur eleifend eget libero in egestas. Duis in vestibulum ipsum. Nunc placerat pulvinar nisi. Aliquam ante velit, eleifend et dolor ut, pulvinar finibus lorem. Donec et eros elit. Duis dictum augue interdum, blandit enim sed, rhoncus dolor. Vestibulum placerat massa at justo placerat finibus. Phasellus rutrum est sed sagittis placerat. Phasellus felis enim, vestibulum sit amet tempor et, aliquam ut sapien.

Nam et blandit dui, ut tincidunt sapien. Donec mollis ante nisl, in molestie ipsum lobortis id. Curabitur purus turpis, consequat in diam vel, tincidunt accumsan sem. Aenean arcu magna, tempor id est nec, lobortis auctor leo. Vivamus elementum porta nibh, sit amet pulvinar ligula varius sed. Ut ac dolor id mauris pharetra pharetra. Quisque sed ante elementum, interdum nulla nec, pretium diam. Vivamus tellus diam, rhoncus a justo sed, finibus convallis ligula. Maecenas massa dui, gravida a ex ac, vestibulum dapibus eros. Etiam lacinia rutrum dictum. Vivamus malesuada vulputate nulla id ornare.

Vestibulum bibendum, magna sagittis viverra iaculis, odio orci semper eros, non porta purus nulla in turpis. Nunc id ornare ipsum. Nullam ac interdum sapien. Ut congue lacus et quam mollis fringilla. Aenean mattis consectetur nisi vulputate ornare. Suspendisse elit velit, ullamcorper in elementum ut, placerat vitae mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
			Tags: []reviews.Tag{
				{"keyboard", 0.3},
				{"mouse", -0.7},
			},
		}

		revs = append(revs, review)
	}

	return revs
}
