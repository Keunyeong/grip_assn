import { useState } from 'react'
import { useMount, useUnmount } from 'react-use'

import styles from './Routes.module.scss'

import Main from '../components/main'
import Header from '../components/header'
import Footer from '../components/footer'
import Loading from '../components/common/loading'

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searching, setSearching] = useState<boolean>(false)

  let loading: ReturnType<typeof setTimeout>
  useMount(() => {
    loading = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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
          <Header setSearching={setSearching} />
          <Main searching={searching} setSearching={setSearching} />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
