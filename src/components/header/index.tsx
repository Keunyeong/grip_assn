import { ChangeEvent, FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { searchWord } from 'store/atom'

import 'animate.css'

import styles from './header.module.scss'

const Header = () => {
  const [inputText, setInputText] = useState<string>('SEARCH MOVIE HERE')
  const setSearchWord = useSetRecoilState(searchWord)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchWord(inputText)
  }

  return (
    <header className={styles.header}>
      {/* <h1 className={cx(styles.title, 'animate__animated', 'animate__flash', 'animate__infinite', 'animate__slower')}>
        PICK YOUR MOVIE
      </h1> */}
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
    </header>
  )
}

export default Header
