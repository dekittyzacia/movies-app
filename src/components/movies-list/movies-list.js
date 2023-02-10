/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Alert, Spin } from 'antd'

import MovieCard from '../movie-card'
import './movies-list.css'

export default class MoviesList extends Component {
  render() {
    const { movieData, error, loading } = this.props
    const movieDataIsOK = !loading || !error
    const errorAlert = error && <ErrorAlert error={error} />
    const loadingSpin = loading && <LoadingSpinner />

    if (movieDataIsOK && movieData && movieData.length) {
      const items = movieData.map((item) => {
        return <MovieCard key={uuidv4()} {...item} />
      })
      return <ul className="movies-list">{items}</ul>
    }

    if (error) {
      return errorAlert
    }

    if (loading) {
      return loadingSpin
    }

    if (movieData && !movieData.length) {
      return <NoMoviesAlert />
    }

    return
  }
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
