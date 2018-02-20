package amazon

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"

	r "../../reviews"
)

const (
	webURL      = "http://www.amazon.com"
	reviewsPath = "/product-reviews/%s/ref=cm_cr_arp_d_paging_btm_1?pageNumber=%d"
	itemPath    = "/dp/"

	// HTML Classes
	countClass  = ".totalReviewCount"
	reviewClass = ".review"
	ratingClass = ".review-rating"
	authorClass = ".author"
	textClass   = ".review-text"

	// Number of reviews per page in reviewsPath
	reviewsPerPage = 10
)

func extractReview(element *goquery.Selection) (r.Review, error) {
	author := element.Find(authorClass).Text()
	text := element.Find(textClass).Text()
	ratingString := element.Find(ratingClass).Text()
	ratingString = strings.Split(ratingString, " ")[0] // 1.0 out of 5 start

	// Convert string to Float64 with 32 precession
	rating, err := strconv.ParseFloat(ratingString, 32)
	if err != nil {
		return *new(r.Review), err
	}

	review := r.Review{
		Origin: "amazon",
		Rating: rating,
		Author: author,
		Avatar: "", // There is no avatar parseable in amazon
		Text:   text,
		Tags: []r.Tag{
			{"keyboard", 0.3}, // TODO: Send text to GCloud
		},
	}

	return review, nil
}

// ParseReviews retrieve Reviews from amazon website
// for the product identified by `asin`
func ParseReviews(asin string) ([]r.Review, error) {
	path := fmt.Sprintf(reviewsPath, asin, 1)
	doc, err := goquery.NewDocument(webURL + path)
	if err != nil {
		return nil, err
	}

	// Count the number of reviews
	countString := doc.Find(countClass).Text()
	countString = strings.Replace(countString, ",", "", -1)
	totalReviewsCount, err := strconv.Atoi(countString)
	maxReviewsCount, err := strconv.Atoi(os.Getenv("MAX_REVIEWS_PAGE"))
	if err != nil {
		return nil, err
	}

	// If the number of reviews if bigger than the maximus env variable,
	// limit it to the env maximus
	if totalReviewsCount > maxReviewsCount {
		totalReviewsCount = maxReviewsCount
	}

	// Index for the reviews across pages
	reviewIndex := 0
	revs := make([]r.Review, totalReviewsCount)
	nPages := totalReviewsCount / reviewsPerPage
	if totalReviewsCount%reviewsPerPage > 0 {
		nPages++ // Add a page if there is a rest
	}

	for page := 1; page <= nPages; page++ {
		// Page one was already parsed to get the number of reviews
		if page != 1 {
			path = fmt.Sprintf(reviewsPath, asin, page)
			doc, err = goquery.NewDocument(webURL + path)
			if err != nil {
				return nil, err
			}
		}

		// Get the reviews
		items := doc.Find(reviewClass)

		// For each review node, extract it information
		for i := range items.Nodes {
			revs[reviewIndex], err = extractReview(items.Eq(i))
			if err != nil {
				return nil, err
			}

			reviewIndex++
		}
	}

	return revs, err
}
