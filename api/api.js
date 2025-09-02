const express = require('express');
const cors = require('cors');
const mockList = require('./index');

const app = express();

// 使用cors中间件
app.use(cors({
  origin: [
    'https://questionnaire-system-main.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 解析JSON请求体
app.use(express.json());

// 注册所有mock路由
mockList.forEach(item => {
  const { url, method, response } = item;
  
  app[method.toLowerCase()](url, (req, res) => {
    try {
      const data = response(req);
      res.json(data);
    } catch (error) {
      res.status(500).json({
        errno: -1,
        msg: '服务器内部错误',
        error: error.message
      });
    }
  });
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    errno: -1,
    msg: '接口不存在'
  });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({
    errno: -1,
    msg: '服务器内部错误'
  });
});

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Mock API server running on port ${PORT}`);
  });
}

// 导出app用于Vercel
module.exports = app;