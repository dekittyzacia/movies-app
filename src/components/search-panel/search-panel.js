import React, { Component } from 'react'
import { Input } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'

import './search-panel.css'

export default class SearchPanel extends Component {
  state = {
    inputValue: '',
  }

  componentDidMount() {
    if (localStorage.getItem('searchPageQuery')) {
      this.setState({ inputValue: JSON.parse(localStorage.getItem('searchPageQuery')) })
    }
    localStorage.removeItem('searchPageQuery')
  }

  componentWillUnmount() {
    localStorage.setItem('searchPageQuery', JSON.stringify(this.state.inputValue))
  }

  onChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })

    this.sendQuery()
  }

  sendQuery = debounce(() => {
    if (this.state.inputValue.trim() !== '') {
      this.props.onSearch(this.state.inputValue)
    }
  }, 1000)

  onFocus = () => {
    this.setState({ inputValue: '' })
  }

  render() {
    return (
      <Input
        className="search-panel"
        placeholder="Use me to find THE MOVIE!"
        prefix={<SmileOutlined className="search-panel__prefix prefix" />}
        onChange={this.onChangeInputValue}
        value={this.state.inputValue}
        onFocus={this.onFocus}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}
