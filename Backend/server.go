// https://www.codementor.io/codehakase/building-a-restful-api-with-golang-a6yivzqdo
package main

import (
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"

	"./logger"
	"./parsers"
)

func CheckEnvVariables() {
	var env = map[string]string{
		"GOOGLE_APPLICATION_CREDENTIALS": os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"),
		"AWS_ACCESS_KEY_ID":              os.Getenv("AWS_ACCESS_KEY_ID"),
		"AWS_SECRET_KEY":                 os.Getenv("AWS_SECRET_KEY"),
		"AWS_ASSOCIATE_TAG":              os.Getenv("AWS_ASSOCIATE_TAG"),
		"MAX_REVIEWS_PAGE":               os.Getenv("MAX_REVIEWS_PAGE"),
	}

	message := "These enviroment variables must exist:"
	missing := false

	for key, value := range env {
		if value == "" {
			message += "\n\t\t\t" + key
			missing = true
		}
	}

	if missing {
		logger.Fatal(message)
	}
}

func main() {
	CheckEnvVariables()

	router := mux.NewRouter()
	router.HandleFunc("/{provider}/{item}", CallParser).Methods("GET")
	router.HandleFunc("/available", GetParsers).Methods("GET")

	err := http.ListenAndServe("0.0.0.0:8080", router)
	if err != nil {
		logger.Fatal("Cannot start server: %s", err.Error())
	}
}

func GetParsers(w http.ResponseWriter, r *http.Request) {
	var identifiers []string

	availableParsers := parsers.GetavailableParsers()
	for key := range availableParsers {
		identifiers = append(identifiers, key)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(identifiers)
}

func CallParser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	provider := strings.ToLower(params["provider"])
	item := params["item"]

	parserFunction, ok := parsers.GetavailableParsers()[provider]
	if !ok {
		logger.Error("%s '%s' is not a valid provider", r.Host, provider)
		return
	}

	reviews, err := parserFunction(item)
	if err != nil {
		logger.Error(err.Error())
		return
	}

	logger.Print("%s\tProvider: %s\tItem: %s\tReviews: %d", r.Host, provider, item, len(reviews.Reviews))

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(*reviews)
}
