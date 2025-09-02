// 环境配置文件
interface EnvConfig {
  API_BASE_URL: string
  ENV: string
}

// 根据当前环境获取配置
const getEnvConfig = (): EnvConfig => {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    // 生产环境：使用当前域名，通过Vercel代理转发到Mock API
    return {
      API_BASE_URL: '', // 空字符串表示使用相对路径，指向当前域名
      ENV: 'production',
    }
  }

  // 开发环境
  return {
    API_BASE_URL: 'http://localhost:3001',
    ENV: 'development',
  }
}

export const envConfig = getEnvConfig()
export default envConfig
