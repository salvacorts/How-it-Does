package amazon

import (
	r "../../reviews"
)

// GetReviews retrieves Reviews from amazon for `pattern`
func GetReviews(pattern string) (*r.ReviewsCollection, error) {
	asin, url, err := GetItemInfo(pattern)
	if err != nil {
		return nil, err
	} else if asin == "" {
		return nil, nil
	}

	reviews, err := ParseReviews(asin)
	if err != nil {
		return nil, err
	}

	collection := &r.ReviewsCollection{
		Origin:  "amazon",
		URL:     url,
		Reviews: reviews,
	}

	return collection, nil
}
