/**
 * @Date        2024/03/03 15:55:59
 * @Author      zono
 * @Description 用户接口,登录注册等
 * */
import axios from './ajax'
import { setToken } from '../utils/user-token'

/**
 * 基础响应类型
 */
/**
 * 基础响应类型
 */
interface BaseResponse<T> {
  errno: number;
  data: T;
}

/**
 * 用户信息数据类型
 */
interface UserInfoData {
  username: string;
  nickname: string;
}

/**
 * 登录/注册响应数据类型
 */
interface AuthResponseData extends UserInfoData {
  token: string;
}

/**
 * @description 获取用户信息,用token获取，故不需要参数
 * @returns {Promise<BaseResponse<UserInfoData>>} - 用户信息响应数据
 */
export async function getUserInfoService(): Promise<BaseResponse<UserInfoData>> {
  const { data } = await axios.get<BaseResponse<UserInfoData>>('/api/user/info')
  return data
}

/**
 * @description 登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<BaseResponse<AuthResponseData>>} - 包含token的响应数据
 */
export async function loginService(username: string, password: string): Promise<AuthResponseData> {
  const response = await axios.post<BaseResponse<AuthResponseData>>('/api/user/login', { username, password });
  const result = response.data;
  if (result?.data?.token) {
    setToken(result.data.token);
  }
  return result.data || { username: '', nickname: '', token: '' }
}

/**
 * @description 注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} [nickname] - 昵称（可选）
 * @returns {Promise<BaseResponse<AuthResponseData>>} - 包含token的响应数据
 */

export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<BaseResponse<AuthResponseData>> {
  const { data } = await axios.post<BaseResponse<AuthResponseData>>('/api/user/register', {
    username,
    password,
    nickname: nickname || undefined,
  })
  if (data?.data?.token) {
    setToken(data.data.token)
  }
  console.log(data);
  return data
}
