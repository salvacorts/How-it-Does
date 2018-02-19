package amazon

import (
	"../../reviews"
)

func GetReviews(pattern string) ([]reviews.Review, error) {
	var revs []reviews.Review

	asin, err := GetItemInfo(pattern)
	if err != nil {
		return nil, err
	}

	revs, err = ParseReviews(asin)
	if err != nil {
		return nil, err
	}

	return revs, nil
}
