import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import 'animate.css'
import styles from './list.module.scss'

import { MovieData } from 'types/movie'
import { pickMovieList } from 'store/atom'
import Modal from 'components/Modal/Modal'

const FavoritesList = () => {
  const pickList = useRecoilValue<MovieData[]>(pickMovieList)
  const [onModal, setOnModal] = useState<boolean>(false)
  const [movieData, setMovieData] = useState<MovieData>({
    Poster: '',
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    isChecked: '',
  })

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/no-image-1753539-1493784.png'
    event.currentTarget.className = 'error'
  }

  const handlePickClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const { poster, title, year, imdbid, type } = event.currentTarget.dataset
    const pickMovie: MovieData = {
      Poster: poster,
      Title: title,
      Year: year,
      imdbID: imdbid,
      Type: type,
      isChecked: 'true',
    }
    setMovieData(pickMovie)
    setOnModal(true)
  }

  if (pickList.length === 0) {
    return <div className={styles.noSearch}>NO RESULTS</div>
  }
  return (
    <ul className={styles.ul}>
      {onModal && <Modal setOnModal={setOnModal} movieData={movieData} />}

      {pickList.map((item, index) => {
        const movieListKey = `movie${index}`
        return (
          <li
            className={styles.li}
            key={movieListKey}
            data-title={item.Title}
            data-poster={item.Poster}
            data-year={item.Year}
            data-imdbid={item.imdbID}
            data-type={item.Type}
            data-checked={item.isChecked}
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

export default FavoritesList

// Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
// Title: "Iron Man"
// Type: "movie"
// Year: "2008"
// imdbID: "tt0371746"
