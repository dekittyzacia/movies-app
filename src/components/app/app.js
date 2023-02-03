import React, { Component } from 'react'

import MoviesList from '../movies-list'
import Movies from '../../services/movies'

import './app.css'

export default class App extends Component {
  moviesApi = new Movies()
  _apiPosters = 'https://image.tmdb.org/t/p/original'

  state = {
    movieData: [],
  }

  componentDidMount() {
    this.moviesApi.getSource('return').then(({ results }) =>
      results.forEach((item) => {
        this.addMovie(item)
      })
    )
  }

  correctDescription = (str, limit) => {
    if (str.length < limit) {
      return str
    }

    let text = str.slice(0, limit)
    text = text.slice(0, text.lastIndexOf(' '))
    return text + '...'
  }

  createMovie(elem) {
    const { title, id, release_date: releaseDate, poster_path, overview, vote_average: voteAverage } = elem

    return {
      title: this.correctDescription(title, 30),
      id,
      releaseDate,
      description: this.correctDescription(overview, 200),
      voteAverage,
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      poster: poster_path ? `${this._apiPosters}${poster_path}` : null,
    }
  }

  addMovie = (elem, posterUrl) => {
    this.setState(({ movieData }) => {
      const newState = [...movieData]
      const newMovie = this.createMovie(elem, posterUrl)
      newState.push(newMovie)
      return {
        movieData: newState,
      }
    })
  }

  render() {
    const { movieData } = this.state

    return (
      <section className="app">
        {/* tab bar */}
        {/* search bar */}
        <MoviesList movieData={movieData} />
      </section>
    )
  }
}
