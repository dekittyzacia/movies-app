import React, { Component } from 'react'
import { Input } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

import './search-panel.css'

export default class SearchPanel extends Component {
  render() {
    return (
      <form>
        <Input
          className="search-panel"
          placeholder="Use me to find THE MOVIE!"
          prefix={<SmileOutlined className="search-panel__prefix prefix" />}
        />
      </form>
    )
  }
}
