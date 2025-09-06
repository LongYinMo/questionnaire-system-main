
import React, { FC, useState, useEffect } from 'react'
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
  const { selectedId } = useGetComponentInfo()
  const [activeKey, setActiveKey] = useState(
    selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY
  )

  // 监听selectedId变化自动切换标签页
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY);
    }
  }, [selectedId])

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

  const handleTabChange = (key: string) => {
    if (Object.values(TAB_KEYS).includes(key as TAB_KEYS)) {
      setActiveKey(key as TAB_KEYS);
    }
  };

  return <Tabs activeKey={activeKey} items={tabsItems} onChange={handleTabChange}></Tabs>
}

export default RightPanel
