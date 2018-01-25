// https://www.codementor.io/codehakase/building-a-restful-api-with-golang-a6yivzqdo
package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strings"

	"./reviews"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/{provider}/{item}", CallParser).Methods("GET")

	http.ListenAndServe("0.0.0.0:8080", router)
}

func CallParser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var revs []reviews.Review

	for i := 0; i < 100; i++ {
		review := reviews.Review{
			Rating: rand.Float32() * 5,
			Origin: params["provider"],
			Author: "Tester",
			Avatar: fmt.Sprintf("https://www.gravatar.com/avatar/%d?d=identicon", rand.Intn(10000)),
			Text:   fmt.Sprintf("Thats what I think about %s", strings.Replace(params["item"], "+", " ", -1)),
		}

		revs = append(revs, review)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(revs)
}
