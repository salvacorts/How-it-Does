package reviews

type ReviewsCollection struct {
	Origin  string
	URL     string
	Reviews []Review
}
type Review struct {
	Rating float64
	Author string
	Avatar string
	Text   string
	Tags   []Tag
}

type Tag struct {
	Name      string
	Score     float32
	Magnitude float32
}
