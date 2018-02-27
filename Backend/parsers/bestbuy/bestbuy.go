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

func GetReviewsS(pattern string) (*r.ReviewsCollection, error) {
	sku, url, err := GetItemInfo(pattern)
	if err != nil {
		return nil, err
	} else if sku == "" {
		return nil, nil
	}

	reviews, err := ParseReviews(sku)
	if err != nil {
		return nil, err
	}

	collection := &r.ReviewsCollection{
		Origin:  "bestbuy",
		URL:     url,
		Reviews: reviews,
	}

	return collection, nil
}
