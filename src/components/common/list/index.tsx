import { useRecoilValue } from 'recoil'

import 'animate.css'
import styles from './list.module.scss'

import { searchMovieList } from '../../../store/atom'
import { MovieIcon } from 'assets/svgs'
import { ReactEventHandler, ReactHTMLElement } from 'react'

const List = () => {
  const movieList = useRecoilValue(searchMovieList)
  if (!movieList) {
    return <div className={styles.noSearch}>NO RESULTS</div>
  }

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `${MovieIcon}`
    event.currentTarget.className = 'error'
  }

  return (
    <ul className={styles.ul}>
      {movieList.map((item, index) => {
        const movieListKey = `movie${index}`
        return (
          <li className={styles.li} key={movieListKey}>
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
