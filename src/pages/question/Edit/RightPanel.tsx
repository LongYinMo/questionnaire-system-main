/**
 * @Date        2024/03/04 22:25:49
 * @Author      zono
 * @Description 右侧面板
 * */
import React, { FC } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

// TS 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  
  

  

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      icon: <FileTextOutlined />,
      label: '  组件属性',
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      icon: <SettingOutlined />,
      label: '  页面设置',
      children: <PageSetting />,
    },
  ]

  return <Tabs items={tabsItems}></Tabs>
}

export default RightPanel
