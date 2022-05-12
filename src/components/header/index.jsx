import styles from './header.module.scss'
import 'animate.css'
import cx from 'classnames'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={cx(styles.title, 'animate__animated', 'animate__flash', 'animate__infinite', 'animate__slower')}>
        PICK YOUR MOVIE
      </h1>
      <p className={styles.logo}>PYM</p>
    </header>
  )
}

export default Header
