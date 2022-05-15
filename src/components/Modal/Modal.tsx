import ModalPortal from './ModalPortal'
import styles from './Modal.module.scss'
import { useRecoilState } from 'recoil'
import { pickMovieList } from 'store/atom'
import { MovieData } from 'types/movie'

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
    console.log(movieData)
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
  return (
    <ModalPortal>
      <div className={styles.background}>
        <div className={styles.content}>
          <div>{movieData.Title}</div>
          <button onClick={handleClick} type='button'>
            X
          </button>
          {movieData.isChecked === 'true' ? (
            <button onClick={handleCheckMovieClick} type='button'>
              즐겨찾기 취소
            </button>
          ) : (
            <button onClick={handleCheckMovieClick} type='button'>
              즐겨찾기
            </button>
          )}
        </div>
      </div>
    </ModalPortal>
  )
}
export default Modal
