import { atom } from 'recoil'

import { MovieData } from '../types/movie.d'

export const searchMovieList = atom<MovieData[]>({
  key: '#searchMovieList',
  default: [],
})

export const searchWord = atom<string>({
  key: '#searchWord',
  default: '',
})
export const pageNum = atom<number>({
  key: '#pageNum',
  default: 1,
})