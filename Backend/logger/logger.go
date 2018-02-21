package logger

import (
	"log"

	"github.com/google/goterm/term"
)

func Print(message string, args ...interface{}) {
	log.Printf(message+"\n", args...)
}

func Error(message string, args ...interface{}) {
	log.Println(term.Redf(message, args...))
}

func Fatal(message string, args ...interface{}) {
	log.Fatalf(message+"\n", args...)
}
