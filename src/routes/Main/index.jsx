import SquareSpinner from '../../spinner/SquareSpinner'
import styles from './Main.module.scss'
import 'animate.css'
import cx from 'classnames'
import CircleBlurSpinner from '../../spinner/CircleBlurSpinner'

const Main = () => {
  return (
    <main className={styles.main}>
      <h1 className={cx(styles.title, 'animate__animated', 'animate__flash', 'animate__infinite', 'animate__slower')}>
        PICK YOUR MOVIE
      </h1>
      <p className={styles.logo}>PYM</p>
      <div>
        <SquareSpinner />
        <CircleBlurSpinner />
      </div>
    </main>
  )
}

export default Main
