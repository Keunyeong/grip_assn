import { useRecoilState, useRecoilValue } from 'recoil'

import 'animate.css'
import styles from './list.module.scss'

import { pickMovieList, searchMovieList } from '../../store/atom'
import { MovieData } from 'types/movie'
import { ErrorImage } from 'assets/svgs'

const List = () => {
  const movieList = useRecoilValue(searchMovieList)
  const [pickList, setPickList] = useRecoilState(pickMovieList)
  if (!movieList) {
    return <div className={styles.noSearch}>NO RESULTS</div>
  }

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `${ErrorImage}`
    event.currentTarget.className = 'error'
  }
  const handlePickClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const { poster, title, year, imdbid, type } = event.currentTarget.dataset

    let isMovie: boolean = false
    pickList.forEach((movie: MovieData) => {
      if (movie.imdbID === imdbid) {
        isMovie = true
      }
    })

    let newArr: MovieData[]
    if (isMovie) {
      newArr = pickList.filter((movie: MovieData) => movie.imdbID !== imdbid)
    } else {
      const pickMovie: MovieData = { Poster: poster, Title: title, Year: year, imdbID: imdbid, Type: type }
      newArr = [...pickList, pickMovie]
    }
    localStorage.setItem('pickArr', JSON.stringify(newArr))
    setPickList(newArr)
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
            data-type={item.Type}
            data-imdbid={item.imdbID}
            onClick={handlePickClick}
            aria-hidden
          >
            <img src={item.Poster} alt='MOVIE' onError={handleImgError} />
            <div>
              <div>{item.Title}</div>
              <div>{item.Type}</div>
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
