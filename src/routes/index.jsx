import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
// import GNB from 'routes/_shared/GNB'
import Main from './Main'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      {/* <GNB /> */}
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
