import { useRecoilValue } from 'recoil'

import 'animate.css'
import styles from './list.module.scss'

import { searchMovieList } from '../../store/atom'
import { PickMovie } from 'types/movie'
import { ErrorImage } from 'assets/svgs'

const List = () => {
  const movieList = useRecoilValue(searchMovieList)
  if (!movieList) {
    return <div className={styles.noSearch}>NO RESULTS</div>
  }

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `${ErrorImage}`
    event.currentTarget.className = 'error'
  }
  const handlePickClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const { poster, title, year, imdbID } = event.currentTarget.dataset
    const pickArr = JSON.parse(localStorage.getItem('pickArr') || '[]')

    let isMovie: boolean = false
    pickArr.forEach((movie: PickMovie) => {
      if (movie.imdbID === imdbID) {
        isMovie = true
      }
    })

    let newArr: PickMovie[]
    if (isMovie) {
      newArr = pickArr.filter((movie: PickMovie) => movie.title !== title)
    } else {
      const pickMovie: PickMovie = { poster, title, year, imdbID }
      newArr = [...pickArr, pickMovie]
    }
    localStorage.setItem('pickArr', JSON.stringify(newArr))
  }

  return (
    <ul className={styles.ul}>
      {movieList.map((item, index) => {
        const movieListKey = `movie${index}`
        return (
          <li
            className={styles.li}
            key={movieListKey}
            data-title={item.Title}
            data-poster={item.Poster}
            data-year={item.Year}
            data-imdbID={item.imdbID}
            onClick={handlePickClick}
            aria-hidden
          >
            <img src={item.Poster} alt='MOVIE' onError={handleImgError} />
            <div>
              <div>{item.Title}</div>
              <div>{item.Year}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default List

// Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
// Title: "Iron Man"
// Type: "movie"
// Year: "2008"
// imdbID: "tt0371746"
