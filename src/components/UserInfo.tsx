import React, { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { LOGIN_PATHNAME } from '../router'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

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
