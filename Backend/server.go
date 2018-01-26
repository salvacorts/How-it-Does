// https://www.codementor.io/codehakase/building-a-restful-api-with-golang-a6yivzqdo
package main

import (
	"encoding/json"
	"net/http"
	"strings"

	"./parsers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/{provider}/{item}", CallParser).Methods("GET")
	router.HandleFunc("/availible", GetParsers).Methods("GET")

	http.ListenAndServe("0.0.0.0:8080", router)
}

func GetParsers(w http.ResponseWriter, r *http.Request) {
	var identifiers []string

	availibleParsers := parsers.GetAvailibleParsers()
	for key, _ := range availibleParsers {
		identifiers = append(identifiers, key)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(identifiers)
}

func CallParser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	provider := strings.ToLower(params["provider"])
	item := strings.Replace(params["item"], " ", "+", -1)

	availibleParsers := parsers.GetAvailibleParsers()

	revs := availibleParsers[provider](item)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(revs)
}
