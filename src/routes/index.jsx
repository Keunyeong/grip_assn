import styles from './Routes.module.scss'
// import GNB from 'routes/_shared/GNB'
import Main from '../components/main'
import Header from '../components/header'
import Footer from '../components/footer'
import { useMount, useUnmount } from 'react-use'
import { useState } from 'react'
import Loading from '../components/common/loading'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const loading = () => setIsLoading(false)

  useMount(() => {
    setTimeout(loading, 3000)
  })

  useUnmount(() => {
    clearTimeout(loading)
  })
  return (
    <div className={styles.app}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
