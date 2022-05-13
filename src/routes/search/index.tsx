import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getMovieAPi } from 'services/movie'
import { searchMovieList, searchWord } from 'store/atom'
import { MovieData } from 'types/movie'
import List from '../../components/list'
import styles from './search.module.scss'

const Search = () => {
  const search = useRecoilValue(searchWord)
  const setMovieList = useSetRecoilState<MovieData[]>(searchMovieList)

  // 검색어를 전달 받으면 검색어에 맞는 리스트 받아오기.
  useEffect(() => {
    getMovieAPi({ s: search, page: 1 })
      .then((res) => {
        setMovieList(() => res.data.Search)
      })
      .catch((e) => console.error(e))
  }, [search, setMovieList])
  return (
    <div className={styles.search}>
      <List />
    </div>
  )
}

export default Search
