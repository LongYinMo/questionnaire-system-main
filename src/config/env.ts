// 环境配置文件
interface EnvConfig {
  API_BASE_URL: string;
  ENV: string;
}

// 根据当前环境获取配置
const getEnvConfig = (): EnvConfig => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // 生产环境：使用固定的Mock API地址
    return {
      API_BASE_URL: 'https://questionnaire-mock-main-5ztxof8ul-nnpromaxs-projects.vercel.app',
      ENV: 'production'
    };
  }
  
  // 开发环境
  return {
    API_BASE_URL: 'http://localhost:3001',
    ENV: 'development'
  };
};

export const envConfig = getEnvConfig();
export default envConfig;
