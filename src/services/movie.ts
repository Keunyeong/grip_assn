import { axios } from '../hooks/worker'

// const movieApiKey = process.env.REACT_APP_WEATHER_MOVIE_KEY

const url = `https://www.omdbapi.com/?apikey=897e5067&`

interface Params {
  s: string
  page: number
}

export const getMovieAPi = (params: Params) => {
  return axios({
    url: `${url}`,
    method: 'get',
    params: {
      s: params.s,
      page: params.page,
    },
  })
}
