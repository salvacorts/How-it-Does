// https://www.codementor.io/codehakase/building-a-restful-api-with-golang-a6yivzqdo
package main

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"

	"./logger"
	"./parsers"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/{provider}/{item}", CallParser).Methods("GET")
	router.HandleFunc("/availible", GetParsers).Methods("GET")

	err := http.ListenAndServe("0.0.0.0:8080", router)
	if err != nil {
		logger.Fatal("Cannot start server: %s", err.Error())
	}
}

func GetParsers(w http.ResponseWriter, r *http.Request) {
	var identifiers []string

	availibleParsers := parsers.GetAvailibleParsers()
	for key := range availibleParsers {
		identifiers = append(identifiers, key)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(identifiers)
}

func CallParser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	provider := strings.ToLower(params["provider"])
	item := params["item"]

	parserFunction, ok := parsers.GetAvailibleParsers()[provider]
	if !ok {
		logger.Error("%s '%s' is not a valid provider", r.Host, provider)
		return
	}

	logger.Print("%s Provider: %s\tItem: %s", r.Host, provider, item)

	reviews, err := parserFunction(item)
	if err != nil {
		logger.Error(err.Error())
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(reviews)
}
