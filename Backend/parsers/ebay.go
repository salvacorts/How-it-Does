package parsers

import (
	"fmt"
	"math/rand"
	"strings"

	"../reviews"
)

func GetEbayReviews(pattern string) []reviews.Review {
	var revs []reviews.Review

	for i := 0; i < 100; i++ {
		review := reviews.Review{
			Rating: rand.Float32() * 5,
			Origin: "ebay",
			Author: "Tester",
			Avatar: fmt.Sprintf("https://www.gravatar.com/avatar/%d?d=identicon", rand.Intn(10000)),
			Text:   fmt.Sprintf("Thats what I think about %s", strings.Replace(pattern, "+", " ", -1)),
		}

		revs = append(revs, review)
	}

	return revs
}
