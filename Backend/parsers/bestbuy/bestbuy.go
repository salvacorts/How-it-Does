package bestbuy

import (
	"fmt"
	"math/rand"
	"strings"

	r "../../reviews"
)

func GetReviews(pattern string) (*r.ReviewsCollection, error) {
	var revs []r.Review

	for i := 0; i < 20; i++ {
		review := r.Review{
			Rating: rand.Float64() * 5,
			Author: "Tester",
			Avatar: "",
			Text:   fmt.Sprintf("Thats what I think about %s", strings.Replace(pattern, "+", " ", -1)),
			Tags:   []r.Tag{},
		}

		revs = append(revs, review)
	}

	collection := &r.ReviewsCollection{
		Origin:  "bestbuy",
		URL:     "www.bestbuy.com",
		Reviews: revs,
	}

	return collection, nil
}
