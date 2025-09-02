import React, { FC } from 'react'

import { UserOutlined } from '@ant-design/icons'


const UserInfo: FC = () => {

  // 移除登录相关UI - 显示默认用户信息
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        访客用户
      </span>
    </>
  );

  return <div>{UserInfo}</div>
}

export default UserInfo
