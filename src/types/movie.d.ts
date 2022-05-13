export interface MovieData {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export interface PickMovie {
  poster: string | undefined
  title: string | undefined
  year: string | undefined
  imdbID: string | undefined
}
