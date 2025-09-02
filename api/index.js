// 简化版的mock数据服务，用于Vercel部署
const Mock = require('mockjs');
const Random = Mock.Random;

// CORS中间件函数
function corsMiddleware(req, res, next) {
  const origin = req.headers.origin;
  
  // 允许所有questionnaire-system-main相关的域名
  if (origin && (
    origin.includes('questionnaire-system-main') || 
    origin.includes('localhost') ||
    origin.includes('127.0.0.1')
  )) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // 设置其他CORS头部
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24小时
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (next) next();
}

// 默认用户信息，用于登录测试
const defaultUser = {
  username: 'admin',
  password: 'admin123',
  nickname: '管理员'
};

// 用户相关API
const userMock = [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => ({
      errno: 0,
      data: {
        username: defaultUser.username,
        nickname: defaultUser.nickname,
      },
    }),
  },
  {
    url: '/api/user/register',
    method: 'post',
    response: () => ({ errno: 0 }),
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: (req) => {
      const { body } = req;
      // 检查是否为默认用户名和密码
      if (body.username === defaultUser.username && body.password === defaultUser.password) {
        return {
          errno: 0,
          data: {
            token: 'DEFAULT_USER_TOKEN',
          },
        };
      }
      // 对于其他用户名和密码，随机生成token
      return {
        errno: 0,
        data: {
          token: Random.word(20),
        },
      };
    },
  },
];

// 问卷相关API
const questionMock = [
  {
    url: '/api/question/:id',
    method: 'get',
    response: () => ({
      errno: 0,
      data: {
        id: Random.id(),
        title: Random.ctitle(),
        desc: '问卷描述',
        js: '',
        css: '',
        isDeleted: false,
        isPublished: true,
        componentList: getComponentList(),
      },
    }),
  },
  {
    url: '/api/question',
    method: 'post',
    response: () => ({
      errno: 0,
      data: {
        id: Random.id(),
      },
    }),
  },
  {
    url: '/api/question',
    method: 'get',
    response: (req) => {
      const { query } = req;
      const isDeleted = req.url.includes('isDeleted=true');
      const isStar = req.url.includes('isStar=true');
      const pageSize = parseInt(query.pageSize) || 10;

      return {
        errno: 0,
        data: {
          List: getQuestionList({ len: pageSize, isDeleted, isStar }),
          total: 100,
        },
      };
    },
  },
  {
    url: '/api/question/:id',
    method: 'patch',
    response: () => ({ errno: 0 }),
  },
  {
    url: '/api/question/duplicate/:id',
    method: 'post',
    response: () => ({
      errno: 0,
      data: {
        id: Random.id(),
      },
    }),
  },
  {
    url: '/api/question',
    method: 'delete',
    response: () => ({ errno: 0 }),
  },
];

// 统计相关API
const statMock = [
  {
    url: '/api/stat/:questionId',
    method: 'get',
    response: () => ({
      errno: 0,
      data: {
        total: 100,
        list: getStatList(),
      },
    }),
  },
  {
    url: '/api/stat/:questionId/:componentId',
    method: 'get',
    response: () => ({
      errno: 0,
      data: {
        stat: [
          { name: '选项1', count: 20 },
          { name: '选项2', count: 10 },
          { name: '选项3', count: 25 },
        ],
      },
    }),
  },
];

// Mock数据生成函数
function getQuestionList(opt = {}) {
  const { len = 10, isStar = false, isDeleted = false } = opt;
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar,
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted,
    });
  }
  return list;
}

function getComponentList() {
  return [
    {
      fe_id: 'c1',
      type: 'questionInfo',
      title: '问卷信息',
      isHidden: false,
      isLocked: false,
      props: { title: '问卷标题', desc: '问卷描述...' },
    },
    {
      fe_id: 'c2',
      type: 'questionTitle',
      title: '标题',
      isHidden: false,
      isLocked: false,
      props: { text: '个人信息调研', level: 1, isCenter: false },
    },
    {
      fe_id: 'c3',
      type: 'questionInput',
      title: '输入框1',
      isHidden: false,
      isLocked: false,
      props: { title: '你的姓名', placeholder: '请输入姓名...' },
    },
    {
      fe_id: 'c4',
      type: 'questionInput',
      title: '输入框2',
      isHidden: false,
      isLocked: false,
      props: { title: '你的电话', placeholder: '请输入电话...' },
    },
  ];
}

function getStatList(len = 10) {
  const componentList = getComponentList();
  const res = [];

  for (let i = 0; i < len; i++) {
    const stat = { _id: Random.id() };

    componentList.forEach((c) => {
      const { fe_id, type, props } = c;

      switch (type) {
        case 'questionInput':
          stat[fe_id] = Random.ctitle();
          break;
        case 'questionTextarea':
          stat[fe_id] = Random.ctitle();
          break;
        case 'questionRadio':
          stat[fe_id] = props.options?.[0]?.text || '选项1';
          break;
        case 'questionCheckbox':
          stat[fe_id] = props.list?.[0]?.text ? `${props.list[0].text},${props.list[1]?.text || ''}` : '选项1';
          break;
        default:
          stat[fe_id] = '';
      }
    });

    res.push(stat);
  }

  return res;
}

// 合并所有mock数据
const mockList = [...userMock, ...questionMock, ...statMock];

module.exports = mockList;