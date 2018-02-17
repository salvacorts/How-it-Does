package amazon

import (
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
		}
	}

	return false
}

// REF: https://docs.aws.amazon.com/AWSECommerceService/latest/DG/rest-signature.html
func GetSignedURL(host string, path string, params []Param) string {
	var hasher = sha256.New()
	var formatedParams = ""

	// for i := 0; i < len(params); i++ {
	// 	fmt.Println(params[i].name[0])
	// }
	sort.Sort(byByte(params))
	logger.Print("")
	// for i := 0; i < len(params); i++ {
	// 	fmt.Println(params[i].name[0])
	// }

	// Concat params in URL query format
	for i := 0; i < len(params); i++ {
		formatedParams += params[i].name + "=" + params[i].value + "&"
	}

	// formatedParams[:len(formatedParams)-1] from [0] to [len()-1]. Used to avoid las &
	stringToSign := fmt.Sprintf("GET\n%s\n%s\n%s", host, path, formatedParams[:len(formatedParams)-1])

	// Calculate sha256 hash and then convert it to base64
	hasher.Write([]byte(stringToSign))
	signature := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

	// Replace + and = symbols by its Hex value
	replacer := strings.NewReplacer("=", "%3D", "+", "%2B")
	signature = replacer.Replace(signature)

	return fmt.Sprintf("http://%s/%s?%sSignature=%s", host, path, formatedParams, signature)
}

func GetASINCode(item string) (string, error) {
	const apiURL = "webservices.amazon.com"
	const path = "onca/xml"

	// TODO: Sanitize input ",", ":" and "."
	var params = []Param{
		{"AWSAccessKeyId", os.Getenv("AWS_ACCESS_KEY_ID")},
		// "AssociateTag":   os.Getenv("AWS_ASSOCIATE_ID"),
		{"Operation", "ItemSearch"},
		{"Keywords", strings.Replace(item, " ", "%20", -1)}, // URL encode; " " is "%20"
		{"Timestamp", time.Now().UTC().Format("2006-01-02T15:04:05Z")},
	}

	url := GetSignedURL(apiURL, path, params)
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
	xml.Unmarshal(body, &q)

	return q.ASIN, nil
}
