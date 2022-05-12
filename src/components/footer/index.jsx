import styles from './footer.module.scss'
import 'animate.css'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { SearchIcon, StarIcon } from '../../assets/svgs'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <NavLink to='/' className={cx(styles.nav)}>
          <SearchIcon />
          SEARCH
        </NavLink>
      </div>
      <div>
        <NavLink to='favorites' className={cx(styles.nav)}>
          <StarIcon />
          PICKS
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer
