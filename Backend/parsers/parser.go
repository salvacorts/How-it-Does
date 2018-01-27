package parsers

import (
	"../reviews"
	"./amazon"
	"./bestbuy"
	"./ebay"
	"./gearbest"
)

func GetAvailibleParsers() map[string]func(string) []reviews.Review {
	return map[string]func(string) []reviews.Review{
		"amazon":   amazon.GetReviews,
		"ebay":     ebay.GetReviews,
		"bestbuy":  bestbuy.GetReviews,
		"gearbest": gearbest.GetReviews,
	}
}
