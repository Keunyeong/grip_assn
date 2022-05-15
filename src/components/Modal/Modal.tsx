import ModalPortal from './ModalPortal'
import styles from './Modal.module.scss'
import { useRecoilState } from 'recoil'
import { pickMovieList } from 'store/atom'
import { MovieData } from 'types/movie'
import { ErrorImage } from 'assets/svgs'

interface CheckedMoviedata extends MovieData {
  isChecked: string | undefined
}

interface Props {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>
  movieData: CheckedMoviedata
}

// eslint-disable-next-line react/prop-types
const Modal = (props: Props) => {
  const { setOnModal, movieData } = props
  const [pickList, setPickList] = useRecoilState(pickMovieList)

  const handleClick = () => {
    setOnModal(false)
  }
  const handleCheckMovieClick = () => {
    let isMovie: boolean = false
    pickList.forEach((movie: MovieData) => {
      if (movie.imdbID === movieData.imdbID) {
        isMovie = true
      }
    })
    let newArr: MovieData[]
    if (isMovie) {
      newArr = pickList.filter((movie: MovieData) => movie.imdbID !== movieData.imdbID)
    } else {
      newArr = [...pickList, movieData]
    }
    localStorage.setItem('pickArr', JSON.stringify(newArr))
    setPickList(newArr)
    setOnModal(false)
  }

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `${ErrorImage}`
    event.currentTarget.className = 'error'
  }

  return (
    <ModalPortal>
      <div className={styles.background}>
        <div className={styles.content}>
          <div className={styles.movieData}>
            <img src={movieData.Poster} alt='MOVIE' onError={handleImgError} />
            <div className={styles.movieInfo}>
              <div>{movieData.Title}</div>
              <div>{movieData.Type}</div>
              <div>{movieData.Year}</div>
            </div>
          </div>
          <button onClick={handleClick} type='button' className={styles.closeBtn}>
            X
          </button>
          <button onClick={handleCheckMovieClick} type='button' className={styles.pickBtn}>
            {movieData.isChecked === 'true' ? '즐겨찾기 취소' : '즐겨찾기'}
          </button>
        </div>
      </div>
    </ModalPortal>
  )
}
export default Modal
