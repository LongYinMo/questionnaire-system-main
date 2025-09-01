// Vercel API Route处理所有的API请求
const mockList = require('./index');

// 将URL模式转换为正则表达式，支持路径参数
function pathToRegexp(path) {
  return new RegExp(`^${path.replace(/:\w+/g, '[^/]+')}$`);
}

// 查找匹配的mock路由
function findMockRoute(method, url) {
  return mockList.find(item => {
    if (item.method.toLowerCase() !== method.toLowerCase()) {
      return false;
    }
    
    // 处理带参数的URL
    const regex = pathToRegexp(item.url);
    const match = url.match(regex);
    
    // 对于精确匹配或带参数的匹配
    return match !== null;
  });
}

// 主要的API处理函数
export default function handler(req, res) {
  const { method, url } = req;
  
  // 解析URL，去掉查询参数部分
  const path = url.split('?')[0];
  
  // 查找匹配的mock路由
  const mockItem = findMockRoute(method, path);
  
  if (mockItem) {
    // 模拟网络延迟
    setTimeout(() => {
      try {
        // 调用对应的response函数生成响应数据
        const responseData = mockItem.response(req);
        
        // 设置响应头
        res.setHeader('Content-Type', 'application/json');
        
        // 发送响应
        res.status(200).json(responseData);
      } catch (error) {
        console.error('Error generating mock data:', error);
        res.status(500).json({
          errno: -1,
          msg: '服务器内部错误'
        });
      }
    }, 100); // 100ms延迟，模拟真实网络环境
  } else {
    // 未找到匹配的路由
    res.status(404).json({
      errno: -1,
      msg: `未找到接口: ${path}`
    });
  }
}