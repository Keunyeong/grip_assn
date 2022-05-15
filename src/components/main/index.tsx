import { Dispatch, SetStateAction, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'

import styles from './main.module.scss'
import { MovieData } from 'types/movie'

import { pageNum, pickMovieList, searchEnd, searchMovieList, searchWord } from 'store/atom'
import Favorites from '../../routes/favorites'
import Search from '../../routes/search'
import { getMovieAPi } from 'services/movie'
import { FallingLines } from 'react-loader-spinner'

interface Props {
  searching: boolean
  setSearching: Dispatch<SetStateAction<boolean>>
}

const Main = (props: Props) => {
  const location = useLocation()

  const { searching, setSearching } = props
  const [page, setPage] = useRecoilState<number>(pageNum)
  const search = useRecoilValue<string>(searchWord)
  const setSearchEnd = useSetRecoilState(searchEnd)
  const setMovieList = useSetRecoilState<MovieData[]>(searchMovieList)
  const setPickList = useSetRecoilState<MovieData[]>(pickMovieList)

  // 검색어를 전달 받으면 검색어에 맞는 리스트 받아오기.
  useEffect(() => {
    getMovieAPi({ s: search, page: 1 })
      .then((res) => {
        setSearching(false)
        setMovieList(() => res.data.Search)
      })
      .catch(() => setSearching(true))
    setPickList(JSON.parse(localStorage.getItem('pickArr') || '[]'))
  }, [search, setMovieList, setPickList, setSearching])

  // scroll 끝까지 내리면 리스트 더 요청하기.
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      // 검색 페이지 에서만
      if (location.pathname === '/') {
        getMovieAPi({ s: search, page: page + 1 })
          .then((res) => {
            if (res.data.Search.length === 0) {
              setSearchEnd(true)
            } else {
              setMovieList((prev) => [...prev, ...res.data.Search])
            }
          })
          .catch(() => setSearchEnd(true))
        setPage((prev: number) => prev + 1)
      }
    }
  }

  return (
    <main className={styles.main} onScroll={handleScroll}>
      {searching ? (
        <div className={styles.spinner}>
          <FallingLines width='110' color='#fae545' />
        </div>
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
