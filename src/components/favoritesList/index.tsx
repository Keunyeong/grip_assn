import { useEffect, useState } from 'react'

import 'animate.css'

import styles from './list.module.scss'
import { PickMovie } from 'types/movie'

const FavoritesList = () => {
  const [pickArr, setPickArr] = useState<PickMovie[]>([])

  useEffect(() => {
    setPickArr(JSON.parse(localStorage.getItem('pickArr') || '[]'))
  }, [])

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/no-image-1753539-1493784.png'
    event.currentTarget.className = 'error'
  }

  const handlePickClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const { title } = event.currentTarget.dataset

    const newArr = pickArr.filter((movie: PickMovie) => movie.title !== title)
    setPickArr(() => newArr)
    localStorage.setItem('pickArr', JSON.stringify(newArr))
  }

  if (pickArr.length === 0) {
    return <div className={styles.noSearch}>NO RESULTS</div>
  }
  return (
    <ul className={styles.ul}>
      {pickArr.map((item, index) => {
        const movieListKey = `movie${index}`
        return (
          <li
            className={styles.li}
            key={movieListKey}
            data-title={item.title}
            data-poster={item.poster}
            data-year={item.year}
            onClick={handlePickClick}
            aria-hidden
          >
            <img src={item.poster} alt='MOVIE' onError={handleImgError} />

            <div>
              <div>{item.title}</div>
              <div>{item.year}</div>
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
