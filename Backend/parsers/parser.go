package parsers

import (
	"../reviews"
)

func GetAvailibleParsers() map[string]func(string) []reviews.Review {
	return map[string]func(string) []reviews.Review{
		"amazon":   GetAmazonReviews,
		"ebay":     GetEbayReviews,
		"bestbuy":  GetBestbuyReviews,
		"gearbest": GetGearbestReviews,
	}
}
