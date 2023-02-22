import { transformData, transformRatedData } from '../helpers/mappers'

const apiKey = process.env.REACT_APP_API_KEY
const apiMovies = process.env.REACT_APP_MOVIES_URL

export default class Movies {
  async getGuestSession() {
    const request = await fetch(`${apiMovies}authentication/guest_session/new?${apiKey}`)

    if (!request.ok) {
      throw new Error('Failed to create the guest session', request.status)
    }

    const res = await request.json()
    return res.guest_session_id
  }

  async getSearchMovies(query, page) {
    const request = await fetch(`${apiMovies}search/movie?${apiKey}&query=${query}&page=${page}&language=en-EN`)

    if (!request.ok) {
      throw new Error('Movies getting troubles', request.status)
    }

    const res = await request.json()
    return { results: res.results.map(transformData), page: res.page, totalResults: res.total_results }
  }

  async getRatedMovies(page) {
    const guestID = localStorage.getItem('guestID')

    let request

    if (!page) {
      request = await fetch(`${apiMovies}guest_session/${guestID}/rated/movies?${apiKey}&language=en-US`)
    } else {
      request = await fetch(`${apiMovies}guest_session/${guestID}/rated/movies?${apiKey}&page=${page}&language=en-US`)
    }

    const res = await request.json()
    return { results: res.results.map(transformRatedData), page: res.page, totalResults: res.total_results }
  }

  async getTags() {
    const request = await fetch(`${apiMovies}genre/movie/list?${apiKey}&language=en-US`)

    if (!request.ok) {
      throw new Error('Tags getting troubles', request.status)
    }

    const res = await request.json()
    return res
  }

  async rateMovie(movieId, rating) {
    const guestID = localStorage.getItem('guestID')
    const body = {
      value: rating,
    }
    const rateRequest = await fetch(`${apiMovies}movie/${movieId}/rating?${apiKey}&guest_session_id=${guestID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    })

    if (!rateRequest.ok) {
      throw new Error('Rating troubles', rateRequest.status)
    }

    const res = await rateRequest.json()
    return res
  }
}
