import { useState } from 'react'
import { useMount, useUnmount } from 'react-use'
import cx from 'classnames'

import styles from './Routes.module.scss'

import Main from '../components/main'
import Header from '../components/header'
import Footer from '../components/footer'

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
        <h1 className={cx(styles.title, 'animate__animated', 'animate__flash', 'animate__infinite', 'animate__slower')}>
          PICK YOUR MOVIE
        </h1>
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
