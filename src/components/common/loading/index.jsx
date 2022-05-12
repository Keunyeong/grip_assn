import styles from './loading.module.scss'
import 'animate.css'
import SquareSpinner from '../spinner/SquareSpinner'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <SquareSpinner />
    </div>
  )
}

export default Loading
