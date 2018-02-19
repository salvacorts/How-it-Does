package amazon

import (
	"fmt"
	"math/rand"
	"strings"

	"../../reviews"
)

func SearchReviews(asin string) []reviews.Review {
	const webURL = "www.amazon.com"
	const n = 20

	var revs = make([]reviews.Review, n)

	for i := 0; i < n; i++ {
		review := reviews.Review{
			Rating: rand.Float64() * 5,
			Origin: "amazon",
			Author: "Tester",
			Avatar: fmt.Sprintf("https://www.gravatar.com/avatar/%d?d=identicon", rand.Intn(10000)),
			Text:   fmt.Sprintf("Thats what I think about %s", strings.Replace(asin, "+", " ", -1)),
			Tags: []reviews.Tag{
				{"keyboard", 0.3},
				{"mouse", -0.7},
				{"screen", 1.0},
			},
		}

		revs[i] = review
	}

	return revs
}

func GetReviews(pattern string) ([]reviews.Review, error) {
	var revs []reviews.Review

	asin, err := GetASINCode(pattern)
	if err != nil {
		return nil, err
	}

	revs, err = ParseReviews(asin)
	if err != nil {
		return nil, err
	}

	return revs, nil
}
