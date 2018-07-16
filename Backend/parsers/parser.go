package parsers

import (
	r "../reviews"
	"./amazon"
)

func GetavailableParsers() map[string]func(string) (*r.ReviewsCollection, error) {
	return map[string]func(string) (*r.ReviewsCollection, error){
		"amazon": amazon.GetReviews,
	}
}
