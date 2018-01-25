package parsers

import "../reviews"

type Parser interface {
	GetReviews(pattern string) []reviews.Review
}
