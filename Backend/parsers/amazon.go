package parsers

import (
	"../reviews"
)

type Amazon struct{}

func (Amazon) GetReviews(pattern string) []reviews.Review {
}
