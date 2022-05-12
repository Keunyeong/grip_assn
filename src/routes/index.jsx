import styles from './Routes.module.scss'
// import GNB from 'routes/_shared/GNB'
import Main from '../components/main'
import Header from '../components/header'
import Footer from '../components/footer'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  )
}

export default App
