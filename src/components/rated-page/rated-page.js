import React, { Component } from 'react'
import { Pagination } from 'antd'

import MoviesList from '../movies-list/movies-list'
import Movies from '../../services/movies'

import './rated-page.css'

export default class RatedPage extends Component {
  moviesApi = new Movies()

  state = {
    movieRatedData: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalResults: null,
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.moviesApi.getRatedMovies().then(this.addAllMovies).catch(this.onError)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.totalResults && this.state.currentPage !== prevState.currentPage) {
      this.setState(this.loadingState())
      this.moviesApi.getRatedMovies(this.state.currentPage).then(this.addAllMovies).catch(this.onError)
    }
  }

  onPageChange = (page) => {
    this.setState({ currentPage: page })
  }

  addAllMovies = (moviesArray) => {
    const movies = []
    moviesArray.results.map((item) => movies.push(item))

    this.setState({
      movieRatedData: movies,
      loading: false,
      error: null,
      currentPage: moviesArray.page,
      totalResults: moviesArray.totalResults,
    })
  }

  onError = () => {
    this.setState({
      error: new Error(
        'Sorry, there is something went wrong. Actually it\'s not "something", you\'re just russian. Use your VPN, I know, you have one. '
      ),
      loading: false,
    })
  }

  loadingState = () => {
    return { loading: true, movieData: null, error: null, totalPages: null }
  }

  render() {
    const { movieRatedData, loading, error, currentPage, totalResults } = this.state
    return (
      <main className="rated-page">
        <Pagination
          onChange={this.onPageChange}
          current={currentPage}
          total={totalResults}
          pageSize={20}
          defaultCurrent={1}
          hideOnSinglePage
          showSizeChanger={false}
        />
        <MoviesList movieData={movieRatedData} loading={loading} error={error} ratedPage={true} />
        <Pagination
          onChange={this.onPageChange}
          current={currentPage}
          total={totalResults}
          pageSize={20}
          defaultCurrent={1}
          hideOnSinglePage
          showSizeChanger={false}
        />
      </main>
    )
  }
}
