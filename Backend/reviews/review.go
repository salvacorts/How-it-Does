package reviews

type Review struct {
	Origin string
	Rating float64
	Author string
	Avatar string
	Text   string
	Tags   []Tag
}

type Tag struct {
	Value string
	Score float32
}
