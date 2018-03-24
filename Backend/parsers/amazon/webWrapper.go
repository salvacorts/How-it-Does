package amazon

import (
	"bytes"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"golang.org/x/net/html"

	nlp "../../naturalLanguage"
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

// Change from otiginal goquery.Text() to replace <br> for \n
func extractText(s *goquery.Selection) string {
	var buf bytes.Buffer

	// Slightly optimized vs calling Each: no single selection object created
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.TextNode {
			// Keep newlines and spaces, like jQuery
			buf.WriteString(n.Data)
		} else if n.Data == "br" {
			buf.WriteString("\n")
		}

		if n.FirstChild != nil {
			for c := n.FirstChild; c != nil; c = c.NextSibling {
				f(c)
			}
		}
	}
	for _, n := range s.Nodes {
		f(n)
	}

	return buf.String()
}

func extractReview(element *goquery.Selection, lanProc *nlp.NaturalLanguageProcessor) (*r.Review, error) {
	author := element.Find(authorClass).Text()
	text := extractText(element.Find(textClass))
	ratingString := element.Find(ratingClass).Text()
	ratingString = strings.Split(ratingString, " ")[0] // 1.0 out of 5 start

	// Convert string to Float64 with 32 precession
	rating, err := strconv.ParseFloat(ratingString, 32)
	if err != nil {
		return nil, err
	}

	tags, err := lanProc.AnalyzeText(text)
	if err != nil {
		return nil, err
	}

	review := &r.Review{
		Rating: rating,
		Author: author,
		Avatar: "", // There is no avatar parseable in amazon
		Text:   text,
		Tags:   tags,
	}

	return review, nil
}

// ParseReviews retrieve Reviews from amazon website
// for the product identified by `asin`
func ParseReviews(asin string) ([]r.Review, error) {
	lanProc, err := nlp.NewNLP()
	if err != nil {
		return nil, err
	}

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
		for i := 0; i < len(items.Nodes) && reviewIndex < totalReviewsCount; i, reviewIndex = i+1, reviewIndex+1 {
			review, err := extractReview(items.Eq(i), lanProc)
			if err != nil {
				return nil, err
			}

			revs[reviewIndex] = *review
		}
	}

	return revs, nil
}
