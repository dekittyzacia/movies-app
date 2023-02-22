import React, { Component } from 'react'

import Movies from '../../services/movies'
import TabBar from '../tab-bar/tab-bar'
import SearchPage from '../search-page/search-page'
import RatedPage from '../rated-page/rated-page'
import { TagProvider } from '../tag-context/tag-context'
import { tabNames } from '../../constants'

import './app.css'

export default class App extends Component {
  moviesApi = new Movies()

  state = {
    tags: null,
    selectedTab: 'search',
  }

  onOnline = () => {
    this.setState({ error: null })
  }

  onOffline = () => {
    this.setState({
      error: new Error('You should connect to the Internet back! Or just pay for it.'),
      movieData: null,
    })
  }

  setGuestSession = () => {
    if (!localStorage.getItem('guestID')) {
      this.moviesApi.getGuestSession().then((res) => {
        localStorage.setItem('guestID', res)
      })
    }
  }

  setTagsContext = () => {
    this.moviesApi.getTags().then((res) => {
      this.setState({ tags: res.genres })
    })
  }

  componentDidMount() {
    window.addEventListener('online', this.onOnline)
    window.addEventListener('offline', this.onOffline)

    this.setGuestSession()
    this.setTagsContext()
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onOnline)
    window.removeEventListener('offline', this.onOffline)
  }

  onChangeTab = (tabName) => {
    this.setState({
      selectedTab: tabName,
    })
  }

  render() {
    const { tags, selectedTab } = this.state

    const content = (selectedTab) => {
      if (selectedTab === tabNames.ratedTab) return <RatedPage />
      return <SearchPage />
    }

    return (
      <section className="app">
        <TabBar selectedTab={selectedTab} onChangeTab={this.onChangeTab} />
        <TagProvider value={tags}>{content(selectedTab)}</TagProvider>
      </section>
    )
  }
}
