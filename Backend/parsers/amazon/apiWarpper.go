package amazon

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"../../logger"
)

type Query struct {
	XMLName xml.Name `xml:"ItemSearchResponse"`
	ASIN    string   `xml:"url>ASIN"`
}

type Param struct {
	name  string
	value string
}

type byByte []Param

func (p byByte) Len() int {
	return len(p)
}

func (p byByte) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}

func (p byByte) Less(i, j int) bool {
	var param1, param2 = []byte(p[i].name), []byte(p[j].name)
	var n int

	if len(param1) < len(param2) {
		n = len(param1)
	} else {
		n = len(param2)
	}

	for i := 0; i < n; i++ {
		if param1[i] < param2[i] {
			return true
		} else if param1[i] > param2[i] {
			return false
		}
	}

	return false
}

// REF: https://docs.aws.amazon.com/AWSECommerceService/latest/DG/rest-signature.html
// REF: https://github.com/danharper/hmac-examples
func GetSignedURL(host string, path string, params []Param, secretKey string) string {
	// RFC 2104-compliant HMAC with SHA256
	var hasher = hmac.New(sha256.New, []byte(secretKey))
	var formatedParams = ""

	// Params should go ordered by its byte (ascii code)
	sort.Sort(byByte(params))

	// Concat params in URL query format and replace conflictive symbols
	paramReplacer := strings.NewReplacer(",", "%2C", ":", "%3A", " ", "%20")
	for i := 0; i < len(params); i++ {
		params[i].value = paramReplacer.Replace(params[i].value)
		formatedParams += params[i].name + "=" + params[i].value + "&"
	}

	// formatedParams[:len(formatedParams)-1] from [0] to [len()-1]. Used to avoid las &
	stringToSign := fmt.Sprintf("GET\n%s\n%s\n%s", host, path, formatedParams[:len(formatedParams)-1])
	fmt.Println(stringToSign)

	// Calculate sha256 hash and then convert it to base64
	hasher.Write([]byte(stringToSign))
	signature := base64.StdEncoding.EncodeToString(hasher.Sum(nil))

	// Replace + and = symbols by its Hex value
	signatureReplacer := strings.NewReplacer("=", "%3D", "+", "%2B")
	signature = signatureReplacer.Replace(signature)

	return fmt.Sprintf("http://%s%s?%sSignature=%s", host, path, formatedParams, signature)
}

func GetASINCode(item string) (string, error) {
	const apiURL = "webservices.amazon.com"
	const path = "/onca/xml"

	// TODO: Sanitize input ",", ":" and "."
	var params = []Param{
		{"AWSAccessKeyId", os.Getenv("AWS_ACCESS_KEY_ID")},
		{"AssociateTag", os.Getenv("AWS_ASSOCIATE_TAG")},
		{"Operation", "ItemSearch"},
		{"SearchIndex", "All"},
		{"Keywords", item},
		{"Timestamp", time.Now().UTC().Format("2006-01-02T15:04:05Z")},
	}

	url := GetSignedURL(apiURL, path, params, os.Getenv("AWS_SECRET_KEY"))
	logger.Debug(url)

	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	logger.Debug(string(body))

	var q Query
	err = xml.Unmarshal(body, &q)
	if err != nil {
		return "", err
	}

	return q.ASIN, nil
}