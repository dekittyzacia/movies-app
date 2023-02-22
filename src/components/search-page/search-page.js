import React, { Component } from 'react'
import { Pagination } from 'antd'

import Movies from '../../services/movies'
import SearchPanel from '../search-panel/search-panel'
import MoviesList from '../movies-list/movies-list'
import './search-page.css'

export default class SearchPage extends Component {
  moviesApi = new Movies()

  state = {
    movieData: null,
    loading: false,
    error: null,
    query: '',
    currentPage: 1,
    totalResults: null,
  }

  onSearch = (text) => {
    this.setState({
      query: text,
      loading: true,
    })
  }

  onPageChange = (page) => {
    this.setState({ currentPage: page })
  }

  componentDidMount() {
    if (localStorage.getItem('searchPageState')) {
      this.setState(JSON.parse(localStorage.getItem('searchPageState')))
    }
    localStorage.removeItem('searchPageState')
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState(this.loadingState())
      this.moviesApi.getSearchMovies(this.state.query, 1).then(this.addAllMovies).catch(this.onError)
    }

    if (this.state.currentPage !== prevState.currentPage) {
      this.setState(this.loadingState())
      this.moviesApi
        .getSearchMovies(this.state.query, this.state.currentPage)
        .then(this.addAllMovies)
        .catch(this.onError)
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchPageState', JSON.stringify(this.state))
  }

  loadingState = () => {
    return { loading: true, movieData: null, error: null, totalPages: null }
  }

  addAllMovies = (moviesArray) => {
    const movies = []
    moviesArray.results.map((item) => movies.push(item))

    this.setState({
      movieData: movies,
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

  render() {
    const { movieData, loading, error, currentPage, totalResults } = this.state
    return (
      <main className="search-page">
        <SearchPanel onSearch={this.onSearch} />
        <Pagination
          onChange={this.onPageChange}
          current={currentPage}
          total={totalResults}
          pageSize={20}
          defaultCurrent={1}
          hideOnSinglePage
          showSizeChanger={false}
        />
        <MoviesList movieData={movieData} loading={loading} error={error} ratedPage={false} />
        <Pagination
          onChange={this.onPageChange}
          current={currentPage}
          total={totalResults}
          pageSize={20}
          defaultCurrent={1}
          hideOnSinglePage
          showSizeChanger={false}
        />
        <MoviesList />
      </main>
    )
  }
}
