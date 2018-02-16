package amazon

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"../../logger"
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

// REF: https://docs.aws.amazon.com/AWSECommerceService/latest/DG/rest-signature.html
func GetSignedURL(url string, path string, params map[string]string) string {
	var hasher = sha256.New()
	var formatedParams = ""

	for param, value := range params {
		formatedParams += param + "=" + value + "&"
	}

	// formatedParams[:len(formatedParams)-1] from [0] to [len()-1]. Used to avoid las &
	stringToSign := fmt.Sprintf("GET\n%s\n%s\n%s", url, path, formatedParams[:len(formatedParams)-1])
	hasher.Write([]byte(stringToSign))
	signature := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

	return fmt.Sprintf("http://%s/%s?%sSignature=%s", url, path, formatedParams, signature)
}

func GetASINCode(item string) string {
	const apiURL = "webservices.amazon.com"
	const path = "onca/xml"

	var resp *http.Response

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
	// println(url + "\n")

	resp, err := http.Get(url)
	if err != nil {
		logger.Error(err.Error())
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		logger.Error(err.Error())
	}

	var q Query
	xml.Unmarshal(body, &q)

	return q.ASIN
}

func GetReviews(pattern string) []reviews.Review {
	var revs []reviews.Review
	// var asin string

	// asin = GetASINCode(pattern)
	revs = SearchReviews(pattern)

	return revs
}

func main() {
	GetReviews("drone")
}
