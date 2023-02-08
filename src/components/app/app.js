import React, { Component } from 'react'
import { Spin, Alert } from 'antd'

import MoviesList from '../movies-list'
import SearchPanel from '../search-panel'
import Movies from '../../services/movies'

import './app.css'

export default class App extends Component {
  moviesApi = new Movies()

  state = {
    movieData: [],
    loading: true,
    error: null,
  }

  addAllMovies = (moviesArray) => {
    if (!moviesArray.length) {
      this.setState({ movieData: null, loading: false })
      return
    }
    moviesArray.forEach((item) => this.addMovie(item))
    this.setState({ loading: false, error: null })
  }

  onError = () => {
    this.setState({
      // eslint-disable-next-line quotes
      error: new Error(
        'Sorry, there is something went wrong. Actually it\'s not "something", you\'re just russian. Use your VPN, I know, you have one. '
      ),
      loading: false,
    })
  }

  componentDidMount = () => {
    window.addEventListener('online', () => {
      this.setState({ error: null })
    })
    window.addEventListener('offline', () => {
      this.setState({ error: new Error('You should connect to the Internet back! Or just pay for it.'), movieData: [] })
    })

    this.moviesApi.getSource('return').then(this.addAllMovies).catch(this.onError)
  }

  addMovie = (elem) => {
    this.setState(({ movieData }) => {
      const newState = [...movieData]
      newState.push(elem)
      return {
        movieData: newState,
      }
    })
  }

  render() {
    const { movieData, loading, error } = this.state
    const movieDataIsOK = !loading || !error

    const errorBlock = error ? <ErrorAlert error={error} /> : null
    const loadingBlock = loading ? <LoadingSpinner /> : null
    const noMoviesBlock = !movieData ? <NoMoviesAlert /> : null
    const moviesContent = movieDataIsOK ? <MoviesList movieData={movieData} onMoviesList={this.onMoviesList} /> : null

    return (
      <section className="app">
        {/* tab bar */}
        <SearchPanel />
        {loadingBlock}
        {errorBlock}
        {noMoviesBlock}
        {moviesContent}
      </section>
    )
  }
}

const ErrorAlert = ({ error }) => {
  return (
    <div className="status-block">
      <Alert
        message="Oh no!... Everything is broken!"
        description={error.message}
        type="error"
        showIcon
        className="status-block__message"
      />
    </div>
  )
}

const LoadingSpinner = () => {
  return (
    <div className="status-block">
      <Spin className="status-block__spin" size="large" />
    </div>
  )
}

const NoMoviesAlert = () => {
  return (
    <div className="status-block">
      <Alert
        message="Oh no, no movies for you!"
        description="Probably, the movie you're trying to find doesn't exist. You're such a weirdo, just try to find the existing one!"
        type="warning"
        showIcon
        className="status-block__message"
      />
    </div>
  )
}
