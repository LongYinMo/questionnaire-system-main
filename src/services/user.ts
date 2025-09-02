/**
 * @Date        2024/03/03 15:55:59
 * @Author      zono
 * @Description 用户接口,登录注册等
 * */
import axios, { ResDataType } from './ajax'
import { setToken } from '../utils/user-token'

/**
 * @description 获取用户信息,用token获取，故不需要参数
 * @returns {Promise<ResDataType>} - 用户信息响应数据
 */
export async function getUserInfoService(): Promise<ResDataType> {
  const data = (await axios.get('/api/user/info')) as ResDataType
  return data
}

/**
 * @description 登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<ResDataType>} - 包含token的响应数据
 */
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const data = (await axios.post('/api/user/login', { username, password })) as ResDataType
  if (data.token) {
    setToken(data.token)
  }
  return data
}

/**
 * @description 注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} [nickname] - 昵称（可选）
 * @returns {Promise<ResDataType>} - 包含token的响应数据
 */

export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const data = await axios.post<ResDataType>('/api/user/register', {
    username,
    password,
    nickname: nickname || undefined,
  })
  if (data.data?.token) {
    setToken(data.data.token)
  }
  return data
}
