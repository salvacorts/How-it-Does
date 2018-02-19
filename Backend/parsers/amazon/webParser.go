package amazon

import (
	"fmt"
	"math/rand"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"

	r "../../reviews"
)

const (
	webURL      = "http://www.amazon.com"
	reviewsPath = "/product-reviews/%s/ref=cm_cr_arp_d_paging_btm_1?pageNumber=%d"
	itemPath    = "/dp/"

	countClass  = ".totalReviewCount"
	reviewClass = ".review"
	ratingClass = ".review-rating"
	authorClass = ".author"
	textClass   = ".review-text"

	reviewsPerPage = 10
)

func ExtractReview(element *goquery.Selection) (r.Review, error) {
	author := element.Find(authorClass).Text()
	text := element.Find(textClass).Text()
	ratingString := element.Find(ratingClass).Text()
	ratingString = strings.Split(ratingString, " ")[0] // 1.0 out of 5 start

	rating, err := strconv.ParseFloat(ratingString, 32)
	if err != nil {
		return *new(r.Review), err
	}

	review := r.Review{
		Origin: "amazon",
		Rating: rating,
		Author: author,
		Avatar: fmt.Sprintf("https://www.gravatar.com/avatar/%d?d=identicon", rand.Intn(10000)),
		Text:   text,
		Tags: []r.Tag{
			{"keyboard", 0.3}, // TODO: Send text to GCloud
		},
	}

	return review, nil
}

func ParseReviews(asin string) ([]r.Review, error) {
	path := fmt.Sprintf(reviewsPath, asin, 1)
	doc, err := goquery.NewDocument(webURL + path)
	if err != nil {
		return nil, err
	}

	countString := doc.Find(countClass).Text()
	countString = strings.Replace(countString, ",", "", -1)
	totalReviewsCount, err := strconv.Atoi(countString)
	reviewIndex := 0

	revs := make([]r.Review, totalReviewsCount)
	nPages := totalReviewsCount / reviewsPerPage
	if totalReviewsCount%reviewsPerPage > 0 {
		nPages++
	}

	for page := 1; page <= nPages; page++ {

		if page != 1 {
			path = fmt.Sprintf(reviewsPath, asin, page)
			doc, err = goquery.NewDocument(webURL + path)
			if err != nil {
				return nil, err
			}
		}

		items := doc.Find(reviewClass)

		for i := range items.Nodes {
			revs[reviewIndex], err = ExtractReview(items.Eq(i))
			if err != nil {
				return nil, err
			}

			reviewIndex++
		}
	}

	return revs, err
}
