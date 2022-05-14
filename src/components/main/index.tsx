import { Dispatch, SetStateAction, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'

import styles from './main.module.scss'
import { MovieData } from 'types/movie'

import { pageNum, searchMovieList, searchWord } from 'store/atom'
import Favorites from '../../routes/favorites'
import Search from '../../routes/search'
import { getMovieAPi } from 'services/movie'

interface Props {
  searching: boolean
  setSearching: Dispatch<SetStateAction<boolean>>
}

const Main = (props: Props) => {
  const { searching, setSearching } = props

  const location = useLocation()
  const [page, setPage] = useRecoilState<number>(pageNum)
  const search = useRecoilValue<string>(searchWord)
  const setMovieList = useSetRecoilState<MovieData[]>(searchMovieList)
  // 검색어를 전달 받으면 검색어에 맞는 리스트 받아오기.
  useEffect(() => {
    getMovieAPi({ s: search, page: 1 })
      .then((res) => {
        setSearching(false)
        setMovieList(() => res.data.Search)
      })
      .catch(() => setSearching(true))
  }, [search, setMovieList, setSearching])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      if (location.pathname === '/') {
        getMovieAPi({ s: search, page: page + 1 })
          .then((res) => {
            setMovieList((prev) => [...prev, ...res.data.Search])
          })
          .catch(() => setSearching(true))
        setPage((prev: number) => prev + 1)
      }
    }
  }

  return (
    <main className={styles.main} onScroll={handleScroll}>
      {searching ? (
        <div>로딩중...</div>
      ) : (
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      )}
    </main>
  )
}

export default Main
