import React from 'react'
import { Tabs } from 'antd'

import { tabsConfigs } from '../../constants'

const TabBar = ({ onChangeTab }) => {
  return <Tabs defaultActiveKey="search" items={tabsConfigs} size="large" onChange={onChangeTab} />
}

export default TabBar
