import { Routes, Route, useLocation } from 'react-router-dom'
// import { useRecoilState } from 'recoil'
// import { pageNum } from 'store/atom'

import styles from './main.module.scss'

import Favorites from '../../routes/favorites'
import Search from '../../routes/search'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { pageNum, searchMovieList, searchWord } from 'store/atom'
import { MovieData } from 'types/movie'
import { getMovieAPi } from 'services/movie'
import { useState } from 'react'

const Main = () => {
  const location = useLocation()
  const [error, setError] = useState<boolean>(false)
  const [page, setPage] = useRecoilState<number>(pageNum)
  const search = useRecoilValue<string>(searchWord)
  const setMovieList = useSetRecoilState<MovieData[]>(searchMovieList)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight: number = event.currentTarget.clientHeight
    const scorllHeight: number = event.currentTarget.scrollHeight
    const scorllTop: number = event.currentTarget.scrollTop
    if (scorllHeight - scorllTop === containerHeight) {
      if (location.pathname === '/') {
        getMovieAPi({ s: search, page: page + 1 })
          .then((res) => {
            setMovieList((prev) => [...prev, ...res.data.Search])
          })
          .catch(() => setError(true))
        setPage((prev: number) => prev + 1)
      }
    }
  }

  return (
    <main className={styles.main} onScroll={handleScroll}>
      {error ? (
        <div>ERROR</div>
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
