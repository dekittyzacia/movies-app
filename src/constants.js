import React from 'react'
import { SearchOutlined, StarOutlined } from '@ant-design/icons'

export const tabNames = {
  searchTab: 'search',
  ratedTab: 'rated',
}

export const tabsConfigs = [
  {
    key: 'search',
    label: (
      <span>
        <SearchOutlined />
        Search
      </span>
    ),
  },
  {
    key: 'rated',
    label: (
      <span>
        <StarOutlined />
        Rated
      </span>
    ),
  },
]
