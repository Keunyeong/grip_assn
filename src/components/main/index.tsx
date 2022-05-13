import React, { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
// import { useRecoilState } from 'recoil'
// import { pageNum } from 'store/atom'

import styles from './main.module.scss'

import Favorites from '../../routes/favorites'
import Search from '../../routes/search'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { pageNum, searchMovieList, searchWord } from 'store/atom'
import { MovieData } from 'types/movie'
import { getMovieAPi } from 'services/movie'

const Main = () => {
  const [page, setPage] = useRecoilState(pageNum)
  const search = useRecoilValue(searchWord)
  const setMovieList = useSetRecoilState<MovieData[]>(searchMovieList)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight: number = event.currentTarget.clientHeight
    const scorllHeight: number = event.currentTarget.scrollHeight
    const scorllTop: number = event.currentTarget.scrollTop
    if (scorllHeight - scorllTop === containerHeight) {
      getMovieAPi({ s: search, page: page + 1 })
        .then((res) => {
          setMovieList((prev) => [...prev, ...res.data.Search])
        })
        .catch((e) => console.error(e))
      setPage((prev: number) => prev + 1)
    }
    // console.log(target.scrollHeight)
  }

  return (
    <main className={styles.main} onScroll={handleScroll}>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </main>
  )
}

export default Main
