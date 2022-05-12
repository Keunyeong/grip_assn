import styles from './main.module.scss'
import { Routes, Route } from 'react-router-dom'
import Favorites from '../../routes/favorites'
import Search from '../../routes/search'

const Main = () => {
  return (
    <main className={styles.main}>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/favorite' element={<Favorites />} />
      </Routes>
    </main>
  )
}

export default Main
