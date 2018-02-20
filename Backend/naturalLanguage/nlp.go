package natularLanguage

import (
	"os"

	api "cloud.google.com/go/language/apiv1"
	"golang.org/x/net/context"
	options "google.golang.org/api/option"
	protoBuf "google.golang.org/genproto/googleapis/cloud/language/v1"

	r "../reviews"
)

type NaturalLanguageProcessor struct {
	client *api.Client
}

func (nlp *NaturalLanguageProcessor) Init() error {
	var err error

	ctx := context.Background()
	opt := options.WithAPIKey(os.Getenv("GCLOUD_API_KEY"))

	nlp.client, err = api.NewClient(ctx, opt)

	return err
}

// REF: https://godoc.org/google.golang.org/genproto/googleapis/cloud/language/v1#AnalyzeEntitySentimentRequest
// REF: https://cloud.google.com/natural-language/docs/reference/libraries#client-libraries-install-go
// REF: https://godoc.org/google.golang.org/genproto/googleapis/cloud/language/v1#Entity
// REF: https://godoc.org/cloud.google.com/go/language/apiv1
func (nlp *NaturalLanguageProcessor) AnalyzeText(text string) ([]r.Tag, error) {
	req := &protoBuf.AnalyzeEntitySentimentRequest{
		Document: &protoBuf.Document{
			Source: &protoBuf.Document_Content{
				Content: text,
			},

			Type: protoBuf.Document_PLAIN_TEXT,
		},

		EncodingType: protoBuf.EncodingType_UTF8,
	}

	res, err := nlp.client.AnalyzeEntitySentiment(context.Background(), req)
	if err != nil {
		return nil, err
	}

	var tags = make([]r.Tag, len(res.Entities))

	for i := 0; i < len(res.Entities); i++ {
		entity := res.Entities[i]
		score := entity.Sentiment.Magnitude * entity.Sentiment.Score

		tags[i] = r.Tag{
			Name:  entity.Name,
			Score: score,
		}
	}

	return tags, nil
}
