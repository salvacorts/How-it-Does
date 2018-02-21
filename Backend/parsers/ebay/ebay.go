package ebay

import (
	"fmt"
	"math/rand"
	"strings"

	"../../reviews"
)

func GetReviews(pattern string) ([]reviews.Review, error) {
	var revs []reviews.Review

	for i := 0; i < 20; i++ {
		review := reviews.Review{
			Rating: rand.Float64() * 5,
			Origin: "ebay",
			Author: "Tester",
			Avatar: "",
			Text:   fmt.Sprintf("Thats what I <h1>think</h1> about %s", strings.Replace(pattern, "+", " ", -1)),
			Tags: []reviews.Tag{
				{"keyboard", 0.3},
				{"mouse", -0.7},
			},
		}

		revs = append(revs, review)
	}

	return revs, nil
}
