package parsers

import (
	r "../reviews"
	"./amazon"
	"./bestbuy"
	"./ebay"
	"./gearbest"
)

func GetAvailibleParsers() map[string]func(string) (*r.ReviewsCollection, error) {
	return map[string]func(string) (*r.ReviewsCollection, error){
		"amazon":   amazon.GetReviews,
		"ebay":     ebay.GetReviews,
		"bestbuy":  bestbuy.GetReviews,
		"gearbest": gearbest.GetReviews,
	}
}
