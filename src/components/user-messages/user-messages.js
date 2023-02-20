import React from 'react'
import { Alert, Spin } from 'antd'
import './user-messages.css'

export const NoMoviesAlert = () => {
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

export const NoRatedMoviesAlert = () => {
  return (
    <div className="status-block">
      <Alert
        message="You did not rate any movies!"
        description="You should rate some movies to see somethig in here"
        type="warning"
        showIcon
        className="status-block__message"
      />
    </div>
  )
}

export const ErrorAlert = ({ error }) => {
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

export const LoadingSpinner = () => {
  return (
    <div className="status-block">
      <Spin className="status-block__spin" size="large" />
    </div>
  )
}

export const ImageSpinner = () => {
  return (
    <div className="movie-card__image-placeholder">
      <Spin className="movie-card__image-spin" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    </div>
  )
}
