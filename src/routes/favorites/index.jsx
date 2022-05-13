import FavoritesList from 'components/favoritesList'
import styles from './favorites.module.scss'

const Favorites = () => {
  return (
    <div className={styles.favorites}>
      <FavoritesList />
    </div>
  )
}

export default Favorites
