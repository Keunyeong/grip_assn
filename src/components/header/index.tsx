import { ChangeEvent, FormEvent, SetStateAction, useState, Dispatch } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import cx from 'classnames'

import 'animate.css'
import styles from './header.module.scss'

import { searchWord } from 'store/atom'

interface Props {
  setSearching: Dispatch<SetStateAction<boolean>>
}

const Header = (props: Props) => {
  const location = useLocation()
  const { setSearching } = props
  const [inputText, setInputText] = useState<string>('SEARCH MOVIE HERE')
  const setSearchWord = useSetRecoilState(searchWord)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearching(true)
    setSearchWord(inputText)
  }

  return (
    <header className={styles.header}>
      {location.pathname === '/favorites' ? (
        <h1 className={cx(styles.title, 'animate__animated', 'animate__flash', 'animate__infinite', 'animate__slower')}>
          PICK YOUR MOVIE
        </h1>
      ) : (
        <>
          <form action='submit' onSubmit={handleSearchSubmit}>
            <input
              className={styles.input}
              value={inputText}
              type='text'
              onChange={handleInputChange}
              onFocus={() => setInputText('')}
            />
          </form>
          <p className={styles.logo}>PYM</p>
        </>
      )}
    </header>
  )
}

export default Header
