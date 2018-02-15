package amazon

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

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
			Origin: "bestbuy",
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

func GetSignedURL(url string, path string, params map[string]string) string {
	var formatedParams = ""

	for param, value := range params {
		formatedParams += param + "=" + value + "&"
	}

	// formatedParams[:len(formatedParams)-1] from [0] to [len()-1]. Used to avoid las &
	var stringToSign = fmt.Sprintf("GET\n%s\n%s\n%s", url, path, formatedParams[:len(formatedParams)-1])
	println(stringToSign + "\n")
	var signature = "lalala"

	return fmt.Sprintf("http://%s/%s?%sSignature=%s", url, path, formatedParams, signature)
}

func GetASINCode(item string) string {
	const apiURL = "webservices.amazon.com"
	const path = "onca/xml"

	var timestamp = time.Now().UTC().Format("2006-01-02T15:04:05Z")
	var awsAccessKeyID = os.Getenv("AWS_ACCESS_KEY_ID")
	var associateID = os.Getenv("AWS_ASSOCIATE_ID")
	var params = map[string]string{
		"AWSAccessKeyId": awsAccessKeyID,
		"AssociateTag":   associateID,
		"Operation":      "ItemSearch",
		"Keywords":       strings.Replace(item, " ", "%20", -1), // URL encode; " " is "%20"
		"Timestamp":      timestamp,
	}

	url := GetSignedURL(apiURL, path, params)
	println(url + "\n")

	resp, err := http.Get(url)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	var q Query
	xml.Unmarshal(body, &q)

	return q.ASIN
}

func GetReviews(pattern string) []reviews.Review {
	var revs []reviews.Review
	var asin string

	asin = GetASINCode(pattern)
	revs = SearchReviews(asin)

	return revs
}

func main() {
	GetReviews("drone")
}
