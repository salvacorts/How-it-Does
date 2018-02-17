package amazon

import (
	"encoding/xml"
	"fmt"
	"math/rand"
	"strings"

	"../../reviews"
)

type Query struct {
	XMLName xml.Name `xml:"urlset"`
	ASIN    string   `xml:"url>ASIN"`
}

func SearchReviews(asin string) []reviews.Review {
	const webURL = "www.amazon.com"
	var revs []reviews.Review

	for i := 0; i < 20; i++ {
		review := reviews.Review{
			Rating: rand.Float32() * 5,
			Origin: "amazon",
			Author: "Tester",
			Avatar: fmt.Sprintf("https://www.gravatar.com/avatar/%d?d=identicon", rand.Intn(10000)),
			Text:   fmt.Sprintf("Thats what I think about %s", strings.Replace(asin, "+", " ", -1)),
			Tags: []reviews.Tag{
				{"keyboard", 0.3},
				{"mouse", -0.7},
				{"screen", 1.0},
			},
		}

		revs = append(revs, review)
	}

	return revs
}

func GetReviews(pattern string) ([]reviews.Review, error) {
	var revs []reviews.Review

	asin, err := GetASINCode(pattern)
	if err != nil {
		return nil, err
	}

	revs = SearchReviews(asin)

	return revs, nil
}

func main() {
	GetReviews("drone")
}
