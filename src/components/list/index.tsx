import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import 'animate.css'
import styles from './list.module.scss'
import { CheckedIcon, ErrorImage, UnCheckedIcon } from 'assets/svgs'

import { pickMovieList, searchEnd, searchMovieList } from '../../store/atom'
import { MovieData } from 'types/movie'
import Modal from 'components/Modal/Modal'

const List = () => {
  const searchEndValue = useRecoilValue(searchEnd)
  const [onModal, setOnModal] = useState<boolean>(false)
  const [movieData, setMovieData] = useState<MovieData>({
    Poster: '',
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    isChecked: '',
  })
  const movieList = useRecoilValue(searchMovieList)
  const pickList = useRecoilValue(pickMovieList)

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `${ErrorImage}`
    event.currentTarget.className = 'error'
  }

  const handlePickClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const { poster, title, year, imdbid, type, checked } = event.currentTarget.dataset
    const pickMovie: MovieData = {
      Poster: poster,
      Title: title,
      Year: year,
      imdbID: imdbid,
      Type: type,
      isChecked: checked,
    }
    setMovieData(pickMovie)
    setOnModal(true)
  }

  if (!movieList) {
    return <div className={styles.noSearch}>NO RESULTS</div>
  }

  return (
    <ul className={styles.ul}>
      {onModal && <Modal setOnModal={setOnModal} movieData={movieData} />}
      {movieList.map((item, index) => {
        let isChecked: boolean = false
        pickList.forEach((pickMovie) => {
          if (pickMovie.imdbID === item.imdbID) {
            isChecked = true
          }
        })
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
            data-checked={isChecked}
            onClick={handlePickClick}
            aria-hidden
          >
            <img src={item.Poster} alt='MOVIE' onError={handleImgError} />
            <div>
              {isChecked ? (
                <div className={styles.checkSvg}>
                  <CheckedIcon />
                </div>
              ) : (
                <div className={styles.checkSvg}>
                  <UnCheckedIcon />
                </div>
              )}
              <div>{item.Title}</div>
              <div>{item.Type}</div>
              <div>{item.Year}</div>
            </div>
          </li>
        )
      })}
      {searchEndValue && <li className={styles.lastli}>더 이상 검색결과 없음</li>}
    </ul>
  )
}

export default List
