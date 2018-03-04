package parsers

import (
	r "../reviews"
	"./amazon"
)

func GetAvailibleParsers() map[string]func(string) (*r.ReviewsCollection, error) {
	return map[string]func(string) (*r.ReviewsCollection, error){
		"amazon": amazon.GetReviews,
	}
}
