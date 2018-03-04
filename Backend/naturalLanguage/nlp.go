package natularLanguage

import (
	api "cloud.google.com/go/language/apiv1"
	"golang.org/x/net/context"
	protoBuf "google.golang.org/genproto/googleapis/cloud/language/v1"

	r "../reviews"
)

const (
	salienceThreshold  = 0.01
	magnitudeThreshold = 0.1
)

type NaturalLanguageProcessor struct {
	Client *api.Client
}

func NewNLP() (*NaturalLanguageProcessor, error) {
	client, err := api.NewClient(context.Background())
	if err != nil {
		return nil, err
	}

	nlp := &NaturalLanguageProcessor{
		Client: client,
	}

	return nlp, err
}

// AnalyzeText get tags from `text`
func (nlp *NaturalLanguageProcessor) AnalyzeText(text string) ([]r.Tag, error) {
	// REF: https://godoc.org/google.golang.org/genproto/googleapis/cloud/language/v1#AnalyzeEntitySentimentRequest
	// REF: https://cloud.google.com/natural-language/docs/reference/libraries#client-libraries-install-go
	// REF: https://godoc.org/google.golang.org/genproto/googleapis/cloud/language/v1#Entity
	// REF: https://godoc.org/cloud.google.com/go/language/apiv1
	req := &protoBuf.AnalyzeEntitySentimentRequest{
		Document: &protoBuf.Document{
			Source: &protoBuf.Document_Content{
				Content: text,
			},

			Type: protoBuf.Document_PLAIN_TEXT,
		},

		EncodingType: protoBuf.EncodingType_UTF8,
	}

	res, err := nlp.Client.AnalyzeEntitySentiment(context.Background(), req)
	if err != nil {
		return nil, err
	}

	var tags = make([]r.Tag, len(res.Entities))
	var validIndex = 0

	for i := 0; i < len(res.Entities); i++ {
		entity := res.Entities[i]

		if entity.Salience < salienceThreshold ||
			entity.Sentiment.Magnitude < magnitudeThreshold {
			// fmt.Printf("\n\n%s\n\tScore: %f\n\tMagnitude: %f\n\tSalience: %f", entity.Name, entity.Sentiment.Score, entity.Sentiment.Magnitude, entity.Salience)
			continue
		}

		tags[validIndex] = r.Tag{
			Name:  entity.Name,
			Score: entity.Sentiment.Score,
		}

		validIndex++
	}

	return tags[:validIndex], nil
}
