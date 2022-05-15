import styles from './favorites.module.scss'
import FavoritesList from 'components/favoritesList'

const Favorites = () => {
  return (
    <div className={styles.favorites}>
      <FavoritesList />
    </div>
  )
}

export default Favorites
